import { achievements } from "../data/portfolio";
import { Reveal, SectionHeading } from "./ui";

export function Achievements() {
  return (
    <section id="achievements" className="scroll-mt-16 bg-paper text-ink">
      <div className="mx-auto max-w-[1440px] px-6 py-[12vh] md:px-12 md:py-[14vh]">
        <SectionHeading
          index="05"
          label="Achievements"
          title={["Milestones", "so far"]}
        />
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl font-serif text-xl italic text-ink/60">
            Verified milestones only — this list grows as new ones are earned.
          </p>
        </Reveal>

        <div className="mt-14">
          {achievements.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.06}>
              <div className="group grid gap-2 border-t border-ink/15 py-8 md:grid-cols-12 md:items-baseline md:gap-8">
                <span className="font-mono text-sm text-accent md:col-span-1">
                  {a.year}
                </span>
                <h3 className="font-display text-2xl font-bold uppercase tracking-tight transition-transform duration-300 group-hover:translate-x-2 md:col-span-6 md:text-3xl">
                  {a.title}
                </h3>
                <p className="text-[1.0625rem] text-ink/65 md:col-span-5">
                  {a.detail}
                </p>
              </div>
            </Reveal>
          ))}
          <div className="border-t border-ink/15" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
