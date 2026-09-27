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
    <main className="min-h-screen bg-background text-foreground pt-28 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-primary/10 via-purple-500/5 to-transparent pointer-events-none -z-10 blur-3xl" />

      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-muted-foreground hover:text-primary transition-colors group w-fit px-4 py-2 rounded-full bg-card/60 border border-border/50 backdrop-blur-sm shadow-sm"
        >
          <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
          <span>Volver al Inicio</span>
        </Link>

        {/* Flat Big Header */}
        <div className="flex flex-col gap-4 border-b border-border/20 pb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-mono font-bold tracking-wider uppercase">
              <BookOpen className="size-3.5" />
              <span>CATÁLOGO COMPLETO DE ARTÍCULOS</span>
            </div>

            <span className="text-xs font-mono text-muted-foreground">
              {posts.length} publicaciones disponibles
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-foreground leading-[1.05]">
            Artículos & <br className="hidden sm:inline" />
            <span className="text-primary">Publicaciones Técnicas.</span>
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl font-medium leading-relaxed mt-1">
            Explora todas las guías, análisis de arquitectura, optimizaciones SQL y patrones de desarrollo creados por Raúl Antonio.
          </p>
        </div>

        {/* Filter & Search Bar Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "bg-card/40 border border-border/50 text-muted-foreground hover:text-foreground hover:bg-card/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar artículo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm rounded-full bg-card/60 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.slug}
              className="group flex flex-col justify-between p-7 sm:p-8 rounded-3xl border border-border/40 bg-card/30 hover:bg-card/60 hover:border-primary/50 backdrop-blur-xl transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-primary/5"
            >
              <div className="flex flex-col gap-4">
                {/* Card Top Header */}
                <div className="flex items-center justify-between gap-2 text-xs font-mono text-muted-foreground">
                  <span className="px-3.5 py-1 rounded-full bg-primary/10 text-primary font-bold text-[11px] border border-primary/20">
                    {post.category}
                  </span>

                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="size-3.5 text-primary" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="size-3.5" />
                      {post.readTime}
                    </span>
                  </div>
                </div>

                {/* Title & Description */}
                <Link href={`/blog/${post.slug}`} className="group/title">
                  <h3 className="text-xl sm:text-2xl font-black text-foreground group-hover/title:text-primary transition-colors leading-tight line-clamp-2">
                    {post.title}
                  </h3>
                </Link>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3 font-normal">
                  {post.description}
                </p>
              </div>

              {/* Card Footer Actions */}
              <div className="flex items-center justify-between pt-6 mt-6 border-t border-border/20 gap-2">
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

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setModalPost(post)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground text-xs font-semibold transition-colors cursor-pointer"
                    title="Vista previa rápida"
                  >
                    <Eye className="size-3.5" />
                    <span>Resumen</span>
                  </button>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-bold transition-all duration-200 hover:scale-105 active:scale-95"
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
          <div className="p-12 text-center rounded-3xl border border-border/40 bg-card/30 flex flex-col items-center gap-3">
            <BookOpen className="size-8 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground font-medium">
              No se encontraron artículos para tu búsqueda.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("Todos");
                setSearchQuery("");
              }}
              className="px-4 py-1.5 text-xs font-semibold rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors cursor-pointer"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>

      {/* Quick Preview Modal */}
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

              <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight leading-tight">
                {modalPost.title}
              </h2>
            </div>

            <div className="flex flex-col gap-4 text-sm sm:text-base text-muted-foreground leading-relaxed border-t border-b border-border/40 py-5">
              <p className="font-semibold text-foreground">
                {modalPost.description}
              </p>
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
    </main>
  );
}
