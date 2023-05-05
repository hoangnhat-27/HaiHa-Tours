import express from "express";
import {
  createDiscount,
  deleteDiscount,
  getAllDiscounts,
  getSingleDiscount,
  getSingleUserDiscount,
  updateDiscount,
} from "./../controllers/discountController.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();
router.post("/", verifyAdmin, createDiscount);
router.put("/:id", verifyAdmin, updateDiscount);
router.delete("/:id", verifyAdmin, deleteDiscount);
router.get("/:id", getSingleDiscount);
router.get("/", verifyAdmin, getAllDiscounts);
router.get("/user/:id", verifyUser, getSingleUserDiscount);
export default router;
