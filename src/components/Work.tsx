import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { projects, type Project } from "../data/portfolio";
import { ProjectVisual } from "./ProjectVisuals";
import { EASE, Magnetic, Reveal, SectionHeading, buttonClasses } from "./ui";

function LiveLinks({ project, dark }: { project: Project; dark: boolean }) {
  const live = project.links.filter((l) => l.status === "live" && l.href);
  if (live.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-4">
      {live.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${buttonClasses(dark)} !px-5 !py-2.5 !text-xs`}
        >
          {l.label} <ArrowUpRight size={14} />
        </a>
      ))}
    </div>
  );
}

function CaseStudyModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const sections: { k: string; body: ReactNode }[] = [
    { k: "Problem", body: <p>{project.problem}</p> },
    { k: "Solution", body: <p>{project.solution}</p> },
    { k: "My role", body: <p>{project.role}</p> },
    {
      k: "Stack",
      body: project.stack.length ? (
        <ul className="flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <li key={s} className="border border-paper/25 px-3 py-1.5 font-mono text-xs uppercase tracking-[0.12em]">
              {s}
            </li>
          ))}
        </ul>
      ) : (
        <ComingSoon />
      ),
    },
    {
      k: "Approach",
      body: project.approach.length ? (
        <ol className="list-decimal space-y-3 pl-5">
          {project.approach.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ol>
      ) : (
        <ComingSoon />
      ),
    },
    {
      k: "Outcomes",
      body: project.outcomes.length ? (
        <ul className="space-y-3">
          {project.outcomes.map((o) => (
            <li key={o} className="flex gap-3">
              <span aria-hidden="true" className="text-accent">→</span>
              {o}
            </li>
          ))}
        </ul>
      ) : (
        <ComingSoon />
      ),
    },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-ink/80 backdrop-blur-sm sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Case study: ${project.title}`}
    >
      <motion.div
        className="max-h-[92vh] w-full max-w-3xl overflow-y-auto border border-paper/15 bg-ink text-paper"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 flex items-start justify-between gap-6 border-b border-paper/10 bg-ink p-6 md:p-10">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
              {project.index} — {project.category}
            </p>
            <h3 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight md:text-5xl">
              {project.title}
            </h3>
            <p className="mt-3 font-serif text-lg italic text-paper/70">{project.tagline}</p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className="flex h-11 w-11 shrink-0 items-center justify-center border border-paper/25 text-paper transition-colors hover:border-accent hover:text-accent"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 md:p-10">
          {project.statusNote && (
            <p className="mb-10 border-l-2 border-accent pl-4 font-serif text-lg italic text-paper/70">
              {project.statusNote}
            </p>
          )}
          <dl className="space-y-10">
            {sections.map((s) => (
              <div key={s.k}>
                <dt className="font-mono text-xs uppercase tracking-[0.3em] text-paper/50">
                  {s.k}
                </dt>
                <dd className="mt-3 text-[1.0625rem] leading-[1.7] text-paper/85">
                  {s.body}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-10 border-t border-paper/10 pt-8">
            <LiveLinks project={project} dark />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ComingSoon() {
  return (
    <p className="font-serif text-lg italic text-paper/50">
      Details coming soon — this section updates as the project evolves.
    </p>
  );
}

/** Featured project: asymmetric editorial "release" feature. */
function Feature({
  project,
  flip,
  onOpen,
}: {
  project: Project;
  flip: boolean;
  onOpen: (p: Project) => void;
}) {
  return (
    <article className="border-t-2 border-dotted border-paper/20 py-16 md:py-24">
      {/* mono micro-labels */}
      <Reveal>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-2 font-mono text-xs uppercase tracking-[0.25em] text-paper/50">
          <span className="text-accent">№ {project.index}</span>
          <span>{project.category}</span>
          <span>Selected work</span>
        </div>
      </Reveal>

      <div className="mt-8 grid items-start gap-10 md:grid-cols-12 md:gap-8">
        {/* text column */}
        <div className={`md:col-span-5 ${flip ? "md:order-2 md:col-start-8" : ""}`}>
          <Reveal>
            <h3 className="font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight md:text-6xl">
              {project.title}
            </h3>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-5 font-serif text-xl italic text-paper/75">
              {project.tagline}
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 leading-[1.7] text-paper/65">{project.problem}</p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-8 flex flex-wrap gap-4">
              <Magnetic>
                <button
                  type="button"
                  onClick={() => onOpen(project)}
                  className={buttonClasses(true)}
                >
                  Read case study <ArrowUpRight size={16} />
                </button>
              </Magnetic>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8">
              <LiveLinks project={project} dark />
            </div>
          </Reveal>
        </div>

        {/* visual column — offset, broken grid */}
        <div
          className={`md:col-span-7 ${flip ? "md:order-1 md:col-start-1" : "md:col-start-6"} ${
            flip ? "md:-mt-10" : "md:mt-10"
          }`}
        >
          <Reveal delay={0.1}>
            <button
              type="button"
              onClick={() => onOpen(project)}
              aria-label={`Open case study for ${project.title}`}
              className="group block w-full border border-paper/15 text-left transition-colors hover:border-accent/60"
            >
              <ProjectVisual kind={project.visual} title={project.title} />
              <span className="flex items-center justify-between border-t border-paper/15 px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-paper/50 transition-colors group-hover:text-accent">
                <span>Illustrative mockup — replaceable</span>
                <ArrowUpRight size={14} />
              </span>
            </button>
          </Reveal>
        </div>
      </div>
    </article>
  );
}

/** Secondary project: typographic index row. */
function IndexRow({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  return (
    <Reveal>
      <button
        type="button"
        onClick={() => onOpen(project)}
        className="group flex w-full items-baseline justify-between gap-6 border-t border-paper/15 py-8 text-left"
      >
        <span className="flex items-baseline gap-6">
          <span className="font-mono text-sm text-accent">№ {project.index}</span>
          <span>
            <span className="block font-display text-2xl font-bold uppercase tracking-tight transition-colors group-hover:text-accent md:text-4xl">
              {project.title}
            </span>
            <span className="mt-2 block font-mono text-xs uppercase tracking-[0.2em] text-paper/50">
              {project.category}
            </span>
          </span>
        </span>
        <span className="shrink-0 font-serif text-lg italic text-paper/50">
          details coming soon
        </span>
      </button>
    </Reveal>
  );
}

export function Work() {
  const [active, setActive] = useState<Project | null>(null);
  const featured = projects.filter((p) => p.featured);
  const secondary = projects.filter((p) => !p.featured);

  return (
    <section id="work" className="scroll-mt-16 bg-ink text-paper">
      <div className="mx-auto max-w-[1440px] px-6 py-[12vh] md:px-12 md:py-[14vh]">
        <SectionHeading
          dark
          index="02"
          label="Selected work"
          title={["Featured", "releases"]}
        />
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl font-serif text-xl italic text-paper/60">
            Projects treated as publications — each one an idea engineered
            into something real.
          </p>
        </Reveal>

        <div className="mt-8">
          {featured.map((p, i) => (
            <Feature key={p.id} project={p} flip={i % 2 === 1} onOpen={setActive} />
          ))}
        </div>

        {secondary.length > 0 && (
          <div className="mt-16">
            <Reveal>
              <h3 className="mb-8 font-mono text-xs uppercase tracking-[0.3em] text-paper/50">
                More in the index
              </h3>
            </Reveal>
            <div className="border-b border-paper/15">
              {secondary.map((p) => (
                <IndexRow key={p.id} project={p} onOpen={setActive} />
              ))}
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {active && (
          <CaseStudyModal project={active} onClose={() => setActive(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
