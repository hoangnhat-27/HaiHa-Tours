import express from "express";
import {
  createOrder,
  getAllOrder,
  getOrder,
  updateOrder,
} from "../controllers/orderController.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

router.post("/create", verifyUser, createOrder);
router.get("/:id", verifyUser, getOrder);
router.put("/:id", verifyAdmin, updateOrder);
router.get("/", verifyAdmin, getAllOrder);

export default router;
