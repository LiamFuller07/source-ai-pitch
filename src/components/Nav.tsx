"use client";

import { useState, useEffect } from "react";
export function Nav() {
  const [current, setCurrent] = useState(0);
  const total = 11;

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Array.from(sections).indexOf(entry.target as HTMLElement);
            if (idx >= 0) setCurrent(idx);
          }
        });
      },
      { threshold: 0.5 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Slide nav dots */}
      <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => {
              const sections = document.querySelectorAll("section");
              sections[i]?.scrollIntoView({ behavior: "smooth" });
            }}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? "w-2 h-6 bg-black"
                : "w-2 h-2 bg-black/20 hover:bg-black/40"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
        <span className="text-[9px] font-mono text-black/30 mt-2">
          {current + 1}/{total}
        </span>
      </nav>
    </>
  );
}
