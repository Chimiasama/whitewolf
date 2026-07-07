import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  isSelected?: boolean;
  variant?: 'vampire' | 'werewolf' | 'default';
}

export const Card: React.FC<CardProps> = ({ 
  children: oChildren, 
  className: sClassName = '', 
  onClick: fnOnClick, 
  isSelected: bIsSelected = false,
  variant = 'default'
}) => {
  const sBaseClasses = "ww-card backdrop-blur-md border rounded-xl shadow-xl transition-all duration-300 ease-out p-4 sm:p-6 text-center hover:shadow-2xl";
  
  let sSelectedClasses = "";
  if (variant === 'werewolf') {
    sSelectedClasses = bIsSelected 
      ? "ring-2 ring-emerald-500 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)] bg-emerald-950/20" 
      : fnOnClick ? "hover:border-emerald-500/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)] hover:scale-[1.02]" : "";
  } else if (variant === 'vampire') {
    sSelectedClasses = bIsSelected 
      ? "ring-2 ring-red-600 border-red-600 shadow-[0_0_20px_rgba(220,38,38,0.3)] bg-red-950/20" 
      : fnOnClick ? "hover:border-red-600/50 hover:shadow-[0_0_15px_rgba(220,38,38,0.15)] hover:scale-[1.02]" : "";
  } else {
    sSelectedClasses = bIsSelected 
      ? "ring-2 ring-red-600 border-red-600 shadow-[0_0_20px_rgba(220,38,38,0.3)] bg-red-950/20" 
      : fnOnClick ? "hover:border-red-500/40 hover:shadow-[0_0_15px_rgba(239,68,68,0.1)] hover:scale-[1.02]" : "";
  }
  
  const sClickableClasses = fnOnClick ? "cursor-pointer" : "";
  const sThemeClass = variant === 'werewolf' ? 'ww-card-werewolf' : variant === 'vampire' ? 'ww-card-vampire' : '';

  return (
    <div
      className={`${sBaseClasses} ${sThemeClass} ${sSelectedClasses} ${sClickableClasses} ${sClassName}`}
      onClick={fnOnClick}
    >
      {oChildren}
    </div>
  );
};