import mongoose, { Schema } from "mongoose";

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
    },
    isactive: {
      type: Boolean,
    },
    createdby:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
  },
  { timestamps: true },
);

export const Category=mongoose.model("Category",CategorySchema)