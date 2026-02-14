"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";

const DOCS = [
  { id: "dog", label: "Dog", x: 0.22, y: 0.72, sim: 0.91 },
  { id: "cat", label: "Cat", x: 0.2, y: 0.76, sim: 0.88 },
  { id: "lion", label: "Lion", x: 0.28, y: 0.78, sim: 0.72 },
  { id: "pizza", label: "Pizza", x: 0.72, y: 0.22, sim: 0.02 },
  { id: "burger", label: "Burger", x: 0.76, y: 0.24, sim: 0.01 },
  { id: "car", label: "Car", x: 0.75, y: 0.36, sim: 0.05 },
];

const W = 420;
const H = 280;

type QueryMagnetProps = { onInteract?: () => void };

export default function QueryMagnet({ onInteract }: QueryMagnetProps) {
  const [query, setQuery] = useState("Domestic animal");
  const [focused, setFocused] = useState(false);

  const queryPos = useMemo(() => {
    if (query.toLowerCase().includes("animal") || query.toLowerCase().includes("pet")) return { x: 0.24, y: 0.74 };
    if (query.toLowerCase().includes("food") || query.toLowerCase().includes("pizza")) return { x: 0.74, y: 0.23 };
    return { x: 0.5, y: 0.5 };
  }, [query]);

  const nearest = DOCS.slice(0, 3);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm text-textMuted mb-2">Query (try: &quot;Domestic animal&quot;, &quot;Fast food&quot;)</label>
        <input
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); onInteract?.(); }}
          onFocus={() => { setFocused(true); onInteract?.(); }}
          onBlur={() => setFocused(false)}
          className="w-full max-w-xs px-4 py-2 rounded-lg bg-black/40 border border-accent/50 text-white placeholder-white/40 focus:ring-2 focus:ring-accent/50 focus:border-accent"
          placeholder="e.g. Domestic animal"
        />
      </div>

      <div
        className="relative rounded-2xl overflow-hidden border border-border bg-gradient-to-b from-[#0c0c14] to-[#050508]"
        style={{ width: W, height: H }}
      >
        {/* Grid dots (documents) */}
        {DOCS.map((d) => {
          const isNear = nearest.some((n) => n.id === d.id);
          return (
            <motion.div
              key={d.id}
              className="absolute w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-semibold border-2"
              style={{
                left: d.x * W - 12,
                top: (1 - d.y) * H - 12,
                background: isNear ? "rgba(34, 197, 94, 0.25)" : "rgba(255,255,255,0.06)",
                borderColor: isNear ? "#22c55e" : "rgba(255,255,255,0.2)",
                boxShadow: isNear ? "0 0 14px rgba(34,197,94,0.4)" : "none",
              }}
              animate={{ scale: isNear ? 1.1 : 1 }}
              transition={{ duration: 0.3 }}
            >
              {d.label}
            </motion.div>
          );
        })}

        {/* Lines from query to nearest 3 */}
        {focused || query.length > 0
          ? nearest.map((d) => (
              <svg key={d.id} className="absolute inset-0 w-full h-full pointer-events-none">
                <motion.line
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  x1={queryPos.x * W}
                  y1={(1 - queryPos.y) * H}
                  x2={d.x * W}
                  y2={(1 - d.y) * H}
                  stroke="var(--color-retrieval)"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                />
              </svg>
            ))
          : null}

        {/* Query orb (magnet) */}
        <motion.div
          className="absolute w-10 h-10 rounded-full border-2 border-accent flex items-center justify-center text-xs font-bold bg-accent/30"
          style={{
            left: queryPos.x * W - 20,
            top: (1 - queryPos.y) * H - 20,
            boxShadow: "0 0 24px rgba(99, 102, 241, 0.6)",
          }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Q
        </motion.div>
      </div>

      {/* Cosine similarity scores */}
      <div className="flex flex-wrap gap-3">
        {nearest.map((d) => (
          <motion.span
            key={d.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-[var(--color-retrieval)]/30 text-sm"
          >
            <span className="text-white font-medium">{d.label}</span>
            <span className="text-[var(--color-retrieval)] font-mono">{d.sim.toFixed(2)}</span>
          </motion.span>
        ))}
      </div>
      <p className="text-xs text-textMuted">Cosine similarity: 1 = same direction, 0 = unrelated. Query pulls nearest neighbors.</p>
    </div>
  );
}
