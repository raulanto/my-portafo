import React from "react";
import type { Metadata } from "next";
import { getAllBlogPosts } from "@/lib/blog";
import { BlogCatalogClient } from "@/components/blog-catalog-client";

export const metadata: Metadata = {
  title: "Blog & Artículos Técnicos",
  description:
    "Explora artículos sobre arquitectura de software, optimización de bases de datos, microservicios, Go, Rust y desarrollo Full Stack por Raúl Antón.",
  openGraph: {
    title: "Blog & Artículos Técnicos | Raúl Antón",
    description:
      "Artículos técnicos sobre ingeniería de software, backend de alta escala y mejores prácticas de desarrollo por Raúl Antón.",
  },
};

export default function BlogListingPage() {
  const posts = getAllBlogPosts();
  return <BlogCatalogClient posts={posts} />;
}

