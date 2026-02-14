"use client";

import SectionWrapper from "../SectionWrapper";
import GlassCard from "../GlassCard";
import ConsoleTerminal from "../ConsoleTerminal";

const BULLETS = [
  {
    title: "Hallucinations",
    desc: "Models confidently invent facts, citations, and numbers when they don't know.",
  },
  {
    title: "No private data",
    desc: "Your docs, DB, and internal knowledge are invisible to the base model.",
  },
  {
    title: "No tool usage",
    desc: "Can't search, compute, or call APIs—just next-token prediction.",
  },
  {
    title: "Knowledge cutoff",
    desc: "OpenAI and others have a training cutoff; no live info.",
  },
];

export default function Section1ProblemLLMs() {
  return (
    <SectionWrapper
      id="problem-llms"
      title="The Problem with LLMs"
      subtitle="They're incredibly fluent. They're also confidently wrong and locked in a box."
    >
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          {BULLETS.map((b, i) => (
            <GlassCard key={b.title} delay={i * 0.1}>
              <h3 className="font-semibold text-accentSecondary mb-1">{b.title}</h3>
              <p className="text-textMuted text-sm">{b.desc}</p>
            </GlassCard>
          ))}
        </div>
        <div>
          <p className="text-textMuted text-sm mb-3">
            Example: vanilla OpenAI model without RAG or tools
          </p>
          <ConsoleTerminal />
        </div>
      </div>
    </SectionWrapper>
  );
}
