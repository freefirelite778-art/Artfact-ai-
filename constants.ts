import React from 'react';
import type { AspectRatio } from './types';
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