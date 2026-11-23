import { Cart } from "../models/cart.model.js";
import { Order } from "../models/order.model.js";
import { Apierror } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createOrder = asyncHandler(async (req, res) => {
  const user = req?.user;

  const { name, email, phone, shippingAddress, paymentMethod } = req?.body;

  if (
    [name, email, phone, paymentMethod, shippingAddress, paymentStatus].some(
      (item) => typeof item !== "string" || item.trim() === "",
    )
  ) {
    throw new Apierror(400, "Required fields are missing..");
  }
  const cart = await Cart.findOne({ user: user._id });
  if (!cart || cart.items.length === 0) {
    throw new Apierror(400, "Cart is empty");
  }
  const orderItems = cart.items.map((item) => ({
    name: item.product.name,
    product: item.product._id,
    price: item.price,
    quantity: item.quantity,
    image: item.product.image,
  }));

  const customer = {
    name: name,
    email: email,
    phone: phone,
  };

  const totalAmount = cart.items.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);
  const order = await Order.create({
    user: user._id,
    items: orderItems,
    customer: customer,
    shippingAddress: shippingAddress,
    totalAmount: totalAmount,
    paymentMethod: paymentMethod,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, order, "order placed successfully..."));
});

const deleteOrder = asyncHandler(async (req, res) => {
  const user = req?.user;
  const { orderId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    throw new Apierror(400, "Invalid Order ID");
  }

  const order = await Order.findOneAndDelete({
    _id: orderId,
    user: user._id,
  });

  if (!order) {
    throw new Apierror(404, "Order not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, order, "Order deleted successfully."));
});

const updateOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const user = req?.user;
  const { paymentStatus } = req?.body;

  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    throw new Apierror(400, "Invalid Order ID");
  }

  if (typeof paymentStatus !== "string" || paymentStatus.trim() === "") {
    throw new Apierror(400, "Payment status is required.");
  }

  const allowedStatus = ["Pending", "Paid", "Failed", "Refunded"];

  if (!allowedStatus.includes(paymentStatus)) {
    throw new Apierror(400, "Invalid payment status.");
  }

  if (user.role !== "admin") {
    throw new Apierror(403, "Only admin can update payment status.");
  }

  const order = await Order.findByIdAndUpdate(
    orderId,
    { $set: { paymentStatus } },
    { new: true, runValidators: true },
  );

  if (!order) {
    throw new Apierror(404, "Order not found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, order, "Order updated successfully."));
});

const getMyOrders = asyncHandler(async (req, res) => {
  const user = req.user;

  const order = await Order.find({ user: user._id });

  return res
    .status(200)
    .json(new ApiResponse(200, order, "order fetch sucessfully..."));
});

const getOrderById = asyncHandler(async (req, res) => {
  const user = req.user;
  const { orderId } = req.params;
  if (orderId.trim() === "") {
    throw new Apierror(404, "orderId is required...");
  }

  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    throw new Apierror(400, "Invalid Order ID");
  }

  const order = await Order.findOne({
    _id: orderId,
    user: user._id,
  });

  if (!order) {
    throw new Apierror(404, "No order found..");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, order, "order fetch successfully.."));
});

export { createOrder, deleteOrder, updateOrder, getMyOrders, getOrderById };
