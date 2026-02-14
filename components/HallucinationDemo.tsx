"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAKE_ANSWERS = [
  { q: "What's our company's founding year?", bad: "2012 (confidently wrong)", good: "Check your docs — I don't have access." },
  { q: "Who is the CTO?", bad: "Sarah Chen. (Source: my training data.)", good: "I don't have access to your org chart." },
  { q: "Latest product launch date?", bad: "March 15, 2024.", good: "I'd need to search your internal docs." },
];

export default function HallucinationDemo() {
  const [picked, setPicked] = useState<number | null>(null);
  const [showBad, setShowBad] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass rounded-2xl p-6"
    >
      <p className="text-sm text-textMuted mb-4">
        Click a question. Then choose: &quot;Vanilla LLM&quot; (might hallucinate) or &quot;With RAG/guardrails&quot; (refuses or retrieves).
      </p>
      <div className="space-y-2 mb-4">
        {FAKE_ANSWERS.map((a, i) => (
          <button
            key={i}
            onClick={() => setPicked(i)}
            className={`w-full text-left p-3 rounded-lg border text-sm transition-colors ${
              picked === i ? "border-accent bg-accent/10" : "border-border hover:border-accent/50"
            }`}
          >
            {a.q}
          </button>
        ))}
      </div>
      {picked !== null && (
        <div className="flex gap-4">
          <button
            onClick={() => setShowBad(true)}
            className="flex-1 p-3 rounded-lg border border-amber-500/50 bg-amber-500/10 text-amber-400 text-sm"
          >
            Vanilla LLM
          </button>
          <button
            onClick={() => setShowBad(false)}
            className="flex-1 p-3 rounded-lg border border-green-500/50 bg-green-500/10 text-green-400 text-sm"
          >
            With RAG / guardrails
          </button>
        </div>
      )}
      <AnimatePresence>
        {picked !== null && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-4 p-4 rounded-lg font-mono text-sm bg-black/30"
          >
            {showBad ? (
              <span className="text-amber-400">{FAKE_ANSWERS[picked].bad}</span>
            ) : (
              <span className="text-green-400">{FAKE_ANSWERS[picked].good}</span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
