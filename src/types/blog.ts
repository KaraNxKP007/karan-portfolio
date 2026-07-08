export interface BlogFrontmatter {
  title: string;
  date: string;        // "2026-07-08"
  author: string;
  tags: string[];
  excerpt: string;
  heroImage?: string;  // path under /src/assets or a full URL
  readTime?: string;   // auto-calculated if omitted
}

export interface BlogPost extends BlogFrontmatter {
  slug: string;
  content: string;     // raw markdown body (frontmatter stripped)
}