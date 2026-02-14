"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useProgress } from "@/context/ProgressContext";
import { useLevelNumber } from "@/context/LevelContext";
import TriggerQuestion from "@/components/pedagogy/TriggerQuestion";
import ImportanceBlock from "@/components/pedagogy/ImportanceBlock";
import LimitationBlock from "@/components/pedagogy/LimitationBlock";
import TransitionQuestion from "@/components/pedagogy/TransitionQuestion";
import ContextPanel from "@/components/pedagogy/ContextPanel";
import InstructorNotes from "@/components/pedagogy/InstructorNotes";
import ComprehensionCheck from "@/components/pedagogy/ComprehensionCheck";
import LevelCompleteCard from "@/components/pedagogy/LevelCompleteCard";

const TOOLS = [
  { id: "search", label: "Search freelancers", result: "Alice (React, 5y), Bob (Node, 3y), Carol (React, 2y)" },
  { id: "email", label: "Read email", result: "Client needs React dev, 3 months, starts next week." },
  { id: "assign", label: "Create assignment", result: "Assignment created: Alice, start Mon." },
];

export default function Level4AgentsEnter() {
  const { completeLevel, isLevelCompleted } = useProgress();
  const levelNumber = useLevelNumber();
  const completedRef = useRef(false);
  const [step, setStep] = useState<"reason" | "act" | "observe">("reason");
  const [toolCalled, setToolCalled] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleToolSelect = (id: string) => {
    setToolCalled(id);
    setStep("observe");
    setShowExplanation(true);
  };

  const handleCorrect = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    completeLevel(levelNumber);
  };

  return (
    <div className="space-y-8">
      <p className="text-sm text-textMuted">
        Step 1: Read the case. Step 2: Reflect on the question. Step 3: Try the ReAct simulation. Step 4: Pass the check to unlock Level 5.
      </p>
      <section>
        <h3 className="text-lg font-semibold text-[var(--color-agent)] mb-3">Practical case</h3>
        <ContextPanel variant="inline" title="Incoming client email → assign best freelancer">
          The system must: understand the email, search freelancer profiles (RAG), decide who fits, and create an assignment. Retrieving information alone is not enough—something must decide and act.
        </ContextPanel>
      </section>

      <TriggerQuestion question="Is retrieving information enough?" />

      <section>
        <h3 className="text-lg font-semibold mb-3">ReAct loop — try it</h3>
        <p className="text-sm text-textMuted mb-4">
          Simulate one cycle: Reason → Act (choose a tool) → Observe (see result). Explanation appears when you act.
        </p>
        <div className="glass rounded-xl p-6 space-y-4">
          <div className="flex flex-wrap gap-2">
            <span className={`px-3 py-1.5 rounded-lg text-sm ${step === "reason" ? "bg-[var(--color-agent)]/20 border border-[var(--color-agent)]" : "border border-border"}`}>Reason</span>
            <span className="px-3 py-1.5 rounded-lg text-sm border border-[var(--color-tools)]/50">Act</span>
            <span className={`px-3 py-1.5 rounded-lg text-sm ${step === "observe" ? "bg-[var(--color-retrieval)]/20 border border-[var(--color-retrieval)]" : "border border-border"}`}>Observe</span>
          </div>
          <p className="text-sm text-textMuted">Current step: <strong className="text-white">{step}</strong>. Select a tool to call.</p>
          <div className="flex flex-wrap gap-3">
            {TOOLS.map((t) => (
              <button
                key={t.id}
                onClick={() => handleToolSelect(t.id)}
                className={`px-4 py-3 rounded-xl border text-sm font-medium transition-colors ${toolCalled === t.id ? "border-[var(--color-tools)] bg-[var(--color-tools)]/10" : "border-border hover:border-[var(--color-tools)]/50"}`}
              >
                {t.label}
              </button>
            ))}
          </div>
          {toolCalled && (
            <div className="rounded-lg border border-border p-3 bg-black/30">
              <p className="text-xs text-textMuted mb-1">Tool result:</p>
              <p className="text-sm text-white">{TOOLS.find((x) => x.id === toolCalled)?.result}</p>
            </div>
          )}
          {showExplanation && (
            <ContextPanel title="When the tool is called — embedded explanation">
              <ul className="space-y-1 text-xs">
                <li><strong className="text-white">Planning:</strong> The agent chose which tool to call based on the task.</li>
                <li><strong className="text-white">Observation:</strong> The result is fed back into context; the agent can reason again.</li>
                <li><strong className="text-white">Iteration:</strong> The loop continues until the task is done or max steps.</li>
                <li><strong className="text-white">State:</strong> Conversation and tool results are the agent's state.</li>
              </ul>
            </ContextPanel>
          )}
        </div>
      </section>

      <ImportanceBlock
        title="Why agents matter"
        whyExists="To automate multi-step tasks that need tools and decisions."
        problemSolved="RAG alone cannot execute—search, API calls, or create records."
        capabilityUnlocked="Automation, multi-step reasoning, tool orchestration (search, DB, email)."
      />

      <LimitationBlock
        title="Limitation"
        scenarios={[
          "Higher cost: multiple LLM calls and tool calls per task.",
          "Complexity: more moving parts, harder to debug.",
          "Instability: wrong tool choice, loops, or timeouts.",
        ]}
        triggerQuestion="When should we use RAG alone, and when combine it with agents?"
      />

      <ComprehensionCheck
        question="What does the agent do that RAG does not?"
        options={[
          { label: "Retrieve documents", correct: false, feedback: "RAG does retrieval too." },
          { label: "Call tools and iterate (plan, act, observe) until the task is done", correct: true, feedback: "Correct. Agents add tool use and a loop." },
          { label: "Generate text", correct: false, feedback: "Both RAG and agents use an LLM to generate." },
        ]}
        onCorrect={handleCorrect}
      />

      <TransitionQuestion
        question="When should we use RAG alone, and when combine it with agents?"
        nextLevel="Production Architecture"
      />

      <InstructorNotes title="Instructor — Level 4">
        <p>RAG = retrieve + generate, one shot. Agents = reason + act + observe, loop. Use RAG for Q&A; add agents when you need tools or multi-step workflows.</p>
      </InstructorNotes>

      {isLevelCompleted(levelNumber) && (
        <LevelCompleteCard message="Level 5 is now unlocked." />
      )}
    </div>
  );
}
