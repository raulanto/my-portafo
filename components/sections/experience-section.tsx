"use client";

import React, { useState } from "react";
import {
  Briefcase,
  Building2,
  Calendar,
  MapPin,
  Sparkles,
  CheckCircle2,
  ArrowUpRight,
  ChevronDown,
  Layers,
  Flame,
  Code2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollTextReveal } from "@/components/ui/scroll-text-reveal";

type ExperienceCard = {
  id: string;
  number: string;
  role: string;
  company: string;
  location: string;
  period: string;
  badge?: string;
  tagline: string;
  summary: string;
  responsibilities: string[];
  skills: string[];
};

const EXPERIENCE_ITEMS: ExperienceCard[] = [
  {
    id: "fincrece",
    number: "01",
    role: "Full Stack Developer",
    company: "Fincrece (SOFOM Fintech)",
    location: "Villahermosa, Tabasco",
    period: "Dic 2025 — Junio 2026",
    badge: "Fintech & Security",
    tagline: "Sistemas financieros críticos, Auth JWT, Signals & Microservicios",
    summary:
      "Desarrollo full stack sobre Angular 20, NestJS, FastAPI, Go y Rust con diseño de arquitectura de datos y seguridad.",
    responsibilities: [
      "Desarrollar interfaces web reactivas utilizando Angular y TailwindCSS con AuthStore basado en signals.",
      "Creación e integración de APIs en ASP.NET Core y FastAPI con autenticación JWT argon2id y refresh tokens opacos.",
      "Diseño de arquitectura de base de datos extraída de ~120 entidades en 12 dominios con diagramación ER.",
      "Integración de identidad gubernamental PUI/RENAPO con cifrado biométrico AES-256-GCM en NestJS.",
    ],
    skills: ["Angular 20", "FastAPI", "NestJS", "ASP.NET", "Go", "Rust", "JWT"],
  },
  {
    id: "oilgas",
    number: "02",
    role: "Full Stack & Data Engineer",
    company: "Sector Privado • Oil & Gas",
    location: "Villahermosa, Tabasco",
    period: "Jun 2025 — Ago 2025",
    badge: "Oil & Gas / Data Pipelines",
    tagline: "Sistema de archivos, procesamiento ETL/ELT y dashboards operacionales",
    summary:
      "Solución a la dispersión de datos técnicos petroleros mediante un sistema central en Flask/Vue y pipelines de analítica masiva.",
    responsibilities: [
      "Sistema centralizado de gestión y seguimiento de archivos técnicos operacionales para el sector petrolero.",
      "Dashboards interactivos en tiempo real para el control y seguimiento continuo de insumos y recursos operacionales.",
      "Pipelines ETL/ELT para unificar fuentes de laboratorio heterogéneas y erradicar la dispersión de datos.",
      "Automatización de reportes ejecutivos mejorando la trazabilidad de operaciones de pozo.",
    ],
    skills: ["Flask", "Vue.js", "ETL / ELT", "Python", "SQL", "Dashboards", "Oil & Gas"],
  },
  {
    id: "esie",
    number: "03",
    role: "Frontend Developer",
    company: "Esie (EsieGraph)",
    location: "Villahermosa, Tabasco",
    period: "Ago 2024 — Jun 2025",
    badge: "Enterprise Web",
    tagline: "Visualización de datos empresariales y optimización de APIs",
    summary:
      "Desarrollo e integración de la plataforma EsieGraph en Nuxt.js (Vue.js) para monitoreo y analítica ejecutiva.",
    responsibilities: [
      "Consumo e integración de APIs RESTful para la gestión eficiente de datos empresariales.",
      "Interfaces web responsivas y optimizadas para múltiples dispositivos utilizando Nuxt.js.",
      "Endpoints optimizados para consultas históricas y generación de reportes con reducción de latencia.",
    ],
    skills: ["Nuxt.js", "Vue.js", "REST APIs", "JavaScript", "Optimization", "UI/UX"],
  },
  {
    id: "depuradora",
    number: "04",
    role: "Full Stack IoT Developer",
    company: "Proyecto IoT Depuradora",
    location: "Villahermosa, Tabasco",
    period: "Ago 2023 — Jun 2024",
    badge: "IoT & Realtime",
    tagline: "Monitoreo de sensores en tiempo real con Nuxt.js y Django REST",
    summary:
      "Sistema integral Full Stack de inspección, procesamiento teleférico y almacenamiento de datos de depuradoras.",
    responsibilities: [
      "Sistema de monitoreo IoT con Nuxt.js y Django REST Framework para telemetría en tiempo real.",
      "API RESTful para almacenamiento y procesamiento de datos de sensores garantizando disponibilidad.",
      "Interfaz interactiva con lecturas en directo, gráficos históricos y control de dispositivos IoT.",
    ],
    skills: ["Nuxt.js", "Vue.js", "Django REST", "IoT Sensors", "Python", "Real-time"],
  },
];

