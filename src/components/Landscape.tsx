"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, X } from "lucide-react";
import { Slide } from "./Slide";

const DESIGN_WIDTH = 1920;

const dots: { x: number; y: number; r: number }[] = [
  // Tools — bottom-left (assists + narrow): crowded
  { x: 0.06, y: 0.14, r: 7 },
  { x: 0.12, y: 0.08, r: 9 },
  { x: 0.19, y: 0.22, r: 6 },
  { x: 0.26, y: 0.12, r: 7 },
  { x: 0.09, y: 0.28, r: 5 },
  { x: 0.22, y: 0.06, r: 6 },
  { x: 0.33, y: 0.18, r: 5 },
  { x: 0.16, y: 0.36, r: 5 },
  { x: 0.38, y: 0.08, r: 4 },
  // Automations — top-left (autonomous + narrow)
  { x: 0.11, y: 0.58, r: 7 },
  { x: 0.22, y: 0.66, r: 6 },
  { x: 0.07, y: 0.74, r: 5 },
  { x: 0.28, y: 0.54, r: 4 },
  // Platforms — bottom-right (assists + broad)
  { x: 0.60, y: 0.16, r: 7 },
  { x: 0.70, y: 0.26, r: 6 },
  { x: 0.58, y: 0.08, r: 5 },
  { x: 0.78, y: 0.14, r: 4 },
];

const source = { x: 0.86, y: 0.88 };

const tools = {
  pros: [
    "Pre-built connectors for one vendor pair",
    "Fast for already-known migrations",
    "Data validation scripts",
    "RPA for repetitive input",
  ],
  cons: [
    "Still need a consultant to drive them",
    "Cover one step, not a workflow",
    "Break on judgment calls",
    "Don't own the client outcome",
    "Don't replace expertise — they amplify it",
  ],
};

function QuadrantChart({ animate }: { animate: boolean }) {
  const W = 1000;
  const H = 720;
  const padL = 120;
  const padR = 40;
  const padT = 60;
  const padB = 100;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;
  const X = (v: number) => padL + v * plotW;
  const Y = (v: number) => padT + (1 - v) * plotH;
  const midX = padL + plotW / 2;
  const midY = padT + plotH / 2;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" aria-hidden>
      {/* Partner quadrant (top-right) subtle tint — where Source sits */}
      <rect x={midX} y={padT} width={plotW / 2} height={plotH / 2} fill="rgba(0,0,0,0.025)" />

      {/* Axis frame */}
      <line x1={padL} y1={padT} x2={padL} y2={padT + plotH} stroke="rgba(0,0,0,0.18)" strokeWidth="1.5" />
      <line x1={padL} y1={padT + plotH} x2={padL + plotW} y2={padT + plotH} stroke="rgba(0,0,0,0.18)" strokeWidth="1.5" />

      {/* Quadrant dividers */}
      <line x1={midX} y1={padT} x2={midX} y2={padT + plotH} stroke="rgba(0,0,0,0.10)" strokeWidth="1" strokeDasharray="3 6" />
      <line x1={padL} y1={midY} x2={padL + plotW} y2={midY} stroke="rgba(0,0,0,0.10)" strokeWidth="1" strokeDasharray="3 6" />

      {/* Quadrant labels */}
      <text x={padL + 18} y={padT + 28} fontSize="13" letterSpacing="3" fill="rgba(0,0,0,0.40)" fontWeight="600" fontFamily="ui-monospace, monospace">AUTOMATIONS</text>
      <text x={midX + 18} y={padT + 28} fontSize="13" letterSpacing="3" fill="rgba(0,0,0,0.40)" fontWeight="600" fontFamily="ui-monospace, monospace">PARTNERS</text>
      <text x={padL + 18} y={midY + 28} fontSize="13" letterSpacing="3" fill="rgba(0,0,0,0.40)" fontWeight="600" fontFamily="ui-monospace, monospace">TOOLS</text>
      <text x={midX + 18} y={midY + 28} fontSize="13" letterSpacing="3" fill="rgba(0,0,0,0.40)" fontWeight="600" fontFamily="ui-monospace, monospace">PLATFORMS</text>

      {/* Competitor dots */}
      {dots.map((d, i) => (
        <motion.circle
          key={i}
          cx={X(d.x)}
          cy={Y(d.y)}
          r={d.r}
          fill="rgba(0,0,0,0.22)"
          initial={{ opacity: 0, scale: 0 }}
          animate={animate ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.3 + i * 0.04, ease: "easeOut" }}
        />
      ))}

      {/* Source marker — halo + dot + label */}
      <motion.g
        initial={{ opacity: 0, scale: 0 }}
        animate={animate ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.7, delay: 1.1, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <circle cx={X(source.x)} cy={Y(source.y)} r="34" fill="rgba(0,0,0,0.06)" />
        <circle cx={X(source.x)} cy={Y(source.y)} r="16" fill="#000" />
        <text
          x={X(source.x)}
          y={Y(source.y) - 44}
          textAnchor="middle"
          fontSize="22"
          fontWeight="700"
          fill="#000"
          letterSpacing="-0.01em"
        >
          Source
        </text>
      </motion.g>

      {/* X axis ticks */}
      <text x={padL} y={padT + plotH + 34} fontSize="14" fill="rgba(0,0,0,0.55)">Narrow task</text>
      <text x={padL + plotW} y={padT + plotH + 34} textAnchor="end" fontSize="14" fill="rgba(0,0,0,0.55)">Full engagement</text>
      <text x={padL + plotW / 2} y={padT + plotH + 70} textAnchor="middle" fontSize="12" letterSpacing="4" fill="rgba(0,0,0,0.40)" fontWeight="600" fontFamily="ui-monospace, monospace">
        SCOPE OF WORK →
      </text>

      {/* Y axis ticks */}
      <text x={padL - 14} y={padT + plotH - 4} textAnchor="end" fontSize="14" fill="rgba(0,0,0,0.55)">Assists</text>
      <text x={padL - 14} y={padT + 14} textAnchor="end" fontSize="14" fill="rgba(0,0,0,0.55)">Autonomous</text>
      <text
        transform={`translate(42 ${padT + plotH / 2}) rotate(-90)`}
        textAnchor="middle"
        fontSize="12"
        letterSpacing="4"
        fill="rgba(0,0,0,0.40)"
        fontWeight="600"
        fontFamily="ui-monospace, monospace"
      >
        AUTONOMY →
      </text>
    </svg>
  );
}

