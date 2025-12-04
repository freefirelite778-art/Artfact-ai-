import { GoogleGenAI } from "@google/genai";
import { ASPECT_RATIOS } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const processAndReturnImage = (response: any): string | null => {
  const imagePart = response.candidates?.[0]?.content?.parts?.find(
    (part: any) => part.inlineData
  );

  if (imagePart?.inlineData) {
    return imagePart.inlineData.data;
  }

  if (response.promptFeedback?.blockReason) {
    const reason = response.promptFeedback.blockReason.replace(/_/g, ' ').toLowerCase();
    const capitalizedReason = reason.charAt(0).toUpperCase() + reason.slice(1);
    throw new Error(`Your prompt was blocked for safety reasons: ${capitalizedReason}.`);
  }
  
  throw new Error('Image generation failed due to an unexpected API response. Please try a different prompt.');
};

const handleApiError = (error: unknown): Error => {
  console.error("Error during API call:", error);
  let finalError = new Error("An unknown API error occurred.");
  if (error instanceof Error) {
      let message = error.message;
      try {
          // The log shows the message can be a JSON string
          const parsedError = JSON.parse(message);
          if (parsedError?.error?.status === 'RESOURCE_EXHAUSTED') {
              message = 'Rate limit exceeded. The AI is a bit busy! Please wait a few moments before trying again.';
          } else if (parsedError?.error?.message) {
              message = parsedError.error.message;
          }
      } catch(e) {
          // Not JSON, use original message
      }
      finalError = new Error(message);
  }
  return finalError;
};

export const generateImages = async (
  prompt: string,
  aspectRatio: string,
  onImageGenerated: (imageBase64: string) => void
): Promise<void> => {
  try {
    // Generate images sequentially to avoid rate limiting.
    for (let i = 0; i < 4; i++) {
      const response = await ai.models.generateContent({
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
      const imageBase64 = processAndReturnImage(response);
      if (imageBase64) {
        onImageGenerated(imageBase64);
      }
    }
  } catch (error) {
    throw handleApiError(error);
  }
};

export const generateImageForAllAspectRatios = async (
  prompt: string,
  onImageGenerated: (imageBase64: string) => void
): Promise<void> => {
  try {
     // Generate images sequentially to avoid rate limiting.
    for (const ratio of ASPECT_RATIOS) {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: prompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: ratio.value,
          },
        },
      });
      const imageBase64 = processAndReturnImage(response);
      if (imageBase64) {
        onImageGenerated(imageBase64);
      }
    }
  } catch (error) {
    throw handleApiError(error);
  }
};