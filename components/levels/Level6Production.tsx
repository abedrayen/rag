"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/context/ProgressContext";
import { useLevelNumber } from "@/context/LevelContext";
import { useLevelView } from "@/context/LevelViewContext";
import GlassCard from "@/components/GlassCard";
import LevelModeTabs from "@/components/pedagogy/LevelModeTabs";
import ExplainablePanel from "@/components/pedagogy/ExplainablePanel";
import InstructorNotes from "@/components/pedagogy/InstructorNotes";

const STAGES = [
  { id: "email", label: "Email input", out: "Raw email: 'Need React dev, 3 months'", icon: "📧", color: "var(--color-llm)", latency: "—", failure: "Parse errors, encoding" },
  { id: "intent", label: "Intent extraction", out: "Intent: hire React dev, 3 months", icon: "🎯", color: "var(--color-llm)", latency: "~500ms", failure: "Wrong intent, ambiguous email" },
  { id: "rag", label: "RAG: freelancer profiles", out: "Top 5 candidates (vector search)", icon: "📚", color: "var(--color-retrieval)", latency: "~150ms", failure: "Stale index, bad chunks" },
  { id: "agent", label: "Agent: decide best fit", out: "Ranking + reasoning → pick one", icon: "🤖", color: "var(--color-agent)", latency: "~2s", failure: "Wrong tool, loop, timeout" },
  { id: "output", label: "Structured output", out: "JSON: assignee, start date, scope", icon: "📋", color: "var(--color-tools)", latency: "—", failure: "Invalid schema, missing fields" },
];

const CONCEPT_PRODUCTION = {
  what: "A production system combines intent extraction (LLM), RAG for retrieval, and an agent for decision-making, with structured output for downstream use.",
  why: "Real workflows need multiple capabilities: understand input, retrieve context, reason and act, then output in a consumable format.",
  how: "Data flows through stages. Each stage can be monitored and scaled independently. Latency and failure points are identified and guarded.",
  limitations: "End-to-end latency adds up. Failure in any stage affects the whole pipeline. Evaluation and rollback strategies are essential.",
  when: "Use this pattern when you have a clear pipeline (input → understand → retrieve → decide → output) and need reliability and observability.",
};

export default function Level6Production() {
  const { completeLevel, isLevelCompleted } = useProgress();
  const levelNumber = useLevelNumber();
  const { mode } = useLevelView();
  const completedRef = useRef(false);
  const [clicked, setClicked] = useState<Set<string>>(new Set());
  const [expanded, setExpanded] = useState<string | null>(null);

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
    <div className="space-y-8">
      <LevelModeTabs levelNumber={levelNumber} />

      {mode === "explanation" ? (
        <>
          <ExplainablePanel title="Real production architecture" concept={CONCEPT_PRODUCTION} defaultOpen />
          <div className="glass rounded-xl p-6 space-y-4">
            <h3 className="font-semibold text-[var(--color-agent)]">Explainable: separation, scale, monitoring</h3>
            <ul className="text-sm text-textMuted space-y-2">
              <li>• <strong className="text-white">Separation of concerns:</strong> Intent, retrieval, and agent can be developed and scaled independently. Clear boundaries reduce coupling.</li>
              <li>• <strong className="text-white">Scalability:</strong> RAG index and embedding can be cached; agent and LLM calls can be rate-limited and parallelized where safe.</li>
              <li>• <strong className="text-white">Monitoring & evaluation:</strong> Log latency per stage, track failure rates, and run evals (relevance, answer quality) to catch regressions.</li>
            </ul>
          </div>
        </>
      ) : (
        <>
          <p className="text-textMuted">
            End-to-end: Email → Intent extraction → RAG retrieval → Agent decision → Structured output. Click a stage; expand for technical detail, latency, and failure points.
          </p>

          <div>
            <h3 className="text-lg font-semibold mb-4">Click through each stage (data flow)</h3>
            <GlassCard>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                {STAGES.map((s, i) => (
                  <div key={s.id}>
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      onClick={() => { handleStageClick(s.id); setExpanded(expanded === s.id ? null : s.id); }}
                      className={`w-full rounded-xl p-4 text-left border transition-all ${
                        clicked.has(s.id) ? "border-green-500/50 bg-green-500/10" : "glass border-border hover:border-accent/50"
                      }`}
                      style={{ borderLeftWidth: 4, borderLeftColor: s.color }}
                    >
                      <span className="text-2xl block mb-2">{s.icon}</span>
                      <h4 className="font-semibold text-accentSecondary text-sm">{s.label}</h4>
                      <p className="text-xs text-textMuted mt-1">{s.out}</p>
                    </motion.button>
                    <AnimatePresence>
                      {expanded === s.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-2 rounded-lg border border-border p-3 text-xs space-y-1"
                        >
                          <p><strong className="text-textMuted">Latency:</strong> {s.latency}</p>
                          <p><strong className="text-textMuted">Failure risk:</strong> {s.failure}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
              <p className="text-sm text-textMuted mt-4 text-center">
                Click each stage to simulate the pipeline and expand for technical detail. Complete all to earn your badge.
              </p>
            </GlassCard>
          </div>
        </>
      )}

      <InstructorNotes title="Instructor notes — Level 6">
        <p><strong>Key question:</strong> &quot;Where would you add retries? Where would you add fallbacks?&quot;</p>
        <p><strong>Architectural alternatives:</strong> Discuss when to split agent vs single LLM call, or when to add a reviewer agent.</p>
      </InstructorNotes>

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
