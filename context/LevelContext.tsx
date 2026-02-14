"use client";

import { createContext, useContext, type ReactNode } from "react";

const LevelContext = createContext<number | null>(null);

export function LevelContextProvider({
  levelNumber,
  children,
}: {
  levelNumber: number;
  children: ReactNode;
}) {
  return (
    <LevelContext.Provider value={levelNumber}>
      {children}
    </LevelContext.Provider>
  );
}

export function useLevelNumber() {
  const n = useContext(LevelContext);
  if (n == null) throw new Error("useLevelNumber must be used inside Level with levelNumber");
  return n;
}