export function ExperienceSection() {
  // Active expanded item id (for click/touch toggling)
  const [expandedId, setExpandedId] = useState<string | null>("fincrece");

  return (
    <section id="experiencia" className="scroll-mt-28 flex flex-col gap-12 py-6">
      {/* Minimalist Section Header with Giant Typography */}
      <div className="flex flex-col gap-5 border-b border-border/20 pb-10">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono font-bold tracking-widest uppercase">
            <Briefcase className="size-3.5" />
            <span>03 / TRAYECTORIA & ROLES</span>
          </div>
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
            Hover o Toca una tarjeta para explorar detalles
          </span>
        </div>

        <ScrollTextReveal tag="h2" className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter text-foreground leading-none">
          Experiencia <span className="text-primary font-serif italic font-normal">&amp;</span> <br />
          <span className="bg-gradient-to-r from-foreground via-foreground/90 to-primary/80 bg-clip-text text-transparent">
            Trayectoria.
          </span>
        </ScrollTextReveal>

        <p className="text-base sm:text-xl text-muted-foreground max-w-3xl font-normal leading-relaxed">
          Historial laboral, proyectos clave y atribuciones técnicas en desarrollo web, arquitectura de datos e IoT.
        </p>
      </div>

      {/* Minimalist Big-Type Interactive List */}
      <div className="flex flex-col gap-4">
        {EXPERIENCE_ITEMS.map((item) => {
          const isExpanded = expandedId === item.id;

          return (
            <div
              key={item.id}
              onClick={() => setExpandedId(isExpanded ? null : item.id)}
              className={cn(
                "group relative rounded-3xl border transition-all duration-500 cursor-pointer overflow-hidden backdrop-blur-xl",
                isExpanded
                  ? "bg-card/70 border-primary/40 shadow-2xl shadow-primary/5 p-6 sm:p-10"
                  : "bg-card/20 border-border/40 hover:border-primary/30 hover:bg-card/40 p-6 sm:p-8"
              )}
            >
              {/* Card Header Row */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-start sm:items-center gap-4 sm:gap-6">
                  {/* Big Index Number */}
                  <span
                    className={cn(
                      "text-3xl sm:text-5xl font-black font-mono tracking-tighter transition-colors duration-300 select-none",
                      isExpanded ? "text-primary" : "text-muted-foreground/30 group-hover:text-muted-foreground/60"
                    )}
                  >
                    {item.number}
                  </span>

                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      {item.badge && (
                        <span className="px-2.5 py-0.5 rounded-md bg-primary/10 text-primary text-[11px] font-mono font-bold uppercase tracking-wider">
                          {item.badge}
                        </span>
                      )}
                      <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                        <Calendar className="size-3 text-primary" />
                        {item.period}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
                      {item.role}
                    </h3>

                    <p className="text-sm sm:text-lg font-mono font-bold text-muted-foreground flex items-center gap-2">
                      <Building2 className="size-4 text-primary shrink-0" />
                      <span>{item.company}</span>
                      <span className="text-xs font-normal text-muted-foreground hidden sm:inline">
                        • {item.location}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Right side tagline / expand action indicator */}
                <div className="flex items-center justify-between lg:justify-end gap-4 border-t lg:border-t-0 border-border/20 pt-3 lg:pt-0">
                  <span className="text-xs sm:text-base text-muted-foreground/90 font-serif italic font-normal hidden md:inline-block max-w-xs text-right">
                    {item.tagline}
                  </span>

                  <div
                    className={cn(
                      "p-3 rounded-2xl border transition-all duration-300 flex items-center justify-center shrink-0",
                      isExpanded
                        ? "bg-primary text-primary-foreground border-primary rotate-180"
                        : "bg-muted/50 border-border/40 text-muted-foreground group-hover:border-primary/40 group-hover:text-foreground"
                    )}
                  >
                    <ChevronDown className="size-5" />
                  </div>
                </div>
              </div>

              {/* Revealable Content Description (Smooth Accordion Expand) */}
              <div
                className={cn(
                  "grid transition-all duration-500 ease-in-out overflow-hidden",
                  isExpanded ? "grid-rows-[1fr] opacity-100 pt-8 mt-6 border-t border-border/20" : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="overflow-hidden flex flex-col gap-6">
                  {/* Summary */}
                  <p className="text-base sm:text-xl text-foreground/90 font-medium leading-relaxed max-w-4xl">
                    {item.summary}
                  </p>

                  {/* Key Responsibilities */}
                  <div className="flex flex-col gap-3">
                    <span className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                      <Sparkles className="size-3.5 text-primary" />
                      <span>Atribuciones & Logros Principales:</span>
                    </span>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {item.responsibilities.map((resp, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 p-3.5 rounded-2xl bg-background/50 border border-border/30 hover:border-primary/30 transition-colors"
                        >
                          <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm text-foreground/80 font-medium leading-relaxed">
                            {resp}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Skills / Tech Stack */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {item.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-mono font-bold"
                      >
                        #{skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
