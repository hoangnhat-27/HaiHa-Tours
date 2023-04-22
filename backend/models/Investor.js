import mongoose from "mongoose";

const investorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Investor", investorSchema);
