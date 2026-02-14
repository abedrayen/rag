"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";

const DOCS_2D = [
  { id: "d1", label: "Doc 1", x: 0.2, y: 0.85 },
  { id: "d2", label: "Doc 2", x: 0.5, y: 0.6 },
  { id: "d3", label: "Doc 3", x: 0.8, y: 0.75 },
  { id: "d4", label: "Doc 4", x: 0.3, y: 0.3 },
  { id: "d5", label: "Doc 5", x: 0.7, y: 0.25 },
];

const QUERY_START = { x: 0.5, y: 0.5 };
const QUERY_END = { x: 0.45, y: 0.55 };

export default function VectorSpace2D() {
  const [queryPos, setQueryPos] = useState(QUERY_START);
  const [dragging, setDragging] = useState(false);

  const size = 320;
  const toPx = (x: number, y: number) => ({ x: x * size, y: (1 - y) * size });

  const nearest = useMemo(() => {
    const qx = queryPos.x;
    const qy = queryPos.y;
    return [...DOCS_2D]
      .map((d) => ({
        ...d,
        dist: Math.hypot(d.x - qx, d.y - qy),
      }))
      .sort((a, b) => a.dist - b.dist)[0];
  }, [queryPos]);

  return (
    <div className="space-y-4">
      <p className="text-sm text-textMuted">
        Drag the query point (blue). Nearest document (green) simulates similarity search. In reality we use hundreds of dimensions and cosine similarity.
      </p>
      <div
        className="relative rounded-xl border border-border bg-black/30"
        style={{ width: size, height: size }}
        onMouseMove={(e) => {
          if (!dragging) return;
          const rect = e.currentTarget.getBoundingClientRect();
          const x = (e.clientX - rect.left) / size;
          const y = 1 - (e.clientY - rect.top) / size;
          setQueryPos({ x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) });
        }}
        onMouseLeave={() => setDragging(false)}
        onMouseUp={() => setDragging(false)}
      >
        {DOCS_2D.map((d) => {
          const pos = toPx(d.x, d.y);
          const isNearest = nearest.id === d.id;
          return (
            <motion.div
              key={d.id}
              className="absolute w-3 h-3 rounded-full border-2 border-white"
              style={{ left: pos.x - 6, top: pos.y - 6, background: isNearest ? "var(--color-retrieval)" : "rgba(255,255,255,0.2)" }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
            />
          );
        })}
        <motion.div
          className="absolute w-4 h-4 rounded-full cursor-grab active:cursor-grabbing border-2 border-[var(--color-llm)] bg-[var(--color-llm)]/50"
          style={{ left: toPx(queryPos.x, queryPos.y).x - 8, top: toPx(queryPos.x, queryPos.y).y - 8 }}
          onMouseDown={() => setDragging(true)}
          animate={{ left: toPx(queryPos.x, queryPos.y).x - 8, top: toPx(queryPos.x, queryPos.y).y - 8 }}
        />
        {nearest && (
          <svg className="absolute inset-0 pointer-events-none w-full h-full">
            <line
              x1={toPx(queryPos.x, queryPos.y).x}
              y1={toPx(queryPos.x, queryPos.y).y}
              x2={toPx(nearest.x, nearest.y).x}
              y2={toPx(nearest.x, nearest.y).y}
              stroke="var(--color-retrieval)"
              strokeWidth={2}
              opacity={0.6}
            />
          </svg>
        )}
      </div>
      <p className="text-xs text-textMuted">
        Nearest: <strong className="text-[var(--color-retrieval)]">{nearest?.label}</strong> (simplified 2D; real embeddings use 256–1536+ dimensions).
      </p>
    </div>
  );
}
