import { Request, Response } from "express";
import Thumbnail from "../models/Thumbnail";
import ai from "../configs/ai";
import { v2 as cloudinary } from "cloudinary";

/* ============================
   🎯 GENERATE THUMBNAIL (GEMINI)
   ============================ */
export const generateThumbnail = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const {
      title,
      style,
      color_scheme,
      aspect_ratio,
      text_overlay,
    } = req.body;

    if (!title || !style) {
      return res
        .status(400)
        .json({ message: "title & style required" });
    }

    /* ---------- 1️⃣ GEMINI PROMPT ---------- */
    const model = ai.getGenerativeModel({
      model: "models/gemini-pro",
    });

    const prompt = `
Create a detailed image prompt for a YouTube thumbnail.

Title: ${title}
Style: ${style}
Color scheme: ${color_scheme}
Aspect ratio: ${aspect_ratio}
Text overlay: ${text_overlay ? "Yes" : "No"}

Describe visuals, lighting, composition, mood.
`;

    const result = await model.generateContent(prompt);
    const aiPrompt = result.response.text();

    /* ---------- 2️⃣ IMAGE GENERATION (MOCK) ---------- */
    // ⚠️ Gemini image generate nahi karta
    // yahan future me Stable Diffusion / DALL·E API aayegi

    const dummyImageUrl =
      "https://res.cloudinary.com/demo/image/upload/sample.jpg";

    /* ---------- 3️⃣ SAVE IN DB ---------- */
    const thumbnail = await Thumbnail.create({
      userId,
      title,
      style,
      color_scheme,
      aspect_ratio,
      text_overlay,
      image_url: dummyImageUrl,
      ai_prompt: aiPrompt,
      isGenerating: false,
    });

    res.json({
      message: "Thumbnail generated (Gemini prompt)",
      thumbnail,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

/* ============================
   📚 MY GENERATIONS
   ============================ */
export const getMyGenerations = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const thumbnails = await Thumbnail.find({ userId })
      .sort({ createdAt: -1 });

    res.json({ thumbnails });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

/* ============================
   🗑 DELETE
   ============================ */
export const deleteThumbnail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Thumbnail.findByIdAndDelete(id);
    res.json({ message: "Thumbnail deleted" });
  } catch {
    res.status(500).json({ message: "Delete failed" });
  }
};
