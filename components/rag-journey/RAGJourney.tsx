"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInstructor } from "@/context/InstructorContext";

const STATIONS = [
  {
    id: "embed",
    title: "Embedding Generator",
    icon: "⚡",
    narration: "We don't search words. We search meaning.",
    instructor: "Query is converted to a vector with the same embedding model used at index time. Typical dims: 256–1536.",
  },
  {
    id: "vectordb",
    title: "Vector Database",
    icon: "🗄️",
    narration: "Nearby dots light up. Top-K documents rise.",
    instructor: "Approximate nearest neighbor (e.g. HNSW). Returns chunk IDs by similarity. K is tunable.",
  },
  {
    id: "context",
    title: "Context Injection",
    icon: "💉",
    narration: "Context injected before generation.",
    instructor: "Retrieved chunks are pasted into the prompt. Order and truncation matter. System message often includes 'Answer only using context below'.",
  },
  {
    id: "llm",
    title: "LLM Generator",
    icon: "🧠",
    narration: "With RAG: grounded. Without: hallucination risk.",
    instructor: "Token-by-token generation. With RAG the model conditions on retrieved context. Toggle shows the contrast.",
  },
  {
    id: "answer",
    title: "Final Answer",
    icon: "✨",
    narration: "Answer, sources, confidence. Where can this still fail?",
    instructor: "Production systems log sources for attribution and run evals. Confidence can be heuristic or model-based.",
  },
];

export default function RAGJourney() {
  const [station, setStation] = useState(0);
  const [withRAG, setWithRAG] = useState(true);
  const [reflection, setReflection] = useState("");
  const { instructorMode } = useInstructor();
  const current = STATIONS[station];

  return (
    <div className="space-y-8">
      {/* Progress: 5 stations */}
      <div className="flex flex-wrap items-center gap-2">
        {STATIONS.map((s, i) => (
          <div key={s.id} className="flex items-center gap-1">
            <motion.button
              onClick={() => setStation(i)}
              className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center text-sm transition-colors ${
                station === i ? "border-accent bg-accent/20 scale-110" : "border-border hover:border-accent/50"
              }`}
            >
              {i + 1}
            </motion.button>
            {i < STATIONS.length - 1 && <span className="text-textMuted">→</span>}
          </div>
        ))}
      </div>

      {/* Query orb + current station */}
      <motion.div
        key={current.id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-6 md:p-8"
      >
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            className="w-14 h-14 rounded-full bg-accent/30 border-2 border-accent flex items-center justify-center text-2xl shrink-0"
            animate={{ boxShadow: ["0 0 20px rgba(99,102,241,0.4)", "0 0 40px rgba(99,102,241,0.6)", "0 0 20px rgba(99,102,241,0.4)"] }}
            transition={{ duration: 2, repeat: Infinity }}
            title="Query Orb"
          >
            ●
          </motion.div>
          <div>
            <p className="text-xs text-textMuted mb-0.5">Query Orb →</p>
            <h3 className="text-xl font-bold text-accentSecondary">Station {station + 1}: {current.title}</h3>
            <p className="text-textMuted text-sm mt-1">{current.narration}</p>
          </div>
        </div>

        {/* Station-specific content */}
        <AnimatePresence mode="wait">
          {current.id === "embed" && (
            <motion.div
              key="embed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-xl bg-black/40 p-4 font-mono text-sm border border-[var(--color-retrieval)]/30"
            >
              <p className="text-textMuted mb-2">Query →</p>
              <p className="text-[var(--color-retrieval)]">[0.23, -0.98, 0.44, 0.12, ...]</p>
              <p className="text-xs text-textMuted mt-2">Compressed glowing vector beam</p>
            </motion.div>
          )}

          {current.id === "vectordb" && (
            <motion.div
              key="vectordb"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-xl bg-black/40 p-4 border border-[var(--color-retrieval)]/30"
            >
              <div className="flex flex-wrap gap-2 mb-3">
                {Array.from({ length: 24 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 rounded-full bg-white/20"
                    animate={{
                      opacity: i < 6 ? 1 : 0.3,
                      scale: i < 3 ? 1.2 : 1,
                      background: i < 3 ? "rgba(34, 197, 94, 0.6)" : "rgba(255,255,255,0.2)",
                    }}
                  />
                ))}
              </div>
              <p className="text-sm text-[var(--color-retrieval)]">Top 3 documents rise ↑</p>
            </motion.div>
          )}

          {current.id === "context" && (
            <motion.div
              key="context"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-xl bg-black/40 p-4 border border-[var(--color-llm)]/30 text-left space-y-2 font-mono text-xs"
            >
              <p className="text-amber-400">SYSTEM:</p>
              <p className="text-textMuted">Answer only using context below.</p>
              <p className="text-amber-400 mt-2">CONTEXT:</p>
              <p className="text-textMuted">[Doc1] [Doc2] [Doc3]</p>
              <p className="text-accent mt-2">USER: {"{Question}"}</p>
            </motion.div>
          )}

          {current.id === "llm" && (
            <motion.div key="llm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setWithRAG(false)}
                  className={`px-3 py-1.5 rounded-lg text-sm ${!withRAG ? "bg-red-500/20 border border-red-500/50" : "border border-border"}`}
                >
                  Without RAG
                </button>
                <button
                  onClick={() => setWithRAG(true)}
                  className={`px-3 py-1.5 rounded-lg text-sm ${withRAG ? "bg-green-500/20 border border-green-500/50" : "border border-border"}`}
                >
                  With RAG
                </button>
              </div>
              <div className={`rounded-xl p-4 border ${withRAG ? "border-green-500/30 bg-green-500/5" : "border-red-500/30 bg-red-500/5"}`}>
                {withRAG ? (
                  <p className="text-sm text-green-300">Answer grounded in retrieved context. Sources can be cited.</p>
                ) : (
                  <p className="text-sm text-red-300">Hallucinated or generic answer—no access to your docs.</p>
                )}
              </div>
              <p className="text-xs text-textMuted mt-2">Without RAG: confident fiction. With RAG: confident fiction with receipts.</p>
            </motion.div>
          )}

          {current.id === "answer" && (
            <motion.div key="answer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
              <div className="rounded-xl p-4 border border-accent/30 bg-accent/5">
                <p className="text-sm font-semibold text-accentSecondary">Final Answer</p>
                <p className="text-sm text-textMuted mt-1">Sources used: Doc1, Doc2, Doc3</p>
                <p className="text-xs text-textMuted mt-2">Confidence: high (context match)</p>
              </div>
              <div>
                <p className="text-sm font-semibold mb-2">Where can this still fail?</p>
                <textarea
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  placeholder="e.g. Wrong retrieval, stale index, context overflow..."
                  className="w-full h-24 px-3 py-2 rounded-lg bg-black/40 border border-border text-sm placeholder-textMuted resize-none"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {instructorMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 p-3 rounded-lg border border-amber-500/40 bg-amber-500/5 text-sm text-textMuted"
          >
            <span className="text-amber-400 font-semibold">Instructor:</span> {current.instructor}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
