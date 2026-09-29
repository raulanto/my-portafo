"use client";

import React, { useState } from "react";
import {
  Code2,
  ExternalLink,
  Layers,
  ArrowUpRight,
  Sparkles,
  Zap,
  Activity,
  Terminal,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Project = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  highlights: string[];
  tech: string[];
  image: string;
  github?: string;
  demo?: string;
  featured?: boolean;
};

const PROJECTS: Project[] = [
  {
    id: "kanban-platform",
    number: "01",
    title: "Kanban Enterprise System",
    subtitle: "Plataforma de Gestión & Asincronía en Tiempo Real",
    category: "Full Stack • Architecture",
    description:
      "Sistema de gestión de tareas colaborativo construido con arquitectura hexagonal. Integra WebSockets para actualización instantánea de tableros entre equipos y analíticas integradas.",
    highlights: [
      "WebSockets en tiempo real con latencia < 30ms",
      "Persistencia de estado en Redis y PostgreSQL",
      "Interfaz reactiva con soporte multitarea y filtros avanzados",
    ],
    tech: ["Nuxt.js", "Django", "WebSockets", "Redis", "PostgreSQL", "TailwindCSS"],
    image:
      "/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fproject_kanban_platform_1790477301772.jpg&w=1200&q=80",
    github: "https://github.com/raulanto",
    demo: "https://github.com/raulanto",
    featured: true,
  },
  {
    id: "iot-telemetry",
    number: "02",
    title: "IoT Sensor Telemetry Platform",
    subtitle: "Monitoreo & Ingesta Masiva de Datos",
    category: "Backend & Systems",
    description:
      "Plataforma de alta concurrencia diseñada en Go y FastAPI para procesar miles de métricas por segundo provenientes de sensores industriales con alertas automatizadas.",
    highlights: [
      "Ingesta de datos masivos con Go Goroutines",
      "Visualización en vivo de telemetría y salud de BD",
      "Arquitectura distribuida con contenedores Docker & K8s",
    ],
    tech: ["Go", "FastAPI", "PostgreSQL", "Docker", "Vue.js", "TimescaleDB"],
    image:
      "/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fproject_iot_telemetry_1790477316204.jpg&w=1200&q=80",
    github: "https://github.com/raulanto",
  },
  {
    id: "sql-orm-converter",
    number: "03",
    title: "SQL to Django ORM Engine",
    subtitle: "Herramienta Developer-First de Transpilación",
    category: "Developer Tools",
    description:
      "Motor CLI y web para analizar consultas SQL complejas (incluyendo JOINS y Window Functions) y generar automáticamente modelos y queries optimizados en Django ORM.",
    highlights: [
      "Parser AST personalizado para SQL dialecto PostgreSQL",
      "Optimización de n+1 queries automática",
      "Integrado en flujo de trabajo para refactorización de bases legacy",
    ],
    tech: ["Python", "AST Parser", "Django", "TypeScript", "React"],
    image:
      "/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fproject_sql_converter_1790477331564.jpg&w=1200&q=80",
    github: "https://github.com/raulanto",
  },
];

// Fallback image handling if local Next path is resolved directly
const getImageSrc = (img: string) => {
  if (img.includes("project_kanban_platform")) {
    return "/project_kanban_platform_1790477301772.jpg";
  }
  return img;
};

