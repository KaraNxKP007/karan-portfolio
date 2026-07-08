import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { tokens } from "../context/ThemeContext";
import { getAllPosts } from "../utils/loadPosts";

const BlogListPage = () => {
  const t = tokens.dark;
  const posts = getAllPosts();
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const categories = useMemo(() => {
    const counts: Record<string, number> = {};
    posts.forEach((p) => p.tags?.forEach((tag) => { counts[tag] = (counts[tag] || 0) + 1; }));
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [posts]);

  const isFiltering = activeCategory !== "All" || search.trim() !== "";

  const filteredPosts = posts.filter((p) => {
    const matchesCategory = activeCategory === "All" || p.tags?.includes(activeCategory);
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
                           p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Featured = newest post, only shown when not filtering/searching
  const featuredPost = !isFiltering && posts.length > 0 ? posts[0] : null;
  const restPosts = featuredPost ? filteredPosts.filter((p) => p.slug !== featuredPost.slug) : filteredPosts;

  const popularPosts = posts.slice(0, 3);

  const pillStyle = (active: boolean) => ({
    padding: "8px 18px",
    borderRadius: "9999px",
    fontSize: "13px",
    fontWeight: 600,
    fontFamily: "Poppins, sans-serif",
    cursor: "pointer",
    border: `1px solid ${active ? t.accent : t.border}`,
    backgroundColor: active ? t.accent : "transparent",
    color: active ? "#ffffff" : t.textSub,
    transition: "all 0.2s",
    whiteSpace: "nowrap",
  });

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div style={{ backgroundColor: t.bg, minHeight: "100vh", paddingTop: "100px" }}>
      {/* Header */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px 32px" }}>
        <span style={{ color: t.accent, fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", fontFamily: "Poppins, sans-serif" }}>
          BLOG
        </span>
        <h1 style={{ color: t.text, fontSize: "44px", fontWeight: 800, fontFamily: "Poppins, sans-serif", margin: "8px 0" }}>
          Developer Journal
        </h1>
        <p style={{ color: t.textSub, fontSize: "16px", maxWidth: "560px", lineHeight: 1.6 }}>
          Thoughts, learnings and tutorials on software engineering, AI, productivity and more.
        </p>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "28px" }}>
          <div style={pillStyle(activeCategory === "All")} onClick={() => setActiveCategory("All")}>All</div>
          {categories.map(([tag]) => (
            <div key={tag} style={pillStyle(activeCategory === tag)} onClick={() => setActiveCategory(tag)}>
              {tag}
            </div>
          ))}
        </div>
      </div>

      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 24px 80px",
        display: "grid",
        gridTemplateColumns: "1fr 320px",
        gap: "32px",
      }}
      className="blog-layout"
      >
        {/* Main column */}
        <div>
          {/* Featured post */}
          {featuredPost && (
            <Link to={`/blog/${featuredPost.slug}`} style={{ textDecoration: "none" }}>
              <div style={{
                position: "relative",
                borderRadius: "20px",
                overflow: "hidden",
                minHeight: "380px",
                marginBottom: "36px",
                border: `1px solid ${t.border}`,
                backgroundColor: t.bgCard,
                display: "flex",
                alignItems: "flex-end",
              }}>
                {featuredPost.heroImage ? (
                  <img
                    src={featuredPost.heroImage}
                    alt={featuredPost.title}
                    style={{
                      position: "absolute", inset: 0, width: "100%", height: "100%",
                      objectFit: "cover", zIndex: 0,
                    }}
                  />
                ) : (
                  <>
                    {/* Decorative pattern fill when no hero image */}
                    <div style={{
                      position: "absolute", inset: 0, zIndex: 0,
                      background: `linear-gradient(135deg, ${t.accent}26, ${t.accentAlt}14)`,
                      backgroundImage: `radial-gradient(${t.accent}33 1.5px, transparent 1.5px)`,
                      backgroundSize: "22px 22px",
                    }} />
                    <div style={{
                      position: "absolute",
                      top: "50%", right: "40px",
                      transform: "translateY(-50%)",
                      fontSize: "170px",
                      fontWeight: 800,
                      fontFamily: "monospace",
                      color: t.accent,
                      opacity: 0.12,
                      zIndex: 0,
                      userSelect: "none",
                      lineHeight: 1,
                    }}>
                      {"</>"}
                    </div>
                  </>
                )}
                <div style={{
                  position: "absolute", inset: 0, zIndex: 1,
                  background: featuredPost.heroImage
                    ? `linear-gradient(180deg, transparent 20%, ${t.bg}f2 90%)`
                    : `linear-gradient(180deg, transparent 40%, ${t.bgCard}f2 85%)`,
                }} />
                <div style={{ position: "relative", zIndex: 2, padding: "36px", width: "100%" }}>
                  <span style={{
                    display: "inline-block", padding: "4px 12px", borderRadius: "9999px",
                    backgroundColor: t.accent, color: "#fff", fontSize: "11px", fontWeight: 700,
                    fontFamily: "Poppins, sans-serif", marginBottom: "14px",
                  }}>
                    LATEST
                  </span>
                  <h2 style={{ color: featuredPost.heroImage ? "#ffffff" : t.text, fontSize: "30px", fontWeight: 800, margin: "0 0 10px", fontFamily: "Poppins, sans-serif", maxWidth: "640px" }}>
                    {featuredPost.title}
                  </h2>
                  <p style={{ color: featuredPost.heroImage ? "#d8d5e8" : t.textSub, fontSize: "15px", margin: "0 0 14px", maxWidth: "600px", lineHeight: 1.6 }}>
                    {featuredPost.excerpt}
                  </p>
                  <div style={{ display: "flex", gap: "12px", fontSize: "13px", color: featuredPost.heroImage ? "#b8b4cc" : t.textMuted, alignItems: "center" }}>
                    <span>{formatDate(featuredPost.date)}</span>
                    <span>·</span>
                    <span>{featuredPost.readTime}</span>
                    {featuredPost.tags?.map((tag) => (
                      <span key={tag} style={{
                        padding: "2px 10px", borderRadius: "9999px",
                        border: `1px solid ${featuredPost.heroImage ? "rgba(255,255,255,0.25)" : t.border}`,
                        color: featuredPost.heroImage ? "#fff" : t.accent,
                      }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Post list */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {restPosts.map((post) => (
              <Link key={post.slug} to={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
                <div
                  className="blog-row"
                  style={{
                    display: "flex",
                    gap: "22px",
                    backgroundColor: t.bgCard,
                    border: `1px solid ${t.border}`,
                    borderRadius: "16px",
                    padding: "18px",
                    transition: "border-color 0.2s, transform 0.2s, box-shadow 0.2s",
                  }}
                >
                  {post.heroImage ? (
                    <img
                      src={post.heroImage}
                      alt=""
                      style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "10px", flexShrink: 0 }}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.nextElementSibling?.setAttribute("style", "display:block;width:50px;height:50px;border-radius:10px;flex-shrink:0;background:linear-gradient(135deg,var(--accent-fallback),transparent)");
                      }}
                    />
                  ) : null}
                  <div style={{ display: post.heroImage ? "none" : "block", width: "50px", height: "50px", borderRadius: "10px", flexShrink: 0, background: `linear-gradient(135deg, ${t.accent}33, ${t.accentAlt}22)` }} />

                  <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <h3 style={{ color: t.text, fontSize: "19px", fontWeight: 700, margin: "0 0 8px", fontFamily: "Poppins, sans-serif" }}>
                      {post.title}
                    </h3>
                    <p style={{ color: t.textSub, fontSize: "14px", margin: "0 0 14px", lineHeight: 1.55 }}>
                      {post.excerpt}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "12px", color: t.textMuted, flexWrap: "wrap" }}>
                      <span>{formatDate(post.date)}</span>
                      <span>·</span>
                      <span>{post.readTime}</span>
                      {post.tags?.map((tag) => (
                        <span key={tag} style={{
                          padding: "2px 10px", borderRadius: "9999px", border: `1px solid ${t.border}`, color: t.accent,
                        }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", color: t.accent, fontSize: "20px" }}>→</div>
                </div>
              </Link>
            ))}
          </div>

          {restPosts.length === 0 && !featuredPost && (
            <div style={{
              textAlign: "center", padding: "70px 20px",
              border: `1px dashed ${t.border}`, borderRadius: "16px",
            }}>
              <p style={{ color: t.textSub, fontSize: "16px", marginBottom: "6px" }}>
                {posts.length === 0 ? "No posts published yet" : "No posts match your filters"}
              </p>
              <p style={{ color: t.textMuted, fontSize: "13px" }}>
                {posts.length === 0 ? "Check back soon — new articles are on the way." : "Try a different category or search term."}
              </p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <input
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "13px 16px",
              borderRadius: "12px",
              border: `1px solid ${t.border}`,
              backgroundColor: t.bgCard,
              color: t.text,
              fontSize: "14px",
              fontFamily: "Poppins, sans-serif",
              outline: "none",
            }}
          />

          <div style={{ backgroundColor: t.bgCard, border: `1px solid ${t.border}`, borderRadius: "16px", padding: "22px" }}>
            <h4 style={{ color: t.text, fontSize: "15px", fontWeight: 700, margin: "0 0 14px", fontFamily: "Poppins, sans-serif" }}>
              Categories
            </h4>
            {categories.length > 0 ? categories.map(([tag, count]) => (
              <div key={tag} onClick={() => setActiveCategory(tag)} style={{
                display: "flex", justifyContent: "space-between", padding: "9px 0",
                color: activeCategory === tag ? t.accent : t.textSub, fontSize: "14px", cursor: "pointer",
                fontWeight: activeCategory === tag ? 600 : 400,
              }}>
                <span>{tag}</span>
                <span>{count}</span>
              </div>
            )) : (
              <p style={{ color: t.textMuted, fontSize: "13px", margin: 0 }}>
                Categories will appear once you publish your first post.
              </p>
            )}
          </div>

          <div style={{ backgroundColor: t.bgCard, border: `1px solid ${t.border}`, borderRadius: "16px", padding: "22px" }}>
            <h4 style={{ color: t.text, fontSize: "15px", fontWeight: 700, margin: "0 0 14px", fontFamily: "Poppins, sans-serif" }}>
              Popular Posts
            </h4>
            {popularPosts.length > 0 ? popularPosts.map((post) => (
              <Link key={post.slug} to={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
                <div style={{ display: "flex", gap: "12px", padding: "9px 0", alignItems: "center" }}>
                  {post.heroImage ? (
                    <img src={post.heroImage} alt="" style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "10px", flexShrink: 0 }} />
                  ) : (
                    <div style={{ width: "50px", height: "50px", borderRadius: "10px", flexShrink: 0, background: `linear-gradient(135deg, ${t.accent}33, ${t.accentAlt}22)` }} />
                  )}
                  <div>
                    <p style={{ color: t.text, fontSize: "13px", fontWeight: 600, margin: 0, lineHeight: 1.3 }}>{post.title}</p>
                    <p style={{ color: t.textMuted, fontSize: "11px", margin: "3px 0 0" }}>{formatDate(post.date)}</p>
                  </div>
                </div>
              </Link>
            )) : (
              <p style={{ color: t.textMuted, fontSize: "13px", margin: 0 }}>No posts yet.</p>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .blog-row:hover {
          border-color: ${t.accent} !important;
          transform: translateY(-2px);
          box-shadow: 0 10px 30px ${t.accent}22;
        }
        @media (max-width: 900px) {
          .blog-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default BlogListPage;