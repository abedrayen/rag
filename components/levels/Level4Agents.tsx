"use client";

import { useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { useProgress } from "@/context/ProgressContext";
import { useLevelNumber } from "@/context/LevelContext";
import ReActLoop from "@/components/diagrams/ReActLoop";
import MemoryBlocks from "@/components/diagrams/MemoryBlocks";
import GlassCard from "@/components/GlassCard";
import AIJokeTooltip from "@/components/AIJokeTooltip";

const LOOP_STEPS = ["Reason", "Act", "Observe"];

export default function Level4Agents() {
  const { completeLevel, isLevelCompleted } = useProgress();
  const levelNumber = useLevelNumber();
  const completedRef = useRef(false);
  const [step, setStep] = useState(0);
  const [mode, setMode] = useState<"rag" | "agent">("agent");

  const handleCompleteLoop = () => {
    if (step !== LOOP_STEPS.length - 1) return;
    if (!completedRef.current) {
      completedRef.current = true;
      completeLevel(levelNumber);
    }
  };

  return (
    <div className="space-y-10">
      <p className="text-textMuted">
        Agents add a loop: <strong className="text-white">Reason</strong> →{" "}
        <strong className="text-white">Act</strong> (tools) →{" "}
        <strong className="text-white">Observe</strong> → repeat.
        <AIJokeTooltip joke="Like a dev who actually runs the code before shipping.">
          <span className="text-accent cursor-help border-b border-dotted border-accent"> Grounded action.</span>
        </AIJokeTooltip>
      </p>

      <div className="flex items-center gap-4 flex-wrap">
        <span className="text-sm text-textMuted">Mode:</span>
        <div className="flex rounded-lg border border-border p-0.5">
          <button
            onClick={() => setMode("rag")}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors ${mode === "rag" ? "bg-accent text-white" : "text-textMuted hover:text-white"}`}
          >
            RAG
          </button>
          <button
            onClick={() => setMode("agent")}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors ${mode === "agent" ? "bg-accent text-white" : "text-textMuted hover:text-white"}`}
          >
            Agent
          </button>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">ReAct loop</h3>
        <GlassCard>
          <AnimatePresence mode="wait">
            {mode === "agent" ? <ReActLoop key="agent" /> : (
              <div key="rag" className="text-textMuted text-sm">
                RAG: single retrieval + generate. No loop. Switch to Agent to see Reason → Act → Observe.
              </div>
            )}
          </AnimatePresence>
        </GlassCard>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Complete one reasoning loop (Unlock Level 5)</h3>
        <GlassCard>
          <p className="text-textMuted text-sm mb-4">
            Click through: Reason → Act → Observe to simulate one full cycle.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            {LOOP_STEPS.map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <motion.button
                  onClick={() => setStep(i)}
                  animate={{
                    scale: step >= i ? 1.05 : 1,
                    borderColor: step >= i ? "rgba(99, 102, 241, 0.6)" : "rgba(255,255,255,0.1)",
                  }}
                  className="rounded-xl border-2 px-4 py-3 bg-white/5"
                >
                  {label}
                </motion.button>
                {i < LOOP_STEPS.length - 1 && (
                  <span className="text-accent">→</span>
                )}
              </div>
            ))}
            <button
              onClick={step < LOOP_STEPS.length - 1 ? () => setStep((s) => s + 1) : handleCompleteLoop}
              className="ml-4 px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium"
            >
              {step < LOOP_STEPS.length - 1 ? "Next" : "Complete loop"}
            </button>
          </div>
          <p className="text-xs text-textMuted mt-3">
            Step: {LOOP_STEPS[step]}. {step === LOOP_STEPS.length - 1 ? "Click “Complete loop” to unlock." : "Click Next."}
          </p>
        </GlassCard>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Tool calling</h3>
        <GlassCard>
          <pre className="font-mono text-xs text-accentSecondary bg-black/30 rounded-lg p-4 overflow-x-auto">
            {`{ "name": "search", "args": { "q": "freelancer React" } }
→ [{"name": "Alice", "skills": ["React"]}]`}
          </pre>
        </GlassCard>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Memory (conceptual)</h3>
        <GlassCard>
          <MemoryBlocks />
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
            <p className="text-sm text-textMuted">Level 5 (Multi-Agent) is unlocked.</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
