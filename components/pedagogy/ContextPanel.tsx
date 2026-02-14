"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";

type ContextPanelProps = {
  title?: string;
  children: ReactNode;
  variant?: "default" | "inline";
};

export default function ContextPanel({ title = "Explanation", children, variant = "default" }: ContextPanelProps) {
  const base = "rounded-xl border border-border bg-surfaceElevated/80 p-4 text-sm text-textMuted";
  const className = variant === "inline" ? `${base} border-l-4 border-l-accent` : base;

  return (
    <motion.aside
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      className={className}
    >
      {title && <h4 className="text-xs font-semibold text-accentSecondary uppercase tracking-wider mb-2">{title}</h4>}
      {children}
    </motion.aside>
  );
}
