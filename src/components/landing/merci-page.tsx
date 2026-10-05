"use client";

import Image from "next/image";
import { useState } from "react";
import { ButtonLink, ComparisonTable, MuxCard } from "../page/ui";
import { CountUp, FadeIn, RevealHeading } from "../site/reveal";
import { ANCHOR, CALENDLY_ARTHUR, merci } from "./merci-content";

/**
 * /merci-2: the /merci landing page (after the Meta lead form) with the same blocks and copy, in the
 * site's design system. Landing page rules kept from /merci: no site navigation, every call to action
 * scrolls to Arthur's calendar, no outbound link except the legal pages and socials in the footer.
 */
export function MerciPage() {
  return (
    <>
      <Bar />
      <main>
        <Hero />
        <Logos />
        <Stats />
        <Videos />
        <Diagnostic />
        <Gallery />
        <Projects />
        <Who />
        <Reviews />
        <How />
        <FaqBlock />
        <Final />
      </main>
      <Footer />
    </>
  );
}

const pad = (n: number) => String(n).padStart(2, "0");

function Header({ eyebrow, title, sub, tone = "dark", center = false }: { eyebrow?: string; title: string; sub?: string; tone?: "dark" | "light"; center?: boolean }) {
  const light = tone === "light";
  return (
    <div className={center ? "mx-auto max-w-4xl text-center" : "grid gap-6 md:grid-cols-[1fr_auto] md:items-end"}>
      <div>
        {eyebrow && <p className={`eyebrow ${light ? "text-brand-deep" : "text-brand-sky"}`}>{eyebrow}</p>}
        <RevealHeading
          text={title}
          accentClassName={`italic ${light ? "text-brand-deep" : "text-brand-sky"}`}
          className={`mt-4 font-serif text-5xl leading-[0.95] md:text-7xl ${center ? "mx-auto" : "max-w-4xl"}`}
        />
      </div>
      {sub && (
        <FadeIn>
          <p className={`${center ? "mx-auto mt-6 max-w-xl" : "max-w-sm"} ${light ? "text-ink/60" : "text-white/55"}`}>{sub}</p>
        </FadeIn>
      )}
    </div>
  );
}

function Bar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-5 pt-4 md:px-10">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-night/70 py-2 pl-6 pr-2 backdrop-blur-xl">
        <Image src="/images/techflow-logo.svg" alt="TechFlow" width={179} height={36} preload className="h-6 w-auto md:h-7" />
        <ButtonLink href={ANCHOR} className="h-12 text-sm">
          {merci.cta}
        </ButtonLink>
      </div>
    </header>
  );
}

function Hero() {
  const h = merci.hero;
  return (
    <section className="grain relative overflow-hidden bg-night px-5 pb-20 pt-32 text-white md:px-10 md:pb-28 md:pt-36">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-brand/25 blur-[140px]" />
      <div className="relative mx-auto max-w-5xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.14em] text-white/80">
          <span className="size-1.5 rounded-full bg-brand-sky" /> {h.eyebrow}
        </span>
        <h1 className="mt-7 font-serif text-[2.6rem] leading-[1] tracking-[-0.02em] md:text-6xl lg:text-[4.5rem]">
          {h.line1}
          <span className="block italic text-brand-sky">{h.line2}</span>
        </h1>
        <FadeIn>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60">
            {h.text[0]} {h.text[1]}
          </p>
          <p className="mt-4 font-medium text-white">{h.strong}</p>
        </FadeIn>
      </div>

      <div id="rendez-vous" className="relative mx-auto mt-10 max-w-5xl scroll-mt-28">
        <FadeIn className="overflow-hidden rounded-[2rem] border border-white/10 bg-white shadow-[0_40px_120px_-30px_rgba(71,102,255,0.45)]">
          <iframe
            src={`${CALENDLY_ARTHUR}?${new URLSearchParams({
              embed_type: "Inline",
              embed_domain: "techflow-agency.com",
              hide_gdpr_banner: "1",
              hide_landing_page_details: "1",
              primary_color: "4766ff",
              background_color: "ffffff",
              text_color: "070b22",
            })}`}
            title="Réserver un rendez-vous avec Arthur"
            loading="lazy"
            className="block h-[1000px] w-full md:h-[700px]"
          />
        </FadeIn>
        <p className="mt-5 text-center text-sm text-white/55">
          {merci.calendly.fallback}{" "}
          <a href={CALENDLY_ARTHUR} target="_blank" rel="noopener noreferrer" className="text-brand-sky underline underline-offset-4 hover:text-white">
            {merci.calendly.open}
          </a>
        </p>
      </div>
    </section>
  );
}

