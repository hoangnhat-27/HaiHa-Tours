import Blog from "../models/Blog.js";

//create a new blog
export const createBlog = async (req, res) => {
  const newBlog = new Blog(req.body);
  try {
    const savedBlog = await newBlog.save();
    res.status(200).json({
      success: true,
      message: "Create blog successfully",
      data: savedBlog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
//update blog
export const updateBlog = async (req, res) => {
  const id = req.params.id;
  try {
    const blog = await Blog.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Successfuly updated",
      data: blog,
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
export const deleteBlog = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
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

//get single blog
export const getSingleBlog = async (req, res) => {
  const id = req.params.id;
  try {
    const blog = await Blog.findById(id);
    res.status(200).json({
      success: true,
      message: "Successfully get blog",
      data: blog,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "Not found" });
  }
};

//get all blog
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({
      success: true,
      message: "Successful",
      result: blogs.length,
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "Internal server error",
      error: error.message,
    });
  }
};
