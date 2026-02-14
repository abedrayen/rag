"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useProgress } from "@/context/ProgressContext";
import { useLevelNumber } from "@/context/LevelContext";
import RAGJourney from "@/components/rag-journey/RAGJourney";
import LevelModeTabs from "@/components/pedagogy/LevelModeTabs";
import InstructorNotes from "@/components/pedagogy/InstructorNotes";
import ComprehensionCheck from "@/components/pedagogy/ComprehensionCheck";
import { useLevelView } from "@/context/LevelViewContext";

export default function Level2RAGJourney() {
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
          <h3 className="font-semibold text-[var(--color-retrieval)]">Concept: RAG pipeline</h3>
          <p className="text-textMuted text-sm">
            RAG = Retrieval-Augmented Generation. The query is embedded, then we search a vector database for the top-K most similar chunks. Those chunks are injected into the prompt as context. The LLM then generates an answer grounded in that context—reducing hallucination and enabling use of your private data.
          </p>
        </div>
      ) : (
        <>
      <p className="text-textMuted">
        A glowing Query Orb travels through 5 stations. Click each station to see what happens. Use Instructor mode for deeper explanations.
      </p>

      <RAGJourney />
      </>
      )}

      <ComprehensionCheck
        question="When is context injected in the RAG pipeline?"
        options={[
          { label: "After the LLM generates the answer", correct: false, feedback: "Context must be available before generation so the model can condition on it." },
          { label: "Before the LLM generates—as part of the prompt", correct: true, feedback: "Correct. Retrieved chunks are placed in the prompt (e.g. SYSTEM + CONTEXT + USER) before the model runs." },
          { label: "Only when using OpenAI", correct: false, feedback: "Context injection is a core RAG pattern for any provider." },
        ]}
        onCorrect={handleCorrect}
      />

      <InstructorNotes title="Instructor notes — RAG Journey">
        <p><strong>Pause points:</strong> At each station, pause and ask &quot;What could go wrong here?&quot; (e.g. bad embedding, stale index, context overflow at Station 3).</p>
        <p><strong>Without RAG vs With RAG:</strong> Emphasize that the same LLM can hallucinate without context and stay grounded with it.</p>
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
            <p className="text-sm text-textMuted">Level 3 (The RAG Pipeline) is unlocked.</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
