"use client";

import { motion } from "framer-motion";

type LimitationBlockProps = {
  title?: string;
  scenarios: string[];
  triggerQuestion?: string;
};

export default function LimitationBlock({
  title = "Limitation",
  scenarios,
  triggerQuestion,
}: LimitationBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-xl border border-amber-500/40 bg-amber-500/5 p-4"
    >
      <h4 className="text-sm font-semibold text-amber-400 mb-3">{title}</h4>
      <ul className="text-sm text-textMuted space-y-1">
        {scenarios.map((s, i) => (
          <li key={i}>• {s}</li>
        ))}
      </ul>
      {triggerQuestion && (
        <p className="mt-3 text-sm font-medium text-white">{triggerQuestion}</p>
      )}
    </motion.div>
  );
}
