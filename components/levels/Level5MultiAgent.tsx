"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useProgress } from "@/context/ProgressContext";
import { useLevelNumber } from "@/context/LevelContext";
import GlassCard from "@/components/GlassCard";
import AIJokeTooltip from "@/components/AIJokeTooltip";

const WORKFLOW = [
  { id: "planner", label: "Planner", desc: "Break task into steps", icon: "📋" },
  { id: "executor", label: "Executor", desc: "Run tools, get results", icon: "⚡" },
  { id: "reviewer", label: "Reviewer", desc: "Check output, approve or retry", icon: "✅" },
];

export default function Level5MultiAgent() {
  const { completeLevel, isLevelCompleted } = useProgress();
  const levelNumber = useLevelNumber();
  const completedRef = useRef(false);
  const [sequence, setSequence] = useState<string[]>([]);

  const nextExpected = WORKFLOW[sequence.length]?.id;
  const handleClick = (id: string) => {
    if (id !== nextExpected) return;
    const next = [...sequence, id];
    setSequence(next);
    if (next.length === WORKFLOW.length && !completedRef.current) {
      completedRef.current = true;
      completeLevel(levelNumber);
    }
  };

  return (
    <div className="space-y-10">
      <p className="text-textMuted">
        Multi-agent systems split roles: Planner, Executor, Reviewer.
        <AIJokeTooltip joke="Fewer meetings, same handoff confusion.">
          <span className="text-accent cursor-help border-b border-dotted border-accent"> Orchestration matters.</span>
        </AIJokeTooltip>
      </p>

      <div>
        <h3 className="text-lg font-semibold mb-4">Orchestration</h3>
        <GlassCard>
          <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
            {WORKFLOW.map((w) => (
              <div key={w.id} className="flex items-center gap-4">
                <motion.button
                  onClick={() => handleClick(w.id)}
                  disabled={nextExpected !== w.id}
                  whileHover={nextExpected === w.id ? { scale: 1.05 } : {}}
                  className={`glass rounded-xl p-5 text-center min-w-[140px] transition-all ${
                    sequence.includes(w.id)
                      ? "ring-2 ring-green-500/50 bg-green-500/10"
                      : nextExpected === w.id
                      ? "ring-2 ring-accent cursor-pointer"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  <span className="text-2xl block mb-2">{w.icon}</span>
                  <h4 className="font-bold text-accentSecondary">{w.label}</h4>
                  <p className="text-xs text-textMuted mt-1">{w.desc}</p>
                </motion.button>
                {w.id !== "reviewer" && <span className="text-accent text-xl hidden md:inline">→</span>}
              </div>
            ))}
          </div>
          <p className="text-sm text-textMuted mt-6 text-center">
            Click in order: Planner → Executor → Reviewer to complete the workflow and unlock Level 6.
          </p>
        </GlassCard>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Visual flow</h3>
        <GlassCard>
          <div className="flex flex-wrap justify-center gap-4 font-mono text-sm">
            <span className="text-accent">Query</span>
            <span>→</span>
            <span className="text-accentSecondary">Planner</span>
            <span>→</span>
            <span className="text-accentSecondary">Executor</span>
            <span>→</span>
            <span className="text-accentSecondary">Reviewer</span>
            <span>→</span>
            <span className="text-green-400">Output</span>
          </div>
        </GlassCard>
      </div>

      {isLevelCompleted(levelNumber) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-xl p-4 flex items-center gap-3 border border-green-500/30"
        >
          <span className="text-2xl">🎉</span>
          <div>
            <p className="font-semibold text-green-400">Level complete!</p>
            <p className="text-sm text-textMuted">Level 6 (Real Production System) is unlocked.</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
