"use client";

import { motion } from "framer-motion";

export default function Hero() {
  const scrollToLevel1 = () => {
    document.getElementById("level-1")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center px-6 md:px-12 relative z-10"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-accentSecondary font-mono text-sm mb-4"
        >
          Level-based workshop • 2h 
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
        >
          <span className="gradient-text">
            From RAG to Agentic Systems
          </span>
        </motion.h1>

  
        {/* Author Signature */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-10"
        >
          <p className="text-sm text-textMuted">
            Prepared and led by{" "}
            <span className="text-white font-medium">Rayen Abed</span>
            <span className="opacity-70"> — Software Engineer & AI Specialist</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <button
            onClick={scrollToLevel1}
            className="px-6 py-3 rounded-xl bg-accent text-white font-medium hover:opacity-90 transition-opacity"
          >
            Start the journey
          </button>

          <button
            onClick={() =>
              document
                .getElementById("level-5")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-6 py-3 rounded-xl glass font-medium hover:bg-white/5 transition-colors"
          >
            See Level 5
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-xs text-textMuted mt-12"
        >
          Complete each level to unlock the next. Check the progress bar above.
        </motion.p>
      </div>
    </section>
  );
}
