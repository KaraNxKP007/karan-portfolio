import { projects } from "../constants";
import {
  SiTypescript, SiReact, SiNodedotjs, SiJavascript, SiPython,
  SiPostgresql, SiTensorflow, SiKeras, SiOpencv, SiStreamlit,
  SiNumpy, SiDocker, SiRedis, SiSupabase, SiJsonwebtokens,
  SiGooglegemini, SiLangchain,
} from "react-icons/si";
import { FiX } from "react-icons/fi";
import { VscVscode, VscJson } from "react-icons/vsc";
import { FaCode, FaProjectDiagram, FaBolt } from "react-icons/fa";
import type { IconType } from "react-icons";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tagIcons: Record<string, { icon: IconType; color: string }> = {
  "TypeScript": { icon: SiTypescript, color: "#3178c6" },
  "React.js": { icon: SiReact, color: "#61dafb" },
  "JavaScript": { icon: SiJavascript, color: "#f7df1e" },
  "Node.js": { icon: SiNodedotjs, color: "#68a063" },
  "Python": { icon: SiPython, color: "#3776ab" },
  "PostgreSQL": { icon: SiPostgresql, color: "#336791" },
  "TensorFlow": { icon: SiTensorflow, color: "#ff6f00" },
  "Keras": { icon: SiKeras, color: "#d00000" },
  "OpenCV": { icon: SiOpencv, color: "#5c3ee8" },
  "Streamlit": { icon: SiStreamlit, color: "#ff4b4b" },
  "NumPy": { icon: SiNumpy, color: "#4dabcf" },
  "Docker": { icon: SiDocker, color: "#2496ed" },
  "Redis": { icon: SiRedis, color: "#dc382d" },
  "Supabase": { icon: SiSupabase, color: "#3ecf8e" },
  "OAuth 2.0": { icon: SiJsonwebtokens, color: "#4285f4" },
  "BullMQ": { icon: FaBolt, color: "#e11d48" },
  "LangGraph": { icon: SiLangchain, color: "#1a73e8" },
  "Google Gemini": { icon: SiGooglegemini, color: "#8e44ec" },
  "Multi-Agent": { icon: FaProjectDiagram, color: "#915EFF" },
  "VS Code API": { icon: VscVscode, color: "#0078d7" },
  "Gemini AI": { icon: SiGooglegemini, color: "#00cea8" },
  "DeepSeek": { icon: FaCode, color: "#915EFF" },
  "CSS3 Animations": { icon: FaCode, color: "#ec4899" },
  "jsPDF": { icon: VscJson, color: "#f59e0b" },
  "SPA": { icon: FaCode, color: "#ef4444" },
  "REST API": { icon: FaCode, color: "#ff6b6b" },
  "System Design": { icon: FaProjectDiagram, color: "#a78bfa" },
};

const defaultTagStyle = { icon: FaCode, color: "#aaa6c3" };




