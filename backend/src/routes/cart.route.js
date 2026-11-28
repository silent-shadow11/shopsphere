import { Router } from "express";
import { AcessTokenverifyJWT } from "../middleware/auth.middleware.js";
import {
  addTocart,
  clearcart,
  getcart,
  updateTocart,
} from "../controller/cart.controller.js";

const router = Router();

router.route("/addTocart").post(AcessTokenverifyJWT, addTocart);

router.route("/removeCart/:productId").get(AcessTokenverifyJWT);

router.route("/updateCart/:productId").post(AcessTokenverifyJWT, updateTocart);

router.route("/getCart").get(AcessTokenverifyJWT, getcart);
router.route("/clearcart").delete(AcessTokenverifyJWT, clearcart);

export default router