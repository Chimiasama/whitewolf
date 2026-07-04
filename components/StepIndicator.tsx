import React from 'react';

interface Step {
  id: string;
  label: string;
}

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: Step[];
  isWerewolf?: boolean;
  onStepClick?: (step: number) => void;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
    currentStep: nCurrentStep,
    totalSteps: nTotalSteps,
    steps: aSteps,
    isWerewolf = false,
    onStepClick: fnOnStepClick
}) => {
  return (
    <div className="w-full mb-8 overflow-hidden pb-4">
      <ol className="grid w-full" style={{ gridTemplateColumns: `repeat(${aSteps.length}, minmax(0, 1fr))` }}>
        {aSteps.map((oStep, nIndex) => {
          const nStepNumber = nIndex + 1;
          const bIsCompleted = nCurrentStep > nStepNumber;
          const bIsCurrent = nCurrentStep === nStepNumber;
          const bCanClick = true;

          return (
            <li
              key={oStep.id}
              className={`relative flex min-w-0 items-start justify-center ${
                nStepNumber < nTotalSteps ? "after:content-[''] after:absolute after:top-5 after:left-1/2 after:w-full after:h-1 after:border-b after:border-4 after:block after:z-0" : ""
              } ${bIsCompleted ? (isWerewolf ? "after:border-emerald-800" : "after:border-red-800") : "after:border-gray-800"}`}
            >
              <button
                onClick={() => fnOnStepClick?.(nStepNumber)}
                className="relative z-10 flex min-w-0 max-w-full flex-col items-center justify-start focus:outline-none transition-all cursor-pointer hover:opacity-80"
              >
                <span
                  className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full shrink-0 transition-all duration-300
                    ${bIsCurrent ? (isWerewolf ? "bg-emerald-700 border-2 border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)] font-bold scale-110" : "bg-red-700 border-2 border-red-500 text-white shadow-[0_0_15px_rgba(220,38,38,0.4)] font-bold scale-110") : ""}
                    ${bIsCompleted ? (isWerewolf ? "bg-emerald-950/60 border-2 border-emerald-800/80 text-emerald-300" : "bg-red-950/60 border-2 border-red-800/80 text-red-200") : ""}
                    ${!bIsCurrent && !bIsCompleted ? "bg-gray-800/50 border-2 border-gray-700/60 text-gray-400" : ""}`}
                >
                  {bIsCompleted ? (
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                  ) : nStepNumber}
                </span>
                <span className={`mt-2 w-full max-w-[4.5rem] sm:max-w-24 px-0.5 text-[8px] sm:text-[10px] uppercase tracking-wide sm:tracking-wider text-center leading-tight break-words transition-colors duration-300 ${bIsCurrent ? (isWerewolf ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold') : 'text-gray-500'}`}>{oStep.label}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
};