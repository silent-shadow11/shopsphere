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
      default: "This is new Category..",
    },
    image: {
      url: {
        type: String,
        default: "image/default_category.jpg",
      },
      public_id: {
        type: String,
        default: null,
      },
    },
    isactive: {
      type: Boolean,
    },
    createdby: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

export const Category = mongoose.model("Category", CategorySchema);
