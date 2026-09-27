"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Search,
  ArrowUpRight,
  Clock,
  Calendar,
  Sparkles,
  X,
  Eye,
} from "lucide-react";

interface BlogPostDisplay {
  slug: string;
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
  {
    slug: "diseñoBD",
    title: "Diseño de Base de Datos de Clase Empresarial Paso a Paso",
    date: "11 Oct 2025",
    readTime: "10 min",
    category: "Bases de Datos & SQL",
    tags: ["Arquitectura", "SQL", "Modelado de Datos"],
    description:
      "Caso práctico de arquitectura: cómo diseñé un sistema de seguimiento de contratos de clase empresarial garantizando consistencia ACID.",
    contentSnippet:
      "Paso a paso sobre cómo modelar entidades complejas, definir claves foráneas optimizadas y garantizar integridad relacional bajo alta concurrencia.",
  },
  {
    slug: "reportessql",
    title: "Reportes SQL Reales: De Operaciones Diarias a Inteligencia de Negocios",
    date: "12 Oct 2025",
    readTime: "10 min",
    category: "Bases de Datos & SQL",
    tags: ["Arquitectura", "SQL", "Modelado de Datos"],
    description:
      "Guía práctica con más de 50 reportes SQL reales listos para producción para transformación de datos operativos en Business Intelligence.",
    contentSnippet:
      "Ejemplos reales de extracción de valor a partir de datos crudos: reportes diarios, resúmenes contables y análisis de comportamiento de usuarios.",
  },
  {
    slug: "apifirst",
    title: "API-First: El Futuro del Desarrollo de Software",
    date: "04 Oct 2025",
    readTime: "7 min",
    category: "APIs",
    tags: ["Arquitectura", "Web Development", "Golang", "API-First"],
    description:
      "La API es el contrato principal, no una ocurrencia tardía. Estrategias para diseñar contratos de integración resilientes.",
    contentSnippet:
      "El enfoque API-First invierte la metodología tradicional. Establecer contratos OpenAPI/Swagger desde la fase inicial permite el desarrollo independiente de frontend y backend.",
  },
  {
    slug: "apiKanban",
    title: "API REST Completa de Kanban con FastAPI",
    date: "15 Oct 2025",
    readTime: "7 min",
    category: "APIs",
    tags: ["Arquitectura", "FastAPI", "Python", "JWT"],
    description:
      "Guía completa para construir una API RESTful resiliente con autenticación JWT, validación estricta y documentación swagger.",
    contentSnippet:
      "Construcción de un backend para tableros Kanban estructurado con tipado estático estricto en Pydantic y seguridad JWT.",
  },
  {
    slug: "golang",
    title: "Golang Avanzado: Concurrencia y Optimización de Memoria",
    date: "29 Sep 2025",
    readTime: "9 min",
    category: "Golang",
    tags: ["Golang", "Goroutines", "Concurrencia"],
    description:
      "Dominando goroutines, channels y patrones de concurrencia nativos en Go para sistemas multinúcleo de alto rendimiento.",
    contentSnippet:
      "Go fue diseñado desde cero para aprovechar arquitecturas multinúcleo. Analizamos cómo el modelo CSP evita bloqueos de hilo y fugas de memoria.",
  },
  {
    slug: "restdjango",
    title: "Django REST Framework: Modelos, Serializers y Vistas Complejas",
    date: "29 Sep 2025",
    readTime: "11 min",
    category: "Django",
    tags: ["Django", "Python", "restApi"],
    description:
      "Profundización en Django REST Framework: creación de serializers anidados, viewsets personalizados y permisos finos.",
    contentSnippet:
      "Construye APIs REST estructuradas utilizando ViewSets, Serializers avanzados y clases de permisos dinámicas.",
  },
  {
    slug: "ormdjango",
    title: "ORM de Django: Optimización y Buenas Prácticas",
    date: "05 Oct 2025",
    readTime: "8 min",
    category: "Django",
    tags: ["Django", "Python", "ORM"],
    description:
      "Guía avanzada para exprimir al máximo el ORM de Django evitando la trampa del problema N+1.",
    contentSnippet:
      "Entiende cómo Django evalúa QuerySets internamente y elimina cuellos de botella mediante select_related y prefetch_related.",
  },
  {
    slug: "sql-practicas",
    title: "SQL JOINs: Guía de Uso y Optimización de Consultas",
    date: "05 Oct 2025",
    readTime: "7 min",
    category: "Bases de Datos & SQL",
    tags: ["SQL", "JOINs", "Bases de Datos"],
    description:
      "Los JOINs son una de las operaciones más poderosas en SQL. Aprende a dominar INNER, LEFT, RIGHT y FULL JOINs con rendimiento.",
    contentSnippet:
      "Estrategias para elegir los tipos de unión óptimos en consultas masivas evitando escaneos completos de tablas (sequential scans).",
  },
  {
    slug: "arquitec",
    title: "Fundamentos de Arquitectura Web: Principios y Patrones",
    date: "29 Sep 2025",
    readTime: "8 min",
    category: "Arquitectura",
    tags: ["Arquitectura", "Web Development"],
    description:
      "Principios de diseño, patrones de arquitectura de software y protocolos fundamentales para aplicaciones resilientes.",
    contentSnippet:
      "Análisis de arquitectura hexagonal, separación de responsabilidades y diseño orientado al dominio aplicados al desarrollo web.",
  },
  {
    slug: "cbv",
    title: "Vistas Basadas en Clases (CBV) en Django",
    date: "29 Sep 2025",
    readTime: "6 min",
    category: "Django",
    tags: ["Django", "Python", "Web Development"],
    description:
      "Explora cómo implementar vistas basadas en clases en Django para reutilización de código y mantenimiento limpio.",
    contentSnippet:
      "Aprovecha el poder de la herencia de clases de Django para crear vistas genéricas de lista, detalle y formulario en pocas líneas.",
  },
  {
    slug: "vistastemplate",
    title: "Vistas y Templates en Django: Separación de Responsabilidades",
    date: "08 Oct 2025",
    readTime: "6 min",
    category: "Django",
    tags: ["Arquitectura", "Web Development", "Django"],
    description:
      "El template es la presentación visual y la vista la lógica: mejores prácticas para desacoplar capa de presentación.",
    contentSnippet:
      "Aprende a estructurar plantillas mantenibles en el motor de plantillas de Django con contexto optimizado.",
  },
  {
    slug: "vistaurl",
    title: "Vistas y URLs en Django: Enrutamiento Eficiente",
    date: "29 Sep 2025",
    readTime: "5 min",
    category: "Django",
    tags: ["Django", "Python", "Web Development"],
    description:
      "Aprende a crear y gestionar rutas dinámicas y vistas limpias en tu aplicación Django.",
    contentSnippet:
      "Organiza el archivo urls.py utilizando namespaces, conversores de URL personalizados y resolución reversa de rutas.",
  },
  {
    slug: "contador",
    title: "Contador de Visitas y Rastreo con Django",
    date: "29 Sep 2025",
    readTime: "4 min",
    category: "Django",
    tags: ["Django", "Python", "Web Development"],
    description:
      "Integra un contador de visitas y sesiones en tu aplicación Django con persistencia atómica.",
    contentSnippet:
      "Rastrea métricas de tráfico y sesiones únicas utilizando el framework de sesiones de Django con actualización en base de datos.",
  },
];

