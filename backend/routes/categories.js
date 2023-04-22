import express from "express";
import {
  createCategory,
  getAllCategories,
  getSingleCategories,
  updateCategory,
} from "../controllers/categoryController.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

router.post("/", verifyAdmin, createCategory);
router.put("/:id", verifyAdmin, updateCategory);
router.get("/:id", getSingleCategories);
router.get("/", getAllCategories);

export default router;
