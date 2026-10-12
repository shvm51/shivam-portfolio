import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, FileText } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { profile, socials } from "../data/portfolio";
import { EASE, GithubIcon, LinkedinIcon, Magnetic, buttonClasses } from "./ui";

const github = socials.find((s) => s.label === "GitHub");
const linkedin = socials.find((s) => s.label === "LinkedIn");

/**
 * Signature visual: a 2D particle "signal field" lattice that reacts to the
 * pointer — evoking AI/infrastructure networks. Pauses when offscreen;
 * draws one static frame on mobile or reduced-motion.
 */
function SignalField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const interactive = !reduce && !coarse;

    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    type P = { x: number; y: number; ox: number; oy: number; vx: number; vy: number };
    let pts: P[] = [];
    const pointer = { x: -9999, y: -9999 };
    const DPR = Math.min(2, window.devicePixelRatio || 1);

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * DPR;
      canvas.height = h * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      pts = [];
      const gap = 56;
      for (let x = gap / 2; x < w; x += gap) {
        for (let y = gap / 2; y < h; y += gap) {
          const jx = (Math.random() - 0.5) * 26;
          const jy = (Math.random() - 0.5) * 26;
          pts.push({ x: x + jx, y: y + jy, ox: x + jx, oy: y + jy, vx: 0, vy: 0 });
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const R = 100;
      // edges
      ctx.lineWidth = 1;
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < R) {
            const alpha = (1 - d / R) * 0.28;
            ctx.strokeStyle = `rgba(244,241,234,${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      // nodes, accent near pointer
      for (const p of pts) {
        const pd = Math.hypot(p.x - pointer.x, p.y - pointer.y);
        const hot = pd < 170;
        ctx.fillStyle = hot ? "#ff4d00" : "rgba(244,241,234,0.5)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, hot ? 2.4 : 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = () => {
      for (const p of pts) {
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const d = Math.hypot(dx, dy) || 1;
        if (d < 170) {
          const f = ((170 - d) / 170) * 0.9;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }
        // spring back to origin
        p.vx += (p.ox - p.x) * 0.012;
        p.vy += (p.oy - p.y) * 0.012;
        p.vx *= 0.9;
        p.vy *= 0.9;
        p.x += p.vx;
        p.y += p.vy;
      }
      draw();
      if (visible) raf = requestAnimationFrame(step);
    };

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };

    build();
    draw();
    if (interactive) {
      raf = requestAnimationFrame(step);
      window.addEventListener("pointermove", onPointer, { passive: true });
    }

    const ro = new ResizeObserver(() => {
      build();
      draw();
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      const was = visible;
      visible = e.isIntersecting;
      if (interactive && visible && !was) raf = requestAnimationFrame(step);
      if (!visible) cancelAnimationFrame(raf);
    });
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  );
}

export function Hero({ ready }: { ready: boolean }) {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [cutout, setCutout] = useState(false);

  /**
   * Face-region mask geometry, measured live so the cutout tracks the real
   * portrait and lettering at any viewport size. Sets --mx/--my/--mrx/--mry
   * (percentages of the wordmark wrapper) used by both mask layers.
   * Face fractions measured from the 1024x1536 portrait (exact 2:3, no crop).
   */
  useEffect(() => {
    const wrap = wrapRef.current;
    const img = imgRef.current;
    if (!wrap || !img) return;
    const update = () => {
      const wr = wrap.getBoundingClientRect();
      const ir = img.getBoundingClientRect();
      if (wr.width === 0 || wr.height === 0 || ir.width === 0) return;
      const faceX = ir.left + 0.5 * ir.width;
      const faceY = ir.top + 0.3 * ir.height;
      const s = wrap.style;
      s.setProperty("--mx", `${(((faceX - wr.left) / wr.width) * 100).toFixed(2)}%`);
      s.setProperty("--my", `${(((faceY - wr.top) / wr.height) * 100).toFixed(2)}%`);
      s.setProperty("--mrx", `${(((0.24 * ir.width) / wr.width) * 100).toFixed(2)}%`);
      s.setProperty("--mry", `${(((0.21 * ir.height) / wr.height) * 100).toFixed(2)}%`);
    };
    update();
    window.addEventListener("resize", update);
    if (document.fonts?.ready) document.fonts.ready.then(update).catch(() => {});
    // Engage the cutout only after the type-reveal settles, so the mask
    // never fights the entrance animation.
    const t = setTimeout(() => {
      update();
      setCutout(true);
    }, 1700);
    return () => {
      window.removeEventListener("resize", update);
      clearTimeout(t);
    };
  }, [ready]);

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink text-paper"
    >
      <SignalField />

      {/* portrait — the face the wordmark lives around (reference treatment) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 z-[5] h-[82%] -translate-x-1/2 -translate-y-1/2 aspect-[2/3] [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
      >
        <img
          ref={imgRef}
          src="/portrait.webp"
          alt=""
          fetchPriority="high"
          className="h-full w-full object-cover object-top opacity-90"
          width={1024}
          height={1536}
        />
        {/* soft ink veil keeps the solid wordmark readable over bright areas */}
        <div className="absolute inset-0 bg-ink/35" />
      </div>

      {/* faint baseline grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #f4f1ea 1px, transparent 1px)",
          backgroundSize: "clamp(24px, 8vw, 96px) 100%",
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-center px-6 pb-24 pt-28 md:px-12">
        {/* kicker */}
        <motion.p
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          className="font-mono text-xs uppercase tracking-[0.35em] text-paper/60"
        >
          {profile.role} <span className="text-accent">—</span> {profile.university}
        </motion.p>

        {/* architectural wordmark — solid layer with a face-shaped cutout,
            plus an outline layer visible only over the face region */}
        <div ref={wrapRef} className="relative mt-8">
          <h1
            className="select-none font-display font-bold uppercase leading-[0.82] tracking-[-0.03em] text-[clamp(3.6rem,16.5vw,15rem)]"
            style={
              cutout
                ? {
                    maskImage:
                      "radial-gradient(ellipse var(--mrx) var(--mry) at var(--mx) var(--my), transparent 50%, black 72%)",
                    WebkitMaskImage:
                      "radial-gradient(ellipse var(--mrx) var(--mry) at var(--mx) var(--my), transparent 50%, black 72%)",
                  }
                : undefined
            }
          >
            <span className="block overflow-hidden">
              <motion.span
                className="block text-paper"
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: "108%" }}
                animate={ready ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, ease: EASE, delay: 0.25 }}
              >
                {profile.firstName}
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="block text-paper"
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: "108%" }}
                animate={ready ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, ease: EASE, delay: 0.36 }}
              >
                {profile.lastName}
                <span className="text-accent">.</span>
              </motion.span>
            </span>
          </h1>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 select-none"
            style={{
              maskImage:
                "radial-gradient(ellipse var(--mrx) var(--mry) at var(--mx) var(--my), black 50%, transparent 72%)",
              WebkitMaskImage:
                "radial-gradient(ellipse var(--mrx) var(--mry) at var(--mx) var(--my), black 50%, transparent 72%)",
              opacity: cutout ? 1 : 0,
              transition: "opacity 0.6s ease",
            }}
          >
            <h1 className="select-none font-display font-bold uppercase leading-[0.82] tracking-[-0.03em] text-[clamp(3.6rem,16.5vw,15rem)]">
              <span className="block overflow-hidden">
                <motion.span
                  className="block text-transparent [-webkit-text-stroke:2px_#f4f1ea]"
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: "108%" }}
                  animate={ready ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 1, ease: EASE, delay: 0.25 }}
                >
                  {profile.firstName}
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  className="block text-transparent [-webkit-text-stroke:2px_#f4f1ea]"
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: "108%" }}
                  animate={ready ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 1, ease: EASE, delay: 0.36 }}
                >
                  {profile.lastName}
                  <span className="text-accent [-webkit-text-stroke:0px]">.</span>
                </motion.span>
              </span>
            </h1>
          </div>
        </div>

        {/* positioning statement */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
          className="mt-10 max-w-2xl md:ml-auto md:text-right"
        >
          <p className="font-serif text-2xl italic text-paper/90 md:text-3xl">
            “{profile.tagline}”
          </p>
          <p className="mt-4 text-[1.0625rem] leading-relaxed text-paper/60">
            {profile.intro}
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE, delay: 0.75 }}
          className="mt-12 flex flex-wrap items-center gap-4"
        >
          <Magnetic>
            <a href="#work" className={buttonClasses(true)}>
              Explore my work <ArrowDown size={16} />
            </a>
          </Magnetic>
          <Magnetic>
            <a href="#contact" className={buttonClasses(true)}>
              Get in touch <ArrowUpRight size={16} />
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={profile.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses(true)}
            >
              Résumé <FileText size={16} />
            </a>
          </Magnetic>
        </motion.div>

        {/* socials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-10 flex items-center gap-6"
        >
          {github?.status === "live" && (
            <a
              href={github.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="text-paper/60 transition-colors hover:text-accent"
            >
              <GithubIcon size={22} />
            </a>
          )}
          {linkedin?.status === "live" ? (
            <a
              href={linkedin.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="text-paper/60 transition-colors hover:text-accent"
            >
              <LinkedinIcon size={22} />
            </a>
          ) : (
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-paper/30">
              LinkedIn — soon
            </span>
          )}
        </motion.div>
      </div>

      {/* scroll indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-paper/50 transition-colors hover:text-accent"
        animate={reduce ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown size={20} />
      </motion.a>
    </section>
  );
}
