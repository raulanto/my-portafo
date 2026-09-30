"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  BookOpen,
  ArrowUp,
} from "lucide-react";
import { BlogPostItem } from "@/lib/blog";
import { ScrollTextReveal } from "@/components/ui/scroll-text-reveal";

export function BlogArticleClient({ post }: { post: BlogPostItem }) {
  const headerRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <article
      className="min-h-screen text-foreground pt-28 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-background"
    >
      {/* Full-width Parallax Hero Header Image with Seamless Blend */}
      {post.thumbnail && (
        <motion.div
          style={{ y: bgY, scale: bgScale }}
          className="absolute top-0 inset-x-0 h-[560px] sm:h-[650px] w-full pointer-events-none overflow-hidden z-0 will-change-transform"
        >
          <img
            src={post.thumbnail}
            alt={post.title}
            className="w-full h-full object-cover object-center"
          />
          {/* Smooth multi-stage gradient mask: No hard lines, perfectly blends into background */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/70 to-background" />
          <div className="absolute inset-0 bg-radial from-transparent via-background/40 to-background" />
          <div className="absolute bottom-0 inset-x-0 h-72 bg-gradient-to-t from-background via-background/90 to-transparent" />
        </motion.div>
      )}

      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-primary/15 via-primary/5 to-transparent pointer-events-none blur-3xl z-[1]" />

      {/* Main Container */}
      <div className="relative max-w-5xl mx-auto flex flex-col gap-10 z-[2]">
        {/* Navigation Back Link */}
        <Link
          href="/#blog"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-muted-foreground hover:text-primary transition-colors group w-fit px-4 py-2 rounded-full bg-background/80 border border-border/50 backdrop-blur-md shadow-md"
        >
          <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
          <span>Volver al Portafolio</span>
        </Link>

        {/* Parallax Article Header */}
        <motion.header
          ref={headerRef}
          style={{ y: textY, opacity: textOpacity }}
          className="flex flex-col gap-6 border-b border-border/20 pb-10 will-change-transform min-h-[380px]"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono font-bold uppercase tracking-wider border border-primary/20">
              {post.category}
            </span>
            <span className="text-xs text-muted-foreground font-mono flex items-center gap-1.5">
              <Calendar className="size-3.5 text-primary" />
              {post.date}
            </span>
            <span className="text-xs text-muted-foreground font-mono flex items-center gap-1.5">
              <Clock className="size-3.5 text-primary" />
              {post.readTime}
            </span>
          </div>

          <ScrollTextReveal
            tag="h1"
            className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-foreground leading-[1.08]"
          >
            {post.title.includes(":") ? (
              <>
                {post.title.split(":")[0]}:{" "}
                <span className="font-serif italic font-normal text-primary">
                  {post.title.split(":")[1]}
                </span>
              </>
            ) : (
              post.title
            )}
          </ScrollTextReveal>

          <p className="text-lg sm:text-2xl text-muted-foreground/90 font-serif italic leading-relaxed max-w-3xl font-normal">
            {post.description}
          </p>

          {/* Author Bar */}
          <div className="flex items-center gap-3 pt-4">
            <img
              src={post.authorAvatar}
              alt={post.author}
              className="size-11 rounded-full border border-border/60 object-cover shadow-sm"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-foreground">{post.author}</span>
                <span className="size-1.5 rounded-full bg-emerald-500" />
              </div>
              <span className="text-xs text-muted-foreground font-mono">
                {post.authorDescription}
              </span>
            </div>
          </div>
        </motion.header>

        {/* Main Content Layout (Article + Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Article Text (8 Columns) */}
          <main className="lg:col-span-8 w-full flex flex-col gap-6">
            <MarkdownRenderer content={post.content} />
          </main>

          {/* Sidebar / Quick Meta (4 Columns) */}
          <aside className="lg:col-span-4 w-full flex flex-col gap-6 lg:sticky lg:top-32">
            {/* Author Info Card */}
            <div className="p-6 rounded-3xl border border-border/50 bg-card/40 backdrop-blur-md flex flex-col gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <img
                  src={post.authorAvatar}
                  alt={post.author}
                  className="size-12 rounded-2xl border border-border/60 object-cover"
                />
                <div>
                  <h4 className="text-sm font-bold text-foreground">
                    Raúl Antonio
                  </h4>
                  <p className="text-xs text-muted-foreground font-mono">
                    Full Stack Developer
                  </p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Desarrollador enfocado en arquitectura web, APIs de alto rendimiento y código limpio.
              </p>
            </div>

            {/* Tags Card */}
            <div className="p-6 rounded-3xl border border-border/50 bg-card/40 backdrop-blur-md flex flex-col gap-3 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-foreground uppercase tracking-wider">
                <Tag className="size-3.5 text-primary" />
                <span>Etiquetas</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg bg-card/80 border border-border/50 text-xs font-mono text-muted-foreground"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Back to Blog Action */}
            <div className="p-6 rounded-3xl border border-primary/20 bg-primary/5 flex flex-col gap-3 text-center">
              <p className="text-xs text-muted-foreground font-medium">
                ¿Te gustó este artículo? Revisa las demás publicaciones.
              </p>
              <Link
                href="/#blog"
                className="w-full py-2.5 px-4 rounded-full bg-primary text-primary-foreground text-xs font-bold hover:opacity-90 transition-opacity shadow-md shadow-primary/20 inline-flex items-center justify-center gap-2"
              >
                <BookOpen className="size-4" />
                <span>Explorar todos los artículos</span>
              </Link>
            </div>
          </aside>
        </div>
      </div>

      {/* Floating Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3.5 rounded-full bg-primary text-primary-foreground shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer border border-primary-foreground/20"
          title="Ir al inicio de la página"
          aria-label="Ir al inicio de la página"
        >
          <ArrowUp className="size-5" />
        </button>
      )}
    </article>
  );
}
