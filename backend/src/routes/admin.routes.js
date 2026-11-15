import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import {
  AddProductImage,
  DeleteProductImage,
  getAllProduct,
  productAdd,
  productRemove,
  SetDiscountprice,
  SetPrice,
  updateStock,
} from "../controller/seller_product.controller.js";
import { AcessTokenverifyJWT } from "../middleware/auth.middleware.js";
import { UpdateRating } from "../controller/user.controller.js";

const router = Router();
router
  .route("/Addproduct")
  .post(AcessTokenverifyJWT, upload.array("ProductImage", 5), productAdd);

router
  .route("/Removeproduct/:productId")
  .delete(AcessTokenverifyJWT, productRemove);

router
  .route("/setDiscoutPrice/:productId")
  .post(AcessTokenverifyJWT, SetDiscountprice);

router.route("/setPrice/:productId").post(AcessTokenverifyJWT, SetPrice);

router
  .route("/addproductImage/:productId")
  .post(AcessTokenverifyJWT, AddProductImage);

router
  .route("/deleteproductImage/:productId/:imagepublicId")
  .post(AcessTokenverifyJWT, DeleteProductImage);

router.route("/Updatestock/:productId").post(AcessTokenverifyJWT, updateStock);

router
  .route("/UpdateRating/:productId")
  .post(AcessTokenverifyJWT, UpdateRating);

router.route("/getallproduct").get(AcessTokenverifyJWT, getAllProduct);

export default router;