export function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<string>(PROJECTS[0].id);

  const selected = PROJECTS.find((p) => p.id === activeProject) || PROJECTS[0];

  return (
    <section id="proyectos" className="scroll-mt-28 flex flex-col gap-10">
      {/* Clean Flat Section Header */}
      <div className="flex flex-col gap-4 border-b border-border/20 pb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-mono font-bold tracking-wider uppercase">
            <Code2 className="size-3.5" />
            <span>02 / PROYECTOS DESTACADOS</span>
          </div>

          <span className="text-xs font-mono text-muted-foreground">
            Sistemas reales & Arquitectura Full Stack
          </span>
        </div>

        <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-foreground leading-[1.05]">
          Trabajo & <br className="hidden sm:inline" />
          <span className="text-primary font-serif italic font-normal text-[0.95em]">Soluciones Creadas.</span>
        </h2>

        <p className="text-base sm:text-xl text-muted-foreground max-w-3xl font-normal leading-relaxed">
          Selección de aplicaciones web, motores de datos y plataformas de alta escala desarrolladas de punta a punta.
        </p>
      </div>

      {/* Modern Interactive Project Showcase Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Project Selector List */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {PROJECTS.map((project) => {
            const isSelected = project.id === activeProject;
            return (
              <button
                key={project.id}
                onClick={() => setActiveProject(project.id)}
                className={cn(
                  "group relative w-full text-left p-5 sm:p-6 rounded-3xl transition-all duration-300 border cursor-pointer flex flex-col gap-3",
                  isSelected
                    ? "bg-primary/10 border-primary/40 shadow-lg shadow-primary/5"
                    : "bg-card/30 hover:bg-card/60 border-border/40 hover:border-border/80"
                )}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "text-xs font-mono font-bold px-2.5 py-1 rounded-full transition-colors",
                      isSelected
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground group-hover:text-foreground"
                    )}
                  >
                    {project.number}
                  </span>

                  <span className="text-xs font-mono text-muted-foreground">
                    {project.category}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <h3
                    className={cn(
                      "text-xl sm:text-2xl font-bold transition-colors flex items-center justify-between gap-2",
                      isSelected ? "text-primary" : "text-foreground"
                    )}
                  >
                    <span>{project.title}</span>
                    <ArrowUpRight
                      className={cn(
                        "size-5 transition-transform duration-300",
                        isSelected
                          ? "translate-x-0.5 -translate-y-0.5 text-primary"
                          : "opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-muted-foreground"
                      )}
                    />
                  </h3>
                  <p className="text-xs text-muted-foreground font-mono">
                    {project.subtitle}
                  </p>
                </div>

                {/* Tech Pills preview */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tech.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className={cn(
                        "text-[10px] font-mono px-2 py-0.5 rounded-md",
                        isSelected
                          ? "bg-primary/20 text-primary"
                          : "bg-muted/70 text-muted-foreground"
                      )}
                    >
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="text-[10px] font-mono text-muted-foreground px-1 py-0.5">
                      +{project.tech.length - 4}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Active Project Details & Dynamic Display */}
        <div className="lg:col-span-7 flex flex-col gap-6 p-6 sm:p-8 rounded-3xl bg-card/40 border border-border/60 backdrop-blur-xl">
          {/* Image / Mockup Preview */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-border/50 bg-black/40 group">
            <img
              src={
                selected.id === "kanban-platform"
                  ? "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80"
                  : selected.id === "iot-telemetry"
                  ? "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
                  : "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80"
              }
              alt={selected.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent pointer-events-none" />

            <div className="absolute top-4 right-4 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-background/80 backdrop-blur-md border border-border/60 text-xs font-mono text-primary font-bold">
                {selected.category}
              </span>
            </div>
          </div>

          {/* Detailed Info */}
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-foreground">
                {selected.title}
              </h3>
              <p className="text-sm text-primary font-mono font-semibold mt-1">
                {selected.subtitle}
              </p>
            </div>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {selected.description}
            </p>

            {/* Highlights List */}
            <div className="flex flex-col gap-2 pt-2 border-t border-border/20">
              <span className="text-xs font-mono uppercase font-bold text-muted-foreground tracking-wider">
                Highlights Técnicos
              </span>
              <ul className="grid grid-cols-1 gap-2">
                {selected.highlights.map((h, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/90 font-medium"
                  >
                    <span className="size-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Complete Tech Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {selected.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-mono font-bold"
                >
                  #{t}
                </span>
              ))}
            </div>

            {/* Links / Action Bar */}
            <div className="flex items-center gap-3 pt-4 border-t border-border/20">
              {selected.github && (
                <a
                  href={selected.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background hover:bg-foreground/90 text-xs font-bold transition-all hover:scale-105 active:scale-95"
                >
                  <svg
                    className="size-4 fill-current"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <span>Código en GitHub</span>
                </a>
              )}

              {selected.demo && (
                <a
                  href={selected.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 text-xs font-bold transition-all hover:scale-105 active:scale-95"
                >
                  <ExternalLink className="size-4" />
                  <span>Demo en Vivo</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
