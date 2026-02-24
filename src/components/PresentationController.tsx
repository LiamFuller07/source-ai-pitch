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
  const currentSlideRef = useRef(0);

  // Track which slide is currently visible
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Array.from(sections).indexOf(entry.target as HTMLElement);
            if (idx >= 0) currentSlideRef.current = idx;
          }
        });
      },
      { threshold: 0.5 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollToSlide = useCallback((index: number) => {
    const sections = document.querySelectorAll("section");
    if (sections[index]) {
      sections[index].scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const hasMoreSteps = maxSteps > 0 && currentStep < maxSteps;

  const advance = useCallback(() => {
    if (hasMoreSteps) {
      // Advance within the current slide's steps
      setCurrentStep((prev) => Math.min(prev + 1, maxSteps));
    } else {
      // All steps done (or no steps) — scroll to next slide
      const sections = document.querySelectorAll("section");
      const nextIndex = currentSlideRef.current + 1;
      if (nextIndex < sections.length) {
        scrollToSlide(nextIndex);
      }
    }
  }, [hasMoreSteps, maxSteps, scrollToSlide]);

  const goBack = useCallback(() => {
    if (currentStep > 0) {
      // Go back a step within the current slide
      setCurrentStep((prev) => Math.max(prev - 1, 0));
    } else {
      // Already at step 0 — scroll to previous slide
      const prevIndex = currentSlideRef.current - 1;
      if (prevIndex >= 0) {
        scrollToSlide(prevIndex);
      }
    }
  }, [currentStep, scrollToSlide]);

  // Keep these for components that call them directly
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

  // Keyboard navigation: Space, ArrowRight, ArrowLeft
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        advance();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goBack();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [advance, goBack]);

  // Click anywhere to advance (ignore interactive elements)
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
      advance();
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [advance]);

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
      <PresentationControls hasMoreSteps={hasMoreSteps} />
    </PresentationContext.Provider>
  );
}

function PresentationControls({ hasMoreSteps }: { hasMoreSteps: boolean }) {
  const { currentStep, maxSteps } = usePresentationStep();
  const [showNudge, setShowNudge] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
        <div
          className="fixed bottom-8 right-1/2 translate-x-1/2 z-50 flex items-center gap-2 text-black/15 transition-all duration-500 animate-pulse pointer-events-none"
        >
          <span className="text-[11px] font-mono uppercase tracking-[0.1em]">
            Press space or click
          </span>
          <ChevronRight size={16} />
        </div>
      )}

      {/* Step counter — only show when a slide has steps */}
      {maxSteps > 0 && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className="text-[11px] font-mono text-black/30">
            {currentStep} / {maxSteps}
          </div>
        </div>
      )}
    </>
  );
}
