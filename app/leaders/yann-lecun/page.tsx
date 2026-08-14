"use client";

import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";

const accent = "#0668E1";

export default function YannLeCunPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Navbar />

      {/* HERO — split left/right with large portrait block */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-36">
          <div className="grid gap-16 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="font-mono text-xs tracking-[0.3em] uppercase text-white/40">
                Turing Award 2018 · Chief AI Scientist, Meta
              </p>
              <h1 className="mt-4 font-sans text-5xl font-black leading-[1.05] md:text-7xl">
                <span style={{ color: accent }}>Yann LeCun</span>
                <br />
                <span className="text-white/60">The godfather who refused to close models.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/50">
                He invented ConvNets — the architecture behind every modern vision system.
                He won the Turing Award. And when the industry turned toward walled gardens,
                he doubled down on open-source. Llama is his answer.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full border px-4 py-1.5 font-mono text-xs text-white/50" style={{ borderColor: accent + "40" }}>
                  CONVNETS INVENTOR
                </span>
                <span className="rounded-full border px-4 py-1.5 font-mono text-xs text-white/50" style={{ borderColor: accent + "40" }}>
                  LLAMA OPEN SOURCE
                </span>
                <span className="rounded-full border px-4 py-1.5 font-mono text-xs text-white/50" style={{ borderColor: accent + "40" }}>
                  TURING 2018
                </span>
              </div>
            </div>
            <div className="relative hidden md:block">
              <div
                className="h-64 w-64 rounded-2xl border md:h-80 md:w-80"
                style={{ borderColor: accent, background: accent + "08" }}
              >
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <p className="font-mono text-6xl font-black" style={{ color: accent }}>
                      YLC
                    </p>
                    <p className="mt-2 font-mono text-xs tracking-[0.3em] text-white/30">
                      NYU · META
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MANIFESTO — horizontal scrolling cards feel */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-mono text-xs tracking-[0.3em] uppercase text-white/30">
            The LeCun Doctrine
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                num: "01",
                title: "Open is safer",
                body: "AI is critical infrastructure. It cannot be controlled by three companies in California. Open models allow audit, research, and distributed governance.",
              },
              {
                num: "02",
                title: "Scale is not enough",
                body: "LLMs alone won't reach human-level intelligence. We need world models, planning, and JEPA architectures — not just more tokens.",
              },
              {
                num: "03",
                title: "Science over hype",
                body: "Every claim must be falsifiable. AGI timelines are astrology dressed as engineering. The path forward is scientific, not speculative.",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-all hover:border-white/30"
                style={{ borderLeftWidth: "4px", borderLeftColor: accent }}
              >
                <p className="font-mono text-xs" style={{ color: accent }}>
                  {card.num}
                </p>
                <h3 className="mt-3 font-sans text-xl font-bold text-white/90">
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

      {/* TIMELINE — milestones */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-mono text-xs tracking-[0.3em] uppercase text-white/30">
            A Life in AI
          </h2>
          <div className="mt-10 space-y-1">
            {[
              { year: "1989", event: "ConvNets for ZIP code recognition", detail: "Bell Labs. LeNet. The paper that launched a thousand vision systems." },
              { year: "1998", event: "LeNet-5", detail: "The architecture that proved gradient-based learning could read handwritten checks. Deployed at scale." },
              { year: "2003", event: "NYU Professor", detail: "Founded the Computational and Biological Learning Lab. Silver professor of computer science and neural science." },
              { year: "2013", event: "Director of Facebook AI Research", detail: "Built FAIR from scratch. Open research. Open publishing. No patents. No walls." },
              { year: "2018", event: "Turing Award", detail: "Shared with Hinton and Bengio. 'Conceptual and engineering breakthroughs that made deep neural networks a critical component of computing.'" },
              { year: "2023", event: "Llama 2 — open source", detail: "Meta ships Llama 2. LeCun's vision: 'The future of AI must be open.' 180M+ downloads." },
              { year: "2024", event: "Llama 3 — state of the art", detail: "400B parameters. Open weights. Rivals GPT-4. The open-source movement has a champion." },
            ].map((item, i) => (
              <div
                key={i}
                className="group flex items-start gap-6 border-b border-white/5 px-4 py-5 transition-colors hover:bg-white/[0.02]"
              >
                <p
                  className="w-14 shrink-0 pt-0.5 font-mono text-xs font-bold"
                  style={{ color: accent }}
                >
                  {item.year}
                </p>
                <div>
                  <h3 className="font-sans font-bold text-white/85 group-hover:text-white">
                    {item.event}
                  </h3>
                  <p className="mt-0.5 text-sm text-white/40">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* METRICS STRIP */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex flex-wrap justify-between gap-8">
            {[
              { value: "180M+", label: "Llama Downloads" },
              { value: "400B", label: "Llama 3 Params" },
              { value: "3", label: "Turing Laureates" },
              { value: "25+", label: "Years in AI" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p
                  className="font-sans text-4xl font-black md:text-5xl"
                  style={{ color: accent }}
                >
                  {stat.value}
                </p>
                <p className="mt-1 font-mono text-xs text-white/30">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div
            className="rounded-2xl border p-10"
            style={{ borderColor: accent + "30", background: accent + "08" }}
          >
            <p className="font-serif text-2xl italic leading-relaxed text-white/70 md:text-3xl">
              &ldquo;The idea that you can keep AI technology secret or restricted to a small
              number of companies is a dangerous illusion. AI must be an open platform.&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-4">
              <div
                className="h-10 w-10 rounded-full"
                style={{ background: accent, opacity: 0.3 }}
              />
              <div>
                <p className="font-sans font-bold text-white/80">Yann LeCun</p>
                <p className="font-mono text-xs text-white/30">
                  VP &amp; Chief AI Scientist, Meta
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
            <span style={{ color: accent }}>Open is the future.</span>
            <br />
            <span className="text-white/30">Build with the same conviction.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-white/40">
            Unitalk deploys AI agents on open infrastructure. No vendor lock-in.
            No walled garden. The LeCun way.
          </p>
          <a
            href="/paul-graham"
            className="mt-8 inline-block rounded-full border px-10 py-4 font-mono text-sm font-bold uppercase tracking-[0.2em] transition-all hover:scale-105"
            style={{ borderColor: accent, color: accent }}
          >
            Explore Unitalk
          </a>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}