import mongoose from "mongoose";

const discountSchema = new mongoose.Schema(
  {
    discountName: {
      type: String,
      required: true,
    },
    discountCode: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    belowPrice: {
      type: Number,
      required: true,
    },
    photo: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: null,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Discount", discountSchema);
