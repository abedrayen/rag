"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useProgress } from "@/context/ProgressContext";
import { useLevelNumber } from "@/context/LevelContext";
import EmbeddingVisual from "@/components/diagrams/EmbeddingVisual";
import ChunkComparison from "@/components/diagrams/ChunkComparison";
import RAGPipelineSim from "@/components/diagrams/RAGPipelineSim";
import GlassCard from "@/components/GlassCard";
import AIJokeTooltip from "@/components/AIJokeTooltip";

const DOCS = [
  { id: "a", title: "Employee Handbook", snippet: "PTO policy, benefits..." },
  { id: "b", title: "Q4 Revenue Report 2024", snippet: "Revenue: $2.4M. Growth 12%." },
  { id: "c", title: "Meeting Notes Q3", snippet: "Action items, attendees..." },
];
const QUERY = "What was our Q4 revenue?";

export default function Level2RAG() {
  const { completeLevel, isLevelCompleted } = useProgress();
  const levelNumber = useLevelNumber();
  const completedRef = useRef(false);

  const handleCorrectRetrieve = (id: string) => {
    if (id !== "b" || completedRef.current) return;
    completedRef.current = true;
    completeLevel(levelNumber);
  };

  return (
    <div className="space-y-10">
      <p className="text-textMuted">
        RAG grounds the LLM in your data: embed, retrieve similar chunks,
        <AIJokeTooltip joke="Finally, retrieval that doesn't depend on Ctrl+F.">
          <span className="text-accent cursor-help border-b border-dotted border-accent"> then generate</span>.
        </AIJokeTooltip>
      </p>

      <div>
        <h3 className="text-lg font-semibold mb-4">Embeddings (vector space)</h3>
        <GlassCard>
          <EmbeddingVisual />
        </GlassCard>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Simulate retrieval</h3>
        <p className="text-textMuted text-sm mb-3">
          Query: &quot;{QUERY}&quot; — Click the document that should be retrieved.
        </p>
        <GlassCard>
          <div className="space-y-2">
            {DOCS.map((d) => (
              <motion.button
                key={d.id}
                onClick={() => handleCorrectRetrieve(d.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full text-left p-4 rounded-xl border transition-colors ${
                  d.id === "b"
                    ? "border-accent/50 hover:bg-accent/10"
                    : "border-border hover:bg-white/5"
                }`}
              >
                <span className="font-medium">{d.title}</span>
                <span className="text-textMuted text-sm block mt-1">{d.snippet}</span>
              </motion.button>
            ))}
          </div>
          <p className="text-xs text-textMuted mt-3">
            Correct choice: Q4 Revenue Report — similarity search would return it for this query.
          </p>
        </GlassCard>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Chunking: good vs bad</h3>
        <ChunkComparison />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">RAG pipeline</h3>
        <GlassCard>
          <RAGPipelineSim />
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
            <p className="text-sm text-textMuted">Level 3 is unlocked. See when RAG breaks.</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
