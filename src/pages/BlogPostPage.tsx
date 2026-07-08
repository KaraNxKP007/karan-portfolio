import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useTheme, tokens } from "../context/ThemeContext";
import { getPostBySlug } from "../utils/loadPosts";
import ShareButtons from "../components/blog/ShareButtons";
import LikeDislike from "../components/blog/LikeDislike";
import ThemeSwitcher from "../components/blog/ThemeSwitcher";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { theme } = useTheme();
  const t = tokens[theme];
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <div style={{ backgroundColor: t.bg, minHeight: "100vh", paddingTop: "140px", textAlign: "center" }}>
        <p style={{ color: t.text }}>Post not found.</p>
        <Link to="/blog" style={{ color: t.accent }}>← Back to blog</Link>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: t.bg, minHeight: "100vh", paddingTop: "110px", paddingBottom: "80px" }}>
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "0 24px" }}>
        <Link to="/blog" style={{ color: t.accent, fontSize: "13px", textDecoration: "none" }}>← Back to Journal</Link>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "20px", marginTop: "16px" }}>
          <div>
            <h1 style={{ color: t.text, fontSize: "40px", fontWeight: 800, fontFamily: "Poppins, sans-serif", margin: "0 0 8px" }}>
              {post.title}
            </h1>
            <p style={{ color: t.textSub, fontSize: "14px", margin: 0 }}>
              {post.author} · {new Date(post.date).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })} · {post.readTime}
            </p>
          </div>
          <ThemeSwitcher />
        </div>

        <ShareButtons title={post.title} />
        <LikeDislike slug={post.slug} />

        {post.heroImage && (
          <img src={post.heroImage} alt={post.title} style={{ width: "100%", borderRadius: "14px", margin: "20px 0" }} />
        )}

        <div style={{ color: t.textSub, fontSize: "16px", lineHeight: 1.8, fontFamily: "Poppins, sans-serif" }}>
          <ReactMarkdown
            components={{
              h2: (props) => <h2 style={{ color: t.text, fontSize: "24px", fontWeight: 700, marginTop: "32px" }} {...props} />,
              h3: (props) => <h3 style={{ color: t.text, fontSize: "20px", fontWeight: 700, marginTop: "24px" }} {...props} />,
              a: (props) => <a style={{ color: t.accent }} {...props} />,
              code: (props) => <code style={{ backgroundColor: t.bgCard2, padding: "2px 6px", borderRadius: "4px", fontSize: "14px" }} {...props} />,
              p: (props) => <p style={{ margin: "16px 0" }} {...props} />,
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;