const Projects = () => {
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Lock background scroll while a card is expanded
  useEffect(() => {
    if (expandedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [expandedIndex]);

  return (
    <section id="projects" style={{ backgroundColor: "#050816", padding: "80px 0", position: "relative" }}>
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

        <div style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          color: "#7a76a0", fontSize: "12.5px", fontWeight: 500,
          backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
          padding: "7px 16px", borderRadius: "9999px", marginBottom: "32px",
        }}>
          <span style={{ fontSize: "14px" }}>💡</span>
          Hover a project's description to expand and read the full details
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "28px" }}>
          {projects.map((project, index) => (
            <div
              key={index}
              style={{
                position: "relative",
                borderRadius: "24px",
                padding: "1px",
                overflow: "hidden",
                height: "100%",
              }}
            >
              <div className="kp-border-spin" style={{
                position: "absolute", inset: "-1px", borderRadius: "24px",
                background: "conic-gradient(from var(--angle), transparent 0%, transparent 75%, rgba(255,255,255,0.9) 85%, transparent 95%)",
                zIndex: 0,
              }} />

              <div style={{
                position: "relative", zIndex: 1,
                background: "linear-gradient(135deg, #151030 0%, #1a1040 100%)",
                borderRadius: "23px", padding: "32px",
                display: "flex", flexDirection: "column", gap: "16px",
                overflow: "hidden", height: "100%",
              }}>
                <div style={{ position: "absolute", bottom: "-40px", right: "-40px", width: "140px", height: "140px", borderRadius: "50%", background: "radial-gradient(circle, rgba(145,94,255,0.08) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
                <div style={{ position: "absolute", bottom: "16px", right: "20px", fontSize: "72px", fontWeight: 900, color: "rgba(145,94,255,0.06)", lineHeight: 1, userSelect: "none", zIndex: 0, pointerEvents: "none" }}>
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: "16px", flexGrow: 1 }}>
                  <h3 style={{ color: "#ffffff", fontSize: "20px", fontWeight: 800, lineHeight: 1.3 }}>
                    {project.name}
                  </h3>

                  {/* Hover trigger — only this paragraph expands the overlay */}
                  <p
                    onMouseEnter={() => {
                      if (expandedIndex !== null) return; // a card view is already open — ignore background hovers
                      if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
                      hoverTimeout.current = setTimeout(() => setExpandedIndex(index), 500);
                    }}
                    onMouseLeave={() => {
                      if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
                    }}
                    style={{
                      color: "#aaa6c3", fontSize: "14px", lineHeight: 1.8, flexGrow: 1, cursor: "pointer",
                      display: "-webkit-box", WebkitLineClamp: 5, WebkitBoxOrient: "vertical" as const, overflow: "hidden",
                    }}
                  >
                    {project.description}
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {project.tags.map((tag) => {
                      const { icon: Icon, color } = tagIcons[tag] || defaultTagStyle;
                      return (
                        <span key={tag} style={{ display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: "rgba(255,255,255,0.05)", color: "#c8c4e0", fontSize: "11px", fontWeight: 600, padding: "5px 12px 5px 10px", borderRadius: "9999px", border: "1px solid rgba(255,255,255,0.1)" }}>
                          <Icon size={12} color={color} />
                          {tag}
                        </span>
                      );
                    })}
                  </div>

                  <div style={{ display: "flex", gap: "12px", marginTop: "4px" }}>
                    <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ padding: "9px 20px", border: "1px solid rgba(145,94,255,0.5)", color: "#c084fc", borderRadius: "9999px", fontSize: "13px", fontWeight: 700, textDecoration: "none", backgroundColor: "rgba(145,94,255,0.05)" }}>
                      GitHub ↗
                    </a>
                    {project.live && project.live !== "#" && (
                      <a href={project.live} target="_blank" rel="noopener noreferrer" style={{ padding: "9px 20px", border: "1px solid rgba(0,206,168,0.5)", color: "#00cea8", borderRadius: "9999px", fontSize: "13px", fontWeight: 700, textDecoration: "none", backgroundColor: "rgba(0,206,168,0.05)" }}>
                        Live Demo ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expanded overlay */}
      <AnimatePresence>
    {expandedIndex !== null && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed", inset: 0, backgroundColor: "rgba(5,8,22,0.75)",
            backdropFilter: "blur(6px)", zIndex: 100, pointerEvents: "auto",
          }}
        />

        {/* Flex wrapper handles centering — Framer only touches scale/opacity, not position */}
        <div style={{
          position: "fixed",
          inset: 0,
          zIndex: 101,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          {/* The card itself */}
          <div
            className="kp-modal-scroll"
            style={{
              width: "min(640px, 90vw)",
              maxHeight: "80vh",
              overflowY: "auto",
              backgroundColor: "#151030",
              border: "1px solid rgba(145,94,255,0.35)",
              borderRadius: "24px",
              padding: "40px",
              boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
              pointerEvents: "auto",
              scrollbarWidth: "none",
            }}
          >
            <h3 style={{ color: "#ffffff", fontSize: "26px", fontWeight: 800, marginBottom: "18px" }}>
              {projects[expandedIndex].name}
            </h3>
            <p style={{ color: "#c8c4e0", fontSize: "15px", lineHeight: 1.85, marginBottom: "24px" }}>
              {projects[expandedIndex].description}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "24px" }}>
              {projects[expandedIndex].tags.map((tag) => {
                const { icon: Icon, color } = tagIcons[tag] || defaultTagStyle;
                return (
                  <span key={tag} style={{ display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: "rgba(255,255,255,0.05)", color: "#c8c4e0", fontSize: "12px", fontWeight: 600, padding: "6px 14px 6px 12px", borderRadius: "9999px", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <Icon size={13} color={color} />
                    {tag}
                  </span>
                );
              })}
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <a href={projects[expandedIndex].github} target="_blank" rel="noopener noreferrer" style={{ padding: "10px 22px", border: "1px solid rgba(145,94,255,0.5)", color: "#c084fc", borderRadius: "9999px", fontSize: "14px", fontWeight: 700, textDecoration: "none", backgroundColor: "rgba(145,94,255,0.05)" }}>
                GitHub ↗
              </a>
              {projects[expandedIndex].live && projects[expandedIndex].live !== "#" && (
                <a href={projects[expandedIndex].live} target="_blank" rel="noopener noreferrer" style={{ padding: "10px 22px", border: "1px solid rgba(0,206,168,0.5)", color: "#00cea8", borderRadius: "9999px", fontSize: "14px", fontWeight: 700, textDecoration: "none", backgroundColor: "rgba(0,206,168,0.05)" }}>
                  Live Demo ↗
                </a>
              )}
            </div>
          </div>

          {/* Exit button — separate circle sitting outside the card */}
          <button
            onClick={() => setExpandedIndex(null)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              flexShrink: 0,
              pointerEvents: "auto",
            }}
          >
            <div style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontWeight:"900",
              background:"red"
            }}>
              <FiX size={18} />
            </div>
            <span style={{ color: "#c8c4e0", fontSize: "12px", fontWeight: 500, whiteSpace: "nowrap" }}>
              Exit card view
            </span>
          </button>
        </motion.div>
        </div>
      </>
    )}
  </AnimatePresence>
    </section>
  );
};

export default Projects;