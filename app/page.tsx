"use client";

import ParticleBackground from "@/components/ParticleBackground";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Level from "@/components/Level";
import Level1Embeddings from "@/components/levels/Level1Embeddings";
import Level2RAGJourney from "@/components/levels/Level2RAGJourney";
import Level3RAGPipeline from "@/components/levels/Level3RAGPipeline";
import Level3BreakingRAG from "@/components/levels/Level3BreakingRAG";
import Level4Agents from "@/components/levels/Level4Agents";
import Level6Production from "@/components/levels/Level6Production";
import { ProgressProvider } from "@/context/ProgressContext";
import { InstructorProvider } from "@/context/InstructorContext";
import { LevelViewProvider } from "@/context/LevelViewContext";

export default function Home() {
  return (
    <ProgressProvider>
      <InstructorProvider>
        <LevelViewProvider>
      <main className="relative bg-grid bg-surface">
        <ParticleBackground />
        <Nav />
        <Hero />
        <Level levelNumber={1}>
          <Level1Embeddings />
        </Level>
        <Level levelNumber={2}>
          <Level2RAGJourney />
        </Level>
        <Level levelNumber={3}>
          <Level3RAGPipeline />
        </Level>
        <Level levelNumber={4}>
          <Level3BreakingRAG />
        </Level>
        <Level levelNumber={5}>
          <Level4Agents />
        </Level>
        <Level levelNumber={6}>
          <Level6Production />
        </Level>
        <footer className="relative z-10 py-16 px-6 text-center text-textMuted text-sm border-t border-border">
          From RAG to Agentic Systems — Level up in AI system design.
        </footer>
      </main>
        </LevelViewProvider>
      </InstructorProvider>
    </ProgressProvider>
  );
}
