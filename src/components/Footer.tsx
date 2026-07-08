import { about, navLinks } from "../constants";


const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#050816", borderTop: "1px solid rgba(145,94,255,0.15)", padding: "60px 24px 32px" }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto" }}>

        {/* Resume Download Banner */}
        <div style={{
          backgroundColor: "#151030",
          border: "1px solid rgba(145,94,255,0.25)",
          borderRadius: "20px",
          padding: "28px 32px",
          marginBottom: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "20px",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Gradient top bar */}
          {/* <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, #915EFF, #00cea8)" }} /> */}


          {/* Glow */}
          <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "180px", height: "180px", background: "radial-gradient(circle, rgba(145,94,255,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />

          <div>
            <p style={{ color: "#ffffff", fontWeight: 800, fontSize: "18px", marginBottom: "4px" }}>
              Interested in working together ?
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
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.85"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
          >
            📄 View Resume
          </a>
        </div>

        {/* Main footer grid */}
        <div className="kp-footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "48px", marginBottom: "48px" }}>

          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <div style={{
                width: "40px", height: "38px", borderRadius: "10px",
                background: "linear-gradient(135deg, #915EFF, #00cea8)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#ffffff", fontWeight: 900, fontSize: "14px",
              }}>
                KPSR
              </div>
              <div>
                <p style={{ color: "#ffffff", fontWeight: 800, fontSize: "15px", lineHeight: 1.2 }}>
                  Karan Pratap Singh Rathore
                </p>
                <p style={{ color: "#915EFF", fontSize: "12px" }}>IIT Jodhpur Graduate · 2022–2026</p>
              </div>
            </div>
            <p style={{ color: "#aaa6c3", fontSize: "14px", lineHeight: 1.7, maxWidth: "300px", marginBottom: "20px" }}>
            Building things that actually matter.
            </p>

            {/* Social icons */}
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              {[
                { label: "GH", href: about.github },
                { label: "LI", href: about.linkedin },
                { label: "✉", href: "mailto:" + about.email },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: "36px", height: "36px", borderRadius: "50%",
                    border: "1px solid rgba(145,94,255,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#aaa6c3", fontSize: "12px", fontWeight: 700,
                    textDecoration: "none", transition: "all 0.2s",
                    backgroundColor: "#151030",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.backgroundColor = "#915EFF";
                    el.style.color = "#ffffff";
                    el.style.borderColor = "#915EFF";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.backgroundColor = "#151030";
                    el.style.color = "#aaa6c3";
                    el.style.borderColor = "rgba(145,94,255,0.3)";
                  }}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Navigate */}
          <div>
            <p style={{ color: "#ffffff", fontWeight: 700, fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "20px" }}>
              Navigate
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
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
            <p style={{ color: "#ffffff", fontWeight: 700, fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "20px" }}>
              Contact
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <a
                href={"mailto:" + about.email}
                style={{ color: "#aaa6c3", fontSize: "13px", textDecoration: "none", transition: "color 0.2s", wordBreak: "break-all" as const }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#915EFF"; }}
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
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}>
          <p style={{ color: "#6b6a85", fontSize: "13px" }}>
            © 2026 KPSR. All rights reserved.
          </p>
        </div>
      </div>

      <style>{`
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