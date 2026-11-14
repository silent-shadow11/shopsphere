import { Session } from "../models/session.model.js";
import { User } from "../models/user.model.js";
import { Apierror } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { UploadOnCloudinary } from "../utils/cloudinary.js";
import fs from "fs";
import crypto from "crypto";
import { ApiResponse } from "../utils/ApiResponse.js";

const generatedAcessToken = async (refreshToken) => {
  let decodedToken;

  try {
    decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new Apierror(401, "Refresh Token Expired");
    }

    throw new Apierror(401, "Invalid Refresh Token");
  }

  const hashedRefreshToken = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");
  let session;
  try {
    session = await Session.findOne({
      user: decodedToken.id,
      refreshTokenHash: hashedRefreshToken,
      revoked: false,
    });
  } catch (error) {
    throw new Apierror(500, "DataBase Error...");
  }
  if (session == null) {
    throw new Apierror(404, "session expired");
  }

  let user;
  try {
    user = await User.findById(decodedToken.id);
  } catch (error) {
    throw Apierror(500, "database Error", error);
  }
  if (user == null) {
    throw new Apierror(404, "User not found");
  }

  const AcessToken = jwt.sign(
    {
      sessiondId: session._id,
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    process.env.ACESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY },
  );
  return AcessToken;
};

const generatedRefreshToken = async (req, userid) => {
  const session = await Session.create({
    user: userid,
    userAgent: req.headers["user-agent"],
    ipAddress: req.ip,
  });

  const refreshToken = jwt.sign(
    {
      id: userid,
      sessionId: session._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY },
  );

  const hashedRefreshToken = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");
  await session.updateOne({
    refreshTokenHash: hashedRefreshToken,
  });
  return { refreshToken, hashedRefreshToken, session };
};

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, fullname, role } = req.body;

  if (
    [username, email, password, fullname, role].some(
      (field) => !field || field.trim() === "",
    )
  ) {
    throw new Apierror(400, "All fields are required");
  }

  const avatarLocalPath = req?.files?.avatar[0]?.path;

  //check existed user
  const existUser = await User.findOne({
    $or: [{ username, email }],
  });

  if (existUser != null) {
    if (fs.existsSync(avatarLocalPath)) {
      fs.unlinkSync(avatarLocalPath);
    }
    throw new Apierror(409, "Username or email already exits");
  }

  let UploadImageResponse = null;
  if (avatarLocalPath) {
    UploadImageResponse = await UploadOnCloudinary(avatarLocalPath, "avatar");
  }

  const PasswordHash = crypto
    .createHash("sha256")
    .update(String(password))
    .digest("hex");
  try {
    const user = await User.create({
      username: username,
      password: PasswordHash,
      email: email,
      fullname: fullname,
      avater: UploadImageResponse?.secure_url,
      avater_publicId:UploadImageResponse?.public_id,
      role: role,
      isverified: false,
    });
    const { refreshToken, hashedRefreshToken } = await generatedRefreshToken(
      req,
      user._id,
    );
    user.refreshToken = hashedRefreshToken;
    await user.save();

    const accessToken = await generatedAcessToken(refreshToken);

    const options = {
      httpOnly: true,
      secure: true,
      samesite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, //
    };

    return res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        samesite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 day
      })
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        samesite: "strict",
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
      })
      .json(new ApiResponse(200, "User create Successfully"));
  } catch (error) {
    throw new Apierror(500, "database Error", error);
  }
});

const loginUser = asyncHandler(async (req, res) => {
  if (req.user) {
    logoutUser(req, res);
  }

  const { email, password } = req?.body;
  if (!email || !password) {
    throw new Apierror(401, "email and password are required");
  }
  const PasswordHash = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");
  let user;
  try {
    user = await User.findOne({
      email: email,
      password: PasswordHash,
    });
  } catch (error) {
    throw new Apierror(500, "Database Error..");
  }

  if (!user) {
    throw new Apierror(400, "email or password Incorrect..");
  }

  const { refreshToken, hashedRefreshToken, session } =
    await generatedRefreshToken(req, user._id);
  const accessToken = await generatedAcessToken(refreshToken);

  user.refreshToken = hashedRefreshToken;
  await user.save();
  ((req.user = user), (req.session = session));
  return res
    .status(200)
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      samesite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, //
    })
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      samesite: "strict",
      maxAge: 1 * 24 * 60 * 60 * 1000, //
    })
    .json(new ApiResponse(200, "user login sucessfully..."));
});

const logoutUser = asyncHandler(async (req, res) => {
  const session = req.session;
  if (session.revoked) {
    throw new Apierror(404, "user not logged in...");
  }
  session.revoked = true;
  await session.save();
  return res
    .status(200)
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json(new Apierror(200, "user logged out"));
});

const logoutAlldevice = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new Apierror(404, "user not found..");
  }
  await Session.deleteMany({
    user: user._id,
  });

  return res
    .status(200)
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json(new ApiResponse(200, "logout from all device sucessfully.."));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    throw new Apierror(404, "refreshToken required...");
  }
  const accessToken = await generatedAcessToken(refreshToken);

  if (!accessToken) {
    throw new Apierror(
      404,
      "something went wrong while genereated acesstoken..",
    );
  }

  res
    .status(200)
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 1 * 24 * 60 * 60 * 1000, //
    })
    .json(new ApiResponse(200, "AccessToken create successfully..."));
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new Apierror(404, "user not found..");
  }
  const { oldpassword, newpassword } = req?.body;
  if (!oldpassword || !newpassword) {
    throw new Apierror(404, "oldpassword and newpassword required...");
  }

  const DatabasePassword = user.password;

  const oldpasswordHash = crypto
    .createHash("sha256")
    .update(String(oldpassword))
    .digest("hex");

  if (DatabasePassword !== oldpasswordHash) {
    throw new Apierror(400, "Oldpassword not matched...");
  }

  const PasswordHash = crypto
    .createHash("sha256")
    .update(String(newpassword))
    .digest("hex");

  if (PasswordHash === oldpasswordHash) {
    throw new Apierror(409, "oldpassword and newpassword same... ");
  }

  await User.findByIdAndUpdate(user._id, {
    password: PasswordHash,
  });
  await Session.deleteMany({ user: req.user._id });

  return res
    .status(200)
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json(new ApiResponse(200, "Password Change Sucessfully..."));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (!user) {
    throw new Apierror(404, "User do not find...");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "user fetch sucessfully..."));
});

export {
  generatedAcessToken,
  generatedRefreshToken,
  registerUser,
  loginUser,
  logoutUser,
  logoutAlldevice,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser
};
