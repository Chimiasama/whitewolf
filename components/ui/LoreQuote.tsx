
import React from 'react';

interface LoreQuoteProps {
    text: string;
    source?: string;
    className?: string;
}

export const LoreQuote: React.FC<LoreQuoteProps> = ({ text: sText, source: sSource, className: sClassName = '' }) => {
    if (!sText) return null;
    return (
        <div className={`text-center py-3 px-6 my-4 border-l-2 border-r-2 border-red-900/30 bg-black/20 ${sClassName}`}>
             <p className="font-cinzel text-red-800/80 italic text-sm md:text-base tracking-wide">
                “{sText}”
            </p>
            {sSource && (
                <p className="text-xs text-gray-500 mt-2 font-lato uppercase tracking-widest">
                    — {sSource}
                </p>
            )}
        </div>
    );
};
