import express from "express";
import {
  createInvestor,
  updateInvestor,
  getSingleInvestor,
  getAllInvestors,
  deleteInvestor,
} from "../controllers/investorController.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

router.post("/create", verifyAdmin, createInvestor);
router.get("/:id", verifyAdmin, getSingleInvestor);
router.put("/:id", verifyAdmin, updateInvestor);
router.delete("/:id", verifyAdmin, deleteInvestor);
router.get("/", verifyAdmin, getAllInvestors);

export default router;
