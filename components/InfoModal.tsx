
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from './ui/Button';
import { useI18n } from '../lib/i18n';

interface InfoModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

let nGlobalModalCount = 0;

export const InfoModal: React.FC<InfoModalProps> = ({ title: sTitle, onClose: fnOnClose, children: oChildren }) => {
  const { t: fnT } = useI18n();
  const [nMyIndex, fnSetMyIndex] = useState(0);
  const [nTotalCount, fnSetTotalCount] = useState(0);

  const fnHandleCountChange = useCallback(() => {
    fnSetTotalCount(nGlobalModalCount);
  }, []);

  useEffect(() => {
    const nIdx = nGlobalModalCount;
    nGlobalModalCount++;
    fnSetMyIndex(nIdx);

    // Broadcast change
    window.dispatchEvent(new CustomEvent('vtm_modal_count_change'));

    document.body.style.overflow = 'hidden';

    return () => {
      nGlobalModalCount--;
      window.dispatchEvent(new CustomEvent('vtm_modal_count_change'));
      if (nGlobalModalCount === 0) {
        document.body.style.overflow = '';
      }
    };
  }, []);

  useEffect(() => {
    window.addEventListener('vtm_modal_count_change', fnHandleCountChange);
    fnHandleCountChange(); // Initial sync
    return () => window.removeEventListener('vtm_modal_count_change', fnHandleCountChange);
  }, [fnHandleCountChange]);

  const bIsTop = nMyIndex === nTotalCount - 1;
  const nZIndex = 100 + nMyIndex * 10;

  return (
    <div 
      className={`fixed inset-0 flex items-center justify-center p-4 transition-all duration-300 ${
        nMyIndex > 0 ? 'bg-black/90' : 'bg-black/80 backdrop-blur-sm'
      }`}
      style={{ zIndex: nZIndex }}
      onClick={fnOnClose}
    >
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby={`modal-title-${nMyIndex}`}
        className={`
          ww-modal-panel bg-gradient-to-br from-gray-950 via-slate-950 to-black border border-red-800/80 rounded-xl shadow-[0_0_45px_rgba(127,29,29,0.32),0_25px_80px_rgba(0,0,0,0.7)] w-full max-w-2xl max-h-[90vh] flex flex-col transition-all duration-300 ease-out
          scale-100
        `}
        onClick={e => e.stopPropagation()}
      >
        <header className="flex justify-between items-center p-4 border-b border-red-950/70 flex-shrink-0">
          <h2 id={`modal-title-${nMyIndex}`} className="text-xl sm:text-2xl font-black text-red-400 drop-shadow-[0_0_14px_rgba(248,113,113,0.35)] break-words pr-4">{sTitle}</h2>
          <button 
            onClick={fnOnClose} 
            className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
            aria-label={fnT('buttons.close')}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
          </button>
        </header>
        <main className={`p-6 ${bIsTop ? 'overflow-y-auto' : 'overflow-y-hidden'}`}>
          {oChildren}
        </main>
        <footer className="p-4 border-t border-red-950/70 text-right flex-shrink-0">
          <Button onClick={fnOnClose} variant="secondary">{fnT('buttons.close')}</Button>
        </footer>
      </div>
    </div>
  );
};
