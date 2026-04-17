"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Check,
  FileText,
  Search,
  MessageSquare,
  ClipboardCheck,
  Rocket,
  ShieldCheck,
  Mic,
  Database,
  Users,
  AlertCircle,
  Settings2,
  ArrowRight,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Slide } from "./Slide";

// ─── Data ────────────────────────────────────────────────────────────────────

type FlowStep = {
  owner: "consultant" | "source" | "customer";
  label: string;
  sub: string;
  icon: LucideIcon | null;
  emoji?: string;
};

const flowSteps: FlowStep[] = [
  { owner: "consultant", label: "Discovery Call", sub: "Transcript + requirements", icon: FileText },
  { owner: "source", label: "AI System Scan", sub: "Read-only scan of live ERP", icon: Search },
  { owner: "source", label: "BRD Draft", sub: "Auto-drafted from scan", icon: FileText },
  { owner: "source", label: "AI Revisions", sub: "Edits from consultant feedback", icon: MessageSquare },
  { owner: "source", label: "BRD Final", sub: "Approved spec · ready to sign", icon: ClipboardCheck },
  { owner: "consultant", label: "Consultant Review", sub: "Sanity-check + client framing", icon: ClipboardCheck },
  { owner: "customer", label: "Customer Sign-Off", sub: "Fixed-fee scope locked", icon: Check },
  { owner: "source", label: "AI Migration", sub: "Data + config moved over", icon: Rocket },
  { owner: "source", label: "Testing & QA", sub: "Parallel run + reconciliation", icon: ShieldCheck },
  { owner: "customer", label: "Happy Customer", sub: "Go-live · on time · on budget", icon: null, emoji: "🎉" },
];

// Row layout: 5 + 5
const flowRow1 = flowSteps.slice(0, 5);
const flowRow2 = flowSteps.slice(5);

const stages = ["Scope", "Discovery", "Scan", "Deliver", "Confirm"];

// ─── Visual primitives ───────────────────────────────────────────────────────

function Avatar({ name }: { name: string }) {
  return (
    <span className="w-7 h-7 rounded-full bg-black/[0.04] border border-black/[0.08] flex items-center justify-center text-[11px] font-semibold text-black/70 shrink-0">
      {name.charAt(0)}
    </span>
  );
}

