"use client";

import { useState } from "react";
import SectionWrapper from "../SectionWrapper";
import { motion, AnimatePresence } from "framer-motion";

const FLOW = [
  { id: "email", label: "Read email", out: "Intent: hire React dev, 3 months" },
  { id: "rag", label: "RAG: freelancer profiles", out: "Top 5 candidates (vector search)" },
  { id: "agent", label: "Agent: decide best fit", out: "Ranking + reasoning" },
  { id: "output", label: "Structured assignment", out: "JSON: assignee, start, scope" },
];

export default function Section5CaseStudy() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <SectionWrapper
      id="case-study"
      title="Real-world case study"
      subtitle="AI that reads email, retrieves freelancers (RAG), picks one (Agent), and outputs an assignment."
    >
      <div className="space-y-8">
        <p className="text-textMuted max-w-2xl">
          One system combines intent extraction, RAG over a freelancer knowledge base, and an
          agent that reasons over candidates and produces structured output.
        </p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {FLOW.map((step, i) => (
            <motion.button
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setActive(active === step.id ? null : step.id)}
              className={`glass rounded-xl p-5 text-left transition-all ${
                active === step.id ? "ring-2 ring-accent bg-accent/10" : "hover:bg-white/5"
              }`}
            >
              <span className="text-2xl mb-2 block">
                {step.id === "email" && "📧"}
                {step.id === "rag" && "📚"}
                {step.id === "agent" && "🤖"}
                {step.id === "output" && "📋"}
              </span>
              <h4 className="font-semibold text-accentSecondary">{step.label}</h4>
              <p className="text-xs text-textMuted mt-1">{step.out}</p>
            </motion.button>
          ))}
        </div>
        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="glass rounded-xl p-6 font-mono text-sm"
            >
              <strong className="text-accent">
                {FLOW.find((s) => s.id === active)?.label}:
              </strong>{" "}
              {FLOW.find((s) => s.id === active)?.out}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}
