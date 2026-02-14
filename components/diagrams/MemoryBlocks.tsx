"use client";

import { motion } from "framer-motion";

const BLOCKS = [
  { id: "short", label: "Short-term", desc: "Current turn / buffer" },
  { id: "long", label: "Long-term", desc: "Summaries, key facts" },
  { id: "working", label: "Working", desc: "Tool outputs, intermediate" },
];

export default function MemoryBlocks() {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {BLOCKS.map((b, i) => (
        <motion.div
          key={b.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15 }}
          whileHover={{ scale: 1.05, rotate: 2 }}
          className="glass rounded-xl p-4 w-40 border border-accent/30"
        >
          <div className="h-2 w-full bg-accent/50 rounded mb-3" />
          <div className="h-2 w-3/4 bg-accent/30 rounded mb-3" />
          <div className="h-2 w-1/2 bg-accent/20 rounded mb-3" />
          <h4 className="font-semibold text-sm">{b.label}</h4>
          <p className="text-xs text-textMuted">{b.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}
