import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useEffect, useRef } from "react";
import { profile, socials } from "../data/portfolio";
import { EASE, GithubIcon, LinkedinIcon } from "./ui";

const github = socials.find((s) => s.label === "GitHub");
const linkedin = socials.find((s) => s.label === "LinkedIn");

/**
 * Near-invisible mesh texture — drawn once, no animation loop.
 * Pure background depth; the portrait and type carry the hero.
 */
function BackdropMesh() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const DPR = Math.min(2, window.devicePixelRatio || 1);
      const w = rect.width;
      const h = rect.height;
      canvas.width = w * DPR;
      canvas.height = h * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      ctx.clearRect(0, 0, w, h);

      type P = { x: number; y: number };
      const pts: P[] = [];
      const gap = 120;
      for (let x = gap / 2; x < w; x += gap) {
        for (let y = gap / 2; y < h; y += gap) {
          pts.push({
            x: x + (Math.random() - 0.5) * 40,
            y: y + (Math.random() - 0.5) * 40,
          });
        }
      }
      ctx.lineWidth = 1;
      const R = 130;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          if (Math.abs(dx) > R || Math.abs(dy) > R) continue;
          const d = Math.hypot(dx, dy);
          if (d < R) {
            ctx.strokeStyle = `rgba(244,241,234,${((1 - d / R) * 0.055).toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.fillStyle = "rgba(244,241,234,0.10)";
      for (const p of pts) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.1, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  );
}

const ctaClass =
  "inline-flex items-center gap-3 border border-paper/20 px-5 py-3.5 font-mono text-[11px] uppercase tracking-[0.25em] text-paper/70 transition-colors duration-300 hover:border-paper/60 hover:text-paper";

export function Hero({ ready }: { ready: boolean }) {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const typeRef = useRef<HTMLDivElement>(null);

  // Gentle pointer parallax — depth without decoration.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduce) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;
    let visible = true;

    const onMove = (e: PointerEvent) => {
      const r = section.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - 0.5;
      ty = (e.clientY - r.top) / r.height - 0.5;
    };
    const loop = () => {
      cx += (tx - cx) * 0.055;
      cy += (ty - cy) * 0.055;
      if (portraitRef.current) {
        portraitRef.current.style.transform = `translate3d(${(cx * 16).toFixed(2)}px, ${(cy * 10).toFixed(2)}px, 0)`;
      }
      if (typeRef.current) {
        typeRef.current.style.transform = `translate3d(${(-cx * 9).toFixed(2)}px, ${(-cy * 6).toFixed(2)}px, 0)`;
      }
      if (visible) raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(([e]) => {
      const was = visible;
      visible = e.isIntersecting;
      if (visible && !was) raf = requestAnimationFrame(loop);
      if (!visible) cancelAnimationFrame(raf);
    });
    io.observe(section);

    raf = requestAnimationFrame(loop);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      io.disconnect();
    };
  }, [reduce]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-svh flex-col overflow-hidden bg-[#0b0a08] text-paper"
    >
      <BackdropMesh />

      {/* portrait — face between the letterforms, melting into the black */}
      <div className="absolute inset-0 z-[1] flex justify-center">
        <div
          ref={portraitRef}
          className="relative top-[24%] h-[66%] will-change-transform md:top-[22%] md:h-[80%]"
        >
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.05 }}
            animate={ready ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.4, ease: EASE, delay: 0.35 }}
            className="h-full [mask-image:radial-gradient(ellipse_72%_68%_at_50%_42%,black_55%,transparent_100%)]"
          >
            <img
              src="/portrait.webp"
              alt=""
              aria-hidden="true"
              fetchPriority="high"
              width={624}
              height={930}
              className="h-full w-auto object-cover"
            />
          </motion.div>
        </div>
      </div>

      {/* typography — the hero */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-center px-6 pt-24 md:px-12">
        <div ref={typeRef} className="will-change-transform">
          <motion.p
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
            className="font-mono text-[11px] uppercase tracking-[0.35em] text-paper/55"
          >
            {profile.role} <span className="text-accent">—</span>{" "}
            {profile.university}
          </motion.p>

          <h1 className="mt-6 select-none font-condensed uppercase leading-[0.84] tracking-[-0.01em] text-[clamp(5rem,17vw,15rem)]">
            <span className="block overflow-hidden pb-1">
              <motion.span
                className="block text-paper"
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: "108%" }}
                animate={ready ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, ease: EASE, delay: 0.25 }}
              >
                {profile.firstName}
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-2">
              <motion.span
                className="text-outline block"
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: "108%" }}
                animate={ready ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, ease: EASE, delay: 0.37 }}
              >
                {profile.lastName}
                <span className="text-accent" style={{ WebkitTextStroke: "0px" }}>
                  .
                </span>
              </motion.span>
            </span>
          </h1>
        </div>
      </div>

      {/* bottom row — CTAs left, introduction right */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-6 pb-14 md:flex-row md:items-end md:justify-between md:px-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: EASE, delay: 0.7 }}
        >
          <div className="flex flex-wrap gap-3">
            <a href="#work" className={ctaClass}>
              Explore my work
            </a>
            <a href="#contact" className={ctaClass}>
              Get in touch
            </a>
            <a
              href={profile.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className={ctaClass}
            >
              Résumé
            </a>
          </div>
          <div className="mt-6 flex items-center gap-5">
            {github?.status === "live" && (
              <a
                href={github.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="text-paper/45 transition-colors hover:text-accent"
              >
                <GithubIcon size={20} />
              </a>
            )}
            {linkedin?.status === "live" ? (
              <a
                href={linkedin.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="text-paper/45 transition-colors hover:text-accent"
              >
                <LinkedinIcon size={20} />
              </a>
            ) : (
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-paper/30">
                LinkedIn — soon
              </span>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: EASE, delay: 0.85 }}
          className="max-w-sm md:pb-1 md:text-right"
        >
          <p className="font-serif text-[1.35rem] italic leading-snug text-paper/90">
            “Engineering ideas into reality.”
          </p>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-paper/50">
            I build intelligent systems, thoughtful digital experiences, and
            technology that solves real problems.
          </p>
        </motion.div>
      </div>

      {/* scroll indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 text-paper/35 transition-colors hover:text-accent md:block"
        animate={reduce ? {} : { y: [0, 6, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown size={18} />
      </motion.a>
    </section>
  );
}
