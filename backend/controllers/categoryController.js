import Category from "../models/Category.js";
import Tour from "../models/Tour.js";

//create a new category
export const createCategory = async (req, res) => {
  const newCategory = new Category(req.body);
  try {
    const savedCategory = await newCategory.save();
    res.status(200).json({
      success: true,
      message: "Create category successfully",
      data: savedCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
//update category
export const updateCategory = async (req, res) => {
  const id = req.params.id;
  try {
    const category = await Category.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Successfuly updated",
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "Internal server error",
      error: error.message,
    });
  }
};
//get all categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
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
//get single categories
export const getSingleCategories = async (req, res) => {
  const id = req.params.id;
  try {
    const category = await Category.findById(id);
    res.status(200).json({
      success: true,
      message: "Successfully get category",
      data: category,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "Not found" });
  }
};

//delete category
export const deleteCategory = async (req, res) => {
  const id = req.params.id;
  try {
    await Tour.deleteMany({ cateId: id });
    await Category.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Successfully delete category",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Fail to delete. Try again" });
  }
};
