"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  ArrowUpRight,
  Clock,
  Calendar,
  Sparkles,
  X,
  Eye,
  Tag,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollTextReveal } from "@/components/ui/scroll-text-reveal";

interface BlogPostDisplay {
  slug: string;
  number: string;
  title: string;
  date: string;
  readTime: string;
  description: string;
  category: string;
  tags: string[];
  featured?: boolean;
  contentSnippet: string;
}

const ALL_POSTS: BlogPostDisplay[] = [
  {
    slug: "rafacto-bd",
    number: "01",
    title:
      "Refactorización Completa de una Base de Datos Legacy: De la Deuda Técnica a la Arquitectura Moderna",
    date: "23 Nov 2025",
    readTime: "12 min",
    category: "Bases de Datos & SQL",
    tags: ["Arquitectura", "Base de datos", "SQL"],
    featured: true,
    description:
      "Proceso completo de refactorización de una base de datos empresarial de 87 tablas con más de 15 años de evolución orgánica, eliminando duplicidad y optimizando tiempos de respuesta.",
    contentSnippet:
      "En este artículo abordo el reto de modernizar un esquema de base de datos relacional altamente acoplado. Analizamos patrones de migración de datos sin tiempo de inactividad (zero-downtime), descomposición de tablas monolíticas, índices estratégicos y preservación de integridad referencial.",
  },
  {
    slug: "avanzandokpis",
    number: "02",
    title: "SQL Avanzado para KPIs Financieros y Análisis de Negocio",
    date: "12 Oct 2025",
    readTime: "11 min",
    category: "Bases de Datos & SQL",
    tags: ["Arquitectura", "SQL", "Modelado de Datos"],
    featured: true,
    description:
      "Generar indicadores clave de desempeño (KPIs) y métricas financieras críticas para la toma de decisiones utilizando Window Functions y agregación en PostgreSQL.",
    contentSnippet:
      "Aprende a estructurar consultas analíticas complejas directamente en la base de datos para calcular métricas acumuladas, cohortes y modelos financieros en tiempo real.",
  },
  {
    slug: "AsincroníaDjango",
    number: "03",
    title: "Asincronía y Tareas en Background en Django",
    date: "08 Oct 2025",
    readTime: "8 min",
    category: "Django",
    tags: ["Arquitectura", "Web Development", "Django"],
    description:
      "Manejo de tareas en background y asincronía en Django para mejorar exponencialmente el rendimiento y evitar bloqueos en el servidor.",
    contentSnippet:
      "Cuando un usuario realiza acciones pesadas como generación de PDFs o envío masivo de correos, delegar el trabajo a workers asíncronos garantiza respuestas inmediatas.",
  },
  {
    slug: "channels",
    number: "04",
    title: "Django Channels: WebSockets y Comunicación en Tiempo Real",
    date: "08 Oct 2025",
    readTime: "9 min",
    category: "Django",
    tags: ["Arquitectura", "Web Development", "Django"],
    description:
      "Extendiendo Django más allá del ciclo HTTP tradicional para soportar comunicación bidireccional y eventos push con WebSockets.",
    contentSnippet:
      "Django Channels integra la especificación ASGI permitiendo construir chats en vivo, tableros de notificación y monitoreo continuo.",
  },
];

