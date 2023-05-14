import express from "express";
import {
  changePassword,
  login,
  register,
} from "../controllers/authController.js";
import { verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/password/:id", verifyUser, changePassword);

export default router;
