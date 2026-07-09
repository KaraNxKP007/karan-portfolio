import { achievements } from "../constants";
import {
  FiTrendingUp, FiUsers, FiCode, FiAward, FiBookOpen, FiTarget,
  FiStar, FiCompass, FiFlag, FiZap, FiLayers, FiGitBranch,
} from "react-icons/fi";
import type { IconType } from "react-icons";

const colors = ["#f59e0b", "#915EFF", "#00cea8", "#ec4899"];

// Order matters — more specific rules should come first.
const iconRules: { keywords: string[]; icon: IconType }[] = [
  { keywords: ["rank", "top", "score", "cgpa", "percentile", "gpa"], icon: FiTrendingUp },
  { keywords: ["developer head", "tech lead", "cto"], icon: FiGitBranch },
  { keywords: ["coordinator"], icon: FiCompass },
  { keywords: ["president", "captain", "founder"], icon: FiFlag },
  { keywords: ["lead", "head", "chapter", "cell", "club", "society"], icon: FiUsers },
  { keywords: ["developer", "engineer", "code", "built", "shipped"], icon: FiCode },
  { keywords: ["award", "winner", "champion", "1st", "gold", "medal"], icon: FiAward },
  { keywords: ["research", "paper", "publication", "course", "certification"], icon: FiBookOpen },
  { keywords: ["hackathon", "competition", "challenge"], icon: FiTarget },
  { keywords: ["scholarship", "fellowship", "grant"], icon: FiZap },
  { keywords: ["project", "product", "platform"], icon: FiLayers },
];

const getIconFor = (title: string): IconType => {
  const lower = title.toLowerCase();
  for (const rule of iconRules) {
    if (rule.keywords.some((k) => lower.includes(k))) return rule.icon;
  }
  return FiStar;
};

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
            const Icon = getIconFor(item.title);
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
                <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "100px", height: "100px", borderRadius: "50%", background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`, pointerEvents: "none" }} />

                <div style={{
                  width: "44px", height: "44px", borderRadius: "12px",
                  backgroundColor: `${color}15`, border: `1px solid ${color}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "16px",
                }}>
                  <Icon size={20} color={color} />
                </div>

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