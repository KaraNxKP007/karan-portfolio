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

      const ORBIT_RADIUS = 2.0;
      const MOON_RADIUS = 0.24;
      const FOV = 42;

      const getIdealZ = () => {
        const aspect = W() / H();
        const needed = ORBIT_RADIUS + MOON_RADIUS + 0.3;
        const fovRad = (FOV * Math.PI) / 180;
        if (aspect >= 1) {
          return needed / Math.tan(fovRad / 2);
        } else {
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

      const BASE = "/textures/";

      const makeGlowTexture = () => {
        const size = 256;
        const c = document.createElement("canvas");
        c.width = c.height = size;
        const ctx = c.getContext("2d")!;
        const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
        grad.addColorStop(0, "rgba(230,228,255,0.9)");
        grad.addColorStop(0.35, "rgba(200,196,255,0.35)");
        grad.addColorStop(1, "rgba(145,94,255,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
        ctx.fill();
        return new THREE.CanvasTexture(c);
      };

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

        // ================= Aurora (polar streamers) =================
        // Two rings of glowing curtains that stream outward from the poles into
        // open space (not just hugging the surface). Built from a flat grid whose
        // vertices get remapped onto a wavy cone shape entirely on the GPU, so the
        // whole thing animates for free with a single uTime uniform. Parented to
        // `earth` so it inherits its axial tilt and spin automatically.
        const auroraVertexShader = `
          uniform float uTime;
          uniform float uTheta;   // colatitude (0 = north pole, PI = south pole) of the ring's root
          uniform float uSign;    // +1 for north (streams toward +y), -1 for south
          uniform float uBaseR;   // inner radius, hugging the surface
          uniform float uTipR;    // outer radius, how far the streamers reach into space
          varying float vV;
          varying float vPhi;

          void main() {
            float phi = uv.x * 6.28318530718;   // wraps 0..2PI around the pole
            float v = uv.y;                      // 0 = root (on the surface), 1 = tip
            vV = v;
            vPhi = uv.x;

            // Per-strand waving: low frequency sway for big lazy curtain motion,
            // higher frequency ripple layered on top for shimmer. Amplitude grows
            // with v so the root stays anchored to the surface.
            float sway = sin(phi * 5.0 + uTime * 0.7) * 0.12
                       + sin(phi * 11.0 - uTime * 1.4) * 0.05;
            float thetaWave = sway * v;

            float flutter = sin(phi * 9.0 + uTime * 1.1 + v * 4.0) * 0.10 * v;
            float phiWave = flutter;

            float theta = uTheta - uSign * thetaWave;
            float effPhi = phi + phiWave;

            // Radius grows from the surface out to the tip, with its own gentle
            // undulation so the streamer tips don't all end at the same height.
            float reach = sin(phi * 4.0 - uTime * 0.9) * 0.5 + 0.5;
            float radius = uBaseR + v * (uTipR - uBaseR) * (0.7 + 0.3 * reach);

            vec3 dir = vec3(sin(theta) * cos(effPhi), cos(theta), sin(theta) * sin(effPhi));
            vec3 pos = dir * radius;

            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `;

        const auroraFragmentShader = `
          uniform float uTime;
          uniform vec3 uColorA;
          uniform vec3 uColorB;
          varying float vV;
          varying float vPhi;

          float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }

          float noise(vec2 p) {
            vec2 i = floor(p);
            vec2 f = fract(p);
            f = f * f * (3.0 - 2.0 * f);
            float a = hash(i);
            float b = hash(i + vec2(1.0, 0.0));
            float c = hash(i + vec2(0.0, 1.0));
            float d = hash(i + vec2(1.0, 1.0));
            return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
          }

          void main() {
            // Soft fade at the root (blend into the surface) and at the tip (trail off)
            float rootFade = smoothstep(0.0, 0.12, vV);
            float tipFade = smoothstep(1.0, 0.45, vV);
            float envelope = rootFade * tipFade;

            // Vertical streak pattern — some strands brighter than others, drifting
            float flow = uTime * 0.18;
            float n1 = noise(vec2(vPhi * 40.0 + flow, vV * 3.0));
            float n2 = noise(vec2(vPhi * 85.0 - flow * 1.7, vV * 6.0 + 8.0));
            float streaks = pow(n1 * 0.6 + n2 * 0.4, 1.8);

            float intensity = envelope * streaks;
            vec3 color = mix(uColorA, uColorB, n2 * vV);

            gl_FragColor = vec4(color * intensity * 2.2, intensity * 0.95);
          }
        `;

        const makeAuroraStreamers = (theta: number, sign: number) => {
          // widthSegments wraps the ring smoothly; heightSegments gives the
          // waving displacement room to bend without looking faceted.
          const geo = new THREE.PlaneGeometry(1, 1, 160, 40);
          const mat = new THREE.ShaderMaterial({
            uniforms: {
              uTime: { value: Math.random() * 100 },
              uTheta: { value: theta },
              uSign: { value: sign },
              uBaseR: { value: 1.02 },
              uTipR: { value: 1.2 },
              uColorA: { value: new THREE.Color(0x22ffb0) }, // aurora green
              uColorB: { value: new THREE.Color(0x7cf2c8) }, // pale teal tips
            },
            vertexShader: auroraVertexShader,
            fragmentShader: auroraFragmentShader,
            transparent: true,
            depthWrite: false,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending,
          });
          return new THREE.Mesh(geo, mat);
        };

        // theta is measured from the north pole (0) to south pole (PI).
        const AURORA_THETA_NORTH = 0.30;
        const AURORA_THETA_SOUTH = Math.PI - 0.30;

        const auroraNorth = makeAuroraStreamers(AURORA_THETA_NORTH, 1);
        const auroraSouth = makeAuroraStreamers(AURORA_THETA_SOUTH, -1);
        earth.add(auroraNorth);
        earth.add(auroraSouth);
        // ================= end aurora =================

        // Lights
        const sunLight = new THREE.DirectionalLight(0xfff8e7, 2.2);
        sunLight.position.set(5, 2, 5); sunLight.castShadow = true;
        scene.add(sunLight);
        scene.add(new THREE.AmbientLight(0x112244, 1.2));

        // Moon
        const moonPivot = new THREE.Object3D();
        moonPivot.rotation.x = THREE.MathUtils.degToRad(8);
        scene.add(moonPivot);
        const moonMesh = new THREE.Mesh(
          new THREE.SphereGeometry(MOON_RADIUS, 64, 64),
          new THREE.MeshPhongMaterial({
            map: moonTex, specular: new THREE.Color(0.05, 0.05, 0.05),
            shininess: 3, bumpMap: moonTex, bumpScale: 0.02,
          })
        );
        moonMesh.position.set(ORBIT_RADIUS, 0, 0);
        moonPivot.add(moonMesh);

        // Glow sprite for the orbiting moon — matches the ghost's glow while dragged
        const glowTex = makeGlowTexture();
        const moonGlow = new THREE.Sprite(
          new THREE.SpriteMaterial({ map: glowTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending })
        );
        moonGlow.scale.set(MOON_RADIUS * 3.2, MOON_RADIUS * 3.2, 1);
        moonGlow.position.copy(moonMesh.position);
        moonPivot.add(moonGlow);

        // ================= Moon capture / carry-away feature (3D ghost) =================
        const raycaster = new THREE.Raycaster();
        const ndc = new THREE.Vector2();
        const tempV = new THREE.Vector3();
        const camRightVec = new THREE.Vector3();

        const moonDrag = {
          mode: "orbit" as "orbit" | "dragging" | "returning",
          ghostX: 0,
          ghostY: 0,
        };

        const getContainerRect = () => container.getBoundingClientRect();

        const projectMoonToScreen = () => {
          moonMesh.getWorldPosition(tempV);
          const p = tempV.clone().project(camera);
          const rect = getContainerRect();
          return {
            x: rect.left + (p.x * 0.5 + 0.5) * W(),
            y: rect.top + (-p.y * 0.5 + 0.5) * H(),
          };
        };

        const computeGhostSizePx = () => {
          moonMesh.getWorldPosition(tempV);
          camRightVec.set(1, 0, 0).applyQuaternion(camera.quaternion);
          const edge = tempV.clone().add(camRightVec.multiplyScalar(MOON_RADIUS));
          const c = tempV.clone().project(camera);
          const e = edge.project(camera);
          const rect = getContainerRect();
          const cx = rect.left + (c.x * 0.5 + 0.5) * W();
          const ex = rect.left + (e.x * 0.5 + 0.5) * W();
          const radiusPx = Math.max(16, Math.abs(ex - cx));
          return Math.round(radiusPx * 2.4);
        };

        // Mini standalone renderer that draws a real lit, rotating 3D moon,
        // mounted as a small fixed-position canvas that follows the cursor.
        let ghostCanvas: HTMLCanvasElement | null = null;
        let ghostRenderer: any = null;
        let ghostScene: any = null;
        let ghostCamera: any = null;
        let ghostMoonMesh: any = null;

        const setupGhostRenderer = (sizePx: number) => {
          ghostCanvas = document.createElement("canvas");
          ghostCanvas.style.position = "fixed";
          ghostCanvas.style.width = `${sizePx}px`;
          ghostCanvas.style.height = `${sizePx}px`;
          ghostCanvas.style.borderRadius = "50%";
          ghostCanvas.style.pointerEvents = "none";
          ghostCanvas.style.zIndex = "99999";
          ghostCanvas.style.filter = "drop-shadow(0 0 18px rgba(210,210,230,0.5)) drop-shadow(0 0 44px rgba(145,94,255,0.28))";
          document.body.appendChild(ghostCanvas);

          ghostRenderer = new THREE.WebGLRenderer({ canvas: ghostCanvas, antialias: true, alpha: true });
          ghostRenderer.setPixelRatio(Math.min(devicePixelRatio, 2));
          ghostRenderer.setSize(sizePx, sizePx, false);
          ghostRenderer.setClearColor(0x000000, 0);

          ghostScene = new THREE.Scene();
          ghostCamera = new THREE.PerspectiveCamera(40, 1, 0.01, 10);
          const dist = 1 / Math.tan((40 * Math.PI / 180) / 2) * 1.18;
          ghostCamera.position.set(0, 0, dist);

          ghostMoonMesh = new THREE.Mesh(
            new THREE.SphereGeometry(1, 48, 48),
            new THREE.MeshPhongMaterial({
              map: moonTex, specular: new THREE.Color(0.05, 0.05, 0.05),
              shininess: 3, bumpMap: moonTex, bumpScale: 0.02,
            })
          );
          ghostMoonMesh.rotation.y = moonSpin;
          ghostScene.add(ghostMoonMesh);

          const gSun = new THREE.DirectionalLight(0xfff8e7, 2.0);
          gSun.position.set(1.5, 0.6, 1.5);
          ghostScene.add(gSun);
          ghostScene.add(new THREE.AmbientLight(0x223355, 1.1));
        };

        const teardownGhostRenderer = () => {
          if (ghostRenderer) ghostRenderer.dispose();
          if (ghostMoonMesh) { ghostMoonMesh.geometry.dispose(); ghostMoonMesh.material.dispose(); }
          if (ghostCanvas) ghostCanvas.remove();
          ghostCanvas = null; ghostRenderer = null; ghostScene = null; ghostCamera = null; ghostMoonMesh = null;
        };

        const positionGhost = (x: number, y: number) => {
          if (!ghostCanvas) return;
          const size = ghostCanvas.width / Math.min(devicePixelRatio, 2);
          ghostCanvas.style.left = `${x - size / 2}px`;
          ghostCanvas.style.top = `${y - size / 2}px`;
        };

        // ---- Welcome-back confetti + message ----
        const CONFETTI_COLORS = ["#915EFF", "#00cea8", "#4dabcf", "#f59e0b", "#f472b6", "#60a5fa", "#a78bfa"];

        const playWelcomeBackEffect = () => {
          const layer = document.createElement("div");
          layer.style.position = "fixed";
          layer.style.inset = "0";
          layer.style.pointerEvents = "none";
          layer.style.zIndex = "99998";
          layer.style.overflow = "hidden";
          document.body.appendChild(layer);

          const originScreen = projectMoonToScreen();

          const pieceCount = 46;
          for (let i = 0; i < pieceCount; i++) {
            const piece = document.createElement("div");
            const color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
            const size = 6 + Math.random() * 6;
            const isCircle = Math.random() > 0.5;
            piece.style.position = "absolute";
            piece.style.left = `${originScreen.x}px`;
            piece.style.top = `${originScreen.y}px`;
            piece.style.width = `${size}px`;
            piece.style.height = `${size * (isCircle ? 1 : 0.4)}px`;
            piece.style.background = color;
            piece.style.borderRadius = isCircle ? "50%" : "2px";
            piece.style.opacity = "1";
            piece.style.willChange = "transform, opacity";

            const angle = Math.random() * Math.PI * 2;
            const dist = 80 + Math.random() * 160;
            const dx = Math.cos(angle) * dist;
            const dyUp = Math.sin(angle) * dist * 0.6 - 40;
            const fallExtra = 140 + Math.random() * 160;
            const rot = (Math.random() - 0.5) * 720;
            const dur = 1400 + Math.random() * 900;
            const delay = Math.random() * 150;

            piece.animate(
              [
                { transform: "translate(-50%, -50%) translate(0px, 0px) rotate(0deg)", opacity: 1 },
                { transform: `translate(-50%, -50%) translate(${dx}px, ${dyUp}px) rotate(${rot * 0.5}deg)`, opacity: 1, offset: 0.35 },
                { transform: `translate(-50%, -50%) translate(${dx * 1.15}px, ${dyUp + fallExtra}px) rotate(${rot}deg)`, opacity: 0 },
              ],
              { duration: dur, delay, easing: "cubic-bezier(0.2, 0.7, 0.4, 1)", fill: "forwards" }
            );

            layer.appendChild(piece);
          }

          const badge = document.createElement("div");
          badge.style.position = "fixed";
          badge.style.left = `${originScreen.x}px`;
          badge.style.top = `${originScreen.y - 46}px`;
          badge.style.transform = "translate(-50%, -100%)";
          badge.style.display = "flex";
          badge.style.alignItems = "center";
          badge.style.gap = "8px";
          badge.style.padding = "8px 16px";
          badge.style.borderRadius = "9999px";
          badge.style.background = "rgba(5,8,22,0.85)";
          badge.style.backdropFilter = "blur(6px)";
          badge.style.border = "1px solid rgba(145,94,255,0.5)";
          badge.style.color = "#ffffff";
          badge.style.fontSize = "13px";
          badge.style.fontWeight = "700";
          badge.style.whiteSpace = "nowrap";
          badge.style.boxShadow = "0 0 24px rgba(145,94,255,0.35)";
          badge.style.zIndex = "99999";
          badge.innerHTML = `🌛🌚happy happy happy🌚🌛`;
          document.body.appendChild(badge);

          badge.animate(
            [
              { opacity: 0, transform: "translate(-50%, -85%) scale(0.85)" },
              { opacity: 1, transform: "translate(-50%, -100%) scale(1)", offset: 0.15 },
              { opacity: 1, transform: "translate(-50%, -100%) scale(1)", offset: 0.75 },
              { opacity: 0, transform: "translate(-50%, -115%) scale(0.95)" },
            ],
            { duration: 3000, easing: "ease-out", fill: "forwards" }
          );

          setTimeout(() => {
            layer.remove();
            badge.remove();
          }, 3000);
        };

        const onDocMouseMove = (e: MouseEvent) => {
          if (moonDrag.mode !== "dragging") return;
          moonDrag.ghostX = e.clientX;
          moonDrag.ghostY = e.clientY;
          positionGhost(moonDrag.ghostX, moonDrag.ghostY);
        };
        const onDocTouchMove = (e: TouchEvent) => {
          if (moonDrag.mode !== "dragging") return;
          const t = e.touches[0];
          moonDrag.ghostX = t.clientX;
          moonDrag.ghostY = t.clientY;
          positionGhost(moonDrag.ghostX, moonDrag.ghostY);
        };
        const releaseMoon = () => {
          if (moonDrag.mode !== "dragging") return;
          moonDrag.mode = "returning";
        };
        const onDocMouseUp = () => releaseMoon();
        const onDocTouchEnd = () => releaseMoon();

        const tryGrabMoon = (clientX: number, clientY: number) => {
          if (moonDrag.mode !== "orbit" || !moonMesh.visible) return false;
          const rect = getContainerRect();
          ndc.x = ((clientX - rect.left) / W()) * 2 - 1;
          ndc.y = -((clientY - rect.top) / H()) * 2 + 1;
          raycaster.setFromCamera(ndc, camera);
          const hit = raycaster.intersectObject(moonMesh)[0];
          if (!hit) return false;

          moonDrag.mode = "dragging";
          moonMesh.visible = false;
          moonGlow.visible = false;

          const sizePx = computeGhostSizePx();
          setupGhostRenderer(sizePx);
          moonDrag.ghostX = clientX;
          moonDrag.ghostY = clientY;
          positionGhost(clientX, clientY);

          document.addEventListener("mousemove", onDocMouseMove);
          document.addEventListener("mouseup", onDocMouseUp);
          document.addEventListener("touchmove", onDocTouchMove, { passive: true });
          document.addEventListener("touchend", onDocTouchEnd);
          return true;
        };
        // ================= end moon capture setup =================

        // Drag to rotate (Earth) — defers to moon-grab first
        let rotY = 0, rotX = 0, isDrag = false, px = 0, py = 0, moonT = 0, moonSpin = 0;
        const MOON_SPIN_RATE = 0.5; // rad/sec — matches the ghost's spin rate exactly

        const onMouseDown = (e: MouseEvent) => {
          if (tryGrabMoon(e.clientX, e.clientY)) return;
          isDrag = true; px = e.clientX; py = e.clientY;
        };
        const onMouseUp = () => { isDrag = false; };
        const onMouseMove = (e: MouseEvent) => {
          if (!isDrag) return;
          rotY += (e.clientX - px) * 0.004; rotX += (e.clientY - py) * 0.004;
          rotX = Math.max(-1.2, Math.min(1.2, rotX));
          px = e.clientX; py = e.clientY;
        };
        const onTouchStart = (e: TouchEvent) => {
          const t = e.touches[0];
          if (tryGrabMoon(t.clientX, t.clientY)) return;
          isDrag = true; px = t.clientX; py = t.clientY;
        };
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

          rotY += dt * 0.08;
          earth.rotation.y = rotY; earth.rotation.x = rotX;
          clouds.rotation.y = rotY + 0.002; clouds.rotation.x = rotX;

          auroraNorth.material.uniforms.uTime.value += dt;
          auroraSouth.material.uniforms.uTime.value += dt;

          // Spin accumulates continuously (even while dragged/returning) so it
          // never desyncs from the ghost's own spin rate.
          moonSpin += dt * MOON_SPIN_RATE;

          if (moonDrag.mode === "orbit") {
            moonT += dt * 0.18;
          }
          moonPivot.rotation.y = moonT;
          // moonMesh is a child of moonPivot, so its LOCAL rotation has to cancel
          // out the pivot's orbital rotation to land on the target WORLD spin angle:
          // worldRotation = pivotRotation(moonT) + localRotation(moonSpin - moonT) = moonSpin
          moonMesh.rotation.y = moonSpin - moonT;

          if (moonDrag.mode === "dragging" && ghostMoonMesh) {
            ghostMoonMesh.rotation.y += dt * 0.5;
            ghostRenderer.render(ghostScene, ghostCamera);
          }

          if (moonDrag.mode === "returning" && ghostCanvas) {
            const target = projectMoonToScreen();
            const lerpF = Math.min(1, dt * 7);
            moonDrag.ghostX += (target.x - moonDrag.ghostX) * lerpF;
            moonDrag.ghostY += (target.y - moonDrag.ghostY) * lerpF;
            positionGhost(moonDrag.ghostX, moonDrag.ghostY);
            ghostMoonMesh.rotation.y += dt * 0.5;
            ghostRenderer.render(ghostScene, ghostCamera);

            const dx = target.x - moonDrag.ghostX;
            const dy = target.y - moonDrag.ghostY;
            if (Math.sqrt(dx * dx + dy * dy) < 2) {
              teardownGhostRenderer();
              moonMesh.visible = true;
              moonGlow.visible = true;
              moonDrag.mode = "orbit";
              playWelcomeBackEffect();
            }
          }

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
          document.removeEventListener("mousemove", onDocMouseMove);
          document.removeEventListener("mouseup", onDocMouseUp);
          document.removeEventListener("touchmove", onDocTouchMove);
          document.removeEventListener("touchend", onDocTouchEnd);
          teardownGhostRenderer();
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