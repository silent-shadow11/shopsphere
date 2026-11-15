import { Category } from "../models/category.model.js";
import { Product } from "../models/product.model.js";
import { Apierror } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { DeleteOnCloudinary, UploadOnCloudinary } from "../utils/cloudinary.js";
import crypto from "crypto";
import slugify from "slugify";

const productAdd = asyncHandler(async (req, res) => {
  const user = req?.user;
  if (!user) {
    throw new Apierror(401, "User not found..");
  }

  if (user.role !== "admin") {
    throw new Apierror(403, "Only admin can acess..");
  }

  const { name, description, price, category, brand, stock } = req.body;

  if (
    [name, description, category].some((field) => !field || field.trim() === "")
  ) {
    throw new Apierror(400, "All fields are required");
  }
  if (!Number.isFinite(Number(price)) || Number(price) <= 0) {
    throw new Apierror(
      400,
      "Price should be Number and greater than eqaul to 0",
    );
  }

  if (
    !Number.isFinite(Number(stock)) ||
    Number(stock) < 0 ||
    !Number.isInteger(Number(stock))
  ) {
    throw new Apierror(
      400,
      "Stock should be Integer Number and greater than  0",
    );
  }

  const ProductImage = req?.files || [];

  if (ProductImage.length == 0) {
    throw new Apierror(404, "Product Image Required...");
  }

  const slug = slugify(category, {
    lower: true,
    strict: true,
  });
  const FindCategory = await Category.findOne({
    name: category,
    slug: slug,
  });
  let NewCategroy = FindCategory;
  if (!FindCategory) {
    NewCategroy = await Category.create({
      name: category,
      slug: slug,
      isactive: true,
      createdby: user._id,
    });
  }

  const product = await Product.findOne({
    admin: user._id,
    name: name,
    category: NewCategroy._id,
  });
  if (product) {
    throw new Apierror(
      409,
      "Product already existed . you can increase product stocks..",
    );
  }

  const UploadProductUrl = await Promise.all(
    ProductImage.map(async (file) => {
      const filePath = file?.path;
      const result = await UploadOnCloudinary(
        filePath,
        `Product/${category}/${name}`,
      );
      return {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }),
  );

  const saveProduct = await Product.create({
    admin: user._id,
    name: name,
    description: description,
    images: UploadProductUrl,
    stock: Number(stock) ?? 1,
    sku: crypto.randomUUID(),
    price: Number(price) ?? 0,
    brand: brand,
    category: NewCategroy._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, saveProduct, "Product save successfully"));
});

const productRemove = asyncHandler(async (req, res) => {
  const user = req?.user;
  const { productId } = req?.params;
  console.log(productId);

  const product = await Product.findOne({
    _id: productId,
    admin: user._id,
  });
  if (!product) {
    throw new Apierror(404, "Product not found..");
  }
  const ProductImage = product.images;
  const DeleteProductImage = await Promise.allSettled(
    ProductImage.map(async (items) => {
      if (items.public_id != null) {
        await DeleteOnCloudinary(items.public_id);
        await Product.findOneAndUpdate(
          {
            _id: productId,
            admin: user._id,
          },
          {
            $pull: {
              images: {
                public_id: items.public_id,
              },
            },
          },
        );
      }
    }),
  );

  const isFailed = DeleteProductImage.some(
    (items) => items.status === "rejected",
  );

  if (isFailed) {
    throw new Apierror(502, "Failed to delete photo from Cloudinary");
  }

  await Product.findOneAndDelete({
    _id: productId,
    admin: user._id,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Product Delete Sucessfully.."));
});

const SetDiscountprice = asyncHandler(async (req, res) => {
  const { productId } = req?.params;
  let { discountPrice } = req?.body;
  if (!productId) {
    throw new Apierror(404, "productID is Required...");
  }
  if (!discountPrice) {
    throw new Apierror(404, "Discount Price is Required..");
  }

  discountPrice = Number(discountPrice);

  if (!Number.isFinite(discountPrice) || Number(discountPrice) < 0) {
    throw new Apierror(400, "DiscountPrice should be Integer...");
  }

  let product = await Product.findOne({
    admin: req?.user._id,
    _id: productId,
  });
  if (!product) {
    throw new Apierror(404, "Product not found..");
  }

  if (product.price < discountPrice) {
    throw new Apierror(
      400,
      "Discount price should be less than original price",
    );
  }

  product = await Product.findOneAndUpdate(
    {
      admin: req?.user._id,
      _id: productId,
    },
    {
      $set: {
        discount_price: discountPrice,
      },
    },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!product) {
    throw new Apierror(404, "Product is not founded..");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, product, "Discount Price changed sucessfully..."),
    );
});

const SetPrice = asyncHandler(async (req, res) => {
  const { productId } = req?.params;
  let { Price } = req?.body;
  if (!productId) {
    throw new Apierror(404, "productID is Required...");
  }
  if (!Price) {
    throw new Apierror(404, "Price is Required..");
  }

  Price = Number(Price);

  if (!Number.isFinite(Price) || Number(Price) < 0) {
    throw new Apierror(400, "Price should be Integer and greater than 0...");
  }

  let product = await Product.findOne({
    admin: req?.user._id,
    _id: productId,
  });
  if (!product) {
    throw new Apierror(404, "Product not found..");
  }

  if (product.discount_price > Price) {
    throw new Apierror(400, "price should be greater than Discount price");
  }

  product = await Product.findOneAndUpdate(
    {
      admin: req?.user._id,
      _id: productId,
    },
    {
      $set: {
        price: Price,
      },
    },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!product) {
    throw new Apierror(404, "Product is not founded..");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, product, "Price changed sucessfully..."));
});

const AddProductImage = asyncHandler(async (req, res) => {
  const { productId } = req?.params;
  if (!productId) {
    throw new Apierror(404, "productID is Required...");
  }
  const ProductImage = req?.files || [];

  if (ProductImage.length == 0) {
    throw new Apierror(400, "Product Image Required...");
  }
  let product = await Product.findOne({
    admin: req?.user._id,
    _id: productId,
  });
  if (!product) {
    throw new Apierror(404, "Product not found..");
  }

  const UploadProductUrl = await Promise.all(
    ProductImage.map(async (file) => {
      const filePath = file?.path;
      const result = await UploadOnCloudinary(
        filePath,
        `Product/${product.category}/${product.name}`,
      );
      return {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }),
  );

  product = await Product.findOneAndUpdate(
    {
      admin: req?.user._id,
      _id: productId,
    },
    {
      $push: {
        images: {
          $each: UploadProductUrl,
        },
      },
    },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!product) {
    throw new Apierror(404, "Product is not founded..");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, product, "Image added sucessfully..."));
});

const DeleteProductImage = asyncHandler(async (req, res) => {
  const { productId, imagepublicId } = req?.params;
  if (!productId || !imagepublicId) {
    throw new Apierror(404, "productId and imageId are Required...");
  }
  let product = await Product.findOne({
    admin: req?.user._id,
    _id: productId,
  });
  if (!product) {
    throw new Apierror(404, "Product not found..");
  }
  const IsexitImage = product.images.some(
    (img) => img.public_id === imagepublicId,
  );
  if (!IsexitImage) {
    throw new Apierror(404, "Image does not exits..");
  }
  if (product.images.length <= 1) {
    throw new Apierror(400, "Product must be a photo...");
  }

  const DeleteProductImage = await DeleteOnCloudinary(imagepublicId);

  product = await Product.findOneAndUpdate(
    {
      admin: req?.user._id,
    },
    {
      $pull: {
        images: {
          public_id: imagepublicId,
        },
      },
    },
  );

  return res
    .status(200)
    .json(new ApiResponse(200, product, "Image Delete sucessfully..."));
});

const updateStock = asyncHandler(async (req, res) => {
  const { productId } = req?.params;
  let { stock } = req?.body;
  if (!productId) {
    throw new Apierror(404, "ProductId is required...");
  }
  stock = Number(stock);
  if (stock > 0 || Number.isInteger(stock)) {
    throw new Apierror(401, "Number should be interger..");
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw new Apierror(404, "Product not found...");
  }

  product.stock = stock;
  await product.save();
  return res
    .status(200)
    .json(new ApiResponse(200, product, "Stock updated sucessfully..."));
});

const getAllProduct = asyncHandler(async (req, res) => {
  const user = req?.user;
  if (!user) {
    throw new Apierror(401, "user is required..");
  }

  if (user.role !== "admin") {
    throw new Apierror(403, "user should be admin");
  }

  const product = await Product.find({
    admin: user._id,
  });

  if (!product) {
    throw new Apierror(404, "Product not found..");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, product, "Product fetch sucessfully.."));
});

export {
  productAdd,
  productRemove,
  SetDiscountprice,
  SetPrice,
  AddProductImage,
  DeleteProductImage,
  updateStock,
  getAllProduct
};
