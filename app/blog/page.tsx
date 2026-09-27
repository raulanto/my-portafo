import React from "react";
import { getAllBlogPosts } from "@/lib/blog";
import { BlogCatalogClient } from "@/components/blog-catalog-client";

export default function BlogListingPage() {
  const posts = getAllBlogPosts();
  return <BlogCatalogClient posts={posts} />;
}
