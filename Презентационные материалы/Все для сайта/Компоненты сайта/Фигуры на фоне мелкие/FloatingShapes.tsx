/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  FLOATING SHAPES — Animated Background Effect                  ║
 * ║  Версия: 1.0                                                   ║
 * ║  Источник: YouTube Shorts видео (IT/tech стиль)                ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * ЭФФЕКТ: Фиксированный фон из голубой сетки + белые плавающие
 * геометрические фигуры + соединительные линии между ними.
 * Остаётся на месте при прокрутке страницы (position: fixed).
 *
 * ━━━ НАСТРОЙКА (конфиг в секции CONFIG ниже) ━━━
 *
 *   Параметр            По умолчанию        Описание
 *   ─────────────────── ─────────────────── ──────────────────────
 *   GRID_SPACING        45                  Шаг сетки в пикселях
 *   GRID_COLOR          rgba(74,144,226,.12) Цвет линий сетки
 *   GRID_LINE_WIDTH     0.5                 Толщина линий сетки
 *   CONN_MAX_DIST       180                 Макс. расстояние соединений
 *   CONN_COLOR_BASE     [74,144,226]        RGB цвет соединений
 *   CONN_MAX_ALPHA      0.08                Макс. прозрачность соединений
 *   SHAPE_DENSITY       18000               Пикселей на одну фигуру (меньше = гуще)
 *   SHAPE_MIN_COUNT     40                  Минимум фигур на экране
 *   SHAPE_OPACITY_MIN   0.15                Мин. прозрачность фигур
 *   SHAPE_OPACITY_MAX   0.50                Макс. прозрачность фигур
 *   SHAPE_GLOW_CHANCE   0.4                 Вероятность свечения (не-точки)
 *   SHAPE_GLOW_MIN      3                   Мин. радиус свечения
 *   SHAPE_GLOW_MAX      9                   Макс. радиус свечения
 *   SHAPE_COLOR         rgba(255,255,255,N) Цвет фигур (белый с переменной α)
 *
 * ━━━ ИНТЕГРАЦИЯ ━━━
 *
 *   1. Скопировать этот файл в компоненты проекта
 *   2. Добавить в CSS:
 *
 *      .floating-shapes-canvas {
 *        position: fixed;
 *        top: 0; left: 0;
 *        width: 100%; height: 100%;
 *        pointer-events: none;
 *        z-index: 2;
 *      }
 *      @media (prefers-reduced-motion: reduce) {
 *        .floating-shapes-canvas { opacity: 0.4; }
 *      }
 *
 *   3. Импортировать и добавить в корень layout/page:
 *
 *      import FloatingShapes from '@/components/FloatingShapes';
 *      ...
 *      <FloatingShapes />
 *
 *   4. Чтобы фигуры просвечивали через секции — сделать
 *      фоны секций полупрозрачными (opacity ~88-95%).
 *
 * ━━━ АДАПТАЦИЯ ПОД ДИЗАЙН ━━━
 *
 *   • Тёмный сайт    → оставить как есть (белые фигуры, голубая сетка)
 *   • Светлый сайт   → инвертировать: фигуры тёмные, сетка серая
 *     SHAPE_COLOR = rgba(0,0,0,N), GRID_COLOR = rgba(0,0,0,0.06)
 *   • Брендовый цвет → заменить CONN_COLOR_BASE и GRID_COLOR
 *     на RGB бренда, например [20,184,166] для teal
 *   • Минимальный    → GRID_SPACING=0, CONN_MAX_DIST=0 (без сетки и линий)
 *   • Плотный        → SHAPE_DENSITY=10000, SHAPE_MIN_COUNT=60
 *   • Разреженный    → SHAPE_DENSITY=35000, SHAPE_MIN_COUNT=20
 */

'use client';

import { useEffect, useRef } from 'react';

// ═══════════════════════════════════════════════════════
//  CONFIG — меняйте эти значения под свой дизайн
// ═══════════════════════════════════════════════════════

