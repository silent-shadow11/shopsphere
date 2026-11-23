import { Router } from "express";
import { AcessTokenverifyJWT } from "../middleware/auth.middleware.js";
import { createOrder, deleteOrder } from "../controller/order.controller.js";

const router = Router();

router.route("/createorder").post(AcessTokenverifyJWT, createOrder);

router.route("/deleteorder/:orderId").post(AcessTokenverifyJWT, deleteOrder);

export default router