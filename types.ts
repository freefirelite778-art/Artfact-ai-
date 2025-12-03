import type React from 'react';

export interface AspectRatio {
  label: string;
  // FIX: Update to only include aspect ratios supported by the Gemini API.
  value: "1:1" | "16:9" | "9:16" | "4:3" | "3:4";
  // FIX: Use React.ReactElement to resolve JSX namespace error.
  icon: React.ReactElement;
}

export interface GeneratedImage {
  id: string;
  src: string;
}
