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
import { ScrollTextReveal, ScrollWordOpacity, ScrollElementReveal } from "@/components/ui/scroll-text-reveal";

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
    <section id="experiencia" className="scroll-mt-24 sm:scroll-mt-28 flex flex-col gap-8 sm:gap-12 py-4 sm:py-6">
      {/* Minimalist Section Header with Giant Typography */}
      <div className="flex flex-col gap-4 sm:gap-5 border-b border-border/20 pb-6 sm:pb-10">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-[11px] sm:text-xs font-mono font-bold tracking-widest uppercase">
            <Briefcase className="size-3.5" />
            <span>04 / TRAYECTORIA & ROLES</span>
          </div>
          <span className="text-[11px] sm:text-xs font-mono text-muted-foreground uppercase tracking-wider">
            Toca una tarjeta para ver detalles
          </span>
        </div>

        <ScrollTextReveal tag="h2" className="text-3xl sm:text-6xl md:text-8xl font-black tracking-tighter text-foreground leading-[1.05]">
          Experiencia <span className="text-primary font-serif italic font-normal">&amp;</span> <br />
          <span className="bg-gradient-to-r from-foreground via-foreground/90 to-primary/80 bg-clip-text text-transparent">
            Trayectoria.
          </span>
        </ScrollTextReveal>

        <ScrollWordOpacity tag="p" className="text-sm sm:text-xl text-muted-foreground max-w-3xl font-normal leading-relaxed">
          Historial laboral, proyectos clave y atribuciones técnicas en desarrollo web, arquitectura de datos e IoT.
        </ScrollWordOpacity>
      </div>

      {/* Editorial Minimalist Interactive List */}
      <div className="flex flex-col">
        {EXPERIENCE_ITEMS.map((item, idx) => {
          const isExpanded = expandedId === item.id;

          return (
            <ScrollElementReveal key={item.id} delay={idx * 0.08}>
              <div
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className={cn(
                  "group py-6 sm:py-10 border-b border-border/30 transition-all duration-300 cursor-pointer"
                )}
              >
                {/* Main Line / Summary Row */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4">
                  <div className="flex items-start sm:items-baseline gap-3 sm:gap-8">
                    <span
                      className={cn(
                        "text-lg sm:text-2xl font-mono tracking-tighter transition-colors duration-300 select-none shrink-0 mt-0.5 sm:mt-0",
                        isExpanded ? "text-primary font-bold" : "text-muted-foreground/50 group-hover:text-muted-foreground"
                      )}
                    >
                      {item.number}
                    </span>

                    <div className="flex flex-col gap-1 flex-1">
                      <h3 className="text-xl sm:text-3xl md:text-5xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
                        {item.role}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 text-xs sm:text-base text-muted-foreground font-mono">
                        <span className="font-semibold text-foreground/90">{item.company}</span>
                        <span>•</span>
                        <span>{item.period}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between lg:justify-end gap-4 sm:gap-6 pt-1 sm:pt-0">
                    <span className="text-xs sm:text-sm font-mono text-muted-foreground">
                      {item.location}
                    </span>

                    <div
                      className={cn(
                        "size-8 sm:size-9 rounded-full border border-border/40 flex items-center justify-center transition-all duration-300 shrink-0",
                        isExpanded
                          ? "bg-primary text-primary-foreground border-primary rotate-180"
                          : "bg-transparent text-muted-foreground group-hover:border-primary/50 group-hover:text-foreground"
                      )}
                    >
                      <ChevronDown className="size-4" />
                    </div>
                  </div>
                </div>

                {/* Revealable Content Description */}
                <div
                  className={cn(
                    "grid transition-all duration-500 ease-in-out overflow-hidden",
                    isExpanded ? "grid-rows-[1fr] opacity-100 pt-6 mt-4" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden flex flex-col gap-6 pl-0 sm:pl-16 max-w-4xl">
                    <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-normal">
                      {item.summary}
                    </p>

                    {/* Bullet points */}
                    <div className="flex flex-col gap-2.5">
                      {item.responsibilities.map((resp, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <span className="size-1.5 rounded-full bg-primary/80 mt-2 shrink-0" />
                          <span className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-medium">
                            {resp}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Clean Tech Pills */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {item.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 rounded-full bg-muted/50 text-muted-foreground text-xs font-mono border border-border/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollElementReveal>
          );
        })}
      </div>
    </section>
  );
}
