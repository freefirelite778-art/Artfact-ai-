import React from 'react';
import type { GeneratedImage } from '../types';
import { Icon } from './Icon';

interface ImageViewerProps {
  image: GeneratedImage;
  onClose: () => void;
}

// FIX: Corrected functional component syntax to destructure props.
export const ImageViewer: React.FC<ImageViewerProps> = ({ image, onClose }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image.src;
    link.download = `artfact-ai-${image.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="fixed inset-0 bg-black/[.80] backdrop-blur-lg z-50 flex items-center justify-center animate-fade-in"
      onClick={onClose}
    >
      <div className="relative max-w-4xl max-h-[90vh] p-4" onClick={(e) => e.stopPropagation()}>
        <img src={image.src} alt="Full size AI art" className="w-full h-full object-contain rounded-lg" />
        <div className="absolute top-4 right-4 flex gap-2">
            <button
                onClick={handleDownload}
                className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 flex items-center gap-2 text-sm font-semibold transition-colors transform hover:scale-105"
            >
                <Icon name="download" />
                Download
            </button>
            <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-slate-800/[.70] hover:bg-slate-700/[.90] flex items-center justify-center transition-colors transform hover:scale-110"
            >
                <Icon name="close" />
            </button>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};