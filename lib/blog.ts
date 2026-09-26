import fs from "fs";
import path from "path";

export interface BlogPostItem {
  slug: string;
  title: string;
  date: string;
  description: string;
  category: string;
  tags: string[];
  author: string;
  authorAvatar: string;
  authorDescription?: string;
  thumbnail?: string;
  readTime: string;
  content: string;
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export function getAllBlogPosts(): BlogPostItem[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));

  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
    const slug = file.replace(/\.md$/, "");

    let frontmatterRaw = "";
    let content = raw;

    const fmMatch = raw.match(/^---\n([\s\S]*?)\n---/);
    if (fmMatch) {
      frontmatterRaw = fmMatch[1];
      content = raw.slice(fmMatch[0].length).trim();
    }

    const metadata: Record<string, any> = {};
    frontmatterRaw.split("\n").forEach((line) => {
      const parts = line.split(":");
      if (parts.length >= 2) {
        const key = parts[0].trim();
        let val: any = parts.slice(1).join(":").trim();
        if (
          typeof val === "string" &&
          ((val.startsWith('"') && val.endsWith('"')) ||
            (val.startsWith("'") && val.endsWith("'")))
        ) {
          val = val.slice(1, -1);
        }
        if (typeof val === "string" && val.startsWith("[") && val.endsWith("]")) {
          val = val
            .slice(1, -1)
            .split(",")
            .map((s) => s.trim().replace(/^['"]|['"]$/g, ""))
            .filter(Boolean);
        }
        metadata[key] = val;
      }
    });

    const words = content.split(/\s+/).length;
    const readMinutes = Math.max(2, Math.ceil(words / 200));

    // Determine category based on tags or title
    const tagsArray = Array.isArray(metadata.tags)
      ? metadata.tags
      : typeof metadata.tags === "string"
      ? [metadata.tags]
      : [];

    let category = "Desarrollo Web";
    const tagsUpper = tagsArray.map((t: string) => t.toUpperCase());
    const titleUpper = (metadata.title || "").toUpperCase();

    if (
      tagsUpper.includes("DJANGO") ||
      titleUpper.includes("DJANGO") ||
      tagsUpper.includes("RESTAPI")
    ) {
      category = "Django";
    } else if (
      tagsUpper.includes("GOLAN") ||
      tagsUpper.includes("GOLANG") ||
      titleUpper.includes("GOLANG") ||
      titleUpper.includes("GO")
    ) {
      category = "Golang";
    } else if (
      tagsUpper.includes("SQL") ||
      tagsUpper.includes("MODELADO DE DATOS") ||
      tagsUpper.includes("BASE DE DATOS") ||
      titleUpper.includes("BASE DE DATOS")
    ) {
      category = "Bases de Datos & SQL";
    } else if (
      tagsUpper.includes("ARQUITECTURA") ||
      titleUpper.includes("ARQUITECTURA")
    ) {
      category = "Arquitectura";
    } else if (
      tagsUpper.includes("API-FIRST") ||
      tagsUpper.includes("FATAPI") ||
      tagsUpper.includes("FASTAPI")
    ) {
      category = "APIs";
    }

    let dateFormatted = metadata.date || "2025-10-01";
    if (dateFormatted.endsWith("-")) dateFormatted += "01";

    return {
      slug,
      title: metadata.title || slug,
      date: dateFormatted,
      description: metadata.description || "Artículo técnico por Raúl Antonio.",
      category,
      tags: tagsArray.length > 0 ? tagsArray : ["Web"],
      author: metadata.author || "raulanto",
      authorAvatar:
        metadata.author_avatar ||
        "https://avatars.githubusercontent.com/u/74162376?v=4",
      authorDescription: metadata.author_description || "Desarrollador Full Stack",
      thumbnail: metadata.thumbnail || "/neat.png",
      readTime: `${readMinutes} min de lectura`,
      content,
    };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getBlogPostBySlug(slug: string): BlogPostItem | null {
  const posts = getAllBlogPosts();
  return posts.find((p) => p.slug.toLowerCase() === slug.toLowerCase()) || null;
}
