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
    <article className="min-h-screen bg-background text-foreground pt-28 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-primary/10 via-purple-500/5 to-transparent pointer-events-none -z-10 blur-3xl" />

      <div className="max-w-5xl mx-auto flex flex-col gap-10">
        {/* Navigation Back Link */}
        <Link
          href="/#blog"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-muted-foreground hover:text-primary transition-colors group w-fit px-3.5 py-1.5 rounded-full bg-card/60 border border-border/50 backdrop-blur-sm shadow-sm"
        >
          <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
          <span>Volver al Portafolio</span>
        </Link>

        {/* Article Header Banner */}
        <header className="relative flex flex-col gap-6 p-6 sm:p-10 rounded-3xl border border-border/60 bg-gradient-to-br from-card/80 via-card/50 to-background backdrop-blur-xl shadow-xl shadow-black/5 overflow-hidden">
          {/* Subtle grid texture overlay */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(rgba(120,119,198,0.15)_1.5px,transparent_1.5px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_at_top_right,black_60%,transparent_100%)] pointer-events-none" />

          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 rounded-full bg-primary/15 text-primary border border-primary/30 text-xs font-extrabold uppercase tracking-wider shadow-sm">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
              <Calendar className="size-3.5" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
              <Clock className="size-3.5" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.12]">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-medium leading-relaxed max-w-3xl">
            {post.description}
          </p>

          {/* Author Bar */}
          <div className="flex items-center gap-3 pt-4 border-t border-border/40">
            <img
              src={post.authorAvatar}
              alt={post.author}
              className="size-11 sm:size-12 rounded-full border border-primary/30 object-cover shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-foreground">{post.author}</p>
                <span className="size-2 rounded-full bg-emerald-500" />
              </div>
              <p className="text-xs text-muted-foreground font-mono">
                {post.authorDescription}
              </p>
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
