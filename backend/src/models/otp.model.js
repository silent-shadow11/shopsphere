import mongoose, { Schema } from "mongoose";

const OtpSchema=new Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    expireAt:{
        type:Date,
        expires:300
    },
    attempts:{
        type:Number,
        default:0
    },
    verified:{
        type:Boolean,
        default:false
    }
})

export const OtpModel=mongoose.model("otp",OtpSchema)