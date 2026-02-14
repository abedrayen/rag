"use client";

import ParticleBackground from "@/components/ParticleBackground";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Level from "@/components/Level";
import Level1Illusion from "@/components/levels/Level1Illusion";
import Level2RAG from "@/components/levels/Level2RAG";
import Level3BreakingRAG from "@/components/levels/Level3BreakingRAG";
import Level4Agents from "@/components/levels/Level4Agents";
import Level5MultiAgent from "@/components/levels/Level5MultiAgent";
import Level6Production from "@/components/levels/Level6Production";
import { ProgressProvider } from "@/context/ProgressContext";

export default function Home() {
  return (
    <ProgressProvider>
      <main className="relative bg-grid bg-surface">
        <ParticleBackground />
        <Nav />
        <Hero />
        <Level levelNumber={1}>
          <Level1Illusion />
        </Level>
        <Level levelNumber={2}>
          <Level2RAG />
        </Level>
        <Level levelNumber={3}>
          <Level3BreakingRAG />
        </Level>
        <Level levelNumber={4}>
          <Level4Agents />
        </Level>
        <Level levelNumber={5}>
          <Level5MultiAgent />
        </Level>
        <Level levelNumber={6}>
          <Level6Production />
        </Level>
        <footer className="relative z-10 py-16 px-6 text-center text-textMuted text-sm border-t border-border">
          From RAG to Agentic Systems — Level up in AI system design.
        </footer>
      </main>
    </ProgressProvider>
  );
}
