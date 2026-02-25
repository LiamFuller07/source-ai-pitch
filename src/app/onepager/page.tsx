export default function OnePager() {
  return (
    <div className="w-[794px] h-[1123px] mx-auto bg-white print:bg-white overflow-hidden">
      <style>{`
        @media print {
          @page { size: A4 portrait; margin: 0; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>

      <div className="px-10 py-7 h-full flex flex-col">

        {/* ═══ HEADER ═══ */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-[26px] font-bold tracking-[-0.03em] text-black leading-none mb-1">
              Source AI
            </h1>
            <p className="text-[10px] text-black/50 leading-relaxed max-w-[400px]">
              An AI engine that automates <span className="font-semibold text-black">80% of ERP migrations</span> — so your consultancy wins more deals, moves faster, and makes more money.
            </p>
          </div>
          <p className="text-[8px] font-mono uppercase tracking-[0.15em] text-black/25 mt-1">Partner Overview</p>
        </div>

        {/* ═══ THE PROBLEM → THE SOLUTION ═══ */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          {/* Problem */}
          <div className="border border-black/10 px-4 py-3">
            <p className="text-[6px] font-mono uppercase tracking-[0.15em] text-black/30 mb-1">The Problem</p>
            <p className="text-[11px] font-bold text-black mb-1.5">How Migrations Work Today</p>
            <div className="flex flex-wrap gap-1 mb-2">
              {["End Client", "Sales & Scoping", "Solutions Architecture", "Resource & Team Build", "Implementation", "Go-Live"].map((s, i) => (
                <span key={s} className="text-[7px] bg-black/[0.04] border border-black/8 px-1.5 py-0.5 text-black/60">
                  {i + 1}. {s}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-[3px] bg-black/10 relative">
                <div className="absolute inset-y-0 left-0 w-full bg-black/25" />
              </div>
              <p className="text-[8px] font-mono font-bold text-black/50 whitespace-nowrap">2–6+ months</p>
            </div>
          </div>

          {/* Solution */}
          <div className="bg-black text-white px-4 py-3">
            <p className="text-[6px] font-mono uppercase tracking-[0.15em] text-white/30 mb-1">The Solution</p>
            <p className="text-[11px] font-bold text-white mb-1.5">Source AI Replaces the Delivery Chain</p>
            <div className="flex items-center gap-1.5 mb-2">
              {["End Client", "Your Consultant", "Source AI Engine", "Live System"].map((s, i, arr) => (
                <div key={s} className="flex items-center gap-1.5">
                  <span className="text-[7px] font-medium text-white/80 bg-white/10 px-1.5 py-0.5">{s}</span>
                  {i < arr.length - 1 && <span className="text-[8px] text-white/25">→</span>}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-[3px] bg-white/10 relative">
                <div className="absolute inset-y-0 left-0 bg-white/60" style={{ width: '15%' }} />
              </div>
              <p className="text-[8px] font-mono font-bold text-white/70 whitespace-nowrap">Sub 21 days</p>
            </div>
          </div>
        </div>

        {/* ═══ WORKFLOW ═══ */}
        <div className="mb-3">
          <p className="text-[6px] font-mono uppercase tracking-[0.15em] text-black/30 mb-1.5">
            10-Step Workflow
          </p>
          <div className="flex flex-col gap-1">
            {[
              [
                { label: "Client Call & Notes", ai: false },
                { label: "Connect & Scan", ai: true },
                { label: "AI Questionnaire", ai: true },
                { label: "Draft BRD", ai: true },
                { label: "Consultant Review", ai: false },
              ],
              [
                { label: "Customer Sign-Off", ai: false },
                { label: "AI Migration", ai: true },
                { label: "Testing & QA", ai: true },
                { label: "Go-Live & Handover", ai: false },
                { label: "🎉 Happy Customer", ai: false, final: true },
              ],
            ].map((row, ri) => (
              <div key={ri} className="flex items-center gap-0.5">
                {row.map((step, i, arr) => (
                  <div key={step.label} className={`flex items-center min-w-0 ${"final" in step ? "flex-[0.7]" : "flex-1"}`}>
                    <div className={`flex-1 px-2 py-1.5 relative ${
                      "final" in step ? "bg-black text-white" : "bg-white border border-black/10"
                    }`}>
                      {step.ai && <span className="absolute top-0.5 right-1 text-[5px] font-mono font-bold text-black/15">AI</span>}
                      <p className={`text-[7px] font-semibold leading-tight ${"final" in step ? "text-white" : "text-black"}`}>{step.label}</p>
                    </div>
                    {i < arr.length - 1 && <span className="shrink-0 px-0.5 text-[8px] text-black/15">→</span>}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ═══ RESPONSIBILITY MATRIX ═══ */}
        <div className="grid grid-cols-[1.3fr_1fr_1fr] gap-1 mb-3">
          <div className="bg-black text-white px-3.5 py-2.5">
            <p className="text-[10px] font-bold mb-0.5">Source AI</p>
            <p className="text-[5px] font-mono uppercase tracking-[0.1em] text-white/25 mb-2">Autonomous — 85% of the work</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              {["System scanning & analysis", "Business logic inference", "BRD generation", "Migration planning", "Implementation & config", "Testing & validation"].map((item) => (
                <div key={item} className="flex items-center gap-1">
                  <div className="w-0.5 h-0.5 rounded-full bg-white/40 shrink-0" />
                  <span className="text-[7px] font-medium text-white">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="border border-black/10 px-3.5 py-2.5">
            <p className="text-[10px] font-bold text-black mb-0.5">Consultant</p>
            <p className="text-[5px] font-mono uppercase tracking-[0.1em] text-black/25 mb-2">Review & Confirm</p>
            <div className="space-y-1">
              {["Provides initial context", "Reviews AI outputs", "Delivers questions to end user", "Confirms BRD", "Signs off on migration plan"].map((item) => (
                <div key={item} className="flex items-center gap-1">
                  <div className="w-0.5 h-0.5 rounded-full bg-black/25 shrink-0" />
                  <span className="text-[7px] text-black/60">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="border border-black/10 px-3.5 py-2.5">
            <p className="text-[10px] font-bold text-black mb-0.5">End User</p>
            <p className="text-[5px] font-mono uppercase tracking-[0.1em] text-black/25 mb-2">Answer & Approve</p>
            <div className="space-y-1">
              {["Answers questionnaires", "Confirms requirements", "Signs off on TO-BE state", "Accepts final migration"].map((item) => (
                <div key={item} className="flex items-center gap-1">
                  <div className="w-0.5 h-0.5 rounded-full bg-black/25 shrink-0" />
                  <span className="text-[7px] text-black/60">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══ SEPARATOR ═══ */}
        <div className="border-t border-black/8 mb-3" />

        {/* ═══ CASE STUDY + WHY PARTNER ═══ */}
        <div className="grid grid-cols-[1fr_1.1fr] gap-4 mb-3">

          {/* Case Study */}
          <div>
            <p className="text-[6px] font-mono uppercase tracking-[0.15em] text-black/30 mb-1.5">
              Case Study — Wild Tech
            </p>
            <div className="border border-black/10 px-3.5 py-3 mb-2">
              <p className="text-[8px] font-semibold text-black mb-2">
                QuickBooks → NetSuite · Mid-market retail · ~120 employees
              </p>
              <div className="grid grid-cols-3 gap-2 mb-2.5">
                {[
                  { val: "13", unit: "days", label: "Migration" },
                  { val: "€11K", unit: "", label: "Total Cost" },
                  { val: "67%", unit: "", label: "Savings" },
                ].map((m) => (
                  <div key={m.label}>
                    <p className="text-[18px] font-bold tracking-[-0.03em] text-black leading-none">
                      {m.val}<span className="text-[10px] font-light text-black/30">{m.unit ? ` ${m.unit}` : ""}</span>
                    </p>
                    <p className="text-[5px] font-mono uppercase tracking-[0.1em] text-black/30">{m.label}</p>
                  </div>
                ))}
              </div>
              <div className="bg-black/[0.03] border-t border-black/8 -mx-3.5 -mb-3 px-3.5 py-2.5">
                <p className="text-[7px] text-black/45 italic leading-relaxed">
                  &ldquo;We quoted €14K fixed-price and delivered in under three weeks. Our old model would have been €35K over four months. Source handled the technical execution — we kept the client relationship and made 50%+ margins.&rdquo;
                </p>
                <p className="text-[6px] font-semibold text-black/35 mt-1">— Managing Director, Wild Tech</p>
              </div>
            </div>
          </div>

          {/* Why Partner */}
          <div>
            <p className="text-[6px] font-mono uppercase tracking-[0.15em] text-black/30 mb-1.5">
              Why Partner
            </p>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { stat: "50%+", label: "Margins", desc: "AI eliminates offshore cost" },
                { stat: "Sub 21", label: "Days", desc: "Not months for delivery" },
                { stat: "Fixed", label: "Price", desc: "Predictable execution costs" },
                { stat: "0", label: "Hires", desc: "Scale without recruiting" },
                { stat: "WIN", label: "On Price", desc: "$8K–$15K vs $30K–$40K" },
                { stat: "Your", label: "Brand", desc: "White-label delivery" },
              ].map((item) => (
                <div key={item.stat} className="border border-black/10 px-2 py-2">
                  <p className="text-[14px] font-bold tracking-[-0.02em] text-black leading-none mb-0.5">
                    {item.stat}
                  </p>
                  <p className="text-[5px] font-mono uppercase tracking-[0.08em] text-black/25 mb-1">
                    {item.label}
                  </p>
                  <p className="text-[6.5px] text-black/45 leading-snug">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══ SUPPORTED SYSTEMS + PRICING ═══ */}
        <div className="grid grid-cols-[1fr_1.1fr] gap-4 mb-3">

          {/* Supported Systems */}
          <div>
            <p className="text-[6px] font-mono uppercase tracking-[0.15em] text-black/30 mb-1.5">
              AI Supported Migrations
            </p>
            <div className="space-y-1 mb-1.5">
              {[
                { from: "QuickBooks", to: "NetSuite", bi: true },
                { from: "Xero", to: "NetSuite", bi: false },
                { from: "QuickBooks", to: "Dynamics 365", bi: false },
              ].map((path) => (
                <div key={`${path.from}-${path.to}`} className="flex items-center gap-2 border border-black/8 px-2.5 py-1.5">
                  <span className="text-[8px] font-semibold text-black">{path.from}</span>
                  <span className="text-[8px] text-black/20">{path.bi ? "↔" : "→"}</span>
                  <span className="text-[8px] font-semibold text-black">{path.to}</span>
                  <span className="text-[6px] text-black/25 ml-auto">+ 100s integrations</span>
                </div>
              ))}
            </div>
            <p className="text-[6px] text-black/30">
              Coming soon: MYOB, Acumatica, Freshbooks, Zoho Books, DEAR, Reckon, Wave, Custom ERPs
            </p>
          </div>

          {/* Pricing */}
          <div>
            <p className="text-[6px] font-mono uppercase tracking-[0.15em] text-black/30 mb-1.5">
              Pricing — Simple Revenue Share
            </p>
            <div className="border border-black/10 mb-1.5">
              <div className="grid grid-cols-[1.2fr_1fr_1fr] border-b border-black/8">
                <div className="px-2 py-1" />
                <div className="px-2 py-1 border-l border-black/8">
                  <p className="text-[5px] font-mono uppercase tracking-[0.08em] text-black/30 font-medium">Traditional</p>
                </div>
                <div className="px-2 py-1 border-l border-black/8 bg-black/[0.03]">
                  <p className="text-[5px] font-mono uppercase tracking-[0.08em] text-black/60 font-medium">With Source</p>
                </div>
              </div>
              {[
                { label: "Timeline", old: "6–12+ months", src: "Sub 21 days" },
                { label: "Cost", old: "$30K–$40K", src: "$8K–$15K" },
                { label: "BRD", old: "3–5 cycles", src: "AI-generated" },
                { label: "Scope Creep", old: "High", src: "Low — AI scan" },
                { label: "Model", old: "T&M", src: "Fixed price" },
              ].map((row) => (
                <div key={row.label} className="grid grid-cols-[1.2fr_1fr_1fr] border-b border-black/[0.05] last:border-b-0">
                  <div className="px-2 py-1"><p className="text-[7px] font-semibold text-black/70">{row.label}</p></div>
                  <div className="px-2 py-1 border-l border-black/8"><p className="text-[7px] text-black/25 line-through">{row.old}</p></div>
                  <div className="px-2 py-1 border-l border-black/8 bg-black/[0.03]"><p className="text-[7px] text-black font-semibold">{row.src}</p></div>
                </div>
              ))}
            </div>
            <div className="bg-black text-white px-3 py-2 flex items-center gap-3">
              <p className="text-[14px] font-bold leading-none">FREE</p>
              <div>
                <p className="text-[8px] font-semibold">Your first migration is free.</p>
                <p className="text-[6px] text-white/40">No cost, no commitment.</p>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ TEAM + FOOTER ═══ */}
        <div className="mt-auto border-t border-black/8 pt-2.5 flex items-center justify-between">
          <div>
            <p className="text-[6px] font-mono uppercase tracking-[0.15em] text-black/25 mb-1">The Team</p>
            <div className="flex items-center gap-3">
              {[
                { name: "Liam Fuller", role: "CEO" },
                { name: "Yoan Gabison", role: "CTO" },
                { name: "Shane Fuller", role: "Founding Eng" },
                { name: "Brian Kelleher", role: "AI Eng" },
                { name: "Jiri Pucs", role: "AI Eng" },
              ].map((m) => (
                <div key={m.name} className="flex items-center gap-1">
                  <div className="w-4 h-4 rounded-full bg-black/[0.06] flex items-center justify-center">
                    <span className="text-[5px] font-semibold text-black/25">
                      {m.name.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <p className="text-[6px] font-semibold text-black leading-none">{m.name}</p>
                    <p className="text-[5px] text-black/30">{m.role}</p>
                  </div>
                </div>
              ))}
              <span className="text-[6px] text-black/25">+ 3 consultants, 10+ extended</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[7px] font-semibold text-black">sourceai.dev</p>
            <p className="text-[5px] text-black/25">Confidential</p>
          </div>
        </div>
      </div>
    </div>
  );
}
