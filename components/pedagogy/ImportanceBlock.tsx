"use client";

import { motion } from "framer-motion";

type ImportanceBlockProps = {
  title?: string;
  whyExists: string;
  problemSolved: string;
  riskReduced?: string;
  capabilityUnlocked?: string;
};

export default function ImportanceBlock({
  title = "Why this matters",
  whyExists,
  problemSolved,
  riskReduced,
  capabilityUnlocked,
}: ImportanceBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-xl border border-[var(--color-retrieval)]/40 bg-[var(--color-retrieval)]/5 p-4"
    >
      <h4 className="text-sm font-semibold text-[var(--color-retrieval)] mb-3">{title}</h4>
      <ul className="text-sm text-textMuted space-y-2">
        <li><strong className="text-white">Why does this exist?</strong> {whyExists}</li>
        <li><strong className="text-white">What problem does it solve?</strong> {problemSolved}</li>
        {riskReduced && <li><strong className="text-white">What risk does it reduce?</strong> {riskReduced}</li>}
        {capabilityUnlocked && <li><strong className="text-white">What new capability?</strong> {capabilityUnlocked}</li>}
      </ul>
    </motion.div>
  );
}
