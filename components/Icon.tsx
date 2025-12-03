import React from 'react';

interface IconProps {
  name: string;
  className?: string;
}

// FIX: Use React.ReactElement to avoid issues with JSX namespace resolution.
const ICONS: Record<string, React.ReactElement> = {
  spinner: <path d="M21 12a9 9 0 11-6.219-8.56" />,
  square: <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />,
  landscape: <rect x="3" y="5" width="18" height="14" rx="2" ry="2" />,
  portrait: <rect x="5" y="3" width="14" height="18" rx="2" ry="2" />,
  wide: <rect x="2" y="7" width="20" height="10" rx="2" ry="2" />,
  tall: <rect x="7" y="2" width="10" height="20" rx="2" ry="2" />,
  classic43: <rect x="3" y="6" width="18" height="12" rx="2" ry="2" />,
  classic34: <rect x="6" y="3" width="12" height="18" rx="2" ry="2" />,
  photo54: <rect x="4" y="5" width="16" height="14" rx="2" ry="2" />,
  photo45: <rect x="5" y="4" width="14" height="16" rx="2" ry="2" />,
  view: <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>,
  download: <><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></>,
  close: <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>,
};

export const Icon: React.FC<IconProps> = ({ name, className }) => {
  const icon = ICONS[name];
  if (!icon) return null;
  
  const spinnerClass = name === 'spinner' ? 'animate-spin' : '';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`w-5 h-5 ${spinnerClass} ${className || ''}`}
    >
      {icon}
    </svg>
  );
};
