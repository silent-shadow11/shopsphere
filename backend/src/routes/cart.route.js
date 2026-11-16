import { Router } from "express";
import { AcessTokenverifyJWT } from "../middleware/auth.middleware";
import {
  addTocart,
  getcart,
  updateTocart,
} from "../controller/cart.controller";

const router = Router();

router.route("/addTocart/:productId").get(AcessTokenverifyJWT, addTocart);

router.route("/removeCart/:productId").get(AcessTokenverifyJWT);

router.route("/updateCart/:productId").post(AcessTokenverifyJWT, updateTocart);

router.route("/getCart").get(AcessTokenverifyJWT, getcart);
