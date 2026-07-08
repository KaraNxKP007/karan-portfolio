import { Link } from "react-router-dom";
import { useTheme, tokens } from "../../context/ThemeContext";
import type { BlogPost } from "../../types/blog";

const BlogCard = ({ post }: { post: BlogPost }) => {
  const { theme } = useTheme();
  const t = tokens[theme];

  return (
    <Link to={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
      <div style={{
        backgroundColor: t.bgCard,
        border: `1px solid ${t.border}`,
        borderRadius: "14px",
        overflow: "hidden",
        transition: "transform 0.2s, box-shadow 0.2s",
        cursor: "pointer",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${t.accent}22`; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
      >
        {post.heroImage && (
          <img src={post.heroImage} alt={post.title} style={{ width: "100%", height: "180px", objectFit: "cover" }} />
        )}
        <div style={{ padding: "18px", display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {post.tags?.map((tag) => (
              <span key={tag} style={{
                fontSize: "11px", padding: "2px 10px", borderRadius: "9999px",
                backgroundColor: `${t.accent}1a`, color: t.accent, fontFamily: "Poppins, sans-serif",
              }}>{tag}</span>
            ))}
          </div>
          <h3 style={{ color: t.text, fontSize: "18px", fontWeight: 700, margin: 0, fontFamily: "Poppins, sans-serif" }}>
            {post.title}
          </h3>
          <p style={{ color: t.textSub, fontSize: "13px", margin: 0, lineHeight: 1.5, flex: 1 }}>
            {post.excerpt}
          </p>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: t.textMuted, marginTop: "8px" }}>
            <span>{new Date(post.date).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;