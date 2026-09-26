import { getBlogPostBySlug, getAllBlogPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Tag,
  Share2,
  BookOpen,
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

  // Format markdown headers and code blocks simply for clean presentation
  const formattedContent = post.content
    .split("\n")
    .map((line, idx) => {
      if (line.startsWith("# ")) {
        return (
          <h1
            key={idx}
            className="text-3xl sm:text-4xl font-black text-foreground mt-8 mb-4 tracking-tight"
          >
            {line.replace("# ", "")}
          </h1>
        );
      }
      if (line.startsWith("## ")) {
        return (
          <h2
            key={idx}
            className="text-2xl sm:text-3xl font-extrabold text-foreground mt-8 mb-3 tracking-tight border-b border-border/40 pb-2"
          >
            {line.replace("## ", "")}
          </h2>
        );
      }
      if (line.startsWith("### ")) {
        return (
          <h3
            key={idx}
            className="text-xl sm:text-2xl font-bold text-foreground mt-6 mb-2 tracking-tight"
          >
            {line.replace("### ", "")}
          </h3>
        );
      }
      if (line.startsWith("```")) {
        return null;
      }
      if (line.startsWith("- ")) {
        return (
          <li key={idx} className="ml-6 list-disc text-muted-foreground my-1">
            {line.replace("- ", "")}
          </li>
        );
      }
      if (line.trim() === "") {
        return <div key={idx} className="h-3" />;
      }
      return (
        <p
          key={idx}
          className="text-base sm:text-lg text-muted-foreground leading-relaxed font-normal my-2"
        >
          {line}
        </p>
      );
    });

  return (
    <article className="min-h-screen bg-background text-foreground pt-32 pb-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        {/* Navigation Back Link */}
        <Link
          href="/#blog"
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors group w-fit"
        >
          <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
          Volver a la landing page
        </Link>

        {/* Article Header */}
        <header className="flex flex-col gap-4 border-b border-border/50 pb-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold uppercase tracking-wider">
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

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground leading-[1.15]">
            {post.title}
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground font-medium leading-relaxed">
            {post.description}
          </p>

          {/* Author Card */}
          <div className="flex items-center gap-3 pt-4">
            <img
              src={post.authorAvatar}
              alt={post.author}
              className="size-11 rounded-full border border-border/60 object-cover"
            />
            <div>
              <p className="text-sm font-semibold text-foreground">
                {post.author}
              </p>
              <p className="text-xs text-muted-foreground font-mono">
                {post.authorDescription}
              </p>
            </div>
          </div>
        </header>

        {/* Article Body rendered with MDX components & shadcn/typeset */}
        <MarkdownRenderer content={post.content} />

        {/* Article Footer Tags */}
        <footer className="pt-8 border-t border-border/50 flex flex-wrap items-center justify-between gap-4 mt-8">
          <div className="flex flex-wrap items-center gap-2">
            <Tag className="size-4 text-muted-foreground" />
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-md bg-card border border-border/50 text-xs font-mono text-muted-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>

          <Link
            href="/#blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-xs font-bold hover:opacity-90 transition-opacity"
          >
            Ver todos los artículos
          </Link>
        </footer>
      </div>
    </article>
  );
}
