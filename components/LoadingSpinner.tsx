
import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="relative w-20 h-20">
      <div className="absolute inset-0 border-4 border-slate-700 rounded-full"></div>
      <div className="absolute inset-0 border-4 border-t-cyan-400 border-l-cyan-400 rounded-full animate-spin"></div>
      <div className="absolute inset-2 border-2 border-t-purple-500 border-r-purple-500 rounded-full animate-spin-reverse"></div>
    </div>
  );
};

// Add keyframes to a style tag in index.html or here if preferred
// For simplicity in this structure, we can add it to App.tsx or use a global style solution.
// Let's add it to the Tailwind config or a style block. For now, this is a conceptual component.
// Adding styles here for self-containment:
const styles = `
@keyframes spin-reverse {
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
}
.animate-spin-reverse {
  animation: spin-reverse 1.5s linear infinite;
}
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
