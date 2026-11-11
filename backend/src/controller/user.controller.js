import { Session } from "../models/session.model";
import { User } from "../models/user.model";
import { Apierror } from "../utils/ApiError";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler";

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

const registerUser = asyncHandler(async (req,res) => {
    const {username,email,password,fullname,role}=req.body
    
    if([username,email,password,fullname,role].some((field)=>{
      field?.trim()===""
    })){
      throw new Apierror(400,"All field are required...")
    }

    const avatarLocalPath=req?.files?.[0]?.path
    if(avatarLocalPath){
      
    }

    
});