function Logos() {
  const items = merci.logos.items;
  return (
    <section className="bg-night pb-20 text-white">
      <p className="eyebrow text-center text-white/60">{merci.logos.label}</p>
      <div className="mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <ul className="flex w-max animate-marquee items-center gap-14 md:gap-20">
          {[...items, ...items].map((logo, i) => (
            <li key={i} aria-hidden={i >= items.length} className="shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element -- client logos of mixed formats (svg/png), sized by height */}
              <img src={logo.src} alt={i < items.length ? logo.name : ""} loading="lazy" className="h-8 w-auto object-contain opacity-60 brightness-0 invert transition-opacity hover:opacity-100 md:h-9" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="rounded-[2.5rem] bg-paper px-5 py-20 text-ink md:rounded-[4rem] md:px-10 md:py-28">
      <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
        {merci.stats.map((s, i) => (
          <FadeIn key={s.label} delay={i * 0.06} className="border-t border-ink/15 pt-6">
            <dd className="font-serif text-6xl leading-none tracking-[-0.02em] md:text-7xl">
              <CountUp value={s.value} />
            </dd>
            <dt className="mt-4 max-w-[16rem] text-sm text-ink/60">{s.label}</dt>
          </FadeIn>
        ))}
      </dl>
    </section>
  );
}

function Videos() {
  const v = merci.videos;
  return (
    <section className="bg-night px-5 py-20 text-white md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <Header title={v.title} sub={v.sub} />
        <ul className="mt-16 grid gap-5 sm:grid-cols-3">
          {v.items.map((item, i) => (
            <FadeIn as="li" key={item.playbackId} delay={i * 0.08}>
              <MuxCard item={{ kind: "video", ...item }} className="w-full" />
            </FadeIn>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Diagnostic() {
  const d = merci.diagnostic;
  return (
    <section className="rounded-[2.5rem] bg-paper px-5 py-20 text-ink md:rounded-[4rem] md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <Header eyebrow={d.eyebrow} title={d.title} tone="light" />
        <ol className="mt-16 grid gap-5 md:grid-cols-3">
          {d.items.map((item, i) => (
            <FadeIn as="li" key={item.title} delay={i * 0.08} className="flex flex-col rounded-[2rem] border border-ink/10 bg-white p-8">
              <span className="font-mono text-xs text-brand-deep">({pad(i + 1)})</span>
              <h3 className="mt-10 font-serif text-3xl leading-tight">{item.title}</h3>
              <p className="mt-4 text-ink/60">{item.text}</p>
            </FadeIn>
          ))}
        </ol>
        <FadeIn className="mt-12 flex justify-center">
          <ButtonLink href={ANCHOR} variant="dark">
            {merci.cta}
          </ButtonLink>
        </FadeIn>
      </div>
    </section>
  );
}

function Gallery() {
  const g = merci.gallery;
  return (
    <section className="overflow-hidden bg-night py-20 text-white md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <Header eyebrow={g.eyebrow} title={g.title} sub={g.sub} />
      </div>
      <div className="mt-16 space-y-5">
        {g.rows.map((row, r) => (
          <ul key={r} className={`flex w-max gap-5 ${r ? "animate-marquee-reverse" : "animate-marquee"}`}>
            {[...row, ...row].map((src, i) => (
              <li key={i} aria-hidden={i >= row.length} className="relative aspect-[16/10] w-72 shrink-0 overflow-hidden rounded-2xl border border-white/10 md:w-96">
                <Image src={src} alt="" fill sizes="(min-width: 768px) 384px, 288px" className="object-cover object-top" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  const p = merci.projects;
  const c = merci.compare;
  return (
    <section className="rounded-[2.5rem] bg-paper px-5 py-20 text-ink md:rounded-[4rem] md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <Header eyebrow={p.eyebrow} title={p.title} sub={p.sub} tone="light" />
        <ul className="mt-16 grid gap-5 lg:grid-cols-3">
          {p.items.map((item, i) => (
            <FadeIn as="li" key={item.name} delay={i * 0.08} className="group flex flex-col overflow-hidden rounded-[2rem] border border-ink/10 bg-white">
              <div className="relative aspect-[4/3] overflow-hidden bg-ink/5">
                <Image src={item.image} alt={item.name} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]" />
              </div>
              <div className="flex flex-1 flex-col p-7">
                <span className="eyebrow text-brand-deep">{item.sector}</span>
                <h3 className="mt-3 font-serif text-3xl leading-tight">{item.name}</h3>
                <p className="mt-3 text-ink/60">{item.text}</p>
                <dl className="mt-auto grid grid-cols-3 gap-3 border-t border-ink/10 pt-6">
                  {item.metrics.map(([value, label]) => (
                    <div key={label}>
                      <dd className="font-serif text-3xl leading-none text-brand-deep">{value}</dd>
                      <dt className="mt-2 text-xs text-ink/60">{label}</dt>
                    </div>
                  ))}
                </dl>
              </div>
            </FadeIn>
          ))}
        </ul>
        <FadeIn className="mt-12 flex justify-center">
          <ButtonLink href={ANCHOR} variant="dark">
            {p.cta}
          </ButtonLink>
        </FadeIn>

        <div className="mt-36">
          <Header eyebrow={c.criterion} title={c.title} sub={c.sub} tone="light" />
          <FadeIn className="mt-14">
            <ComparisonTable rows={c.rows} columns={c.columns} />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function Who() {
  const w = merci.who;
  return (
    <section className="bg-night px-5 py-20 text-white md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <Header eyebrow={w.eyebrow} title={w.title} />
        <ul className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {w.cards.map((card, i) => (
            <FadeIn as="li" key={card.title} delay={i * 0.06} className="rounded-[2rem] border border-white/10 bg-night-soft p-8">
              <span className="font-mono text-xs text-brand-sky">({pad(i + 1)})</span>
              <h3 className="mt-10 font-serif text-3xl leading-tight">{card.title}</h3>
              <p className="mt-4 text-white/55">{card.text}</p>
            </FadeIn>
          ))}
          <FadeIn as="li" delay={0.18} className="flex flex-col rounded-[2rem] bg-brand-deep p-8">
            <h3 className="font-serif text-3xl leading-tight">{w.highlight.title}</h3>
            <p className="mt-4 text-white/80">{w.highlight.text}</p>
            <a href={ANCHOR} className="group mt-auto flex items-center justify-between gap-4 pt-10 font-medium">
              {w.highlight.cta.replace(" ↗", "")}
              <span className="flex size-10 items-center justify-center rounded-full bg-white text-brand-deep transition-transform group-hover:-rotate-45">→</span>
            </a>
          </FadeIn>
        </ul>
      </div>
    </section>
  );
}

function Reviews() {
  const r = merci.reviews;
  const initials = (name: string) => name.split(" ").map((w) => w[0]).slice(0, 2).join("");
  return (
    <section className="rounded-[2.5rem] bg-paper px-5 py-20 text-ink md:rounded-[4rem] md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <Header eyebrow={r.eyebrow} title={r.title} sub={r.sub} tone="light" />
        <ul className="mt-16 gap-5 sm:columns-2 lg:columns-3">
          {r.items.map((item) => (
            <li key={item.name} className="mb-5 break-inside-avoid">
              <FadeIn>
                <figure className="rounded-[2rem] border border-ink/10 bg-white p-7">
                  <div aria-label="5 étoiles" className="text-sm tracking-[0.2em] text-brand-deep">★★★★★</div>
                  <blockquote className="mt-4 text-ink/80">{item.quote}</blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-ink/10 pt-5">
                    {item.photo ? (
                      <Image src={item.photo} alt="" width={44} height={44} className="size-11 rounded-full object-cover" />
                    ) : (
                      <span className="flex size-11 items-center justify-center rounded-full bg-brand-deep font-serif text-lg text-white">{initials(item.name)}</span>
                    )}
                    <span>
                      <span className="block font-medium">{item.name}</span>
                      <span className="block text-sm text-ink/60">{item.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </FadeIn>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function How() {
  const h = merci.how;
  return (
    <section className="bg-night px-5 pt-20 text-white md:px-10 md:pt-32">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="eyebrow text-brand-sky">{h.eyebrow}</p>
          <RevealHeading text={h.title} className="mt-4 font-serif text-5xl leading-[0.95] md:text-7xl" />
        </div>
        <ol className="border-b border-white/10">
          {h.items.map((item, i) => (
            <FadeIn as="li" key={item.title} className="grid grid-cols-[4rem_1fr] gap-2 border-t border-white/10 py-9">
              <span className="flex size-11 items-center justify-center rounded-full bg-brand font-mono text-sm">{pad(i + 1)}</span>
              <div>
                <h3 className="font-serif text-3xl leading-tight md:text-4xl">{item.title}</h3>
                <p className="mt-3 max-w-lg text-white/55">{item.text}</p>
              </div>
            </FadeIn>
          ))}
        </ol>
      </div>
    </section>
  );
}

function FaqBlock() {
  const f = merci.faq;
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-night px-5 py-20 text-white md:px-10 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="eyebrow text-brand-sky">{f.eyebrow}</p>
          <RevealHeading text={f.title} className="mt-4 font-serif text-[2.75rem] leading-[0.95] md:text-[3.5rem]" />
        </div>
        <ul className="border-t border-white/10">
          {f.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q} className="border-b border-white/10">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-center justify-between gap-6 py-6 text-left text-lg md:text-xl"
                >
                  <span className={`transition-colors ${isOpen ? "text-white" : "text-white/70 group-hover:text-white"}`}>{item.q}</span>
                  <span
                    className={`flex size-10 shrink-0 items-center justify-center rounded-full border text-xl transition-[transform,background-color,border-color] duration-300 ${
                      isOpen ? "rotate-45 border-brand bg-brand text-white" : "border-white/20 text-brand-sky"
                    }`}
                  >
                    +
                  </span>
                </button>
                <div className={`grid transition-[grid-template-rows] duration-500 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-7 pr-12 text-white/60">{item.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function Final() {
  const f = merci.final;
  return (
    <section className="bg-night px-5 pb-20 md:px-10 md:pb-28">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-brand-deep px-6 py-20 text-center text-white md:rounded-[4rem] md:py-28">
        <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 size-[30rem] rounded-full bg-brand-sky/30 blur-[120px]" />
        <div className="relative">
          <RevealHeading text={f.title} accentClassName="italic text-white/75" className="mx-auto max-w-4xl font-serif text-5xl leading-[0.95] tracking-[-0.02em] md:text-7xl" />
          <FadeIn>
            <p className="mx-auto mt-8 max-w-2xl text-lg text-white/85">{f.sub}</p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <ButtonLink href={ANCHOR}>{f.primary}</ButtonLink>
              <ButtonLink href={ANCHOR} variant="outline">
                {f.secondary}
              </ButtonLink>
            </div>
            <p className="mt-6 text-sm text-white/70">{f.mention}</p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const f = merci.footer;
  return (
    <footer className="bg-night px-5 pb-10 text-white md:px-10">
      <div className="mx-auto max-w-7xl border-t border-white/10 pt-16">
        <Image src="/images/techflow-logo.svg" alt="TechFlow" width={179} height={36} className="h-auto w-full max-w-5xl opacity-90" />
        <div className="mt-12 flex flex-col gap-6 text-sm text-white/55 md:flex-row md:items-center md:justify-between">
          <span>{f.credit}</span>
          <nav aria-label="Liens légaux" className="flex flex-wrap gap-x-6 gap-y-2">
            {f.legal.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener" className="hover:text-white">
                {l.label}
              </a>
            ))}
          </nav>
          <nav aria-label="Réseaux sociaux" className="flex gap-3">
            {f.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="flex size-10 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-brand hover:bg-brand hover:text-white">
                {s.label === "Instagram" ? (
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                    <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
                    <circle cx="12" cy="12" r="4.2" />
                    <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
                    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM2.9 21h4.2V9.4H2.9V21Zm7.1 0h4.2v-6.3c0-1.7.32-3.3 2.42-3.3 2.07 0 2.1 1.9 2.1 3.4V21h4.2v-7c0-3.9-.84-6.9-5.4-6.9-2.19 0-3.66 1.2-4.26 2.34h-.06V9.4H10V21Z" />
                  </svg>
                )}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
