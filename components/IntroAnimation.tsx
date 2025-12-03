
import React from 'react';

export const IntroAnimation: React.FC = () => {
  const name = "Artfact AI";

  return (
    <div className="fixed inset-0 bg-slate-900 flex items-center justify-center z-50">
      <h1 className="text-5xl md:text-7xl font-bold font-orbitron tracking-tighter text-white animate-fade-in-out">
        {name.split("").map((char, index) => (
          <span
            key={index}
            className="animate-glow"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {char}
          </span>
        ))}
      </h1>
      <style>{`
        @keyframes fadeInOut {
          0%, 100% { opacity: 0; }
          20%, 80% { opacity: 1; }
        }
        .animate-fade-in-out {
          animation: fadeInOut 2.5s ease-in-out forwards;
        }
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 5px #0ff, 0 0 10px #0ff, 0 0 15px #f0f; }
          50% { text-shadow: 0 0 10px #0ff, 0 0 20px #0ff, 0 0 30px #f0f; }
        }
        .animate-glow {
          display: inline-block;
          opacity: 0;
          animation: fadeInOut 2.5s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};
