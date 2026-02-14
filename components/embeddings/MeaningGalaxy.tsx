"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Point = { id: string; label: string; x: number; y: number; cluster: "animals" | "food" | "other" };

const WORDS: Point[] = [
  { id: "cat", label: "Cat", x: 0.2, y: 0.75, cluster: "animals" },
  { id: "dog", label: "Dog", x: 0.25, y: 0.7, cluster: "animals" },
  { id: "lion", label: "Lion", x: 0.3, y: 0.8, cluster: "animals" },
  { id: "car", label: "Car", x: 0.75, y: 0.35, cluster: "other" },
  { id: "pizza", label: "Pizza", x: 0.7, y: 0.2, cluster: "food" },
  { id: "burger", label: "Burger", x: 0.78, y: 0.25, cluster: "food" },
];

const SCATTERED: Point[] = [
  { id: "cat", label: "Cat", x: 0.15, y: 0.2, cluster: "animals" },
  { id: "dog", label: "Dog", x: 0.8, y: 0.85, cluster: "animals" },
  { id: "lion", label: "Lion", x: 0.5, y: 0.1, cluster: "animals" },
  { id: "car", label: "Car", x: 0.2, y: 0.7, cluster: "other" },
  { id: "pizza", label: "Pizza", x: 0.9, y: 0.4, cluster: "food" },
  { id: "burger", label: "Burger", x: 0.1, y: 0.5, cluster: "food" },
];

const W = 400;
const H = 320;

export default function MeaningGalaxy() {
  const [phase, setPhase] = useState<"scatter" | "cluster" | "axes">("scatter");
  const [points, setPoints] = useState<Point[]>(SCATTERED);

  useEffect(() => {
    if (phase === "scatter") return;
    if (phase === "cluster") {
      setPoints(WORDS);
      return;
    }
  }, [phase]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setPhase("scatter")}
          className={`px-3 py-1.5 rounded-lg text-sm border ${phase === "scatter" ? "border-accent bg-accent/20" : "border-border"}`}
        >
          1. Scatter
        </button>
        <button
          onClick={() => setPhase("cluster")}
          className={`px-3 py-1.5 rounded-lg text-sm border ${phase === "cluster" ? "border-accent bg-accent/20" : "border-border"}`}
        >
          2. Cluster
        </button>
        <button
          onClick={() => setPhase("axes")}
          className={`px-3 py-1.5 rounded-lg text-sm border ${phase === "axes" ? "border-accent bg-accent/20" : "border-border"}`}
        >
          3. Axes
        </button>
      </div>

      <div
        className="relative rounded-2xl overflow-hidden border border-border bg-gradient-to-b from-[#0c0c14] to-[#050508]"
        style={{ width: W, height: H }}
      >
        {/* Stars */}
        <div className="absolute inset-0 opacity-30">
          {Array.from({ length: 40 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
            />
          ))}
        </div>

        {/* Axes (fade in at phase 3) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === "axes" ? 1 : 0 }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute left-8 top-1/2 w-2/3 h-px bg-white/20" />
          <div className="absolute left-1/2 top-8 bottom-12 w-px bg-white/20" />
          <span className="absolute left-1/2 -translate-x-1/2 top-2 text-xs text-white/60">Y: Edibility</span>
          <span className="absolute left-4 bottom-2 text-xs text-white/60 -rotate-90 origin-left w-24">X: Animalness</span>
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute right-2 bottom-2 text-right text-xs text-accent max-w-[140px]"
          >
            These axes are imaginary. In reality, we have 1,536 dimensions.
          </motion.p>
        </motion.div>

        {/* Points */}
        {points.map((p, i) => (
          <motion.div
            key={p.id}
            initial={phase === "scatter" ? { scale: 0 } : false}
            animate={{
              left: p.x * W - 14,
              top: (1 - p.y) * H - 14,
              scale: 1,
            }}
            transition={{ duration: phase === "cluster" ? 0.8 : 0.3, delay: phase === "cluster" ? i * 0.08 : 0 }}
            className="absolute w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-semibold border-2 cursor-default"
            style={{
              background: p.cluster === "animals" ? "rgba(34, 197, 94, 0.3)" : p.cluster === "food" ? "rgba(249, 115, 22, 0.3)" : "rgba(99, 102, 241, 0.3)",
              borderColor: p.cluster === "animals" ? "#22c55e" : p.cluster === "food" ? "#f97316" : "#6366f1",
              boxShadow: `0 0 12px ${p.cluster === "animals" ? "rgba(34,197,94,0.5)" : p.cluster === "food" ? "rgba(249,115,22,0.5)" : "rgba(99,102,241,0.5)"}`,
            }}
          >
            {p.label}
          </motion.div>
        ))}
      </div>

      <p className="text-sm text-textMuted">
        Embeddings = positions in high-dimensional meaning space. Distance ≈ semantic similarity.
      </p>
    </div>
  );
}
