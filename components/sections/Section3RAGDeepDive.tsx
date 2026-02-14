"use client";

import { motion } from "framer-motion";
import SectionWrapper from "../SectionWrapper";
import GlassCard from "../GlassCard";
import EmbeddingVisual from "../diagrams/EmbeddingVisual";
import ChunkComparison from "../diagrams/ChunkComparison";
import RAGPipelineSim from "../diagrams/RAGPipelineSim";
import QuizCard from "../QuizCard";

const FAILURES = [
  "Chunks too big or too small → bad retrieval",
  "Wrong embedding model for domain (e.g. code vs prose)",
  "No reranking → irrelevant chunks in context",
  "Context overflow → truncation, lost key info",
  "Stale index → outdated answers",
];

export default function Section3RAGDeepDive() {
  return (
    <SectionWrapper
      id="rag-deep-dive"
      title="Deep Dive into RAG"
      subtitle="Retrieval-Augmented Generation: grounding LLMs in your data."
    >
      <div className="space-y-16">
        <div>
          <h3 className="text-xl font-semibold mb-4">Embeddings (simplified)</h3>
          <GlassCard>
            <EmbeddingVisual />
          </GlassCard>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Vector databases</h3>
          <GlassCard>
            <p className="text-textMuted text-sm mb-4">
              Store embeddings; query by similarity (cosine, dot product). Examples: Pinecone,
              Weaviate, pgvector, Chroma. Index once, query at inference.
            </p>
            <div className="font-mono text-xs text-accentSecondary bg-black/30 rounded-lg p-4">
              SELECT * FROM chunks ORDER BY embedding &lt;&gt; query_embedding LIMIT 5
            </div>
          </GlassCard>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Chunking: good vs bad</h3>
          <ChunkComparison />
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">RAG pipeline (interactive)</h3>
          <GlassCard>
            <RAGPipelineSim />
          </GlassCard>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Common RAG failures</h3>
          <ul className="space-y-2">
            {FAILURES.map((f, i) => (
              <motion.li
                key={f}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-2 text-textMuted"
              >
                <span className="text-amber-400">⚠</span> {f}
              </motion.li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Quick check</h3>
          <QuizCard
            question="What's the main role of chunking in RAG?"
            options={[
              {
                label: "To reduce API cost",
                correct: false,
                explanation: "Cost is a side effect; the main role is retrieval quality.",
              },
              {
                label: "To create semantically coherent units for retrieval",
                correct: true,
                explanation: "Good chunks match query intent and avoid mixing unrelated info.",
              },
              {
                label: "To encrypt documents",
                correct: false,
                explanation: "Chunking is about splitting text, not encryption.",
              },
            ]}
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
