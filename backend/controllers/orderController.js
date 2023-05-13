import Order from "../models/Order.js";

//create new order
export const createOrder = async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json({
      success: true,
      message: "Your tour is booked",
      data: savedOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//get single user order
export const getOrderUser = async (req, res) => {
  const id = req.params.userId;
  try {
    const order = await Order.find({ userId: id })
      .populate("userId")
      .populate("tourId");
    res.status(200).json({ success: true, message: "Successful", data: order });
  } catch (error) {
    res.status(404).json({ success: true, message: "Not found" });
  }
};

//get single user order
export const getSingleOrder = async (req, res) => {
  const id = req.params.id;
  try {
    const order = await Order.find({ _id: id })
      .populate("userId")
      .populate("tourId");
    res.status(200).json({ success: true, message: "Successful", data: order });
  } catch (error) {
    res.status(404).json({ success: true, message: "Not found" });
  }
};

//get all Order
export const getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("userId").populate("tourId");
    res.status(200).json({
      success: true,
      message: "Successful",
      result: orders.length,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({ success: true, message: "Internal server error" });
  }
};

//edit order
export const updateOrder = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedOrder,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Fail to update. Try again" });
  }
};
