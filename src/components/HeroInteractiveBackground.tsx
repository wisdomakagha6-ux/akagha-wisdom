"use client";
import React, { useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";

interface GridNode {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rx: number;
  ry: number;
  rz: number;
  rvx: number;
  rvy: number;
  rvz: number;
}

// 8 Vertices of a 3D unit cube
const CUBE_VERTICES = [
  [-1, -1, -1], // 0
  [ 1, -1, -1], // 1
  [ 1,  1, -1], // 2
  [-1,  1, -1], // 3
  [-1, -1,  1], // 4
  [ 1, -1,  1], // 5
  [ 1,  1,  1], // 6
  [-1,  1,  1]  // 7
];

// 6 Faces of the cube defined by vertex indices
const CUBE_FACES = [
  { indices: [0, 1, 2, 3], shade: 0.82 }, // Front
  { indices: [1, 5, 6, 2], shade: 0.95 }, // Right
  { indices: [5, 4, 7, 6], shade: 0.76 }, // Back
  { indices: [4, 0, 3, 7], shade: 0.68 }, // Left
  { indices: [4, 5, 1, 0], shade: 1.00 }, // Top
  { indices: [3, 2, 6, 7], shade: 0.58 }  // Bottom
];

export default function HeroInteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let gridNodes: GridNode[][] = [];
    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;

    const gridSpacing = 42; // Denser spacing for micro-mesh details
    const activeRadius = 155; // Refined, tight spotlight radius
    const maxWarpPull = 11; // Refined, subtle breaking-away stretch distance
    const springStrength = 0.095; // Butter-smooth organic return vectors
    const damping = 0.81; // High damping for tight responsive movement

    const isDark = theme === "dark";

    // 3D rotation projection helper
    const rotate3D = (
      x: number,
      y: number,
      z: number,
      rx: number,
      ry: number,
      rz: number
    ) => {
      // Rotation around X
      const cosX = Math.cos(rx), sinX = Math.sin(rx);
      const y1 = y * cosX - z * sinX;
      const z1 = y * sinX + z * cosX;

      // Rotation around Y
      const cosY = Math.cos(ry), sinY = Math.sin(ry);
      const x2 = x * cosY + z1 * sinY;
      const z2 = -x * sinY + z1 * cosY;

      // Rotation around Z
      const cosZ = Math.cos(rz), sinZ = Math.sin(rz);
      const x3 = x2 * cosZ - y1 * sinZ;
      const y3 = x2 * sinZ + y1 * cosZ;

      return { x: x3, y: y3, z: z2 };
    };

    const initGrid = (w: number, h: number) => {
      cols = Math.ceil(w / gridSpacing) + 2;
      rows = Math.ceil(h / gridSpacing) + 2;

      gridNodes = [];

      for (let c = 0; c < cols; c++) {
        gridNodes[c] = [];
        for (let r = 0; r < rows; r++) {
          const baseX = (c - 0.5) * gridSpacing;
          const baseY = (r - 0.5) * gridSpacing;
          gridNodes[c][r] = {
            baseX,
            baseY,
            x: baseX,
            y: baseY,
            vx: 0,
            vy: 0,
            rx: Math.random() * Math.PI * 2,
            ry: Math.random() * Math.PI * 2,
            rz: Math.random() * Math.PI * 2,
            rvx: Math.random() * 0.012 - 0.006,
            rvy: Math.random() * 0.012 - 0.006,
            rvz: Math.random() * 0.012 - 0.006,
          };
        }
      }
    };

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      initGrid(width, height);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Main animation logic
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      const canvasRect = canvas.getBoundingClientRect();
      const mouseX = mouse.x - canvasRect.left;
      const mouseY = mouse.y - canvasRect.top;

      const isMouseInHero =
        mouse.active &&
        mouseX >= -50 &&
        mouseX <= width + 50 &&
        mouseY >= -50 &&
        mouseY <= height + 50;

      // 1. Physics update: Warping all grid points towards/away from cursor
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const node = gridNodes[c][r];
          
          let targetX = node.baseX;
          let targetY = node.baseY;

          const dx = node.baseX - mouseX;
          const dy = node.baseY - mouseY;
          const dist = Math.hypot(dx, dy);

          // Apply warp pull only inside spotlight radius
          if (isMouseInHero && dist < activeRadius) {
            const proximity = (activeRadius - dist) / activeRadius;
            const pull = Math.pow(proximity, 1.4) * maxWarpPull;
            // Elastic space stretch vector (pull towards gravity cursor)
            targetX = node.baseX - (dx / dist) * pull;
            targetY = node.baseY - (dy / dist) * pull;
          }

          // Spring simulation
          node.vx += (targetX - node.x) * springStrength;
          node.vy += (targetY - node.y) * springStrength;
          node.vx *= damping;
          node.vy *= damping;
          node.x += node.vx;
          node.y += node.vy;
        }
      }

      // If cursor isn't active or hovered inside, skip all drawing (total blank state)
      if (!isMouseInHero) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      // 2. Draw spotlight radial light background under cursor (dynamic color depending on theme)
      const radialGlow = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, activeRadius);
      radialGlow.addColorStop(0, isDark ? "rgba(235, 94, 40, 0.12)" : "rgba(235, 94, 40, 0.08)");
      radialGlow.addColorStop(0.5, isDark ? "rgba(235, 94, 40, 0.035)" : "rgba(235, 94, 40, 0.02)");
      radialGlow.addColorStop(1, "rgba(235, 94, 40, 0)");
      ctx.fillStyle = radialGlow;
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, activeRadius, 0, Math.PI * 2);
      ctx.fill();

      // 3. Render grid connection lines (only inside spotlight)
      ctx.lineWidth = 0.5;
      
      // Horizontal connections
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols - 1; c++) {
          const n1 = gridNodes[c][r];
          const n2 = gridNodes[c + 1][r];

          const midX = (n1.x + n2.x) / 2;
          const midY = (n1.y + n2.y) / 2;
          const midDist = Math.hypot(midX - mouseX, midY - mouseY);

          if (midDist < activeRadius) {
            const proximity = (activeRadius - midDist) / activeRadius;
            const lineOpacity = Math.pow(proximity, 2.2) * (isDark ? 0.16 : 0.22); // boosted opacity for light theme contrast
            
            ctx.strokeStyle = `rgba(235, 94, 40, ${lineOpacity})`;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
      }

      // Vertical connections
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows - 1; r++) {
          const n1 = gridNodes[c][r];
          const n2 = gridNodes[c][r + 1];

          const midX = (n1.x + n2.x) / 2;
          const midY = (n1.y + n2.y) / 2;
          const midDist = Math.hypot(midX - mouseX, midY - mouseY);

          if (midDist < activeRadius) {
            const proximity = (activeRadius - midDist) / activeRadius;
            const lineOpacity = Math.pow(proximity, 2.2) * (isDark ? 0.16 : 0.22);

            ctx.strokeStyle = `rgba(235, 94, 40, ${lineOpacity})`;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
      }

      // 4. Render rotating Micro-Cubes at grid nodes (only inside spotlight)
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const node = gridNodes[c][r];
          const dist = Math.hypot(node.x - mouseX, node.y - mouseY);

          if (dist < activeRadius) {
            const proximity = (activeRadius - dist) / activeRadius;
            const opacity = Math.pow(proximity, 1.4) * 0.85; // bright center, clean falloff
            const scale = 1.0 + proximity * 0.6; // subtle size increase
            const speedMultiplier = 1.0 + proximity * 5.5; // spins much faster

            // Rotate cube
            node.rx += node.rvx * speedMultiplier;
            node.ry += node.rvy * speedMultiplier;
            node.rz += node.rvz * speedMultiplier;

            // Micro-cube base size: extremely small and elegant (2.2px)
            const radius = 2.2 * scale;
            const projected: { x: number; y: number; z: number }[] = [];
            const cameraDepth = 80;

            CUBE_VERTICES.forEach((v) => {
              const vx = v[0] * radius;
              const vy = v[1] * radius;
              const vz = v[2] * radius;

              const rotated = rotate3D(vx, vy, vz, node.rx, node.ry, node.rz);
              
              // Perspective calculation
              const perspective = cameraDepth / (cameraDepth + rotated.z);
              const px = node.x + rotated.x * perspective;
              const py = node.y + rotated.y * perspective;

              projected.push({ x: px, y: py, z: rotated.z });
            });

            // Face depth sorting (furthest first)
            const sortedFaces = CUBE_FACES.map((face) => {
              const avgZ = face.indices.reduce((sum, idx) => sum + projected[idx].z, 0) / 4;
              return { ...face, avgZ };
            }).sort((f1, f2) => f2.avgZ - f1.avgZ);

            // Draw solid transparent faces and outlines
            sortedFaces.forEach((face) => {
              ctx.beginPath();
              const p0 = projected[face.indices[0]];
              ctx.moveTo(p0.x, p0.y);
              for (let i = 1; i < 4; i++) {
                const pi = projected[face.indices[i]];
                ctx.lineTo(pi.x, pi.y);
              }
              ctx.closePath();

              // Transparent holographic fill (boosted face fill opacity on light theme)
              const alphaFill = opacity * (isDark ? 0.38 : 0.44) * face.shade;
              ctx.fillStyle = `rgba(235, 94, 40, ${alphaFill})`;
              ctx.fill();

              // Clean border stroke (boosted stroke opacity on light theme)
              const alphaStroke = opacity * (isDark ? 1.3 : 1.5);
              ctx.strokeStyle = `rgba(235, 94, 40, ${alphaStroke})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            });
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 mix-blend-multiply dark:mix-blend-screen opacity-95"
      style={{
        maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 82%, rgba(0,0,0,0) 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 82%, rgba(0,0,0,0) 100%)",
      }}
    />
  );
}
