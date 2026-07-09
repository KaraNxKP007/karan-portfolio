import { useEffect, useRef } from "react";
import * as THREE from "three";

const MoonCanvas = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const w = mount.clientWidth || 400;
    const h = mount.clientHeight || 260;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(38, w / h, 0.01, 1000);
    camera.position.set(0, 0, 4.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Sparse stars
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(350 * 3);
    for (let i = 0; i < 350 * 3; i++) starPos[i] = (Math.random() - 0.5) * 150;
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.35, transparent: true, opacity: 0.35 })));

    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");

    loader.load(
      "/textures/moon_1024.jpg",
      (moonTex: THREE.Texture) => {
        // FIXED: Replaced deprecated sRGBEncoding with modern colorSpace
        moonTex.colorSpace = THREE.SRGBColorSpace;
        moonTex.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);

        const moon = new THREE.Mesh(
          new THREE.SphereGeometry(1.1, 64, 64),
          new THREE.MeshPhongMaterial({
            map: moonTex,
            bumpMap: moonTex,
            bumpScale: 0.04,
            specular: new THREE.Color(0.04, 0.04, 0.06),
            shininess: 5,
          })
        );
        scene.add(moon);

        // Faint atmosphere glow
        scene.add(new THREE.Mesh(
          new THREE.SphereGeometry(1.13, 32, 32),
          new THREE.MeshBasicMaterial({ color: 0x9966ff, transparent: true, opacity: 0.025, side: THREE.BackSide })
        ));

        // Lighting
        const sunLight = new THREE.DirectionalLight(0xfff5dd, 2.2);
        sunLight.position.set(5, 2, 4);
        scene.add(sunLight);
        scene.add(new THREE.AmbientLight(0x112244, 1.5));
        const rimLight = new THREE.DirectionalLight(0x334466, 0.5);
        rimLight.position.set(-4, -1, -3);
        scene.add(rimLight);

        // Auto-rotate only
        let rotY = 0;
        let frameId: number;
        let last = 0;
        const loop = (ts: number) => {
          frameId = requestAnimationFrame(loop);
          const dt = Math.min((ts - last) * 0.001, 0.05); last = ts;
          rotY += dt * 0.1;
          moon.rotation.y = rotY;
          renderer.render(scene, camera);
        };
        requestAnimationFrame(loop);

        (mount as any)._destroy = () => {
          cancelAnimationFrame(frameId);
          renderer.dispose();
          if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
        };
      }
    );

    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      if ((mount as any)._destroy) (mount as any)._destroy();
      else {
        if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
        renderer.dispose();
      }
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100%" }} />;
};

export default MoonCanvas;