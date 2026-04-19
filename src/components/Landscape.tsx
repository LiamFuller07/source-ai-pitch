"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, X, TrendingUp, Clock } from "lucide-react";
import { Slide } from "./Slide";

// Tools cluster in the "productivity" band — bottom half of the chart.
// They boost consultants; they don't replace the engagement.
const dots: { x: number; y: number; r: number }[] = [
  { x: 0.08, y: 0.20, r: 8 },
  { x: 0.18, y: 0.10, r: 9 },
  { x: 0.30, y: 0.24, r: 7 },
  { x: 0.44, y: 0.14, r: 7 },
  { x: 0.60, y: 0.26, r: 8 },
  { x: 0.74, y: 0.12, r: 6 },
];

const source = { x: 0.86, y: 0.86 };

const contrasts: { dimension: string; tool: string; source: string }[] = [
  {
    dimension: "Scope",
    tool: "Speeds up one task",
    source: "Owns the full engagement",
  },
  {
    dimension: "Autonomy",
    tool: "Assists a consultant",
    source: "Does the consultant's work",
  },
  {
    dimension: "Judgment",
    tool: "Breaks on edge cases",
    source: "Makes decisions and flags the rest",
  },
  {
    dimension: "Margin",
    tool: "No impact — you still bill hours",
    source: "Direct AI lift on every engagement",
  },
  {
    dimension: "Timelines",
    tool: "Leaves them untouched",
    source: "Collapses weeks into days",
  },
];

