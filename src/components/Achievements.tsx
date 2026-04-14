import { achievements } from "../constants";

const icons = ["🏆", "🎓", "🧭", "💻"];
const colors = ["#f59e0b", "#915EFF", "#00cea8", "#ec4899"];

const Achievements = () => {
  return (
    <section id="achievements" style={{ backgroundColor: "#050816", padding: "80px 0" }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 24px" }}>

        <p style={{ color: "#aaa6c3", fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "8px" }}>
          Recognition
        </p>
        <h2 style={{ color: "#ffffff", fontWeight: 900, fontSize: "clamp(32px, 5vw, 60px)", marginBottom: "48px" }}>
          Achievements.
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" }}>
          {achievements.map((item, index) => {
            const color = colors[index % colors.length];
            return (
              <div key={index} style={{
                background: "linear-gradient(135deg, #151030 0%, #1a1040 100%)",
                border: "1px solid rgba(145,94,255,0.15)",
                borderRadius: "24px",
                padding: "32px",
                position: "relative",
                overflow: "hidden",
                transition: "transform 0.2s, border-color 0.2s",
              }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = "translateY(-4px)";
                  el.style.borderColor = color + "80";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = "translateY(0)";
                  el.style.borderColor = "rgba(145,94,255,0.15)";
                }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", backgroundColor: color }} />
                <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "100px", height: "100px", borderRadius: "50%", background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`, pointerEvents: "none" }} />

                <div style={{ fontSize: "36px", marginBottom: "16px" }}>{icons[index % icons.length]}</div>

                <div style={{
                  position: "absolute",
                  top: "16px",
                  right: "20px",
                  fontSize: "64px",
                  fontWeight: 900,
                  color: `${color}0a`,
                  lineHeight: 1,
                  userSelect: "none",
                }}>
                  {String(index + 1).padStart(2, "0")}
                </div>

                <h3 style={{ color: "#ffffff", fontSize: "16px", fontWeight: 700, marginBottom: "12px", lineHeight: 1.4 }}>
                  {item.title}
                </h3>
                <p style={{ color: "#aaa6c3", fontSize: "14px", lineHeight: 1.75 }}>
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Achievements;