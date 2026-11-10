import mongoose, { Schema, Types } from "mongoose";

const OderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    items: [
      {
        name: {
          type: String,
          required: true,
        },
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        image: {
          type: String,
          required: true,
        },
      },
    ],
    customer: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
    },
    shippingAddress:{
        type:String,
        required:true
    },
    totalAmount:{
        type:Number,
        required:true
    },
    paymentMethod:{
        type:String,
        enum:["online","ofline"],
        required:true   
    },
    paymentStatus:{
        type:String,
        required:true
    },
    orderStatus:{
        type:String,
        required:true
    }
  },
  { timestamps: true },
);

export const Order = mongoose.model("Order", OderSchema);
