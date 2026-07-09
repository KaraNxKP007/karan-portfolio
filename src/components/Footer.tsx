import { about, navLinks } from "../constants";
import logo from "../assets/logo.png";

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const socials = [
    {
      label: "GitHub",
      href: about.github,
      color: "#aaa6c3",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 22v-3.9a3.4 3.4 0 0 0-.95-2.6c3.15-.35 6.45-1.55 6.45-7A5.44 5.44 0 0 0 19 4.77 5.07 5.07 0 0 0 18.91.65S17.73.35 15 2.48a13.38 13.38 0 0 0-7 0C5.27.35 4.09.65 4.09.65A5.07 5.07 0 0 0 4 4.77a5.44 5.44 0 0 0-1.5 3.73c0 5.42 3.3 6.61 6.44 7A3.4 3.4 0 0 0 8 18.09V22" />
          <path d="M9 19c-3 0-3-3-6-3" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: about.linkedin,
      color: "#0ea5e9",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      label: "Email",
      href: "mailto:" + about.email,
      color: "#c084fc",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
    },
  ];

  return (
    <footer style={{ backgroundColor: "#050816", borderTop: "1px solid rgba(145,94,255,0.15)", padding: "60px 24px 32px" }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto" }}>

        {/* Resume Download Banner — gradient circulates around the border edge */}
        <div style={{
          position: "relative",
          borderRadius: "24px",
          padding: "1.5px",
          overflow: "hidden",
          marginBottom: "18px",
        }}>
          <div style={{
            position: "relative",
            zIndex: 1,
            backgroundColor: "#151030",
            borderRadius: "22.5px",
            padding: "28px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "20px",
          }}>
          {/* Soft glow — same radial-gradient pattern used on Achievements/Projects cards */}
          <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "180px", height: "180px", background: "radial-gradient(circle, rgba(145,94,255,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />

          <div>
            <p style={{ color: "#ffffff", fontWeight: 800, fontSize: "18px", marginBottom: "4px" }}>
              Interested in working together?
            </p>
            <p style={{ color: "#aaa6c3", fontSize: "14px" }}>
              View or download my resume — always up to date.
            </p>
          </div>

          <a
            href="/karanpratapResume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "13px 28px",
              background: "linear-gradient(135deg, #915EFF, #6d28d9)",
              color: "#ffffff",
              borderRadius: "9999px",
              fontWeight: 700,
              fontSize: "14px",
              textDecoration: "none",
              boxShadow: "0 0 24px rgba(145,94,255,0.35)",
              whiteSpace: "nowrap" as const,
              flexShrink: 0,
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.85"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
          >
            View Resume
          </a>
          </div>
        </div>

        {/* Moving quote strip */}
        <div style={{
          overflow: "hidden",
          marginBottom: "56px",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
          maskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
        }}>
          <div className="kp-quote-track" style={{ display: "flex", width: "max-content" }}>
            {Array.from({ length: 2 }).map((_, trackIndex) => (
              <div key={trackIndex} style={{ display: "flex" }}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <span
                    key={i}
                    style={{
                      color: "#8b899e",
                      fontSize: "13px",
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase" as const,
                      whiteSpace: "nowrap" as const,
                      textShadow: "0 0 10px rgba(170,166,195,0.55)",
                      paddingRight: "40px",
                    }}
                  >
                    ✦ Building things that actually matter ✦
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Main footer grid */}
        <div className="kp-footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "48px", marginBottom: "40px" }}>

          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <img
                src={logo}
                alt="Karan Pratap logo"
                style={{ width: "44px", height: "44px", borderRadius: "10px", objectFit: "cover", flexShrink: 0 }}
              />
              <div>
                <p style={{ color: "#ffffff", fontWeight: 800, fontSize: "15px", lineHeight: 1.2 }}>
                  Karan Pratap Singh Rathore
                </p>
                <p style={{ color: "#915EFF", fontSize: "12px" }}>IIT Jodhpur Graduate · 2022–2026</p>
              </div>
            </div>

            {/* Availability badge — same visual language as the Hero "Open to Opportunities" pill */}
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "rgba(0,206,168,0.08)",
              border: "1px solid rgba(0,206,168,0.35)",
              borderRadius: "9999px",
              padding: "5px 14px",
              marginBottom: "20px",
            }}>
              <div style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#00cea8", animation: "kpFooterPulse 2s infinite", flexShrink: 0 }} />
              <span style={{ color: "#00cea8", fontSize: "12px", fontWeight: 600 }}>Available for new opportunities</span>
            </div>

            {/* Social icons */}
            <div style={{ display: "flex", gap: "10px" }}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    width: "36px", height: "36px", borderRadius: "50%",
                    border: "1px solid rgba(145,94,255,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#aaa6c3",
                    textDecoration: "none", transition: "all 0.2s",
                    backgroundColor: "#151030",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.borderColor = s.color;
                    el.style.color = s.color;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.borderColor = "rgba(145,94,255,0.3)";
                    el.style.color = "#aaa6c3";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigate */}
          <div>
            <p style={{ color: "#aaa6c3", fontWeight: 700, fontSize: "13px", textTransform: "uppercase" as const, letterSpacing: "0.1em", marginBottom: "20px" }}>
              Navigate
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column" as const, gap: "12px" }}>
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={"#" + link.id}
                    style={{ color: "#aaa6c3", fontSize: "14px", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#ffffff"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#aaa6c3"; }}
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p style={{ color: "#aaa6c3", fontWeight: 700, fontSize: "13px", textTransform: "uppercase" as const, letterSpacing: "0.1em", marginBottom: "20px" }}>
              Contact
            </p>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: "12px" }}>
              <a
                href={"mailto:" + about.email}
                style={{ color: "#aaa6c3", fontSize: "13px", textDecoration: "none", transition: "color 0.2s", wordBreak: "break-all" as const }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#c084fc"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#aaa6c3"; }}
              >
                {about.email}
              </a>
              <a
                href={about.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#aaa6c3", fontSize: "13px", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#0ea5e9"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#aaa6c3"; }}
              >
                LinkedIn
              </a>
              <a
                href={about.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#aaa6c3", fontSize: "13px", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#ffffff"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#aaa6c3"; }}
              >
                GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid rgba(145,94,255,0.1)",
          paddingTop: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}>
          <p style={{ color: "#6b6a85", fontSize: "13px" }}>
            © 2026 KPSR. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "transparent",
              border: "1px solid rgba(145,94,255,0.3)",
              color: "#aaa6c3",
              borderRadius: "9999px",
              padding: "8px 16px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.borderColor = "#915EFF";
              el.style.color = "#ffffff";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.borderColor = "rgba(145,94,255,0.3)";
              el.style.color = "#aaa6c3";
            }}
          >
            Back to top ↑
          </button>
        </div>
      </div>

      <style>{`
        @keyframes kpFooterPulse { 0%,100%{opacity:1} 50%{opacity:0.3} }

        @keyframes kpQuoteMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .kp-quote-track { animation: kpQuoteMarquee 20s linear infinite; }

        @media (prefers-reduced-motion: reduce) {
          .kp-glow-border::before, .kp-quote-track { animation: none !important; }
        }

        @media (max-width: 768px) {
          .kp-footer-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;