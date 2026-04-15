import { useEffect, useRef } from "react";
import { about } from "../constants";
import EarthCanvas from "./EarthCanvas";
import * as THREE from "three";

const ParticleField = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);
    const count = 1200;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * 700;
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    scene.add(new THREE.Points(geo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.35, transparent: true, opacity: 0.5 })));
    camera.position.z = 5;
    let frameId: number;
    const tick = () => { frameId = requestAnimationFrame(tick); scene.rotation.y += 0.00007; renderer.render(scene, camera); };
    tick();
    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);
  return <div ref={mountRef} style={{ position: "absolute", inset: 0, zIndex: 0 }} />;
};

const Hero = () => {
  return (
    <>
      {/* Force dark background immediately — prevents white flash on mobile */}
      <style>{`
        html, body, #root { background-color: #050816 !important; }
        @keyframes kpPulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes kpBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(8px)} }

        /* Mobile: stack vertically, Earth below text */
        .hero-inner {
          flex-direction: column;
          align-items: flex-start;
          padding-top: 90px;
          padding-bottom: 40px;
          gap: 0;
        }
        .hero-text { width: 100%; max-width: 100%; }
        .hero-earth {
          width: 100%;
          height: 320px;
          margin-top: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hero-earth-inner {
          width: 320px;
          height: 320px;
        }

        /* Tablet 640px+ */
        @media (min-width: 640px) {
          .hero-inner {
            flex-direction: row !important;
            align-items: center !important;
            justify-content: space-between !important;
            padding-top: 110px !important;
          }
          .hero-text { max-width: 400px !important; }
          .hero-earth {
            width: auto !important;
            height: 380px !important;
            margin-top: 0 !important;
            display: block !important;
          }
          .hero-earth-inner { width: 380px !important; height: 380px !important; }
        }

        /* Desktop 1024px+ — larger Earth */
        @media (min-width: 1024px) {
          .hero-text { max-width: 480px !important; }
          .hero-earth { height: 540px !important; }
          .hero-earth-inner { width: 540px !important; height: 540px !important; }
        }
      `}</style>

      <section style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#050816",
        colorScheme: "dark",
        overflow: "hidden",
        // Force dark on iOS Safari which ignores body bg sometimes
        WebkitTapHighlightColor: "transparent",
      }}>
        <div id="hero-top" style={{ position: "absolute", top: "40%", left: 0, width: "1px", height: "1px" }} />
        <ParticleField />

        {/* Purple glow blob */}
        <div style={{ position: "absolute", top: "15%", left: "-8%", width: "420px", height: "420px", background: "radial-gradient(circle, rgba(145,94,255,0.12) 0%, transparent 65%)", pointerEvents: "none", zIndex: 1 }} />

        {/* Main content row/column */}
        <div className="hero-inner" style={{
          position: "relative", zIndex: 2,
          maxWidth: "80rem", margin: "0 auto",
          padding: "90px 20px 40px",
          width: "100%",
          display: "flex",
          boxSizing: "border-box",
        }}>

          {/* LEFT — Text */}
          <div className="hero-text">
            <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", gap: "14px" }}>
              {/* Purple accent line */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "8px", flexShrink: 0 }}>
                <div style={{ width: "15px", height: "15px", borderRadius: "50%", backgroundColor: "#915EFF", boxShadow: "0 0 18px rgba(145,94,255,0.9)" }} />
                <div style={{ width: "3px", height: "200px", background: "linear-gradient(to bottom, #915EFF, transparent)" }} />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                {/* Badge */}
                <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "rgba(145,94,255,0.12)", border: "1px solid rgba(145,94,255,0.35)", borderRadius: "9999px", padding: "5px 14px", marginBottom: "16px" }}>
                  <div style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#00cea8", animation: "kpPulse 2s infinite", flexShrink: 0 }} />
                  <span style={{ color: "#c084fc", fontSize: "12px", fontWeight: 600, whiteSpace: "nowrap" }}>Open to Opportunities</span>
                </div>

                <h1 style={{ fontWeight: 900, color: "#ffffff", fontSize: "clamp(36px, 9vw, 78px)", lineHeight: 1.05, marginBottom: "14px" }}>
                  Hi, I am{" "}
                  <span style={{ background: "linear-gradient(135deg, #915EFF 0%, #00cea8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    Karan
                  </span>
                </h1>

                <p style={{ color: "#aaa6c3", fontSize: "clamp(13px, 3vw, 18px)", lineHeight: 1.7, marginBottom: "14px" }}>
                  {about.tagline}
                </p>

                <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "24px" }}>
                  {["IIT Jodhpur", "CGPA 8.58", "Ranked 2nd"].map((b) => (
                    <span key={b} style={{ color: "#aaa6c3", fontSize: "12px", display: "flex", alignItems: "center", gap: "5px" }}>
                      <span style={{ color: "#915EFF" }}>▸</span> {b}
                    </span>
                  ))}
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  <a href="#projects" style={{ padding: "11px 22px", background: "linear-gradient(135deg, #915EFF, #6d28d9)", color: "#ffffff", borderRadius: "9999px", fontWeight: 700, fontSize: "13px", textDecoration: "none", boxShadow: "0 0 22px rgba(145,94,255,0.45)" }}>
                    View Projects
                  </a>
                  <a href={about.github} target="_blank" rel="noopener noreferrer" style={{ padding: "11px 22px", border: "1px solid rgba(145,94,255,0.5)", color: "#c084fc", borderRadius: "9999px", fontWeight: 700, fontSize: "13px", textDecoration: "none", backgroundColor: "rgba(145,94,255,0.06)" }}>
                    GitHub
                  </a>
                  <a href={about.linkedin} target="_blank" rel="noopener noreferrer" style={{ padding: "11px 22px", border: "1px solid rgba(0,206,168,0.45)", color: "#00cea8", borderRadius: "9999px", fontWeight: 700, fontSize: "13px", textDecoration: "none", backgroundColor: "rgba(0,206,168,0.06)" }}>
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Earth (centered on mobile, beside text on desktop) */}
          <div className="hero-earth">
            <div className="hero-earth-inner">
              <EarthCanvas />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: "18px", left: "50%", transform: "translateX(-50%)", zIndex: 2 }}>
          <a href="#about">
            <div style={{ width: "24px", height: "42px", borderRadius: "9999px", border: "2px solid rgba(170,166,195,0.4)", display: "flex", justifyContent: "center", paddingTop: "7px" }}>
              <div style={{ width: "3px", height: "7px", borderRadius: "9999px", backgroundColor: "#915EFF", animation: "kpBounce 1.5s ease-in-out infinite" }} />
            </div>
          </a>
        </div>
      </section>
    </>
  );
};

export default Hero;