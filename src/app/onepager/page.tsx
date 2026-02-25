import {
  User,
  Building2,
  Check,
  FileText,
  Search,
  MessageSquare,
  ClipboardCheck,
  Rocket,
  ShieldCheck,
  HeartHandshake,
  Lightbulb,
  Settings,
  Route,
  Clock,
  DollarSign,
  TrendingDown,
} from "lucide-react";

export default function OnePager() {
  return (
    <div className="w-[794px] min-h-[1123px] mx-auto bg-white print:bg-white">
      <style>{`
        @media print {
          @page { size: A4 portrait; margin: 0; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>

      <div className="px-10 py-8 flex flex-col gap-0" style={{ minHeight: '1123px' }}>

        {/* ── Header ── */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="text-[8px] font-mono uppercase tracking-[0.2em] text-black/30 mb-1">
              Partner Overview
            </p>
            <h1 className="text-[28px] font-bold tracking-[-0.03em] text-black leading-none mb-1.5">
              Source AI
            </h1>
            <p className="text-[11px] text-black/50 leading-relaxed max-w-[420px]">
              An AI engine that automates <span className="font-semibold text-black">80% of ERP migrations</span> — so your consultancy wins more deals, moves faster, and makes more money.
            </p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/source-logo.svg" alt="Source AI" className="h-[24px] w-auto mt-1 invert" />
        </div>

        {/* ── Separator ── */}
        <div className="border-t border-black/10 mb-4" />

        {/* ── Why Partner — 6 stats in 2 rows ── */}
        <div className="mb-4">
          <p className="text-[7px] font-mono uppercase tracking-[0.15em] text-black/30 mb-2">
            Why Partner
          </p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { stat: "50%+", label: "Project Margins", desc: "AI eliminates offshore teams, dramatically reducing delivery cost" },
              { stat: "Sub 21", label: "Day Migrations", desc: "Days not months — faster delivery with validated artifacts" },
              { stat: "Fixed", label: "Price Delivery", desc: "Win fixed-price deals with predictable AI execution costs" },
              { stat: "0", label: "New Hires", desc: "Scale your migration practice without recruiting" },
              { stat: "WIN", label: "On Price", desc: "Quote $8K–$15K vs competitors at $30K–$40K" },
              { stat: "Your", label: "Brand", desc: "White-label delivery under your logo and domain" },
            ].map((item) => (
              <div key={item.stat} className="border border-black/10 px-3 py-2.5">
                <p className="text-[20px] font-bold tracking-[-0.03em] text-black leading-none mb-0.5">
                  {item.stat}
                </p>
                <p className="text-[6px] font-mono uppercase tracking-[0.1em] text-black/30 mb-1.5">
                  {item.label}
                </p>
                <p className="text-[8px] text-black/50 leading-snug">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Separator ── */}
        <div className="border-t border-black/10 mb-4" />

        {/* ── Workflow ── */}
        <div className="mb-4">
          <p className="text-[7px] font-mono uppercase tracking-[0.15em] text-black/30 mb-2">
            10-Step Workflow
          </p>
          <div className="flex flex-col gap-1.5">
            {/* Row 1 */}
            <div className="flex items-center gap-0.5">
              {[
                { label: "Client Call & Notes", ai: false },
                { label: "Connect & Scan", ai: true },
                { label: "AI Questionnaire", ai: true },
                { label: "Draft BRD", ai: true },
                { label: "Consultant Review", ai: false },
              ].map((step, i, arr) => (
                <div key={step.label} className="flex items-center min-w-0 flex-1">
                  <div className="flex-1 bg-white border border-black/12 px-2 py-2 relative">
                    {step.ai && (
                      <span className="absolute top-0.5 right-1.5 text-[5px] font-mono font-bold text-black/20">AI</span>
                    )}
                    <p className="text-[8px] font-semibold text-black leading-tight">{step.label}</p>
                  </div>
                  {i < arr.length - 1 && <span className="shrink-0 px-0.5 text-[10px] text-black/20">→</span>}
                </div>
              ))}
            </div>
            {/* Row 2 */}
            <div className="flex items-center gap-0.5">
              {[
                { label: "Customer Sign-Off", ai: false },
                { label: "AI Migration", ai: true },
                { label: "Testing & QA", ai: true },
                { label: "Go-Live & Handover", ai: false },
                { label: "🎉 Happy Customer", ai: false, final: true },
              ].map((step, i, arr) => (
                <div key={step.label} className={`flex items-center min-w-0 ${"final" in step ? "flex-[0.8]" : "flex-1"}`}>
                  <div className={`flex-1 px-2 py-2 relative ${
                    "final" in step ? "bg-black text-white" : "bg-white border border-black/12 text-black"
                  }`}>
                    {step.ai && (
                      <span className="absolute top-0.5 right-1.5 text-[5px] font-mono font-bold text-black/20">AI</span>
                    )}
                    <p className={`text-[8px] font-semibold leading-tight ${"final" in step ? "text-white" : "text-black"}`}>
                      {step.label}
                    </p>
                  </div>
                  {i < arr.length - 1 && <span className="shrink-0 px-0.5 text-[10px] text-black/20">→</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Responsibility Cards ── */}
        <div className="grid grid-cols-[1.2fr_1fr_1fr] gap-1 mb-4">
          {/* Source AI */}
          <div className="bg-black text-white px-4 py-3.5">
            <p className="text-[12px] font-bold mb-0.5">Source AI</p>
            <p className="text-[6px] font-mono uppercase tracking-[0.1em] text-white/30 mb-2.5">
              Handled Autonomously — 85% of the work
            </p>
            <div className="space-y-1.5">
              {["System scanning & analysis", "Business logic inference", "BRD generation", "Migration planning", "Implementation & config", "Testing & validation"].map((item) => (
                <div key={item} className="flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-white/40 shrink-0" />
                  <span className="text-[9px] font-medium text-white">{item}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Consultant */}
          <div className="bg-white border border-black/10 px-4 py-3.5">
            <p className="text-[12px] font-bold text-black mb-0.5">Consultant</p>
            <p className="text-[6px] font-mono uppercase tracking-[0.1em] text-black/30 mb-2.5">
              Review & Confirm
            </p>
            <div className="space-y-1.5">
              {["Provides initial context", "Reviews Source AI outputs", "Delivers questions to end user", "Confirms BRD with end user", "Signs off on migration plan"].map((item) => (
                <div key={item} className="flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-black/30 shrink-0" />
                  <span className="text-[9px] text-black/70">{item}</span>
                </div>
              ))}
            </div>
          </div>
          {/* End User */}
          <div className="bg-white border border-black/10 px-4 py-3.5">
            <p className="text-[12px] font-bold text-black mb-0.5">End User</p>
            <p className="text-[6px] font-mono uppercase tracking-[0.1em] text-black/30 mb-2.5">
              Answer & Approve
            </p>
            <div className="space-y-1.5">
              {["Answers questionnaires", "Confirms business requirements", "Signs off on TO-BE state", "Accepts final migration"].map((item) => (
                <div key={item} className="flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-black/30 shrink-0" />
                  <span className="text-[9px] text-black/70">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Separator ── */}
        <div className="border-t border-black/10 mb-4" />

        {/* ── Case Study + Pricing side by side ── */}
        <div className="grid grid-cols-2 gap-4 flex-1">

          {/* Case Study */}
          <div>
            <p className="text-[7px] font-mono uppercase tracking-[0.15em] text-black/30 mb-2">
              Partner Case Study — Wild Tech
            </p>
            <div className="border border-black/10 p-4 mb-3">
              <p className="text-[10px] font-semibold text-black mb-2">
                QuickBooks → NetSuite &middot; Mid-market retail &middot; ~120 employees
              </p>
              <div className="grid grid-cols-3 gap-3 mb-3">
                <div>
                  <p className="text-[22px] font-bold tracking-[-0.03em] text-black leading-none">13</p>
                  <p className="text-[6px] font-mono uppercase tracking-[0.1em] text-black/30">days</p>
                </div>
                <div>
                  <p className="text-[22px] font-bold tracking-[-0.03em] text-black leading-none">€11K</p>
                  <p className="text-[6px] font-mono uppercase tracking-[0.1em] text-black/30">total cost</p>
                </div>
                <div>
                  <p className="text-[22px] font-bold tracking-[-0.03em] text-black leading-none">67%</p>
                  <p className="text-[6px] font-mono uppercase tracking-[0.1em] text-black/30">cost savings</p>
                </div>
              </div>
              <div className="bg-black/[0.03] border-t border-black/8 -mx-4 -mb-4 px-4 py-3">
                <p className="text-[8px] text-black/50 italic leading-relaxed">
                  &ldquo;We quoted €14K fixed-price and delivered in under three weeks. Our old model would have been €35K over four months with an offshore team. Source handled the technical execution — we kept the client relationship and made 50%+ margins.&rdquo;
                </p>
                <p className="text-[7px] font-semibold text-black/40 mt-1">
                  — Managing Director, Wild Tech
                </p>
              </div>
            </div>
          </div>

          {/* Pricing + Comparison */}
          <div>
            <p className="text-[7px] font-mono uppercase tracking-[0.15em] text-black/30 mb-2">
              Pricing — Simple Revenue Share
            </p>
            <div className="border border-black/10 mb-3">
              {/* Table header */}
              <div className="grid grid-cols-[1.2fr_1fr_1fr] border-b border-black/10">
                <div className="px-3 py-1.5" />
                <div className="px-3 py-1.5 border-l border-black/8">
                  <p className="text-[6px] font-mono uppercase tracking-[0.1em] text-black/35 font-medium">Traditional</p>
                </div>
                <div className="px-3 py-1.5 border-l border-black/8 bg-black/[0.03]">
                  <p className="text-[6px] font-mono uppercase tracking-[0.1em] text-black/70 font-medium">With Source AI</p>
                </div>
              </div>
              {/* Rows */}
              {[
                { label: "Timeline", old: "6–12+ months", src: "Sub 21 days" },
                { label: "Cost to Client", old: "$30K–$40K", src: "$8K–$15K" },
                { label: "BRD Revisions", old: "3–5 cycles", src: "AI-generated" },
                { label: "Scope Creep", old: "High", src: "Low — AI scan" },
                { label: "Pricing Model", old: "T&M", src: "Fixed price" },
              ].map((row) => (
                <div key={row.label} className="grid grid-cols-[1.2fr_1fr_1fr] border-b border-black/8 last:border-b-0">
                  <div className="px-3 py-1.5">
                    <p className="text-[8px] font-semibold text-black/80">{row.label}</p>
                  </div>
                  <div className="px-3 py-1.5 border-l border-black/8">
                    <p className="text-[8px] text-black/30 line-through">{row.old}</p>
                  </div>
                  <div className="px-3 py-1.5 border-l border-black/8 bg-black/[0.03]">
                    <p className="text-[8px] text-black font-semibold">{row.src}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Free first migration */}
            <div className="bg-black text-white px-4 py-3 flex items-center gap-3">
              <p className="text-[18px] font-bold leading-none">FREE</p>
              <div>
                <p className="text-[9px] font-semibold">Your first migration is free.</p>
                <p className="text-[7px] text-white/45">No cost, no commitment. See the results first.</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="border-t border-black/10 mt-4 pt-3 flex items-center justify-between">
          <p className="text-[7px] text-black/30">
            Source AI &middot; Confidential Partner Overview
          </p>
          <p className="text-[7px] text-black/30">
            sourceai.dev
          </p>
        </div>
      </div>
    </div>
  );
}
