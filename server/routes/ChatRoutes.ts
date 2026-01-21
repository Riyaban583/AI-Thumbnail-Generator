import { Router, Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = Router();

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

// Updated to use the 'gemini-2.5-flash' model
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

router.post("/", async (req: Request, res: Response): Promise<any> => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Generate content
    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    return res.json({ reply: text });
  } catch (error) {
    console.error("Error communicating with Gemini 2.5:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;