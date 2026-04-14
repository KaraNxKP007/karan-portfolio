import { useEffect, useRef } from "react";

declare global {
  interface Window { THREE: any; }
}

const EarthCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (cleanupRef.current) { cleanupRef.current(); cleanupRef.current = null; }
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const initScene = () => {
      const THREE = window.THREE;
      if (!THREE) return;

      const W = () => container.clientWidth;
      const H = () => container.clientHeight;

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, logarithmicDepthBuffer: true });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      renderer.setSize(W(), H(), false);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;
      renderer.outputEncoding = THREE.sRGBEncoding;
      renderer.setClearColor(0x000000, 0);

      const scene = new THREE.Scene();
      scene.background = null;

      // Camera: always positioned so the full moon orbit (radius 2.0) is visible
      // We compute Z dynamically on resize based on container size
      const ORBIT_RADIUS = 2.0;
      const FOV = 42;

      const getIdealZ = () => {
        const aspect = W() / H();
        // Half-height in world units needed = ORBIT_RADIUS + moon radius (0.24) + margin (0.3)
        const needed = ORBIT_RADIUS + 0.24 + 0.3;
        const fovRad = (FOV * Math.PI) / 180;
        // For portrait (aspect < 1) use height; for landscape use width
        if (aspect >= 1) {
          // landscape — width is limiting? No, height is usually smaller
          return needed / Math.tan(fovRad / 2);
        } else {
          // portrait — width is limiting, convert needed to height equivalent
          return (needed / aspect) / Math.tan(fovRad / 2);
        }
      };

      const camera = new THREE.PerspectiveCamera(FOV, W() / H(), 0.01, 1000);
      camera.position.set(0, 0, getIdealZ());

      const handleResize = () => {
        const w = W(), h = H();
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.position.z = getIdealZ();
        camera.updateProjectionMatrix();
      };
      window.addEventListener("resize", handleResize);

      const tl = new THREE.TextureLoader();
      tl.crossOrigin = "anonymous";
      const loadTex = (url: string, encoding?: any): Promise<any> =>
        new Promise((res) => {
          tl.load(url, (t: any) => {
            if (encoding) t.encoding = encoding;
            t.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);
            res(t);
          }, undefined, () => {
            const c = document.createElement("canvas"); c.width = c.height = 4;
            const ctx = c.getContext("2d")!; ctx.fillStyle = "#224"; ctx.fillRect(0, 0, 4, 4);
            res(new THREE.CanvasTexture(c));
          });
        });

      const BASE = "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r128/examples/textures/planets/";

      Promise.all([
        loadTex(BASE + "earth_atmos_2048.jpg", THREE.sRGBEncoding),
        loadTex(BASE + "earth_specular_2048.jpg"),
        loadTex(BASE + "earth_normal_2048.jpg"),
        loadTex(BASE + "earth_lights_2048.png", THREE.sRGBEncoding),
        loadTex(BASE + "earth_clouds_1024.png", THREE.sRGBEncoding),
        loadTex(BASE + "moon_1024.jpg", THREE.sRGBEncoding),
      ]).then(([earthDay, earthSpec, earthNorm, _earthNight, earthCloud, moonTex]) => {

        // Stars
        const starGeo = new THREE.BufferGeometry();
        const starPos = new Float32Array(700 * 3);
        for (let i = 0; i < 700 * 3; i++) starPos[i] = (Math.random() - 0.5) * 400;
        starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
        scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.5, transparent: true, opacity: 0.4 })));

        // Earth
        const earth = new THREE.Mesh(
          new THREE.SphereGeometry(1, 96, 96),
          new THREE.MeshPhongMaterial({
            map: earthDay, specularMap: earthSpec,
            specular: new THREE.Color(0.4, 0.5, 0.7), shininess: 60,
            normalMap: earthNorm, normalScale: new THREE.Vector2(4, 4),
          })
        );
        earth.rotation.z = THREE.MathUtils.degToRad(23.4);
        earth.castShadow = true; earth.receiveShadow = true;
        scene.add(earth);

        // Clouds
        const clouds = new THREE.Mesh(
          new THREE.SphereGeometry(1.005, 96, 96),
          new THREE.MeshPhongMaterial({
            map: earthCloud, alphaMap: earthCloud,
            transparent: true, opacity: 0.82, depthWrite: false,
            blending: THREE.NormalBlending,
            specular: new THREE.Color(0.1, 0.1, 0.1), shininess: 10,
          })
        );
        clouds.rotation.z = THREE.MathUtils.degToRad(23.4);
        scene.add(clouds);

        // Atmosphere
        const atmoShader = new THREE.ShaderMaterial({
          uniforms: {
            sunDir: { value: new THREE.Vector3(5, 2, 5).normalize() },
            atmoColor: { value: new THREE.Vector3(0.25, 0.55, 1.0) },
          },
          vertexShader: `
            varying vec3 vNormal; varying vec3 vPosition;
            void main(){
              vNormal = normalize(normalMatrix * normal);
              vPosition = (modelViewMatrix * vec4(position,1.0)).xyz;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
            }`,
          fragmentShader: `
            uniform vec3 sunDir; uniform vec3 atmoColor;
            varying vec3 vNormal; varying vec3 vPosition;
            void main(){
              vec3 viewDir = normalize(-vPosition);
              float rim = 1.0 - max(dot(viewDir, vNormal), 0.0);
              rim = pow(rim, 3.2);
              float sun = max(dot(normalize(vNormal), sunDir), 0.0);
              float glow = rim * (0.3 + sun * 0.7);
              gl_FragColor = vec4(atmoColor * glow, glow * 0.7);
            }`,
          transparent: true, side: THREE.FrontSide,
          depthWrite: false, blending: THREE.AdditiveBlending,
        });
        scene.add(new THREE.Mesh(new THREE.SphereGeometry(1.04, 64, 64), atmoShader));

        // Moon
        const moonPivot = new THREE.Object3D();
        moonPivot.rotation.x = THREE.MathUtils.degToRad(8);
        scene.add(moonPivot);
        const moonMesh = new THREE.Mesh(
          new THREE.SphereGeometry(0.24, 64, 64),
          new THREE.MeshPhongMaterial({
            map: moonTex, specular: new THREE.Color(0.05, 0.05, 0.05),
            shininess: 3, bumpMap: moonTex, bumpScale: 0.02,
          })
        );
        moonMesh.position.set(ORBIT_RADIUS, 0, 0);
        moonPivot.add(moonMesh);

        // Lights
        const sunLight = new THREE.DirectionalLight(0xfff8e7, 2.2);
        sunLight.position.set(5, 2, 5); sunLight.castShadow = true;
        scene.add(sunLight);
        scene.add(new THREE.AmbientLight(0x112244, 1.2));

        // Drag to rotate
        let rotY = 0, rotX = 0, isDrag = false, px = 0, py = 0, moonT = 0;
        const onMouseDown = (e: MouseEvent) => { isDrag = true; px = e.clientX; py = e.clientY; };
        const onMouseUp = () => { isDrag = false; };
        const onMouseMove = (e: MouseEvent) => {
          if (!isDrag) return;
          rotY += (e.clientX - px) * 0.004; rotX += (e.clientY - py) * 0.004;
          rotX = Math.max(-1.2, Math.min(1.2, rotX));
          px = e.clientX; py = e.clientY;
        };
        // Touch support
        const onTouchStart = (e: TouchEvent) => { isDrag = true; px = e.touches[0].clientX; py = e.touches[0].clientY; };
        const onTouchEnd = () => { isDrag = false; };
        const onTouchMove = (e: TouchEvent) => {
          if (!isDrag) return;
          rotY += (e.touches[0].clientX - px) * 0.004; rotX += (e.touches[0].clientY - py) * 0.004;
          rotX = Math.max(-1.2, Math.min(1.2, rotX));
          px = e.touches[0].clientX; py = e.touches[0].clientY;
        };

        canvas.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mouseup", onMouseUp);
        window.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("touchstart", onTouchStart, { passive: true });
        canvas.addEventListener("touchend", onTouchEnd);
        canvas.addEventListener("touchmove", onTouchMove, { passive: true });

        let last = 0, frameId: number;
        const loop = (ts: number) => {
          frameId = requestAnimationFrame(loop);
          const dt = Math.min((ts - last) * 0.001, 0.05); last = ts;
          rotY += dt * 0.08; moonT += dt * 0.18;
          earth.rotation.y = rotY; earth.rotation.x = rotX;
          clouds.rotation.y = rotY + 0.002; clouds.rotation.x = rotX;
          moonPivot.rotation.y = moonT;
          moonMesh.rotation.y = -moonT * 0.95;
          renderer.render(scene, camera);
        };
        requestAnimationFrame(loop);

        cleanupRef.current = () => {
          cancelAnimationFrame(frameId);
          canvas.removeEventListener("mousedown", onMouseDown);
          window.removeEventListener("mouseup", onMouseUp);
          window.removeEventListener("mousemove", onMouseMove);
          canvas.removeEventListener("touchstart", onTouchStart);
          canvas.removeEventListener("touchend", onTouchEnd);
          canvas.removeEventListener("touchmove", onTouchMove);
          window.removeEventListener("resize", handleResize);
          renderer.dispose();
        };
      });
    };

    if (window.THREE) { initScene(); }
    else {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
      script.onload = initScene;
      document.head.appendChild(script);
    }

    return () => { if (cleanupRef.current) { cleanupRef.current(); cleanupRef.current = null; } };
  }, []);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%", position: "relative" }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
    </div>
  );
};

export default EarthCanvas;