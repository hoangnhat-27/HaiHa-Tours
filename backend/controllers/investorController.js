import Investor from "../models/Investor.js";

//create a new investor
export const createInvestor = async (req, res) => {
  const newInvestor = new Investor(req.body);
  try {
    const savedInvestor = await newInvestor.save();
    res.status(200).json({
      success: true,
      message: "Create investor successfully",
      data: savedInvestor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
//update investor
export const updateInvestor = async (req, res) => {
  const id = req.params.id;
  try {
    const investor = await Investor.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Successfuly updated",
      data: investor,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//delete investor
export const deleteInvestor = async (req, res) => {
  const id = req.params.id;
  try {
    await Investor.findByIdAndDelete(id);
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

//get single investor
export const getSingleInvestor = async (req, res) => {
  const id = req.params.id;
  try {
    const investor = await Investor.findById(id);
    res.status(200).json({
      success: true,
      message: "Successfully get investor",
      data: investor,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "Not found" });
  }
};

//get all investor
export const getAllInvestors = async (req, res) => {
  try {
    const categories = await Investor.find();
    res.status(200).json({
      success: true,
      message: "Successful",
      result: categories.length,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "Internal server error",
      error: error.message,
    });
  }
};
