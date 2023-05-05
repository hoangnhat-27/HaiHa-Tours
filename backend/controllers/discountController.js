import Discount from "../models/Discount.js";

//create a new discount
export const createDiscount = async (req, res) => {
  const newDiscount = new Discount(req.body);
  try {
    const savedDiscount = await newDiscount.save();
    res.status(200).json({
      success: true,
      message: "Create discount successfully",
      data: savedDiscount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
//update discount
export const updateDiscount = async (req, res) => {
  const id = req.params.id;
  try {
    const discount = await Discount.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Successfuly updated",
      data: discount,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//delete tour
export const deleteDiscount = async (req, res) => {
  const id = req.params.id;
  try {
    await Discount.findByIdAndDelete(id);
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

//get single discount
export const getSingleDiscount = async (req, res) => {
  const id = req.params.id;
  try {
    const discount = await Discount.findById(id).populate("userId");
    res.status(200).json({
      success: true,
      message: "Successfully get discount",
      data: discount,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "Not found" });
  }
};
//get single user discount
export const getSingleUserDiscount = async (req, res) => {
  const id = req.params.id;
  try {
    const discount = await Discount.find({ userId: id }).populate("userId");
    res.status(200).json({
      success: true,
      message: "Successfully get user discount",
      data: discount,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "Not found" });
  }
};

//get all discount
export const getAllDiscounts = async (req, res) => {
  try {
    const discounts = await Discount.find({}).populate("userId");
    res.status(200).json({
      success: true,
      message: "Successful",
      result: discounts.length,
      data: discounts,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "Internal server error",
      error: error.message,
    });
  }
};
