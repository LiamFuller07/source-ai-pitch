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

  useEffect(() => {
    const update = () => {
      setScale(
        Math.max(
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
        <div className={`w-full h-full ${className}`}>{children}</div>
      </div>
    </section>
  );
}
