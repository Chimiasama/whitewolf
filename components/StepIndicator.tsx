import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
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
    <div className="w-full mb-8 overflow-x-auto pb-4 custom-scrollbar">
      <ol className="flex items-center w-full min-w-[600px]">
        {aSteps.map((sStepName, nIndex) => {
          const nStepNumber = nIndex + 1;
          const bIsCompleted = nCurrentStep > nStepNumber;
          const bIsCurrent = nCurrentStep === nStepNumber;
          const bCanClick = true;

          return (
            <li
              key={sStepName}
              className={`flex w-full items-center ${
                nStepNumber < nTotalSteps ? "after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block" : ""
              } ${bIsCompleted ? (isWerewolf ? "after:border-emerald-800" : "after:border-red-800") : "after:border-gray-800"}`}
            >
              <button
                onClick={() => fnOnStepClick?.(nStepNumber)}
                className="flex flex-col items-center justify-center focus:outline-none transition-all cursor-pointer hover:opacity-80"
              >
                <span
                  className={`flex items-center justify-center w-10 h-10 rounded-full shrink-0 transition-all duration-300
                    ${bIsCurrent ? (isWerewolf ? "bg-emerald-700 border-2 border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)] font-bold scale-110" : "bg-red-700 border-2 border-red-500 text-white shadow-[0_0_15px_rgba(220,38,38,0.4)] font-bold scale-110") : ""}
                    ${bIsCompleted ? (isWerewolf ? "bg-emerald-950/60 border-2 border-emerald-800/80 text-emerald-300" : "bg-red-950/60 border-2 border-red-800/80 text-red-200") : ""}
                    ${!bIsCurrent && !bIsCompleted ? "bg-gray-800/50 border-2 border-gray-700/60 text-gray-400" : ""}`}
                >
                  {bIsCompleted ? (
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                  ) : nStepNumber}
                </span>
                <span className={`mt-2 text-[10px] uppercase tracking-wider text-center w-24 transition-colors duration-300 ${bIsCurrent ? (isWerewolf ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold') : 'text-gray-500'}`}>{sStepName}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
};