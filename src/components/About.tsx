import { about } from "../constants";

// skill section has been removed

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

        {/* Info cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "16px", marginBottom: "80px" }}>
          {[
            { label: "Degree", value: "B.Tech", sub: "IIT Jodhpur", accent: "#915EFF" },
            { label: "CGPA", value: "8.58 / 10", sub: "Ranked 2nd in Dept.", accent: "#00cea8" },
            { label: "Batch", value: "2022 – 2026", sub: "2026 Graduate", accent: "#f59e0b" },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                cursor:"pointer",
                background: "rgba(21,16,48,0.78)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "20px",
                padding: "24px",
                position: "relative",
                overflow: "hidden",
                transition: "transform 0.25s ease, border-color 0.25s ease",
                boxShadow: "0 8px 25px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const light = e.currentTarget.querySelector(".card-light") as HTMLDivElement;
                if (!light) return;
                light.style.left = `${e.clientX - rect.left}px`;
                light.style.top = `${e.clientY - rect.top}px`;
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                const light = e.currentTarget.querySelector(".card-light") as HTMLDivElement;
                if (light) light.style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                const light = e.currentTarget.querySelector(".card-light") as HTMLDivElement;
                if (light) light.style.opacity = "0";
              }}
            >
              {/* Cursor spotlight */}
              <div
                className="card-light"
                style={{
                  position: "absolute",
                  width: "220px",
                  height: "220px",
                  borderRadius: "50%",
                  pointerEvents: "none",
                  background: "radial-gradient(circle, rgba(255,255,255,0.16) 0%, rgba(145,94,255,0.12) 35%, transparent 70%)",
                  transform: "translate(-50%,-50%)",
                  opacity: 0,
                  transition: "opacity 0.2s",
                }}
              />

              <p style={{ position: "relative", color: "#6b6a85", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>{item.label}</p>
              <p style={{ position: "relative", color: "#ffffff", fontSize: "15px", fontWeight: 700, marginBottom: "4px" }}>{item.value}</p>
              <p style={{ position: "relative", color: item.accent, fontSize: "13px", fontWeight: 500 }}>{item.sub}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default About;