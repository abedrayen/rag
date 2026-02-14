"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { INSTRUCTOR_STORAGE_KEY } from "@/lib/constants";

type InstructorContextValue = {
  instructorMode: boolean;
  setInstructorMode: (v: boolean) => void;
  toggleInstructorMode: () => void;
};

const InstructorContext = createContext<InstructorContextValue | null>(null);

function loadInstructor(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(INSTRUCTOR_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

function saveInstructor(v: boolean) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(INSTRUCTOR_STORAGE_KEY, v ? "true" : "false");
  } catch {}
}

export function InstructorProvider({ children }: { children: ReactNode }) {
  const [instructorMode, setInstructorModeState] = useState(false);

  useEffect(() => {
    setInstructorModeState(loadInstructor());
  }, []);

  const setInstructorMode = useCallback((v: boolean) => {
    setInstructorModeState(v);
    saveInstructor(v);
  }, []);

  const toggleInstructorMode = useCallback(() => {
    setInstructorModeState((prev) => {
      const next = !prev;
      saveInstructor(next);
      return next;
    });
  }, []);

  return (
    <InstructorContext.Provider
      value={{ instructorMode, setInstructorMode, toggleInstructorMode }}
    >
      {children}
    </InstructorContext.Provider>
  );
}

export function useInstructor() {
  const ctx = useContext(InstructorContext);
  if (!ctx) throw new Error("useInstructor must be used within InstructorProvider");
  return ctx;
}
