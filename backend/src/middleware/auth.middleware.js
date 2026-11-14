import { User } from "../models/user.model.js";
import { Session } from "../models/session.model.js";
import { Apierror } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const AcessTokenverifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer", "");

    if (!token) {
      throw new Apierror(401,"acess token required...")
    }
    const decodedToken = jwt.verify(token, process.env.ACESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?.id).select(
      "-password -refreshToken",
    );
    if (!user) {
      throw new Apierror(401, "Invalid Access Token");
    }

    const session = await Session.findOne({
      id: decodedToken.sessionId,
      user: decodedToken?.id,
      revoked: false,
    });


    if (!session) {
      throw new Apierror(404, "user session are expiry..");
    }
    req.session = session;
    req.user = user;
    next();
  } catch (error) {
    throw new Apierror(401, error?.message || "invalid access Token");
  }
});

export const RefreshTokenverifyJWT = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.refreshToken ||
    req.header("Authorization")?.replace("Bearer", "");

  if (!token) {
    throw new Apierror(404, "token are required..");
  }
  const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

  const user = await User.findById(decodedToken?._id).select(
    "-password -refreshToken",
  );
  if (!user) {
    throw new Apierror(401, "Invalid Acess Token");
  }

  const session = await Session.findOne({
    id: decodedToken?.sessionId,
    user: decodedToken?.id,
    revoked: false,
  });
  if (!session) {
    throw new Apierror(404, "user session are expiry..");
  }
  req.session = session;
  req.user = user;
  next();
});
