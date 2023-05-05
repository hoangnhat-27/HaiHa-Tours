import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
    },
    gender: {
      type: String,
    },
    birthday: {
      type: Date,
    },
    photo: {
      type: String,
      default:
        "https://res.cloudinary.com/nhat-clouds/image/upload/v1681661589/user.png",
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