const CONFIG = {
  // Grid
  GRID_SPACING: 45,
  GRID_COLOR: 'rgba(74, 144, 226, 0.12)',
  GRID_LINE_WIDTH: 0.5,

  // Connections between shapes
  CONN_MAX_DIST: 180,
  CONN_COLOR_BASE: [74, 144, 226] as const,
  CONN_MAX_ALPHA: 0.08,

  // Shapes
  SHAPE_DENSITY: 18000,       // px² per shape (less = more shapes)
  SHAPE_MIN_COUNT: 40,
  SHAPE_OPACITY_MIN: 0.15,
  SHAPE_OPACITY_MAX: 0.50,
  SHAPE_GLOW_CHANCE: 0.4,
  SHAPE_GLOW_MIN: 3,
  SHAPE_GLOW_MAX: 9,

  // Type distribution weights (higher = more frequent)
  SHAPE_WEIGHTS: {
    square: 25,
    circle: 25,
    dot: 25,
    hexagon: 10,
    diamond: 8,
    triangle: 7,
  } as Record<string, number>,

  // Size ranges by type [min, max]
  SHAPE_SIZES: {
    dot: [3, 9],
    square: [10, 32],
    circle: [10, 32],
    hexagon: [12, 32],
    diamond: [12, 32],
    triangle: [10, 28],
  } as Record<string, [number, number]>,

  // Animation
  FLOAT_AMP_X_MIN: 2,
  FLOAT_AMP_X_MAX: 10,
  FLOAT_AMP_Y_MIN: 3,
  FLOAT_AMP_Y_MAX: 13,
  FLOAT_SPEED_MIN: 0.0004,
  FLOAT_SPEED_MAX: 0.0014,
  ROT_SPEED_RANGE: 0.0004,
};

// ═══════════════════════════════════════════════════════
//  COMPONENT
// ═══════════════════════════════════════════════════════

type ShapeType = keyof typeof CONFIG.SHAPE_WEIGHTS;

interface Shape {
  type: ShapeType;
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
    const shapes: Shape[] = [];

    const C = CONFIG;

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

      const weightEntries = Object.entries(C.SHAPE_WEIGHTS) as [ShapeType, number][];
      const totalWeight = weightEntries.reduce((s, [, w]) => s + w, 0);

      const pickType = (): ShapeType => {
        let r = Math.random() * totalWeight;
        for (const [type, w] of weightEntries) {
          r -= w;
          if (r <= 0) return type;
        }
        return 'dot';
      };

      const rand = (min: number, max: number) => min + Math.random() * (max - min);

      const area = width * height;
      const count = Math.max(C.SHAPE_MIN_COUNT, Math.floor(area / C.SHAPE_DENSITY));

