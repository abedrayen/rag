"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useProgress } from "@/context/ProgressContext";
import { useLevelNumber } from "@/context/LevelContext";
import StepByStep from "@/components/pedagogy/StepByStep";
import TriggerQuestion from "@/components/pedagogy/TriggerQuestion";
import ImportanceBlock from "@/components/pedagogy/ImportanceBlock";
import TransitionQuestion from "@/components/pedagogy/TransitionQuestion";
import ContextPanel from "@/components/pedagogy/ContextPanel";
import LevelCompleteCard from "@/components/pedagogy/LevelCompleteCard";
import InstructorNotes from "@/components/pedagogy/InstructorNotes";

const IMPRESSIVE_ANSWER = "Our Q4 revenue was $2.4M, up 12% YoY. The growth was driven by enterprise contracts and the new API tier.";
const HALLUCINATION_REVEAL = "I don't have access to your company data. The numbers above were invented. I'm a next-token predictor—I have no retrieval mechanism.";

export default function Level1Illusion() {
  const { completeLevel, isLevelCompleted } = useProgress();
  const levelNumber = useLevelNumber();
  const completedRef = useRef(false);
  const [showReveal, setShowReveal] = useState(false);
  const [dbAnswer, setDbAnswer] = useState<"yes" | "no" | null>(null);

  const completeLevelOne = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    completeLevel(levelNumber);
  };

  const steps = [
    {
      title: "Step 1 — An impressive answer",
      content: (
        <div className="space-y-3">
          <p className="text-sm text-textMuted">Imagine asking: &quot;What was our Q4 revenue?&quot;</p>
          <div className="glass rounded-xl p-4 border border-[var(--color-llm)]/30">
            <p className="text-[var(--color-llm)]">{IMPRESSIVE_ANSWER}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Step 2 — The reveal",
      content: (
        <div className="space-y-3">
          <p className="text-sm text-textMuted">What does the model actually have access to?</p>
          <button
            onClick={() => setShowReveal(true)}
            className="px-4 py-2 rounded-lg border border-amber-500/50 bg-amber-500/10 text-amber-400 text-sm font-medium"
          >
            {showReveal ? "Revealed" : "Reveal the truth"}
          </button>
          {showReveal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-xl border border-red-500/40 bg-red-500/10 p-4"
            >
              <p className="text-sm text-red-200">{HALLUCINATION_REVEAL}</p>
            </motion.div>
          )}
        </div>
      ),
    },
    {
      title: "Step 3 — Reflect",
      content: (
        <TriggerQuestion question="If the model sounds confident, does that mean it knows?" />
      ),
    },
    {
      title: "Step 4 — Check your intuition",
      content: (
        <div className="space-y-3">
          <p className="text-sm text-textMuted">Does the model access your database?</p>
          <div className="flex gap-4">
            <button
              onClick={() => setDbAnswer("yes")}
              className={`px-4 py-3 rounded-xl border text-sm font-medium transition-colors ${dbAnswer === "yes" ? "border-red-500/50 bg-red-500/10" : "border-border hover:bg-white/5"}`}
            >
              Yes
            </button>
            <button
              onClick={() => {
                setDbAnswer("no");
                completeLevelOne();
              }}
              className={`px-4 py-3 rounded-xl border text-sm font-medium transition-colors ${dbAnswer === "no" ? "border-green-500/50 bg-green-500/10" : "border-border hover:bg-white/5"}`}
            >
              No
            </button>
          </div>
          {dbAnswer === "no" && (
            <ContextPanel variant="inline" title="Correct">
              Base LLMs have no retrieval mechanism. To use your data, we need to add retrieval (e.g. RAG) or tools.
            </ContextPanel>
          )}
        </div>
      ),
    },
    {
      title: "Step 5 — How it works (mechanism)",
      content: (
        <div className="space-y-3">
          <ContextPanel title="Probabilistic next-token prediction">
            The model outputs a probability distribution over the next token. No &quot;lookup&quot;—only matrix multiplications over fixed weights.
          </ContextPanel>
          <ContextPanel title="No real-time knowledge">
            Training has a cutoff. The model cannot see your DB or the internet at inference unless we inject it in the prompt.
          </ContextPanel>
          <ContextPanel title="No retrieval mechanism">
            RAG and tool use are added by the application layer.
          </ContextPanel>
        </div>
      ),
    },
    {
      title: "Step 6 — Why this matters",
      content: (
        <div className="space-y-4">
          <ImportanceBlock
            title="Why this matters in real systems"
            whyExists="To avoid trusting confident-sounding but false answers in high-stakes domains."
            problemSolved="Base models cannot ground answers in private or up-to-date data."
            riskReduced="Legal, medical, and financial risk."
          />
          <TransitionQuestion
            question="If models don't retrieve knowledge… how can we make them grounded?"
            nextLevel="Meaning as Position (Embeddings)"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <p className="text-textMuted">
        We start by exposing a misconception: that LLMs &quot;know&quot; things. Go through each step in order.
      </p>

      <div className="glass rounded-xl p-6">
        <StepByStep steps={steps} />
      </div>

      <section className="mt-10">
        <h3 className="text-lg font-semibold text-[var(--color-retrieval)] mb-3">LLMs vs RAG</h3>
        <p className="text-sm text-textMuted mb-4">
          Standalone LLMs lack up-to-date or private data and can hallucinate. RAG adds a retriever and knowledge base so the generator can answer with grounded, sourced responses.
        </p>
        <div className="rounded-xl overflow-hidden border border-border bg-surfaceElevated/50">
          <Image
            src="/LLMs%20vs%20RAG.png"
            alt="Comparison: LLM limitations (out-of-date info, hallucinations, no sources) vs RAG system (Retriever + Knowledge Base + Generator producing sourced answers)"
            width={800}
            height={500}
            className="w-full h-auto object-contain"
          />
        </div>
      </section>

      {isLevelCompleted(levelNumber) && (
        <LevelCompleteCard message="Level 2 is now unlocked. You can continue to the next level below." />
      )}

      <InstructorNotes title="Instructor — Level 1">
        <p>Pause after the reveal. Ask: &quot;Who has seen a model give a confident wrong answer?&quot;</p>
      </InstructorNotes>
    </div>
  );
}
