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
      id="stack"
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background"
    >
      {/* Subtle radial glow behind the orbit */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="size-[600px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      {/* Top label */}
      <div className="relative z-10 flex flex-col items-center gap-2 mb-4 px-6 text-center">
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          <span className="size-1.5 rounded-full bg-primary animate-pulse" />
          Stack tecnológico
        </span>
      </div>

      {/* The orbit — full viewport width, centered */}
      <div className="relative z-10 w-full max-w-7xl px-2 sm:px-6">
        <LogoOrbit rings={RINGS} className="w-full aspect-[16/7]">
          <div className="flex flex-col items-center gap-2 max-w-xs sm:max-w-md">
            <ScrollTextReveal
              tag="h2"
              className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-foreground text-balance leading-tight text-center"
            >
              Las herramientas que
            </ScrollTextReveal>
            <div className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-primary">
              <Typewriter prefix="" words={TECH_WORDS} />
            </div>
            <p className="text-[11px] text-muted-foreground font-mono mt-1">
              Pasa el cursor sobre los íconos
            </p>
          </div>
        </LogoOrbit>
      </div>

      {/* Bottom exploring tag */}
      {/* <div className="relative z-10 mt-4 px-6 text-center">
        <span className="text-xs text-muted-foreground font-mono">
          Explorando actualmente:{" "}
          <span className="text-foreground font-semibold">Flutter</span>
        </span>
      </div> */}

      {/* Bottom fade into next section */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
