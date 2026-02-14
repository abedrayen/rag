"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useProgress } from "@/context/ProgressContext";
import { useLevelNumber } from "@/context/LevelContext";
import { useLevelView } from "@/context/LevelViewContext";
import RAGPipelineSteps from "@/components/diagrams/RAGPipelineSteps";
import ChunkComparison from "@/components/diagrams/ChunkComparison";
import GlassCard from "@/components/GlassCard";
import LevelModeTabs from "@/components/pedagogy/LevelModeTabs";
import ExplainablePanel from "@/components/pedagogy/ExplainablePanel";
import InstructorNotes from "@/components/pedagogy/InstructorNotes";
import ComprehensionCheck from "@/components/pedagogy/ComprehensionCheck";

const CONCEPT_RAG = {
  what: "RAG = Retrieval-Augmented Generation. Retrieve relevant chunks from your data, inject them into the prompt, then let the LLM generate an answer grounded in that context.",
  why: "Base LLMs don't have your data. RAG adds a retrieval step so the model can 'see' relevant documents at inference time.",
  how: "Query → embed → vector search → top-K chunks → build prompt with context → LLM generates. Each step is tunable (chunk size, K, reranking).",
  limitations: "Quality depends on retrieval. Bad chunks or wrong K cause wrong or vague answers. No reasoning loop—single shot. Latency adds up.",
  when: "Use RAG for Q&A over docs, knowledge bases, or any setting where 'retrieve then generate' is enough. Add agents when you need tools or multi-step reasoning.",
};

export default function Level3RAGPipeline() {
  const { completeLevel, isLevelCompleted } = useProgress();
  const levelNumber = useLevelNumber();
  const { mode } = useLevelView();
  const completedRef = useRef(false);
  const [ragVariant, setRagVariant] = useState<"bad" | "optimized">("optimized");

  return (
    <div className="space-y-8">
      <LevelModeTabs levelNumber={levelNumber} />

      {mode === "explanation" ? (
        <>
          <ExplainablePanel title="The RAG pipeline" concept={CONCEPT_RAG} defaultOpen />
          <div className="glass rounded-xl p-6 space-y-4">
            <h3 className="font-semibold text-[var(--color-retrieval)]">What happens at each stage</h3>
            <ul className="text-sm text-textMuted space-y-2">
              <li>• <strong className="text-white">Query:</strong> User question. Embedding model converts it to a vector.</li>
              <li>• <strong className="text-white">Vector DB:</strong> Approximate nearest neighbor (e.g. HNSW) returns chunk IDs.</li>
              <li>• <strong className="text-white">Top-K:</strong> K too small → miss context. K too large → noise and context overflow.</li>
              <li>• <strong className="text-white">LLM:</strong> Prompt = system + retrieved chunks + query. Model generates from that.</li>
            </ul>
          </div>
          <div className="rounded-xl border border-border p-4">
            <h4 className="text-sm font-semibold mb-2">Why chunking and Top-K matter</h4>
            <p className="text-sm text-textMuted">
              Chunking defines retrieval granularity. Top-K controls how much context is injected; it directly affects relevance and context window usage.
            </p>
          </div>
        </>
      ) : (
        <>
          <p className="text-textMuted">
            RAG flows: Query → Embedding → Vector DB → Top-K → LLM → Answer. Pause at any step to see why it matters.
          </p>

          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-sm text-textMuted">Setup:</span>
            <button
              onClick={() => setRagVariant("optimized")}
              className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${
                ragVariant === "optimized" ? "border-[var(--color-retrieval)] bg-[var(--color-retrieval)]/10" : "border-border"
              }`}
            >
              Optimized RAG
            </button>
            <button
              onClick={() => setRagVariant("bad")}
              className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${
                ragVariant === "bad" ? "border-amber-500/50 bg-amber-500/10" : "border-border"
              }`}
            >
              Bad RAG setup
            </button>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Click-through pipeline (click each step to advance)</h3>
            <GlassCard>
              <RAGPipelineSteps variant={ragVariant} />
            </GlassCard>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Chunking and context injection</h3>
            <ChunkComparison />
          </div>
        </>
      )}

      <ComprehensionCheck
        question="What is the main risk of setting Top-K too high?"
        options={[
          { label: "Slower retrieval", correct: false, feedback: "Retrieval speed is one concern; the main issue is context quality." },
          { label: "Context overflow and irrelevant chunks diluting the answer", correct: true, feedback: "Correct. Too many chunks fill the context window and can push out key info or add noise." },
          { label: "Higher embedding cost", correct: false, feedback: "Embedding cost is per query; Top-K affects what we pass to the LLM." },
        ]}
        onCorrect={() => {
          if (!completedRef.current) {
            completedRef.current = true;
            completeLevel(levelNumber);
          }
        }}
      />

      <InstructorNotes title="Instructor notes — Level 3">
        <p><strong>Key question:</strong> &quot;What happens if we retrieve 20 chunks but the model context is only 5?&quot; (Truncation, order matters.)</p>
        <p><strong>Pitfall:</strong> Many teams skip reranking. Explain when a second-stage reranker (e.g. cross-encoder) helps.</p>
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
            <p className="text-sm text-textMuted">Level 4 (Breaking RAG) is unlocked.</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
