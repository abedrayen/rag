"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useProgress } from "@/context/ProgressContext";
import { useLevelNumber } from "@/context/LevelContext";
import MeaningGalaxy from "@/components/embeddings/MeaningGalaxy";
import QueryMagnet from "@/components/embeddings/QueryMagnet";
import ChunkEmbedding from "@/components/embeddings/ChunkEmbedding";
import GlassCard from "@/components/GlassCard";
import LevelModeTabs from "@/components/pedagogy/LevelModeTabs";
import InstructorNotes from "@/components/pedagogy/InstructorNotes";
import ComprehensionCheck from "@/components/pedagogy/ComprehensionCheck";
import { useLevelView } from "@/context/LevelViewContext";

export default function Level1Embeddings() {
  const { completeLevel, isLevelCompleted } = useProgress();
  const levelNumber = useLevelNumber();
  const { mode } = useLevelView();
  const completedRef = useRef(false);

  const handleCorrect = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    completeLevel(levelNumber);
  };

  return (
    <div className="space-y-10">
      <LevelModeTabs levelNumber={levelNumber} />

      {mode === "explanation" ? (
        <div className="glass rounded-xl p-6 space-y-4">
          <h3 className="font-semibold text-[var(--color-retrieval)]">Concept: Embeddings</h3>
          <p className="text-textMuted text-sm">
            An embedding is a dense vector (list of numbers) that represents the meaning of text. Similar meaning → similar vectors. We use the same model to embed both the query and documents so we can compare them (e.g. cosine similarity) and retrieve the nearest neighbors. In reality we use hundreds or thousands of dimensions, not 2.
          </p>
        </div>
      ) : (
        <>
      <p className="text-textMuted">
        Embeddings turn text into positions in a high-dimensional space. Similar meaning → nearby points. We’ll visualize this in three ways.
      </p>

      {/* Visual 1: Meaning Galaxy */}
      <section>
        <h3 className="text-lg font-semibold mb-4 text-[var(--color-retrieval)]">Visual 1 — Meaning Galaxy</h3>
        <GlassCard>
          <MeaningGalaxy />
        </GlassCard>
      </section>

      {/* Visual 2: Query as Magnet */}
      <section>
        <h3 className="text-lg font-semibold mb-4 text-[var(--color-retrieval)]">Visual 2 — Query as Magnet</h3>
        <GlassCard>
          <QueryMagnet />
        </GlassCard>
      </section>

      {/* Visual 3: Chunk Embedding */}
      <section>
        <h3 className="text-lg font-semibold mb-4 text-[var(--color-retrieval)]">Visual 3 — Chunk Embedding</h3>
        <GlassCard>
          <ChunkEmbedding />
        </GlassCard>
      </section>

      </>
      )}

      <ComprehensionCheck
        question="What do we use embeddings for in RAG?"
        options={[
          { label: "To compress the query into fewer tokens", correct: false, feedback: "Compression is a side effect; the main use is retrieval by meaning." },
          { label: "To find documents by semantic similarity, not just keywords", correct: true, feedback: "Correct. Query and docs live in the same vector space; we retrieve nearest neighbors." },
          { label: "To encrypt documents", correct: false, feedback: "Embeddings are for similarity search, not encryption." },
        ]}
        onCorrect={handleCorrect}
      />

      <InstructorNotes title="Instructor notes — Embeddings">
        <p><strong>Talking point:</strong> &quot;These axes are imaginary. In production we have 256–1536 dimensions. The key idea is: same model for query and docs, so distances mean something.&quot;</p>
        <p><strong>Pause and highlight:</strong> After Meaning Galaxy, ask: &quot;Why do Cat and Dog end up close? Why is Pizza far from Lion?&quot;</p>
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
            <p className="text-sm text-textMuted">Level 2 (RAG Journey) is unlocked.</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
