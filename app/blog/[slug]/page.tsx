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

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <BlogArticleClient post={post} />;
}
