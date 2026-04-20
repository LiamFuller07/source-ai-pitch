"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, X, Wrench, Handshake, type LucideIcon } from "lucide-react";
import { Slide } from "./Slide";

type Side = {
  Icon: LucideIcon;
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  tone: "light" | "dark";
};

const tool: Side = {
  Icon: Wrench,
  eyebrow: "Productivity add-on",
  title: "A tool.",
  body: "Sits beside a consultant and helps them type faster. The consultant still owns every deliverable — and still bills by the hour.",
  bullets: [
    "Assists on narrow tasks",
    "Breaks on edge cases and judgment",
    "No direct impact on margin",
    "Leaves timelines untouched",
    "Billed hourly / T&M — scope creep risk",
  ],
  tone: "light",
};

const partner: Side = {
  Icon: Handshake,
  eyebrow: "Partner-class agent",
  title: "An AI partner.",
  body: "Owns the engagement end to end — from requirements to cutover — and ships under your firm's name. Billed as delivery, not hours.",
  bullets: [
    "Owns the full engagement, end to end",
    "Does the consultant's work — not just assists",
    "Direct AI lift on margin every engagement",
    "Collapses timelines from weeks to days",
    "Fixed fee, locked in 24h",
  ],
  tone: "dark",
};

const sides: Side[] = [tool, partner];

export function Landscape() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Slide
      ref={ref}
      bg="bg-[#f8f8f8]"
      className="flex flex-col justify-center px-[120px] py-[60px]"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <p className="text-[16px] font-mono uppercase tracking-[0.2em] text-black/30 mb-3">
          Landscape
        </p>
        <h2 className="text-[56px] font-semibold tracking-[-0.03em] text-black leading-[1.05] mb-4">
          Source is an AI partner, not a tool.
        </h2>
        <p className="text-[20px] text-black/45 leading-relaxed max-w-[1100px]">
          Every other AI in the category is a productivity feature bolted on to
          the consultant&apos;s workflow. Source is the consultant — owning the
          engagement, delivering the work, and billed as delivery.
        </p>
      </motion.div>

      {/* Two side-by-side cards */}
      <div className="grid grid-cols-2 gap-6">
        {sides.map((side, i) => {
          const isDark = side.tone === "dark";
          return (
            <motion.div
              key={side.title}
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.25 + i * 0.12, ease: "easeOut" }}
              className={`rounded-md p-10 flex flex-col min-h-[560px] border ${
                isDark
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-black/10"
              }`}
            >
              {/* Icon + eyebrow (the "tab" header) */}
              <div className="flex items-center justify-between mb-7">
                <div
                  className={`w-14 h-14 rounded-md flex items-center justify-center ${
                    isDark ? "bg-white/10" : "bg-black"
                  }`}
                >
                  <side.Icon
                    size={24}
                    strokeWidth={1.75}
                    className="text-white"
                  />
                </div>
                <span
                  className={`text-[11px] font-mono uppercase tracking-[0.12em] font-bold ${
                    isDark ? "text-emerald-400" : "text-black/35"
                  }`}
                >
                  {side.eyebrow}
                </span>
              </div>

              {/* Title + body */}
              <h3
                className={`text-[34px] font-semibold tracking-[-0.02em] leading-tight mb-4 ${
                  isDark ? "text-white" : "text-black"
                }`}
              >
                {side.title}
              </h3>
              <p
                className={`text-[17px] leading-relaxed mb-8 ${
                  isDark ? "text-white/65" : "text-black/55"
                }`}
              >
                {side.body}
              </p>

              {/* Bullets */}
              <ul className="space-y-3.5 mt-auto">
                {side.bullets.map((b) => (
                  <li
                    key={b}
                    className={`flex items-start gap-3 text-[17px] leading-[1.4] ${
                      isDark ? "text-white font-medium" : "text-black/55"
                    }`}
                  >
                    {isDark ? (
                      <Check
                        size={18}
                        strokeWidth={2.5}
                        className="mt-[4px] shrink-0 text-emerald-400"
                      />
                    ) : (
                      <X
                        size={18}
                        strokeWidth={2.5}
                        className="mt-[4px] shrink-0 text-black/30"
                      />
                    )}
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </Slide>
  );
}
