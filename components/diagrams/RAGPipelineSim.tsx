"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
  { id: "query", label: "Query", icon: "🔍" },
  { id: "embed", label: "Embed", icon: "📐" },
  { id: "retrieve", label: "Retrieve", icon: "🗄️" },
  { id: "rank", label: "Rank", icon: "📊" },
  { id: "inject", label: "Inject context", icon: "💉" },
  { id: "generate", label: "Generate", icon: "✨" },
];

export default function RAGPipelineSim() {
  const [clicked, setClicked] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <p className="text-textMuted text-sm">
        Click a step to simulate the flow. Retrieval is the heart of RAG.
      </p>
      <div className="flex flex-wrap items-center gap-2 md:gap-4">
        {STEPS.map((step, i) => (
          <div key={step.id} className="flex items-center gap-2">
            <motion.button
              onClick={() => setClicked(clicked === step.id ? null : step.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className={`glass rounded-xl px-4 py-3 flex items-center gap-2 transition-colors ${
                clicked === step.id ? "ring-2 ring-accent bg-accent/10" : ""
              }`}
            >
              <span>{step.icon}</span>
              <span className="text-sm font-medium">{step.label}</span>
            </motion.button>
            {i < STEPS.length - 1 && (
              <motion.span
                className="text-accent text-lg"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                →
              </motion.span>
            )}
          </div>
        ))}
      </div>
      <AnimatePresence>
        {clicked && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass rounded-xl p-4 text-sm text-textMuted"
          >
            <strong className="text-white">{STEPS.find((s) => s.id === clicked)?.label}:</strong>{" "}
            {clicked === "query" && "User question is received."}
            {clicked === "embed" && "Query is turned into a vector (same model as index)."}
            {clicked === "retrieve" && "Vector DB returns k nearest chunks (e.g. k=5)."}
            {clicked === "rank" && "Optional: rerank for relevance (e.g. cross-encoder)."}
            {clicked === "inject" && "Top chunks are pasted into the LLM prompt as context."}
            {clicked === "generate" && "LLM generates answer grounded in that context."}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
