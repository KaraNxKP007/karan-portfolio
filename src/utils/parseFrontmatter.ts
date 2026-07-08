import type { BlogFrontmatter } from "../types/blog";

export function parseFrontmatter(raw: string): { data: BlogFrontmatter; content: string } {
  // Normalize Windows line endings to \n before parsing
  const normalized = raw.replace(/\r\n/g, "\n").trim();

  const match = normalized.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) {
    throw new Error("Markdown file is missing frontmatter (--- block at the top)");
  }

  const [, frontmatterBlock, content] = match;
  const data: Record<string, any> = {};

  const lines = frontmatterBlock.split("\n");
  let currentArrayKey: string | null = null;

  for (const line of lines) {
    if (/^\s*-\s+/.test(line) && currentArrayKey) {
      const item = line.replace(/^\s*-\s+/, "").trim();
      data[currentArrayKey].push(item);
      continue;
    }

    const kvMatch = line.match(/^([a-zA-Z]+):\s*(.*)$/);
    if (kvMatch) {
      const [, key, value] = kvMatch;
      if (value.trim() === "") {
        data[key] = [];
        currentArrayKey = key;
      } else {
        data[key] = value.trim().replace(/^["']|["']$/g, "");
        currentArrayKey = null;
      }
    }
  }

  return { data: data as BlogFrontmatter, content: content.trim() };
}