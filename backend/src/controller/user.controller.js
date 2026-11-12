import { Session } from "../models/session.model.js";
import { User } from "../models/user.model.js";
import { Apierror } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { UploadOnCloudinary } from "../utils/cloudinary.js";
import fs from "fs";
import crypto from "crypto";
import { randomInt } from "crypto";
import { OtpModel } from "../models/otp.model.js";
import nodemailer from "nodemailer";
import { Otpgenerator } from "../utils/Otpgenerator.js";

const generatedAcessToken = async (user) => {
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

  const hashedToken = crypto
    .createhash("sha256")
    .update(refreshToken)
    .digest("hex");
  await session.updateOne({
    refreshTokenHash: hashedToken,
  });
  return hashedToken;
};

const TokenHash = async (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
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
    UploadImageResponse = await UploadOnCloudinary(avatarLocalPath, avatar);
  }

  const PasswordHash = TokenHash(password);
  let prevAttempt=0;
  const GenerateOtp= await Otpgenerator(email,prevAttempt)
  if(GenerateOtp!=null){
    
  }else{}

  const user = User.create({
    username: username,
    password: PasswordHash,
    email: email,
    fullname: fullname,
    avater: UploadImageResponse.secure_url || undefined,
    role: role || "user",
  });
});

export {
  generatedAcessToken,
  generatedRefreshToken,
  TokenHash
}