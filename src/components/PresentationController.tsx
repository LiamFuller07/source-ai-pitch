"use client";

import { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";

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

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Array.from(sections).indexOf(entry.target as HTMLElement);
            if (idx >= 0) {
              currentSlideRef.current = idx;
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
    </PresentationContext.Provider>
  );
}
