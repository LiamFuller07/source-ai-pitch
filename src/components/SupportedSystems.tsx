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
  { name: "NetSuite", logo: "/logos/netsuite.svg", height: "h-[96px]" },
  { name: "SAP", logo: "/logos/sap.svg", height: "h-[66px]" },
  { name: "Dynamics 365", logo: "/logos/dynamics365.svg", height: "h-[72px]" },
  { name: "Sage", logo: "/logos/sage.svg", height: "h-[62px]" },
];

type Group = {
  category: string;
  Icon: LucideIcon;
  items: string[];
};

const sourceSystems: Group[] = [
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
      "Odoo Accounting",
      "Kashoo / Patriot",
      "+ many more",
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
      "JD Edwards / PeopleSoft",
      "Epicor (all versions)",
      "Infor (all versions)",
      "Baan / IFS / MAS 90",
      "+ many more",
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
      "Emails / PDFs / paper docs",
      "Legacy mainframes",
      "+ any other system",
      "+ many more",
    ],
  },
];

const integrations: Group[] = [
  {
    category: "CRM & Sales",
    Icon: Users,
    items: ["Salesforce", "HubSpot", "Pipedrive", "Zoho CRM", "Dynamics CRM", "Copper", "Close", "+ many more"],
  },
  {
    category: "Ecommerce",
    Icon: ShoppingCart,
    items: ["Shopify", "Amazon", "WooCommerce", "BigCommerce", "Magento", "Etsy", "eBay", "Walmart", "+ many more"],
  },
  {
    category: "Payments",
    Icon: CreditCard,
    items: ["Stripe", "PayPal", "Square", "Adyen", "Braintree", "Authorize.Net", "Worldpay", "GoCardless", "+ many more"],
  },
  {
    category: "Productivity",
    Icon: Briefcase,
    items: ["SharePoint", "Google Workspace", "Notion", "Asana", "Monday", "ClickUp", "Airtable", "Jira", "+ many more"],
  },
  {
    category: "Communication",
    Icon: MessageSquare,
    items: ["Slack", "Teams", "Zoom", "Intercom", "Discord", "Twilio", "RingCentral", "+ many more"],
  },
  {
    category: "Email & Marketing",
    Icon: Mail,
    items: ["Mailchimp", "Klaviyo", "SendGrid", "Marketo", "ActiveCampaign", "Iterable", "Constant Contact", "+ many more"],
  },
  {
    category: "Cloud & Storage",
    Icon: Cloud,
    items: ["AWS S3", "Dropbox", "Box", "Google Drive", "Azure Blob", "OneDrive", "Wasabi", "Backblaze", "+ many more"],
  },
  {
    category: "Analytics & BI",
    Icon: BarChart3,
    items: ["Looker", "Tableau", "Power BI", "Fivetran", "Snowflake", "BigQuery", "Metabase", "Segment", "+ many more"],
  },
];

export function SupportedSystems() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Slide
      ref={ref}
      bg="bg-[#f8f8f8]"
      className="flex flex-col px-[120px] py-[50px]"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-5"
      >
        <p className="text-[16px] font-mono uppercase tracking-[0.2em] text-black/30 mb-2">
          System Agnostic
        </p>
        <h2 className="text-[52px] font-semibold tracking-[-0.03em] text-black mb-2 leading-[1.05]">
          AI Supported Implementations
        </h2>
        <p className="text-[18px] text-black/50 max-w-[1200px] leading-relaxed">
          <span className="text-black font-medium">Any source system</span> → NetSuite, SAP, Dynamics 365, or Sage.
          Source handles the big four ERP targets out of the box, plus 100s of attached integrations.
        </p>
      </motion.div>

      {/* Target Systems — the Big Four */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-4"
      >
        <div className="flex items-center gap-3 mb-3">
          <p className="text-[13px] font-mono uppercase tracking-[0.15em] text-black/40 font-bold">
            Target Systems
          </p>
          <div className="flex-1 h-px bg-black/10" />
          <p className="text-[13px] font-mono uppercase tracking-[0.12em] text-black/35 font-medium">
            The Big Four
          </p>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {targetSystems.map((sys, i) => (
            <motion.div
              key={sys.name}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="bg-white border border-black/10 flex items-center justify-center h-[140px] px-6"
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

      {/* Unified Source + Integrations Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5 }}
        className="bg-white border border-black/10 p-6"
      >
        {/* Source Systems section */}
        <div className="flex items-center gap-3 mb-3">
          <p className="text-[13px] font-mono uppercase tracking-[0.15em] text-black/60 font-bold">
            Source Systems
          </p>
          <div className="flex-1 h-px bg-black/10" />
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-semibold tracking-[-0.01em] text-black/70">
              Anything
            </span>
            <ArrowRight size={14} strokeWidth={1.75} className="text-black/30" />
            <span className="text-[13px] font-semibold tracking-[-0.01em] text-black/70">
              the Big Four
            </span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-4">
          {sourceSystems.map((group, ci) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 + ci * 0.08 }}
              className="bg-black/[0.02] border border-black/8 p-4"
            >
              <div className="flex items-center gap-2.5 mb-3 pb-2.5 border-b border-black/10">
                <div className="w-9 h-9 bg-white border border-black/10 flex items-center justify-center shrink-0">
                  <group.Icon size={18} strokeWidth={1.75} className="text-black/75" />
                </div>
                <p className="text-[15px] font-semibold tracking-[-0.01em] text-black">
                  {group.category}
                </p>
              </div>
              <ul className="space-y-1">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="text-[14px] text-black/70 leading-tight flex items-start gap-2"
                  >
                    <span className="text-black/30 mt-[1px]">·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="relative my-3">
          <div className="h-px bg-black/10" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 flex items-center gap-2">
            <Boxes size={14} strokeWidth={1.75} className="text-black/40" />
            <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-black/40 font-bold">
              Plus 100s of Integrations
            </span>
          </div>
        </div>

        {/* Integrations section */}
        <div className="flex items-center gap-3 mb-3 mt-5">
          <p className="text-[13px] font-mono uppercase tracking-[0.15em] text-black/60 font-bold">
            Attached Integrations
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
              <div className="flex items-center gap-2 mb-1.5">
                <group.Icon size={14} strokeWidth={1.75} className="text-black/50" />
                <p className="text-[11px] font-mono uppercase tracking-[0.12em] text-black/55 font-bold">
                  {group.category}
                </p>
              </div>
              <div className="flex flex-wrap gap-1">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="text-[12px] font-mono text-black/75 bg-black/[0.04] border border-black/10 px-2 py-0.5"
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
