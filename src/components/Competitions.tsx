import { competitions } from "../constants";
import {
  FiTarget, FiAward, FiTrendingUp, FiZap, FiCode, FiCpu, FiStar,
} from "react-icons/fi";
import type { IconType } from "react-icons";

const iconRules: { keywords: string[]; icon: IconType }[] = [
  { keywords: ["ml", "machine learning", "ai", "model"], icon: FiCpu },
  { keywords: ["hackathon", "hack"], icon: FiZap },
  { keywords: ["coding", "code", "dev"], icon: FiCode },
  { keywords: ["top", "rank", "winner", "1st", "gold"], icon: FiAward },
  { keywords: ["challenge", "competition"], icon: FiTarget },
];

const getIconFor = (title: string): IconType => {
  const lower = title.toLowerCase();
  for (const rule of iconRules) {
    if (rule.keywords.some((k) => lower.includes(k))) return rule.icon;
  }
  return FiStar;
};

const Competitions = () => {
  return (
    <section id="competitions" style={{ backgroundColor: "#050816", padding: "80px 0" }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 20px" }}>

        <p style={{ color: "#aaa6c3", fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "8px" }}>
          Competitions & Hackathons
        </p>
        <h2 style={{ color: "#ffffff", fontWeight: 900, fontSize: "clamp(32px, 5vw, 60px)", marginBottom: "48px" }}>
          Battleground.
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "24px" }}>
          {competitions.map((item, index) => {
            const Icon = getIconFor(item.title);
            return (
              <div
                key={index}
                style={{
                  backgroundColor: "#151030",
                  border: "1px solid rgba(145,94,255,0.15)",
                  borderRadius: "24px",
                  padding: "28px",
                  position: "relative",
                  overflow: "hidden",
                  transition: "transform 0.2s, border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = "translateY(-4px)";
                  el.style.borderColor = item.color + "80";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = "translateY(0)";
                  el.style.borderColor = "rgba(145,94,255,0.15)";
                }}
              >
                {/* Type badge */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                  <div style={{
                    width: "40px", height: "40px", borderRadius: "10px",
                    backgroundColor: `${item.color}15`, border: `1px solid ${item.color}30`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Icon size={18} color={item.color} />
                  </div>
                  <span style={{
                    backgroundColor: item.color + "20",
                    border: `1px solid ${item.color}50`,
                    color: item.color,
                    fontSize: "11px",
                    fontWeight: 700,
                    padding: "4px 12px",
                    borderRadius: "9999px",
                    textTransform: "uppercase" as const,
                    letterSpacing: "0.06em",
                  }}>
                    {item.type}
                  </span>
                </div>

                <h3 style={{ color: "#ffffff", fontSize: "17px", fontWeight: 800, marginBottom: "8px", lineHeight: 1.3 }}>
                  {item.title}
                </h3>

                {/* Result badge */}
                <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: `${item.color}15`, borderRadius: "8px", padding: "4px 10px", marginBottom: "12px" }}>
                  <FiTrendingUp size={13} color={item.color} />
                  <span style={{ color: item.color, fontSize: "13px", fontWeight: 700 }}>{item.result}</span>
                </div>

                <p style={{ color: "#aaa6c3", fontSize: "13px", lineHeight: 1.75, marginBottom: "16px" }}>
                  {item.description}
                </p>

                {/* Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                  {item.tags.map((tag) => (
                    <span key={tag} style={{
                      backgroundColor: "rgba(145,94,255,0.1)",
                      color: "#c084fc",
                      fontSize: "11px",
                      fontWeight: 600,
                      padding: "3px 10px",
                      borderRadius: "9999px",
                      border: "1px solid rgba(145,94,255,0.25)",
                    }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Competitions;