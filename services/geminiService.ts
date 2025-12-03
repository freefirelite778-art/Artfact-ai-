import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This is a placeholder. In a real app, the key is expected to be in the environment.
  console.warn("API_KEY is not set in environment variables. Using a placeholder.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateImages = async (prompt: string, aspectRatio: string): Promise<string[]> => {
  try {
    const generationPromises = [];
    // Create 4 parallel requests for images.
    for (let i = 0; i < 4; i++) {
      const promise = ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: prompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: aspectRatio as "1:1" | "16:9" | "9:16" | "4:3" | "3:4",
          },
        },
      });
      generationPromises.push(promise);
    }

    const responses = await Promise.all(generationPromises);

    const images: string[] = responses.map(response => {
      if (response.candidates && response.candidates.length > 0) {
        const imagePart = response.candidates[0].content.parts.find(part => part.inlineData);
        if (imagePart && imagePart.inlineData) {
          return imagePart.inlineData.data;
        }
      }
      // If an image is not found in a response, we throw an error for that specific generation.
      // Promise.all will reject if any of the promises reject.
      throw new Error('Image generation failed for one of the requests.');
    });

    return images;
    
  } catch (error) {
    console.error("Error generating images:", error);
    throw new Error("Failed to generate images from the API.");
  }
};