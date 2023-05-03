import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
} from "./../controllers/blogController.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();
router.post("/", verifyAdmin, createBlog);
router.put("/:id", verifyAdmin, updateBlog);
router.delete("/:id", verifyAdmin, deleteBlog);
router.get("/:id", getSingleBlog);
router.get("/", getAllBlogs);
export default router;
