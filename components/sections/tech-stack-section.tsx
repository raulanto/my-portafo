"use client";

import { LogoOrbit } from "@/components/ui/logo-orbit";
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
    radius: 0.58,
    lap: 42,
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
    radius: 0.92,
    lap: -64,
  },
];

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
      <div className="relative z-10 w-full max-w-6xl px-4">
        <LogoOrbit rings={RINGS} className="w-full aspect-[16/8]">
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-foreground text-balance leading-[1.2] text-center">
              Las herramientas
              <br />
              <span className="text-primary">detrás del trabajo</span>
            </h2>
            <p className="text-[11px] text-muted-foreground">
              Pasa el cursor sobre los iconos
            </p>
          </div>
        </LogoOrbit>
      </div>

      {/* Bottom exploring tag */}
      <div className="relative z-10 mt-4 px-6 text-center">
        <span className="text-xs text-muted-foreground font-mono">
          Explorando actualmente:{" "}
          <span className="text-foreground font-semibold">Flutter</span>
        </span>
      </div>

      {/* Bottom fade into next section */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
