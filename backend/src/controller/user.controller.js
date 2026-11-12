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
      refreshTokenHas: hashedRefreshToken,
      revoked: false,
    });
  } catch (error) {
    throw new Apierror(500, "DataBase Error...");
  }
  if (session == null || session) {
    throw new Apierror(404, "session expired");
  }

  let user;
  try {
    user = await User.findById(decodedToken._id);
  } catch (error) {
    throw Apierror(500, "database Error", error);
  }
  if (user == null) {
    throw new Apierror(404, "User not found");
  }

  const AcessToken = jwt.sign(
    {
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

const generatedRefreshToken = async (req, user) => {
  const prevSession = await Session.findOne({ user: user });
  if (prevSession) {
    prevSession.revoked = true;
  }

  const session = await Session.create({
    user: user,
    userAgent: req.headers["user-agent"],
    ipAddress: req.ip,
  });

  const refreshToken = jwt.sign(
    {
      id: user._id,
      session_id: session._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: REFRESH_TOKEN_EXPIRY },
  );

  const hashedRefreshToken = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");
  await session.updateOne({
    refreshTokenHash: hashedRefreshToken,
  });
  return { refreshToken, hashedRefreshToken };
};

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, fullname, role } = req.body;

  if (
    [username, email, password, fullname, role].some((field) => {
      field?.trim() === "";
    })
  ) {
    throw new Apierror(400, "All field are required...");
  }

  const avatarLocalPath = req?.files?.[0]?.path;

  //check existed user
  const existUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existUser) {
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
    .update(string(password))
    .digest("hex");
  try {
    const user = await User.create({
      username: username,
      password: PasswordHash,
      email: email,
      fullname: fullname,
      avater: UploadImageResponse?.secure_url,
      role: role,
      isverified: false,
    });
    const { refreshToken, hashedRefreshToken } = await generatedRefreshToken(
      req,
      user,
    );
    user.refreshToken = hashedRefreshToken;

    const accessToken = await generatedAcessToken(refreshToken);
    await user.save();

    const options = {
      // only server modify
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("refreshToken", refreshToken, options)
      .cookie("accessToken", accessToken, options)
      .json(new ApiResponse(200, "User create Successfully"));
  } catch (error) {
    throw new Apierror(500, "database Error", error);
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req?.body;
  if (!email && !password) {
    throw new Apierror(401, "email and password are required");
  }
  const PasswordHash = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  const user = await User.findOne({
    email: email,
    password: PasswordHash,
  });

  if (!user) {
    throw new Apierror(400, "email or password Incorrect..");
  }

  const { refreshToken, hashedRefreshToken } = await generatedRefreshToken(
    req,
    user,
  );
  const accessToken = await generatedAcessToken(refreshToken);

  user.refreshToken = hashedRefreshToken;
  const options = {
    // only server modify
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(new ApiResponse(200, "user login sucessfully..."));
});

export { generatedAcessToken, generatedRefreshToken, registerUser, loginUser };
