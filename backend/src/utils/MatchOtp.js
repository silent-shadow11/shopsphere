import { OtpModel } from "../models/otp.model";
import { Apierror } from "./ApiError";
import crypto from "crypto";

export const isMatched = async (req) => {
  const { email, UserInputOtp } = req.body;
  if (!UserInputOtp) {
    throw new Apierror(400, "OTP is required");
  }

  let otp;
  try {
    otp = await OtpModel.findOne({ email: email });
  } catch (error) {
    throw new Apierror(500, "database Error");
  }
  if (otp == null) {
    throw new Apierror(
      400,
      "OTP not found or expired. Please request a new OTP",
    );
  }
  const hashedInputOTP = crypto
    .createHash("sha256")
    .update(String(UserInputOtp))
    .digest("hex");
  const currentTime = Date.now();
  const expireTime = otp.expireAt.getTime();
  if (currentTime > expireTime) {
    throw new Apierror(400, "OTP expired");
  } else {
    if (hashedInputOTP === otp.otp) {
        return true
    } else {
      throw new Apierror(404, "Invaild OTP");
    }
  }
};
