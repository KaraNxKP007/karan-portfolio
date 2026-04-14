import { useState, useEffect } from "react";
import { navLinks, about } from "../constants";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);

    // IntersectionObserver — auto-updates active link on scroll
    const observers: IntersectionObserver[] = [];
    navLinks.forEach(({ id, title }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(title); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    const topObs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(""); },
      { threshold: 0.5 }
    );
    const heroEl = document.getElementById("hero-top");
    if (heroEl) topObs.observe(heroEl);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observers.forEach((o) => o.disconnect());
      topObs.disconnect();
    };
  }, []);

  return (
    <nav style={{
      position: "fixed",
      top: 0,
      width: "100%",
      zIndex: 50,
      transition: "all 0.3s",
      padding: "12px 20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: scrolled ? "rgba(5,8,22,0.96)" : "rgba(5,8,22,0.5)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderBottom: scrolled ? "1px solid rgba(145,94,255,0.18)" : "1px solid transparent",
      boxSizing: "border-box",
    }}>

      {/* Logo — pure CSS, no image, no broken icon */}
      <a
        href="#"
        onClick={() => { setActive(""); window.scrollTo(0, 0); }}
        style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}
      >
        <div style={{
          width: "40px",
          height: "40px",
          borderRadius: "10px",
          background: "linear-gradient(135deg, #915EFF, #00cea8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffffff",
          fontWeight: 900,
          fontSize: "13px",
          boxShadow: "0 0 18px rgba(145,94,255,0.5)",
          flexShrink: 0,
          fontFamily: "Poppins, sans-serif",
          letterSpacing: "0.02em",
          userSelect: "none",
        }}>
          KPSR
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ color: "#ffffff", fontWeight: 800, fontSize: "14px", lineHeight: 1.2, fontFamily: "Poppins, sans-serif" }}>
            Karan Pratap
          </span>
          <span style={{ color: "#915EFF", fontWeight: 500, fontSize: "10px", fontFamily: "Poppins, sans-serif" }}>
            IIT Jodhpur Graduate
          </span>
        </div>
      </a>

      {/* Desktop nav */}
      <ul className="kp-desktop-nav" style={{ display: "flex", gap: "24px", listStyle: "none", margin: 0, padding: 0, alignItems: "center" }}>
        {navLinks.map((link) => {
          const isActive = active === link.title;
          return (
            <li key={link.id} style={{ position: "relative" }}>
              <a
                href={"#" + link.id}
                onClick={() => setActive(link.title)}
                style={{
                  color: isActive ? "#ffffff" : "#aaa6c3",
                  fontSize: "14px",
                  fontWeight: isActive ? 600 : 500,
                  textDecoration: "none",
                  transition: "color 0.2s",
                  paddingBottom: "4px",
                  display: "block",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {link.title}
              </a>
              <span style={{
                position: "absolute",
                bottom: 0, left: 0, right: 0,
                height: "2px",
                background: "linear-gradient(90deg, #915EFF, #00cea8)",
                borderRadius: "9999px",
                transform: isActive ? "scaleX(1)" : "scaleX(0)",
                transition: "transform 0.25s ease",
                transformOrigin: "left",
              }} />
            </li>
          );
        })}
        <li>
          <a
            href={about.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "8px 18px",
              background: "linear-gradient(135deg, #915EFF, #6d28d9)",
              color: "#ffffff",
              borderRadius: "9999px",
              fontSize: "13px",
              fontWeight: 700,
              textDecoration: "none",
              boxShadow: "0 0 16px rgba(145,94,255,0.4)",
              fontFamily: "Poppins, sans-serif",
              whiteSpace: "nowrap",
            }}
          >
            GitHub ↗
          </a>
        </li>
      </ul>

      {/* Mobile hamburger */}
      <button
        className="kp-mobile-btn"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "6px",
          display: "none",
        }}
      >
        <div style={{ width: "22px", display: "flex", flexDirection: "column", gap: "5px" }}>
          <span style={{ display: "block", height: "2px", backgroundColor: "#ffffff", transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none" }} />
          <span style={{ display: "block", height: "2px", backgroundColor: "#ffffff", transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
          <span style={{ display: "block", height: "2px", backgroundColor: "#ffffff", transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none" }} />
        </div>
      </button>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={{
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          backgroundColor: "rgba(5,8,22,0.98)",
          borderBottom: "1px solid rgba(145,94,255,0.2)",
          padding: "20px",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
        }}>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={"#" + link.id}
                  onClick={() => { setActive(link.title); setMenuOpen(false); }}
                  style={{
                    color: active === link.title ? "#915EFF" : "#aaa6c3",
                    fontSize: "16px",
                    fontWeight: 500,
                    textDecoration: "none",
                    display: "block",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  {link.title}
                </a>
              </li>
            ))}
            <li>
              <a
                href={about.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#915EFF", fontSize: "16px", fontWeight: 700, textDecoration: "none", fontFamily: "Poppins, sans-serif" }}
              >
                GitHub ↗
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;