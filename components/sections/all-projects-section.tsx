"use client";

import React, { useState, useRef, useMemo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { ScrollTextReveal } from "@/components/ui/scroll-text-reveal";
import { ALL_PROJECTS, type ProjectItem } from "@/data/projects";
import { cn } from "@/lib/utils";

// Category definitions
const CATEGORIES = [
  { id: "all", label: "Todos" },
  { id: "Full Stack", label: "Full Stack" },
  { id: "Backend", label: "Backend" },
  { id: "Frontend", label: "Frontend" },
  { id: "Tools", label: "Tools & CLI" },
  { id: "Mobile", label: "Mobile / GUI" },
] as const;

// Typographic scattering patterns across the screen
interface ScatterConfig {
  align: "start" | "center" | "end";
  offsetClass: string;
  fontStyle: "sans-black" | "serif-italic" | "sans-bold";
  parallaxDirection: 1 | -1;
  speed: number;
}

const SCATTER_PATTERNS: ScatterConfig[] = [
  {
    align: "start",
    offsetClass: "pl-2 sm:pl-8 lg:pl-16",
    fontStyle: "sans-black",
    parallaxDirection: 1,
    speed: 45,
  },
  {
    align: "end",
    offsetClass: "pr-2 sm:pr-12 lg:pr-28",
    fontStyle: "serif-italic",
    parallaxDirection: -1,
    speed: 55,
  },
  {
    align: "center",
    offsetClass: "px-4 sm:px-10",
    fontStyle: "sans-bold",
    parallaxDirection: 1,
    speed: 35,
  },
  {
    align: "start",
    offsetClass: "pl-4 sm:pl-20 lg:pl-48",
    fontStyle: "serif-italic",
    parallaxDirection: -1,
    speed: 60,
  },
  {
    align: "end",
    offsetClass: "pr-4 sm:pr-24 lg:pr-40",
    fontStyle: "sans-black",
    parallaxDirection: 1,
    speed: 50,
  },
  {
    align: "start",
    offsetClass: "pl-2 sm:pl-10 lg:pl-24",
    fontStyle: "sans-bold",
    parallaxDirection: -1,
    speed: 40,
  },
  {
    align: "center",
    offsetClass: "px-2 sm:px-8",
    fontStyle: "sans-black",
    parallaxDirection: 1,
    speed: 65,
  },
  {
    align: "end",
    offsetClass: "pr-2 sm:pr-16 lg:pr-32",
    fontStyle: "serif-italic",
    parallaxDirection: -1,
    speed: 45,
  },
];

// Single Scattered Typographic Row (No bounding box cards)
function ScatteredProjectRow({
  project,
  index,
  pattern,
  isHovered,
  isDimmed,
  onHover,
  onLeave,
  containerScrollProgress,
  shouldReduceMotion,
}: {
  project: ProjectItem;
  index: number;
  pattern: ScatterConfig;
  isHovered: boolean;
  isDimmed: boolean;
  onHover: () => void;
  onLeave: () => void;
  containerScrollProgress: any;
  shouldReduceMotion: boolean | null;
}) {
  const rowRef = useRef<HTMLDivElement>(null);

  // Parallax horizontal drift based on scroll progress
  const driftDistance = pattern.speed * pattern.parallaxDirection;
  const x = useTransform(
    containerScrollProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [-driftDistance, driftDistance]
  );

  const formattedNum = String(index + 1).padStart(2, "0");
  const href = project.url || project.github || "https://github.com/raulantodev";

  return (
    <motion.div
      ref={rowRef}
      style={{ x }}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.7,
        delay: Math.min((index % 4) * 0.08, 0.25),
        ease: [0.23, 1, 0.32, 1],
      }}
      className={cn(
        "relative w-full flex items-center py-4 sm:py-6 lg:py-8 select-none transition-opacity duration-300",
        pattern.align === "start" && "justify-start",
        pattern.align === "center" && "justify-center text-center",
        pattern.align === "end" && "justify-end text-right",
        pattern.offsetClass
      )}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        className={cn(
          "group relative inline-flex flex-col gap-1.5 cursor-pointer",
          "transition-all duration-300",
          isDimmed ? "opacity-20 filter blur-[0.5px]" : "opacity-100",
          isHovered ? "scale-[1.03] sm:scale-[1.05]" : "scale-100"
        )}
      >
        <div className="inline-flex items-baseline gap-3 sm:gap-6 flex-wrap">
          {/* Project Number (Index) */}
          <span
            className={cn(
              "text-xs sm:text-sm md:text-base font-mono tabular-nums font-bold tracking-wider shrink-0 transition-colors duration-200",
              isHovered ? "text-primary" : "text-muted-foreground/60"
            )}
          >
            ({formattedNum})
          </span>

          {/* Giant Scattered Typography Headline */}
          <span
            className={cn(
              "text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tighter leading-[1.02] transition-colors duration-200",
              pattern.fontStyle === "sans-black" && "font-black text-foreground",
              pattern.fontStyle === "serif-italic" &&
                "font-serif italic font-normal text-foreground/90",
              pattern.fontStyle === "sans-bold" && "font-bold text-foreground",
              isHovered && "text-primary"
            )}
          >
            {project.title}
          </span>

          {/* Category Tag attached to typography */}
          <span
            className={cn(
              "hidden md:inline-flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-1 rounded-full uppercase tracking-wider transition-all duration-200",
              isHovered
                ? "bg-primary text-primary-foreground opacity-100 translate-x-1"
                : "bg-muted/40 text-muted-foreground/70 border border-border/30 opacity-75"
            )}
          >
            {project.category}
          </span>

          {/* Minimalist Arrow Reveal on Hover */}
          <ArrowUpRight
            className={cn(
              "size-5 sm:size-8 md:size-10 shrink-0 text-primary transition-all duration-300",
              isHovered
                ? "opacity-100 translate-x-1 -translate-y-1 scale-110"
                : "opacity-0 -translate-x-2 translate-y-2 scale-75"
            )}
          />
        </div>

        {/* Tech tags preview visible on hover */}
        <div
          className={cn(
            "flex items-center gap-2 pl-6 sm:pl-10 text-xs font-mono transition-all duration-300",
            isHovered
              ? "opacity-100 max-h-8 translate-y-0"
              : "opacity-0 max-h-0 pointer-events-none -translate-y-1 overflow-hidden"
          )}
        >
          {project.tech.map((t) => (
            <span key={t} className="text-primary font-medium">
              #{t}
            </span>
          ))}
          {project.highlight && (
            <span className="hidden sm:inline text-muted-foreground">
              • {project.highlight}
            </span>
          )}
        </div>
      </a>
    </motion.div>
  );
}

