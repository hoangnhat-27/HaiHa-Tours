import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler, notFound } from "./Middleware/Errors.js";

import authRoute from "./routes/auth.js";
import tourRoute from "./routes/tours.js";
import userRoute from "./routes/users.js";
import reviewRoute from "./routes/reviews.js";
import orderRoute from "./routes/orders.js";
import categoryRoute from "./routes/categories.js";
import investorRoute from "./routes/investors.js";
import blogRoute from "./routes/blogs.js";
import discountRoute from "./routes/discounts.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;
const corsOptions = {
  origin: true,
  credentials: true,
};

// database connection
mongoose.set("strictQuery", false);
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
const connect = async () => {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongoose Connected");
  } catch (err) {
    console.log("Mongoose Connected fail");
  }
};

//middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/orders", orderRoute);
app.use("/api/v1/blogs", blogRoute);
app.use("/api/v1/discounts", discountRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/investors", investorRoute);

// ERROR HANDLER
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  connect();
  console.log(`Server listening on http://localhost:${port}`);
});
