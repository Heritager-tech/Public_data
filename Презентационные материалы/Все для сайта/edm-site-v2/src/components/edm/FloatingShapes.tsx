'use client';

import { useEffect, useRef } from 'react';

/**
 * FloatingShapes — fixed background layer recreating the animation
 * from the user's reference YouTube Shorts video.
 *
 * Visual layers (bottom → top):
 *   1. Dark blue-navy gradient background
 *   2. Blue/cyan grid — thin lines, ~45px cells, ~18% opacity
 *   3. Connecting lines between nearby shapes — network effect
 *   4. White floating geometric shapes — squares, circles, hexagons,
 *      dots, diamonds, triangles — 30-50% opacity, slow drift
 *   5. Subtle glow on larger shapes
 *
 * Everything is position:fixed so it stays while page scrolls.
 */
export default function FloatingShapes() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;

    // ─── Shape data ─────────────────────────────────────
    interface Shape {
      type: 'square' | 'circle' | 'hexagon' | 'triangle' | 'diamond' | 'dot';
      x: number;
      y: number;
      size: number;
      opacity: number;
      rotation: number;
      rotSpeed: number;
      phase: number;
      ampX: number;
      ampY: number;
      speed: number;
      lineW: number;
      glow: number;
    }

    const shapes: Shape[] = [];

    // ─── Grid config ────────────────────────────────────
    const GRID_SPACING = 45;
    const GRID_COLOR = 'rgba(74, 144, 226, 0.12)';   // light blue, ~12% opacity
    const GRID_LINE_WIDTH = 0.5;

    // ─── Connection config ──────────────────────────────
    const CONN_MAX_DIST = 180;
    const CONN_COLOR_BASE = [74, 144, 226];            // same blue family
    const CONN_MAX_ALPHA = 0.08;

    // ─── Resize ─────────────────────────────────────────
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    // ─── Create shapes ──────────────────────────────────
    const createShapes = () => {
      shapes.length = 0;

      // Weighted type distribution — matches video: more squares, circles, dots; fewer hexagons
      const types: { type: Shape['type']; weight: number }[] = [
        { type: 'square', weight: 25 },
        { type: 'circle', weight: 25 },
        { type: 'dot', weight: 25 },
        { type: 'hexagon', weight: 10 },
        { type: 'diamond', weight: 8 },
        { type: 'triangle', weight: 7 },
      ];
      const totalWeight = types.reduce((s, t) => s + t.weight, 0);

      const pickType = (): Shape['type'] => {
        let r = Math.random() * totalWeight;
        for (const t of types) {
          r -= t.weight;
          if (r <= 0) return t.type;
        }
        return 'dot';
      };

      // Density: ~1 shape per 18 000 px² — denser than before for richer look
      const area = width * height;
      const count = Math.max(40, Math.floor(area / 18000));

      for (let i = 0; i < count; i++) {
        const type = pickType();

        // Size varies by type — dots are tiny, squares/circles medium, hexagons larger
        let baseSize: number;
        switch (type) {
          case 'dot':
            baseSize = 3 + Math.random() * 6;
            break;
          case 'square':
          case 'circle':
            baseSize = 10 + Math.random() * 22;
            break;
          case 'hexagon':
          case 'diamond':
            baseSize = 12 + Math.random() * 20;
            break;
          case 'triangle':
            baseSize = 10 + Math.random() * 18;
            break;
        }

        // Opacity: 30-50% per video analysis
        const opacity = 0.15 + Math.random() * 0.35;

        // Glow: ~40% of non-dot shapes get a glow
        const glow = (type !== 'dot' && Math.random() < 0.4)
          ? 3 + Math.random() * 6
          : 0;

        shapes.push({
          type,
          x: Math.random() * width,
          y: Math.random() * height,
          size: baseSize,
          opacity,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.0004,
          phase: Math.random() * Math.PI * 2,
          ampX: 2 + Math.random() * 8,
          ampY: 3 + Math.random() * 10,
          speed: 0.0004 + Math.random() * 0.001,
          lineW: type === 'dot' ? 0 : (0.6 + Math.random() * 1.2),
          glow,
        });
      }
    };

    // ─── Draw grid ──────────────────────────────────────
    const drawGrid = () => {
      ctx.strokeStyle = GRID_COLOR;
      ctx.lineWidth = GRID_LINE_WIDTH;

      // Vertical lines
      for (let x = 0; x < width; x += GRID_SPACING) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y < height; y += GRID_SPACING) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    };

    // ─── Draw connections between nearby shapes ─────────
    const drawConnections = (time: number) => {
      for (let i = 0; i < shapes.length; i++) {
        // Current position of shape i
        const ax = shapes[i].x + (prefersReduced ? 0 : Math.cos(time * shapes[i].speed * 0.7 + shapes[i].phase) * shapes[i].ampX);
        const ay = shapes[i].y + (prefersReduced ? 0 : Math.sin(time * shapes[i].speed + shapes[i].phase) * shapes[i].ampY);

        for (let j = i + 1; j < shapes.length; j++) {
          const bx = shapes[j].x + (prefersReduced ? 0 : Math.cos(time * shapes[j].speed * 0.7 + shapes[j].phase) * shapes[j].ampX);
          const by = shapes[j].y + (prefersReduced ? 0 : Math.sin(time * shapes[j].speed + shapes[j].phase) * shapes[j].ampY);

          const dx = ax - bx;
          const dy = ay - by;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONN_MAX_DIST) {
            const alpha = (1 - dist / CONN_MAX_DIST) * CONN_MAX_ALPHA;
            ctx.strokeStyle = `rgba(${CONN_COLOR_BASE[0]}, ${CONN_COLOR_BASE[1]}, ${CONN_COLOR_BASE[2]}, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.stroke();
          }
        }
      }
    };

    // ─── Shape drawing helpers ──────────────────────────

    const drawSquare = (x: number, y: number, s: number, rot: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      const h = s / 2;
      ctx.strokeRect(-h, -h, s, s);
      ctx.restore();
    };

    const drawCircle = (x: number, y: number, s: number) => {
      ctx.beginPath();
      ctx.arc(x, y, s / 2, 0, Math.PI * 2);
      ctx.stroke();
    };

    const drawHexagon = (x: number, y: number, s: number, rot: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i - Math.PI / 6;
        const px = Math.cos(a) * s / 2;
        const py = Math.sin(a) * s / 2;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    };

    const drawTriangle = (x: number, y: number, s: number, rot: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.beginPath();
      for (let i = 0; i < 3; i++) {
        const a = (Math.PI * 2 / 3) * i - Math.PI / 2;
        const px = Math.cos(a) * s / 2;
        const py = Math.sin(a) * s / 2;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    };

    const drawDiamond = (x: number, y: number, s: number, rot: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      const h = s / 2;
      ctx.beginPath();
      ctx.moveTo(0, -h);
      ctx.lineTo(h * 0.6, 0);
      ctx.lineTo(0, h);
      ctx.lineTo(-h * 0.6, 0);
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    };

    const drawDot = (x: number, y: number, s: number) => {
      ctx.beginPath();
      ctx.arc(x, y, s / 2, 0, Math.PI * 2);
      ctx.fill();
    };

    // ─── Main animation loop ────────────────────────────
    const animate = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Layer 1: Grid
      drawGrid();

      // Layer 2: Connections
      if (!prefersReduced) {
        drawConnections(time);
      }

      // Layer 3: Shapes
      for (const shape of shapes) {
        const floatX = prefersReduced ? 0 : Math.cos(time * shape.speed * 0.7 + shape.phase) * shape.ampX;
        const floatY = prefersReduced ? 0 : Math.sin(time * shape.speed + shape.phase) * shape.ampY;
        const x = shape.x + floatX;
        const y = shape.y + floatY;
        const rot = prefersReduced ? shape.rotation : shape.rotation + shape.rotSpeed * time;

        // Glow
        if (shape.glow > 0) {
          ctx.shadowColor = `rgba(255, 255, 255, ${shape.opacity * 0.4})`;
          ctx.shadowBlur = shape.glow;
        } else {
          ctx.shadowColor = 'transparent';
          ctx.shadowBlur = 0;
        }

        ctx.strokeStyle = `rgba(255, 255, 255, ${shape.opacity})`;
        ctx.fillStyle = `rgba(255, 255, 255, ${shape.opacity})`;
        ctx.lineWidth = shape.lineW;

        switch (shape.type) {
          case 'square':   drawSquare(x, y, shape.size, rot); break;
          case 'circle':   drawCircle(x, y, shape.size); break;
          case 'hexagon':  drawHexagon(x, y, shape.size, rot); break;
          case 'triangle': drawTriangle(x, y, shape.size, rot); break;
          case 'diamond':  drawDiamond(x, y, shape.size, rot); break;
          case 'dot':      drawDot(x, y, shape.size); break;
        }
      }

      // Reset shadow
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(animate);
    };

    // ─── Init ───────────────────────────────────────────
    resize();
    createShapes();
    animId = requestAnimationFrame(animate);

    const handleResize = () => {
      resize();
      createShapes();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="floating-shapes-canvas"
      aria-hidden="true"
    />
  );
}
