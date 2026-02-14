"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useProgress } from "@/context/ProgressContext";
import { useLevelNumber } from "@/context/LevelContext";
import { useLevelView } from "@/context/LevelViewContext";
import HallucinationDemo from "@/components/HallucinationDemo";
import QuizCard from "@/components/QuizCard";
import ConsoleTerminal from "@/components/ConsoleTerminal";
import GlassCard from "@/components/GlassCard";
import LevelModeTabs from "@/components/pedagogy/LevelModeTabs";
import ExplainablePanel from "@/components/pedagogy/ExplainablePanel";
import InstructorNotes from "@/components/pedagogy/InstructorNotes";

const BULLETS = [
  { title: "Hallucinations", desc: "Models confidently invent facts when they don't know." },
  { title: "No private data", desc: "Your docs and DB are invisible to the base model." },
  { title: "No tool usage", desc: "Can't search or call APIs—just next-token prediction." },
];

const CONCEPT_LLM_LIMITS = {
  what: "LLMs are large neural networks that predict the next token. They have no built-in access to databases, APIs, or private documents.",
  why: "We need to understand their limits so we don't trust them for facts they weren't trained on or can't retrieve.",
  how: "They are trained on vast text; at inference they only see the prompt and generate token-by-token. No 'lookup' step exists unless we add RAG or tools.",
  limitations: "Hallucinations, knowledge cutoff, no private data, no tool use. Prompting alone cannot add capabilities.",
  when: "Use base LLMs for general language tasks. Add RAG when you need your data; add agents when you need tools and multi-step reasoning.",
};

export default function Level1Illusion() {
  const { completeLevel, isLevelCompleted } = useProgress();
  const levelNumber = useLevelNumber();
  const { mode } = useLevelView();
  const completedRef = useRef(false);
  const [showWhatModelKnows, setShowWhatModelKnows] = useState(false);

  const handleQuizCorrect = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    completeLevel(levelNumber);
  };

  return (
    <div className="space-y-8">
      <LevelModeTabs levelNumber={levelNumber} />

      {mode === "explanation" ? (
        <>
          <ExplainablePanel
            title="LLM limitations"
            concept={CONCEPT_LLM_LIMITS}
            defaultOpen
          />
          <div className="glass rounded-xl p-6 space-y-4">
            <h3 className="font-semibold text-[var(--color-llm)]">Concept summary</h3>
            <ul className="text-sm text-textMuted space-y-2">
              <li>• <strong className="text-white">Why hallucinations happen:</strong> The model optimizes for plausible next tokens, not factual correctness. It has no “I don’t know” signal unless we add guardrails.</li>
              <li>• <strong className="text-white">Why static models can’t access private DB:</strong> Inference is a forward pass over weights + prompt. No external data is read unless we inject it (e.g. RAG) or call tools.</li>
              <li>• <strong className="text-white">Why prompting alone isn’t enough:</strong> Prompts can’t add new knowledge or actions; they only steer existing capabilities.</li>
            </ul>
          </div>
        </>
      ) : (
        <>
          <p className="text-textMuted">
            LLMs are fluent but limited: no access to your data, no tools, and a tendency to confidently guess.
          </p>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-textMuted">Toggle:</span>
            <button
              onClick={() => setShowWhatModelKnows(!showWhatModelKnows)}
              className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${
                showWhatModelKnows ? "border-[var(--color-llm)] bg-[var(--color-llm)]/10" : "border-border"
              }`}
            >
              Show what the model actually knows
            </button>
          </div>
          {showWhatModelKnows && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="glass rounded-xl p-4 border border-[var(--color-llm)]/30"
            >
              <p className="text-sm text-textMuted">
                <strong className="text-[var(--color-llm)]">Training data only</strong> — fixed snapshot of public text. No real-time info, no your docs, no DB. “Knowledge” is encoded in weights; no lookup at inference.
              </p>
            </motion.div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {BULLETS.map((b, i) => (
                <GlassCard key={b.title} delay={i * 0.08}>
                  <h3 className="font-semibold text-accentSecondary mb-1">{b.title}</h3>
                  <p className="text-textMuted text-sm">{b.desc}</p>
                </GlassCard>
              ))}
            </div>
            <div>
              <p className="text-textMuted text-sm mb-3">Vanilla model without RAG or tools</p>
              <ConsoleTerminal />
            </div>
          </div>

          <HallucinationDemo />
        </>
      )}

      <div>
        <h3 className="text-lg font-semibold mb-4">Unlock Level 2</h3>
        <QuizCard
          question="Can LLMs access your private database by default?"
          options={[
            { label: "Yes, they have read access", correct: false, explanation: "Base models only know their training data; they can't query your DB." },
            { label: "No—they have no direct access to your data", correct: true, explanation: "Correct. You need RAG or tools to ground them in your data." },
            { label: "Only if you use OpenAI", correct: false, explanation: "No provider gives base models access to your private data." },
          ]}
          onCorrect={handleQuizCorrect}
        />
      </div>

      <InstructorNotes title="Instructor notes — Level 1">
        <p><strong>Hallucination mechanics:</strong> Explain that the model has no “confidence” score for facts—it just predicts next tokens. Emphasize that citations can be hallucinated too.</p>
        <p><strong>Key question to ask:</strong> “What would happen if we asked this model about our internal revenue?” (No access → may guess or refuse.)</p>
        <p><strong>Pitfall:</strong> Audiences often assume “bigger model” = “knows more.” Clarify: same training cutoff; we need RAG/tools for new or private data.</p>
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
            <p className="text-sm text-textMuted">Level 2 is now unlocked.</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
