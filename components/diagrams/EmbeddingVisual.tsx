"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const WORDS = ["RAG", "retrieval", "documents", "vector", "embedding"];
const DIMS = 5;

export default function EmbeddingVisual() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setStep((s) => (s + 1) % (WORDS.length + 2)), 1500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="space-y-4">
      <p className="text-textMuted text-sm">
        Text → model → dense vector (embedding). Similar meaning ≈ close in space.
      </p>
      <div className="flex flex-wrap gap-4 items-end">
        {WORDS.map((word, i) => (
          <motion.div
            key={word}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: step >= 1 ? 1 : 0.3,
              scale: 1,
            }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-accentSecondary font-mono">{word}</span>
            <div className="flex gap-0.5">
              {Array.from({ length: DIMS }).map((_, j) => (
                <motion.div
                  key={j}
                  initial={{ height: 0 }}
                  animate={{
                    height: step >= 1 ? 8 + Math.sin((i + j) * 0.7) * 12 : 4,
                  }}
                  transition={{ delay: j * 0.05 }}
                  className="w-2 bg-accent rounded-full"
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: step >= 2 ? 1 : 0 }}
        className="text-xs text-accent"
      >
        ↑ Each bar = one dimension. Query embedding is compared to these (e.g. cosine similarity).
      </motion.p>
    </div>
  );
}
