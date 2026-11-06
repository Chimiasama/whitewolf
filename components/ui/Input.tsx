import React from 'react';

function FieldLabel({id,label,onGenerate,generateLabel}:{id:string;label:string;onGenerate?:()=>void;generateLabel?:string}) {
  return <div className="mb-2 flex min-w-0 items-center justify-between gap-3">
    <label htmlFor={id} className="min-w-0 text-xs uppercase tracking-wider font-bold text-gray-400">{label}</label>
    {onGenerate&&<button type="button" className="min-h-11 shrink-0 rounded border border-gray-600 px-3 py-2 text-sm hover:bg-gray-800" onClick={onGenerate}>{generateLabel||`Gerar ${label.toLowerCase()}`}</button>}
  </div>;
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isWerewolf?: boolean;
  onGenerate?: () => void;
  generateLabel?: string;
}

export const Input: React.FC<InputProps> = ({ label: sLabel, id: providedId, isWerewolf = false, onGenerate, generateLabel, ...oProps }) => {
  const generatedId = React.useId();
  const sId = providedId || generatedId;
  return (
    <div className="w-full min-w-0">
      <FieldLabel id={sId} label={sLabel} onGenerate={onGenerate} generateLabel={generateLabel}/>
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
  onGenerate?: () => void;
  generateLabel?: string;
  autoGrow?: boolean;
}

export const TextArea: React.FC<TextAreaProps> = ({ label: sLabel, id: providedId, isWerewolf = false, onGenerate, generateLabel, autoGrow=false, ...oProps }) => {
  const generatedId = React.useId();
  const sId = providedId || generatedId;
  const fieldRef=React.useRef<HTMLTextAreaElement>(null);
  React.useLayoutEffect(()=>{
    if(!autoGrow)return;
    const resize=()=>{const field=fieldRef.current;if(field){field.style.height='auto';field.style.height=`${field.scrollHeight+2}px`;}};
    resize();
    window.addEventListener('resize',resize);
    return ()=>window.removeEventListener('resize',resize);
  },[autoGrow,oProps.value]);
  return (
    <div className="w-full min-w-0">
      <FieldLabel id={sId} label={sLabel} onGenerate={onGenerate} generateLabel={generateLabel}/>
      <textarea
        ref={fieldRef}
        id={sId}
        rows={3}
        className={`${autoGrow?'resize-none overflow-hidden':''} w-full bg-gray-950/60 backdrop-blur-sm border border-gray-800/80 rounded-lg shadow-inner px-4 py-2.5 text-white transition-all duration-200 focus:outline-none focus:ring-2
          ${isWerewolf
            ? 'focus:ring-emerald-500/30 focus:border-emerald-500/70 shadow-[0_0_10px_rgba(16,185,129,0.1)]'
            : 'focus:ring-red-500/30 focus:border-red-500/70 shadow-[0_0_10px_rgba(220,38,38,0.1)]'
          }`}
        {...oProps}
      />
    </div>
  );
};
