import { Router } from "express";
import {
  changeCurrentPassword,
  getCurrentUser,
  loginUser,
  logoutAlldevice,
  logoutUser,
  refreshAccessToken,
  registerUser,
} from "../controller/auth.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { AcessTokenverifyJWT } from "../middleware/auth.middleware.js";
import { updateAccountDetails, updateUserAvatar } from "../controller/user.controller.js";

const router = Router();

//Auth field ......

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  registerUser,
);

router.route("/login").post(upload.none(), loginUser);

router.route("/logout").get(AcessTokenverifyJWT, logoutUser);
router.route("/logoutallDevice").get(AcessTokenverifyJWT, logoutAlldevice);

router.route("/refreshAccessToken").get(refreshAccessToken);
router
  .route("/changeCurrentPassword")
  .patch(AcessTokenverifyJWT, changeCurrentPassword);

router.route("/getCurrentUser").get(AcessTokenverifyJWT, getCurrentUser);

// user field .....

router.route("/UpdateAccountDetails").post(AcessTokenverifyJWT,updateAccountDetails)

router.route("/UpdateAvatar").post(upload.fields([
    {
        name:"avatar",
        maxCount:1
    }
]),AcessTokenverifyJWT,updateUserAvatar)









export default router;
