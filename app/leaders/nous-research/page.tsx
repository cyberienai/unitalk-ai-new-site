"use client";

import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";

const accent = "#8B5CF6";

export default function NousResearchPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Navbar />

      {/* HERO — asymmetrical with code block */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-36">
          <div className="grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-center">
            <div>
              <p className="font-mono text-xs tracking-[0.3em] uppercase text-white/40">
                Nous Research · Open-Source AI
              </p>
              <h1 className="mt-4 font-sans text-5xl font-black leading-[1.05] md:text-7xl">
                <span style={{ color: accent }}>Nous Research</span>
              </h1>
              <p className="mt-4 font-sans text-2xl font-bold leading-snug text-white/60 md:text-4xl">
                Hermes.
                <br />
                The open-source agent.
              </p>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/50">
                Founded by Karan Malhotra and a small team of obsessive researchers, Nous
                built Hermes — the open-source agent framework that powers Unitalk itself.
                No corporate parent. No API dependency. Just code.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full border px-4 py-1.5 font-mono text-xs" style={{ borderColor: accent + "60", color: accent }}>
                  HERMES AGENT
                </span>
                <span className="rounded-full border border-white/20 px-4 py-1.5 font-mono text-xs text-white/50">
                  APACHE 2.0
                </span>
                <span className="rounded-full border border-white/20 px-4 py-1.5 font-mono text-xs text-white/50">
                  FULLY OPEN SOURCE
                </span>
              </div>
            </div>
            <div
              className="rounded-2xl border p-1 font-mono text-xs leading-relaxed"
              style={{ borderColor: accent + "30", background: "#0a0a0a" }}
            >
              <div className="rounded-xl bg-[#111] p-5">
                <p className="text-white/30">{">"} pip install hermes-agent</p>
                <p className="mt-2 text-white/50">{">"} hermes config --model llama</p>
                <p className="mt-2" style={{ color: accent }}>{">"} hermes run \\</p>
                <p className="text-white/50">  "Build me an app"</p>
                <p className="mt-2 text-white/20">▌</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MANIFESTO — bold centered */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-sans text-3xl font-black md:text-5xl">
              <span className="text-white/30">Agents should be</span>
              <br />
              <span style={{ color: accent }}>personal, open, and free.</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/50">
              The future of AI is not a single assistant controlled by one company.
              It is millions of specialized agents — running on your machine, under your
              control, sharing what you choose. Nous Research built the foundation for
              that future. No API keys. No telemetry. No gatekeepers.
            </p>
          </div>
        </div>
      </section>

      {/* CAPABILITIES — horizontal scrolling cards */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-mono text-xs tracking-[0.3em] uppercase text-white/30">
            Hermes Capabilities
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: "🧠",
                title: "Reasoning",
                body: "Multi-step reasoning with tool use. Chain-of-thought, tree-of-thought, and agentic loops baked in.",
              },
              {
                icon: "🔧",
                title: "Tool Use",
                body: "Terminal, browser, filesystem, code execution. Hermes can do anything you can do on a computer.",
              },
              {
                icon: "🔌",
                title: "Plugins",
                body: "Extensible architecture. MCP servers, custom tools, API integrations. Build once, use everywhere.",
              },
              {
                icon: "🏠",
                title: "Local First",
                body: "Runs on your machine. Your data never leaves. No cloud dependency. Full privacy by default.",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all hover:border-white/30"
              >
                <p className="text-3xl">{card.icon}</p>
                <h3 className="mt-4 font-sans text-lg font-bold" style={{ color: accent }}>
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

      {/* TIMELINE — vertical */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-mono text-xs tracking-[0.3em] uppercase text-white/30">
            The Hermes Journey
          </h2>
          <div className="relative mt-10 border-l-2 pl-8" style={{ borderColor: accent + "30" }}>
            {[
              { year: "2023", event: "Nous Research Founded", detail: "Karan Malhotra and team begin building open-source AI models and tooling. The mission: decentralized, personal AI." },
              { year: "2024 Q1", event: "Hermes Agent v1", detail: "First release. A CLI agent that reasons, uses tools, and runs locally. Built on top of open models." },
              { year: "2024 Q2", event: "Tool Ecosystem Grows", detail: "Plugins, MCP integration, browser automation, code execution. Hermes becomes a general-purpose agent." },
              { year: "2024 Q3", event: "Community Explosion", detail: "Thousands of developers build on Hermes. Skills system, cron jobs, multi-agent orchestration." },
              { year: "2024 Q4", event: "Desktop App Launch", detail: "Hermes Desktop. Full GUI. Background agents. The agent that works while you sleep." },
              { year: "2025", event: "Unitalk Partnership", detail: "Hermes powers Unitalk's AI collaborators. Enterprise features. The open-source agent goes pro." },
            ].map((item, i) => (
              <div key={i} className="relative mb-10 last:mb-0">
                <div
                  className="absolute -left-[35px] top-1 h-3 w-3 rounded-full border-2 bg-[#0A0A0A]"
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
          <div
            className="rounded-2xl border p-10"
            style={{ borderColor: accent + "30", background: accent + "08" }}
          >
            <p className="font-serif text-2xl italic leading-relaxed text-white/70 md:text-3xl">
              &ldquo;The best AI agents will not be built by corporations. They will be
              built by communities — open, auditable, and answerable only to their users.&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-4">
              <div
                className="h-10 w-10 rounded-full"
                style={{ background: accent, opacity: 0.4 }}
              />
              <div>
                <p className="font-sans font-bold text-white/80">Karan Malhotra</p>
                <p className="font-mono text-xs text-white/30">Founder, Nous Research</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center">
          <h2 className="font-sans text-3xl font-black md:text-5xl">
            <span style={{ color: accent }}>Your agent. Your rules.</span>
            <br />
            <span className="text-white/30">Powered by Hermes. Built by Nous.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-white/40">
            Unitalk runs on Hermes — the open-source agent framework.
            No vendor lock-in. Full transparency. True autonomy.
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