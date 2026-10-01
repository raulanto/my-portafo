import type { Metadata } from "next";
import { getBlogPostBySlug, getAllBlogPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import { BlogArticleClient } from "@/components/blog-article-client";

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Artículo no encontrado",
    };
  }

  return {
    title: post.title,
    description: post.description || `Lee el artículo "${post.title}" escrito por Raúl Antón.`,
    openGraph: {
      title: `${post.title} | Raúl Antón`,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: ["Raúl Antón"],
      images: post.thumbnail ? [{ url: post.thumbnail, alt: post.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.thumbnail ? [post.thumbnail] : [],
    },
  };
}


export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <BlogArticleClient post={post} />;
}

