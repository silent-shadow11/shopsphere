import { Router } from "express";
import {
  changeCurrentPassword,
  getCurrentUser,
  loginUser,
  logoutAlldevice,
  logoutUser,
  refreshAccessToken,
  registerUser,
} from "../controller/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { AcessTokenverifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

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

export default router;
