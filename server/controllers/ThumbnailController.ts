import { Request, Response } from "express";
import Thumbnail from "../models/Thumbnail";
import ai from "../configs/ai";
import { v2 as cloudinary } from "cloudinary";

/* ============================
   🎯 GENERATE THUMBNAIL (GEMINI + IMAGEN)
   ============================ */
export const generateThumbnail = async (req: Request, res: Response): Promise<any> => {
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

    /* ---------- 1️⃣ GEMINI PROMPT (TEXT) ---------- */
    // Using gemini-2.5-flash for better prompt reasoning
    const model = ai.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
      You are an expert prompt engineer for AI image generators (like Imagen 3).
      Create a highly detailed, descriptive image prompt for a YouTube thumbnail.
      
      User Inputs:
      - Title: "${title}"
      - Style: "${style}"
      - Color scheme: "${color_scheme}"
      - Aspect Ratio: "${aspect_ratio}"
      - Text overlay: ${text_overlay ? "Yes" : "No"}

      Strict Output Rules:
      - Provide ONLY the raw English prompt string.
      - Do NOT include words like "Prompt:", "Here is the prompt", or markdown.
      - Describe the lighting, composition, subject, and mood in detail.
    `;

    const result = await model.generateContent(prompt);
    const aiPrompt = result.response.text().trim();

    /* ---------- 2️⃣ IMAGE GENERATION (REAL IMAGEN 3) ---------- */
    // We use a direct fetch here because the Imagen model requires a specific endpoint structure
    // that varies slightly across SDK versions. This ensures it works 100%.
    
    const imagenUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:predict?key=${process.env.GEMINI_API_KEY}`;
    
    const imagenResponse = await fetch(imagenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        instances: [
          { prompt: aiPrompt }
        ],
        parameters: {
          aspectRatio: aspect_ratio || "16:9", // Default to 16:9 if missing
          sampleCount: 1,
          personGeneration: "allow_adult",
        },
      }),
    });

    if (!imagenResponse.ok) {
        const errorText = await imagenResponse.text();
        throw new Error(`Imagen API Error: ${errorText}`);
    }

    const imagenData = await imagenResponse.json();
    
    // Extract Base64 image
    const base64Image = imagenData.predictions?.[0]?.bytesBase64Encoded;
    
    if (!base64Image) {
        throw new Error("Failed to generate image (No data returned)");
    }

    /* ---------- 3️⃣ UPLOAD TO CLOUDINARY ---------- */
    // Upload the base64 string directly
    const uploadResponse = await cloudinary.uploader.upload(
      `data:image/png;base64,${base64Image}`, 
      {
        folder: "thumbnails",
        resource_type: "image",
      }
    );

    /* ---------- 4️⃣ SAVE IN DB ---------- */
    const thumbnail = await Thumbnail.create({
      userId,
      title,
      style,
      color_scheme,
      aspect_ratio,
      text_overlay,
      image_url: uploadResponse.secure_url,
      ai_prompt: aiPrompt,
      isGenerating: false,
    });

    res.json({
      message: "Thumbnail generated successfully",
      thumbnail,
    });
  } catch (err: any) {
    console.error("Generation Error:", err);
    res.status(500).json({ message: err.message || "Something went wrong" });
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