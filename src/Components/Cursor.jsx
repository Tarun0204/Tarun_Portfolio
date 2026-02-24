import { useEffect, useState } from "react";

export default function Cursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [ringPos, setRingPos] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    if ("ontouchstart" in window) {
      setIsDesktop(false);
      return;
    }

    const moveCursor = (e) => {
      setPos({ x: e.clientX, y: e.clientY });

      setRingPos((prev) => ({
        x: prev.x + (e.clientX - prev.x) * 0.15,
        y: prev.y + (e.clientY - prev.y) * 0.15,
      }));
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  if (!isDesktop) return null;

  return (
    <>
      <div
        className="fixed top-0 left-0 w-8 h-8 border-2 border-gray-500 rounded-full pointer-events-none z-[99999] transition-transform duration-150 ease-out"
        style={{
          transform: `translate(${ringPos.x - 16}px, ${ringPos.y - 16}px)`,
        }}
      />

      <div
        className="fixed top-0 left-0 w-4 h-4 bg-red-500 rounded-full pointer-events-none z-[100000]"
        style={{
          transform: `translate(${pos.x - 6}px, ${pos.y - 6}px)`,
        }}
      />
    </>
  );
}