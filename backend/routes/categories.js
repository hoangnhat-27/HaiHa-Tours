import express from "express";
import {
  createCategory,
  getAllCategories,
  updateCategory,
} from "../controllers/categoryController.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

router.post("/", verifyAdmin, createCategory);
router.get("/:id", verifyAdmin, updateCategory);
router.get("/", getAllCategories);

export default router;
