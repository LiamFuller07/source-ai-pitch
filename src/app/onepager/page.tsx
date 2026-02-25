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
  type LucideIcon,
} from "lucide-react";

const flowSteps = [
  { owner: "consultant", label: "Client Call & Notes", icon: FileText },
  { owner: "source", label: "Connect & Scan", icon: Search },
  { owner: "source", label: "AI Questionnaire", icon: MessageSquare },
  { owner: "source", label: "Draft BRD", icon: FileText },
  { owner: "consultant", label: "Consultant Review", icon: ClipboardCheck },
  { owner: "customer", label: "Customer Sign-Off", icon: Check },
  { owner: "source", label: "AI Migration", icon: Rocket },
  { owner: "source", label: "Testing & QA", icon: ShieldCheck },
  { owner: "consultant", label: "Go-Live & Handover", icon: HeartHandshake },
  { owner: "customer", label: "Happy Customer", icon: null, emoji: "🎉" },
];

const sourceItems = [
  "System scanning & analysis",
  "Business logic inference",
  "BRD generation",
  "Migration planning",
  "Implementation & config",
  "Testing & validation",
];

const consultantItems = [
  "Provides initial context",
  "Reviews Source AI outputs",
  "Delivers questions to end user",
  "Confirms BRD with end user",
  "Signs off on migration plan",
];

const endUserItems = [
  "Answers questionnaires",
  "Confirms business requirements",
  "Signs off on TO-BE state",
  "Accepts final migration",
];

const flowRow1 = flowSteps.slice(0, 5);
const flowRow2 = flowSteps.slice(5);

function StepRow({ steps }: { steps: typeof flowSteps }) {
  return (
    <div className="flex items-center gap-1">
      {steps.map((step, i) => {
        const isAI = step.owner === "source";
        const isLast = i === steps.length - 1;
        const isFinal = step.emoji;
        return (
          <div key={step.label} className="flex items-center min-w-0 flex-1">
            <div
              className={`flex-1 min-w-0 px-3 py-3 relative ${
                isFinal
                  ? "bg-black text-white"
                  : "bg-white border border-black/15 text-black"
              }`}
            >
              {isAI && (
                <span
                  className={`absolute top-1 right-2 text-[7px] font-mono font-bold tracking-wider ${
                    isFinal ? "text-white/30" : "text-black/20"
                  }`}
                >
                  AI
                </span>
              )}
              <div className="flex items-center gap-2">
                {step.emoji ? (
                  <span className="text-[12px]">{step.emoji}</span>
                ) : step.icon ? (
                  <step.icon
                    size={12}
                    className={isFinal ? "text-white/50" : "text-black/25"}
                  />
                ) : null}
                <p
                  className={`text-[11px] font-semibold leading-tight ${
                    isFinal ? "text-white" : "text-black"
                  }`}
                >
                  {step.label}
                </p>
              </div>
            </div>
            {!isLast && (
              <span className="shrink-0 px-1 text-[14px] text-black/20">→</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function OnePager() {
  return (
    <div className="w-[1120px] mx-auto bg-[#f8f8f8] print:bg-[#f8f8f8]">
      <style>{`
        @media print {
          @page { size: A4 landscape; margin: 0; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>

      <div className="px-16 py-10">
        {/* Header */}
        <div className="mb-5">
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-black/30 mb-1">
            Responsibility Matrix
          </p>
          <h1 className="text-[32px] font-semibold tracking-[-0.03em] text-black mb-1">
            Who Does What
          </h1>
          <p className="text-[14px] text-black/45 leading-relaxed">
            <span className="font-semibold text-black">Source AI</span> does the
            technical execution end-to-end.{" "}
            <span className="font-semibold text-black">The consultant</span>{" "}
            keeps the client relationship and commercial ownership.
          </p>
        </div>

        {/* Workflow label */}
        <p className="text-[8px] font-mono uppercase tracking-[0.18em] text-black/25 mb-2">
          Workflow
        </p>

        {/* Workflow rows */}
        <div className="flex flex-col gap-2 mb-5">
          <StepRow steps={flowRow1} />
          <StepRow steps={flowRow2} />
        </div>

        {/* Separator */}
        <div className="border-t border-black/10 my-5" />

        {/* Responsibility cards */}
        <div className="grid grid-cols-[1.2fr_1fr_1fr] gap-1">
          {/* Source AI */}
          <div className="bg-black text-white px-6 py-5">
            <p className="text-[16px] font-bold tracking-[-0.02em] mb-0.5">
              Source AI
            </p>
            <p className="text-[8px] font-mono uppercase tracking-[0.12em] text-white/25 mb-4">
              Handled Autonomously — 85% of the work
            </p>
            <div className="space-y-3">
              {sourceItems.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-white/40 shrink-0" />
                  <span className="text-[12px] font-medium text-white leading-snug">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Consultant */}
          <div className="bg-white border border-black/10 px-6 py-5">
            <div className="flex items-center gap-2 mb-0.5">
              <User size={14} className="text-black/30" />
              <p className="text-[15px] font-bold tracking-[-0.01em] text-black">
                Consultant
              </p>
            </div>
            <p className="text-[8px] font-mono uppercase tracking-[0.12em] text-black/25 mb-4">
              Review & Confirm
            </p>
            <div className="space-y-3">
              {consultantItems.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-black/30 shrink-0" />
                  <span className="text-[12px] text-black/70 leading-snug">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* End User */}
          <div className="bg-white border border-black/10 px-6 py-5">
            <div className="flex items-center gap-2 mb-0.5">
              <Building2 size={14} className="text-black/30" />
              <p className="text-[15px] font-bold tracking-[-0.01em] text-black">
                End User
              </p>
            </div>
            <p className="text-[8px] font-mono uppercase tracking-[0.12em] text-black/25 mb-4">
              Answer & Approve
            </p>
            <div className="space-y-3">
              {endUserItems.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-black/30 shrink-0" />
                  <span className="text-[12px] text-black/70 leading-snug">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
