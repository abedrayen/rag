"use client";

import SectionWrapper from "../SectionWrapper";
import GlassCard from "../GlassCard";
import { motion } from "framer-motion";

const MISTAKES = [
  {
    title: "No evals",
    desc: "Shipping RAG/agents without relevance and answer quality metrics. You'll regress without knowing.",
  },
  {
    title: "Ignoring latency",
    desc: "Sequential retrieval + LLM + tool calls add up. Set SLOs and optimize (caching, parallel calls).",
  },
  {
    title: "Trusting retrieval blindly",
    desc: "Always validate that retrieved chunks actually support the answer. Hallucination can persist.",
  },
  {
    title: "Unbounded agent loops",
    desc: "Max steps and timeouts are mandatory. Otherwise one bad tool can burn budget and hang.",
  },
  {
    title: "No guardrails",
    desc: "Agents can call wrong tools or leak context. Validate inputs/outputs and scope tool access.",
  },
];

export default function Section7ProductionMistakes() {
  return (
    <SectionWrapper
      id="production-mistakes"
      title="Common production mistakes"
      subtitle="Things that will bite you after the demo works."
    >
      <div className="grid md:grid-cols-2 gap-4">
        {MISTAKES.map((m, i) => (
          <motion.div
            key={m.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <GlassCard delay={0}>
              <h4 className="font-semibold text-amber-400 mb-2">⚠ {m.title}</h4>
              <p className="text-textMuted text-sm">{m.desc}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
