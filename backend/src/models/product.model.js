import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    admin: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    discount_price: {
      type: Number,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    brand: {
      type: String,
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        public_id: {
          type: String,
          required: true,
        },
      },
    ],
    stock: {
      type: Number,
      default: 1,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    numReviews: {
      type: Number,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    sku: { // unique item
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const Product = mongoose.model("Product", ProductSchema);
