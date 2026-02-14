"use client";

import { useState } from "react";
import SectionWrapper from "../SectionWrapper";
import { motion, AnimatePresence } from "framer-motion";

const STAGES = [
  {
    id: "prompting",
    label: "Prompting",
    desc: "One-shot or few-shot. Fast, cheap, but no grounding.",
    emoji: "✍️",
  },
  {
    id: "rag",
    label: "RAG",
    desc: "Retrieve docs, inject context, then generate. Grounded in your data.",
    emoji: "📚",
  },
  {
    id: "agentic",
    label: "Agentic Systems",
    desc: "Reason, act (tools), observe, loop. Can plan and use tools.",
    emoji: "🤖",
  },
];

export default function Section2Evolution() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <SectionWrapper
      id="evolution"
      title="Evolution of AI Systems"
      subtitle="From static prompts to systems that think and act."
    >
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
        {STAGES.map((stage, i) => (
          <motion.button
            key={stage.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            onClick={() => setActive(active === stage.id ? null : stage.id)}
            className={`relative glass rounded-2xl p-6 md:p-8 text-left w-full md:max-w-[280px] transition-all ${
              active === stage.id
                ? "ring-2 ring-accent scale-[1.02]"
                : "hover:ring-1 hover:ring-accent/50"
            }`}
          >
            <span className="text-4xl mb-3 block">{stage.emoji}</span>
            <h3 className="text-xl font-bold mb-2">{stage.label}</h3>
            <p className="text-textMuted text-sm">{stage.desc}</p>
            {i < STAGES.length - 1 && (
              <motion.span
                className="hidden md:inline-block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 text-2xl text-accent"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                →
              </motion.span>
            )}
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-8 glass rounded-xl p-4 text-center text-textMuted text-sm"
          >
            {STAGES.find((s) => s.id === active)?.desc} Click a card to compare.
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
