import sql from "../configs/db.js"
import OpenAI from "openai";

export const message = async (req, res) => {
    try {

        const { prompt } = req.body;

        const openai = new OpenAI({
            apiKey: process.env.GEMINI_API_KEY,
            baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
        });

        const response = await openai.chat.completions.create({
            model: "gemini-3-flash-preview",
            messages: [
                { role: "user", content: prompt }
            ],
        });

        res.json({
            message: response.choices[0].message.content
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};