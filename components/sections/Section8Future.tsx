"use client";

import SectionWrapper from "../SectionWrapper";
import { motion } from "framer-motion";

const TRENDS = [
  "RAG + agents as the default stack for enterprise AI",
  "Better reasoning models and tool use natively in base models",
  "Multimodal RAG (images, tables, code) and multi-vector strategies",
  "Stronger evals and guardrails as products",
  "Agents that collaborate (multi-agent) with clearer handoffs",
];

export default function Section8Future() {
  return (
    <SectionWrapper
      id="future"
      title="Future of AI systems"
      subtitle="Where this is heading (and why it matters for your stack)."
    >
      <div className="space-y-6 max-w-3xl">
        {TRENDS.map((t, i) => (
          <motion.div
            key={t}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-xl p-4 flex items-start gap-3"
          >
            <span className="text-accent font-mono text-sm">{String(i + 1).padStart(2, "0")}</span>
            <p className="text-textMuted">{t}</p>
          </motion.div>
        ))}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-lg gradient-text font-semibold mt-12"
        >
          Build with RAG first; add agents when you need tools and multi-step reasoning.
        </motion.p>
      </div>
    </SectionWrapper>
  );
}
