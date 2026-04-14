import { projects } from "../constants";

const tagColors: Record<string, string> = {
  TypeScript: "#3178c6",
  "VS Code API": "#0078d7",
  "Gemini AI": "#00cea8",
  DeepSeek: "#915EFF",
  "Node.js": "#68a063",
  JavaScript: "#f7df1e",
  "CSS3 Animations": "#ec4899",
  jsPDF: "#f59e0b",
  SPA: "#ef4444",
};

const Projects = () => {
  return (
    <section id="projects" style={{ backgroundColor: "#050816", padding: "80px 0" }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 24px" }}>

        <p style={{ color: "#aaa6c3", fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "8px" }}>
          My work
        </p>
        <h2 style={{ color: "#ffffff", fontWeight: 900, fontSize: "clamp(32px, 5vw, 60px)", marginBottom: "16px" }}>
          Projects.
        </h2>
        <p style={{ color: "#aaa6c3", fontSize: "16px", maxWidth: "50rem", lineHeight: 1.8, marginBottom: "56px" }}>
          Real-world projects that showcase my skills. Each includes links to code and live demos, reflecting my ability to solve complex problems and ship things that work.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "28px" }}>
          {projects.map((project, index) => (
            <div
              key={index}
              style={{
                background: "linear-gradient(135deg, #151030 0%, #1a1040 100%)",
                border: "1px solid rgba(145,94,255,0.2)",
                borderRadius: "24px",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                position: "relative",
                overflow: "hidden",
                transition: "transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(-6px)";
                el.style.borderColor = "rgba(145,94,255,0.6)";
                el.style.boxShadow = "0 20px 60px rgba(145,94,255,0.15)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(0)";
                el.style.borderColor = "rgba(145,94,255,0.2)";
                el.style.boxShadow = "none";
              }}
            >
              {/* Gradient top bar */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, #915EFF, #00cea8)" }} />

              {/* Subtle glow blob — bottom right, behind content */}
              <div style={{
                position: "absolute",
                bottom: "-40px",
                right: "-40px",
                width: "140px",
                height: "140px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(145,94,255,0.08) 0%, transparent 70%)",
                pointerEvents: "none",
                zIndex: 0,
              }} />

              {/* Project number — bottom right corner, low opacity, BEHIND everything */}
              <div style={{
                position: "absolute",
                bottom: "16px",
                right: "20px",
                fontSize: "72px",
                fontWeight: 900,
                color: "rgba(145,94,255,0.06)",
                lineHeight: 1,
                userSelect: "none",
                zIndex: 0,
                pointerEvents: "none",
              }}>
                {String(index + 1).padStart(2, "0")}
              </div>

              {/* All real content is z-index 1 so it sits above the number */}
              <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: "16px", flexGrow: 1 }}>
                <h3 style={{ color: "#ffffff", fontSize: "20px", fontWeight: 800, lineHeight: 1.3 }}>
                  {project.name}
                </h3>

                <p style={{ color: "#aaa6c3", fontSize: "14px", lineHeight: 1.8, flexGrow: 1 }}>
                  {project.description}
                </p>

                {/* Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {project.tags.map((tag) => {
                    const color = tagColors[tag] || "#aaa6c3";
                    return (
                      <span key={tag} style={{
                        backgroundColor: `${color}18`,
                        color: color,
                        fontSize: "11px",
                        fontWeight: 600,
                        padding: "4px 12px",
                        borderRadius: "9999px",
                        border: `1px solid ${color}40`,
                      }}>
                        #{tag}
                      </span>
                    );
                  })}
                </div>

                {/* Links */}
                <div style={{ display: "flex", gap: "12px", marginTop: "4px" }}>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: "9px 20px",
                      border: "1px solid rgba(145,94,255,0.5)",
                      color: "#c084fc",
                      borderRadius: "9999px",
                      fontSize: "13px",
                      fontWeight: 700,
                      textDecoration: "none",
                      backgroundColor: "rgba(145,94,255,0.05)",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.backgroundColor = "#915EFF";
                      el.style.color = "#ffffff";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.backgroundColor = "rgba(145,94,255,0.05)";
                      el.style.color = "#c084fc";
                    }}
                  >
                    GitHub ↗
                  </a>
                  {project.live && project.live !== "#" && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: "9px 20px",
                        border: "1px solid rgba(0,206,168,0.5)",
                        color: "#00cea8",
                        borderRadius: "9999px",
                        fontSize: "13px",
                        fontWeight: 700,
                        textDecoration: "none",
                        backgroundColor: "rgba(0,206,168,0.05)",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLAnchorElement;
                        el.style.backgroundColor = "#00cea8";
                        el.style.color = "#000000";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLAnchorElement;
                        el.style.backgroundColor = "rgba(0,206,168,0.05)";
                        el.style.color = "#00cea8";
                      }}
                    >
                      Live Demo ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;