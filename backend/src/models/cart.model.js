import mongoose, { Schema, Types } from "mongoose";

const CartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required:true,
      unique:true

    },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalprice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

export const Cart=mongoose.model('Cart',CartSchema)