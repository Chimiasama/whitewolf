import React from 'react';
import { useI18n } from '../lib/i18n';

interface InfoIconProps {
  onClick: () => void;
  className?: string;
}

export const InfoIcon: React.FC<InfoIconProps> = ({ onClick: fnOnClick, className: sClassName = '' }) => {
  const { t: fnT } = useI18n();
  return (
    <button
      onClick={(e) => {
          e.stopPropagation();
          fnOnClick();
      }}
      className={`ml-2 text-gray-500 hover:text-red-400 transition-colors duration-200 ${sClassName}`}
      aria-label={fnT('common.moreInfo')}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
    </button>
  );
};