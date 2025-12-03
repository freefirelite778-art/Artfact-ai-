
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="py-6 px-4 md:px-8">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-orbitron tracking-tighter">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500">
            Artfact AI
          </span>
        </h1>
        <p className="text-slate-400 mt-2 text-sm md:text-base">Your personal digital dream factory</p>
      </div>
    </header>
  );
};