      for (let i = 0; i < count; i++) {
        const type = pickType();
        const sizeRange = C.SHAPE_SIZES[type] || [8, 20];
        const baseSize = rand(sizeRange[0], sizeRange[1]);
        const opacity = rand(C.SHAPE_OPACITY_MIN, C.SHAPE_OPACITY_MAX);
        const glow = (type !== 'dot' && Math.random() < C.SHAPE_GLOW_CHANCE)
          ? rand(C.SHAPE_GLOW_MIN, C.SHAPE_GLOW_MAX)
          : 0;

        shapes.push({
          type,
          x: Math.random() * width,
          y: Math.random() * height,
          size: baseSize,
          opacity,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * C.ROT_SPEED_RANGE * 2,
          phase: Math.random() * Math.PI * 2,
          ampX: rand(C.FLOAT_AMP_X_MIN, C.FLOAT_AMP_X_MAX),
          ampY: rand(C.FLOAT_AMP_Y_MIN, C.FLOAT_AMP_Y_MAX),
          speed: rand(C.FLOAT_SPEED_MIN, C.FLOAT_SPEED_MAX),
          lineW: type === 'dot' ? 0 : rand(0.6, 1.8),
          glow,
        });
      }
    };

    // ─── Draw grid ──────────────────────────────────────
    const drawGrid = () => {
      if (C.GRID_SPACING <= 0) return;
      ctx.strokeStyle = C.GRID_COLOR;
      ctx.lineWidth = C.GRID_LINE_WIDTH;
      for (let x = 0; x < width; x += C.GRID_SPACING) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for (let y = 0; y < height; y += C.GRID_SPACING) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }
    };

    // ─── Draw connections ───────────────────────────────
    const drawConnections = (time: number) => {
      if (C.CONN_MAX_DIST <= 0) return;
      const [cr, cg, cb] = C.CONN_COLOR_BASE;
      for (let i = 0; i < shapes.length; i++) {
        const s = shapes[i];
        const ax = s.x + (prefersReduced ? 0 : Math.cos(time * s.speed * 0.7 + s.phase) * s.ampX);
        const ay = s.y + (prefersReduced ? 0 : Math.sin(time * s.speed + s.phase) * s.ampY);
        for (let j = i + 1; j < shapes.length; j++) {
          const s2 = shapes[j];
          const bx = s2.x + (prefersReduced ? 0 : Math.cos(time * s2.speed * 0.7 + s2.phase) * s2.ampX);
          const by = s2.y + (prefersReduced ? 0 : Math.sin(time * s2.speed + s2.phase) * s2.ampY);
          const dist = Math.hypot(ax - bx, ay - by);
          if (dist < C.CONN_MAX_DIST) {
            const alpha = (1 - dist / C.CONN_MAX_DIST) * C.CONN_MAX_ALPHA;
            ctx.strokeStyle = `rgba(${cr},${cg},${cb},${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke();
          }
        }
      }
    };

    // ─── Shape drawing ──────────────────────────────────
    const drawShape = (type: ShapeType, x: number, y: number, s: number, rot: number) => {
      switch (type) {
        case 'square': {
          ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
          const h = s / 2; ctx.strokeRect(-h, -h, s, s);
          ctx.restore(); break;
        }
        case 'circle': {
          ctx.beginPath(); ctx.arc(x, y, s / 2, 0, Math.PI * 2); ctx.stroke();
          break;
        }
        case 'hexagon': {
          ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const a = (Math.PI / 3) * i - Math.PI / 6;
            const px = Math.cos(a) * s / 2, py = Math.sin(a) * s / 2;
            i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
          }
          ctx.closePath(); ctx.stroke(); ctx.restore(); break;
        }
        case 'triangle': {
          ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
          ctx.beginPath();
          for (let i = 0; i < 3; i++) {
            const a = (Math.PI * 2 / 3) * i - Math.PI / 2;
            const px = Math.cos(a) * s / 2, py = Math.sin(a) * s / 2;
            i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
          }
          ctx.closePath(); ctx.stroke(); ctx.restore(); break;
        }
        case 'diamond': {
          ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
          const h = s / 2;
          ctx.beginPath();
          ctx.moveTo(0, -h); ctx.lineTo(h * 0.6, 0);
          ctx.lineTo(0, h); ctx.lineTo(-h * 0.6, 0);
          ctx.closePath(); ctx.stroke(); ctx.restore(); break;
        }
        case 'dot': {
          ctx.beginPath(); ctx.arc(x, y, s / 2, 0, Math.PI * 2); ctx.fill();
          break;
        }
      }
    };

    // ─── Animation loop ─────────────────────────────────
    const animate = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      drawGrid();
      if (!prefersReduced) drawConnections(time);

      for (const shape of shapes) {
        const floatX = prefersReduced ? 0 : Math.cos(time * shape.speed * 0.7 + shape.phase) * shape.ampX;
        const floatY = prefersReduced ? 0 : Math.sin(time * shape.speed + shape.phase) * shape.ampY;
        const x = shape.x + floatX;
        const y = shape.y + floatY;
        const rot = prefersReduced ? shape.rotation : shape.rotation + shape.rotSpeed * time;

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

        drawShape(shape.type, x, y, shape.size, rot);
      }

      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(animate);
    };

    // ─── Init ───────────────────────────────────────────
    resize();
    createShapes();
    animId = requestAnimationFrame(animate);

    const handleResize = () => { resize(); createShapes(); };
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
