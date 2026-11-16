import { Router } from "express";
import { AcessTokenverifyJWT } from "../middleware/auth.middleware";
import {
  CreateCategory,
} from "../controller/category.controller.js";

const router = Router();

router.route("/Createcategory").post(AcessTokenverifyJWT, CreateCategory);

