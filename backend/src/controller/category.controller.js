//create update delete add product delete product

import { Category } from "../models/category.model.js";
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
  const user = req?.user;
  if (!user) {
    throw new Apierror(404, "user is required..");
  }

  const category = await Category.find({
    isactive: true,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, category, "Category fetch sucessfully..."));
});

export { CreateCategory, getAllCategory };
