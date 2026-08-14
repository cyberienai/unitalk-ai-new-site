"use client";

import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";

const accent = "#FFD21E";

export default function ClementDelanguePage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Navbar />

      {/* HERO — bold claim centered */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-36">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-white/40">
              Hugging Face · Co-founder &amp; CEO
            </p>
            <h1 className="mt-4 font-sans text-5xl font-black leading-[1.05] md:text-7xl">
              <span style={{ color: accent }}>Clément Delangue</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-2xl font-bold leading-snug text-white/60 md:text-3xl">
              Without Hugging Face,
              <br />
              <span style={{ color: accent }}>no Llama, no Mistral, no Stable Diffusion.</span>
            </p>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/50">
              He built the GitHub of machine learning. 200,000+ models. 50,000+ datasets.
              50,000+ Spaces. The entire open-source AI ecosystem runs through one platform —
              and one French founder who bet on community over control.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <span className="rounded-full border px-4 py-1.5 font-mono text-xs" style={{ borderColor: accent + "60", color: accent }}>
                200K+ MODELS
              </span>
              <span className="rounded-full border px-4 py-1.5 font-mono text-xs" style={{ borderColor: accent + "60", color: accent }}>
                50K+ DATASETS
              </span>
              <span className="rounded-full border px-4 py-1.5 font-mono text-xs" style={{ borderColor: accent + "60", color: accent }}>
                50K+ SPACES
              </span>
              <span className="rounded-full border px-4 py-1.5 font-mono text-xs" style={{ borderColor: accent + "60", color: accent }}>
                $4.5B VALUATION
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ECOSYSTEM MAP — bento grid */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-mono text-xs tracking-[0.3em] uppercase text-white/30">
            The Hugging Face Ecosystem
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            <div
              className="rounded-2xl border bg-white/[0.02] p-6 transition-all hover:border-white/30 md:col-span-2 md:row-span-2"
              style={{ borderColor: accent + "30" }}
            >
              <p className="font-mono text-5xl font-black" style={{ color: accent }}>200K+</p>
              <p className="mt-2 font-sans text-lg font-bold text-white/90">Models</p>
              <p className="mt-2 text-sm leading-relaxed text-white/50">
                Every major open model lives here. Llama, Mistral, Falcon, BLOOM,
                Stable Diffusion, Whisper, Gemma — hosted, versioned, and discoverable.
                If it&apos;s open and it matters, it&apos;s on Hugging Face.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all hover:border-white/30">
              <p className="font-mono text-3xl font-black" style={{ color: accent }}>50K+</p>
              <p className="mt-2 font-sans text-lg font-bold text-white/90">Datasets</p>
              <p className="mt-2 text-sm leading-relaxed text-white/50">
                The training data behind the models. Filterable, documented, ready to use.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all hover:border-white/30">
              <p className="font-mono text-3xl font-black" style={{ color: accent }}>50K+</p>
              <p className="mt-2 font-sans text-lg font-bold text-white/90">Spaces</p>
              <p className="mt-2 text-sm leading-relaxed text-white/50">
                Interactive demos. Try any model in the browser. Zero setup.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all hover:border-white/30 md:col-span-2">
              <p className="font-mono text-3xl font-black" style={{ color: accent }}>15M+</p>
              <p className="mt-2 font-sans text-lg font-bold text-white/90">Monthly Active Users</p>
              <p className="mt-2 text-sm leading-relaxed text-white/50">
                From hobbyists to Fortune 500 researchers. Hugging Face is the default
                starting point for AI development — and the place where the community
                decides which models win.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY — horizontal timeline style */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-mono text-xs tracking-[0.3em] uppercase text-white/30">
            The Delangue Philosophy
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                quote: "'Democratize AI' is not a slogan. It's a business model.",
                detail: "HF makes money through enterprise features (Inference Endpoints, AutoTrain, dedicated hardware) while keeping the core platform free. Open-source drives adoption. Adoption drives revenue.",
              },
              {
                quote: "'The community decides what matters.'",
                detail: "Unlike closed platforms that curate top-down, HF lets developers vote with downloads. The most useful models rise to the top. Meritocracy at scale.",
              },
              {
                quote: "'AI is too important to be centralized.'",
                detail: "If only 3 companies control frontier models, the world loses. HF ensures anyone can download, fine-tune, and deploy. No permission needed.",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all hover:border-white/30"
              >
                <p className="flex-1 font-serif text-lg italic leading-relaxed" style={{ color: accent }}>
                  {card.quote}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-white/50">
                  {card.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-mono text-xs tracking-[0.3em] uppercase text-white/30">
            From Chatbot to Platform
          </h2>
          <div className="relative mt-10 border-l-2 pl-8" style={{ borderColor: accent + "40" }}>
            {[
              { year: "2016", event: "Founded Hugging Face", detail: "Started as an AI chatbot app. Pivoted when they realized the real need was infrastructure." },
              { year: "2019", event: "Transformers Library", detail: "The library that changed everything. One API for every model. pip install transformers." },
              { year: "2021", event: "Series C — $100M", detail: "Sequoia leads. The platform is no longer a side project — it's the center of gravity for open AI." },
              { year: "2022", event: "Stable Diffusion Launch", detail: "The moment HF became essential. Every image model ships on HF. Every fine-tune, every LoRA." },
              { year: "2023", event: "Series D — $235M, $4.5B valuation", detail: "Google, Amazon, Nvidia, Intel, Salesforce, AMD, Qualcomm, IBM all invest. The entire industry bets on HF." },
              { year: "2024", event: "Inference as a Service", detail: "Text Generation Inference, Inference Endpoints. HF becomes not just where models live, but where they run." },
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
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-10">
            <p className="font-serif text-2xl italic leading-relaxed text-white/70 md:text-3xl">
              &ldquo;Our goal is to make sure that AI is not controlled by a handful of
              companies. The best way to do that is to make it accessible to everyone.&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-4">
              <div
                className="h-10 w-10 rounded-full"
                style={{ background: accent, opacity: 0.5 }}
              />
              <div>
                <p className="font-sans font-bold text-white/80">Clément Delangue</p>
                <p className="font-mono text-xs text-white/30">
                  Co-founder &amp; CEO, Hugging Face
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
            <span style={{ color: accent }}>The open ecosystem wins.</span>
            <br />
            <span className="text-white/30">Build on the right side of history.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-white/40">
            Unitalk AI agents operate on open models. Deploy from Hugging Face.
            No black boxes. No API keys to a single vendor.
          </p>
          <a
            href="/paul-graham"
            className="mt-8 inline-block rounded-full border px-10 py-4 font-mono text-sm font-bold uppercase tracking-[0.2em] transition-all hover:scale-105"
            style={{ borderColor: accent, color: accent, background: accent + "10" }}
          >
            Explore Unitalk
          </a>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}