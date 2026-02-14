"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Option = { label: string; correct: boolean; feedback: string };

type ComprehensionCheckProps = {
  question: string;
  options: Option[];
  onCorrect?: () => void;
};

export default function ComprehensionCheck({
  question,
  options,
  onCorrect,
}: ComprehensionCheckProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const handleSelect = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    if (options[i].correct) {
      setDone(true);
      onCorrect?.();
    }
  };

  return (
    <div className="glass rounded-xl p-6 mt-8">
      <p className="text-sm font-semibold text-accentSecondary mb-2">Comprehension check</p>
      <p className="font-medium mb-4">{question}</p>
      <div className="space-y-2">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            disabled={selected !== null}
            className={`w-full text-left p-3 rounded-lg border text-sm transition-colors ${
              selected === null
                ? "border-border hover:border-accent/50"
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-3 text-sm text-textMuted"
          >
            {options[selected].feedback}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
