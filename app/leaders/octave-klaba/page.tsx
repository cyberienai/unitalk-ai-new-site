"use client";

import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";

const accent = "#1E90FF";

export default function OctaveKlabaPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Navbar />

      {/* HERO — bold typography with large stat */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-36">
          <div className="grid gap-12 md:grid-cols-2 md:items-end">
            <div>
              <p className="font-mono text-xs tracking-[0.3em] uppercase text-white/40">
                OVHcloud · Founder &amp; Chairman
              </p>
              <h1 className="mt-4 font-sans text-5xl font-black leading-[1.05] md:text-7xl">
                <span style={{ color: accent }}>Octave Klaba</span>
              </h1>
              <p className="mt-4 font-sans text-2xl font-bold leading-snug md:text-4xl" style={{ color: accent }}>
                400,000 servers.
                <br />
                One French founder.
              </p>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/50">
                He started in a garage in Roubaix with €6,000. Twenty-five years later,
                OVHcloud runs 400,000+ servers across 40 data centers — the only European
                hyperscaler that fights AWS, Azure, and GCP on price and sovereignty.
              </p>
            </div>
            <div className="space-y-3">
              {[
                { num: "400K+", label: "Servers deployed" },
                { num: "40", label: "Data centers worldwide" },
                { num: "1.6M", label: "Customers in 140 countries" },
                { num: "€900M", label: "Annual revenue" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b border-white/10 py-4 last:border-0"
                >
                  <p
                    className="font-sans text-3xl font-black"
                    style={{ color: accent }}
                  >
                    {stat.num}
                  </p>
                  <p className="font-mono text-xs text-white/40">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY — cards with icon placeholders */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-mono text-xs tracking-[0.3em] uppercase text-white/30">
            The Klaba Way
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              {
                emoji: "🏭",
                title: "Build It Yourself",
                body: "OVH designs its own servers, water-cooling systems, and data centers. No dependency on Dell, HPE, or any hardware vendor. Vertical integration at cloud scale.",
              },
              {
                emoji: "🇪🇺",
                title: "GDPR Native",
                body: "Data stays in Europe. No US Cloud Act exposure. No Schrems II nightmares. The cloud should respect the law of the land where it operates.",
              },
              {
                emoji: "💰",
                title: "Cloud Is a Commodity",
                body: "Bandwidth, compute, storage — these are utilities now. OVH prices them like utilities. No egress fees. No hidden costs. Just fair infrastructure.",
              },
              {
                emoji: "⚡",
                title: "Speed Over Polish",
                body: "Ship bare-metal servers in 120 seconds. Automate everything. The Klaba motto: 'If it works, ship it. If it breaks, fix it fast.'",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-all hover:border-white/30"
              >
                <p className="text-3xl">{card.emoji}</p>
                <h3
                  className="mt-4 font-sans text-xl font-bold"
                  style={{ color: accent }}
                >
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/50">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AWS COMPARISON — side by side */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-mono text-xs tracking-[0.3em] uppercase text-white/30">
            OVHcloud vs AWS
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
              <div
                className="mb-4 inline-block rounded-full border px-4 py-1 font-mono text-xs font-bold"
                style={{ borderColor: accent, color: accent }}
              >
                OVHCLOUD
              </div>
              <ul className="space-y-3">
                {[
                  "No egress fees — bandwidth included",
                  "Bare-metal servers in 120 seconds",
                  "European data sovereignty (GDPR native)",
                  "Water-cooled data centers — 30% more efficient",
                  "OpenStack compatible",
                  "Price: up to 50% cheaper than hyperscalers",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/70">
                    <span style={{ color: accent }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
              <div className="mb-4 inline-block rounded-full border border-white/20 px-4 py-1 font-mono text-xs font-bold text-white/40">
                AWS HYPERScalers
              </div>
              <ul className="space-y-3">
                {[
                  "Egress fees: up to $0.09/GB",
                  "Bare metal: limited availability, premium pricing",
                  "US jurisdiction (Cloud Act exposure)",
                  "Traditional air cooling",
                  "Proprietary APIs — vendor lock-in",
                  "Price: opaque billing, surprise charges",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/30">
                    <span className="text-white/20">✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-10">
            <p className="font-serif text-2xl italic leading-relaxed text-white/70 md:text-3xl">
              &ldquo;We don&apos;t sell cloud. We sell freedom. Freedom to leave.
              Freedom to own your infrastructure. Freedom from American jurisdiction.&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-4">
              <div
                className="h-10 w-10 rounded-full"
                style={{ background: accent, opacity: 0.3 }}
              />
              <div>
                <p className="font-sans font-bold text-white/80">Octave Klaba</p>
                <p className="font-mono text-xs text-white/30">
                  Founder &amp; Chairman, OVHcloud
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center">
          <h2 className="font-sans text-3xl font-black md:text-5xl">
            <span style={{ color: accent }}>Cloud without the lock-in.</span>
            <br />
            <span className="text-white/30">AI without the monopoly.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-white/40">
            Unitalk runs your agents on sovereign infrastructure. European hosting.
            No egress fees. The Klaba approach.
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