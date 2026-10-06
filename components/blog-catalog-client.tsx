"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Search,
  ArrowUpRight,
  Clock,
  Calendar,
  X,
  Eye,
  ArrowLeft,
} from "lucide-react";
import type { BlogPostItem } from "@/lib/blog";

const CATEGORIES = [
  "Todos",
  "Bases de Datos & SQL",
  "Django",
  "Arquitectura",
  "APIs",
  "Golang",
] as const;

export function BlogCatalogClient({ posts }: { posts: BlogPostItem[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [modalPost, setModalPost] = useState<BlogPostItem | null>(null);

  const filteredPosts = posts.filter((post) => {
    const matchesCat =
      selectedCategory === "Todos" || post.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-background text-foreground pt-20 sm:pt-32 pb-20 sm:pb-24 px-3 sm:px-6 lg:px-8 relative">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-primary/10 via-purple-500/5 to-transparent pointer-events-none -z-10 blur-3xl" />

      <div className="max-w-6xl mx-auto flex flex-col gap-6 sm:gap-10">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-muted-foreground hover:text-primary transition-colors group w-fit px-4 py-2 rounded-full bg-card/60 border border-border/50 backdrop-blur-sm shadow-sm min-h-[40px]"
        >
          <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
          <span>Volver al Inicio</span>
        </Link>

        {/* Flat Big Header */}
        <div className="flex flex-col gap-3 sm:gap-4 border-b border-border/20 pb-6 sm:pb-8">
          <div className="flex items-center justify-between flex-wrap gap-2 sm:gap-4">
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[11px] sm:text-xs font-mono font-bold tracking-wider uppercase">
              <BookOpen className="size-3.5" />
              <span>CATÁLOGO DE ARTÍCULOS</span>
            </div>

            <span className="text-[11px] sm:text-xs font-mono text-muted-foreground">
              {posts.length} publicaciones
            </span>
          </div>

          <h1 className="text-3xl sm:text-6xl md:text-7xl font-black tracking-tight text-foreground leading-[1.08]">
            Artículos & <br className="hidden sm:inline" />
            <span className="text-primary font-serif italic font-normal text-[0.95em]">Publicaciones Técnicas.</span>
          </h1>

          <p className="text-sm sm:text-xl text-muted-foreground max-w-3xl font-normal leading-relaxed mt-1">
            Explora todas las guías, análisis de arquitectura, optimizaciones SQL y patrones de desarrollo creados por Raúl Antonio.
          </p>
        </div>

        {/* Filter & Search Bar Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          {/* Category Pills */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none -mx-1 px-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 sm:px-4 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-all duration-200 cursor-pointer min-h-[38px] ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 font-bold"
                    : "bg-card/50 border border-border/50 text-muted-foreground hover:text-foreground hover:bg-card/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar artículo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 sm:py-2 text-xs sm:text-sm rounded-full bg-card/60 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all min-h-[44px] sm:min-h-0"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer p-1"
                aria-label="Limpiar búsqueda"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.slug}
              className="group flex flex-col justify-between p-5 sm:p-8 rounded-3xl border border-border/40 bg-card/40 hover:bg-card/70 hover:border-primary/50 backdrop-blur-xl transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-primary/5 gap-4"
            >
              <div className="flex flex-col gap-3 sm:gap-4">
                {/* Card Top Header */}
                <div className="flex items-center justify-between flex-wrap gap-2 text-xs font-mono text-muted-foreground">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-[11px] border border-primary/20">
                    {post.category}
                  </span>

                  <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs">
                    <span className="flex items-center gap-1">
                      <Calendar className="size-3 text-primary" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="size-3 text-primary" />
                      {post.readTime}
                    </span>
                  </div>
                </div>

                {/* Title & Description */}
                <Link href={`/blog/${post.slug}`} className="group/title">
                  <h3 className="text-lg sm:text-2xl font-black text-foreground group-hover/title:text-primary transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>
                </Link>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3 font-serif italic font-normal">
                  {post.description}
                </p>
              </div>

              {/* Card Footer Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 sm:pt-6 border-t border-border/20 gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-0.5 rounded-md bg-muted/60 text-[10px] font-mono text-muted-foreground"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => setModalPost(post)}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground text-xs font-semibold transition-colors cursor-pointer min-h-[40px]"
                    title="Vista previa rápida"
                  >
                    <Eye className="size-3.5" />
                    <span>Resumen</span>
                  </button>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-bold transition-all duration-200 hover:scale-105 active:scale-95 min-h-[40px]"
                  >
                    <span>Leer</span>
                    <ArrowUpRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="p-8 sm:p-12 text-center rounded-3xl border border-border/40 bg-card/30 flex flex-col items-center gap-3">
            <BookOpen className="size-8 text-muted-foreground/50" />
            <p className="text-xs sm:text-sm text-muted-foreground font-medium">
              No se encontraron artículos para tu búsqueda.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("Todos");
                setSearchQuery("");
              }}
              className="px-4 py-2 text-xs font-semibold rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors cursor-pointer min-h-[40px]"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>

      {/* Quick Preview Modal */}
      {modalPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in-0 duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto overscroll-contain rounded-3xl border border-border/60 bg-background/98 p-5 sm:p-8 shadow-2xl flex flex-col gap-5 sm:gap-6">
            <button
              onClick={() => setModalPost(null)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
              aria-label="Cerrar vista previa"
            >
              <X className="size-5" />
            </button>

            <div className="flex flex-col gap-2.5 pr-8">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-muted-foreground">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-bold">
                  {modalPost.category}
                </span>
                <span>•</span>
                <span>{modalPost.date}</span>
                <span>•</span>
                <span>{modalPost.readTime}</span>
              </div>

              <h2 className="text-xl sm:text-3xl font-black text-foreground tracking-tight leading-tight">
                {modalPost.title}
              </h2>
            </div>

            <div className="flex flex-col gap-3 text-xs sm:text-base text-muted-foreground leading-relaxed border-t border-b border-border/40 py-4 sm:py-5">
              <p className="font-semibold text-foreground">
                {modalPost.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-wrap gap-1.5">
                {modalPost.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 text-[11px] sm:text-xs rounded-md bg-muted/60 text-muted-foreground"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  onClick={() => setModalPost(null)}
                  className="flex-1 sm:flex-initial px-4 py-2.5 text-xs font-semibold text-muted-foreground hover:text-foreground cursor-pointer min-h-[44px] rounded-full hover:bg-muted/40"
                >
                  Cerrar
                </button>
                <Link
                  href={`/blog/${modalPost.slug}`}
                  onClick={() => setModalPost(null)}
                  className="flex-1 sm:flex-initial px-5 py-2.5 text-xs font-bold rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5 min-h-[44px]"
                >
                  <span>Ver artículo completo</span>
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
