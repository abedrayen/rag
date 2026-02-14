"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

type StepByStepProps = {
  steps: { title: string; content: ReactNode }[];
};

export default function StepByStep({ steps }: StepByStepProps) {
  const [current, setCurrent] = useState(0);
  const canNext = current < steps.length - 1;
  const canPrev = current > 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-mono text-textMuted">
          Step {current + 1} of {steps.length}
        </span>
        <div className="flex gap-1">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-colors ${i === current ? "bg-accent" : i < current ? "bg-accent/50" : "bg-white/20"}`}
              aria-label={`Go to step ${i + 1}`}
            />
          ))}
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -8 }}
          transition={{ duration: 0.2 }}
        >
          <h4 className="text-sm font-semibold text-accentSecondary mb-2">{steps[current].title}</h4>
          {steps[current].content}
        </motion.div>
      </AnimatePresence>
      <div className="flex gap-2 pt-2">
        {canPrev && (
          <button
            onClick={() => setCurrent((c) => c - 1)}
            className="px-3 py-1.5 rounded-lg text-sm border border-border hover:bg-white/5"
          >
            ← Previous
          </button>
        )}
        {canNext && (
          <button
            onClick={() => setCurrent((c) => c + 1)}
            className="px-3 py-1.5 rounded-lg text-sm bg-accent text-white hover:opacity-90"
          >
            Next step →
          </button>
        )}
      </div>
    </div>
  );
}
