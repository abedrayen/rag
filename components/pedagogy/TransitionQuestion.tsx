"use client";

import { motion } from "framer-motion";

type TransitionQuestionProps = {
  question: string;
  nextLevel?: string;
};

export default function TransitionQuestion({ question, nextLevel }: TransitionQuestionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-xl border border-amber-500/40 bg-amber-500/5 p-4"
    >
      <p className="text-sm font-semibold text-amber-400 mb-2">Humm</p>
      <p className="text-white font-medium">{question}</p>
      {nextLevel && <p className="text-xs text-textMuted mt-2">→ Unlock: {nextLevel}</p>}
    </motion.div>
  );
}
