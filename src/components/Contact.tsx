import { ArrowUpRight, Mail } from "lucide-react";
import { contact, profile, socials } from "../data/portfolio";
import { GithubIcon, LineReveal, LinkedinIcon, Magnetic, Reveal, buttonClasses } from "./ui";

export function Contact() {
  const github = socials.find((s) => s.label === "GitHub");
  const linkedin = socials.find((s) => s.label === "LinkedIn");
  const email = profile.email;

  return (
    <section id="contact" className="scroll-mt-16 bg-ink text-paper">
      <div className="mx-auto max-w-[1440px] px-6 py-[14vh] md:px-12 md:py-[18vh]">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-paper/60">
            <span className="text-accent">06</span> — Contact
          </p>
        </Reveal>

        <LineReveal
          as="h2"
          className="mt-8 max-w-5xl font-display font-bold uppercase leading-[0.9] tracking-tight text-[clamp(2.8rem,9vw,8rem)]"
          lines={[
            "Got an idea",
            <>
              worth <span className="text-accent">building?</span>
            </>,
          ]}
        />

        <Reveal delay={0.15}>
          <p className="mt-10 max-w-2xl text-[1.0625rem] leading-[1.7] text-paper/65">
            {contact.subline}
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            {github?.status === "live" && (
              <Magnetic>
                <a
                  href={github.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClasses(true)}
                >
                  <GithubIcon size={16} /> GitHub <ArrowUpRight size={16} />
                </a>
              </Magnetic>
            )}
            {linkedin?.status === "live" ? (
              <Magnetic>
                <a
                  href={linkedin.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClasses(true)}
                >
                  <LinkedinIcon size={16} /> LinkedIn <ArrowUpRight size={16} />
                </a>
              </Magnetic>
            ) : (
              <span className="inline-flex min-h-[44px] items-center gap-2 border border-paper/15 px-6 py-3 font-mono text-sm uppercase tracking-[0.15em] text-paper/35">
                <LinkedinIcon size={16} /> LinkedIn — soon
              </span>
            )}
            {email.status === "live" && email.address ? (
              <Magnetic>
                <a href={`mailto:${email.address}`} className={buttonClasses(true)}>
                  <Mail size={16} /> {email.address} <ArrowUpRight size={16} />
                </a>
              </Magnetic>
            ) : (
              <span className="inline-flex min-h-[44px] items-center gap-2 border border-paper/15 px-6 py-3 font-mono text-sm uppercase tracking-[0.15em] text-paper/35">
                <Mail size={16} /> Email — soon
              </span>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <p className="mt-10 font-serif text-lg italic text-paper/45">
            Email and LinkedIn are on the way — GitHub is the fastest way to
            reach me for now.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
