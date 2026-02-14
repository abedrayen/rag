"use client";

import { useState } from "react";
import SectionWrapper from "../SectionWrapper";
import { motion } from "framer-motion";

const RAG_USE = [
  "Q&A over your docs/knowledge base",
  "Structured content, stable schema",
  "Lower latency, lower cost",
  "When one retrieval + one generation is enough",
];

const AGENT_USE = [
  "Multi-step tasks (research, planning, coding)",
  "Need for tools (search, API, code execution)",
  "Decisions that depend on external state",
  "When you need iteration and branching",
];

export default function Section6RAGvsAgents() {
  const [mode, setMode] = useState<"rag" | "agent" | null>(null);

  return (
    <SectionWrapper
      id="rag-vs-agents"
      title="When to use RAG vs Agents"
      subtitle="Pick the right architecture for the problem."
    >
      <div className="space-y-8">
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => setMode("rag")}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              mode === "rag" ? "bg-accent text-white" : "glass hover:bg-white/5"
            }`}
          >
            Use RAG
          </button>
          <button
            onClick={() => setMode("agent")}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              mode === "agent" ? "bg-accentSecondary text-surface" : "glass hover:bg-white/5"
            }`}
          >
            Use Agents
          </button>
        </div>
        {mode && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-2 gap-6"
          >
            <div className="glass rounded-xl p-6">
              <h4 className="font-semibold text-accentSecondary mb-4">RAG</h4>
              <ul className="space-y-2 text-textMuted text-sm">
                {RAG_USE.map((u) => (
                  <li key={u}>• {u}</li>
                ))}
              </ul>
            </div>
            <div className="glass rounded-xl p-6">
              <h4 className="font-semibold text-accentSecondary mb-4">Agents</h4>
              <ul className="space-y-2 text-textMuted text-sm">
                {AGENT_USE.map((u) => (
                  <li key={u}>• {u}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
        <p className="text-center text-textMuted text-sm">
          Often both: RAG for context, agent for orchestration and tools.
        </p>
      </div>
    </SectionWrapper>
  );
}
