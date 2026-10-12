import { navLabels, profile } from "../data/portfolio";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-paper/10 bg-ink text-paper">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-6 py-12 md:flex-row md:items-center md:justify-between md:px-12">
        <p className="font-display text-xl font-bold uppercase tracking-tight">
          {profile.name}
          <span className="text-accent">.</span>
        </p>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {navLabels.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className="font-mono text-xs uppercase tracking-[0.2em] text-paper/50 transition-colors hover:text-accent"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-paper/40">
          © {year} {profile.name} · Built with React
        </p>
      </div>
    </footer>
  );
}
