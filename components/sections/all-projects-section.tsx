"use client";

import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { ScrollTextReveal, ScrollElementReveal } from "@/components/ui/scroll-text-reveal";
import { ALL_PROJECTS } from "@/data/projects";

export function AllProjectsSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="todos-proyectos" className="scroll-mt-28 flex flex-col items-center gap-16">
      {/* Header */}
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="text-xs font-mono text-muted-foreground tracking-widest uppercase">
          Todos los proyectos
        </span>
        <ScrollTextReveal
          tag="h2"
          className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-foreground leading-[1.05]"
        >
          Trabajo & <br className="hidden sm:inline" />
          <span className="text-primary font-serif italic font-normal text-[0.95em]">
            Soluciones Creadas.
          </span>
        </ScrollTextReveal>
      </div>

      {/* Project List */}
      <ol
        className="w-full max-w-2xl flex flex-col"
        onMouseLeave={() => setHovered(null)}
      >
        {ALL_PROJECTS.map((project, i) => {
          const isHovered = hovered === i;
          const isDimmed = hovered !== null && !isHovered;

          return (
            <ScrollElementReveal key={project.id || project.title} delay={i * 0.05}>
              <li className="relative border-b border-border/20 first:border-t">
                {/* Soft radial glow behind the row */}
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-lg pointer-events-none"
                  style={{
                    background: isHovered
                      ? "radial-gradient(ellipse 90% 120% at 50% 50%, hsl(var(--primary) / 0.08) 0%, transparent 70%)"
                      : "transparent",
                    transition: "background 0.35s ease",
                  }}
                />

                <a
                  href={project.url || project.github || "https://github.com/raulantodev"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHovered(i)}
                  className="relative flex items-center justify-between gap-4 px-2 py-5"
                  style={{
                    opacity: isDimmed ? 0.35 : 1,
                    transition: "opacity 0.25s ease",
                  }}
                >
                  <div className="flex items-baseline gap-4 w-full">
                    <span
                      className="text-xs font-mono tabular-nums w-5 shrink-0"
                      style={{
                        color: isHovered
                          ? "hsl(var(--primary))"
                          : "hsl(var(--muted-foreground))",
                        transition: "color 0.25s ease",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <span
                      className="text-xl sm:text-2xl font-semibold tracking-tight flex-1"
                      style={{
                        color: isHovered
                          ? "hsl(var(--primary))"
                          : "hsl(var(--foreground))",
                        transition: "color 0.25s ease",
                      }}
                    >
                      {project.title}
                    </span>

                    <span
                      className="hidden sm:inline text-xs font-mono shrink-0"
                      style={{
                        color: isHovered
                          ? "hsl(var(--primary) / 0.7)"
                          : "hsl(var(--muted-foreground))",
                        transition: "color 0.25s ease",
                      }}
                    >
                      {project.category}
                    </span>
                  </div>

                  <ArrowUpRight
                    className="size-4 shrink-0"
                    style={{
                      color: "hsl(var(--primary))",
                      opacity: isHovered ? 1 : 0,
                      transform: isHovered ? "translate(2px, -2px)" : "translate(0, 0)",
                      transition: "opacity 0.2s ease, transform 0.2s ease",
                    }}
                  />
                </a>
              </li>
            </ScrollElementReveal>
          );
        })}
      </ol>

      {/* Footer */}
      <ScrollElementReveal>
        <a
          href="https://github.com/raulanto"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-mono text-muted-foreground hover:text-primary transition-colors underline underline-offset-4"
        >
          github.com/raulanto
        </a>
      </ScrollElementReveal>
    </section>
  );
}
