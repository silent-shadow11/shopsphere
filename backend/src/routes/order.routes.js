import { Router } from "express";
import { AcessTokenverifyJWT } from "../middleware/auth.middleware";
import { createOrder, deleteOrder } from "../controller/order.controller";

const router = Router();

router.route("/createorder").post(AcessTokenverifyJWT, createOrder);

router.route("/deleteorder/:orderId").post(AcessTokenverifyJWT, deleteOrder);
