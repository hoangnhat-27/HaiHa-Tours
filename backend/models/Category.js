import mongoose from "mongoose";

const catogorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
    fatherCateId: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Category", catogorySchema);
