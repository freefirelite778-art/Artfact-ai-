import React from 'react';
import type { AspectRatio, ArtisticStyle } from './types';
import { Icon } from './components/Icon';

// FIX: Remove aspect ratios that are not supported by the Gemini API for image generation.
// FIX: Replaced JSX syntax with React.createElement to prevent TypeScript parsing errors in a .ts file.
export const ASPECT_RATIOS: AspectRatio[] = [
  { label: 'Square', value: '1:1', icon: React.createElement(Icon, { name: 'square' }) },
  { label: 'Landscape', value: '16:9', icon: React.createElement(Icon, { name: 'landscape' }) },
  { label: 'Portrait', value: '9:16', icon: React.createElement(Icon, { name: 'portrait' }) },
  { label: 'Classic', value: '4:3', icon: React.createElement(Icon, { name: 'classic43' }) },
  { label: 'Classic', value: '3:4', icon: React.createElement(Icon, { name: 'classic34' }) },
];

export const DEFAULT_ASPECT_RATIO = ASPECT_RATIOS[0];

export const ARTISTIC_STYLES: ArtisticStyle[] = [
    { label: 'Default', value: 'None' },
    { label: 'Photorealistic', value: 'photorealistic, 8k, sharp focus, detailed, cinematic lighting' },
    { label: 'Veo 2', value: 'cinematic, hyper-detailed, photorealistic, dramatic lighting, professional color grading, 8k, film grain' },
    { label: 'Anime', value: 'anime style, vibrant colors, detailed characters, key visual' },
    { label: 'Cartoon', value: 'cartoon style, bold outlines, vibrant flat colors, 2D animation style, playful' },
    { label: '3D Cartoon', value: '3D cartoon style, Disney Pixar animation style, smooth shading, rounded shapes, playful, rendered in Octane, 4k' },
    { label: 'Fantasy Art', value: 'fantasy art, epic scale, detailed, mystical, ethereal lighting' },
    { label: 'Watercolor', value: 'watercolor painting, soft edges, blended colors, wet-on-wet technique' },
    { label: 'Cyberpunk', value: 'cyberpunk style, neon lighting, futuristic cityscapes, dystopian mood' },
    { label: 'Abstract', value: 'abstract art, geometric shapes, bold colors, non-representational' },
    { label: 'Retro', value: 'retro wave, 80s aesthetic, neon grids, vintage feel' },
];