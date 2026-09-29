import { getBlogPostBySlug, getAllBlogPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  BookOpen,
  User,
  Share2,
  Sparkles,
} from "lucide-react";

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen text-foreground pt-28 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Full-width Header Hero Background Image with Bottom Fade */}
      {post.thumbnail ? (
        <div className="absolute top-0 left-0 right-0 h-[480px] sm:h-[540px] w-full pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
          <img
            src={post.thumbnail}
            alt={post.title}
            className="w-full h-full object-cover object-center"
          />
          {/* Dark overlay so text remains readable */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/70 to-background" />
          {/* Hard fade at the very bottom */}
          <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-background to-transparent" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-background" style={{ zIndex: 0 }} />
      )}

      {/* Content sits above the hero image */}
      {/* Solid background below the hero fold */}
      <div className="absolute left-0 right-0 bottom-0 bg-background pointer-events-none" style={{ top: '420px', zIndex: 0 }} />

      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-primary/10 via-purple-500/5 to-transparent pointer-events-none blur-3xl" style={{ zIndex: 2 }} />

      <div className="relative max-w-5xl mx-auto flex flex-col gap-10" style={{ zIndex: 3 }}>
        {/* Navigation Back Link */}
        <Link
          href="/#blog"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-muted-foreground hover:text-primary transition-colors group w-fit px-3.5 py-1.5 rounded-full bg-card/60 border border-border/50 backdrop-blur-sm shadow-sm"
        >
          <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
          <span>Volver al Portafolio</span>
        </Link>

        {/* Minimalist Editorial Article Header */}
        <header className="flex flex-col gap-6 border-b border-border/20 pb-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono font-bold uppercase tracking-wider">
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

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-foreground leading-[1.08]">
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
          </h1>

          <p className="text-lg sm:text-2xl text-muted-foreground/90 font-serif italic leading-relaxed max-w-3xl font-normal">
            {post.description}
          </p>

          {/* Minimalist Author Bar */}
          <div className="flex items-center gap-3 pt-4">
            <img
              src={post.authorAvatar}
              alt={post.author}
              className="size-10 rounded-full border border-border/60 object-cover"
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
        </header>


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
    </article>
  );
}
