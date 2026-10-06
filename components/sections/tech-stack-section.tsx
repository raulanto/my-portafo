"use client";

import { LogoOrbit } from "@/components/ui/logo-orbit";
import { Typewriter } from "@/components/ui/typewriter";

const TECH_WORDS = [
  "resuelven problemas",
  "crean soluciones",
  "escalan ideas",
  "se adaptan a ti",
  "impulsan proyectos",
];
import {
  siVuedotjs,
  siAngular,
  siFastapi,
  siNuxt,
  siDjango,
  siTypescript,
  siJavascript,
  siLaravel,
  siGo,
  siPhp,
  siNestjs,
  siAstro,
  siPostgresql,
  siMysql,
  siDocker,
  siKubernetes,
  siFigma,
  siGit,
  siDotnet,
  siDart,
  siFlutter,
} from "simple-icons";

const pick = (i: { title: string; path: string; hex: string }) => ({
  title: i.title,
  path: i.path,
  hex: i.hex,
});

const RINGS = [
  {
    logos: [
      siTypescript,
      siJavascript,
      siVuedotjs,
      siAngular,
      siNuxt,
      siAstro,
      siFigma,
    ].map(pick),
    radius: 0.65,
    lap: 36,
  },
  {
    logos: [
      siNestjs,
      siDjango,
      siFastapi,
      siLaravel,
      siGo,
      siPhp,
      siDotnet,
      siPostgresql,
      siMysql,
      siDocker,
      siKubernetes,
      siGit,
      siDart,
      siFlutter,
    ].map(pick),
    radius: 1.05,
    lap: -52,
  },
];

import { ScrollTextReveal } from "@/components/ui/scroll-text-reveal";

export function TechStackSection() {
  return (
    <section
      id="tecnologias"
      className="relative min-h-[90vh] sm:min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background py-12 sm:py-0"
    >
      {/* Subtle radial glow behind the orbit */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="size-[320px] sm:size-[600px] rounded-full bg-primary/5 blur-[90px] sm:blur-[120px]" />
      </div>

      {/* Top label */}
      <div className="relative z-10 flex flex-col items-center gap-2 mb-2 sm:mb-4 px-4 sm:px-6 text-center">
        <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-muted-foreground px-3 py-1 rounded-full bg-primary/5 border border-primary/10">
          <span className="size-1.5 rounded-full bg-primary animate-pulse" />
          02 / Stack tecnológico
        </span>
      </div>

      {/* The orbit — full viewport width, centered with mobile aspect ratio */}
      <div className="relative z-10 w-full max-w-7xl px-2 sm:px-6">
        <LogoOrbit rings={RINGS} className="w-full aspect-[4/5] sm:aspect-[16/8] md:aspect-[16/7] min-h-[380px] sm:min-h-0">
          <div className="flex flex-col items-center gap-1.5 sm:gap-2 max-w-xs sm:max-w-md px-2">
            <ScrollTextReveal
              tag="h2"
              className="text-lg sm:text-2xl md:text-3xl font-black tracking-tight text-foreground text-balance leading-tight text-center"
            >
              Las herramientas que
            </ScrollTextReveal>
            <div className="text-base sm:text-xl md:text-2xl font-bold tracking-tight text-primary">
              <Typewriter prefix="" words={TECH_WORDS} />
            </div>
            <p className="text-[10px] sm:text-[11px] text-muted-foreground font-mono mt-0.5 sm:mt-1">
              Toca o pasa el cursor sobre los íconos
            </p>
          </div>
        </LogoOrbit>
      </div>

      {/* Mobile Tech Overview Chips (Clean & Accessible on smaller screens) */}
      <div className="relative z-10 mt-6 sm:mt-8 px-4 max-w-3xl w-full flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[11px] font-mono text-muted-foreground">
        <span className="text-foreground font-semibold px-2 py-0.5">Frontend:</span>
        {["TypeScript", "Vue", "Nuxt", "Angular", "React"].map((t) => (
          <span key={t} className="px-2.5 py-1 rounded-lg bg-card/60 border border-border/40 text-foreground/85">
            {t}
          </span>
        ))}
        <span className="text-foreground font-semibold px-2 py-0.5 ml-2">Backend:</span>
        {["NestJS", "FastAPI", "Go", "Django", "Rust", "ASP.NET"].map((t) => (
          <span key={t} className="px-2.5 py-1 rounded-lg bg-card/60 border border-border/40 text-foreground/85">
            {t}
          </span>
        ))}
      </div>

      {/* Bottom fade into next section */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