function QuadrantChart({ animate }: { animate: boolean }) {
  const W = 1000;
  const H = 700;
  const padL = 130;
  const padR = 40;
  const padT = 60;
  const padB = 110;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;
  const X = (v: number) => padL + v * plotW;
  const Y = (v: number) => padT + (1 - v) * plotH;
  const midX = padL + plotW / 2;
  const midY = padT + plotH / 2;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" aria-hidden>
      {/* Productivity band tint (bottom half) */}
      <rect
        x={padL}
        y={midY}
        width={plotW}
        height={plotH / 2}
        fill="rgba(0,0,0,0.022)"
      />
      {/* Partner quadrant tint — where Source sits */}
      <rect
        x={midX}
        y={padT}
        width={plotW / 2}
        height={plotH / 2}
        fill="rgba(0,0,0,0.04)"
      />

      {/* Axis frame */}
      <line x1={padL} y1={padT} x2={padL} y2={padT + plotH} stroke="rgba(0,0,0,0.20)" strokeWidth="1.5" />
      <line x1={padL} y1={padT + plotH} x2={padL + plotW} y2={padT + plotH} stroke="rgba(0,0,0,0.20)" strokeWidth="1.5" />

      {/* Quadrant dividers */}
      <line x1={midX} y1={padT} x2={midX} y2={padT + plotH} stroke="rgba(0,0,0,0.10)" strokeWidth="1" strokeDasharray="3 6" />
      <line x1={padL} y1={midY} x2={padL + plotW} y2={midY} stroke="rgba(0,0,0,0.10)" strokeWidth="1" strokeDasharray="3 6" />

      {/* Zone labels — productivity vs doing the work */}
      <text
        x={padL + plotW - 12}
        y={midY + 28}
        textAnchor="end"
        fontSize="14"
        letterSpacing="4"
        fill="rgba(0,0,0,0.35)"
        fontWeight="700"
        fontFamily="ui-monospace, monospace"
      >
        PRODUCTIVITY
      </text>
      <text
        x={padL + plotW - 12}
        y={padT + 28}
        textAnchor="end"
        fontSize="14"
        letterSpacing="4"
        fill="rgba(0,0,0,0.55)"
        fontWeight="700"
        fontFamily="ui-monospace, monospace"
      >
        DOES THE WORK
      </text>

      {/* Tool dots */}
      {dots.map((d, i) => (
        <motion.circle
          key={i}
          cx={X(d.x)}
          cy={Y(d.y)}
          r={d.r}
          fill="rgba(0,0,0,0.22)"
          initial={{ opacity: 0, scale: 0 }}
          animate={animate ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.3 + i * 0.06, ease: "easeOut" }}
        />
      ))}

      {/* Faint "tools" cluster label */}
      <motion.text
        x={X(0.42)}
        y={Y(0.05) + 42}
        textAnchor="middle"
        fontSize="13"
        letterSpacing="2.5"
        fill="rgba(0,0,0,0.35)"
        fontWeight="600"
        fontFamily="ui-monospace, monospace"
        initial={{ opacity: 0 }}
        animate={animate ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        tools
      </motion.text>

      {/* Source marker */}
      <motion.g
        initial={{ opacity: 0, scale: 0 }}
        animate={animate ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.7, delay: 1.1, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <circle cx={X(source.x)} cy={Y(source.y)} r="38" fill="rgba(0,0,0,0.06)" />
        <circle cx={X(source.x)} cy={Y(source.y)} r="17" fill="#000" />
        <text
          x={X(source.x)}
          y={Y(source.y) - 50}
          textAnchor="middle"
          fontSize="24"
          fontWeight="700"
          fill="#000"
          letterSpacing="-0.01em"
        >
          Source
        </text>
      </motion.g>

      {/* X axis ticks */}
      <text x={padL} y={padT + plotH + 34} fontSize="14" fill="rgba(0,0,0,0.55)">One task</text>
      <text x={padL + plotW} y={padT + plotH + 34} textAnchor="end" fontSize="14" fill="rgba(0,0,0,0.55)">Full engagement</text>
      <text
        x={padL + plotW / 2}
        y={padT + plotH + 74}
        textAnchor="middle"
        fontSize="12"
        letterSpacing="4"
        fill="rgba(0,0,0,0.40)"
        fontWeight="600"
        fontFamily="ui-monospace, monospace"
      >
        SCOPE OF WORK →
      </text>

      {/* Y axis ticks */}
      <text x={padL - 14} y={padT + plotH - 4} textAnchor="end" fontSize="14" fill="rgba(0,0,0,0.55)">Assists</text>
      <text x={padL - 14} y={padT + 14} textAnchor="end" fontSize="14" fill="rgba(0,0,0,0.55)">Does it</text>
      <text
        transform={`translate(44 ${padT + plotH / 2}) rotate(-90)`}
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
            Everything else is a productivity tool.
          </h2>
          <p className="text-[20px] text-black/45 leading-relaxed max-w-[1000px]">
            Other products help your consultants work faster. Source does the work itself — with direct impact on margin and timelines.
          </p>
        </motion.div>

        <div className="grid grid-cols-[1.35fr_1fr] gap-8 items-stretch">
          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white border border-black/10 rounded-md p-10 flex flex-col"
          >
            <div className="flex items-center justify-between mb-4">
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

          {/* Head-to-head: Tools vs Source */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-col"
          >
            {/* Column headers */}
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 mb-3 px-2">
              <span className="text-[13px] font-mono uppercase tracking-[0.18em] text-black/40 font-bold">
                Tools
              </span>
              <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-black/25">
                vs
              </span>
              <span className="text-[13px] font-mono uppercase tracking-[0.18em] text-black font-bold text-right">
                Source
              </span>
            </div>

            {/* Contrast rows */}
            <div className="border border-black/10 rounded-md overflow-hidden bg-white">
              {contrasts.map((c, i) => (
                <div
                  key={c.dimension}
                  className={`grid grid-cols-[1fr_auto_1fr] items-stretch ${
                    i > 0 ? "border-t border-black/[0.08]" : ""
                  }`}
                >
                  {/* Tools side */}
                  <div className="bg-black/[0.025] px-5 py-4 flex items-start gap-2.5">
                    <X size={16} strokeWidth={2.5} className="mt-[3px] shrink-0 text-rose-500/80" />
                    <span className="text-[14px] text-black/55 leading-[1.4]">
                      {c.tool}
                    </span>
                  </div>
                  {/* Dimension label */}
                  <div className="px-3 flex items-center justify-center bg-white border-x border-black/[0.08]">
                    <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-black/35 font-semibold whitespace-nowrap">
                      {c.dimension}
                    </span>
                  </div>
                  {/* Source side */}
                  <div className="bg-black text-white px-5 py-4 flex items-start gap-2.5 justify-end">
                    <span className="text-[14px] leading-[1.4] text-right">
                      {c.source}
                    </span>
                    <Check size={16} strokeWidth={2.5} className="mt-[3px] shrink-0 text-emerald-400" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Closing black bar — Source's direct impact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-8 bg-black text-white px-10 py-7 grid grid-cols-[1.4fr_auto_1fr_1fr] items-center gap-10"
        >
          <p className="text-[22px] font-semibold tracking-[-0.02em] leading-tight">
            Source doesn't assist the work.<br />
            <span className="text-white/55 font-normal">It does the work.</span>
          </p>
          <div className="w-px h-14 bg-white/15" />
          <div className="flex items-start gap-3">
            <TrendingUp size={18} strokeWidth={1.75} className="text-white/70 mt-[2px] shrink-0" />
            <div>
              <p className="text-[11px] font-mono uppercase tracking-[0.14em] text-white/45 font-semibold mb-1">
                Margin
              </p>
              <p className="text-[15px] text-white leading-tight">
                Direct AI impact
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock size={18} strokeWidth={1.75} className="text-white/70 mt-[2px] shrink-0" />
            <div>
              <p className="text-[11px] font-mono uppercase tracking-[0.14em] text-white/45 font-semibold mb-1">
                Timelines
              </p>
              <p className="text-[15px] text-white leading-tight">
                Direct AI impact
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </Slide>
  );
}
