import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isWerewolf?: boolean;
}

export const Input: React.FC<InputProps> = ({ label: sLabel, id: sId, isWerewolf = false, ...oProps }) => {
  return (
    <div className="w-full">
      <label htmlFor={sId} className="block text-xs uppercase tracking-wider font-bold text-gray-400 mb-1.5">
        {sLabel}
      </label>
      <input
        id={sId}
        className={`w-full bg-gray-950/60 backdrop-blur-sm border border-gray-800/80 rounded-lg shadow-inner px-4 py-2.5 text-white transition-all duration-200 focus:outline-none focus:ring-2 
          ${isWerewolf 
            ? 'focus:ring-emerald-500/30 focus:border-emerald-500/70 shadow-[0_0_10px_rgba(16,185,129,0.1)]' 
            : 'focus:ring-red-500/30 focus:border-red-500/70 shadow-[0_0_10px_rgba(220,38,38,0.1)]'
          }`}
        {...oProps}
      />
    </div>
  );
};

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  isWerewolf?: boolean;
}

export const TextArea: React.FC<TextAreaProps> = ({ label: sLabel, id: sId, isWerewolf = false, ...oProps }) => {
  return (
    <div className="w-full">
      <label htmlFor={sId} className="block text-xs uppercase tracking-wider font-bold text-gray-400 mb-1.5">
        {sLabel}
      </label>
      <textarea
        id={sId}
        rows={3}
        className={`w-full bg-gray-950/60 backdrop-blur-sm border border-gray-800/80 rounded-lg shadow-inner px-4 py-2.5 text-white transition-all duration-200 focus:outline-none focus:ring-2 
          ${isWerewolf 
            ? 'focus:ring-emerald-500/30 focus:border-emerald-500/70 shadow-[0_0_10px_rgba(16,185,129,0.1)]' 
            : 'focus:ring-red-500/30 focus:border-red-500/70 shadow-[0_0_10px_rgba(220,38,38,0.1)]'
          }`}
        {...oProps}
      />
    </div>
  );
};