import { Router } from "express";
import { AcessTokenverifyJWT } from "../middleware/auth.middleware.js";
import {
  CreateCategory,
  getAllCategory,
} from "../controller/category.controller.js";

const router = Router();

router.route("/Createcategory").post(AcessTokenverifyJWT, CreateCategory);



export default router

