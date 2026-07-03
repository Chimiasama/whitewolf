
import React from 'react';
import { Button } from './ui/Button';
import { useI18n } from '../lib/i18n';

interface InfoModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export const InfoModal: React.FC<InfoModalProps> = ({ title: sTitle, onClose: fnOnClose, children: oChildren }) => {
  const { t: fnT } = useI18n();

  React.useEffect(() => {
    const sOriginalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = sOriginalStyle;
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
      onClick={fnOnClose}
    >
      <div 
        className="bg-gray-800 border border-red-800 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <header className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-red-400">{sTitle}</h2>
          <button 
            onClick={fnOnClose} 
            className="text-gray-400 hover:text-white transition-colors"
            aria-label={fnT('buttons.close')}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
          </button>
        </header>
        <main className="p-6 overflow-y-auto">
          {oChildren}
        </main>
        <footer className="p-4 border-t border-gray-700 text-right">
          <Button onClick={fnOnClose} variant="secondary">{fnT('buttons.close')}</Button>
        </footer>
      </div>
    </div>
  );
};
