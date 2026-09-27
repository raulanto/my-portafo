"use client";

import React, { useState } from "react";
import {
  Briefcase,
  Building2,
  Calendar,
  MapPin,
  ShieldCheck,
  Code2,
  Database,
  Lock,
  Cpu,
  ArrowUpRight,
  Flame,
  FileSpreadsheet,
  CheckCircle2,
  Globe,
  Radio,
  Layers,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

type TimelineItem = {
  id: string;
  period: string;
  role: string;
  company: string;
  location: string;
  projectName?: string;
  summary?: string;
  responsibilities: string[];
  skills: string[];
  badge?: string;
};

type ExperienceItem = {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  badge: string;
  summary: string;
  highlights: { title: string; desc: string; icon: React.ElementType }[];
  skills: string[];
  context?: string[];
};

type IndependentProject = {
  id: string;
  title: string;
  category: string;
  tech: string[];
  description: string;
};

// Chronological Timeline Data requested by user
const TIMELINE_EXPERIENCE: TimelineItem[] = [
  {
    id: "fincrece-timeline",
    period: "Dic 2025 - Junio 2026",
    role: "Full Stack Developer",
    company: "Fincrece (SOFOM Fintech)",
    location: "Villahermosa, Tabasco",
    badge: "Actual / Reciente",
    summary:
      "Desarrollo de interfaces de usuario y consumo de microservicios financieros con arquitectura de alto rendimiento.",
    responsibilities: [
      "Desarrollar interfaces web reactivas utilizando Angular y TailwindCSS.",
      "Implementar diseños responsivos y compatibles con distintos navegadores garantizando accesibilidad.",
      "Creación e integración de APIs y servicios definidos por el equipo back-end en ASP.NET Core y FastAPI.",
      "Implementación de flujos de autenticación segura (JWT, OAuth PKCE) y gestión de roles y permisos.",
    ],
    skills: ["Angular", "ASP.NET", "FastAPI", "JWT", "TypeScript", "TailwindCSS"],
  },
  {
    id: "oilgas-timeline",
    period: "Jun 2025 - Ago 2025",
    role: "Full Stack & Data Engineer",
    company: "Sector Privado • Oil & Gas",
    location: "Villahermosa, Tabasco",
    badge: "Oil & Gas / Data Pipelines",
    projectName: "Sistema de Archivos & Seguimiento de Insumos",
    summary:
      "Desarrollo e integración de soluciones web y analítica de datos para dar solución a la dispersión de información crítica del sector petrolero.",
    responsibilities: [
      "Creación e implementación de un sistema centralizado de gestión y seguimiento de archivos técnicos para el sector privado de Oil & Gas.",
      "Diseño e integración de dashboards interactivos en tiempo real para el control y seguimiento continuo de insumos y recursos operacionales.",
      "Desarrollo e implementación de pipelines de procesamiento de datos ETL y ELT para unificar fuentes heterogéneas y erradicar la dispersión de datos.",
      "Automatización de reportes ejecutivos y técnicos mejorando la toma de decisiones y la trazabilidad de operaciones de pozo y laboratorio.",
    ],
    skills: ["Flask", "Vue.js", "ETL / ELT", "Python", "SQL", "Dashboards", "Oil & Gas"],
  },
  {
    id: "esie-timeline",
    period: "Ago 2024 - Jun 2025",
    role: "Frontend Developer",
    company: "Esie (EsieGraph)",
    location: "Villahermosa, Tabasco",
    badge: "Enterprise Web",
    projectName: "Plataforma EsieGraph",
    summary:
      "Desarrollo e integración de la plataforma EsieGraph para visualización y gestión eficiente de datos empresariales.",
    responsibilities: [
      "Desarrollé e implementé el consumo e integración de APIs RESTful para la gestión eficiente de datos empresariales.",
      "Diseñé y construí interfaces web responsivas optimizadas para múltiples dispositivos, mejorando la experiencia de usuario utilizando Nuxt.js (Vue.js).",
      "Creé endpoints optimizados para consultas históricas y generación de reportes, reduciendo significativamente los tiempos de respuesta.",
    ],
    skills: ["Nuxt.js", "Vue.js", "REST APIs", "JavaScript", "Optimization", "UI/UX"],
  },
  {
    id: "depuradora-timeline",
    period: "Ago 2023 - Jun 2024",
    role: "Desarrollador de Software Full Stack",
    company: "Proyecto de Ingeniería IoT",
    location: "Villahermosa, Tabasco",
    badge: "Sistema IoT & Realtime",
    projectName: "Sistema de Monitoreo para Depuradora",
    summary:
      "Desarrollo integral Full Stack para el control, procesamiento de datos e inspección en tiempo real de sensores en depuradoras.",
    responsibilities: [
      "Desarrollé un sistema completo Full Stack de monitoreo IoT utilizando Nuxt.js (Vue.js) y Django REST Framework para el control y monitoreo de sensores en tiempo real.",
      "Implementé una API RESTful robusta para la gestión, procesamiento y almacenamiento de datos de sensores, garantizando la integridad y disponibilidad de la información.",
      "Creé una interfaz de usuario interactiva con Nuxt.js para la visualización en tiempo real de lecturas, gráficos históricos y gestión de dispositivos IoT.",
      "Logré una integración completa entre frontend y backend mediante el consumo eficiente de API RESTful, garantizando comunicación fluida y manejo óptimo de estados.",
    ],
    skills: [
      "Nuxt.js",
      "Vue.js",
      "Django REST Framework",
      "IoT Sensors",
      "Python",
      "Real-time Data",
    ],
  },
];

const MAIN_EXPERIENCE: ExperienceItem[] = [
  {
    id: "fincrece",
    role: "Full Stack Developer (Mid)",
    company: "FINCRECE SAPI de CV SOFOM ENR",
    location: "Villahermosa, Tabasco",
    period: "Actualidad",
    type: "Fintech / SOFOM",
    badge: "Rol Principal",
    summary:
      "Desarrollo Full Stack de sistemas financieros críticos en arquitectura hexagonal sobre Angular, NestJS, FastAPI, Go y Rust.",
    highlights: [
      {
        icon: Lock,
        title: "Autenticación & Seguridad JWT",
        desc: "FastAPI con argon2id, refresh tokens opacos, blocklisting en Redis y RBAC/ABAC granular.",
      },
      {
        icon: Database,
        title: "Arquitectura de Datos",
        desc: "Extracción de ~120 entidades en 12 dominios, diagramación ER y roadmap de migración en 5 fases.",
      },
      {
        icon: ShieldCheck,
        title: "Validación Identidad PUI/RENAPO",
        desc: "Integración en NestJS con cifrado biométrico AES-256-GCM y cumplimiento normativo CONDUSEF/CNBV.",
      },
      {
        icon: Code2,
        title: "Frontend Angular 20 & Signals",
        desc: "Flujo OAuth PKCE, AuthStore con Signals, interceptores funcionales y Design System Angular Material M3.",
      },
      {
        icon: Cpu,
        title: "Procesamiento de Datos & SQL",
        desc: "Optimización de reportes PDF/Excel y corrección de agregaciones complejas en MySQL.",
      },
    ],
    skills: [
      "Angular 20",
      "NestJS",
      "FastAPI",
      "Go",
      "Rust",
      "TypeScript",
      "Redis",
      "MySQL",
      "CONDUSEF / CNBV",
    ],
    context: [
      "Contexto regulatorio fintech (CONDUSEF, CNBV, SOFOM)",
      "Validación CLABE / RFC / CURP",
      "Control de cartera vencida y ciclo crediticio",
    ],
  },
  {
    id: "oil-gas-systems",
    role: "Full Stack & ETL Engineer",
    company: "Sector Oil & Gas / SILM",
    location: "Tabasco, México (Sector Petrolero)",
    period: "Proyecto Sectorial",
    type: "Oil & Gas / Analítica",
    badge: "Sistemas & Data Pipelines",
    summary:
      "Diseño e implementación de sistema centralizado de seguimiento de archivos y pipelines de datos ETL/ELT para automatización de reportes operacionales del ramo petrolero.",
    highlights: [
      {
        icon: FileSpreadsheet,
        title: "Sistema de Documentación Flask + Vue",
        desc: "Plataforma web para seguimiento, clasificación y versión en vivo de archivos técnicos de exploración y producción petrolera.",
      },
      {
        icon: Database,
        title: "Pipelines de Datos ETL / ELT",
        desc: "Desarrollo de flujos de extracción, transformación y carga para procesar reportes masivos de laboratorio y operaciones de pozo.",
      },
      {
        icon: ShieldCheck,
        title: "Aseguramiento de Calidad EMA & CONAGUA",
        desc: "Control riguroso de resultados de ensayo químico y muestreo de agua para el sector petrolero y minero.",
      },
    ],
    skills: [
      "Flask",
      "Vue.js",
      "ETL / ELT",
      "Python",
      "SQL",
      "Oil & Gas Reports",
      "Normativa EMA",
    ],
    context: [
      "Industria petrolera y minera en Tabasco",
      "Trazabilidad documental e inspección de reportes operacionales",
      "Formatos normalizados de muestreo ambiental y análisis",
    ],
  },
];

const INDEPENDENT_PROJECTS: IndependentProject[] = [
  {
    id: "aparceriapro",
    title: "AparceríaPro",
    category: "Monorepo Ganadero",
    description:
      "Nuxt 3 + NestJS con trazabilidad SENASICA, validadores RFC/CURP/CLABE y auditoría AsyncLocalStorage.",
    tech: ["Nuxt 3", "NestJS", "SENASICA", "TypeORM"],
  },
  {
    id: "sgoc",
    title: "SGOC (Gestión de Obras)",
    category: "GIS & GeoData",
    description:
      "Plataforma Django/Unfold con mapas interactivos Leaflet, Chart.js y conversión UTM vía pyproj.",
    tech: ["Django", "Leaflet", "Chart.js", "Python"],
  },
  {
    id: "flutter-gastos",
    title: "Gestor de Gastos Offline",
    category: "Mobile App",
    description:
      "App Flutter offline-first (Riverpod, Drift, GoRouter) con widgets de inicio Android/iOS.",
    tech: ["Flutter", "Riverpod", "Drift", "Widgets"],
  },
  {
    id: "go-grpc",
    title: "Servicio Go gRPC",
    category: "Microservicios",
    description:
      "Servicio de usuarios con arquitectura hexagonal, streaming server-side e interceptores gRPC.",
    tech: ["Go", "gRPC", "Hexagonal", "Streaming"],
  },
  {
    id: "rust-proxy",
    title: "Reverse Proxy en Rust",
    category: "Systems & Net",
    description:
      "Proxy reverso de alto rendimiento y monitoreo construido con Axum y Tokio runtime.",
    tech: ["Rust", "Axum", "Tokio", "Networking"],
  },
];

export function ExperienceSection() {
  const [activeTab, setActiveTab] = useState<"timeline" | "fincrece" | "oilgas" | "independent">("timeline");

  const selectedExp =
    activeTab === "fincrece"
      ? MAIN_EXPERIENCE[0]
      : MAIN_EXPERIENCE[1];

  return (
    <section id="experiencia" className="scroll-mt-28 flex flex-col gap-10">
      {/* Section Header */}
      <div className="flex flex-col gap-4 border-b border-border/20 pb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-mono font-bold tracking-wider uppercase">
            <Briefcase className="size-3.5" />
            <span>03 / TRAYECTORIA PROFESIONAL</span>
          </div>

          <span className="text-xs font-mono text-muted-foreground">
            Línea de Tiempo & Arquitectura de Software
          </span>
        </div>

        <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-foreground leading-[1.05]">
          Experiencia & <br className="hidden sm:inline" />
          <span className="text-primary">Línea de Tiempo.</span>
        </h2>

        <p className="text-base sm:text-lg text-muted-foreground max-w-3xl font-medium leading-relaxed">
          Historial laboral detallado, roles desempeñados y atribuciones clave en desarrollo web, IoT y Fintech.
        </p>
      </div>

      {/* Interactive Tab Switcher */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-card/60 border border-border/60 w-fit backdrop-blur-md flex-wrap">
        <button
          onClick={() => setActiveTab("timeline")}
          className={cn(
            "flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer select-none",
            activeTab === "timeline"
              ? "bg-primary text-primary-foreground shadow-md"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
          )}
        >
          <Calendar className="size-4" />
          <span>Línea de Tiempo Cronológica</span>
        </button>

        <button
          onClick={() => setActiveTab("fincrece")}
          className={cn(
            "flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer select-none",
            activeTab === "fincrece"
              ? "bg-primary text-primary-foreground shadow-md"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
          )}
        >
          <Building2 className="size-4" />
          <span>Detalle Fincrece (Fintech)</span>
        </button>

        <button
          onClick={() => setActiveTab("oilgas")}
          className={cn(
            "flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer select-none",
            activeTab === "oilgas"
              ? "bg-primary text-primary-foreground shadow-md"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
          )}
        >
          <Flame className="size-4" />
          <span>Sector Oil & Gas (ETL/Flask)</span>
        </button>

        <button
          onClick={() => setActiveTab("independent")}
          className={cn(
            "flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer select-none",
            activeTab === "independent"
              ? "bg-primary text-primary-foreground shadow-md"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
          )}
        >
          <Code2 className="size-4" />
          <span>Proyectos Independientes</span>
        </button>
      </div>

      {/* Content View */}
      {activeTab === "timeline" ? (
        /* Timeline View */
        <div className="relative flex flex-col gap-10 pl-6 sm:pl-10 before:absolute before:left-3 sm:before:left-4.5 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-primary before:via-primary/50 before:to-transparent">
          {TIMELINE_EXPERIENCE.map((item, idx) => (
            <div
              key={item.id}
              className="relative flex flex-col gap-5 p-6 sm:p-9 rounded-3xl bg-card/30 border border-border/40 hover:border-primary/50 hover:bg-card/50 backdrop-blur-xl transition-all duration-300 group hover:shadow-xl hover:shadow-primary/5"
            >
              {/* Timeline Glowing Pulsing Node */}
              <div className="absolute -left-7.5 sm:-left-11 top-9 flex items-center justify-center">
                <span className="animate-ping absolute inline-flex size-5 rounded-full bg-primary/40 opacity-75" />
                <div className="relative size-4 sm:size-5 rounded-full border-4 border-background bg-primary shadow-md group-hover:scale-125 transition-transform duration-300" />
              </div>

              {/* Header Info */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-border/20 pb-5">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono font-bold border border-primary/20">
                      {item.period}
                    </span>
                    {item.badge && (
                      <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold border border-emerald-500/20">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors duration-300 mt-1">
                    {item.role}
                  </h3>
                  <p className="text-sm sm:text-base font-mono font-bold text-primary flex items-center gap-2">
                    <Building2 className="size-4 shrink-0" />
                    <span>{item.company}</span>
                    {item.projectName && (
                      <span className="text-muted-foreground font-semibold">
                        — {item.projectName}
                      </span>
                    )}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground self-start md:self-auto bg-muted/50 px-3 py-1.5 rounded-full border border-border/30">
                  <MapPin className="size-3.5 text-primary" />
                  <span>{item.location}</span>
                </div>
              </div>

              {item.summary && (
                <p className="text-sm sm:text-base text-muted-foreground font-medium leading-relaxed">
                  {item.summary}
                </p>
              )}

              {/* Responsibilities & Achievements */}
              <div className="flex flex-col gap-3 pt-2">
                <span className="text-xs font-mono font-bold text-foreground/80 uppercase tracking-widest flex items-center gap-2">
                  <Sparkles className="size-3.5 text-primary" />
                  <span>Atribuciones & Logros Clave:</span>
                </span>
                <ul className="grid grid-cols-1 gap-2.5">
                  {item.responsibilities.map((resp, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-xs sm:text-sm text-foreground/90 font-medium leading-relaxed p-2.5 rounded-2xl hover:bg-primary/5 transition-colors"
                    >
                      <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack Tags */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-border/20">
                {item.skills.map((s) => (
                  <span
                    key={s}
                    className="px-3.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-mono font-bold hover:bg-primary/20 transition-colors"
                  >
                    #{s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : activeTab !== "independent" ? (
        /* Detailed Fintech or OilGas View */
        <div className="flex flex-col gap-8">
          <div className="p-6 sm:p-8 rounded-3xl bg-card/40 border border-border/60 backdrop-blur-xl flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/20 pb-6">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold">
                    {selectedExp.badge}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono font-bold">
                    {selectedExp.type}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-black text-foreground mt-1">
                  {selectedExp.role}
                </h3>
                <p className="text-sm sm:text-base text-primary font-mono font-bold flex items-center gap-2">
                  <Building2 className="size-4 shrink-0" />
                  <span>{selectedExp.company}</span>
                </p>
              </div>

              <div className="flex flex-col md:items-end gap-1 text-xs font-mono text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Calendar className="size-3.5" />
                  <span>{selectedExp.period}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="size-3.5" />
                  <span>{selectedExp.location}</span>
                </div>
              </div>
            </div>

            <p className="text-base text-muted-foreground font-medium leading-relaxed">
              {selectedExp.summary}
            </p>

            {/* Context Pills */}
            {selectedExp.context && (
              <div className="p-4 rounded-2xl bg-muted/40 border border-border/40 flex flex-col gap-2">
                <span className="text-xs font-mono font-bold text-foreground/80 uppercase">
                  Contexto Sectorial & Operativo:
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedExp.context.map((c, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg bg-background border border-border/60 text-xs font-mono text-muted-foreground"
                    >
                      ✓ {c}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {selectedExp.highlights.map((h, i) => {
                const IconComponent = h.icon;
                return (
                  <div
                    key={i}
                    className="p-5 rounded-2xl bg-background/50 border border-border/40 hover:border-primary/40 transition-colors flex flex-col gap-2"
                  >
                    <div className="flex items-center gap-2 text-primary">
                      <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                        <IconComponent className="size-4" />
                      </div>
                      <h4 className="text-sm font-bold text-foreground">
                        {h.title}
                      </h4>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed pl-1">
                      {h.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-border/20">
              {selectedExp.skills.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-mono font-bold"
                >
                  #{s}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Independent Projects Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {INDEPENDENT_PROJECTS.map((proj) => (
            <div
              key={proj.id}
              className="p-6 rounded-3xl bg-card/30 border border-border/50 hover:border-primary/40 backdrop-blur-md transition-all flex flex-col justify-between gap-4 group"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-mono font-bold">
                    {proj.category}
                  </span>
                  <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>

                <h4 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {proj.title}
                </h4>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {proj.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/20">
                {proj.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded-md bg-muted/60 text-muted-foreground text-[10px] font-mono font-semibold"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
