"use client";

import React, { useState } from "react";
import {
  User,
  MapPin,
  Sparkles,
  Copy,
  Check,
  Code2,
  Server,
  Database,
  Terminal,
  MousePointerClick,
} from "lucide-react";
import { InfiniteCanvas, type CanvasNote } from "@/components/ui/infinite-canvas";
import { ScrollTextReveal, ScrollWordOpacity } from "@/components/ui/scroll-text-reveal";

const PORTFOLIO_NOTES: CanvasNote[] = [
  {
    id: "profile",
    x: -140,
    y: -150,
    rotate: -1,
    accent: true,
    title: "Raúl Antonio • Full Stack",
    text: "Desarrollador con más de 3 años de experiencia creando soluciones escalables. Especializado en Vue, Nuxt, Angular, React, Django, Go y FastAPI.",
    tags: ["FullStack", "Arquitectura", "DDD"],
  },
  {
    id: "stat-exp",
    x: 150,
    y: -150,
    rotate: 1.5,
    title: "3+ Años de Experiencia",
    text: "Desarrollo web integral de punta a punta, desde el diseño de arquitectura hasta la entrega en producción.",
    tags: ["Trayectoria", "Seniority"],
  },
  {
    id: "stat-projects",
    x: -140,
    y: 45,
    rotate: 1,
    title: "15+ Proyectos Construidos",
    text: "Sistemas Kanban, dashboards interactivos, monitoreo de sensores y conversores SQL a modelos Django.",
    tags: ["APIs", "Production"],
  },
  {
    id: "stat-blog",
    x: 150,
    y: 45,
    rotate: -1.5,
    title: "17+ Artículos de Blog",
    text: "Guías técnicas sobre refactorización SQL, asincronía en Django, Golang avanzado y WebSockets.",
    tags: ["Blog", "Technical"],
  },
  {
    id: "spec-frontend",
    x: -430,
    y: -50,
    rotate: -2,
    title: "Frontend Reactivo & UI",
    text: "Vue.js, Nuxt.js, Angular, React, TypeScript, TailwindCSS. Interfaces accesibles con arquitectura por componentes.",
    tags: ["Vue", "Nuxt", "Angular"],
  },
  {
    id: "spec-backend",
    x: 440,
    y: -50,
    rotate: 2,
    title: "Backend & APIs",
    text: "NestJS, Django, FastAPI, Go, Laravel, ASP.NET Core. Diseño de APIs RESTful & GraphQL con arquitectura hexagonal.",
    tags: ["Django", "FastAPI", "Go"],
  },
  {
    id: "spec-db",
    x: -430,
    y: 140,
    rotate: 1,
    title: "Bases de Datos & SQL",
    text: "PostgreSQL, MySQL, Supabase, Redis, ORM Django. Refactorización de esquemas legacy y Window Functions.",
    tags: ["PostgreSQL", "SQL"],
  },
  {
    id: "spec-devops",
    x: 440,
    y: 140,
    rotate: -1,
    title: "DevOps & Infraestructura",
    text: "Docker, Kubernetes, Git, CI/CD, Vercel. Despliegues continuos automatizados con cero tiempo de inactividad.",
    tags: ["Docker", "K8s", "CI/CD"],
  },
];

const CANVAS_HOME = { x: 0, y: 0 };

