"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type QuizOption = { label: string; correct: boolean; explanation: string };

type QuizCardProps = {
  question: string;
  options: QuizOption[];
  onCorrect?: () => void;
};

export default function QuizCard({ question, options, onCorrect }: QuizCardProps) {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (i: number) => {
    setSelected(i);
    if (options[i].correct && onCorrect) onCorrect();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass rounded-2xl p-6 md:p-8"
    >
      <p className="text-xl font-semibold mb-6">{question}</p>
      <div className="space-y-3">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            className={`w-full text-left p-4 rounded-xl border transition-colors ${
              selected === null
                ? "border-border hover:border-accent/50 hover:bg-accent/5"
                : opt.correct
                ? "border-green-500/50 bg-green-500/10"
                : selected === i
                ? "border-red-500/50 bg-red-500/10"
                : "border-border opacity-60"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <AnimatePresence>
        {selected !== null && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-4 text-textMuted text-sm"
          >
            {options[selected].explanation}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
