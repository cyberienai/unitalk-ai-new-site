"use client";

import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";

const accent = "#6366F1";

export default function KrishDholakiaPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Navbar />

      {/* HERO — clean, technical */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-36">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <p className="font-mono text-xs tracking-[0.3em] uppercase text-white/40">
                LiteLLM · Founder
              </p>
              <h1 className="mt-4 font-sans text-5xl font-black leading-[1.05] md:text-7xl">
                <span style={{ color: accent }}>Krish Dholakia</span>
              </h1>
              <p className="mt-4 font-sans text-2xl font-bold leading-snug text-white/60 md:text-4xl">
                The proxy that speaks
                <br />
                <span style={{ color: accent }}>100+ LLM languages.</span>
              </p>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/50">
                Every LLM has a different API. Different auth. Different response format.
                LiteLLM makes them all speak the same language — OpenAI-compatible.
                Used by Nvidia, Microsoft, and thousands of developers who refuse to
                be locked into any single provider.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full border px-4 py-1.5 font-mono text-xs" style={{ borderColor: accent + "60", color: accent }}>
                  100+ PROVIDERS
                </span>
                <span className="rounded-full border border-white/20 px-4 py-1.5 font-mono text-xs text-white/50">
                  OPENAI COMPATIBLE
                </span>
                <span className="rounded-full border border-white/20 px-4 py-1.5 font-mono text-xs text-white/50">
                  10K+ STARS
                </span>
              </div>
            </div>
            <div
              className="rounded-2xl border border-white/10 p-1"
              style={{ background: "#111" }}
            >
              <pre className="overflow-hidden rounded-xl bg-[#111] p-5 font-mono text-[11px] leading-relaxed text-white/50 border border-white/[0.06]">
              {`curl http://localhost:4000/v1/chat/completions \\
                -H "Content-Type: application/json" \\
                -H "Authorization: Bearer sk-litellm-..." \\
                -d '{
                  "model": "openai/gpt-4",
                  "messages": [{"role": "user", "content": "Hello"}]
                }'`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* PROVIDERS — dense grid */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-mono text-xs tracking-[0.3em] uppercase text-white/30">
            100+ Providers, One API
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {[
              "OpenAI", "Anthropic", "Google", "Meta", "Mistral",
              "Cohere", "Together AI", "Anyscale", "Replicate", "Hugging Face",
              "Groq", "Fireworks", "Deepinfra", "Perplexity", "OctoAI",
              "Azure OpenAI", "AWS Bedrock", "Vertex AI", "Ollama", "vLLM",
              "xAI", "DeepSeek", "AI21", "Aleph Alpha", "Cloudflare",
            ].map((provider, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-center font-mono text-xs text-white/50 transition-all hover:border-white/30 hover:text-white/80"
              >
                {provider}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES — bento grid */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-mono text-xs tracking-[0.3em] uppercase text-white/30">
            Why LiteLLM Wins
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-all hover:border-white/30 md:col-span-2">
              <p className="font-mono text-xs" style={{ color: accent }}>
                CORE
              </p>
              <h3 className="mt-2 font-sans text-2xl font-bold text-white/90">
                Universal Translation Layer
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/50">
                Every LLM provider has a different API. OpenAI uses one format. Anthropic
                uses another. Google a third. LiteLLM translates all of them into a single
                OpenAI-compatible interface. Write your code once. Call any model.
                Switch providers in one config change — no code rewrite.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-all hover:border-white/30">
              <p className="font-mono text-xs" style={{ color: accent }}>
                RELIABILITY
              </p>
              <h3 className="mt-2 font-sans text-lg font-bold text-white/90">
                Load Balancing
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/50">
                Route across multiple providers. If OpenAI is down, fall back to Anthropic.
                If rate-limited, try Cohere. LiteLLM keeps your app running.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-all hover:border-white/30">
              <p className="font-mono text-xs" style={{ color: accent }}>
                COST
              </p>
              <h3 className="mt-2 font-sans text-lg font-bold text-white/90">
                Spend Tracking
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/50">
                Per-user, per-model, per-project cost tracking. Set budgets.
                Get alerts. Stop the bill shock before it happens.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-all hover:border-white/30">
              <p className="font-mono text-xs" style={{ color: accent }}>
                ENTERPRISE
              </p>
              <h3 className="mt-2 font-sans text-lg font-bold text-white/90">
                Virtual Keys
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/50">
                Give each team one key. LiteLLM maps it to the right provider.
                Rotate provider keys without touching your app code.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHO USES IT */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-mono text-xs tracking-[0.3em] uppercase text-white/30">
            Trusted By
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {[
              { name: "Nvidia", role: "AI Infrastructure" },
              { name: "Microsoft", role: "Cloud AI" },
              { name: "Stripe", role: "Payments AI" },
              { name: "LangChain", role: "Agent Framework" },
            ].map((company, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center transition-all hover:border-white/30"
              >
                <p className="font-sans text-lg font-bold" style={{ color: accent }}>
                  {company.name}
                </p>
                <p className="mt-1 font-mono text-xs text-white/30">{company.role}</p>
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
              &ldquo;The LLM API landscape is a mess. Every provider reinvents the wheel.
              LiteLLM is the adapter pattern for AI — invisible infrastructure that just works.
              That&apos;s the goal: developers shouldn&apos;t have to think about which API
              they&apos;re calling.&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-4">
              <div
                className="h-10 w-10 rounded-full"
                style={{ background: accent, opacity: 0.3 }}
              />
              <div>
                <p className="font-sans font-bold text-white/80">Krish Dholakia</p>
                <p className="font-mono text-xs text-white/30">Founder, LiteLLM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center">
          <h2 className="font-sans text-3xl font-black md:text-5xl">
            <span style={{ color: accent }}>One API. Every model.</span>
            <br />
            <span className="text-white/30">No lock-in. No rewrites.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-white/40">
            Unitalk routes your AI agents through LiteLLM.
            Switch providers without changing a line of agent code.
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