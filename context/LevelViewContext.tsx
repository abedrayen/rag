"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

export type LevelViewMode = "discovery" | "explanation";

type LevelViewContextValue = {
  mode: LevelViewMode;
  setMode: (m: LevelViewMode) => void;
};

const LevelViewContext = createContext<LevelViewContextValue | null>(null);

export function LevelViewProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<LevelViewMode>("discovery");

  const value = useCallback(
    () => ({ mode, setMode }),
    [mode]
  ) as unknown as LevelViewContextValue;
  const memoValue = { mode, setMode };

  return (
    <LevelViewContext.Provider value={memoValue}>
      {children}
    </LevelViewContext.Provider>
  );
}

export function useLevelView() {
  const ctx = useContext(LevelViewContext);
  if (!ctx) return { mode: "discovery" as LevelViewMode, setMode: () => {} };
  return ctx;
}
