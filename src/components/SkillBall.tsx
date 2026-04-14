import { useEffect, useRef } from "react";
import * as THREE from "three";

interface SkillBallProps {
  name: string;
  color: string;
  letter: string; // Short label like "JS", "TS", "Py", "⚛"
}

function buildTexture(color: string, letter: string): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  // Dark base gradient
  const grad = ctx.createRadialGradient(size * 0.38, size * 0.32, 0, size / 2, size / 2, size * 0.72);
  grad.addColorStop(0, color + "cc");
  grad.addColorStop(0.45, "#120830");
  grad.addColorStop(1, "#050816");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  // Hex grid lines
  ctx.strokeStyle = color + "28";
  ctx.lineWidth = 1.2;
  const hex = 42;
  for (let row = -1; row < size / (hex * 0.87) + 1; row++) {
    for (let col = -1; col < size / hex + 1; col++) {
      const x = col * hex * 1.5;
      const y = row * hex * 0.87 * 2 + (col % 2 === 0 ? 0 : hex * 0.87);
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const px = x + hex * 0.88 * Math.cos(angle);
        const py = y + hex * 0.88 * Math.sin(angle);
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
    }
  }

  // Specular highlight top-left
  const spec = ctx.createRadialGradient(size * 0.3, size * 0.25, 0, size * 0.3, size * 0.25, size * 0.3);
  spec.addColorStop(0, "rgba(255,255,255,0.28)");
  spec.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = spec;
  ctx.fillRect(0, 0, size, size);

  // Centered text label
  ctx.shadowColor = color;
  ctx.shadowBlur = 28;
  ctx.fillStyle = "#ffffff";
  const fontSize = letter.length > 2 ? 130 : 160;
  ctx.font = `900 ${fontSize}px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(letter, size / 2, size / 2);

  return new THREE.CanvasTexture(canvas);
}

const SkillBall = ({ name, color, letter }: SkillBallProps) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const SIZE = 128;
    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.z = 3.6;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(SIZE, SIZE);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const texture = buildTexture(color, letter);
    const geo = new THREE.SphereGeometry(1.28, 64, 64);
    const mat = new THREE.MeshStandardMaterial({ map: texture, metalness: 0.12, roughness: 0.38 });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.85));
    const key = new THREE.DirectionalLight(0xffffff, 1.8);
    key.position.set(3, 3, 3);
    scene.add(key);
    const col = new THREE.PointLight(new THREE.Color(color), 2.2, 10);
    col.position.set(-2, 0, 2);
    scene.add(col);
    const rim = new THREE.DirectionalLight(0xffffff, 0.5);
    rim.position.set(-3, -2, -2);
    scene.add(rim);

    let dragging = false, prevX = 0, prevY = 0;
    let rotX = 0, rotY = 0;
    let autoSpin = true;

    const onDown = (e: MouseEvent) => { dragging = true; autoSpin = false; prevX = e.clientX; prevY = e.clientY; };
    const onMove = (e: MouseEvent) => {
      if (!dragging) return;
      rotY += (e.clientX - prevX) * 0.016;
      rotX += (e.clientY - prevY) * 0.016;
      prevX = e.clientX; prevY = e.clientY;
    };
    const onUp = () => { dragging = false; setTimeout(() => { autoSpin = true; }, 2000); };

    // Touch
    const onTDown = (e: TouchEvent) => { dragging = true; autoSpin = false; prevX = e.touches[0].clientX; prevY = e.touches[0].clientY; };
    const onTMove = (e: TouchEvent) => {
      if (!dragging) return;
      rotY += (e.touches[0].clientX - prevX) * 0.016;
      rotX += (e.touches[0].clientY - prevY) * 0.016;
      prevX = e.touches[0].clientX; prevY = e.touches[0].clientY;
    };
    const onTUp = () => { dragging = false; setTimeout(() => { autoSpin = true; }, 2000); };

    mount.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    mount.addEventListener("touchstart", onTDown, { passive: true });
    mount.addEventListener("touchmove", onTMove, { passive: true });
    mount.addEventListener("touchend", onTUp);

    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      if (autoSpin) { rotY += 0.008; rotX += 0.002; }
      mesh.rotation.y = rotY;
      mesh.rotation.x = rotX;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      mount.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      mount.removeEventListener("touchstart", onTDown);
      mount.removeEventListener("touchmove", onTMove);
      mount.removeEventListener("touchend", onTUp);
      texture.dispose();
      geo.dispose();
      mat.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [color, letter]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", cursor: "grab" }}>
      <div
        ref={mountRef}
        style={{
          width: "128px",
          height: "128px",
          borderRadius: "50%",
          overflow: "hidden",
          filter: `drop-shadow(0 0 10px ${color}70)`,
        }}
      />
      <p style={{ color: "#c8c4e0", fontSize: "13px", fontWeight: 600, textAlign: "center", userSelect: "none" }}>
        {name}
      </p>
    </div>
  );
};

export default SkillBall;