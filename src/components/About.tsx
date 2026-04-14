import { about } from "../constants";
import SkillBall from "./SkillBall";

// Using devicons PNG — these render perfectly as sphere textures
const skillBalls = [
  { name: "React.js",    color: "#61dafb", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "JavaScript", color: "#f7df1e", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", color: "#3178c6", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
  { name: "Node.js",    color: "#68a063", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { name: "Python",     color: "#4b8bbe", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "OpenCV",     color: "#5C3EE8", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg" },
  { name: "PostgreSQL", color: "#336791", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
  { name: "Git",        color: "#f05032", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
  { name: "VS Code",    color: "#0078d7", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" },
  { name: "Tailwind",   color: "#06b6d4", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "MySQL",      color: "#00758f", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
  { name: "C++",        color: "#00599C", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
];

const About = () => {
  return (
    <section id="about" style={{ backgroundColor: "#050816", padding: "80px 0" }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 24px" }}>

        <p style={{ color: "#aaa6c3", fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "8px" }}>Introduction</p>
        <h2 style={{ color: "#ffffff", fontWeight: 900, fontSize: "clamp(32px, 5vw, 60px)", marginBottom: "24px" }}>Overview.</h2>
        <p style={{ color: "#aaa6c3", fontSize: "17px", maxWidth: "52rem", lineHeight: 1.85, marginBottom: "60px" }}>{about.bio}</p>

        {/* Info cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px", marginBottom: "80px" }}>
          {[
            { label: "Degree", value: "B.Tech", sub: "IIT Jodhpur", accent: "#915EFF" },
            { label: "CGPA", value: "8.59", sub: "Departmental Rank 2", accent: "#00cea8" },
            { label: "Batch", value: "2022 – 2026", sub: "2026 Graduate", accent: "#f59e0b" },
          ].map((item) => (
            <div key={item.label} style={{ backgroundColor: "#151030", border: "1px solid rgba(145,94,255,0.2)", borderRadius: "20px", padding: "24px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: `linear-gradient(90deg, ${item.accent}, transparent)` }} />
              <p style={{ color: "#6b6a85", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>{item.label}</p>
              <p style={{ color: "#ffffff", fontSize: "15px", fontWeight: 700, marginBottom: "4px" }}>{item.value}</p>
              <p style={{ color: item.accent, fontSize: "13px", fontWeight: 500 }}>{item.sub}</p>
            </div>
          ))}
        </div>

        {/* Skills */}
        <p style={{ color: "#aaa6c3", fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "8px" }}>Tech Stack</p>
        <h3 style={{ color: "#ffffff", fontWeight: 900, fontSize: "clamp(28px, 4vw, 50px)", marginBottom: "12px" }}>Skills.</h3>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "36px", justifyContent: "center" }}>
          {skillBalls.map((s) => (
            <SkillBall key={s.name} name={s.name} color={s.color} iconUrl={s.iconUrl} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;