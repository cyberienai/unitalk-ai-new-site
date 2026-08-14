"use client";

import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";

const accent = "#DC294F";

export default function YannLechellePage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Navbar />

      {/* HERO — large type with diagonal stripe */}
      <section className="relative overflow-hidden border-t border-white/10">
        <div
          className="absolute right-0 top-0 h-full w-1/3 opacity-[0.04]"
          style={{
            background: `repeating-linear-gradient(-45deg, ${accent}, ${accent} 2px, transparent 2px, transparent 12px)`,
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-36">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-white/40">
            Scaleway · CEO
          </p>
          <h1 className="mt-4 font-sans text-5xl font-black leading-[1.05] md:text-7xl">
            <span style={{ color: accent }}>Yann Lechelle</span>
            <br />
            <span className="text-white/60">Bare metal GPU.</span>
            <br />
            <span className="text-white/30">European cloud sovereignty.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/50">
            While the world outsourced its AI infrastructure to AWS and GCP, Scaleway built
            a European alternative — bare-metal GPU servers, sovereign cloud, and an API-first
            ecosystem that doesn&apos;t answer to the US Cloud Act.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-full border px-4 py-1.5 font-mono text-xs text-white/50" style={{ borderColor: accent + "60" }}>
              BARE METAL GPU
            </span>
            <span className="rounded-full border px-4 py-1.5 font-mono text-xs text-white/50" style={{ borderColor: accent + "60" }}>
              SOVEREIGN CLOUD
            </span>
            <span className="rounded-full border px-4 py-1.5 font-mono text-xs text-white/50" style={{ borderColor: accent + "60" }}>
              GDPR NATIVE
            </span>
            <span className="rounded-full border px-4 py-1.5 font-mono text-xs text-white/50" style={{ borderColor: accent + "60" }}>
              API FIRST
            </span>
          </div>
        </div>
      </section>

      {/* METRICS — big numbers grid */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-px bg-white/10 sm:grid-cols-2 md:grid-cols-4">
            {[
              { value: "€200M+", label: "Annual Revenue" },
              { value: "6", label: "Data Centers (EU)" },
              { value: "150K+", label: "Clients" },
              { value: "100%", label: "European Owned" },
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

      {/* PILLARS — horizontal cards */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-mono text-xs tracking-[0.3em] uppercase text-white/30">
            Sovereignty Pillars
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                num: "I",
                title: "Physical Infrastructure",
                body: "Data centers in France, Netherlands, Poland. Owned and operated by Scaleway. Not a reseller of someone else's cloud.",
              },
              {
                num: "II",
                title: "Bare Metal GPU",
                body: "NVIDIA H100, L40S, and A100. Direct hardware access. No virtualization tax. No noisy neighbors. Full performance.",
              },
              {
                num: "III",
                title: "Legal Jurisdiction",
                body: "European law. GDPR compliance by design. No US Cloud Act. No FISA 702. Your data doesn't leave the continent.",
              },
              {
                num: "IV",
                title: "Open Ecosystem",
                body: "Kubernetes native. S3-compatible object storage. Terraform providers. No proprietary APIs. No lock-in.",
              },
              {
                num: "V",
                title: "AI-Native Cloud",
                body: "GPU clusters provisioned in minutes. Pre-configured ML stacks. Inference endpoints with European latency.",
              },
              {
                num: "VI",
                title: "Cost Control",
                body: "Predictable pricing. No egress fees. Reserved instances up to 40% cheaper. The cloud that respects your budget.",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all hover:border-white/30"
                style={{ borderTopWidth: "3px", borderTopColor: accent }}
              >
                <p className="font-mono text-3xl font-black" style={{ color: accent }}>
                  {card.num}
                </p>
                <h3 className="mt-3 font-sans text-lg font-bold text-white/90">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-mono text-xs tracking-[0.3em] uppercase text-white/30">
            Why Europe Needs Scaleway
          </h2>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="pb-3 font-mono text-xs text-white/30">FEATURE</th>
                  <th className="pb-3 font-mono text-xs text-white/30">SCALEWAY</th>
                  <th className="pb-3 font-mono text-xs text-white/30">AWS / GCP / AZURE</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Jurisdiction", "EU law", "US law (Cloud Act)"],
                  ["GDPR Compliance", "Native", "Add-on / Shared Responsibility"],
                  ["Egress Fees", "None / Low", "Up to $0.09/GB"],
                  ["GPU Access", "Bare metal in minutes", "Virtualized, limited availability"],
                  ["API Lock-in", "Open standards (S3, K8s)", "Proprietary APIs"],
                  ["Data Residency", "Guaranteed EU", "Optional, extra cost"],
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white/5 transition-colors hover:bg-white/[0.02]">
                    <td className="py-3 font-mono text-xs text-white/50">{row[0]}</td>
                    <td className="py-3 font-bold" style={{ color: accent }}>
                      {row[1]}
                    </td>
                    <td className="py-3 text-white/30">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-10">
            <p className="font-serif text-2xl italic leading-relaxed text-white/70 md:text-3xl">
              &ldquo;Europe cannot outsource its cloud to Silicon Valley. AI is too
              strategic. We need infrastructure we control, on our terms, under our laws.&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-4">
              <div
                className="h-10 w-10 rounded-full"
                style={{ background: accent, opacity: 0.3 }}
              />
              <div>
                <p className="font-sans font-bold text-white/80">Yann Lechelle</p>
                <p className="font-mono text-xs text-white/30">CEO, Scaleway</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center">
          <h2 className="font-sans text-3xl font-black md:text-5xl">
            <span style={{ color: accent }}>Sovereignty matters.</span>
            <br />
            <span className="text-white/30">Deploy on European soil.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-white/40">
            Unitalk AI agents run on sovereign infrastructure. European hosting.
            GDPR compliance. No US jurisdiction.
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