
import React from 'react';
import { ImageCard } from './ImageCard';
import type { GeneratedImage } from '../types';

interface ImageGalleryProps {
  images: GeneratedImage[];
  onImageClick: (image: GeneratedImage) => void;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onImageClick }) => {
  if (images.length === 0) {
    return (
      <div className="text-center mt-20 text-slate-400 flex-grow flex flex-col items-center justify-center">
        <div className="w-24 h-24 border-2 border-dashed border-slate-600 rounded-2xl flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="font-orbitron text-xl text-slate-300">Your creations will appear here</h3>
        <p className="max-w-md mt-2">Enter a prompt above and click 'Generate' to witness the magic of AI turning your words into art.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
        {images.map((image, index) => (
          <ImageCard
            key={image.id}
            image={image}
            onClick={() => onImageClick(image)}
            style={{ animationDelay: `${index * 100}ms` }}
            className="animate-fade-in-up"
          />
        ))}
      </div>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};