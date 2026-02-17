"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PresentationContextType {
  currentStep: number;
  maxSteps: number;
  nextStep: () => void;
  prevStep: () => void;
  resetSteps: () => void;
  setMaxSteps: (max: number) => void;
  isStepVisible: (step: number) => boolean;
}

const PresentationContext = createContext<PresentationContextType>({
  currentStep: 0,
  maxSteps: 0,
  nextStep: () => {},
  prevStep: () => {},
  resetSteps: () => {},
  setMaxSteps: () => {},
  isStepVisible: () => false,
});

export const usePresentationStep = () => useContext(PresentationContext);

export function PresentationProvider({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [maxSteps, setMaxSteps] = useState(0);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, maxSteps));
  }, [maxSteps]);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const resetSteps = useCallback(() => {
    setCurrentStep(0);
  }, []);

  const isStepVisible = useCallback(
    (step: number) => {
      return currentStep >= step;
    },
    [currentStep]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        nextStep();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevStep();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextStep, prevStep]);

  return (
    <PresentationContext.Provider
      value={{
        currentStep,
        maxSteps,
        nextStep,
        prevStep,
        resetSteps,
        setMaxSteps,
        isStepVisible,
      }}
    >
      {children}
      <PresentationControls />
    </PresentationContext.Provider>
  );
}

function PresentationControls() {
  const { currentStep, maxSteps, nextStep, prevStep } = usePresentationStep();

  return (
    <div className="fixed bottom-8 right-8 flex items-center gap-3 z-50">
      <button
        onClick={prevStep}
        disabled={currentStep === 0}
        className="w-12 h-12 bg-black text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black/80 transition-colors"
      >
        <ChevronLeft size={24} />
      </button>
      <div className="text-[11px] font-mono text-black/40">
        {currentStep} / {maxSteps}
      </div>
      <button
        onClick={nextStep}
        disabled={currentStep === maxSteps}
        className="w-12 h-12 bg-black text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black/80 transition-colors"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
