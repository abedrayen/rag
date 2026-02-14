"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useProgress } from "@/context/ProgressContext";
import { useLevelNumber } from "@/context/LevelContext";
import { useLevelView } from "@/context/LevelViewContext";
import EmbeddingVisual from "@/components/diagrams/EmbeddingVisual";
import VectorSpace2D from "@/components/diagrams/VectorSpace2D";
import ChunkComparison from "@/components/diagrams/ChunkComparison";
import GlassCard from "@/components/GlassCard";
import LevelModeTabs from "@/components/pedagogy/LevelModeTabs";
import ExplainablePanel from "@/components/pedagogy/ExplainablePanel";
import InstructorNotes from "@/components/pedagogy/InstructorNotes";
import ComprehensionCheck from "@/components/pedagogy/ComprehensionCheck";

const DOCS = [
  { id: "a", title: "Employee Handbook", snippet: "PTO policy, benefits..." },
  { id: "b", title: "Q4 Revenue Report 2024", snippet: "Revenue: $2.4M. Growth 12%." },
  { id: "c", title: "Meeting Notes Q3", snippet: "Action items, attendees..." },
];
const QUERY = "What was our Q4 revenue?";

const CONCEPT_EMBEDDINGS = {
  what: "An embedding is a dense vector (list of numbers) that represents the meaning of text. Similar meaning → similar vectors.",
  why: "We need a way to find 'relevant' documents without keyword matching. Semantic similarity lets us retrieve by meaning.",
  how: "An embedding model (e.g. OpenAI text-embedding-3) maps text to a fixed-size vector. We compare vectors with cosine similarity or dot product; closer = more similar.",
  limitations: "Embeddings lose some nuance; dimension size trades off expressiveness vs cost/latency. Domain mismatch (e.g. code vs prose) hurts quality.",
  when: "Use embeddings whenever you need semantic search, retrieval for RAG, or clustering. Choose model and dimensions to match your domain and latency budget.",
};

export default function Level2RAG() {
  const { completeLevel, isLevelCompleted } = useProgress();
  const levelNumber = useLevelNumber();
  const { mode } = useLevelView();
  const completedRef = useRef(false);

  const handleCorrectRetrieve = (id: string) => {
    if (id !== "b" || completedRef.current) return;
    completedRef.current = true;
    completeLevel(levelNumber);
  };

  return (
    <div className="space-y-8">
      <LevelModeTabs levelNumber={levelNumber} />

      {mode === "explanation" ? (
        <>
          <ExplainablePanel title="Embeddings & semantic similarity" concept={CONCEPT_EMBEDDINGS} defaultOpen />
          <div className="glass rounded-xl p-6 space-y-4">
            <h3 className="font-semibold text-[var(--color-retrieval)]">Concept summary</h3>
            <ul className="text-sm text-textMuted space-y-2">
              <li>• <strong className="text-white">What is an embedding?</strong> A numerical representation of meaning. Same model, same dimensions for query and docs.</li>
              <li>• <strong className="text-white">Why vectors capture meaning?</strong> Training pushes similar texts to nearby vectors. We approximate “similarity” by distance or cosine.</li>
              <li>• <strong className="text-white">Why similarity search works?</strong> Nearest neighbors in vector space tend to be semantically relevant. Top-K retrieval is fast with approximate indexes (e.g. HNSW).</li>
            </ul>
          </div>
          <div className="rounded-xl border border-border p-4">
            <h4 className="text-sm font-semibold mb-2">Simplified math</h4>
            <p className="text-sm text-textMuted">
              Cosine similarity = (A · B) / (||A|| ||B||). Value between -1 and 1; higher = more similar. In practice we often use dot product when vectors are normalized.
            </p>
          </div>
        </>
      ) : (
        <>
          <p className="text-textMuted">
            Embeddings turn text into vectors. Similar meaning → nearby in vector space. We’ll use a 2D simplification; real embeddings have hundreds of dimensions.
          </p>

          <div>
            <h3 className="text-lg font-semibold mb-4">2D vector space (interactive)</h3>
            <GlassCard>
              <VectorSpace2D />
            </GlassCard>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Embeddings (bar view)</h3>
            <GlassCard>
              <EmbeddingVisual />
            </GlassCard>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Simulate retrieval</h3>
            <p className="text-textMuted text-sm mb-3">Query: &quot;{QUERY}&quot; — Click the document that should be retrieved.</p>
            <GlassCard>
              <div className="space-y-2">
                {DOCS.map((d) => (
                  <motion.button
                    key={d.id}
                    onClick={() => handleCorrectRetrieve(d.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full text-left p-4 rounded-xl border transition-colors ${
                      d.id === "b" ? "border-[var(--color-retrieval)]/50 hover:bg-[var(--color-retrieval)]/10" : "border-border hover:bg-white/5"
                    }`}
                  >
                    <span className="font-medium">{d.title}</span>
                    <span className="text-textMuted text-sm block mt-1">{d.snippet}</span>
                  </motion.button>
                ))}
              </div>
            </GlassCard>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Chunking: good vs bad</h3>
            <ChunkComparison />
          </div>
        </>
      )}

      <ComprehensionCheck
        question="Why do we use embeddings instead of keyword search for RAG?"
        options={[
          { label: "Keywords are faster", correct: false, feedback: "We use embeddings for semantic similarity, not just keyword match." },
          { label: "Embeddings capture meaning; similar intent maps to similar vectors", correct: true, feedback: "Correct. Semantic similarity improves retrieval quality over exact keywords." },
          { label: "Embeddings use less storage", correct: false, feedback: "Storage is a trade-off; the main benefit is semantic retrieval." },
        ]}
      />

      <InstructorNotes title="Instructor notes — Level 2">
        <p><strong>Real dimensions:</strong> Typical models use 256–1536 dimensions. More dimensions = more expressiveness but higher cost and latency.</p>
        <p><strong>Trade-offs:</strong> Smaller/faster models (e.g. 384 dims) vs larger (1536). Domain-specific embedders can beat general-purpose on specialized data.</p>
        <p><strong>Latency:</strong> Embedding + index lookup often &lt;100ms; LLM call dominates. Mention batch embedding for indexing vs single-query latency.</p>
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
            <p className="text-sm text-textMuted">Level 3 (RAG Pipeline) is unlocked.</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
