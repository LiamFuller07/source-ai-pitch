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
  const totalSlidesRef = useRef(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Track which slide is currently visible
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    totalSlidesRef.current = sections.length;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Array.from(sections).indexOf(entry.target as HTMLElement);
            if (idx >= 0) {
              currentSlideRef.current = idx;
              setCurrentSlide(idx);
            }
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
  const isLastSlide = currentSlide >= totalSlidesRef.current - 1;

  const advance = useCallback(() => {
    if (hasMoreSteps) {
      setCurrentStep((prev) => Math.min(prev + 1, maxSteps));
    } else {
      const sections = document.querySelectorAll("section");
      const nextIndex = currentSlideRef.current + 1;
      if (nextIndex < sections.length) {
        scrollToSlide(nextIndex);
      }
    }
  }, [hasMoreSteps, maxSteps, scrollToSlide]);

  const goBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => Math.max(prev - 1, 0));
    } else {
      const prevIndex = currentSlideRef.current - 1;
      if (prevIndex >= 0) {
        scrollToSlide(prevIndex);
      }
    }
  }, [currentStep, scrollToSlide]);

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
    (step: number) => currentStep >= step,
    [currentStep]
  );

  // Keyboard navigation
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

  // Click to advance
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
      <PresentationHint
        hasMoreSteps={hasMoreSteps}
        isLastSlide={isLastSlide}
        currentStep={currentStep}
        maxSteps={maxSteps}
      />
    </PresentationContext.Provider>
  );
}

function PresentationHint({
  hasMoreSteps,
  isLastSlide,
  currentStep,
  maxSteps,
}: {
  hasMoreSteps: boolean;
  isLastSlide: boolean;
  currentStep: number;
  maxSteps: number;
}) {
  const [visible, setVisible] = useState(false);
  const [pulsing, setPulsing] = useState(false);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const interactionCount = useRef(0);

  // Show hint after a short delay on load
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(t);
  }, []);

  // Track interactions — hide hint briefly after user acts, pulse if idle
  useEffect(() => {
    const resetIdle = () => {
      interactionCount.current++;
      setPulsing(false);

      // After user has interacted a few times, keep hint subtle
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => {
        setPulsing(true);
      }, 5000);
    };

    window.addEventListener("keydown", resetIdle);
    window.addEventListener("click", resetIdle);
    window.addEventListener("scroll", resetIdle);

    // Start the initial idle timer
    idleTimer.current = setTimeout(() => setPulsing(true), 5000);

    return () => {
      window.removeEventListener("keydown", resetIdle);
      window.removeEventListener("click", resetIdle);
      window.removeEventListener("scroll", resetIdle);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, []);

  // Don't show on the very last slide
  if (isLastSlide && !hasMoreSteps) return null;

  const label = hasMoreSteps ? "Space to reveal" : "Space for next slide";

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div
        className={`flex items-center gap-3 px-5 py-2.5 bg-black/[0.06] backdrop-blur-sm rounded-full transition-all duration-500 ${
          pulsing ? "animate-pulse" : ""
        }`}
      >
        {/* Keyboard icon */}
        <kbd className="inline-flex items-center justify-center w-[52px] h-[24px] bg-white border border-black/10 rounded text-[10px] font-mono font-medium text-black/40 shadow-[0_1px_0_1px_rgba(0,0,0,0.05)]">
          SPACE
        </kbd>
        <span className="text-[11px] font-mono uppercase tracking-[0.08em] text-black/30">
          {label}
        </span>
        <ChevronRight size={12} className="text-black/20" />

        {/* Step counter pill */}
        {maxSteps > 0 && (
          <span className="text-[9px] font-mono text-black/20 border-l border-black/8 pl-3 ml-1">
            {currentStep}/{maxSteps}
          </span>
        )}
      </div>
    </div>
  );
}