export function AllProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll Progress across section for multi-track Parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Filter projects by category
  const filteredProjects = useMemo(() => {
    if (selectedCategory === "all") return ALL_PROJECTS;
    if (selectedCategory === "Tools") {
      return ALL_PROJECTS.filter(
        (p) => p.category === "Tools" || p.category === "CLI"
      );
    }
    if (selectedCategory === "Mobile") {
      return ALL_PROJECTS.filter(
        (p) => p.category === "Mobile" || p.category === "GUI"
      );
    }
    return ALL_PROJECTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section
      ref={containerRef}
      id="proyectos"
      className="relative scroll-mt-24 sm:scroll-mt-28 flex flex-col items-center gap-12 sm:gap-20 w-full overflow-hidden py-8 sm:py-16"
    >
      {/* Background Subtle Gradient Lighting (No cards/boxes) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] sm:size-[800px] rounded-full bg-primary/[0.04] blur-[160px] -z-10"
      />

      {/* Minimalist Section Header */}
      <div className="flex flex-col items-center text-center gap-3 px-4 max-w-3xl mx-auto">
        <span className="text-[11px] sm:text-xs font-mono text-muted-foreground tracking-widest uppercase px-3.5 py-1 rounded-full bg-muted/40 border border-border/30">
          03 / Proyectos & Experimentos
        </span>

        <ScrollTextReveal
          tag="h2"
          className="text-3xl sm:text-6xl md:text-7xl font-black tracking-tight text-foreground leading-[1.05]"
        >
          Trabajos & <br className="hidden sm:inline" />
          <span className="text-primary font-serif italic font-normal text-[0.95em]">
            Construcciones Digitales.
          </span>
        </ScrollTextReveal>

        <p className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-xl font-normal leading-relaxed mt-1">
          Una colección dispersa de sistemas web, arquitecturas backend, CLI y herramientas desarrolladas a medida.
        </p>

        {/* Minimalist Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pt-3">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setHoveredId(null);
                }}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-200 cursor-pointer select-none active:scale-[0.96]",
                  isSelected
                    ? "bg-foreground text-background dark:bg-primary dark:text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                )}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Giant Scattered Typographic Canvas */}
      <div
        className="w-full flex flex-col py-6 sm:py-10 min-h-[600px] relative"
        onMouseLeave={() => setHoveredId(null)}
      >
        {filteredProjects.map((project, idx) => {
          const pattern = SCATTER_PATTERNS[idx % SCATTER_PATTERNS.length];
          const isHovered = hoveredId === project.id;
          const isDimmed = hoveredId !== null && !isHovered;

          return (
            <ScatteredProjectRow
              key={project.id}
              project={project}
              index={idx}
              pattern={pattern}
              isHovered={isHovered}
              isDimmed={isDimmed}
              onHover={() => setHoveredId(project.id)}
              onLeave={() => setHoveredId(null)}
              containerScrollProgress={scrollYProgress}
              shouldReduceMotion={shouldReduceMotion}
            />
          );
        })}
      </div>

      {/* Minimalist Footer Link */}
      <div className="flex items-center justify-center pt-8 border-t border-border/20 w-full max-w-xl">
        <a
          href="https://github.com/raulantodev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs sm:text-sm font-mono text-muted-foreground hover:text-primary transition-colors duration-200 underline underline-offset-4 flex items-center gap-1.5 group active:scale-[0.96]"
        >
          <span>Explorar todos los repositorios en github.com/raulantodev</span>
          <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </section>
  );
}
