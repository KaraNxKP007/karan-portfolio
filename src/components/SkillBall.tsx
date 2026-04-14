import { useEffect, useRef } from "react";
import * as THREE from "three";

interface SkillBallProps {
  name: string;
  color: string;
  iconUrl: string;
}

const SkillBall = ({ name, color, iconUrl }: SkillBallProps) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const SIZE = 128;
    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.z = 3.8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(SIZE, SIZE);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Parse hex color to THREE.Color
    const threeColor = new THREE.Color(color);
    const darkColor = threeColor.clone().multiplyScalar(0.25);
    const midColor = threeColor.clone().multiplyScalar(0.55);

    // Build icosahedron with per-face colors
    // We use IcosahedronGeometry with detail=1 for more faces (80 triangles)
    const geo = new THREE.IcosahedronGeometry(1.25, 1);

    // Convert to non-indexed so we can color each face independently
    const posAttr = geo.attributes.position;
    const faceCount = posAttr.count / 3;

    // Color array — each vertex of each triangle gets a color
    const colors = new Float32Array(posAttr.count * 3);

    // Find the front-most face (the one whose centroid is closest to camera = most positive Z)
    let frontFaceIndex = -1;
    let maxZ = -Infinity;

    for (let i = 0; i < faceCount; i++) {
      const i3 = i * 3;
      const ax = posAttr.getX(i3), ay = posAttr.getY(i3), az = posAttr.getZ(i3);
      const bx = posAttr.getX(i3 + 1), by = posAttr.getY(i3 + 1), bz = posAttr.getZ(i3 + 1);
      const cx = posAttr.getX(i3 + 2), cy = posAttr.getY(i3 + 2), cz = posAttr.getZ(i3 + 2);
      const centroidZ = (az + bz + cz) / 3;
      if (centroidZ > maxZ) { maxZ = centroidZ; frontFaceIndex = i; }
    }

    // Assign colors to each face
    for (let i = 0; i < faceCount; i++) {
      const i3 = i * 3;
      // Alternate between dark and mid tones for visual interest
      const isFront = i === frontFaceIndex;
      const faceCol = isFront ? threeColor : (i % 3 === 0 ? darkColor : midColor);
      for (let v = 0; v < 3; v++) {
        colors[(i3 + v) * 3] = faceCol.r;
        colors[(i3 + v) * 3 + 1] = faceCol.g;
        colors[(i3 + v) * 3 + 2] = faceCol.b;
      }
    }
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Material using vertex colors — flat shaded for that faceted polygon look
    const mat = new THREE.MeshStandardMaterial({
      vertexColors: true,
      flatShading: true,
      metalness: 0.1,
      roughness: 0.7,
    });

    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(3, 4, 3);
    scene.add(keyLight);
    const colorLight = new THREE.PointLight(threeColor, 2.0, 10);
    colorLight.position.set(-2, 1, 2);
    scene.add(colorLight);
    const rimLight = new THREE.DirectionalLight(0xaaaacc, 0.5);
    rimLight.position.set(-3, -2, -2);
    scene.add(rimLight);

    // Load icon and place it as a sprite on the front face
    const iconSprite = (() => {
      const spriteMat = new THREE.SpriteMaterial({ transparent: true, opacity: 0 });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.scale.set(0.55, 0.55, 1);
      sprite.position.set(0, 0, 1.26); // just in front of icosahedron surface
      scene.add(sprite);
      return { sprite, mat: spriteMat };
    })();

    // Load icon image onto a canvas, then use as sprite texture
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = c.height = 128;
      const ctx = c.getContext("2d")!;
      // Draw icon centered, with slight padding
      const pad = 16;
      ctx.drawImage(img, pad, pad, 128 - pad * 2, 128 - pad * 2);
      const tex = new THREE.CanvasTexture(c);
      iconSprite.mat.map = tex;
      iconSprite.mat.opacity = 1;
      iconSprite.mat.needsUpdate = true;
    };
    img.onerror = () => {
      // Fallback: white text
      const c = document.createElement("canvas");
      c.width = c.height = 128;
      const ctx = c.getContext("2d")!;
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 60px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(name.slice(0, 2), 64, 64);
      const tex = new THREE.CanvasTexture(c);
      iconSprite.mat.map = tex;
      iconSprite.mat.opacity = 1;
      iconSprite.mat.needsUpdate = true;
    };
    img.src = iconUrl;

    // Interaction
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
    mount.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);

    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      if (autoSpin) { rotY += 0.009; rotX += 0.003; }
      mesh.rotation.y = rotY;
      mesh.rotation.x = rotX;
      // Keep sprite always facing camera (sprite does this auto), just sync position
      // so it stays on the front face as the mesh rotates
      // We update sprite position to follow front face centroid in world space
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      mount.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      geo.dispose();
      mat.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [color, iconUrl, name]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", cursor: "grab" }}>
      <div
        ref={mountRef}
        style={{
          width: "128px",
          height: "128px",
          filter: `drop-shadow(0 0 12px ${color}80)`,
        }}
      />
      <p style={{ color: "#c8c4e0", fontSize: "13px", fontWeight: 600, textAlign: "center", userSelect: "none" }}>
        {name}
      </p>
    </div>
  );
};

export default SkillBall;