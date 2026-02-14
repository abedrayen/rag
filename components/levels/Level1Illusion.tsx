"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useProgress } from "@/context/ProgressContext";
import { useLevelNumber } from "@/context/LevelContext";
import HallucinationDemo from "@/components/HallucinationDemo";
import QuizCard from "@/components/QuizCard";
import ConsoleTerminal from "@/components/ConsoleTerminal";
import GlassCard from "@/components/GlassCard";
import AIJokeTooltip from "@/components/AIJokeTooltip";

const BULLETS = [
  { title: "Hallucinations", desc: "Models confidently invent facts when they don't know." },
  { title: "No private data", desc: "Your docs and DB are invisible to the base model." },
  { title: "No tool usage", desc: "Can't search or call APIs—just next-token prediction." },
];

export default function Level1Illusion() {
  const { completeLevel, isLevelCompleted } = useProgress();
  const levelNumber = useLevelNumber();
  const completedRef = useRef(false);

  const handleQuizCorrect = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    completeLevel(levelNumber);
  };

  return (
    <div className="space-y-10">
      <p className="text-textMuted">
        LLMs are fluent but limited: no access to your data, no tools, and a tendency to
        <AIJokeTooltip joke="They're not lying—they're 'stochastic parrots' with extra confidence.">
          <span className="text-accent cursor-help border-b border-dotted border-accent"> confidently guess</span>.
        </AIJokeTooltip>
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {BULLETS.map((b, i) => (
            <GlassCard key={b.title} delay={i * 0.08}>
              <h3 className="font-semibold text-accentSecondary mb-1">{b.title}</h3>
              <p className="text-textMuted text-sm">{b.desc}</p>
            </GlassCard>
          ))}
        </div>
        <div>
          <p className="text-textMuted text-sm mb-3">Vanilla model without RAG or tools</p>
          <ConsoleTerminal />
        </div>
      </div>

      <HallucinationDemo />

      <div>
        <h3 className="text-lg font-semibold mb-4">Unlock Level 2</h3>
        <QuizCard
          question="Can LLMs access your private database by default?"
          options={[
            {
              label: "Yes, they have read access",
              correct: false,
              explanation: "Base models only know their training data; they can't query your DB.",
            },
            {
              label: "No—they have no direct access to your data",
              correct: true,
              explanation: "Correct. You need RAG or tools to ground them in your data.",
            },
            {
              label: "Only if you use OpenAI",
              correct: false,
              explanation: "No provider gives base models access to your private data.",
            },
          ]}
          onCorrect={handleQuizCorrect}
        />
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
            <p className="text-sm text-textMuted">Level 2 is now unlocked. Scroll down to continue.</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
