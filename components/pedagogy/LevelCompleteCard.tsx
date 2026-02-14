"use client";

import { useLevelNumber } from "@/context/LevelContext";
import { TOTAL_LEVELS, LEVEL_TITLES } from "@/lib/constants";
import { motion } from "framer-motion";

type LevelCompleteCardProps = {
  message?: string;
};

export default function LevelCompleteCard({ message }: LevelCompleteCardProps) {
  const levelNumber = useLevelNumber();
  const nextLevel = levelNumber + 1;
  const hasNext = nextLevel <= TOTAL_LEVELS;
  const nextTitle = LEVEL_TITLES[nextLevel];

  const goToNext = () => {
    document.getElementById(`level-${nextLevel}`)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 border-2 border-green-500/40 bg-green-500/5"
    >
      <span className="text-3xl">✓</span>
      <div className="flex-1">
        <p className="font-semibold text-green-400">Level {levelNumber} complete</p>
        <p className="text-sm text-textMuted mt-0.5">
          {message ?? (hasNext ? `Level ${nextLevel} is now unlocked.` : "You've completed the journey.")}
        </p>
        {hasNext && nextTitle && (
          <p className="text-xs text-textMuted mt-1">Next: {nextTitle}</p>
        )}
      </div>
      {hasNext && (
        <button
          onClick={goToNext}
          className="shrink-0 px-4 py-2 rounded-lg bg-green-500/20 border border-green-500/50 text-green-400 text-sm font-medium hover:bg-green-500/30 transition-colors"
        >
          Continue to Level {nextLevel} →
        </button>
      )}
    </motion.div>
  );
}
