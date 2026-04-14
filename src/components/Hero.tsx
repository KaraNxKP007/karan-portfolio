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
    return () => { cancelAnimationFrame(frameId); window.removeEventListener("resize", onResize); if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement); renderer.dispose(); };
  }, []);
  return <div ref={mountRef} style={{ position: "absolute", inset: 0, zIndex: 0 }} />;
};

const Hero = () => {
  return (
    <section style={{ position: "relative", width: "100%", minHeight: "100vh", backgroundColor: "#050816", overflow: "hidden" }}>
      <div id="hero-top" style={{ position: "absolute", top: "40%", left: 0, width: "1px", height: "1px" }} />
      <ParticleField />
      <div style={{ position: "absolute", top: "20%", left: "-5%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(145,94,255,0.1) 0%, transparent 65%)", pointerEvents: "none", zIndex: 1 }} />

      <div className="hero-inner" style={{ position: "relative", zIndex: 2, maxWidth: "80rem", margin: "0 auto", padding: "100px 20px 60px", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "0", boxSizing: "border-box" }}>

        {/* Text */}
        <div className="hero-text" style={{ width: "100%", maxWidth: "580px" }}>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", gap: "16px" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "8px", flexShrink: 0 }}>
              <div style={{ width: "16px", height: "16px", borderRadius: "50%", backgroundColor: "#915EFF", boxShadow: "0 0 20px rgba(145,94,255,0.8)" }} />
              <div style={{ width: "3px", height: "220px", background: "linear-gradient(to bottom, #915EFF, transparent)" }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "rgba(145,94,255,0.1)", border: "1px solid rgba(145,94,255,0.3)", borderRadius: "9999px", padding: "6px 14px", marginBottom: "16px" }}>
                <div style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#00cea8", animation: "kpPulse 2s infinite", flexShrink: 0 }} />
                <span style={{ color: "#c084fc", fontSize: "12px", fontWeight: 600, whiteSpace: "nowrap" }}>Open to Opportunities</span>
              </div>
              <h1 style={{ fontWeight: 900, color: "#ffffff", fontSize: "clamp(34px, 8vw, 76px)", lineHeight: 1.1, marginBottom: "14px" }}>
                Hi, I am{" "}
                <span style={{ background: "linear-gradient(135deg, #915EFF 0%, #00cea8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Karan
                </span>
              </h1>
              <p style={{ color: "#aaa6c3", fontSize: "clamp(13px, 2.5vw, 19px)", maxWidth: "460px", lineHeight: 1.7, marginBottom: "14px" }}>
                {about.tagline}
              </p>
              <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "24px" }}>
                {["IITJ", "Building AI DevTools","System Design Focused"].map((b) => (
                  <span key={b} style={{ color: "#aaa6c3", fontSize: "12px", display: "flex", alignItems: "center", gap: "5px" }}>
                    <span style={{ color: "#915EFF" }}>▸</span> {b}
                  </span>
                ))}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                <a href="#projects" style={{ padding: "11px 22px", background: "linear-gradient(135deg, #915EFF, #6d28d9)", color: "#ffffff", borderRadius: "9999px", fontWeight: 700, fontSize: "13px", textDecoration: "none", boxShadow: "0 0 24px rgba(145,94,255,0.4)" }}>View Projects</a>
                <a href={about.github} target="_blank" rel="noopener noreferrer" style={{ padding: "11px 22px", border: "1px solid rgba(145,94,255,0.5)", color: "#c084fc", borderRadius: "9999px", fontWeight: 700, fontSize: "13px", textDecoration: "none" }}>GitHub</a>
                <a href={about.linkedin} target="_blank" rel="noopener noreferrer" style={{ padding: "11px 22px", border: "1px solid rgba(0,206,168,0.4)", color: "#00cea8", borderRadius: "9999px", fontWeight: 700, fontSize: "13px", textDecoration: "none" }}>LinkedIn</a>
              </div>
            </div>
          </div>
        </div>

        {/* Earth */}
        <div className="hero-earth" style={{ width: "100%", maxWidth: "300px", height: "300px", marginTop: "16px" }}>
          <EarthCanvas />
        </div>
      </div>

      {/* Scroll */}
      <div style={{ position: "absolute", bottom: "20px", left: "50%", transform: "translateX(-50%)", zIndex: 2 }}>
        <a href="#about">
          <div style={{ width: "24px", height: "42px", borderRadius: "9999px", border: "2px solid rgba(170,166,195,0.4)", display: "flex", justifyContent: "center", paddingTop: "7px" }}>
            <div style={{ width: "3px", height: "7px", borderRadius: "9999px", backgroundColor: "#915EFF", animation: "kpBounce 1.5s ease-in-out infinite" }} />
          </div>
        </a>
      </div>

      <style>{`
        @keyframes kpPulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes kpBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(8px)} }
        @media (min-width: 640px) {
          .hero-inner { flex-direction: row !important; align-items: center !important; justify-content: space-between !important; }
          .hero-text { max-width: 420px !important; }
          .hero-earth { flex: 0 0 320px !important; height: 320px !important; max-width: 320px !important; margin-top: 0 !important; }
        }
        @media (min-width: 1024px) {
          .hero-text { max-width: 520px !important; }
          .hero-earth { flex: 0 0 500px !important; height: 500px !important; max-width: 500px !important; }
        }
      `}</style>
    </section>
  );
};

export default Hero;