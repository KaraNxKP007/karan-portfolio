import { parseFrontmatter } from "./parseFrontmatter";
import type { BlogPost } from "../types/blog";

const modules = import.meta.glob("../content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function calcReadTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

function slugFromPath(path: string): string {
  const filename = path.split("/").pop() ?? "";
  return filename.replace(/\.md$/, "");
}

export function getAllPosts(): BlogPost[] {
  const posts = Object.entries(modules).map(([path, raw]) => {
    const { data, content } = parseFrontmatter(raw);
    return {
      ...data,
      slug: slugFromPath(path),
      content,
      readTime: data.readTime || calcReadTime(content),
    } as BlogPost;
  });

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}