import mongoose, { Schema } from "mongoose";


const UserSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
      trim: true,
      index: true,
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
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    refreshToken:{
        type:String,

    },
    isverified:{
        type:Boolean
    }
  },
  { timestamps: true },
);


export const User=mongoose.model("User",UserSchema)
