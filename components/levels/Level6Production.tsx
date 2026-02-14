"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useProgress } from "@/context/ProgressContext";
import { useLevelNumber } from "@/context/LevelContext";
import GlassCard from "@/components/GlassCard";
import AIJokeTooltip from "@/components/AIJokeTooltip";

const STAGES = [
  { id: "email", label: "Email input", out: "Raw email: 'Need React dev, 3 months'", icon: "📧" },
  { id: "intent", label: "Intent extraction", out: "Intent: hire React dev, 3 months", icon: "🎯" },
  { id: "rag", label: "RAG: freelancer profiles", out: "Top 5 candidates (vector search)", icon: "📚" },
  { id: "agent", label: "Agent: decide best fit", out: "Ranking + reasoning → pick one", icon: "🤖" },
  { id: "output", label: "Structured output", out: "JSON: assignee, start date, scope", icon: "📋" },
];

export default function Level6Production() {
  const { completeLevel, isLevelCompleted } = useProgress();
  const levelNumber = useLevelNumber();
  const completedRef = useRef(false);
  const [clicked, setClicked] = useState<Set<string>>(new Set());

  const handleStageClick = (id: string) => {
    const next = new Set(clicked).add(id);
    setClicked(next);
    if (next.size === STAGES.length && !completedRef.current) {
      completedRef.current = true;
      completeLevel(levelNumber);
    }
  };

  const allClicked = clicked.size === STAGES.length;

  return (
    <div className="space-y-10">
      <p className="text-textMuted">
        End-to-end system: email → intent → RAG retrieval → agent decision → structured output.
        <AIJokeTooltip joke="The only architecture that survives the first PM change.">
          <span className="text-accent cursor-help border-b border-dotted border-accent"> Production-ready.</span>
        </AIJokeTooltip>
      </p>

      <div>
        <h3 className="text-lg font-semibold mb-4">Click through each stage</h3>
        <GlassCard>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {STAGES.map((s, i) => (
              <motion.button
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                onClick={() => handleStageClick(s.id)}
                className={`rounded-xl p-4 text-left border transition-all ${
                  clicked.has(s.id)
                    ? "border-green-500/50 bg-green-500/10"
                    : "glass border-border hover:border-accent/50"
                }`}
              >
                <span className="text-2xl block mb-2">{s.icon}</span>
                <h4 className="font-semibold text-accentSecondary text-sm">{s.label}</h4>
                <p className="text-xs text-textMuted mt-1">{s.out}</p>
              </motion.button>
            ))}
          </div>
          <p className="text-sm text-textMuted mt-4 text-center">
            Click each stage to simulate the pipeline. Complete all to earn your badge.
          </p>
        </GlassCard>
      </div>

      {allClicked && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", damping: 20 }}
          className="glass rounded-2xl p-8 text-center border-2 border-accent/50"
        >
          <span className="text-5xl block mb-4">🏆</span>
          <h3 className="text-2xl font-bold gradient-text mb-2">You are now Agent Architect</h3>
          <p className="text-textMuted">
            You've completed the full journey from LLM limits to production agentic systems.
          </p>
        </motion.div>
      )}

      {isLevelCompleted(levelNumber) && !allClicked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass rounded-xl p-4 flex items-center gap-3 border border-green-500/30"
        >
          <span className="text-2xl">🎉</span>
          <p className="font-semibold text-green-400">All levels complete!</p>
        </motion.div>
      )}
    </div>
  );
}
