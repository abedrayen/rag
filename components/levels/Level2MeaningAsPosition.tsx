"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useProgress } from "@/context/ProgressContext";
import { useLevelNumber } from "@/context/LevelContext";
import QueryMagnet from "@/components/embeddings/QueryMagnet";
import TriggerQuestion from "@/components/pedagogy/TriggerQuestion";
import ImportanceBlock from "@/components/pedagogy/ImportanceBlock";
import TransitionQuestion from "@/components/pedagogy/TransitionQuestion";
import ContextPanel from "@/components/pedagogy/ContextPanel";
import InstructorNotes from "@/components/pedagogy/InstructorNotes";
import ComprehensionCheck from "@/components/pedagogy/ComprehensionCheck";
import LevelCompleteCard from "@/components/pedagogy/LevelCompleteCard";

export default function Level2MeaningAsPosition() {
  const { completeLevel, isLevelCompleted } = useProgress();
  const levelNumber = useLevelNumber();
  const completedRef = useRef(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleCorrect = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    completeLevel(levelNumber);
  };

  return (
    <div className="space-y-8">
      <p className="text-sm text-textMuted">
        Follow in order: reflect on the question → try the interaction → read the practical case → pass the check.
      </p>
      <TriggerQuestion question="How can a machine understand similarity?" />

      <section>
        <h3 className="text-lg font-semibold text-[var(--color-retrieval)] mb-3">Meaning Galaxy — drag the query</h3>
        <p className="text-sm text-textMuted mb-4">
          Use the query &quot;Domestic animal&quot; (or try &quot;Fast food&quot;). Watch nearest neighbors light up. Explanation appears as you interact.
        </p>
        <div className="grid md:grid-cols-[1fr,280px] gap-6 items-start">
          <QueryMagnet onInteract={() => setHasInteracted(true)} />
          {hasInteracted && (
            <ContextPanel title="Embedded explanation">
              <ul className="space-y-2 text-xs">
                <li><strong className="text-white">Embeddings = coordinates</strong> — Each text is a point in a high-dimensional space. Same model for query and docs.</li>
                <li><strong className="text-white">Similarity = distance</strong> — Closer points are more semantically similar. We use cosine similarity or Euclidean distance.</li>
                <li><strong className="text-white">High dimensions</strong> — In practice we use 256–1536 dimensions, not 2. The 2D view is a simplification.</li>
              </ul>
            </ContextPanel>
          )}
        </div>
      </section>

      {/* Practical case */}
      <section>
        <h3 className="text-lg font-semibold mb-3">Practical case</h3>
        <ContextPanel variant="inline" title="Company knowledge base search">
          A team searches internal docs by meaning: &quot;How do I request a refund?&quot; Keyword search might miss &quot;returns policy&quot; or &quot;money back.&quot; With embeddings, we retrieve chunks that are semantically similar even if words differ.
        </ContextPanel>
      </section>

      <ImportanceBlock
        title="Why embeddings matter"
        whyExists="To enable semantic search—finding by meaning, not just keywords."
        problemSolved="Keyword search fails when users phrase questions differently than the document."
        capabilityUnlocked="Semantic retrieval is the foundation of RAG. Without it, we cannot &quot;ground&quot; the LLM in your documents."
      />

      <ComprehensionCheck
        question="Without embeddings, what is impossible?"
        options={[
          { label: "Faster keyword search", correct: false, feedback: "Keyword search doesn't require embeddings." },
          { label: "Semantic search over a knowledge base", correct: true, feedback: "Correct. Semantic similarity requires a shared vector space (embeddings)." },
          { label: "Larger context windows", correct: false, feedback: "Context window size is a model property, not embedding-dependent." },
        ]}
        onCorrect={handleCorrect}
      />

      <TransitionQuestion
        question="If we can retrieve similar documents… how do we combine that with LLMs?"
        nextLevel="The RAG Journey"
      />

      <InstructorNotes title="Instructor — Level 2">
        <p>Emphasize: &quot;Embeddings are not magic—they're coordinates. Same model, same space, so distance means something.&quot;</p>
      </InstructorNotes>

      <section>
        <h3 className="text-lg font-semibold text-[var(--color-retrieval)] mb-3">The embedding process</h3>
        <p className="text-sm text-textMuted mb-4">
          Text (user query or documents) is converted into high-dimensional vectors by an embedding model. In vector space, similar meanings sit close together—enabling semantic search.
        </p>
        <div className="rounded-xl overflow-hidden border border-border bg-surfaceElevated/50">
          <Image
            src="/embedding.png"
            alt="The embedding process: text encoder converts user query and documents into vectors; vector space shows similar meanings close together for semantic search"
            width={800}
            height={500}
            className="w-full h-auto object-contain"
          />
        </div>
      </section>

      {isLevelCompleted(levelNumber) && (
        <LevelCompleteCard message="Level 3 is now unlocked." />
      )}
    </div>
  );
}
