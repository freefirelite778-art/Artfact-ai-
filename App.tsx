import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { PromptInput } from './components/PromptInput';
import { ImageGallery } from './components/ImageGallery';
import { IntroAnimation } from './components/IntroAnimation';
import { ImageViewer } from './components/ImageViewer';
import { generateImages } from './services/geminiService';
import type { GeneratedImage, AspectRatio } from './types';
import { DEFAULT_ASPECT_RATIO } from './constants';
import { LoadingSpinner } from './components/LoadingSpinner';

const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [prompt, setPrompt] = useState<string>('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>(DEFAULT_ASPECT_RATIO);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const addWatermark = (base64Image: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return resolve(base64Image);

        ctx.drawImage(img, 0, 0);

        const isPortrait = img.height > img.width;
        const fontSize = Math.max(12, Math.min(img.width, img.height) * 0.03);
        ctx.font = `bold ${fontSize}px Orbitron`;
        
        const text = "Artfact AI";
        const textMetrics = ctx.measureText(text);
        
        const gradient = ctx.createLinearGradient(0, 0, textMetrics.width, 0);
        gradient.addColorStop(0, '#ff00ff');
        gradient.addColorStop(0.2, '#00ffff');
        gradient.addColorStop(0.4, '#ffff00');
        gradient.addColorStop(0.6, '#ff00ff');
        gradient.addColorStop(0.8, '#00ffff');
        gradient.addColorStop(1, '#ffff00');
        ctx.fillStyle = gradient;

        ctx.save();
        if (isPortrait) {
            ctx.translate(canvas.width - fontSize * 1.5, canvas.height - fontSize);
            ctx.rotate(-Math.PI / 2);
        } else {
            ctx.translate(canvas.width - fontSize, canvas.height - (textMetrics.width + fontSize));
            ctx.rotate(-Math.PI / 2);
        }
        
        ctx.fillText(text, 0, 0);
        ctx.restore();

        resolve(canvas.toDataURL('image/png'));
      };
      img.onerror = () => {
        // If image fails to load, resolve with original to not break the flow
        resolve(base64Image);
      };
      img.src = `data:image/png;base64,${base64Image}`;
    });
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt to generate images.");
      return;
    }
    setIsGenerating(true);
    setGeneratedImages([]);
    setError(null);
    try {
      const enhancedPrompt = `${prompt}, digital art, hyperrealistic, futuristic, vibrant colors, epic composition`;
      const images = await generateImages(enhancedPrompt, aspectRatio.value);
      
      const watermarkedImages = await Promise.all(
        images.map(imgBase64 => addWatermark(imgBase64))
      );
      
      const newImages: GeneratedImage[] = watermarkedImages.map((src, index) => ({
        id: `img-${Date.now()}-${index}`,
        src,
      }));
      setGeneratedImages(newImages);
    } catch (err) {
      setError("Failed to generate images. Please try again.");
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  if (showIntro) {
    return <IntroAnimation />;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-64 h-64 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-[25%] w-72 h-72 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      
      <div className="relative z-10 min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center">
          <PromptInput
            prompt={prompt}
            setPrompt={setPrompt}
            aspectRatio={aspectRatio}
            setAspectRatio={setAspectRatio}
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
          />
          {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
          
          {isGenerating ? (
             <div className="flex flex-col items-center justify-center text-center mt-20">
                <LoadingSpinner />
                <p className="text-lg text-cyan-300 mt-4 font-orbitron tracking-wider">Conjuring a quartet of creations...</p>
                <p className="text-sm text-slate-400 mt-2">Generating 4 unique images. Great art requires patience.</p>
             </div>
          ) : (
            <ImageGallery images={generatedImages} onImageClick={setSelectedImage} />
          )}
        </main>
      </div>
      
      {selectedImage && (
        <ImageViewer image={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
    </div>
  );
};

export default App;