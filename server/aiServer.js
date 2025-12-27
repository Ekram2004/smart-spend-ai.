const { GoogleGenAI } = require("@google/genai");

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function categorizeTransaction(description) {
  try {
    const response = await genAI.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Categorize this transaction description into exactly ONE of these words:
Food, Transport, Housing, Entertainment, Utilities, Other.

Transaction: "${description}"

Return ONLY the category name.`,
            },
          ],
        },
      ],
    });

    return response.text.trim();
  } catch (error) {
    console.error("AI Error:", error.message || error);
    return "Other";
  }
}

module.exports = { categorizeTransaction };
