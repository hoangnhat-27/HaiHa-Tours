import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
