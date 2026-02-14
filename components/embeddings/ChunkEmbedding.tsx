"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const CARDS = [
  { id: "a", text: "Python is used in machine learning.", color: "var(--color-llm)" },
  { id: "b", text: "Pizza recipes.", color: "var(--color-tools)" },
];

const POSITIONS = [
  { x: 0.25, y: 0.55 },
  { x: 0.75, y: 0.35 },
];

export default function ChunkEmbedding() {
  const [morphed, setMorphed] = useState(false);

  return (
    <div className="space-y-4">
      <button
        onClick={() => setMorphed(!morphed)}
        className="px-4 py-2 rounded-lg bg-accent/20 border border-accent text-sm font-medium"
      >
        {morphed ? "Show as text" : "Text → Position in vector space"}
      </button>

      <div className="relative rounded-2xl border border-border bg-gradient-to-b from-[#0c0c14] to-[#050508] min-h-[220px] overflow-hidden">
        {CARDS.map((c, i) => (
          <motion.div
            key={c.id}
            className="absolute"
            initial={false}
            animate={
              morphed
                ? {
                    left: `${POSITIONS[i].x * 100}%`,
                    top: `${(1 - POSITIONS[i].y) * 100}%`,
                    x: "-50%",
                    y: "-50%",
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    opacity: 1,
                  }
                : {
                    left: i === 0 ? "10%" : "50%",
                    top: "50%",
                    x: "-50%",
                    y: "-50%",
                    width: 200,
                    height: 80,
                    borderRadius: 12,
                    opacity: 1,
                  }
            }
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {morphed ? (
              <motion.div
                className="w-full h-full rounded-full border-2 flex items-center justify-center"
                style={{
                  background: `${c.color}30`,
                  borderColor: c.color,
                  boxShadow: `0 0 20px ${c.color}50`,
                }}
              >
                <span className="text-[10px] font-mono text-white/80">vec</span>
              </motion.div>
            ) : (
              <div
                className="w-full h-full rounded-xl border-2 p-3 flex items-center justify-center text-sm text-center"
                style={{ background: `${c.color}15`, borderColor: c.color }}
              >
                {c.text}
              </div>
            )}
          </motion.div>
        ))}
      </div>
      <p className="text-sm text-textMuted">
        Each document card becomes a point (embedding) in vector space. Same model embeds both query and docs so we can compare.
      </p>
    </div>
  );
}