const CATEGORIES = [
  "Todos",
  "Bases de Datos & SQL",
  "Django",
  "Arquitectura",
  "APIs",
  "Golang",
] as const;

export function BlogSection() {
  const [modalPost, setModalPost] = useState<BlogPostDisplay | null>(null);

  const latestPosts = ALL_POSTS.slice(0, 4);

  return (
    <section id="blog" className="scroll-mt-28 flex flex-col gap-10">
      {/* Clean, Flat & Bold Section Header */}
      <div className="flex flex-col gap-4 border-b border-border/20 pb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-mono font-bold tracking-wider uppercase">
            <BookOpen className="size-3.5" />
            <span>04 / PUBLICACIONES DESTACADAS</span>
          </div>

          <span className="text-xs font-mono text-muted-foreground">
            {ALL_POSTS.length} artículos técnicos en total
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-foreground leading-[1.05]">
              Blog & <br className="hidden sm:inline" />
              <span className="text-primary">Artículos Recientes.</span>
            </h2>

            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl font-medium leading-relaxed mt-1">
              Guías técnicas y análisis sobre arquitectura de software, bases de datos SQL y desarrollo de sistemas.
            </p>
          </div>

          {/* View All Posts Button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 text-xs font-bold transition-all duration-300 hover:scale-105 active:scale-95 shrink-0 self-start md:self-auto"
          >
            <span>Explorar Todos los Artículos</span>
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>

      {/* Grid of Top 4 Curated Article Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {latestPosts.map((post) => (
          <div
            key={post.slug}
            className="group flex flex-col justify-between p-6 sm:p-7 rounded-3xl border border-border/50 bg-card/40 hover:bg-card/80 hover:border-primary/40 backdrop-blur-sm transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-black/5"
          >
            <div className="flex flex-col gap-3.5">
              {/* Card Top Header */}
              <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground font-mono">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-[11px] border border-primary/20">
                  {post.category}
                </span>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="size-3" />
                    {post.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="size-3" />
                    {post.readTime}
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <Link href={`/blog/${post.slug}`} className="group/title">
                <h3 className="text-lg sm:text-xl font-extrabold text-foreground group-hover/title:text-primary transition-colors leading-snug line-clamp-2">
                  {post.title}
                </h3>
              </Link>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3 font-normal">
                {post.description}
              </p>
            </div>

            {/* Card Footer Actions */}
            <div className="flex items-center justify-between pt-5 mt-5 border-t border-border/30 gap-2">
              <div className="flex flex-wrap gap-1.5 max-w-[60%]">
                {post.tags.slice(0, 2).map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded-md bg-muted/60 text-[10px] font-mono text-muted-foreground"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2">
                {/* Preview Button */}
                <button
                  onClick={() => setModalPost(post)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors cursor-pointer"
                  title="Vista previa rápida"
                >
                  <Eye className="size-3.5" />
                  <span>Resumen</span>
                </button>

                {/* Direct Detail Link */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground text-xs font-bold transition-all duration-200"
                >
                  <span>Leer</span>
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Article Quick Preview Modal */}
      {modalPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in-0 duration-200">
          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl border border-border/60 bg-background/95 p-6 sm:p-8 shadow-2xl flex flex-col gap-6">
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

              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight leading-tight">
                {modalPost.title}
              </h2>
            </div>

            <div className="flex flex-col gap-4 text-sm sm:text-base text-muted-foreground leading-relaxed border-t border-b border-border/40 py-5">
              <p className="font-semibold text-foreground">
                {modalPost.description}
              </p>
              <p>{modalPost.contentSnippet}</p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-1.5">
                {modalPost.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 text-xs rounded-md bg-muted/60 text-muted-foreground"
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
                  className="px-5 py-2 text-xs font-bold rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity flex items-center gap-1.5"
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
