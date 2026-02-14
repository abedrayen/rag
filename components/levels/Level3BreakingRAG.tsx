"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useProgress } from "@/context/ProgressContext";
import { useLevelNumber } from "@/context/LevelContext";
import { useLevelView } from "@/context/LevelViewContext";
import GlassCard from "@/components/GlassCard";
import LevelModeTabs from "@/components/pedagogy/LevelModeTabs";
import ExplainablePanel from "@/components/pedagogy/ExplainablePanel";
import InstructorNotes from "@/components/pedagogy/InstructorNotes";

const FAILURE_OPTIONS = [
  { id: "a", label: "The model was too small", correct: false },
  { id: "b", label: "Too many chunks were retrieved and context overflowed; key info was truncated", correct: true },
  { id: "c", label: "The user asked in French", correct: false },
];

const CONCEPT_BREAKING_RAG = {
  what: "RAG can fail for many reasons: wrong retrieval, context overflow, latency, or stale index. Understanding failure modes is essential for production.",
  why: "We need to know when RAG is not enough—e.g. when we need multi-step reasoning or tool use—and how to debug and improve RAG systems.",
  how: "Simulate and monitor: wrong retrieval (bad embeddings or chunking), context overflow (too many/large chunks), latency (embed + retrieve + LLM).",
  limitations: "RAG has no reasoning loop. It's single-shot retrieve + generate. No planning, no tool use, no iteration.",
  when: "Use RAG when one retrieval + one generation suffices. When you need iteration, tools, or complex decisions, consider agents.",
};

export default function Level3BreakingRAG() {
  const { completeLevel, isLevelCompleted } = useProgress();
  const levelNumber = useLevelNumber();
  const { mode } = useLevelView();
  const completedRef = useRef(false);
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelected(id);
    if (id === "b" && !completedRef.current) {
      completedRef.current = true;
      completeLevel(levelNumber);
    }
  };

  return (
    <div className="space-y-8">
      <LevelModeTabs levelNumber={levelNumber} />

      {mode === "explanation" ? (
        <>
          <ExplainablePanel title="Why RAG breaks" concept={CONCEPT_BREAKING_RAG} defaultOpen />
          <div className="glass rounded-xl p-6 space-y-4">
            <h3 className="font-semibold text-amber-400">Explainable panel</h3>
            <ul className="text-sm text-textMuted space-y-2">
              <li>• <strong className="text-white">Why RAG is not enough for automation:</strong> No loop, no tools. Single shot only.</li>
              <li>• <strong className="text-white">Why no reasoning loop exists:</strong> RAG retrieves once and generates once. Agents add Reason → Act → Observe.</li>
            </ul>
          </div>
        </>
      ) : (
        <>
      <p className="text-textMuted">
        RAG fails in production when retrieval is bad, context is too large, or latency blows up.
      </p>

      <div>
        <h3 className="text-lg font-semibold mb-4">Context overflow (animation)</h3>
        <GlassCard>
          <div className="flex items-center gap-2 overflow-hidden">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, width: 0 }}
                whileInView={{ opacity: 1, width: 40 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="h-10 rounded bg-accent/30 shrink-0"
              />
            ))}
            <motion.div
              className="h-10 flex-1 rounded bg-red-500/30 min-w-[60px]"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <span className="text-xs p-2 block text-red-400">truncated</span>
            </motion.div>
          </div>
          <p className="text-xs text-textMuted mt-3">
            Too many chunks → context window full → truncation → missing key info.
          </p>
        </GlassCard>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Latency</h3>
        <GlassCard>
          <div className="flex gap-4 items-end">
            {[
              { label: "Embed", ms: 80 },
              { label: "Retrieve", ms: 120 },
              { label: "Rerank", ms: 200 },
              { label: "LLM", ms: 1500 },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ height: 0 }}
                whileInView={{ height: s.ms / 8 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="w-16 bg-accent/40 rounded-t text-center"
              >
                <span className="text-xs block mt-1">{s.ms}ms</span>
              </motion.div>
            ))}
          </div>
          <p className="text-xs text-textMuted mt-3">
            Embed + retrieve + rerank + generate add up. Set SLOs and cache when possible.
          </p>
        </GlassCard>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Why did RAG fail? (Unlock Level 4)</h3>
        <p className="text-textMuted text-sm mb-3">
          Scenario: User got a wrong answer. Investigation showed the relevant chunk was in the top 10 but the context was limited to 5 chunks and the answer was in chunk 7.
        </p>
        <GlassCard>
          <div className="space-y-2">
            {FAILURE_OPTIONS.map((o) => (
              <button
                key={o.id}
                onClick={() => handleSelect(o.id)}
                className={`w-full text-left p-4 rounded-xl border transition-colors ${
                  selected === o.id
                    ? o.correct
                      ? "border-green-500/50 bg-green-500/10"
                      : "border-red-500/50 bg-red-500/10"
                    : "border-border hover:bg-white/5"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </GlassCard>
      </div>
        </>
      )}

      <InstructorNotes title="Instructor notes — Level 4">
        <p><strong>Key question:</strong> &quot;What would we need to add to RAG to support multi-step research?&quot; (Agents, tools, loop.)</p>
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
            <p className="text-sm text-textMuted">Level 4 (Agents) is unlocked.</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