export function BlogSection() {
  const [modalPost, setModalPost] = useState<BlogPostDisplay | null>(null);

  return (
    <section id="blog" className="scroll-mt-28 flex flex-col gap-12 py-6">
      {/* Ultra Minimalist Header with Giant Typography */}
      <div className="flex flex-col gap-5 border-b border-border/20 pb-10">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono font-bold tracking-widest uppercase">
            <BookOpen className="size-3.5" />
            <span>04 / PUBLICACIONES & GUÍAS</span>
          </div>

          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
            Arquitectura • SQL • Backend
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <ScrollTextReveal tag="h2" className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter text-foreground leading-none">
              Blog <span className="text-primary font-serif italic font-normal">&amp;</span> <br />
              <span className="bg-gradient-to-r from-foreground via-foreground/90 to-primary/80 bg-clip-text text-transparent">
                Artículos.
              </span>
            </ScrollTextReveal>

            <p className="text-base sm:text-xl text-muted-foreground max-w-2xl font-normal leading-relaxed mt-1">
              Análisis técnicos sobre diseño de software, optimización de bases de datos y arquitectura distribuida.
            </p>
          </div>

          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-primary text-primary-foreground text-xs font-bold transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:scale-105 active:scale-95 shrink-0 self-start md:self-auto"
          >
            <span>Catálogo Completo</span>
            <ArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Grid of Dynamic Minimalist Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ALL_POSTS.map((post) => (
          <div
            key={post.slug}
            className="group relative flex flex-col justify-between p-7 sm:p-9 rounded-3xl border border-border/40 bg-card/30 hover:bg-card/70 hover:border-primary/40 backdrop-blur-xl transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 overflow-hidden"
          >
            <div className="flex flex-col gap-5">
              {/* Card Header: Big Number Index & Meta Info */}
              <div className="flex items-center justify-between">
                <span className="text-3xl sm:text-4xl font-black font-mono tracking-tighter text-muted-foreground/30 group-hover:text-primary transition-colors duration-300 select-none">
                  {post.number}
                </span>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-mono font-bold text-xs">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="flex flex-col gap-3">
                <Link href={`/blog/${post.slug}`} className="group/title">
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight text-foreground group-hover/title:text-primary transition-colors duration-300 leading-snug line-clamp-2">
                    {post.title}
                  </h3>
                </Link>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-serif italic font-normal line-clamp-3">
                  {post.description}
                </p>
              </div>
            </div>

            {/* Bottom Meta & Action Row */}
            <div className="flex flex-col gap-4 pt-6 mt-6 border-t border-border/20">
              <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="size-3.5 text-primary" />
                    {post.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-3.5 text-primary" />
                    {post.readTime}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Quick Preview Button */}
                  <button
                    onClick={() => setModalPost(post)}
                    className="p-2 rounded-xl bg-muted/50 border border-border/40 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                    title="Vista previa rápida"
                  >
                    <Eye className="size-4" />
                  </button>

                  {/* Direct Link */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex items-center gap-1 text-xs font-bold px-3"
                  >
                    <span>Leer</span>
                    <ArrowUpRight className="size-3.5" />
                  </Link>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-0.5 rounded-md bg-muted/40 text-[11px] font-mono text-muted-foreground border border-border/20"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Article Preview Modal */}
      {modalPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in-0 duration-200">
          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl border border-border/60 bg-background/95 p-6 sm:p-9 shadow-2xl flex flex-col gap-6">
            <button
              onClick={() => setModalPost(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
            >
              <X className="size-5" />
            </button>

            <div className="flex flex-col gap-3 pr-8">
              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-bold">
                  {modalPost.category}
                </span>
                <span>•</span>
                <span>{modalPost.date}</span>
                <span>•</span>
                <span>{modalPost.readTime}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight leading-tight">
                {modalPost.title}
              </h2>
            </div>

            <div className="flex flex-col gap-4 text-sm sm:text-base text-muted-foreground leading-relaxed border-t border-b border-border/30 py-5">
              <p className="font-semibold text-foreground">
                {modalPost.description}
              </p>
              <p className="text-muted-foreground">{modalPost.contentSnippet}</p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-1.5">
                {modalPost.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 text-xs font-mono rounded-md bg-muted/60 text-muted-foreground"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setModalPost(null)}
                  className="px-4 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  Cerrar
                </button>
                <Link
                  href={`/blog/${modalPost.slug}`}
                  onClick={() => setModalPost(null)}
                  className="px-5 py-2.5 text-xs font-bold rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity flex items-center gap-1.5 shadow-md"
                >
                  <span>Ver artículo completo</span>
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
