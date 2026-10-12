import { profile } from "../data/portfolio";
import { Reveal, SectionHeading } from "./ui";

const timeline = [
  { year: "2024", text: "Joined PCU Developers Club — now Design Head, owning the club's visual and experience direction." },
  { year: "2024", text: "Joined PCU Cultural Club — now Technical Head, leading its digital platform rebuild." },
  { year: "2025", text: "Event Lead for PCU Pitch Fest 2.0, the university's flagship pitch event." },
  { year: "2026", text: "Building AgriSaarthi for Smart India Hackathon — an AI farming companion." },
];

export function About() {
  return (
    <section id="about" className="scroll-mt-16 bg-paper text-ink">
      <div className="mx-auto max-w-[1440px] px-6 py-[12vh] md:px-12 md:py-[14vh]">
        <SectionHeading index="01" label="About" title={["How I", "think & build"]} />

        <div className="mt-16 grid gap-12 md:grid-cols-12 md:gap-8">
          {/* editorial body copy */}
          <div className="md:col-span-7">
            {profile.about.map((para, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p
                  className={`mb-8 leading-[1.7] text-ink/80 ${
                    i === 0
                      ? "font-display text-2xl font-medium leading-snug text-ink md:text-3xl"
                      : "text-[1.0625rem]"
                  }`}
                >
                  {para}
                </p>
              </Reveal>
            ))}

            {/* fact strip */}
            <Reveal delay={0.1}>
              <dl className="mt-12 grid grid-cols-1 gap-px bg-ink/10 sm:grid-cols-3">
                {[
                  { k: "Degree", v: profile.degree },
                  { k: "University", v: profile.university },
                  { k: "CGPA", v: profile.cgpa },
                ].map((f) => (
                  <div key={f.k} className="bg-paper p-6">
                    <dt className="font-mono text-xs uppercase tracking-[0.25em] text-ink/50">
                      {f.k}
                    </dt>
                    <dd className="mt-3 font-display text-xl font-medium leading-snug">
                      {f.v}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* interests + timeline, offset column */}
          <div className="md:col-span-4 md:col-start-9 md:pt-24">
            <Reveal>
              <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-ink/50">
                Interests
              </h3>
              <ul className="mt-6 space-y-0 border-t border-ink/15">
                {profile.interests.map((it) => (
                  <li
                    key={it}
                    className="border-b border-ink/15 py-4 font-display text-lg"
                  >
                    <span className="mr-3 text-accent">·</span>
                    {it}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1}>
              <h3 className="mt-14 font-mono text-xs uppercase tracking-[0.3em] text-ink/50">
                Path so far
              </h3>
              <ol className="mt-6 space-y-8 border-l border-ink/15 pl-6">
                {timeline.map((t) => (
                  <li key={t.year + t.text} className="relative">
                    <span
                      aria-hidden="true"
                      className="absolute -left-[31px] top-1 h-2.5 w-2.5 rounded-full bg-accent"
                    />
                    <p className="font-mono text-sm text-accent">{t.year}</p>
                    <p className="mt-1 text-[1.0625rem] leading-relaxed text-ink/80">
                      {t.text}
                    </p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
