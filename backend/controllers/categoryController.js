import Category from "../models/Category.js";

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
