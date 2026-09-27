"use client";

import React, { useState } from "react";
import {
  User,
  Mail,
  MapPin,
  CheckCircle2,
  Code2,
  Server,
  Database,
  Terminal,
  ExternalLink,
  Award,
  Sparkles,
  ArrowUpRight,
  Copy,
  Check,
} from "lucide-react";

const STATS = [
  { value: "3+", label: "Años de experiencia", sub: "Desarrollo web robusto" },
  { value: "15+", label: "Proyectos construidos", sub: "APIs & Web apps" },
  { value: "17+", label: "Artículos técnicos", sub: "Publicaciones en blog" },
];

const SPECIALIZATIONS = [
  {
    icon: Code2,
    area: "Frontend Reactivo",
    stack: ["Vue.js", "Angular", "Nuxt.js", "React", "TypeScript", "TailwindCSS"],
    description:
      "Interfaces dinámicas, altamente reactivas y accesibles. Priorizo rendimiento, arquitecturas por componentes reutilizables y señales (signals).",
    color: "from-blue-500/20 to-cyan-500/10",
    border: "group-hover:border-cyan-500/40",
    badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  },
  {
    icon: Server,
    area: "Backend & APIs",
    stack: ["NestJS", "Django", "FastAPI", "Go", "Laravel", "ASP.NET Core"],
    description:
      "Diseño de APIs RESTful y GraphQL escalables de alto rendimiento. Arquitectura hexagonal, DDD y patrones de resiliencia bajo alta carga.",
    color: "from-purple-500/20 to-indigo-500/10",
    border: "group-hover:border-purple-500/40",
    badge: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  },
  {
    icon: Database,
    area: "Bases de Datos & SQL",
    stack: ["PostgreSQL", "MySQL", "Supabase", "Redis", "ORM Django", "SQL"],
    description:
      "Modelado relacional ACID de clase empresarial, refactorización de esquemas legacy, Window Functions y optimización de consultas complejas.",
    color: "from-emerald-500/20 to-teal-500/10",
    border: "group-hover:border-emerald-500/40",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  {
    icon: Terminal,
    area: "DevOps & Arquitectura",
    stack: ["Docker", "Kubernetes", "Git", "Postman", "CI/CD", "Vercel"],
    description:
      "Despliegue e infraestructura automatizada. Contenedores Docker, gestión de entornos en nube y flujos CI/CD continuos sin downtime.",
    color: "from-amber-500/20 to-orange-500/10",
    border: "group-hover:border-amber-500/40",
    badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
];

export function AboutSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("raulantodev@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="sobre-mi" className="scroll-mt-28 flex flex-col gap-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/40 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-primary/10 text-primary border border-primary/20">
            <User className="size-5" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Sobre Mí
            </h2>
            <p className="text-sm text-muted-foreground">
              Trayectoria, filosofía de desarrollo y áreas de especialización.
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-600 dark:text-emerald-400 w-fit">
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Disponible para nuevos proyectos</span>
        </div>
      </div>

      {/* Main Bento Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Large Profile Hero Card (8 Columns) */}
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl border border-border/60 bg-gradient-to-br from-card/80 via-card/50 to-background backdrop-blur-xl flex flex-col justify-between gap-6 shadow-xl shadow-black/5 relative overflow-hidden group">
          {/* Subtle background ambient aura */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 size-64 bg-primary/10 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/20 transition-all duration-500" />

          <div className="flex flex-col gap-6 relative z-10">
            {/* User Header Info */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src="https://avatars.githubusercontent.com/u/74162376?v=4"
                    alt="Raúl Antonio"
                    className="size-16 sm:size-20 rounded-2xl border-2 border-primary/30 object-cover shadow-md"
                  />
                  <span
                    className="absolute -bottom-1 -right-1 size-5 rounded-full bg-emerald-500 border-2 border-background flex items-center justify-center text-[10px] text-white"
                    title="Disponible"
                  >
                    ✓
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
                      Raúl Antonio
                    </h3>
                    <Sparkles className="size-4 text-primary" />
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-primary font-mono">
                    Full Stack Developer
                  </p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="size-3 text-rose-500" />
                      México
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-mono">
                      raulantodev@gmail.com
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-card border border-border/60 hover:bg-muted text-xs font-semibold text-foreground transition-all cursor-pointer shadow-sm"
                  title="Copiar email"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="size-3.5 text-emerald-500" />
                      <span>Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3.5" />
                      <span>Copiar Email</span>
                    </>
                  )}
                </button>
                <a
                  href="https://github.com/raulanto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-card border border-border/60 hover:bg-muted text-foreground transition-all shadow-sm"
                  title="Ver GitHub"
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

            {/* Bio Paragraph */}
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-normal">
              Desarrollador Full Stack con más de{" "}
              <span className="text-foreground font-semibold">
                3 años de experiencia
              </span>{" "}
              en el diseño, desarrollo e implementación de aplicaciones web robustas y
              escalables, desde el frontend fino hasta la infraestructura de despliegue.
              Especializado en arquitecturas modernas que integran interfaces reactivas{" "}
              <span className="text-foreground font-semibold">
                (Vue.js, Nuxt, Angular, React)
              </span>{" "}
              con APIs de alto rendimiento{" "}
              <span className="text-foreground font-semibold">
                (Django, FastAPI, NestJS, Go)
              </span>
              , aplicando principios de{" "}
              <span className="text-foreground font-semibold">
                arquitectura hexagonal y DDD
              </span>
              . Mi enfoque constante es la calidad del código, la accesibilidad y la entrega de
              soluciones orientadas a resultados de negocio.
            </p>
          </div>

          {/* Quick Contact Footer Bar */}
          <div className="pt-4 border-t border-border/40 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground relative z-10">
            <span className="flex items-center gap-1.5">
              <Award className="size-4 text-amber-500" />
              Código limpio & Buenas prácticas
            </span>
            <a
              href="mailto:raulantodev@gmail.com"
              className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
            >
              <span>Escríbeme un mensaje</span>
              <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </div>

        {/* Stats Column (4 Columns) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-3xl border border-border/50 bg-card/40 hover:bg-card/70 backdrop-blur-sm transition-all duration-300 flex flex-col gap-1 shadow-sm hover:shadow-md hover:border-primary/30"
            >
              <div className="flex items-baseline justify-between">
                <span className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
                  {stat.value}
                </span>
                <span className="size-2 rounded-full bg-primary" />
              </div>
              <p className="text-sm font-bold text-foreground">{stat.label}</p>
              <p className="text-xs text-muted-foreground font-mono">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Specialization Areas Grid */}
      <div className="flex flex-col gap-4 pt-4">
        <h3 className="text-lg font-bold text-foreground tracking-tight">
          Áreas de especialización técnica
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SPECIALIZATIONS.map((spec, idx) => {
            const IconComp = spec.icon;
            return (
              <div
                key={idx}
                className={`group p-6 rounded-3xl border border-border/50 bg-gradient-to-br ${spec.color} bg-card/40 backdrop-blur-md ${spec.border} transition-all duration-300 flex flex-col gap-4 shadow-sm hover:shadow-lg`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-2xl bg-card border border-border/60 text-primary shadow-sm">
                      <IconComp className="size-5" />
                    </div>
                    <h4 className="text-base font-bold text-foreground">
                      {spec.area}
                    </h4>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-normal">
                  {spec.description}
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/30">
                  {spec.stack.map((tech) => (
                    <span
                      key={tech}
                      className={`px-2.5 py-0.5 text-[11px] font-mono font-semibold rounded-md border ${spec.badge}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
