"use client";

import { motion } from "framer-motion";
import { useProgress } from "@/context/ProgressContext";
import { TOTAL_LEVELS } from "@/lib/constants";

function scrollToLevel(n: number) {
  document.getElementById(`level-${n}`)?.scrollIntoView({ behavior: "smooth" });
}

export default function LevelProgressBar() {
  const { highestCompletedLevel, xp, isLevelUnlocked, isLevelCompleted, totalXPPossible } =
    useProgress();
  const progressPct = totalXPPossible > 0 ? (xp / totalXPPossible) * 100 : 0;

  return (
    <div className="flex items-center gap-4">
      <div className="hidden sm:flex items-center gap-1">
        {Array.from({ length: TOTAL_LEVELS }, (_, i) => i + 1).map((n) => {
          const unlocked = isLevelUnlocked(n);
          const completed = isLevelCompleted(n);
          return (
            <motion.button
              key={n}
              onClick={() => scrollToLevel(n)}
              whileHover={{ scale: unlocked ? 1.1 : 1 }}
              whileTap={{ scale: 0.95 }}
              className={`relative w-9 h-9 rounded-lg flex items-center justify-center text-sm font-mono transition-colors ${
                completed
                  ? "bg-green-500/20 text-green-400 ring-1 ring-green-500/50"
                  : unlocked
                  ? "bg-accent/20 text-accent hover:bg-accent/30"
                  : "bg-white/5 text-textMuted cursor-not-allowed"
              }`}
              title={unlocked ? `Level ${n}` : `Locked`}
            >
              {completed ? "✓" : n}
            </motion.button>
          );
        })}
      </div>
      <div className="flex items-center gap-2 min-w-[100px]">
        <div className="h-2 flex-1 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-accent to-accentSecondary"
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <span className="text-xs font-mono text-textMuted whitespace-nowrap">
          {xp}/{totalXPPossible} XP
        </span>
      </div>
    </div>
  );
}
