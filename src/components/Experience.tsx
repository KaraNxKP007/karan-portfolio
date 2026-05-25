import { experiences } from "../constants";

const Experience = () => {
  return (
    <section id="experience" style={{ backgroundColor: "#050816", padding: "80px 0" }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 24px" }}>

        <p style={{ color: "#aaa6c3", fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "8px" }}>
          What I have done so far
        </p>
        <h2 style={{ color: "#ffffff", fontWeight: 900, fontSize: "clamp(32px, 5vw, 60px)", marginBottom: "60px" }}>
          Work Experience.
        </h2>

        {/* Timeline */}
        <div style={{ position: "relative", paddingLeft: "40px" }}>
          <div style={{
            position: "absolute",
            left: "15px",
            top: 0,
            bottom: 0,
            width: "2px",
            background: "linear-gradient(to bottom, #915EFF 0%, rgba(145,94,255,0.2) 100%)",
          }} />

          {experiences.map((exp, index) => (
            <div key={index} style={{ position: "relative", marginBottom: index === experiences.length - 1 ? 0 : "40px" }}>
              {/* Glowing dot */}
              <div style={{
                position: "absolute",
                left: "-32px",
                top: "28px",
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                backgroundColor: exp.color,
                boxShadow: `0 0 0 4px rgba(5,8,22,1), 0 0 20px ${exp.color}`,
                zIndex: 1,
              }} />

              <div style={{
                background: "linear-gradient(135deg, #151030 0%, #1a1040 100%)",
                border: "1px solid rgba(145,94,255,0.2)",
                borderRadius: "24px",
                padding: "32px",
                position: "relative",
                overflow: "hidden",
                transition: "border-color 0.3s",
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = exp.color; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(145,94,255,0.2)"; }}
              >
                {/* Top color bar */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", backgroundColor: exp.color, borderRadius: "24px 24px 0 0" }} />

                {/* Glow bg */}
                <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "150px", height: "150px", borderRadius: "50%", background: `radial-gradient(circle, ${exp.color}18 0%, transparent 70%)`, pointerEvents: "none" }} />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px", marginBottom: "20px" }}>
                  <div>
                    <h3 style={{ color: "#ffffff", fontSize: "22px", fontWeight: 800, marginBottom: "6px" }}>
                      {exp.title}
                    </h3>
                    <p style={{ color: exp.color, fontSize: "16px", fontWeight: 600 }}>
                      {exp.company}
                    </p>
                  </div>
                  <span style={{
                    backgroundColor: `${exp.color}18`,
                    border: `1px solid ${exp.color}50`,
                    borderRadius: "9999px",
                    padding: "6px 18px",
                    fontSize: "13px",
                    color: exp.color,
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                  }}>
                    {exp.date}
                  </span>
                </div>

                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                  {exp.description.map((point, i) => (
                    <li key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                      <span style={{ color: exp.color, fontSize: "16px", flexShrink: 0, marginTop: "2px" }}>▸</span>
                      <p style={{ color: "#c8c4e0", fontSize: "15px", lineHeight: 1.75 }}>{point}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Education */}
        <div style={{ marginTop: "72px" }}>
          <p style={{ color: "#aaa6c3", fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "8px" }}>
            Academic Background
          </p>
          <h3 style={{ color: "#ffffff", fontWeight: 900, fontSize: "clamp(28px, 4vw, 50px)", marginBottom: "36px" }}>
            Education.
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              { degree: "B.Tech — Chemical Engineering", institute: "Indian Institute of Technology Jodhpur", year: "2022 – 2026", score: "8.58 / 10 CGPA", highlight: false },
              { degree: "Senior Secondary (XII) — RBSE", institute: "Vyas Public Sr. Sec. School, Bikaner", year: "2020 – 2021", score: "99.40%", highlight: false },
              { degree: "Secondary (X) — RBSE", institute: "Vyas Public Sr. Sec. School, Bikaner", year: "2018 – 2019", score: "94.17%", highlight: false },
            ].map((edu, i) => (
              <div key={i} style={{
                background: "linear-gradient(135deg, #151030 0%, #1a1040 100%)",
                border: edu.highlight ? "1px solid rgba(145,94,255,0.5)" : "1px solid rgba(145,94,255,0.15)",
                borderRadius: "16px",
                padding: "20px 28px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "12px",
                position: "relative",
                overflow: "hidden",
              }}>
                {edu.highlight && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, #915EFF, #00cea8)" }} />}
                <div>
                  <p style={{ color: "#ffffff", fontSize: "16px", fontWeight: 700, marginBottom: "4px" }}>{edu.degree}</p>
                  <p style={{ color: "#aaa6c3", fontSize: "13px" }}>{edu.institute}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ color: edu.highlight ? "#915EFF" : "#00cea8", fontSize: "16px", fontWeight: 800, marginBottom: "2px" }}>{edu.score}</p>
                  <p style={{ color: "#aaa6c3", fontSize: "12px" }}>{edu.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;