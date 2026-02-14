"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type ConceptBlock = {
  what?: string;
  why?: string;
  how?: string;
  limitations?: string;
  when?: string;
};

type ExplainablePanelProps = {
  title: string;
  concept: ConceptBlock;
  defaultOpen?: boolean;
};

const SECTIONS = [
  { key: "what" as const, label: "What is it?" },
  { key: "why" as const, label: "Why do we need it?" },
  { key: "how" as const, label: "How does it work?" },
  { key: "limitations" as const, label: "Limitations" },
  { key: "when" as const, label: "When to use it?" },
];

export default function ExplainablePanel({
  title,
  concept,
  defaultOpen = false,
}: ExplainablePanelProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-3 flex items-center justify-between bg-surfaceElevated/80 hover:bg-white/5 transition-colors text-left"
      >
        <span className="font-semibold text-accentSecondary">Explainable: {title}</span>
        <span className="text-textMuted">{open ? "▼" : "▶"}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-border"
          >
            <div className="p-4 space-y-4">
              {SECTIONS.map(({ key, label }) => {
                const value = concept[key];
                if (!value) return null;
                return (
                  <div key={key}>
                    <h4 className="text-xs font-semibold text-textMuted uppercase tracking-wider mb-1">
                      {label}
                    </h4>
                    <p className="text-sm text-white/90">{value}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
