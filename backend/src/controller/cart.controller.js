import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";
import { Apierror } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addTocart = asyncHandler(async (req, res) => {
  const { productId } = req?.params;

  if (!productId) {
    throw new Apierror(400, "Product Id is required..");
  }

  const product = await Product.findById(productId);

  if (!product) {
    throw new Apierror(404, "Product not found..");
  }

  if (product.stock <= 0) {
    throw new Apierror(400, "Product is out of stock..");
  }

  const price =
    product.discount_price > 0 ? product.discount_price : product.price;

  let cart = await Cart.findOne({
    user: req.user._id,
  });

  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      items: [
        {
          product: product._id,
          quantity: 1,
          price,
        },
      ],
      totalprice: price,
    });
  } else {
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId,
    );

    if (existingItem) {
      if (existingItem.quantity >= product.stock) {
        throw new Apierror(400, "Maximum available stock reached..");
      }

      existingItem.quantity += 1;
    } else {
      cart.items.push({
        product: product._id,
        quantity: 1,
        price,
      });
    }

    cart.totalprice = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );

    await cart.save();
  }

  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Product added to cart successfully..."));
});

const removeTocart = asyncHandler(async (req, res) => {
  const { productId } = req?.params;
  if (!productId) {
    throw new Apierror(404, "Product Id is required..");
  }
  const cart = await Cart.findOne({
    user: req.user._id,
  });
  const item = cart.items.find((item) => item.product.toString() === productId);

  if (!item) {
    throw new Apierror(404, "Product not found..");
  }

  const price = item.price;
  const quantity = item.quantity;
  const totalprice = cart.totalprice;

  const newprice = totalprice - price * quantity;

  cart.totalprice = newprice;

  const cartItems = cart.items.filter(
    (items) => items.product.toString() !== productId,
  );

  cart.items = cartItems;

  await cart.save();

  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Cart delete sucesfully.."));
});

const updateTocart = asyncHandler(async (req, res) => {
  const { productId } = req?.params;
  const { quantity } = req.body;

  if (!productId) {
    throw new Apierror(404, "productId is required...");
  }

  if (!quantity) {
    throw new Apierror(404, "quantity is required..");
  }

  if (!Number.isInteger(quantity) || quantity < 1) {
    throw new Apierror(400, "Quantity must be a positive integer");
  }

  const product = await Product.findById(productId);

  if (!product) {
    throw new Apierror(404, "Product not found..");
  }

  if (!product.isActive) {
    throw new Apierror(400, "product is not active...");
  }

  if (product.stock < quantity) {
    throw new Apierror(400, "product stock is exceed..");
  }

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    throw new Apierror(404, "No cart exist");
  }

  const item = cart.items.find((item) => item.product.toString() === productId);

  if (!item) {
    throw new Apierror(404, "item not found in cart");
  }

  const price = item.price;
  const prevquantity = item.quantity;
  const totalprice = cart.totalprice;
  const newprice = totalprice - price * prevquantity + price * quantity;
  item.quantity = quantity;
  cart.totalprice = newprice;
  await cart.save();

  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Cart update sucessfully.."));
});

const getcart = asyncHandler(async (req, res) => {
  const user = req?.user;
  if (!user) {
    throw new Apierror(404, "user not found..");
  }

  const cart = await Cart.findOne({ user: user._id }).populate("items.product");

  return res
    .status(200)
    .json(new ApiResponse(200, cart, "cart fetch sucessfully..."));
});

const clearcart = asyncHandler(async (req, res) => {
  const user = req?.user;

  const cart = await Cart.findOneAndDelete({ user: user._id });
  return res
    .status(200)
    .json(new ApiResponse(200, cart, "All cart delete Sucessfully.."));
});
export { addTocart, removeTocart, updateTocart, getcart, clearcart };
