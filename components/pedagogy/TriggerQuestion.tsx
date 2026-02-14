"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type TriggerQuestionProps = {
  question: string;
  onReveal?: () => void;
};

export default function TriggerQuestion({ question, onReveal }: TriggerQuestionProps) {
  const [revealed, setRevealed] = useState(false);

  const handleReveal = () => {
    setRevealed(true);
    onReveal?.();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-xl border border-accent/40 bg-accent/5 p-4"
    >
      <p className="text-sm font-semibold text-accentSecondary mb-2">Trigger question</p>
      <p className="text-white font-medium">{question}</p>
      {!revealed ? (
        <button
          onClick={handleReveal}
          className="mt-3 text-sm text-accent hover:underline"
        >
          Think, then reveal next step →
        </button>
      ) : null}
    </motion.div>
  );
}
