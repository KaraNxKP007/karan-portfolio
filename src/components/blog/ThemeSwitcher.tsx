import { useTheme, tokens } from "../../context/ThemeContext";
import {Moon,Sun,BookOpen,} from "lucide-react";
import type { ReactNode } from "react";


const modes: { key: "dark" | "light" | "sepia"; icon: ReactNode; label: string }[]  = [
  {key: "dark", icon: <Moon size={18} />,label: "Dark",},
  {key: "light",icon: <Sun size={18} />,label: "Light",},
  {key: "sepia",icon: <BookOpen size={18} />,label: "Reading",},
];


const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const t = tokens[theme];
  const activeIndex = modes.findIndex((m) => m.key === theme);

  return (
    <div style={{
      position: "relative",
      display: "flex",
      backgroundColor: t.bgCard,
      border: `1px solid ${t.border}`,
      borderRadius: "9999px",
      padding: "4px",
      width: "132px",
    }}>
        
    {/* Sliding indicator */}
    <div
    style={{
        position: "absolute",
        top: "4px",
        left: `${4 + activeIndex * 40}px`,
        width: "40px",
        height: "40px",
        borderRadius: "9999px",
        backgroundColor: t.accent,
        transition: "all 0.35s cubic-bezier(0.65, 0, 0.35, 1)",
        boxShadow: `0 0 16px ${t.accent}66`,
        zIndex: 0,
        pointerEvents: "none",   // ⭐ THIS FIXES THE CLICK ISSUE
    }}
    />

      {modes.map((mode) => (
        <button
          key={mode.key}
          onClick={() => setTheme(mode.key)}
          title={mode.label}
          aria-label={mode.label}
          style={{
            position: "relative",
            zIndex: 2,
            width: "40px",
            height: "40px",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            fontSize: "17px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform 0.25s ease",
            transform: theme === mode.key ? "scale(1.1)" : "scale(1)",
            color: theme === mode.key ? "#ffffff" : t.textSub,
          }}
        >
          {mode.icon}
        </button>
      ))}
    </div>
  );
};

export default ThemeSwitcher;