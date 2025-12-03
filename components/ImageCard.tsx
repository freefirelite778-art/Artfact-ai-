import React from 'react';
import type { GeneratedImage } from '../types';
import { Icon } from './Icon';

interface ImageCardProps extends React.HTMLAttributes<HTMLDivElement> {
  image: GeneratedImage;
  onClick: () => void;
}

// FIX: Corrected functional component syntax to destructure props.
export const ImageCard: React.FC<ImageCardProps> = ({ image, onClick, ...props }) => {
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = image.src;
    link.download = `artfact-ai-${image.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      {...props}
      className={`group relative aspect-square rounded-xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-cyan-500 transition-all duration-300 shadow-lg shadow-black/[.30] ${props.className}`}
      onClick={onClick}
    >
      <img src={image.src} alt="Generated AI art" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
      <div className="absolute inset-0 bg-black/[.50] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
        <button
          title="View Full Size"
          className="w-12 h-12 rounded-full bg-slate-800/[.70] hover:bg-cyan-500/[.80] flex items-center justify-center transition-all transform hover:scale-110"
        >
          <Icon name="view" />
        </button>
        <button
          onClick={handleDownload}
          title="Download"
          className="w-12 h-12 rounded-full bg-slate-800/[.70] hover:bg-purple-500/[.80] flex items-center justify-center transition-all transform hover:scale-110"
        >
          <Icon name="download" />
        </button>
      </div>
    </div>
  );
};