"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInstructor } from "@/context/InstructorContext";
import ContextPanel from "@/components/pedagogy/ContextPanel";

const STATIONS = [
  {
    id: "embed",
    title: "Embedding",
    question: "Why is this step necessary?",
    stationQuestion: "Why not search by keywords?",
    answer: "Keywords miss paraphrases and synonyms. Embeddings capture meaning so we retrieve 'refund' when the user asks 'get my money back'.",
    instructor: "Same embedding model as index. Query → vector in ~50–200ms.",
  },
  {
    id: "vectordb",
    title: "Vector DB",
    question: "Why is this step necessary?",
    stationQuestion: "What happens if the wrong chunk is closest?",
    answer: "We'd inject irrelevant context and the LLM might still answer—wrongly. Chunking and retrieval quality are critical.",
    instructor: "Top-K retrieval. Reranking can improve precision.",
  },
  {
    id: "context",
    title: "Context Injection",
    question: "Why is this step necessary?",
    stationQuestion: "Why must context be inserted BEFORE generation?",
    answer: "The model conditions on the prompt. If context isn't in the prompt, it can't use it. Order and truncation matter.",
    instructor: "System + context + user. Token limit applies to the whole prompt.",
  },
  {
    id: "llm",
    title: "LLM Generation",
    question: "Why is this step necessary?",
    stationQuestion: "Is the model thinking differently—or just seeing more?",
    answer: "It's seeing more. Same next-token process; the extra context changes what tokens are likely. No separate 'reasoning'—just conditioning on retrieved text.",
    instructor: "With RAG: grounded. Without: hallucination risk. Same model, different input.",
  },
  {
    id: "answer",
    title: "Answer",
    question: "What do we get?",
    stationQuestion: null,
    answer: "Final answer plus (in production) sources and possibly confidence. We can cite which chunks were used.",
    instructor: "Log sources for attribution and evals.",
  },
];

export default function RAGJourneyPedagogical() {
  const [station, setStation] = useState(0);
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const { instructorMode } = useInstructor();
  const current = STATIONS[station];

  const reveal = () => setRevealed((r) => ({ ...r, [station]: true }));

  return (
    <div className="space-y-6">
      <ContextPanel variant="inline" title="Scenario">
        User asks: &quot;What is your company refund policy?&quot; The Query Orb travels through the pipeline below.
      </ContextPanel>

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

      <motion.div
        key={current.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-6"
      >
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            className="w-12 h-12 rounded-full bg-accent/30 border-2 border-accent flex items-center justify-center"
            animate={{ boxShadow: ["0 0 20px rgba(99,102,241,0.4)", "0 0 32px rgba(99,102,241,0.5)"] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ●
          </motion.div>
          <div>
            <h3 className="text-lg font-bold text-[var(--color-retrieval)]">Station {station + 1}: {current.title}</h3>
            <p className="text-sm text-textMuted mt-0.5">{current.question}</p>
          </div>
        </div>

        {current.stationQuestion && (
          <div className="mb-4 p-3 rounded-lg border border-amber-500/40 bg-amber-500/5">
            <p className="text-sm font-medium text-amber-200">{current.stationQuestion}</p>
          </div>
        )}

        {!revealed[station] ? (
          <button
            onClick={reveal}
            className="text-sm text-accent hover:underline"
          >
            Reveal explanation →
          </button>
        ) : (
          <ContextPanel variant="inline" title="Explanation">
            {current.answer}
          </ContextPanel>
        )}

        {instructorMode && (
          <p className="mt-3 text-xs text-amber-400/90">Instructor: {current.instructor}</p>
        )}
      </motion.div>
    </div>
  );
}
