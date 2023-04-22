import Tour from "../models/Tour.js";

export const createTour = async (req, res) => {
  const newtour = new Tour(req.body);
  try {
    const savedTour = await newtour.save();
    res.status(200).json({
      success: true,
      message: "Successfully created",
      data: savedTour,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Fail to create. Try again" });
  }
};

//update tour
export const updateTour = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedTour = await Tour.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedTour,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Fail to update. Try again" });
  }
};

//delete tour
export const deleteTour = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedTour = await Tour.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Fail to delete. Try again" });
  }
};

//get single tour
export const getSingleTour = async (req, res) => {
  const id = req.params.id;
  try {
    const tour = await Tour.findById(id).populate("reviews");
    res.status(200).json({
      success: true,
      message: "Successfully get tour",
      data: tour,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "Not found" });
  }
};

//get all tour
export const getAllTour = async (req, res) => {
  const page = parseInt(req.query.page);

  try {
    const tours = await Tour.find({})
      .populate("reviews")
      .populate("cateId")
      .populate("investorId")
      .skip(page * 8)
      .limit(8);
    res.status(200).json({
      success: true,
      message: "Successfully",
      result: tours.length,
      data: tours,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "Not found" });
  }
};

//get tour by search
export const getTourBySearch = async (req, res) => {
  const city = new RegExp(req.query.city, "i");
  const distance = parseInt(req.query.distance);
  const maxGroupSize = parseInt(req.query.maxGroupSize);
  try {
    const tours = await Tour.find({
      city: city,
      distance: { $gte: distance },
      maxGroupSize: { $gte: maxGroupSize },
    }).populate("reviews");

    res.status(200).json({
      success: true,
      message: "Successfullyy",
      result: tours.length,
      data: tours,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "Not found" });
  }
};

//get featured tour
export const getFeaturedTour = async (req, res) => {
  try {
    const tours = await Tour.find({ featured: true })
      .populate("reviews")
      .limit(8);
    res.status(200).json({
      success: true,
      message: "Successfully",
      result: tours.length,
      data: tours,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "Not found" });
  }
};

//get tour counts
export const getTourCount = async (req, res) => {
  try {
    const tourCount = await Tour.estimatedDocumentCount();
    res.status(200).json({ success: true, data: tourCount });
  } catch (error) {
    res.status(500).json({ success: false, message: "failed to fetch" });
  }
};
