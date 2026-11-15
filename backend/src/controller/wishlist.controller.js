import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";
import { Apierror } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler.js";

const addToWishlist = asyncHandler(async (req, res) => {
  const { productId } = req?.body;
  if (!productId) {
    throw new Apierror(404, "Product Id are required..");
  }
  const product = await Product.findById(productId);

  if (!product) {
    throw new Apierror(404, "product not found..");
  }
  let cart;

  const exisInCart = await Cart.findOne({
    user:req.user._id,
    "items.product":productId
  });
  if (exisInCart) {
    const prevquantity = exisInCart.quantity;
    exisInCart.quantity = prevquantity + 1;
    exisInCart.totalprice = (prevquantity + 1) * product.discount_price;
    cart=await exisInCart.save();
  } else {
    cart = await Cart.create({
      user: req.user,
      items: {
        product: product._id,
        price: product.price,
      },
      totalprice: product.discount_price,
    });
  }

  return res.status(200).json(200,new ApiResponse(200,cart,"Product add to cart successfully..."))
});
