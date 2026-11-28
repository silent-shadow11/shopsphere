import { Router } from "express";
import {
  changeCurrentPassword,
  getCurrentUser,
  loginUser,
  logoutAlldevice,
  logoutUser,
  refreshAccessToken,
  registerUser,
  sendOtptoUser,
  verifyOtp,
  verifyUser,
} from "../controller/auth.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { AcessTokenverifyJWT, RefreshTokenverifyJWT } from "../middleware/auth.middleware.js";
import {
  getCart,
  getmyOrder,
  updateAccountDetails,
  UpdateRating,
  updateUserAvatar,
} from "../controller/user.controller.js";
import { getAllCategory, getAllProduct, ProductDetails } from "../controller/category.controller.js";
import { isMatched } from "../utils/MatchOtp.js";

const router = Router();

//Auth field ......

router.route("/sendOtptoUser").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  sendOtptoUser,
);

router.route("/Verifyotp").post(verifyOtp)

router.route("/registerUser").post(
  registerUser
);

router.route("/login").post(upload.none(), loginUser);

router.route("/logout").get(AcessTokenverifyJWT, logoutUser);
router.route("/logoutallDevice").get(AcessTokenverifyJWT, logoutAlldevice);

router.route("/refreshAccessToken").get(refreshAccessToken);
router
  .route("/changeCurrentPassword")
  .patch(AcessTokenverifyJWT, changeCurrentPassword);

router.route("/getCurrentUser").get(AcessTokenverifyJWT, getCurrentUser);

router.route("/verifyUser").get(RefreshTokenverifyJWT,verifyUser)

// user field .....

router
  .route("/UpdateAccountDetails")
  .post(AcessTokenverifyJWT, updateAccountDetails);

router.route("/UpdateAvatar").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  AcessTokenverifyJWT,
  updateUserAvatar,
);

router
  .route("/UpdateRating/:productId")
  .post(AcessTokenverifyJWT, UpdateRating);

router.route("/getallproduct").get(getAllProduct);

router.route("/getallCategory").get( getAllCategory);

router.route("/getallorder").get(AcessTokenverifyJWT, getmyOrder);

router.route("/getcart").get(AcessTokenverifyJWT, getCart);

router.route("/product/:id").get(ProductDetails)

export default router;