export function Landscape() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Slide ref={ref} bg="bg-[#f8f8f8]" className="flex flex-col justify-center px-[120px]">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="text-[16px] font-mono uppercase tracking-[0.2em] text-black/30 mb-3">
            Landscape
          </p>
          <h2 className="text-[56px] font-semibold tracking-[-0.03em] text-black mb-3">
            Source is not a tool.
          </h2>
          <p className="text-[20px] text-black/45 leading-relaxed max-w-[960px]">
            Every other product helps consultants work a little faster. Source does the work they bill for — end to end.
          </p>
        </motion.div>

        {/* Chart + pros/cons */}
        <div className="grid grid-cols-[1.25fr_1fr] gap-8 items-stretch">
          {/* Quadrant chart card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white border border-black/10 rounded-md p-10 flex flex-col"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-[13px] font-mono uppercase tracking-[0.15em] text-black/45 font-bold">
                Where each plays
              </span>
              <span className="text-[12px] font-mono tracking-[0.08em] text-black/35">
                Autonomy × Scope
              </span>
            </div>
            <div className="flex-1 flex items-center">
              <QuadrantChart animate={inView} />
            </div>
          </motion.div>

          {/* Pros / cons card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="bg-white border border-black/10 rounded-md p-10 flex flex-col"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-[13px] font-mono uppercase tracking-[0.15em] text-black/45 font-bold">
                Every other provider = a tool
              </span>
              <span className="text-[12px] font-mono tracking-[0.08em] text-black/35">
                Pros · Cons
              </span>
            </div>

            <div className="mb-7">
              <p className="text-[12px] font-mono uppercase tracking-[0.14em] text-black/50 font-semibold mb-3">
                What tools do well
              </p>
              <ul className="space-y-2.5">
                {tools.pros.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[15px] text-black/75 leading-[1.45]">
                    <Check size={16} strokeWidth={2.25} className="mt-[3px] shrink-0 text-black/70" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 border-t border-black/[0.08]">
              <p className="text-[12px] font-mono uppercase tracking-[0.14em] text-black/50 font-semibold mb-3">
                Where tools stop
              </p>
              <ul className="space-y-2.5">
                {tools.cons.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[15px] text-black/60 leading-[1.45]">
                    <X size={16} strokeWidth={2.25} className="mt-[3px] shrink-0 text-black/40" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Closing black bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-8 bg-black text-white px-10 py-6 flex items-center justify-between"
        >
          <p className="text-[22px] font-semibold tracking-[-0.02em] max-w-[1100px] leading-tight">
            Source replaces the engagement — not a step in it.
          </p>
          <span className="text-[12px] font-mono uppercase tracking-[0.12em] text-white/40 shrink-0 ml-8">
            Partner-class agent
          </span>
        </motion.div>
      </div>
    </Slide>
  );
}

export { DESIGN_WIDTH };
