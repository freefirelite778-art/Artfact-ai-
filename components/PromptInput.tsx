import React from 'react';
import type { AspectRatio } from '../types';
import { ASPECT_RATIOS } from '../constants';
import { Icon } from './Icon';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  aspectRatio: AspectRatio;
  setAspectRatio: (aspectRatio: AspectRatio) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({
  prompt,
  setPrompt,
  aspectRatio,
  setAspectRatio,
  onGenerate,
  isGenerating,
}) => {
  return (
    <div className="w-full max-w-4xl p-4 bg-slate-800/[.50] backdrop-blur-sm rounded-2xl border border-slate-700 shadow-lg shadow-black/[.20]">
      <div className="relative">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="A neon-lit cyberpunk city in the rain, synthwave style..."
          className="w-full h-24 p-4 pr-32 bg-slate-900/[.70] border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none resize-none transition-all duration-300"
          disabled={isGenerating}
        />
        <button
          onClick={onGenerate}
          disabled={isGenerating}
          className="absolute top-[50%] right-4 -translate-y-[50%] h-10 px-6 font-bold font-orbitron text-sm rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300 shadow-md shadow-cyan-500/[.30] flex items-center justify-center"
        >
          {isGenerating ? <Icon name="spinner" /> : 'Generate'}
        </button>
      </div>
      <div className="mt-4">
        <p className="text-sm font-semibold text-slate-300 mb-2">Aspect Ratio</p>
        <div className="flex flex-wrap gap-2">
          {ASPECT_RATIOS.map((ratio) => (
            <button
              key={ratio.value}
              onClick={() => setAspectRatio(ratio)}
              disabled={isGenerating}
              className={`px-3 py-2 text-xs rounded-md border transition-colors duration-200 flex items-center gap-2 ${
                aspectRatio.value === ratio.value
                  ? 'bg-cyan-500 border-cyan-400 text-white'
                  : 'bg-slate-700 border-slate-600 hover:bg-slate-600 hover:border-slate-500'
              }`}
            >
              {ratio.icon}
              <span className="hidden sm:inline">{ratio.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};