"use client";

import SectionWrapper from "../SectionWrapper";
import GlassCard from "../GlassCard";
import ReActLoop from "../diagrams/ReActLoop";
import MemoryBlocks from "../diagrams/MemoryBlocks";
import QuizCard from "../QuizCard";

export default function Section4AgenticSystems() {
  return (
    <SectionWrapper
      id="agentic-systems"
      title="Agentic Systems"
      subtitle="Agents reason, use tools, and iterate until the job is done."
    >
      <div className="space-y-16">
        <div>
          <h3 className="text-xl font-semibold mb-4">What is an Agent?</h3>
          <GlassCard>
            <p className="text-textMuted">
              An agent is an LLM plus a loop: it can <strong className="text-white">reason</strong> (plan,
              think), <strong className="text-white">act</strong> (call tools: search, code, API),
              and <strong className="text-white">observe</strong> (read results and decide next step).
              It keeps going until it has an answer or hits a limit.
            </p>
          </GlassCard>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">ReAct loop (Reason → Act → Observe)</h3>
          <GlassCard>
            <ReActLoop />
          </GlassCard>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Tool calling</h3>
          <GlassCard>
            <p className="text-textMuted text-sm mb-4">
              The model outputs structured tool calls (e.g. JSON); the runtime executes them and
              injects results back. Tools: search, calculator, DB query, custom APIs.
            </p>
            <pre className="font-mono text-xs text-accentSecondary bg-black/30 rounded-lg p-4 overflow-x-auto">
{`{ "name": "search", "args": { "q": "freelancer React 5y" } }
→ [{"name": "Alice", "skills": ["React", "Node"], ...}]`}
            </pre>
          </GlassCard>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Memory (conceptual blocks)</h3>
          <GlassCard>
            <MemoryBlocks />
          </GlassCard>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Multi-agent architecture</h3>
          <GlassCard>
            <p className="text-textMuted text-sm mb-4">
              Multiple agents with roles (e.g. Researcher, Writer, Critic); they pass messages or
              tasks. Use when one agent isn't enough or you want separation of concerns.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Researcher", "Planner", "Executor", "Critic"].map((role, i) => (
                <span
                  key={role}
                  className="px-3 py-1 rounded-full bg-accent/20 text-accent text-sm"
                >
                  {role}
                </span>
              ))}
            </div>
          </GlassCard>
        </div>

        <QuizCard
          question="In ReAct, what happens after 'Act'?"
          options={[
            {
              label: "The agent stops",
              correct: false,
              explanation: "The loop continues until task is done or max steps.",
            },
            {
              label: "Observe: get tool result, then Reason again",
              correct: true,
              explanation: "Observe feeds the result back; the agent reasons on it and may act again.",
            },
            {
              label: "The user is always asked",
              correct: false,
              explanation: "Human-in-the-loop is optional, not required after every Act.",
            },
          ]}
        />
      </div>
    </SectionWrapper>
  );
}
