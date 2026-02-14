"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useProgress } from "@/context/ProgressContext";
import { useLevelNumber } from "@/context/LevelContext";
import RAGJourneyPedagogical from "@/components/rag-journey/RAGJourneyPedagogical";
import TriggerQuestion from "@/components/pedagogy/TriggerQuestion";
import ImportanceBlock from "@/components/pedagogy/ImportanceBlock";
import LimitationBlock from "@/components/pedagogy/LimitationBlock";
import TransitionQuestion from "@/components/pedagogy/TransitionQuestion";
import ContextPanel from "@/components/pedagogy/ContextPanel";
import InstructorNotes from "@/components/pedagogy/InstructorNotes";
import ComprehensionCheck from "@/components/pedagogy/ComprehensionCheck";
import LevelCompleteCard from "@/components/pedagogy/LevelCompleteCard";
import ChunkComparison from "@/components/diagrams/ChunkComparison";
import ContextTruncationFlow from "@/components/diagrams/ContextTruncationFlow";

export default function Level3RAGJourneyPedagogical() {
  const { completeLevel, isLevelCompleted } = useProgress();
  const levelNumber = useLevelNumber();
  const completedRef = useRef(false);

  const handleCorrect = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    completeLevel(levelNumber);
  };

  return (
    <div className="space-y-8">
      <section className="rounded-xl border border-[var(--color-retrieval)]/40 bg-[var(--color-retrieval)]/5 p-4">
        <p className="text-sm font-semibold text-[var(--color-retrieval)] uppercase tracking-wider mb-1">Abbreviation</p>
        <p className="text-lg font-bold text-white">RAG = Retrieval-Augmented Generation</p>
        <p className="text-sm text-textMuted mt-1">Retrieve relevant documents, then augment the prompt with that context so the LLM can generate a grounded answer.</p>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-[var(--color-retrieval)] mb-3">RAG workflow overview</h3>
        <p className="text-sm text-textMuted mb-4">
          User query → Retriever searches the knowledge base → Generator (LLM) combines query + retrieved docs → Smarter, grounded answer.
        </p>
        <div className="rounded-xl overflow-hidden border border-border bg-surfaceElevated/50">
          <Image
            src="/RAG%20Workflow.jpg"
            alt="RAG workflow: User Query, Knowledge Base, Retriever (search relevant docs), Generator (LLM) combining query and docs, Answer/Response"
            width={800}
            height={450}
            className="w-full h-auto object-contain"
          />
        </div>
      </section>

      <p className="text-textMuted">
        Step 1: Click through each station and read &quot;Why is this step necessary?&quot; Step 2: Reveal the explanation. Step 3: Read practical case and limitation. Step 4: Pass the check to unlock Level 4.
      </p>

      <RAGJourneyPedagogical />

      <section>
        <h3 className="text-lg font-semibold mb-3">Practical case</h3>
        <ContextPanel variant="inline" title="Company FAQ chatbot">
          User asks about refunds, shipping, or account settings. RAG retrieves the right policy chunks and the LLM answers grounded in that context. Without RAG, the model would guess or refuse.
        </ContextPanel>
      </section>

      <ImportanceBlock
        title="Why RAG matters"
        whyExists="To ground the LLM in your data and reduce hallucination."
        problemSolved="Base models cannot access private or up-to-date documents."
        riskReduced="Wrong answers from confident-sounding but ungrounded generation."
        capabilityUnlocked="Q&A over docs, knowledge bases, and internal FAQs."
      />

      <section>
        <h3 className="text-lg font-semibold mb-4">Impact of chunking and retrieval</h3>
        <p className="text-sm text-textMuted mb-4">
          Chunking (how you split documents) and retrieval (which chunks you return) directly determine answer quality. Same LLM, different context → different outcome.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-red-500/40 bg-red-500/5 p-4">
            <h4 className="text-sm font-semibold text-red-400 mb-2">Bad chunking & retrieval</h4>
            <ul className="text-sm text-textMuted space-y-1.5">
              <li>• <strong className="text-white">Chunks too large:</strong> Mixed topics in one chunk; retrieval returns irrelevant paragraphs, diluting the answer.</li>
              <li>• <strong className="text-white">Chunks too small:</strong> No enough context per chunk; the model sees fragments and may miss the full picture.</li>
              <li>• <strong className="text-white">Wrong chunk ranked first:</strong> Top result is off-topic; the LLM still conditions on it and produces a wrong or vague answer.</li>
              <li>• <strong className="text-white">No reranking:</strong> Raw similarity returns near-duplicates or tangentially related docs; key doc is buried below top-k.</li>
            </ul>
            <p className="text-xs text-red-300 mt-3">Result: Hallucination, wrong citations, or &quot;I don&apos;t see that in the context.&quot;</p>
          </div>
          <div className="rounded-xl border border-green-500/40 bg-green-500/5 p-4">
            <h4 className="text-sm font-semibold text-green-400 mb-2">Good chunking & retrieval</h4>
            <ul className="text-sm text-textMuted space-y-1.5">
              <li>• <strong className="text-white">Semantic chunks:</strong> Each chunk is a coherent unit (e.g. one concept or one section); retrieval matches query intent.</li>
              <li>• <strong className="text-white">Right size:</strong> Enough context to answer, not so much that key info is lost in the middle of a giant block.</li>
              <li>• <strong className="text-white">Relevant top-k:</strong> Retrieved chunks actually support the question; the model has the right evidence to cite.</li>
              <li>• <strong className="text-white">Optional reranking:</strong> A second-stage model or heuristic improves precision so the best chunks are first.</li>
            </ul>
            <p className="text-xs text-green-300 mt-3">Result: Grounded, accurate answers with correct sources.</p>
          </div>
        </div>
        <div className="mt-6">
          <h4 className="text-sm font-semibold text-white mb-3">Example: right chunking</h4>
          <ChunkComparison />
        </div>
        <div className="mt-6">
          <h4 className="text-sm font-semibold text-white mb-3">Truncation in the context flow</h4>
          <ContextTruncationFlow />
        </div>
      </section>

      <LimitationBlock
        title="Limitation — when RAG fails"
        scenarios={[
          "Wrong retrieval: the closest chunk is irrelevant, so the answer is wrong or off-topic.",
          "Context overflow: too many chunks; key info is truncated and the model misses it.",
        ]}
        triggerQuestion="Can RAG execute a task?"
      />

      <ContextPanel variant="inline" title="Reflection">
        RAG retrieves and generates. It does not plan, call APIs, or take multi-step actions. For that we need agents.
      </ContextPanel>

      <ComprehensionCheck
        question="Why must context be injected before the LLM generates?"
        options={[
          { label: "To reduce token cost", correct: false, feedback: "Cost is a side effect; the main reason is conditioning." },
          { label: "The model conditions on the prompt; if context isn't there, it can't use it", correct: true, feedback: "Correct. Generation is conditional on the full prompt." },
          { label: "To encrypt the answer", correct: false, feedback: "Context injection is about providing information, not encryption." },
        ]}
        onCorrect={handleCorrect}
      />

      <TransitionQuestion
        question="If RAG retrieves information… who decides what to do with it?"
        nextLevel="Agents Enter"
      />

      <InstructorNotes title="Instructor — Level 3">
        <p>At each station, pause and ask the station question before revealing the explanation.</p>
        <p>Emphasize: RAG is retrieve + generate. No execution, no tools, no multi-step plan.</p>
      </InstructorNotes>

      <section>
        <h3 className="text-lg font-semibold text-[var(--color-retrieval)] mb-3">RAG pipeline: detailed steps</h3>
        <p className="text-sm text-textMuted mb-4">
          From query vectorization and embedding to the vector store, retriever (top-k), and generator that combines query + docs and cites sources.
        </p>
        <div className="rounded-xl overflow-hidden border border-border bg-surfaceElevated/50">
          <Image
            src="/RAG%20details.png"
            alt="RAG detailed steps: Vectorization, Embedding, Vector Store, Retriever (top-k docs), Generator (LLM) with prompt + docs, answer with sources"
            width={800}
            height={500}
            className="w-full h-auto object-contain"
          />
        </div>
      </section>

      {isLevelCompleted(levelNumber) && (
        <LevelCompleteCard message="Level 4 is now unlocked." />
      )}
    </div>
  );
}
