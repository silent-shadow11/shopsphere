import { Router } from "express";
import { AcessTokenverifyJWT } from "../middleware/auth.middleware";
import {
  CreateCategory,
  getAllCategory,
} from "../controller/category.controller.js";

const router = Router();

router.route("/Createcategory").post(AcessTokenverifyJWT, CreateCategory);

router.route("/getallCategory").post(AcessTokenverifyJWT, getAllCategory);
