"use client";

import ParticleBackground from "@/components/ParticleBackground";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Level from "@/components/Level";
import Level1Illusion from "@/components/levels/Level1Illusion";
import Level2MeaningAsPosition from "@/components/levels/Level2MeaningAsPosition";
import Level3RAGJourneyPedagogical from "@/components/levels/Level3RAGJourneyPedagogical";
import Level4AgentsEnter from "@/components/levels/Level4AgentsEnter";
import Level5ProductionArchitecture from "@/components/levels/Level5ProductionArchitecture";
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
          <Level1Illusion />
        </Level>
        <Level levelNumber={2}>
          <Level2MeaningAsPosition />
        </Level>
        <Level levelNumber={3}>
          <Level3RAGJourneyPedagogical />
        </Level>
        <Level levelNumber={4}>
          <Level4AgentsEnter />
        </Level>
        <Level levelNumber={5}>
          <Level5ProductionArchitecture />
        </Level>
        <footer className="relative z-10 py-16 px-6 text-center text-textMuted text-sm border-t border-border">
          From RAG to Agentic Systems — A guided cognitive journey.
        </footer>
      </main>
        </LevelViewProvider>
      </InstructorProvider>
    </ProgressProvider>
  );
}