function StatusPill({
  tone,
  children,
}: {
  tone: "neutral" | "active" | "done" | "success" | "warn";
  children: React.ReactNode;
}) {
  const toneMap = {
    neutral: "bg-transparent text-black/45 border-black/10",
    active: "bg-black/[0.04] text-black/70 border-black/10",
    done: "bg-black text-white border-black",
    success: "bg-transparent text-black/70 border-black/15",
    warn: "bg-transparent text-black/40 border-black/10 border-dashed",
  };
  const dotMap = {
    neutral: "bg-black/25",
    active: "bg-black/60",
    done: "bg-white",
    success: "bg-black",
    warn: "bg-black/30",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[9.5px] font-mono font-bold tracking-[0.08em] px-1.5 py-0.5 rounded-full border ${toneMap[tone]}`}
    >
      <span className={`w-1 h-1 rounded-full ${dotMap[tone]}`} />
      {children}
    </span>
  );
}

function AiPill() {
  return (
    <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold tracking-[0.14em] px-1.5 py-[2px] rounded-full bg-black text-white">
      <Sparkles size={8} strokeWidth={2.5} />
      AI
    </span>
  );
}

// ─── Stage cards ─────────────────────────────────────────────────────────────

function ScopeCard() {
  const lineItems: { icon: LucideIcon; label: string; meta: string }[] = [
    { icon: Database, label: "Data migration", meta: "94k rec" },
    { icon: Settings2, label: "Config & COA", meta: "247 acct" },
    { icon: Users, label: "Training", meta: "12 users" },
  ];
  return (
    <div className="bg-white border border-black/10 rounded-md px-5 py-4 min-h-[260px]">
      <div className="flex items-center justify-between mb-3 pb-3 border-b border-black/[0.06]">
        <div className="flex items-center gap-2">
          <FileText size={14} className="text-black/55" strokeWidth={1.75} />
          <span className="text-[13px] font-semibold text-black">Partner SOW</span>
        </div>
        <span className="text-[10px] font-mono tracking-[0.12em] text-black/35">DRAFT · v2</span>
      </div>

      {/* Source → Target visualization */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex-1 border border-black/10 rounded-sm px-2.5 py-2">
          <div className="text-[9px] font-mono uppercase tracking-[0.1em] text-black/35">From</div>
          <div className="text-[12px] font-semibold text-black leading-tight mt-0.5">QuickBooks</div>
        </div>
        <ArrowRight size={14} className="text-black/25 shrink-0" strokeWidth={1.75} />
        <div className="flex-1 border border-black/25 rounded-sm px-2.5 py-2">
          <div className="text-[9px] font-mono uppercase tracking-[0.1em] text-black/45">To</div>
          <div className="text-[12px] font-semibold text-black leading-tight mt-0.5">NetSuite</div>
        </div>
      </div>

      <div className="space-y-1.5 mb-3">
        {lineItems.map((li) => (
          <div key={li.label} className="flex items-center justify-between text-[12px]">
            <span className="flex items-center gap-2 text-black/70">
              <li.icon size={12} strokeWidth={1.75} className="text-black/35" />
              {li.label}
            </span>
            <span className="text-black/45 font-mono text-[11px]">{li.meta}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-black/10 pt-2.5 flex items-center justify-between">
        <span className="text-[10px] font-mono uppercase tracking-[0.12em] text-black/40">Fixed fee</span>
        <span className="text-[14px] font-semibold text-black">$12,500</span>
      </div>
    </div>
  );
}

function DiscoveryCard() {
  const items: { name: string; role: string; duration: string; done: boolean }[] = [
    { name: "Jane", role: "CFO", duration: "42m", done: true },
    { name: "Mark", role: "Ops lead", duration: "28m", done: true },
    { name: "Priya", role: "IT lead", duration: "19m", done: false },
  ];
  const tags = ["Multi-entity", "Inventory", "Tax", "4-way match"];
  return (
    <div className="bg-white border border-black/10 rounded-md px-5 py-4 min-h-[260px]">
      <div className="flex items-center justify-between mb-3 pb-3 border-b border-black/[0.06]">
        <div className="flex items-center gap-2 min-w-0">
          <Mic size={14} className="text-black/55 shrink-0" strokeWidth={1.75} />
          <span className="text-[13px] font-semibold text-black truncate">Transcripts</span>
          <AiPill />
        </div>
        <span className="text-[10px] font-mono tracking-[0.12em] text-black/35 shrink-0">
          3 calls
        </span>
      </div>

      <div className="space-y-2 mb-4">
        {items.map((it) => (
          <div key={it.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <Avatar name={it.name} />
              <div className="min-w-0 leading-tight">
                <div className="text-[12.5px] text-black font-medium">
                  {it.name} <span className="text-black/40 font-normal">· {it.role}</span>
                </div>
                <div className="text-[10px] font-mono text-black/35 mt-0.5">{it.duration}</div>
              </div>
            </div>
            <StatusPill tone={it.done ? "success" : "warn"}>
              {it.done ? "DONE" : "PENDING"}
            </StatusPill>
          </div>
        ))}
      </div>

      <div className="pt-3 border-t border-black/[0.06]">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-mono uppercase tracking-[0.12em] text-black/40">
            Extracted topics
          </span>
          <span className="text-[10px] font-mono font-semibold text-black/70">
            23 reqs
          </span>
        </div>
        <div className="flex flex-wrap gap-1">
          {tags.map((t) => (
            <span
              key={t}
              className="text-[10px] px-1.5 py-0.5 text-black/60 border border-black/10 rounded-sm"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ScanCard() {
  const rows: { label: string; value: string; muted?: boolean }[] = [
    { label: "Records", value: "94,127" },
    { label: "GL accounts", value: "247" },
    { label: "Ghost system", value: "Shopify", muted: true },
    { label: "Integrations", value: "4" },
  ];
  return (
    <div className="bg-white border border-black/10 rounded-md px-5 py-4 min-h-[260px]">
      <div className="flex items-center justify-between mb-3 pb-3 border-b border-black/[0.06]">
        <div className="flex items-center gap-2 min-w-0">
          <Search size={14} className="text-black/55 shrink-0" strokeWidth={1.75} />
          <span className="text-[13px] font-semibold text-black truncate">QuickBooks scan</span>
          <AiPill />
        </div>
        <StatusPill tone="success">SCANNED</StatusPill>
      </div>

      <div className="space-y-2">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between text-[13px]">
            <span className="flex items-center gap-1.5 text-black/60">
              {r.muted && <AlertCircle size={12} strokeWidth={1.75} className="text-black/35 shrink-0" />}
              {r.label}
            </span>
            <span className={`font-mono font-medium ${r.muted ? "text-black/55 italic" : "text-black"}`}>
              {r.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DeliverCard() {
  // AI agents running in parallel
  const agents: { id: string; task: string; pct: number }[] = [
    { id: "AI-01", task: "Mapping COA", pct: 100 },
    { id: "AI-02", task: "Migrating records", pct: 82 },
    { id: "AI-03", task: "Reconciling", pct: 46 },
  ];
  return (
    <div className="bg-white border border-black/10 rounded-md px-5 py-4 min-h-[260px]">
      <div className="flex items-center justify-between mb-3 pb-3 border-b border-black/[0.06]">
        <div className="flex items-center gap-2 min-w-0">
          <Rocket size={14} className="text-black/55 shrink-0" strokeWidth={1.75} />
          <span className="text-[13px] font-semibold text-black truncate">Migration</span>
          <AiPill />
        </div>
        <StatusPill tone="success">RUNNING</StatusPill>
      </div>

      <div className="space-y-2.5">
        {agents.map((a) => {
          const done = a.pct === 100;
          return (
            <div key={a.id}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[12.5px] text-black font-medium truncate">{a.task}</span>
                <span className={`font-mono text-[11px] shrink-0 ${done ? "text-black font-semibold" : "text-black/55"}`}>
                  {a.pct}%
                </span>
              </div>
              <div className="w-full h-1 bg-black/[0.06] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${a.pct}%` }}
                  transition={{ duration: 1.1, ease: "easeOut" }}
                  className={`h-full ${done ? "bg-black" : "bg-black/55"}`}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-3 mt-3 border-t border-black/[0.06] flex items-center justify-between">
        <span className="text-[11px] text-black/50">3 agents · parallel</span>
        <span className="font-mono text-[11px] text-black/60">ETA 14m</span>
      </div>
    </div>
  );
}

