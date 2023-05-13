import mongoose from "mongoose";

const tourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    slots: {
      type: Number,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    cateId: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
    investorId: {
      type: mongoose.Types.ObjectId,
      ref: "Investor",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Tour", tourSchema);
