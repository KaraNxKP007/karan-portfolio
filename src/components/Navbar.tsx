import { useState, useEffect } from "react";
import { navLinks, about } from "../constants";
import { Link , useLocation } from "react-router-dom";
import logo from "../assets/logo.png"
import { useTheme, tokens } from "../context/ThemeContext";


const Navbar = () => {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation()
  const { theme } = useTheme();
  const isBlogRoute = /^\/blog\/.+/.test(location.pathname);
  const t = isBlogRoute ? tokens[theme] : tokens.dark;

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

  useEffect(() => {
  if (location.pathname === "/" && location.hash) {
    const id = location.hash.replace("#", "");
    // slight delay ensures the Home page's sections have mounted
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }
  }, [location]);

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
      backgroundColor: scrolled ? t.navBg : t.navBg.replace("0.95)", "0.5)"),
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderBottom: scrolled ? `1px solid ${t.border}` : "1px solid transparent",
      boxSizing: "border-box",
    }}>

      {/* Logo — pure CSS, no image, no broken icon */}
      <a
        href="#"
        onClick={() => { setActive(""); window.scrollTo(0, 0); }}
        style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}
      >
        <div style={{
          width: "50px",
          height: "50px",
          borderRadius: "10px",
          background: "linear-gradient(135deg, #915EFF, #00cea8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffffff",
          fontWeight: 900,
          fontSize: "13px",
          boxShadow: "0 0 15px rgba(145,94,255,0.5)",
          flexShrink: 0,
          fontFamily: "Poppins, sans-serif",
          letterSpacing: "0.02em",
          userSelect: "none",
        }}>
          <img
            src={logo}
            alt="Karan Pratap logo"
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "10px",
              objectFit: "cover",
              boxShadow: "0 0 18px rgba(145,94,255,0.5)",
              flexShrink: 0,
            }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ color: t.text, fontWeight: 800, fontSize: "18px", lineHeight: 1.2, fontFamily: "Poppins, sans-serif" }}>
            Karan Pratap
          </span>
          <span style={{ color: "#915EFF", fontWeight: 500, fontSize: "12px", fontFamily: "Poppins, sans-serif" }}>
            IITJ'26 Graduate
          </span>
        </div>
      </a>

      {/* Desktop nav */}
      <ul className="kp-desktop-nav" style={{ display: "flex", gap: "24px", listStyle: "none", margin: 0, padding: 0, alignItems: "center" }}>
        {navLinks.map((link) => {
          const isActive = location.pathname === "/" && active === link.title;
          return (
            <li key={link.id} style={{ position: "relative" }}>
              <Link
                to={`/#${link.id}`}
                onClick={() => setActive(link.title)}
                style={{
                  color: isActive ? t.text : t.textSub,
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
              </Link>
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

        {/* Blog link */}
        <li style={{ position: "relative" }}>
          <Link
            to="/blog"
            onClick={() => setActive("")}
            style={{
              color: location.pathname.startsWith("/blog") ? t.text : t.textSub,
              fontSize: "14px",
              fontWeight: location.pathname.startsWith("/blog") ? 600 : 500,
              textDecoration: "none",
              paddingBottom: "4px",
              display: "block",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Blog
          </Link>
          <span style={{
            position: "absolute",
            bottom: 0, left: 0, right: 0,
            height: "2px",
            background: "linear-gradient(90deg, #915EFF, #00cea8)",
            borderRadius: "9999px",
            transform: location.pathname.startsWith("/blog") ? "scaleX(1)" : "scaleX(0)",
            transition: "transform 0.25s ease",
            transformOrigin: "left",
          }} />
        </li>

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
              display: "inline-block",
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
          <span style={{ display: "block", height: "2px", backgroundColor: t.text, transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none" }} />
          <span style={{ display: "block", height: "2px", backgroundColor: t.text, transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
          <span style={{ display: "block", height: "2px", backgroundColor: t.text, transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none" }} />
        </div>
      </button>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={{
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          backgroundColor: t.navBg,
          borderBottom: `1px solid ${t.border}`,
          padding: "20px",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
        }}>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
            {navLinks.map((link) => (
              <li key={link.id}>
              <Link
                to={`/#${link.id}`}
                onClick={() => { setActive(link.title); setMenuOpen(false); }}
                style={{
                  color: active === link.title ? "#915EFF" : t.textSub,
                  fontSize: "16px",
                  fontWeight: 500,
                  textDecoration: "none",
                  display: "block",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {link.title}
              </Link>
              </li>
            ))}

            <li>
                <Link
                  to="/blog"
                  onClick={() => { setActive(""); setMenuOpen(false); }}
                  style={{
                    color: location.pathname.startsWith("/blog") ? "#915EFF" : t.textSub,
                    fontSize: "16px",
                    fontWeight: 500,
                    textDecoration: "none",
                    display: "block",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  Blog
                </Link>
            </li>
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