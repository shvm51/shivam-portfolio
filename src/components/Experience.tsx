import { experiences } from "../data/portfolio";
import { Reveal, SectionHeading } from "./ui";

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-16 bg-ink text-paper">
      <div className="mx-auto max-w-[1440px] px-6 py-[12vh] md:px-12 md:py-[14vh]">
        <SectionHeading
          dark
          index="04"
          label="Experience & leadership"
          title={["Leading", "beyond code"]}
        />

        <div className="mt-16">
          {experiences.map((exp, i) => (
            <Reveal key={exp.role + exp.org} delay={i * 0.06}>
              <article className="grid gap-6 border-t border-paper/15 py-12 md:grid-cols-12 md:gap-8 md:py-16">
                <div className="md:col-span-1">
                  <span className="font-mono text-sm text-accent">0{i + 1}</span>
                </div>
                <div className="md:col-span-5">
                  <h3 className="font-display text-3xl font-bold uppercase tracking-tight md:text-4xl">
                    {exp.role}
                  </h3>
                  <p className="mt-2 font-serif text-lg italic text-paper/60">
                    {exp.org}
                  </p>
                </div>
                <div className="md:col-span-4">
                  <p className="leading-[1.7] text-paper/70">{exp.description}</p>
                  <ul className="mt-5 space-y-2">
                    {exp.highlights.map((hl) => (
                      <li key={hl} className="flex gap-3 text-paper/70">
                        <span aria-hidden="true" className="text-accent">→</span>
                        {hl}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="md:col-span-2 md:text-right">
                  <p className="font-mono text-xs uppercase tracking-[0.25em] text-paper/50">
                    {exp.period}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
          <div className="border-t border-paper/15" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
