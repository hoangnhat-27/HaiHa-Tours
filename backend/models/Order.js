import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    userEmail: {
      type: String,
    },
    fullName: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    tourName: {
      type: String,
      required: true,
    },
    people: {
      adult: { type: Number, default: 0 },
      children: { type: Number, default: 0 },
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    bookFrom: {
      type: Date,
      default: new Date(),
    },
    bookTo: {
      type: Date,
      required: true,
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: "notconfirmed",
    },
    paymentMethod: {
      type: String,
      default: "direct",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
