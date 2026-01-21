import express from "express";
import {
  LoginUser,
  LogoutUser,
  registerUser,
  VerifyUser,
} from "../controllers/AuthControllers";
import protect from "../middlewares/auth";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", LoginUser);

// ✅ FIX: Remove 'protect' here so the controller can handle guest users gracefully
router.get("/verify", VerifyUser); 

router.post("/logout", protect, LogoutUser);

export default router;