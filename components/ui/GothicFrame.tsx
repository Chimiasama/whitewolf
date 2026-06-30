import React from 'react';

interface GothicFrameProps {
  children: React.ReactNode;
  className?: string;
}

export const RoseIcon = ({ className: sClassName }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={sClassName} fill="currentColor">
    {/* Rose petals */}
    <path d="M50 30 C40 30, 30 40, 30 50 C30 65, 50 80, 50 80 C50 80, 70 65, 70 50 C70 40, 60 30, 50 30 Z" fill="#991b1b" />
    <path d="M50 30 C55 25, 65 25, 70 35" fill="none" stroke="#7f1d1d" strokeWidth="3" />
    <path d="M50 30 C45 25, 35 25, 30 35" fill="none" stroke="#7f1d1d" strokeWidth="3" />
    {/* Stem */}
    <path d="M50 80 L50 95" stroke="#064e3b" strokeWidth="4" />
    <path d="M50 85 L60 80" stroke="#064e3b" strokeWidth="3" />
    <path d="M50 85 L40 80" stroke="#064e3b" strokeWidth="3" />
  </svg>
);

const ThornBorderX = () => (
    <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 10">
        <line x1="0" y1="5" x2="100" y2="5" stroke="#3f2e2e" strokeWidth="1" />
        {/* Thorns */}
        <path d="M10 5 L15 0 M30 5 L35 10 M50 5 L55 0 M70 5 L75 10 M90 5 L95 0" stroke="#3f2e2e" strokeWidth="1" fill="none" />
        {/* Blood drops */}
        <circle cx="15" cy="1" r="1" fill="#7f1d1d" opacity="0.8" />
        <circle cx="55" cy="1" r="1" fill="#7f1d1d" opacity="0.8" />
        <circle cx="95" cy="1" r="1" fill="#7f1d1d" opacity="0.8" />
    </svg>
);

const ThornBorderY = () => (
     <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 10 100">
        <line x1="5" y1="0" x2="5" y2="100" stroke="#3f2e2e" strokeWidth="1" />
        {/* Thorns */}
        <path d="M5 10 L10 15 M5 30 L0 35 M5 50 L10 55 M5 70 L0 75 M5 90 L10 95" stroke="#3f2e2e" strokeWidth="1" fill="none" />
        {/* Blood drops */}
        <circle cx="9" cy="15" r="1" fill="#7f1d1d" opacity="0.8" />
        <circle cx="9" cy="55" r="1" fill="#7f1d1d" opacity="0.8" />
        <circle cx="9" cy="95" r="1" fill="#7f1d1d" opacity="0.8" />
    </svg>
);

export const GothicFrame: React.FC<GothicFrameProps> = ({ children: oChildren, className: sClassName = '' }) => {
  return (
    <div className={`relative p-4 ${sClassName}`}>
        {/* Corners */}
        <div className="absolute top-0 left-0 w-8 h-8 z-10 text-red-800 pointer-events-none">
            <RoseIcon className="w-full h-full transform -rotate-45" />
        </div>
        <div className="absolute top-0 right-0 w-8 h-8 z-10 text-red-800 pointer-events-none">
             <RoseIcon className="w-full h-full transform rotate-45" />
        </div>
        <div className="absolute bottom-0 left-0 w-8 h-8 z-10 text-red-800 pointer-events-none">
             <RoseIcon className="w-full h-full transform -rotate-135" />
        </div>
        <div className="absolute bottom-0 right-0 w-8 h-8 z-10 text-red-800 pointer-events-none">
             <RoseIcon className="w-full h-full transform rotate-135" />
        </div>

        {/* Borders */}
        <div className="absolute top-0 left-4 right-4 h-3 overflow-hidden opacity-80 pointer-events-none">
            <ThornBorderX />
        </div>
        <div className="absolute bottom-0 left-4 right-4 h-3 overflow-hidden opacity-80 transform rotate-180 pointer-events-none">
             <ThornBorderX />
        </div>
        <div className="absolute top-4 bottom-4 left-0 w-3 overflow-hidden opacity-80 pointer-events-none">
            <ThornBorderY />
        </div>
         <div className="absolute top-4 bottom-4 right-0 w-3 overflow-hidden opacity-80 transform rotate-180 pointer-events-none">
            <ThornBorderY />
        </div>

      <div className="relative z-0 bg-gray-900/80 rounded-sm border border-transparent">
        {oChildren}
      </div>
    </div>
  );
};