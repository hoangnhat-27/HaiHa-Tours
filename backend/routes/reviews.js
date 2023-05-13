import express from "express";
import {
  createReview,
  getReviewById,
} from "../controllers/reviewController.js";
import { verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

router.post("/:tourId", verifyUser, createReview);
router.get("/:tourId", getReviewById);

export default router;
