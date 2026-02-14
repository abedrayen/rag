"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { TOTAL_LEVELS, XP_PER_LEVEL, STORAGE_KEY } from "@/lib/constants";

type ProgressState = {
  highestCompletedLevel: number;
  xp: number;
};

type ProgressContextValue = {
  highestCompletedLevel: number;
  xp: number;
  isLevelUnlocked: (level: number) => boolean;
  isLevelCompleted: (level: number) => boolean;
  completeLevel: (level: number) => void;
  addXP: (amount: number) => void;
  totalXPPossible: number;
};

const defaultState: ProgressState = {
  highestCompletedLevel: 0,
  xp: 0,
};

function loadProgress(): ProgressState {
  if (typeof window === "undefined") return defaultState;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw) as ProgressState;
    return {
      highestCompletedLevel: Math.min(TOTAL_LEVELS, Math.max(0, parsed.highestCompletedLevel ?? 0)),
      xp: Math.max(0, parsed.xp ?? 0),
    };
  } catch {
    return defaultState;
  }
}

function saveProgress(state: ProgressState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>(defaultState);

  useEffect(() => {
    setState(loadProgress());
  }, []);

  useEffect(() => {
    if (state.highestCompletedLevel > 0 || state.xp > 0) saveProgress(state);
  }, [state.highestCompletedLevel, state.xp]);

  const isLevelUnlocked = useCallback(
    (level: number) => level >= 1 && level <= TOTAL_LEVELS && state.highestCompletedLevel >= level - 1,
    [state.highestCompletedLevel]
  );

  const isLevelCompleted = useCallback(
    (level: number) => level >= 1 && level <= TOTAL_LEVELS && state.highestCompletedLevel >= level,
    [state.highestCompletedLevel]
  );

  const completeLevel = useCallback((level: number) => {
    if (level < 1 || level > TOTAL_LEVELS) return;
    setState((prev) => {
      const nextCompleted = Math.max(prev.highestCompletedLevel, level);
      const newXP = prev.xp + XP_PER_LEVEL;
      return { highestCompletedLevel: nextCompleted, xp: newXP };
    });
  }, []);

  const addXP = useCallback((amount: number) => {
    setState((prev) => ({ ...prev, xp: prev.xp + amount }));
  }, []);

  const value = useMemo<ProgressContextValue>(
    () => ({
      highestCompletedLevel: state.highestCompletedLevel,
      xp: state.xp,
      isLevelUnlocked,
      isLevelCompleted,
      completeLevel,
      addXP,
      totalXPPossible: TOTAL_LEVELS * XP_PER_LEVEL,
    }),
    [state.highestCompletedLevel, state.xp, isLevelUnlocked, isLevelCompleted, completeLevel, addXP]
  );

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}
