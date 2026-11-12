import { User } from "../models/user.model.js";
import { Apierror } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJwt = asyncHandler(async (req, _, next) => {
  try {
    const token = req?.header("Authorization")?.replace("Bearer ", "")||req.cookies?.accessToken;

    if (!token) {
      throw new Apierror(401, "Unauthorized Acess");
    }

    const decodedToken = jwt.verify(token, process.env.ACESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?.id).select(
      "-password -refreshToken",
    );

    if (!user) {
      throw new Apierror(401, "Invaild Acess Token..");
    }
    req.user = user;

    next();
  } catch (error) {
    throw new Apierror(401, error?.message || "invalid acess Token");
  }
});
