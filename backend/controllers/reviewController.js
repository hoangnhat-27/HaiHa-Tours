import Tour from "../models/Tour.js";
import Review from "../models/Review.js";

export const createReview = async (req, res) => {
  const tourId = req.body.tourId;
  const newReview = new Review({ ...req.body });
  try {
    const savedReview = await newReview.save();
    //create new review -> update review array of tour
    await Tour.findByIdAndUpdate(tourId, {
      $push: { reviews: savedReview._id },
    });
    res
      .status(200)
      .json({ success: true, message: "Review submitted", data: savedReview });
  } catch (error) {
    res.status(500).json({ success: true, message: "Failed to submit" });
  }
};
export const getReviewById = async (req, res) => {
  const tourId = req.params.tourId;
  try {
    const review = await Review.find({ tourId: tourId }).populate("userId");
    res.status(200).json({
      success: true,
      message: "Successfully get review",
      data: review,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "Not found" });
  }
};
