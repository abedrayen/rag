"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LevelProgressBar from "@/components/LevelProgressBar";
import { useInstructor } from "@/context/InstructorContext";

const LEVELS = [
  { id: "hero", label: "Start" },
  { id: "level-1", label: "L1" },
  { id: "level-2", label: "L2" },
  { id: "level-3", label: "L3" },
  { id: "level-4", label: "L4" },
  { id: "level-5", label: "L5" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { instructorMode, toggleInstructorMode } = useInstructor();

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between gap-4">
          <button
            onClick={() => go("hero")}
            className="text-lg font-bold gradient-text shrink-0"
          >
            RAG → Agents
          </button>
          <LevelProgressBar />
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <button
              onClick={toggleInstructorMode}
              title="Instructor View"
              className={`text-xs px-2 py-1 rounded border transition-colors ${
                instructorMode
                  ? "border-amber-500/50 bg-amber-500/10 text-amber-400"
                  : "border-border text-textMuted hover:text-white"
              }`}
            >
              Instructor
            </button>
            {LEVELS.slice(1).map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="text-xs font-mono px-2 py-1.5 rounded-lg hover:bg-white/10 text-textMuted hover:text-white transition-colors"
              >
                {l.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10"
            aria-label="Menu"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-[52px] left-0 right-0 z-40 glass border-b border-border md:hidden"
          >
            <div className="p-4 flex flex-col gap-2">
              <LevelProgressBar />
              <button
                onClick={() => { toggleInstructorMode(); setOpen(false); }}
                className={`text-left py-2 px-2 rounded border text-sm ${instructorMode ? "border-amber-500/50 bg-amber-500/10 text-amber-400" : "border-border text-textMuted"}`}
              >
                Instructor View {instructorMode ? "ON" : "OFF"}
              </button>
              {LEVELS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => go(l.id)}
                  className="text-left py-2 text-textMuted hover:text-white"
                >
                  {l.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
