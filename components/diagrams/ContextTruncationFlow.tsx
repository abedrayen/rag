"use client";

import { motion } from "framer-motion";

const CHUNK_LABELS = ["Chunk 1", "Chunk 2", "Chunk 3", "Chunk 4", "Chunk 5"];
const CONTEXT_WINDOW_PERCENT = 65; // ~65% of total "fits"; rest is truncated

export default function ContextTruncationFlow() {
  return (
    <div className="rounded-xl border border-border bg-surfaceElevated/50 p-4">
      <p className="text-xs text-textMuted mb-3">Retrieved chunks are concatenated into the prompt. If total length exceeds the context window, the rest is dropped.</p>
      <div className="flex flex-wrap gap-1.5 mb-3">
        <span className="rounded px-2 py-1 text-xs font-medium bg-[var(--color-retrieval)]/20 text-[var(--color-retrieval)] border border-[var(--color-retrieval)]/40">
          Prompt + Query
        </span>
        {CHUNK_LABELS.map((label, i) => (
          <span
            key={i}
            className="rounded px-2 py-1 text-xs font-medium bg-surface border border-border text-textMuted"
          >
            {label}
          </span>
        ))}
      </div>
      <div className="relative">
        <div className="text-xs text-textMuted mb-1.5">Context window (max tokens)</div>
        <div className="h-8 rounded-lg bg-surface border border-border overflow-hidden flex">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${CONTEXT_WINDOW_PERCENT}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="h-full bg-green-500/30 border-r-2 border-green-500 flex items-center justify-center"
          >
            <span className="text-xs font-medium text-green-300">Fits</span>
          </motion.div>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${100 - CONTEXT_WINDOW_PERCENT}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="h-full bg-red-500/20 flex items-center justify-center border-l border-red-500/50"
          >
            <span className="text-xs font-medium text-red-400">Truncated</span>
          </motion.div>
        </div>
        <p className="text-xs text-red-400/90 mt-2">
          Key info in Chunk 4 or 5? The model never sees it → wrong or missing answer.
        </p>
      </div>
    </div>
  );
}
