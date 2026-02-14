# From RAG to Agentic Systems — Explainable AI Learning Platform

An interactive, level-based web platform for teaching production-ready AI systems. Designed for live workshops: each level has **Discovery** (simulation), **Explanation** (step-by-step breakdown), and **Instructor** (teaching notes, pitfalls, key questions).

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack

- **Next.js** (App Router), **TypeScript**, **TailwindCSS**, **Framer Motion**
- Dark theme, glassmorphism, color-coded components (Blue=LLM, Green=Retrieval, Purple=Agent, Orange=Tools)
- Progress and Instructor mode persisted in `localStorage`

## Three modes per level

1. **Discovery** — Interactive simulations, click-through pipelines, toggles (e.g. “Show what the model knows”, Bad vs Optimized RAG).
2. **Explanation** — Expandable “Explainable” panels: What / Why / How / Limitations / When. Concept summaries.
3. **Instructor** — Visible when **Instructor View** is ON (nav toggle): teaching notes, key questions, pitfalls, performance notes, architectural alternatives.

## Level structure

| Level | Theme | Unlock condition |
|-------|--------|-------------------|
| **1** | The Illusion of Intelligence | Quiz: “Can LLMs access your private database?” → No |
| **2** | Understanding Embeddings | Click correct document (Q4 Revenue Report) in retrieval sim |
| **3** | The RAG Pipeline | Comprehension check: Top-K risk (context overflow) |
| **4** | Breaking RAG | Select why RAG failed (context overflow) |
| **5** | Agentic Systems | Complete one Reason → Act → Observe loop |
| **6** | Real Production Architecture | Click through all 5 stages → “Agent Architect” badge |

## Pedagogical structure

- **ExplainablePanel** — Each concept answers: What is it? Why do we need it? How does it work? Limitations? When to use it?
- **Comprehension checks** — Short quizzes between/within levels.
- **InstructorNotes** — Shown only when Instructor View is ON: mechanics, key questions, pitfalls, metrics, alternatives.

## Color coding

- **Blue** (`--color-llm`) — LLM, intent, generation
- **Green** (`--color-retrieval`) — Embeddings, vector DB, RAG retrieval
- **Purple** (`--color-agent`) — Agent, planning, ReAct
- **Orange** (`--color-tools`) — Tools, structured output

## Architecture

- **context/ProgressContext** — Level completion, XP, persistence
- **context/InstructorContext** — Instructor View toggle, persistence
- **context/LevelViewContext** — Discovery vs Explanation mode (global)
- **components/pedagogy/** — ExplainablePanel, InstructorNotes, LevelModeTabs, ComprehensionCheck
- **components/levels/** — Level1Illusion, Level2RAG, Level3RAGPipeline, Level3BreakingRAG (L4), Level4Agents (L5), Level6Production
- **components/diagrams/** — VectorSpace2D, RAGPipelineSteps, ReActLoop, etc.

## Key features

- **Level 1:** Toggle “Show what the model actually knows”; explainable panel on LLM limits; instructor notes on hallucination mechanics.
- **Level 2:** 2D vector space (drag query), embeddings bar view, retrieval sim; explainable panel + simplified math; instructor: dimensions, trade-offs, latency.
- **Level 3:** Click-through RAG pipeline with “Why this step matters”; Bad vs Optimized RAG toggle; chunking comparison.
- **Level 4:** Context overflow and latency visuals; “Why did RAG fail?”; explainable: why RAG isn’t enough, no reasoning loop.
- **Level 5:** RAG vs Agent toggle; ReAct loop; complete-one-loop challenge; tool calling & memory; explainable: planning, tools, observation; instructor: when Agents vs RAG, cost, failure risks.
- **Level 6:** Click-through production pipeline; expandable technical panels (latency, failure points); explainable: separation of concerns, scalability, monitoring.

Built for instructors and engineers—clear, explainable, and production-minded.