export function AboutSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [viewMode, setViewMode] = useState<"canvas" | "cards">("cards");

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("raulantodev@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="sobre-mi" className="scroll-mt-24 sm:scroll-mt-28 flex flex-col gap-6 sm:gap-8">
      {/* Clean, Flat & Bold Section Header */}
      <div className="flex flex-col gap-4 py-2 border-b border-border/20 pb-6 sm:pb-8">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[11px] sm:text-xs font-mono font-bold tracking-wider uppercase">
            <User className="size-3.5" />
            <span>01 / SOBRE MÍ</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] sm:text-xs font-bold">
            <span className="relative flex size-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full size-2 bg-emerald-500" />
            </span>
            <span>Disponible para proyectos</span>
          </div>
        </div>

        <ScrollTextReveal tag="h2" className="text-3xl sm:text-6xl md:text-7xl font-black tracking-tight text-foreground leading-[1.08]">
          Sobre Mí & <br className="hidden sm:inline" />
          <span className="text-primary">Trayectoria.</span>
        </ScrollTextReveal>

        <ScrollWordOpacity tag="p" className="text-sm sm:text-lg text-muted-foreground max-w-3xl font-medium leading-relaxed">
          Explora mi mapa de habilidades e historia profesional en este lienzo interactivo o en formato de tarjetas.
        </ScrollWordOpacity>
      </div>

      {/* View Mode Toggle for Responsive Experience */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between flex-wrap gap-2 px-1 text-xs text-muted-foreground font-mono">
          <span className="flex items-center gap-1.5 text-primary font-semibold text-[11px] sm:text-xs">
            <MousePointerClick className="size-3.5 sm:size-4" />
            <span>{viewMode === "canvas" ? "Canvas Infinito Interactivo" : "Vista Tarjetas Organizadas"}</span>
          </span>

          {/* View Switch Buttons */}
          <div className="flex items-center p-1 rounded-full bg-muted/50 border border-border/40">
            <button
              onClick={() => setViewMode("cards")}
              className={`px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold transition-all cursor-pointer ${
                viewMode === "cards"
                  ? "bg-background text-foreground shadow-sm font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Tarjetas
            </button>
            <button
              onClick={() => setViewMode("canvas")}
              className={`px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold transition-all cursor-pointer ${
                viewMode === "canvas"
                  ? "bg-background text-foreground shadow-sm font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Canvas
            </button>
          </div>
        </div>

        {/* Conditional View Rendering: Canvas vs Cards */}
        {viewMode === "canvas" ? (
          <InfiniteCanvas
            notes={PORTFOLIO_NOTES}
            home={CANVAS_HOME}
            label="Tablero personal de Raúl Antonio"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 animate-in fade-in-50 duration-300">
            {PORTFOLIO_NOTES.map((note) => (
              <div
                key={note.id}
                className={`flex flex-col justify-between gap-3 rounded-2xl p-5 border backdrop-blur-md transition-all hover:scale-[1.02] shadow-sm ${
                  note.accent
                    ? "bg-gradient-to-br from-primary/95 to-purple-600/95 text-white border-primary/40 shadow-primary/15 sm:col-span-2"
                    : "bg-card/70 text-card-foreground border-border/70 hover:border-primary/40"
                }`}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-bold tracking-tight">
                      {note.title}
                    </span>
                    <span
                      className={`size-2 rounded-full shrink-0 ${
                        note.accent ? "bg-emerald-400 animate-pulse" : "bg-primary"
                      }`}
                    />
                  </div>
                  <p
                    className={`text-xs leading-relaxed ${
                      note.accent ? "text-white/90" : "text-muted-foreground"
                    }`}
                  >
                    {note.text}
                  </p>
                </div>

                {note.tags && note.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-current/10">
                    {note.tags.map((t) => (
                      <span
                        key={t}
                        className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold ${
                          note.accent
                            ? "bg-white/15 text-white"
                            : "bg-muted/80 text-muted-foreground"
                        }`}
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Profile Info Details Flat Bar */}
      <div className="py-4 px-1 sm:px-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 border-t border-border/20">
        <div className="flex items-center gap-3 sm:gap-4">
          <img
            src="https://avatars.githubusercontent.com/u/74162376?v=4"
            alt="Raúl Antonio"
            className="size-12 sm:size-14 rounded-full border-2 border-primary/30 object-cover shrink-0"
          />
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1.5">
              <h3 className="text-lg sm:text-xl font-bold text-foreground">
                Raúl Antonio
              </h3>
              <Sparkles className="size-3.5 sm:size-4 text-primary" />
            </div>
            <p className="text-[11px] sm:text-xs font-mono font-semibold text-primary">
              Full Stack Developer • México
            </p>
            <p className="text-[11px] sm:text-xs text-muted-foreground font-mono">
              raulantodev@gmail.com
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={handleCopyEmail}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-primary/10 hover:bg-primary/20 text-xs font-bold text-primary transition-all cursor-pointer active:scale-95 min-h-[44px]"
            title="Copiar correo de contacto"
          >
            {copiedEmail ? (
              <>
                <Check className="size-4 text-emerald-500" />
                <span className="text-emerald-500">Copiado</span>
              </>
            ) : (
              <>
                <Copy className="size-4" />
                <span>Copiar Email</span>
              </>
            )}
          </button>

          <a
            href="https://github.com/raulanto"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-muted/80 hover:bg-muted text-foreground transition-all hover:scale-105 active:scale-95 min-h-[44px] min-w-[44px] flex items-center justify-center"
            title="Ver GitHub"
            aria-label="Ver GitHub"
          >
            <svg
              className="size-4 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
