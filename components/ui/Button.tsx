import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
}

export const Button: React.FC<ButtonProps> = ({ children: oChildren, variant: sVariant = 'primary', className: sClassName = '', ...oProps }) => {
  const sBaseClasses = "ww-button max-w-full px-3 sm:px-6 py-2.5 rounded-lg font-extrabold text-[11px] sm:text-xs tracking-wide sm:tracking-[0.2em] uppercase transition-all duration-300 ease-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 flex items-center justify-center gap-2 text-center whitespace-normal break-words";
  
  const oVariantClasses = {
    primary: "ww-button-primary bg-gradient-to-r from-red-950 via-red-800 to-red-700 hover:from-red-700 hover:to-red-600 focus:ring-red-500 border border-red-500/30 text-red-50",
    secondary: "ww-button-secondary bg-gray-900/85 hover:bg-gray-700 focus:ring-gray-500 border border-gray-700/50 backdrop-blur-sm text-gray-200",
    danger: "ww-button-danger bg-gradient-to-r from-black via-red-950 to-red-900 hover:from-red-900 hover:to-red-800 focus:ring-red-700 border border-red-800/30 text-red-200",
  };

  return (
    <button className={`${sBaseClasses} ${oVariantClasses[sVariant]} ${sClassName}`} {...oProps}>
      {oChildren}
    </button>
  );
};