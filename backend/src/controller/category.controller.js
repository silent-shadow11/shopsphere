//create update delete add product delete product

import mongoose from "mongoose";
import { Category } from "../models/category.model.js";
import { Product } from "../models/product.model.js";
import { Apierror } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import slugify from "slugify";

const CreateCategory = asyncHandler(async (req, res) => {
  const user = req?.user;
  const { categoryName, description } = req?.body;

  if (user.role !== "admin") {
    throw new Apierror(403, "Unauthorized Acess..");
  }

  if (categoryName.trim() === "") {
    throw new Apierror(404, "Category name required..");
  }

  const IspresentCategory = await Category.findOne({
    name: categoryName,
  });
  if (IspresentCategory) {
    throw new Apierror(409, "Category already exists..");
  }

  const ImagePath = req?.files?.path || [];
  let UploadProductUrl = null;

  if (ImagePath.length != 0) {
    UploadProductUrl = await UploadOnCloudinary(
      ImagePath,
      `Product/${categoryName}`,
    );
  }

  const slug = slugify(categoryName, {
    lower: true,
    strict: true,
  });
  await Category.create({
    name: categoryName,
    slug: slug,
    description: description,
    image: UploadProductUrl,
    isactive: true,
    createdby: user,
  });
});

const getAllCategory = asyncHandler(async (req, res) => {
  const category = await Category.find({
    isactive: true,
  });
  

  return res
    .status(200)
    .json(new ApiResponse(200, category, "Category fetch sucessfully..."));
});

const getAllProduct = asyncHandler(async (req, res) => {
  const product = await Product.find().populate("category");

  if (!product) {
    throw new Apierror(404, "Product not found..");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, product, "Product fetch sucessfully.."));
});

const ProductDetails = asyncHandler(async (req, res) => {
  const id = req?.params?.id;
  console.log(id);
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Apierror(400, "Invaild productId");
  }
  const product = await Product.findById(id).populate("category");


  if (!product) {
    throw new Apierror(404, "ProductId is invaild...");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, product, "product fetch sucessfully..."));
});
export { CreateCategory, getAllCategory, getAllProduct, ProductDetails };
