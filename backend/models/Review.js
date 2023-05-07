import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    tourId: {
      type: mongoose.Types.ObjectId,
      ref: "Tour",
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
