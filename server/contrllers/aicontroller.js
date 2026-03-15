import sql from "../configs/db.js"
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

export const message = async (req, res) => {
    try {
        const { prompt, session_id } = req.body;

        // Save USER message
        await sql`
            INSERT INTO messages (session_id, sender_type, content)
            VALUES (${session_id}, 'user', ${prompt})
        `;

        const response = await openai.chat.completions.create({
            model: "gemini-3-flash-preview",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
        });

        const aiMessage = response.choices[0].message.content;

        // Save AI message
        await sql`
            INSERT INTO messages (session_id, sender_type, content)
            VALUES (${session_id}, 'ai', ${aiMessage})
        `;

        res.json({
            message: aiMessage
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};