"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight,
  Calculator,
  Database,
  FileSpreadsheet,
  ShoppingCart,
  Users,
  CreditCard,
  MessageSquare,
  Briefcase,
  Mail,
  Cloud,
  BarChart3,
  Boxes,
  type LucideIcon,
} from "lucide-react";
import { Slide } from "./Slide";

const targetSystems = [
  { name: "NetSuite", logo: "/logos/netsuite.svg", height: "h-[80px]" },
  { name: "SAP", logo: "/logos/sap.svg", height: "h-[72px]" },
  { name: "Dynamics 365", logo: "/logos/dynamics365.svg", height: "h-[78px]" },
  { name: "Sage", logo: "/logos/sage.svg", height: "h-[68px]" },
];

type SystemGroup = {
  category: string;
  Icon: LucideIcon;
  items: string[];
};

const sourceSystems: SystemGroup[] = [
  {
    category: "Mid-Market Accounting",
    Icon: Calculator,
    items: [
      "QuickBooks (all versions)",
      "Xero",
      "MYOB / Reckon",
      "Sage 50 / 100 / 300",
      "FreshBooks / Wave",
      "Zoho Books",
    ],
  },
  {
    category: "Legacy ERP",
    Icon: Database,
    items: [
      "Dynamics GP / Great Plains",
      "Dynamics NAV / Navision",
      "SAP ECC / R/3",
      "Oracle E-Business Suite",
      "Epicor (all versions)",
      "Infor (all versions)",
    ],
  },
  {
    category: "Anything Else",
    Icon: FileSpreadsheet,
    items: [
      "Spreadsheets / Excel",
      "CSV / flat-file exports",
      "Custom / in-house systems",
      "Access databases",
      "SQL / database exports",
      "+ any other system",
    ],
  },
];

type IntegrationGroup = {
  category: string;
  Icon: LucideIcon;
  items: string[];
};

const integrations: IntegrationGroup[] = [
  {
    category: "CRM & Sales",
    Icon: Users,
    items: ["Salesforce", "HubSpot", "Pipedrive", "Zoho CRM"],
  },
  {
    category: "Ecommerce",
    Icon: ShoppingCart,
    items: ["Shopify", "Amazon", "WooCommerce", "BigCommerce", "Magento"],
  },
  {
    category: "Payments",
    Icon: CreditCard,
    items: ["Stripe", "PayPal", "Square", "Adyen", "Braintree"],
  },
  {
    category: "Productivity",
    Icon: Briefcase,
    items: ["SharePoint", "Google Workspace", "Notion", "Asana"],
  },
  {
    category: "Communication",
    Icon: MessageSquare,
    items: ["Slack", "Teams", "Zoom", "Intercom"],
  },
  {
    category: "Email & Marketing",
    Icon: Mail,
    items: ["Mailchimp", "Klaviyo", "SendGrid", "Marketo"],
  },
  {
    category: "Cloud & Storage",
    Icon: Cloud,
    items: ["AWS S3", "Dropbox", "Box", "Google Drive"],
  },
  {
    category: "Analytics & BI",
    Icon: BarChart3,
    items: ["Looker", "Tableau", "Power BI", "Fivetran"],
  },
];

export function SupportedSystems() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Slide
      ref={ref}
      bg="bg-[#f8f8f8]"
      className="flex flex-col px-[120px] py-[70px]"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <p className="text-[16px] font-mono uppercase tracking-[0.2em] text-black/30 mb-3">
          System Agnostic
        </p>
        <h2 className="text-[56px] font-semibold tracking-[-0.03em] text-black mb-3 leading-[1.05]">
          AI Supported Implementations
        </h2>
        <p className="text-[20px] text-black/50 max-w-[1200px] leading-relaxed">
          <span className="text-black font-medium">Any source system</span> → NetSuite, SAP, Dynamics 365, or Sage.
          Source handles the big four ERP targets out of the box, plus 100s of attached integrations.
        </p>
      </motion.div>

      {/* Target Systems — the Big Four */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <p className="text-[12px] font-mono uppercase tracking-[0.15em] text-black/40 font-bold">
            Target Systems
          </p>
          <div className="flex-1 h-px bg-black/10" />
          <p className="text-[12px] font-mono uppercase tracking-[0.12em] text-black/35 font-medium">
            The Big Four
          </p>
        </div>
        <div className="grid grid-cols-4 gap-5">
          {targetSystems.map((sys, i) => (
            <motion.div
              key={sys.name}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="bg-white border border-black/10 flex items-center justify-center h-[200px] px-8"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={sys.logo}
                alt={sys.name}
                className={`${sys.height} w-auto max-w-full object-contain`}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Source Systems */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5 }}
        className="mb-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <p className="text-[12px] font-mono uppercase tracking-[0.15em] text-black/40 font-bold">
            Source Systems
          </p>
          <div className="flex-1 h-px bg-black/10" />
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-semibold tracking-[-0.01em] text-black/80">
              Anything
            </span>
            <ArrowRight size={14} strokeWidth={1.75} className="text-black/30" />
            <span className="text-[13px] font-semibold tracking-[-0.01em] text-black/80">
              the Big Four
            </span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {sourceSystems.map((group, ci) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 + ci * 0.08 }}
              className="bg-white border border-black/10 p-5 flex flex-col"
            >
              <div className="flex items-center gap-2.5 mb-3 pb-3 border-b border-black/8">
                <div className="w-8 h-8 bg-black/[0.04] border border-black/10 flex items-center justify-center shrink-0">
                  <group.Icon size={16} strokeWidth={1.75} className="text-black/70" />
                </div>
                <p className="text-[13px] font-semibold tracking-[-0.01em] text-black">
                  {group.category}
                </p>
              </div>
              <ul className="space-y-1.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="text-[13px] font-mono text-black/60 leading-snug flex items-start gap-2"
                  >
                    <span className="text-black/25 mt-[2px]">·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Integrations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.75 }}
        className="bg-white border border-black/10 p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-black flex items-center justify-center shrink-0">
            <Boxes size={16} strokeWidth={1.75} className="text-white" />
          </div>
          <p className="text-[12px] font-mono uppercase tracking-[0.15em] text-black/60 font-bold">
            + 100s of Integrations
          </p>
          <div className="flex-1 h-px bg-black/10" />
          <p className="text-[12px] font-mono text-black/35">
            Any API, any data source, any direction
          </p>
        </div>
        <div className="grid grid-cols-4 gap-x-5 gap-y-3">
          {integrations.map((group, ci) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.85 + ci * 0.04 }}
            >
              <div className="flex items-center gap-1.5 mb-1.5">
                <group.Icon size={12} strokeWidth={1.75} className="text-black/40" />
                <p className="text-[10px] font-mono uppercase tracking-[0.12em] text-black/40 font-bold">
                  {group.category}
                </p>
              </div>
              <div className="flex flex-wrap gap-1">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="text-[11px] font-mono text-black/65 bg-black/[0.03] border border-black/8 px-2 py-0.5"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Slide>
  );
}
