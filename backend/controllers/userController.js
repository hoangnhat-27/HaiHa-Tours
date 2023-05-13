import User from "../models/User.js";

export const createUser = async (req, res) => {
  const newUser = new User(req.body);
  try {
    const savedUser = await newUser.save();
    res.status(200).json({
      success: true,
      message: "Successfully created",
      data: savedUser,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Fail to create. Try again" });
  }
};

//update user
export const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedUser,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Fail to update. Try again" });
  }
};

//delete user
export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);
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

//get single User
export const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    res.status(200).json({
      success: true,
      message: "Successfully get User",
      data: user,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "Not found" });
  }
};

//get all user
export const getAllUser = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      success: true,
      message: "Successfully",
      result: users.length,
      data: users,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "Not found" });
  }
};

//get user by search
export const getUserBySearch = async (req, res) => {
  const city = new RegExp(req.query.city, "i");
  const distance = parseInt(req.query.distance);
  const slots = parseInt(req.query.slots);
  try {
    const users = await User.find({
      city: city,
      distance: { $gte: distance },
      slots: { $gte: slots },
    });

    res.status(200).json({
      success: true,
      message: "Successfullyy",
      result: users.length,
      data: users,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "Not found" });
  }
};

//get featured User
export const getFeaturedUser = async (req, res) => {
  try {
    const users = await User.find({ featured: true }).limit(8);
    res.status(200).json({
      success: true,
      message: "Successfully",
      result: users.length,
      data: users,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "Not found" });
  }
};

//get User counts
export const getUserCount = async (req, res) => {
  try {
    const UserCount = await User.estimatedDocumentCount();
    res.status(200).json({ success: true, data: UserCount });
  } catch (error) {
    res.status(500).json({ success: false, message: "failed to fetch" });
  }
};
