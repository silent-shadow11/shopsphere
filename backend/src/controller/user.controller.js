import { Cart } from "../models/cart.model.js";
import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";
import { Apierror } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { DeleteOnCloudinary, UploadOnCloudinary } from "../utils/cloudinary.js";

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { username, fullname } = req?.body;

  if (!username?.trim() && !fullname?.trim()) {
    throw new Apierror(404, "Atleast One field required...");
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    throw new Apierror(404, "user not found");
  }
  if (username?.trim()) {
    const existedUsername = await User.findOne({
      username: username,
      _id: { $ne: req.user._id },
    });
    if (existedUsername) {
      throw new Apierror(409, "user name already present...");
    }
  }

  const Updateduser = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        fullname: fullname?.trim() || user.fullname,
        username: username?.trim() || user.username,
      },
    },
    { new: true },
  );

  return res
    .status(200)
    .json(new ApiResponse(200, Updateduser, "User update sucessfully ..."));
});

const updateUserAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req?.files?.avatar?.[0]?.path;

  if (!avatarLocalPath) {
    throw new Apierror(404, "Avatar files are required ...");
  }
  const prevPublicId = req.user.avater_publicId;

  let UploadImageResponse = null;
  if (avatarLocalPath) {
    UploadImageResponse = await UploadOnCloudinary(avatarLocalPath, "avatar");
  }

  if (!UploadImageResponse?.secure_url) {
    throw new Apierror(500, "avatar failed");
  }

  const user = await User.findByIdAndUpdate(
    req?.user?._id,
    {
      $set: {
        avater: UploadImageResponse?.secure_url,
        avater_publicId: UploadImageResponse?.public_id,
      },
    },
    { new: true },
  ).select("-password");

  if (!user) {
    throw Apierror(404, "user update in database Error...");
  }
  if (prevPublicId) {
    await DeleteOnCloudinary(prevPublicId);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Image Upload sucessfully ..."));
});

const UpdateRating = asyncHandler(async (req, res) => {
  const { productId } = req?.params;
  let { rating } = req?.body;
  if (!productId) {
    throw new Apierror(401, "ProductId is required..");
  }

  rating = Number(rating);

  if (
    rating === undefined ||
    rating === null ||
    rating === "" ||
    !Number.isFinite(rating) ||
    rating < 1 ||
    rating > 5
  ) {
    throw new Apierror(401, "Rating is required and should be between 1 to 5");
  }
  const product = await Product.findById(productId);

  if (!product) {
    throw new Apierror(404, "product not found..");
  }

  const Prevnumviews = product.numReviews;
  product.numReviews = Prevnumviews + 1;

  const Prevrating = product.rating;
  product.rating = (Prevrating * Prevnumviews + rating) / (Prevnumviews + 1);

  await product.save();

  return res
    .status(200)
    .json(new ApiResponse(200, product, "Rating update sucessfully..."));
});

const getmyOrder = asyncHandler(async (req, res) => {
  const user = req?.user;
  if (!user) {
    throw new Apierror(401, "user is required..");
  }

  const myorder = await Order.find({
    user: user._id,
  }).sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, myorder, "user order fetch sucessfully..."));
});

const getCart = asyncHandler(async (req, res) => {
  const user = req?.user;
  
  if (!user) {
    throw new Apierror(401, "user is required...");
  }
  const cart = await Cart.find({ user: user._id });

  return res
    .status(200)
    .json(new ApiResponse(200, cart, "user cart fetch sucessfully.."));
});

export {
  updateAccountDetails,
  updateUserAvatar,
  UpdateRating,
  getmyOrder,
  getCart,
};
