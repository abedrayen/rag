"use client";

import { useInstructor } from "@/context/InstructorContext";
import { motion } from "framer-motion";

type InstructorNotesProps = {
  children: React.ReactNode;
  title?: string;
};

export default function InstructorNotes({ children, title = "Instructor notes" }: InstructorNotesProps) {
  const { instructorMode } = useInstructor();

  if (!instructorMode) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-amber-500/40 bg-amber-500/5 p-4 mt-4"
    >
      <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
        {title}
      </p>
      <div className="text-sm text-textMuted space-y-2">{children}</div>
    </motion.div>
  );
}
