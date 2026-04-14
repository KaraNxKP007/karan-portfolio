import { about } from "../constants";
import SkillBall from "./SkillBall";

// No external image URLs — all rendered via canvas.
// Add new skills by adding an object to this array.
const skillBalls = [
  { name: "React.js",    color: "#61dafb", letter: "⚛"  },
  { name: "JavaScript", color: "#f7df1e", letter: "JS" },
  { name: "TypeScript", color: "#3178c6", letter: "TS" },
  { name: "Node.js",    color: "#68a063", letter: "NJ" },
  { name: "Python",     color: "#4b8bbe", letter: "Py" },
  { name: "OpenCV",     color: "#5C3EE8", letter: "CV" },
  { name: "PostgreSQL", color: "#336791", letter: "PG" },
  { name: "Git",        color: "#f05032", letter: "⑂"  },
  { name: "VS Code",    color: "#0078d7", letter: "VS" },
  { name: "Tailwind",   color: "#06b6d4", letter: "TW" },
  { name: "MySQL",      color: "#00758f", letter: "My" },
  { name: "C++",        color: "#00599C", letter: "C+" },
];

const About = () => {
  return (
    <section id="about" style={{ backgroundColor: "#050816", padding: "80px 0" }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 20px" }}>

        <p style={{ color: "#aaa6c3", fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "8px" }}>
          Introduction
        </p>
        <h2 style={{ color: "#ffffff", fontWeight: 900, fontSize: "clamp(32px, 5vw, 60px)", marginBottom: "24px" }}>
          Overview.
        </h2>
        <p style={{ color: "#aaa6c3", fontSize: "17px", maxWidth: "52rem", lineHeight: 1.85, marginBottom: "60px" }}>
          {about.bio}
        </p>

        {/* Info cards — remove or add objects here freely */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "16px", marginBottom: "80px" }}>
          {[
            { label: "Degree",  value: "B.Tech Chemical Engg.", sub: "IIT Jodhpur",        accent: "#915EFF" },
            { label: "CGPA",    value: "8.58 / 10",             sub: "Ranked 2nd in Dept.", accent: "#00cea8" },
            { label: "Batch",   value: "2022 – 2026",           sub: "2026 Graduate",       accent: "#f59e0b" },
            // To remove Location card just delete the line below:
            // { label: "Location", value: "Jodhpur, Rajasthan", sub: "India", accent: "#ec4899" },
          ].map((item) => (
            <div key={item.label} style={{
              backgroundColor: "#151030",
              border: "1px solid rgba(145,94,255,0.2)",
              borderRadius: "20px",
              padding: "24px",
              position: "relative",
              overflow: "hidden",
            }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: `linear-gradient(90deg, ${item.accent}, transparent)` }} />
              <p style={{ color: "#6b6a85", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>{item.label}</p>
              <p style={{ color: "#ffffff", fontSize: "15px", fontWeight: 700, marginBottom: "4px" }}>{item.value}</p>
              <p style={{ color: item.accent, fontSize: "13px", fontWeight: 500 }}>{item.sub}</p>
            </div>
          ))}
        </div>

        {/* Skills section */}
        <p style={{ color: "#aaa6c3", fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "8px" }}>
          Tech Stack
        </p>
        <h3 style={{ color: "#ffffff", fontWeight: 900, fontSize: "clamp(28px, 4vw, 50px)", marginBottom: "12px" }}>
          Skills.
        </h3>
        <p style={{ color: "#6b6a85", fontSize: "14px", marginBottom: "48px" }}>
          Drag the balls to spin them ✦
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "32px", justifyContent: "center" }}>
          {skillBalls.map((s) => (
            <SkillBall key={s.name} name={s.name} color={s.color} letter={s.letter} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;