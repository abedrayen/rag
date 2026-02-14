"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useProgress } from "@/context/ProgressContext";
import { useLevelNumber } from "@/context/LevelContext";
import { useLevelView } from "@/context/LevelViewContext";
import ReActLoop from "@/components/diagrams/ReActLoop";
import MemoryBlocks from "@/components/diagrams/MemoryBlocks";
import GlassCard from "@/components/GlassCard";
import LevelModeTabs from "@/components/pedagogy/LevelModeTabs";
import ExplainablePanel from "@/components/pedagogy/ExplainablePanel";
import InstructorNotes from "@/components/pedagogy/InstructorNotes";

const LOOP_STEPS = ["Reason", "Act", "Observe"];

const CONCEPT_AGENTS = {
  what: "An agent is an LLM in a loop: it can reason (plan), act (call tools), and observe (read results), then repeat until done or max steps.",
  why: "Many tasks need multi-step reasoning, tool use (search, API, code), or iteration. RAG alone cannot do that.",
  how: "ReAct: Reason (think step-by-step) → Act (output tool call) → Observe (get result, feed back) → repeat. Tools are defined with names and parameters.",
  limitations: "Agents can be slow, expensive, and unpredictable. They can loop, call wrong tools, or leak context. Guardrails and max steps are critical.",
  when: "Use agents when you need tools, multi-step planning, or iteration. Use RAG when single-shot retrieve + generate is enough.",
};

export default function Level4Agents() {
  const { completeLevel, isLevelCompleted } = useProgress();
  const levelNumber = useLevelNumber();
  const { mode } = useLevelView();
  const completedRef = useRef(false);
  const [step, setStep] = useState(0);
  const [ragVsAgent, setRagVsAgent] = useState<"rag" | "agent">("agent");

  const handleCompleteLoop = () => {
    if (step !== LOOP_STEPS.length - 1) return;
    if (!completedRef.current) {
      completedRef.current = true;
      completeLevel(levelNumber);
    }
  };

  return (
    <div className="space-y-8">
      <LevelModeTabs levelNumber={levelNumber} />

      {mode === "explanation" ? (
        <>
          <ExplainablePanel title="Agentic systems" concept={CONCEPT_AGENTS} defaultOpen />
          <div className="glass rounded-xl p-6 space-y-4">
            <h3 className="font-semibold text-[var(--color-agent)]">Explainable: planning, tools, observation</h3>
            <ul className="text-sm text-textMuted space-y-2">
              <li>• <strong className="text-white">What is planning?</strong> The model reasons step-by-step (e.g. “I need to search first, then summarize”).</li>
              <li>• <strong className="text-white">What is tool calling?</strong> The model outputs structured calls (name + args); the runtime executes them and returns results.</li>
              <li>• <strong className="text-white">What is observation?</strong> The tool result is fed back into the context; the model decides the next action.</li>
              <li>• <strong className="text-white">Why iteration matters:</strong> Many tasks require multiple steps; a single RAG call cannot do research, code, then summarize.</li>
            </ul>
          </div>
        </>
      ) : (
        <>
      <p className="text-textMuted">
        Agents add a loop: <strong className="text-white">Reason</strong> → <strong className="text-white">Act</strong> (tools) → <strong className="text-white">Observe</strong> → repeat.
      </p>

      <div className="flex items-center gap-4 flex-wrap">
        <span className="text-sm text-textMuted">Toggle:</span>
        <div className="flex rounded-lg border border-border p-0.5">
          <button
            onClick={() => setRagVsAgent("rag")}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors ${ragVsAgent === "rag" ? "bg-accent text-white" : "text-textMuted hover:text-white"}`}
          >
            RAG
          </button>
          <button
            onClick={() => setRagVsAgent("agent")}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors ${ragVsAgent === "agent" ? "bg-accent text-white" : "text-textMuted hover:text-white"}`}
          >
            Agent
          </button>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">ReAct loop</h3>
        <GlassCard>
          <AnimatePresence mode="wait">
            {ragVsAgent === "agent" ? <ReActLoop key="agent" /> : (
              <div key="rag" className="text-textMuted text-sm">
                RAG: single retrieval + generate. No loop. Switch to Agent to see Reason → Act → Observe.
              </div>
            )}
          </AnimatePresence>
        </GlassCard>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Complete one reasoning loop (Unlock Level 6)</h3>
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
        </>
      )}

      <InstructorNotes title="Instructor notes — Level 5">
        <p><strong>When to use Agents vs RAG:</strong> RAG for Q&A over docs. Agents when you need search, API calls, code execution, or multi-step planning.</p>
        <p><strong>Cost:</strong> Agents make multiple LLM calls and tool calls. Set max steps and monitor token usage.</p>
        <p><strong>Failure risks:</strong> Infinite loops, wrong tool choice, prompt injection in tool results. Use guardrails and timeouts.</p>
      </InstructorNotes>

      {isLevelCompleted(levelNumber) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-xl p-4 flex items-center gap-3 border border-green-500/30"
        >
          <span className="text-2xl">🎉</span>
          <div>
            <p className="font-semibold text-green-400">Level complete!</p>
            <p className="text-sm text-textMuted">Level 6 (Real Production Architecture) is unlocked.</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
