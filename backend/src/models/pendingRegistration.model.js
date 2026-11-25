
import mongoose, { Schema } from "mongoose";

const pendingRegistrationSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
      trim: true,
      index: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      require: true,
      trim: true,
    },
    fullname: {
      type: String,
      require: true,
    },
    avater: {
      type: String,
      default: "image/default_avatar.jpg",
    },
    avater_publicId: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    refreshToken: {
      type: String,
    },
    isverified: {
      type: Boolean,
    },
  },
  { timestamps: true },
);

pendingRegistrationSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 900 }
  )

export const PendingRegistration = mongoose.model(
  "PendingRegistration",
  pendingRegistrationSchema
);
