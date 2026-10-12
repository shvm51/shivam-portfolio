import { useEffect, useRef } from "react";

/** Custom cursor ring — rendered on desktop pointer devices only (CSS hides it on touch). */
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = ring.current;
    const d = dot.current;
    if (!r || !d) return;

    let x = -100;
    let y = -100;
    let rx = -100;
    let ry = -100;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      d.style.transform = `translate(${x}px, ${y}px)`;
      // Enlarge ring over interactive elements
      const t = e.target as HTMLElement;
      const hot = t.closest("a, button, [role='button']");
      r.style.width = hot ? "56px" : "32px";
      r.style.height = hot ? "56px" : "32px";
    };
    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      r.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="cursor-only" aria-hidden="true">
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[90] rounded-full border border-accent"
        style={{ width: 32, height: 32 }}
      />
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[90] h-1.5 w-1.5 rounded-full bg-accent"
        style={{ transform: "translate(-100px, -100px) translate(-50%, -50%)" }}
      />
    </div>
  );
}
