import express, { request } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import tourRoute from "./routes/tours.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

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
app.use(cors());
app.use(cookieParser());
app.use("/tours", tourRoute);

app.listen(port, () => {
  connect();
  console.log(`Server listening on http://localhost:${port}`);
});
