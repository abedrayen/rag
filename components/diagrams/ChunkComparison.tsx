"use client";

import { motion } from "framer-motion";

const BAD_CHUNK =
  "Our company was founded in 2010. We have 500 employees. Our revenue in 2023 was $50M. We are hiring. Contact hr@company.com. The product has three tiers: Basic, Pro, Enterprise. Pricing starts at $9/mo. Our office is in San Francisco. We use React and TypeScript. Our API is REST. We have a free trial. Our CEO is Jane Doe. We raised Series B in 2022.";

const GOOD_CHUNKS = [
  "Company overview: Founded 2010, 500 employees, revenue $50M (2023). HQ San Francisco.",
  "Product: Three tiers—Basic, Pro, Enterprise. Pricing from $9/mo. Free trial available.",
  "Careers: We are hiring. Contact hr@company.com.",
  "Tech: React, TypeScript, REST API. Leadership: CEO Jane Doe. Series B in 2022.",
];

export default function ChunkComparison() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="glass rounded-xl p-4 border border-red-500/30"
      >
        <h4 className="text-red-400 font-semibold mb-2">❌ Bad chunk (everything in one)</h4>
        <p className="text-xs text-textMuted font-mono leading-relaxed line-clamp-4">
          {BAD_CHUNK}
        </p>
        <p className="text-xs text-red-400/80 mt-2">Low precision, mixed topics, noisy retrieval.</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="glass rounded-xl p-4 border border-green-500/30"
      >
        <h4 className="text-green-400 font-semibold mb-2">✓ Good chunks (semantic, focused)</h4>
        <ul className="space-y-2">
          {GOOD_CHUNKS.map((c, i) => (
            <li key={i} className="text-xs text-textMuted font-mono border-l-2 border-green-500/50 pl-2">
              {c}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
