"use client";

import { useEffect, useState, useCallback } from "react";

const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 1080;

interface SlideProps {
  children: React.ReactNode;
  className?: string;
  bg?: string;
  id?: string;
  ref?: React.Ref<HTMLElement>;
}

export function Slide({
  children,
  className = "",
  bg = "bg-white",
  id,
  ref,
}: SlideProps) {
  const [scale, setScale] = useState<number | null>(null);
  const isDark = bg.includes("black");

  const update = useCallback(() => {
    const vh = window.innerHeight;
    const vw = window.innerWidth;
    setScale(Math.min(vw / DESIGN_WIDTH, vh / DESIGN_HEIGHT));
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  return (
    <section
      ref={ref}
      id={id}
      className={`relative overflow-hidden ${bg}`}
      style={{ height: "100dvh" }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: DESIGN_WIDTH,
          height: DESIGN_HEIGHT,
          transformOrigin: "center center",
          transform: `translate(-50%, -50%) scale(${scale ?? 0.5})`,
          opacity: scale === null ? 0 : 1,
          transition: scale === null ? "none" : "opacity 0.15s ease-in",
        }}
      >
        <div
          className={`relative ${className}`}
          style={{ width: "100%", height: "100%", overflow: "hidden" }}
        >
          {children}
          {/* Source logo — bottom right */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/source-logo.svg"
            alt=""
            className={`absolute bottom-[40px] right-[50px] w-[48px] h-[48px] pointer-events-none ${
              isDark ? "opacity-[0.15] invert" : "opacity-[0.08]"
            }`}
          />
        </div>
      </div>
    </section>
  );
}
