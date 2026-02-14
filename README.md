# From RAG to Agentic Systems — Level-Based Workshop

A progression-based, level-locked web experience for a ~2h workshop. Users cannot access Level N+1 until they complete Level N. Built like an AI bootcamp + video-game progression.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack

- **Next.js** (App Router), **TypeScript**, **TailwindCSS**, **Framer Motion**
- Dark theme, glassmorphism, gradient neon accents, particle background
- Progress persisted in `localStorage`

## Level structure

| Level | Theme | Unlock condition |
|-------|--------|-------------------|
| **1** | The Illusion of Intelligence | Correct quiz: "Can LLMs access your private database?" → No |
| **2** | The Rise of RAG | Retrieve the correct document (Q4 Revenue Report) in similarity search sim |
| **3** | Breaking RAG | Identify why RAG failed (context overflow) |
| **4** | Agents Enter the Game | Complete one Reason → Act → Observe loop |
| **5** | Multi-Agent Systems | Click Planner → Executor → Reviewer in order |
| **6** | Real Production System | Click through all 5 stages (Email → Intent → RAG → Agent → Output) → "Agent Architect" badge |

## Gamification

- **Progress bar & XP** in nav (100 XP per level, 600 total)
- **Locked levels** appear blurred with a lock overlay
- **Unlock animation** when content becomes visible
- **Completion cards** with "Level complete! Next level unlocked"

## Interactive elements per level

- **L1:** Hallucination demo, LLM limitations, quiz with `onCorrect` → unlock
- **L2:** Embedding visual, click-to-retrieve correct doc, chunking comparison, RAG pipeline
- **L3:** Context overflow animation, latency bars, multiple-choice failure reason
- **L4:** ReAct loop animation, RAG vs Agent mode toggle, complete-one-loop challenge, tool calling, memory blocks
- **L5:** Planner / Executor / Reviewer workflow (click in order)
- **L6:** Full case study click-through, "You are now Agent Architect" badge

## Architecture

- **`context/ProgressContext`** — `highestCompletedLevel`, `xp`, `completeLevel(n)`, `isLevelUnlocked(n)`, persistence
- **`context/LevelContext`** — current `levelNumber` for level content
- **`components/Level`** — Wrapper: locked (blurred) vs unlocked content, level title
- **`components/LevelProgressBar`** — Level dots + XP bar
- **`components/levels/Level1Illusion` … `Level6Production`** — Level content and unlock logic
- **`components/AIJokeTooltip`** — Hover tooltips with tech jokes

## Structure

- `app/` — layout, page, globals
- `context/` — ProgressContext, LevelContext
- `lib/` — constants (TOTAL_LEVELS, XP_PER_LEVEL, LEVEL_TITLES)
- `components/` — Level, LevelProgressBar, Nav, Hero, ParticleBackground, GlassCard, QuizCard, AIJokeTooltip, ConsoleTerminal, HallucinationDemo
- `components/levels/` — Level1Illusion … Level6Production
- `components/diagrams/` — EmbeddingVisual, ChunkComparison, RAGPipelineSim, ReActLoop, MemoryBlocks

Built for engineers and AI enthusiasts—educational, technically accurate, and playful.
