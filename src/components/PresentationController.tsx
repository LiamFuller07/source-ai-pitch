"use client";

import { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import { ChevronRight } from "lucide-react";

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

  // Click anywhere to advance (ignore clicks on buttons, links, inputs)
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("button") ||
        target.closest("a") ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest("nav")
      ) {
        return;
      }
      nextStep();
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [nextStep]);

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
  const { currentStep, maxSteps, nextStep } = usePresentationStep();
  const [showNudge, setShowNudge] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hasMoreSteps = maxSteps > 0 && currentStep < maxSteps;

  // Show nudge after 4s of inactivity when there are more steps
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setShowNudge(false);

    if (hasMoreSteps) {
      timerRef.current = setTimeout(() => setShowNudge(true), 4000);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentStep, hasMoreSteps]);

  return (
    <>
      {/* Subtle nudge arrow */}
      {showNudge && hasMoreSteps && (
        <button
          onClick={nextStep}
          className="fixed bottom-8 right-1/2 translate-x-1/2 z-50 flex items-center gap-2 text-black/15 hover:text-black/40 transition-all duration-500 animate-pulse cursor-pointer"
          aria-label="Next step"
        >
          <span className="text-[11px] font-mono uppercase tracking-[0.1em]">
            Click or press arrow
          </span>
          <ChevronRight size={16} />
        </button>
      )}

      {/* Step counter */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className="text-[11px] font-mono text-black/30">
          {currentStep} / {maxSteps}
        </div>
      </div>
    </>
  );
}
