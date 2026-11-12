// remaining rate limit

import { OtpModel } from "../models/otp.model";
import nodemailer from "nodemailer";
import { randomInt } from "crypto";
import { Apierror } from "./ApiError";
import crypto from "crypto";
export const Otpgenerator = async (email, prevAttempt = 0) => {
  let prevOTP;
  try {
    prevOTP = await OtpModel.findOne({ email: email });
  } catch (error) {
    throw new Apierror(500, "database Error");
  }
  if (prevOTP) {
    const currentTime = Date.now();
    const createdTime = prevOTP.createdAt.getTime();

    const cooldown = 5 * 60 * 1000;

    if (currentTime - createdTime < cooldown) {
      throw new Apierror(
        429,
        "Please wait 5 minutes before requesting a new OTP",
      );
    }

    try {
      await OtpModel.deleteOne({ _id: prevOTP._id });
    } catch (error) {
      throw new Apierror(500, "database Error");
    }
  }
  // Asynchronous
  const otpData = randomInt(100000, 1000000);
  const HashedOtp = crypto
    .createHash("sha256")
    .update(String(otpData))
    .digest("hex");
  let OTP = null;
  try {
    OTP = await OtpModel.create({
      email: email,
      otp: HashedOtp,
      attempts: prevAttempt + 1,
      expireAt: Date.now(),
    });
  } catch (error) {
    throw new Apierror(500, "Unexpected database Error");
  }

  // Create a transporter using SMTP
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  /// send email
  try {
    const info = await transporter.sendMail({
      from: `"Shopsphere Team" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Verify Your Email - Shopsphere",

      text: `Welcome to ShopSphere! Your email verification OTP is ${otpData}. This OTP is valid for 5 minutes. Do not share it with anyone.`,

      html: `
    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 20px auto; padding: 30px; border: 1px solid #e5e7eb; border-radius: 12px;">

      <h1 style="text-align: center; color: #2563eb;">
        ShopSphere
      </h1>

      <h2 style="color: #333;">Verify Your Email</h2>

      <p>Hello,</p>

      <p>
        Welcome to <strong>ShopSphere</strong>!
        We're excited to have you onboard.
      </p>

      <p>
        Use the following OTP to verify your email address:
      </p>

      <div style="background: #f3f4f6; padding: 20px; text-align: center; border-radius: 8px; margin: 25px 0;">
        <h1 style="color: #2563eb; letter-spacing: 10px; margin: 0;">
          ${otpData}
        </h1>
      </div>

      <p>
        This OTP will expire in <strong>5 minutes</strong>.
      </p>

      <p style="color: #dc2626;">
        For your security, never share this OTP with anyone.
      </p>

      <hr style="border: 0; border-top: 1px solid #eee;">

      <p style="font-size: 12px; color: #777;">
        If you didn't request this verification, please ignore this email.
      </p>

      <p>
        Best regards,<br>
        <strong>ShopSphere Team</strong>
      </p>

    </div>
  `,
    });
    console.log("Message sent: %s", info.messageId);
    return OTP;
  } catch (err) {
    if (OTP != null) {
      try {
        await OtpModel.deleteOne({ _id: OTP._id });
      } catch (error) {
        throw new Apierror(500, "Database connection failed");
      }
    }
    throw new Apierror(500, `Error while sending mail: ${err}`);
  }
};
