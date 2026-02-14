"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const PHASES = [
  { id: "reason", label: "Reason", desc: "Think step-by-step", icon: "🧠" },
  { id: "act", label: "Act", desc: "Call a tool", icon: "⚡" },
  { id: "observe", label: "Observe", desc: "See result, decide next", icon: "👁️" },
];

export default function ReActLoop() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setPhase((p) => (p + 1) % PHASES.length), 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
      {PHASES.map((p, i) => (
        <div key={p.id} className="flex items-center gap-4">
          <motion.div
            animate={{
              scale: phase === i ? 1.1 : 1,
              boxShadow: phase === i ? "0 0 30px rgba(99, 102, 241, 0.4)" : "0 0 0 rgba(99,102,241,0)",
            }}
            className="glass rounded-2xl p-6 min-w-[140px] text-center"
          >
            <span className="text-3xl block mb-2">{p.icon}</span>
            <h4 className="font-bold text-accentSecondary">{p.label}</h4>
            <p className="text-xs text-textMuted mt-1">{p.desc}</p>
          </motion.div>
          {i < PHASES.length - 1 && (
            <motion.span
              className="text-2xl text-accent hidden md:block"
              animate={{ opacity: phase === i ? 1 : 0.4 }}
            >
              →
            </motion.span>
          )}
        </div>
      ))}
      <motion.p
        className="text-xs text-textMuted mt-4 md:mt-0"
        animate={{ opacity: [0.6, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        Loop until task done or max steps
      </motion.p>
    </div>
  );
}
