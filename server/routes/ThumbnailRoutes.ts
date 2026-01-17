import express from "express";
import protect from "../middlewares/auth";
import {
  generateThumbnail,
  getMyGenerations,
  deleteThumbnail,
} from "../controllers/ThumbnailController";

const router = express.Router();

// Generate thumbnail (Gemini prompt)
router.post("/generate", protect, generateThumbnail);

// Get all user thumbnails
router.get("/my-generations", protect, getMyGenerations);

// Delete thumbnail
router.delete("/:id", protect, deleteThumbnail);

export default router;
