import express from "express";
import {
  createOrder,
  getAllOrder,
  getSingleOrder,
  getOrderUser,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
import { checkSlots } from "../utils/checkSlot.js";
const router = express.Router();

router.post("/create", verifyUser, checkSlots, createOrder);
router.get("/user/:userId", verifyUser, getOrderUser);
router.get("/:id", verifyAdmin, getSingleOrder);
router.put("/:id", verifyAdmin, updateOrder);
router.delete("/:id", verifyUser, deleteOrder);
router.get("/", verifyAdmin, getAllOrder);

export default router;
