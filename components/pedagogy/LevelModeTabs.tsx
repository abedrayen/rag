"use client";

import { useLevelView } from "@/context/LevelViewContext";
import type { LevelViewMode } from "@/context/LevelViewContext";

type LevelModeTabsProps = {
  levelNumber: number;
};

export default function LevelModeTabs({ levelNumber }: LevelModeTabsProps) {
  const { mode, setMode } = useLevelView();

  return (
    <div className="flex rounded-lg border border-border p-0.5 bg-surfaceElevated/50 mb-6">
      <Tab label="Discovery" value="discovery" current={mode} onChange={setMode} />
      <Tab label="Explanation" value="explanation" current={mode} onChange={setMode} />
    </div>
  );
}

function Tab({
  label,
  value,
  current,
  onChange,
}: {
  label: string;
  value: LevelViewMode;
  current: LevelViewMode;
  onChange: (m: LevelViewMode) => void;
}) {
  return (
    <button
      onClick={() => onChange(value)}
      className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
        current === value ? "bg-accent text-white" : "text-textMuted hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}
