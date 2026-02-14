"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useProgress } from "@/context/ProgressContext";
import { useLevelNumber } from "@/context/LevelContext";
import ContextPanel from "@/components/pedagogy/ContextPanel";
import InstructorNotes from "@/components/pedagogy/InstructorNotes";
import ComprehensionCheck from "@/components/pedagogy/ComprehensionCheck";
import LevelCompleteCard from "@/components/pedagogy/LevelCompleteCard";

const NODES = [
  { id: "email", label: "Email", color: "var(--color-llm)", what: "Raw input.", why: "Trigger for the pipeline.", ifRemoved: "No input—pipeline doesn't run." },
  { id: "intent", label: "Intent extraction", color: "var(--color-llm)", what: "LLM extracts intent (e.g. 'assign React dev').", why: "Structured understanding for downstream steps.", ifRemoved: "RAG and agent get raw text; harder to route and act." },
  { id: "rag", label: "RAG", color: "var(--color-retrieval)", what: "Retrieve relevant chunks (e.g. freelancer profiles).", why: "Ground the agent in your data.", ifRemoved: "Agent has no document context—guesses or fails." },
  { id: "agent", label: "Agent", color: "var(--color-agent)", what: "Decide and act (e.g. pick freelancer, create assignment).", why: "Multi-step reasoning and tool use.", ifRemoved: "No decision or action—only retrieval + one-shot answer." },
  { id: "output", label: "Output", color: "var(--color-tools)", what: "Structured result (e.g. assignment JSON).", why: "Consumable by other systems.", ifRemoved: "No structured output—downstream systems can't use it." },
];

export default function Level5ProductionArchitecture() {
  const { completeLevel, isLevelCompleted } = useProgress();
  const levelNumber = useLevelNumber();
  const completedRef = useRef(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [reflection, setReflection] = useState("");

  const handleCorrect = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    completeLevel(levelNumber);
  };

  return (
    <div className="space-y-8">
      <p className="text-textMuted">
        Final level. Step 1: Click each node to expand (what / why / if removed). Step 2: Read the reflection questions. Step 3: Answer the final reflection. Step 4: Pass the check to complete the journey.
      </p>

      <section>
        <div className="flex flex-wrap items-center gap-2 justify-center">
          {NODES.map((n, i) => (
            <div key={n.id} className="flex items-center gap-1">
              <motion.button
                onClick={() => setExpanded(expanded === n.id ? null : n.id)}
                className="rounded-xl border-2 px-4 py-3 text-sm font-medium transition-colors min-w-[100px]"
                style={{
                  borderColor: expanded === n.id ? n.color : "var(--border)",
                  background: expanded === n.id ? `${n.color}20` : "transparent",
                }}
              >
                {n.label}
              </motion.button>
              {i < NODES.length - 1 && <span className="text-textMuted">→</span>}
            </div>
          ))}
        </div>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4"
          >
            <ContextPanel title={NODES.find((x) => x.id === expanded)?.label}>
              <ul className="space-y-2 text-sm">
                <li><strong className="text-white">What it does:</strong> {NODES.find((x) => x.id === expanded)?.what}</li>
                <li><strong className="text-white">Why it exists:</strong> {NODES.find((x) => x.id === expanded)?.why}</li>
                <li><strong className="text-white">What if removed:</strong> {NODES.find((x) => x.id === expanded)?.ifRemoved}</li>
              </ul>
            </ContextPanel>
          </motion.div>
        )}
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-3">Architectural reflection</h3>
        <ContextPanel variant="inline" title="What breaks if we remove embeddings?">
          No semantic retrieval—we can't find relevant chunks by meaning. RAG collapses; the agent (or LLM) has no grounded context.
        </ContextPanel>
        <div className="mt-3">
        <ContextPanel variant="inline" title="What breaks if we remove the agent?">
          We only have retrieve + one-shot generate. No multi-step planning, no tool calls, no assignment creation—just an answer.
        </ContextPanel>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-3">Final reflection</h3>
        <p className="text-sm text-textMuted mb-2">
          Design an AI system for a medical QA platform. What architecture would you choose?
        </p>
        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="e.g. RAG over medical guidelines + guardrails; maybe an agent for multi-step lookup..."
          className="w-full h-24 px-3 py-2 rounded-lg bg-black/40 border border-border text-sm placeholder-textMuted resize-none"
        />
      </section>

      <ComprehensionCheck
        question="In the case study, what is the role of RAG?"
        options={[
          { label: "To send the email", correct: false, feedback: "Email is input; RAG retrieves documents." },
          { label: "To retrieve relevant data (e.g. freelancer profiles) so the agent can decide", correct: true, feedback: "Correct. RAG grounds the agent in your data." },
          { label: "To replace the agent", correct: false, feedback: "RAG and agent are complementary; RAG retrieves, agent decides and acts." },
        ]}
        onCorrect={handleCorrect}
      />

      <InstructorNotes title="Instructor — Level 5">
        <p>Use the final reflection as a discussion prompt. Compare RAG-only vs RAG+agent for medical QA (safety, citations, escalation).</p>
      </InstructorNotes>

      {isLevelCompleted(levelNumber) && (
        <LevelCompleteCard message="You've completed the cognitive journey: illusion → embeddings → RAG → agents → production." />
      )}
    </div>
  );
}
