"use client";

import { useEffect, useState } from "react";

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
  const [scale, setScale] = useState(1);
  const isDark = bg.includes("black");

  useEffect(() => {
    const update = () => {
      setScale(
        Math.min(
          window.innerWidth / DESIGN_WIDTH,
          window.innerHeight / DESIGN_HEIGHT
        )
      );
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <section ref={ref} id={id} className={`h-screen relative overflow-hidden ${bg}`}>
      <div
        className="absolute top-1/2 left-1/2"
        style={{
          width: DESIGN_WIDTH,
          height: DESIGN_HEIGHT,
          transform: `translate(-50%, -50%) scale(${scale})`,
        }}
      >
        <div className={`w-full h-full relative ${className}`}>
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
