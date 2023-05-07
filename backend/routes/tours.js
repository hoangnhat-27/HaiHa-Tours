import express from "express";
import {
  createTour,
  deleteTour,
  getAllTour,
  getSingleTour,
  updateTour,
  getTourBySearch,
  getFeaturedTour,
  getTourCount,
} from "./../controllers/tourController.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();
router.post("/", verifyAdmin, createTour);
router.put("/:id", verifyUser, updateTour);
router.delete("/:id", verifyAdmin, deleteTour);
router.get("/:id", getSingleTour);
router.get("/", getAllTour);
router.get("/search/getTourBySearch", getTourBySearch);
router.get("/search/getFeaturedTours", getFeaturedTour);
router.get("/search/getTourCount", getTourCount);
export default router;
