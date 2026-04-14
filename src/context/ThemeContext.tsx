import { createContext, useContext, useState, useEffect} from "react";
import type {ReactNode} from "react";

type Theme = "dark" | "light";

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>({ theme: "dark", toggleTheme: () => {} });

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("kp-theme");
    return (saved as Theme) || "dark";
  });

  useEffect(() => {
    localStorage.setItem("kp-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

// Color tokens for both themes
export const tokens = {
  dark: {
    bg: "#050816",
    bgCard: "#151030",
    bgCard2: "#100d25",
    border: "rgba(145,94,255,0.2)",
    text: "#ffffff",
    textSub: "#aaa6c3",
    textMuted: "#6b6a85",
    navBg: "rgba(5,8,22,0.95)",
    accent: "#915EFF",
    accentAlt: "#00cea8",
  },
  light: {
    bg: "#f0eeff",
    bgCard: "#ffffff",
    bgCard2: "#f8f5ff",
    border: "rgba(145,94,255,0.25)",
    text: "#0f0a1e",
    textSub: "#4a4570",
    textMuted: "#7a76a0",
    navBg: "rgba(240,238,255,0.95)",
    accent: "#7c3aed",
    accentAlt: "#059669",
  },
};

export type Tokens = typeof tokens.dark;