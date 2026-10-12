import { skillCategories } from "../data/portfolio";
import { Reveal, SectionHeading } from "./ui";

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-16 bg-paper text-ink">
      <div className="mx-auto max-w-[1440px] px-6 py-[12vh] md:px-12 md:py-[14vh]">
        <SectionHeading
          index="03"
          label="Technical expertise"
          title={["Tools of", "the trade"]}
        />
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl font-serif text-xl italic text-ink/60">
            No proficiency bars, no expert claims — just the stack I actually
            build with, grouped by craft.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-x-12 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((cat, ci) => (
            <Reveal key={cat.name} delay={(ci % 3) * 0.08}>
              <div className="border-t-2 border-ink pt-6">
                <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-ink/60">
                  <span className="text-accent">0{ci + 1}</span> · {cat.name}
                </h3>
                <p className="mt-5 font-display text-2xl font-medium leading-snug">
                  {cat.items.join("  ·  ")}
                </p>
                {cat.note && (
                  <p className="mt-4 font-serif text-base italic text-ink/55">
                    {cat.note}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
