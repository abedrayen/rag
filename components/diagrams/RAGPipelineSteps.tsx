"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
  { id: "query", label: "Query", color: "var(--color-llm)", why: "User question. This is what we need to ground with retrieved context." },
  { id: "embed", label: "Embedding", color: "var(--color-retrieval)", why: "Convert query to same vector space as documents. Same model as indexing." },
  { id: "vectordb", label: "Vector DB", color: "var(--color-retrieval)", why: "Nearest-neighbor search. Returns top-K most similar chunks." },
  { id: "topk", label: "Top-K", color: "var(--color-retrieval)", why: "K tuning: too small = miss context; too large = noise and context overflow." },
  { id: "llm", label: "LLM", color: "var(--color-llm)", why: "Context is injected into the prompt. Model generates answer grounded in that context." },
  { id: "answer", label: "Answer", color: "var(--color-llm)", why: "Final output. Quality depends on retrieval and prompt design." },
];

type RAGPipelineStepsProps = {
  variant?: "bad" | "optimized";
};

export default function RAGPipelineSteps({ variant = "optimized" }: RAGPipelineStepsProps) {
  const [current, setCurrent] = useState(0);
  const step = STEPS[current];
  const isBad = variant === "bad";

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center gap-1">
            <motion.button
              onClick={() => setCurrent(i)}
              whileHover={{ scale: 1.05 }}
              className="rounded-lg px-3 py-2 text-sm border transition-colors"
              style={{
                borderColor: current === i ? s.color : "var(--border)",
                background: current === i ? `${s.color}20` : "transparent",
              }}
            >
              {s.label}
            </motion.button>
            {i < STEPS.length - 1 && (
              <motion.span
                animate={{ opacity: [0.5, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-textMuted"
              >
                →
              </motion.span>
            )}
          </div>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={step.id}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -8 }}
          className="rounded-xl border border-border p-4 bg-surfaceElevated/50"
        >
          <h4 className="text-sm font-semibold mb-1" style={{ color: step.color }}>
            Why this step matters
          </h4>
          <p className="text-sm text-textMuted">{step.why}</p>
        </motion.div>
      </AnimatePresence>
      {isBad && (
        <p className="text-sm text-amber-400">
          Bad setup: large chunks, no reranking, K too high → context overflow and irrelevant context.
        </p>
      )}
    </div>
  );
}
