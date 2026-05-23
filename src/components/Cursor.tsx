"use client";
import { useEffect, useRef } from "react";
import { useCursor } from "@/hooks/useCursor";
import { useTheme } from "@/context/ThemeContext";

const ARROW = [
  [1, 0, 0, 0, 0, 0, 0],
  [1, 1, 0, 0, 0, 0, 0],
  [1, 1, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 0, 0, 0],
  [1, 1, 1, 0, 0, 0, 0],
  [1, 1, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0],
];
const CELL = 3;
const SIZE = 7 * CELL;

export default function Cursor() {
  const { pos, hovered } = useCursor();
  const { theme } = useTheme();
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    ctx.clearRect(0, 0, SIZE + 24, SIZE + 24);
    const defaultColor = theme === "dark" ? "#ffffff" : "#000000";
    const color = hovered ? "#EB5E28" : defaultColor;
    const ox = 12,
      oy = 12;
    for (let y = 0; y < 7; y++) {
      for (let x = 0; x < 7; x++) {
        if (ARROW[y][x]) {
          ctx.fillStyle = color;
          ctx.fillRect(ox + x * CELL, oy + y * CELL, CELL, CELL);
        }
      }
    }
    if (hovered) {
      ctx.fillStyle = "#EB5E28";
      ctx.fillRect(ox - 8, oy + SIZE / 2 - 0.5, 6, 1);
      ctx.fillRect(ox + SIZE + 2, oy + SIZE / 2 - 0.5, 6, 1);
      ctx.fillRect(ox + SIZE / 2 - 0.5, oy - 8, 1, 6);
      ctx.fillRect(ox + SIZE / 2 - 0.5, oy + SIZE + 2, 1, 6);
    }
  }, [hovered, theme]);

  return (
    <canvas
      ref={ref}
      width={SIZE + 24}
      height={SIZE + 24}
      className="pointer-events-none fixed z-[9999] hidden lg:block"
      style={{
        transform: `translate(${pos.x - 12}px, ${pos.y - 12}px)`,
        left: 0,
        top: 0,
      }}
    />
  );
}
