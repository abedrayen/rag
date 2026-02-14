"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINES = [
  { text: "> query: \"What's our Q4 revenue?\"", type: "input" },
  { text: "Thinking... (no private data, no tools)", type: "system" },
  { text: "I don't have access to your company data.", type: "output" },
  { text: "> query: \"Who is the CEO?\"", type: "input" },
  { text: "Hallucinating in 3... 2... 1...", type: "system" },
  { text: "The CEO is John Smith. (Source: I made it up)", type: "output", highlight: true },
];

export default function ConsoleTerminal() {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setVisible((v) => (v < LINES.length - 1 ? v + 1 : 0));
    }, 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="code-block p-6 rounded-xl font-mono text-sm overflow-hidden"
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="w-3 h-3 rounded-full bg-red-500/80" />
        <span className="w-3 h-3 rounded-full bg-amber-500/80" />
        <span className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="text-textMuted ml-2 text-xs">LLM without RAG/Agents</span>
      </div>
      <div className="space-y-1 min-h-[180px]">
        <AnimatePresence mode="wait">
          {LINES.slice(0, visible + 1).map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={
                line.type === "input"
                  ? "text-accentSecondary"
                  : line.type === "system"
                  ? "text-amber-400/80 italic"
                  : line.highlight
                  ? "text-red-400 bg-red-500/10 rounded px-1"
                  : "text-textMuted"
              }
            >
              {line.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
