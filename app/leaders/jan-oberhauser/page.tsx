"use client";

import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";

const accent = "#EA4B2C";

export default function JanOberhauserPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Navbar />

      {/* HERO — flow-based visual */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-36">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <p className="font-mono text-xs tracking-[0.3em] uppercase text-white/40">
                n8n · Founder &amp; CEO
              </p>
              <h1 className="mt-4 font-sans text-5xl font-black leading-[1.05] md:text-7xl">
                <span style={{ color: accent }}>Jan Oberhauser</span>
                <br />
                <span className="text-white/60">50K stars.</span>
                <br />
                <span className="text-white/30">The open-source Zapier.</span>
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/50">
                He built the workflow automation engine that developers actually want to
                use. Fair-code licensed. Self-hostable. 50,000+ GitHub stars. n8n is
                proof that open-source can beat SaaS in the automation market.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full border px-4 py-1.5 font-mono text-xs" style={{ borderColor: accent + "60", color: accent }}>
                  50K+ STARS
                </span>
                <span className="rounded-full border border-white/20 px-4 py-1.5 font-mono text-xs text-white/50">
                  400+ INTEGRATIONS
                </span>
                <span className="rounded-full border border-white/20 px-4 py-1.5 font-mono text-xs text-white/50">
                  SELF-HOSTED
                </span>
                <span className="rounded-full border border-white/20 px-4 py-1.5 font-mono text-xs text-white/50">
                  FAIR-CODE
                </span>
              </div>
            </div>
            <div className="space-y-2">
              {[
                { node: "Webhook", right: "→", conn: "Trigger" },
                { node: "HTTP Request", right: "→", conn: "Fetch API" },
                { node: "AI Agent", right: "→", conn: "Process with LLM" },
                { node: "IF / Switch", right: "→", conn: "Branch logic" },
                { node: "Slack / Email", right: "→", conn: "Notify" },
                { node: "Database", right: "", conn: "Store result" },
              ].map((flow, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-5 py-3 transition-all hover:border-white/30"
                >
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-bold"
                    style={{ background: accent + "20", color: accent }}
                  >
                    {i + 1}
                  </div>
                  <p className="font-sans text-sm font-bold text-white/80">{flow.node}</p>
                  {flow.right && (
                    <span className="font-mono text-xs text-white/20">{flow.right}</span>
                  )}
                  <p className="ml-auto text-xs text-white/30">{flow.conn}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* METRICS */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-px bg-white/10 sm:grid-cols-2 md:grid-cols-4">
            {[
              { value: "50K+", label: "GitHub Stars" },
              { value: "400+", label: "Integrations" },
              { value: "1M+", label: "Monthly Downloads" },
              { value: "100%", label: "Self-Hostable" },
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

      {/* WHY N8N — side-by-side cards with Zapier contrast */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-mono text-xs tracking-[0.3em] uppercase text-white/30">
            n8n vs The Incumbents
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div
              className="rounded-2xl border bg-white/[0.02] p-8"
              style={{ borderColor: accent + "30" }}
            >
              <div
                className="inline-block rounded-full border px-4 py-1 font-mono text-xs font-bold"
                style={{ borderColor: accent, color: accent }}
              >
                N8N
              </div>
              <ul className="mt-6 space-y-3">
                {[
                  "Code-first: JavaScript in every node",
                  "Self-host on your own server (Docker / K8s)",
                  "No per-operation pricing — unlimited executions",
                  "Fair-code: source available, no vendor lock-in",
                  "AI nodes: LangChain, OpenAI, custom LLMs",
                  "Community: 50K stars, active contributors",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/70">
                    <span style={{ color: accent }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
              <div className="inline-block rounded-full border border-white/20 px-4 py-1 font-mono text-xs text-white/40">
                TRADITIONAL IPAAS
              </div>
              <ul className="mt-6 space-y-3">
                {[
                  "Low-code only — complex logic is painful",
                  "Cloud-only — your data leaves your infrastructure",
                  "Per-task pricing — costs scale with usage",
                  "Proprietary — you can't leave once you're in",
                  "AI as an afterthought — bolted on, limited",
                  "Closed source — trust the black box",
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

      {/* AI AUTOMATION — horizontal cards */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-mono text-xs tracking-[0.3em] uppercase text-white/30">
            The AI Automation Stack
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                icon: "🤖",
                title: "AI Agent Nodes",
                body: "Drop an AI Agent into any workflow. Connect to LLM, give it tools, set memory. Autonomous execution with human-in-the-loop.",
              },
              {
                icon: "🔗",
                title: "LangChain Native",
                body: "Chains, vector stores, document loaders. Full LangChain integration baked into n8n nodes. No extra setup.",
              },
              {
                icon: "🔄",
                title: "Human Approval",
                body: "AI proposes, human approves. Wait nodes, conditional branching, escalation paths. The best of both worlds.",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-all hover:border-white/30"
                style={{ borderLeftColor: accent, borderLeftWidth: "3px" }}
              >
                <p className="text-3xl">{card.icon}</p>
                <h3 className="mt-4 font-sans text-xl font-bold" style={{ color: accent }}>
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

      {/* TESTIMONIAL */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-10">
            <p className="font-serif text-2xl italic leading-relaxed text-white/70 md:text-3xl">
              &ldquo;Automation should be free. Not &apos;free trial&apos; free — actually
              free. You host it. You own it. No one pulls the plug on your workflows.&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-4">
              <div
                className="h-10 w-10 rounded-full"
                style={{ background: accent, opacity: 0.3 }}
              />
              <div>
                <p className="font-sans font-bold text-white/80">Jan Oberhauser</p>
                <p className="font-mono text-xs text-white/30">Founder &amp; CEO, n8n</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center">
          <h2 className="font-sans text-3xl font-black md:text-5xl">
            <span style={{ color: accent }}>Automate everything.</span>
            <br />
            <span className="text-white/30">Own the code that runs your business.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-white/40">
            Unitalk AI agents integrate with n8n workflows. Autonomous agents
            trigger automations. Automations trigger agents.
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