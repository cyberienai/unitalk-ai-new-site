"use client";

import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";

const accent = "#FFFFFF";

export default function ElonMuskPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Navbar />

      {/* HERO */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-36">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <p className="font-mono text-xs tracking-[0.3em] uppercase text-white/40">
                Tesla · SpaceX · xAI
              </p>
              <h1 className="mt-4 font-sans text-5xl font-black leading-[1.05] md:text-7xl">
                <span style={{ color: accent }}>Elon Musk</span>
                <br />
                <span className="text-white/60">First Principles.</span>
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/50">
                The most consequential technologist of the 21st century. Tesla electrified transport. SpaceX made
                rockets reusable. xAI open-sourced Grok. Every move rewrites the rules — because he deletes the old ones first.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full border border-white/20 px-4 py-1.5 font-mono text-xs text-white/50">
                  GROK OPEN SOURCE
                </span>
                <span className="rounded-full border border-white/20 px-4 py-1.5 font-mono text-xs text-white/50">
                  MEMPHIS SUPERCLUSTER
                </span>
                <span className="rounded-full border border-white/20 px-4 py-1.5 font-mono text-xs text-white/50">
                  200K H100 GPUs
                </span>
              </div>
            </div>
            <div className="relative flex items-center justify-center">
              <div
                className="absolute inset-0 rounded-full opacity-20 blur-3xl"
                style={{ background: accent }}
              />
              <div className="relative flex h-56 w-56 items-center justify-center rounded-full border-2 border-white/20 bg-[#111] md:h-72 md:w-72">
                {/* ELON MUSK AVATAR */}
                <svg viewBox="0 0 200 200" className="h-full w-full p-8">
                  <defs>
                    <clipPath id="em-circle">
                      <circle cx="100" cy="100" r="95" />
                    </clipPath>
                  </defs>
                  <circle cx="100" cy="100" r="100" fill="#0A0A0A" />
                  {/* Elon Musk simplified face */}
                  <g clipPath="url(#em-circle)" fill="white" opacity="0.9">
                    {/* Head */}
                    <ellipse cx="100" cy="85" rx="52" ry="58" />
                    {/* Hair */}
                    <ellipse cx="100" cy="48" rx="50" ry="35" />
                    <rect x="45" y="30" width="110" height="25" rx="10" />
                    {/* Eyes */}
                    <circle cx="78" cy="82" r="7" fill="#0A0A0A" />
                    <circle cx="122" cy="82" r="7" fill="#0A0A0A" />
                    {/* Smirk */}
                    <path d="M70 115 Q100 130 130 112" stroke="#0A0A0A" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                  </g>
                  {/* Border ring glow */}
                  <circle cx="100" cy="100" r="98" fill="none" stroke="white" strokeWidth="2" opacity="0.15" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* METRICS — horizontal stat cards */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-px bg-white/10 md:grid-cols-4">
            {[
              { value: "$800B+", label: "Tesla Market Cap" },
              { value: "450+", label: "SpaceX Launches" },
              { value: "200K", label: "H100 GPUs (xAI)" },
              { value: "13K+", label: "Starlink Satellites" },
            ].map((stat, i) => (
              <div key={i} className="bg-[#0A0A0A] p-6 md:p-8">
                <p
                  className="font-sans text-4xl font-black md:text-5xl"
                  style={{ color: accent }}
                >
                  {stat.value}
                </p>
                <p className="mt-2 font-mono text-xs text-white/40">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY — bento grid */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-mono text-xs tracking-[0.3em] uppercase text-white/30">
            Philosophy
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-colors hover:border-white/30">
              <p className="font-mono text-xs text-white/20">01</p>
              <h3 className="mt-3 font-sans text-xl font-bold" style={{ color: accent }}>
                First Principles
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/50">
                Boil things down to fundamental truths. Reason up from there. Physics
                doesn&apos;t care about your analogies.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-colors hover:border-white/30">
              <p className="font-mono text-xs text-white/20">02</p>
              <h3 className="mt-3 font-sans text-xl font-bold" style={{ color: accent }}>
                Delete the Part
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/50">
                If you&apos;re not adding things back in 10% of the time, you&apos;re not
                deleting enough. Every part must justify its existence.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-colors hover:border-white/30">
              <p className="font-mono text-xs text-white/20">03</p>
              <h3 className="mt-3 font-sans text-xl font-bold" style={{ color: accent }}>
                The Algorithm
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/50">
                Question every requirement. Delete any process step you can. Simplify,
                then optimize. Accelerate cycle time. Finally, automate.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-colors hover:border-white/30 md:col-span-2">
              <p className="font-mono text-xs text-white/20">04</p>
              <h3 className="mt-3 font-sans text-xl font-bold" style={{ color: accent }}>
                Make It Work, Then Make It Open
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/50">
                Grok was built inside xAI — a company that didn&apos;t exist two years ago.
                Now it&apos;s open-source. The Memphis supercluster trains on 200,000 H100s.
                Speed of execution beats incumbency.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-colors hover:border-white/30">
              <p className="font-mono text-xs text-white/20">05</p>
              <h3 className="mt-3 font-sans text-xl font-bold" style={{ color: accent }}>
                Multi-Planetary
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/50">
                Consciousness is rare. Making life interplanetary is the ultimate
                insurance policy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-mono text-xs tracking-[0.3em] uppercase text-white/30">
            Timeline
          </h2>
          <div className="relative mt-10 border-l border-white/10 pl-8">
            {[
              { year: "2002", event: "Founded SpaceX", detail: "Reusable rockets. Falcon 9 lands on a drone ship." },
              { year: "2004", event: "Joined Tesla", detail: "Led Series A. Became CEO in 2008. Model 3, Y, Cybertruck." },
              { year: "2015", event: "Founded OpenAI", detail: "Co-founded. Left board in 2018. The spark that ignited the industry." },
              { year: "2022", event: "Acquired Twitter / X", detail: "$44B deal. Became the global town square." },
              { year: "2023", event: "Founded xAI", detail: "Grok. Memphis supercluster. Open-source AI at scale." },
              { year: "2024", event: "Grok goes open source", detail: "Apache 2.0. A counterweight to closed frontier models." },
            ].map((item, i) => (
              <div key={i} className="relative mb-10 last:mb-0">
                <div
                  className="absolute -left-[33px] top-1 h-3 w-3 rounded-full border-2 border-white/20 bg-[#0A0A0A]"
                  style={{ borderColor: accent }}
                />
                <p className="font-mono text-xs" style={{ color: accent }}>
                  {item.year}
                </p>
                <h3 className="mt-1 font-sans text-lg font-bold text-white/90">
                  {item.event}
                </h3>
                <p className="mt-1 text-sm text-white/40">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-10">
            <p className="font-serif text-2xl italic leading-relaxed text-white/70 md:text-3xl">
              &ldquo;When something is important enough, you do it even if the odds are
              not in your favor.&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-4">
              <div
                className="h-10 w-10 rounded-full"
                style={{ background: accent, opacity: 0.3 }}
              />
              <div>
                <p className="font-sans font-bold text-white/80">Elon Musk</p>
                <p className="font-mono text-xs text-white/30">CEO, Tesla · SpaceX · xAI</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center">
          <h2 className="font-sans text-3xl font-black md:text-5xl">
            <span style={{ color: accent }}>Build like Elon.</span>
            <br />
            <span className="text-white/30">Start with Unitalk.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-white/40">
            Deploy AI agents that reason from first principles. Delete the parts
            that don&apos;t matter. Automate the rest.
          </p>
          <a
            href="/paul-graham"
            className="mt-8 inline-block rounded-full border px-10 py-4 font-mono text-sm font-bold uppercase tracking-[0.2em] transition-all hover:scale-105"
            style={{ borderColor: accent, color: accent }}
          >
            Get Started
          </a>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}