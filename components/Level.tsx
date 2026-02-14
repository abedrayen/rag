"use client";

import { type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/context/ProgressContext";
import { LevelContextProvider } from "@/context/LevelContext";
import { LEVEL_TITLES } from "@/lib/constants";

type LevelProps = {
  levelNumber: number;
  children: ReactNode;
};

export default function Level({ levelNumber, children }: LevelProps) {
  const { isLevelUnlocked, isLevelCompleted } = useProgress();
  const unlocked = isLevelUnlocked(levelNumber);
  const completed = isLevelCompleted(levelNumber);
  const title = LEVEL_TITLES[levelNumber] ?? `Level ${levelNumber}`;

  return (
    <section
      id={`level-${levelNumber}`}
      className="min-h-screen py-24 px-6 md:px-12 flex flex-col justify-center relative z-10 scroll-mt-20"
    >
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <span className="text-accent font-mono text-sm">
            Level {levelNumber} {completed && "✓"}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mt-1">{title}</h2>
        </motion.div>

        <AnimatePresence mode="wait">
          {!unlocked ? (
            <motion.div
              key="locked"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative"
            >
              <div className="glass rounded-2xl p-12 text-center blur-sm pointer-events-none select-none">
                <div className="h-48 bg-white/5 rounded-xl mb-4" />
                <div className="h-4 bg-white/10 rounded w-3/4 mx-auto mb-2" />
                <div className="h-4 bg-white/5 rounded w-1/2 mx-auto" />
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-surface/80 backdrop-blur-sm">
                <span className="text-6xl mb-4">🔒</span>
                <p className="text-textMuted font-medium">
                  Complete Level {levelNumber - 1} to unlock
                </p>
                <p className="text-sm text-textMuted mt-1">
                  Level {levelNumber - 1} challenge required
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="unlocked"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <LevelContextProvider levelNumber={levelNumber}>
                {children}
              </LevelContextProvider>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
