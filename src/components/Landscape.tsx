"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Wrench,
  Handshake,
  Puzzle,
  AlertTriangle,
  Minus,
  Hourglass,
  Receipt,
  Workflow,
  UserCheck,
  Percent,
  Zap,
  Lock,
  type LucideIcon,
} from "lucide-react";
import { Slide } from "./Slide";

type Bullet = { Icon: LucideIcon; text: string };

type Side = {
  Icon: LucideIcon;
  eyebrow: string;
  title: string;
  body: string;
  bullets: Bullet[];
  tone: "light" | "dark";
};

const tool: Side = {
  Icon: Wrench,
  eyebrow: "Productivity add-on",
  title: "A tool.",
  body: "Sits beside a consultant and helps them type faster. The consultant still owns every deliverable — and still bills by the hour.",
  bullets: [
    { Icon: Puzzle, text: "Assists on narrow tasks" },
    { Icon: AlertTriangle, text: "Breaks on edge cases and judgment calls" },
    { Icon: Minus, text: "Doesn't move the margin needle" },
    { Icon: Hourglass, text: "Leaves week-long timelines intact" },
    { Icon: Receipt, text: "Billed hourly — scope creep eats the P&L" },
  ],
  tone: "light",
};

const partner: Side = {
  Icon: Handshake,
  eyebrow: "Partner-class agent",
  title: "An AI partner.",
  body: "Owns the engagement end to end — under consultant review, shipped under your firm's name. Billed as delivery, not hours.",
  bullets: [
    { Icon: Workflow, text: "Owns the full engagement, end to end" },
    { Icon: UserCheck, text: "Consultant-reviewed — ships under your firm's name" },
    { Icon: Percent, text: "50%+ margin on every engagement" },
    { Icon: Zap, text: "Weeks of work, compressed into days" },
    { Icon: Lock, text: "Fixed fee, locked in 24h" },
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
          engagement, reviewed by your team, and billed as delivery.
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
              className={`rounded-md p-10 flex flex-col min-h-[580px] border ${
                isDark
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-black/10"
              }`}
            >
              {/* Icon + eyebrow */}
              <div className="flex items-center justify-between mb-7">
                <div
                  className={`w-14 h-14 rounded-md flex items-center justify-center ${
                    isDark ? "bg-white/10" : "bg-black"
                  }`}
                >
                  <side.Icon size={24} strokeWidth={1.75} className="text-white" />
                </div>
                <span
                  className={`text-[11px] font-mono uppercase tracking-[0.12em] font-bold ${
                    isDark ? "text-white/55" : "text-black/35"
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

              {/* Bullets with per-row icons */}
              <ul className="space-y-3 mt-auto">
                {side.bullets.map(({ Icon, text }) => {
                  const isMarginBullet = text.startsWith("50%+ margin");
                  return (
                    <li
                      key={text}
                      className={`flex items-center gap-3.5 text-[17px] leading-[1.35] ${
                        isDark ? "text-white font-medium" : "text-black/55"
                      }`}
                    >
                      <span
                        className={`w-9 h-9 rounded-md flex items-center justify-center shrink-0 border ${
                          isDark
                            ? "bg-white/[0.06] border-white/[0.10]"
                            : "bg-black/[0.03] border-black/[0.08]"
                        }`}
                      >
                        <Icon
                          size={17}
                          strokeWidth={1.75}
                          className={isDark ? "text-white/75" : "text-black/35"}
                        />
                      </span>
                      <span className={isDark && isMarginBullet ? "font-semibold" : ""}>
                        {text}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </Slide>
  );
}
