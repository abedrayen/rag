"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

type AIJokeTooltipProps = {
  children: ReactNode;
  joke: string;
  className?: string;
};

export default function AIJokeTooltip({ children, joke, className = "" }: AIJokeTooltipProps) {
  const [show, setShow] = useState(false);

  return (
    <span
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      <AnimatePresence>
        {show && (
          <motion.span
            initial={{ opacity: 0, y: 4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4 }}
            className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-2 rounded-lg bg-surfaceElevated border border-accent/30 text-xs text-left max-w-[220px] z-50 shadow-xl"
          >
            {joke}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