function ConfirmCard() {
  const checks: { label: string; meta: string }[] = [
    { label: "Scope locked", meta: "Fixed fee · $12,500" },
    { label: "Migration verified", meta: "94,127 records reconciled" },
    { label: "Parallel run passed", meta: "0 variance vs. source" },
  ];
  return (
    <div className="bg-white border border-black/10 rounded-md px-5 py-4 min-h-[260px]">
      <div className="flex items-center justify-between mb-3 pb-3 border-b border-black/[0.06]">
        <div className="flex items-center gap-2">
          <Avatar name="Jane" />
          <div className="min-w-0">
            <div className="text-[12.5px] font-semibold text-black leading-tight">Jane · CFO</div>
            <div className="text-[10px] font-mono text-black/40 mt-0.5">Customer sign-off</div>
          </div>
        </div>
        <StatusPill tone="warn">AWAITING</StatusPill>
      </div>

      <div className="space-y-2 mb-4">
        {checks.map((c) => (
          <div key={c.label} className="flex items-start gap-2.5">
            <span className="w-4 h-4 rounded-full border border-black/20 flex items-center justify-center shrink-0 mt-0.5">
              <Check size={10} className="text-black/70" strokeWidth={2.25} />
            </span>
            <div className="min-w-0">
              <div className="text-[13px] text-black font-medium truncate">{c.label}</div>
              <div className="text-[10px] font-mono text-black/40 mt-0.5">{c.meta}</div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full border border-black/80 text-black text-[10px] font-medium py-2 uppercase tracking-[0.08em] rounded-sm flex items-center justify-center gap-1.5 hover:bg-black hover:text-white transition-colors">
        <Check size={11} strokeWidth={2.25} />
        Confirm &amp; sign-off
      </button>
    </div>
  );
}

const stageCards: Record<string, () => React.ReactNode> = {
  Scope: ScopeCard,
  Discovery: DiscoveryCard,
  Scan: ScanCard,
  Deliver: DeliverCard,
  Confirm: ConfirmCard,
};

// ─── Main component ───────────────────────────────────────────────────────────

export function WhoDoesWhat() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const slideVisible = useInView(ref, { margin: "-40%" });
  const [activeStep, setActiveStep] = useState(-1);

  const maxStep = flowSteps.length + stages.length - 1;

  // Keyboard navigation — only when slide is visible
  useEffect(() => {
    if (!slideVisible) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        if (activeStep < maxStep) {
          e.preventDefault();
          e.stopPropagation();
          setActiveStep((prev) => prev + 1);
        }
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        if (activeStep > 0) {
          e.preventDefault();
          e.stopPropagation();
          setActiveStep((prev) => prev - 1);
        }
      }
    };

    window.addEventListener("keydown", handler, true);
    return () => window.removeEventListener("keydown", handler, true);
  }, [slideVisible, activeStep, maxStep]);

  // Start at step 0 when slide first enters view
  useEffect(() => {
    if (inView && activeStep === -1) {
      setActiveStep(0);
    }
  }, [inView, activeStep]);

  const renderStepRow = (row: typeof flowSteps, rowOffset: number) => (
    <div className="flex items-stretch gap-4">
      {row.map((step, i) => {
        const globalIndex = rowOffset + i;
        const isVisible = globalIndex <= activeStep;
        const isActive = globalIndex === activeStep;
        const isAI = step.owner === "source";
        const isLast = i === row.length - 1;
        const isFinalStep = globalIndex === flowSteps.length - 1;

        return (
          <div key={step.label} className={`flex items-center min-w-0 ${isFinalStep ? "flex-[0.8]" : "flex-1"}`}>
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 10 }}
              animate={
                isVisible
                  ? { opacity: 1, scale: 1, y: 0 }
                  : { opacity: 0, scale: 0.85, y: 10 }
              }
              transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={() => setActiveStep(globalIndex)}
              className={`flex-1 min-w-0 px-6 py-7 cursor-pointer transition-colors duration-200 relative rounded-md border ${
                isActive
                  ? "bg-black border-black text-white"
                  : isVisible
                  ? "bg-white border-black/10 text-black"
                  : "bg-transparent border-transparent"
              }`}
            >
              {/* Role badge */}
              {!step.emoji && (
                <span className={`absolute top-3 right-4 text-[10.5px] font-mono font-bold tracking-[0.10em] ${
                  isActive
                    ? "text-white/50"
                    : isAI ? "text-black/40" : "text-black/30"
                }`}>
                  {isAI ? "AI" : "Consultant"}
                </span>
              )}
              {/* Icon + label + subtitle */}
              <div className="flex items-start gap-3.5">
                {step.emoji ? (
                  <span className="text-[22px] shrink-0 leading-none mt-0.5">{step.emoji}</span>
                ) : step.icon ? (
                  <step.icon
                    size={22}
                    strokeWidth={1.75}
                    className={`shrink-0 mt-0.5 ${
                      isActive ? "text-white/55" : "text-black/30"
                    }`}
                  />
                ) : null}
                <div className="min-w-0">
                  <p
                    className={`text-[19px] font-semibold leading-tight tracking-[-0.01em] ${
                      isActive ? "text-white" : "text-black"
                    }`}
                  >
                    {step.label}
                  </p>
                  <p
                    className={`mt-1.5 text-[13px] leading-snug ${
                      isActive ? "text-white/60" : "text-black/45"
                    }`}
                  >
                    {step.sub}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Arrow connector */}
            {!isLast && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                className="shrink-0 px-2.5 text-[26px] font-bold text-black/20"
              >
                →
              </motion.div>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <Slide
      ref={ref}
      bg="bg-[#f8f8f8]"
      className="flex flex-col justify-center px-[100px] py-[60px]"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <p className="text-[14px] font-mono uppercase tracking-[0.2em] text-black/30 mb-2">
          Responsibility Matrix
        </p>
        <h2 className="text-[48px] font-semibold tracking-[-0.03em] text-black mb-2">
          Who Does What
        </h2>
        <p className="text-[22px] text-black/45 leading-relaxed max-w-[900px]">
          <span className="font-semibold text-black">Source AI</span> does the
          technical execution end-to-end.{" "}
          <span className="font-semibold text-black">The consultant</span> keeps
          the client relationship and commercial ownership.
        </p>
      </motion.div>

      {/* Workflow label */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="text-[12px] font-mono uppercase tracking-[0.18em] text-black/25 mb-3"
      >
        Workflow
      </motion.p>

      {/* Workflow rows — 5+5 */}
      <div className="flex flex-col gap-3 mb-6">
        {renderStepRow(flowRow1, 0)}
        {renderStepRow(flowRow2, 5)}
      </div>

      {/* Horizontal separator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={activeStep >= flowSteps.length ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="border-t border-black/10 mb-8"
      />

      {/* Agentic flow timeline */}
      <div className="flex-1 min-h-0 flex flex-col">
        {/* Pill labels on a horizontal line */}
        <div className="relative mb-5">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={activeStep >= flowSteps.length ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ transformOrigin: "left" }}
            className="absolute top-1/2 left-0 right-0 h-px bg-black/15 -translate-y-1/2"
          />
          <div className="relative flex justify-between items-center">
            {stages.map((label, i) => {
              const visible = activeStep >= flowSteps.length + i;
              return (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className={`relative z-10 px-5 py-1.5 text-[13px] font-medium transition-colors rounded-md border ${
                    visible
                      ? "bg-white border-black/15 text-black"
                      : "bg-white/50 border-black/[0.08] text-black/40"
                  }`}
                >
                  {label}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Stage cards */}
        <div className="grid grid-cols-5 gap-5 mt-4">
          {stages.map((label, i) => {
            const visible = activeStep >= flowSteps.length + i;
            const Card = stageCards[label];
            return (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
              >
                <Card />
              </motion.div>
            );
          })}
        </div>
      </div>
    </Slide>
  );
}
