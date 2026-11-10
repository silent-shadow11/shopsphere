import mongoose,{Schema} from "mongoose";

const sessionSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true   
    },
    refreshTokenHash:{
        type:String,
        required:true   
    },
    userAgent:{
        type:String,
        required:true
    },
    ipAddress:{
        type:String,
    },
    revoked:{
        type:Boolean,
        default:false,
    }
},{timestamps:true})

export const Session=mongoose.model("Session",sessionSchema)