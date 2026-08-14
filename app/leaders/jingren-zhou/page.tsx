"use client";

import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";

const accent = "#FF6A00";

export default function JingrenZhouPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Navbar />

      {/* HERO — big numbers, minimalist */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-36">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-white/40">
              Alibaba Cloud · VP AI
            </p>
            <h1 className="mt-4 font-sans text-5xl font-black leading-[1.05] md:text-7xl">
              <span style={{ color: accent }}>Jingren Zhou</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-2xl font-bold leading-snug text-white/60 md:text-3xl">
              <span style={{ color: accent }}>Qwen.</span> 100 billion downloads.
              <br />
              China&apos;s open-source giant.
            </p>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/50">
              For years, the narrative was simple: the West builds frontier models, China copies
              them. Jingren Zhou shattered that story. Qwen-72B rivals GPT-4. Qwen-VL challenges
              GPT-4V. And everything is open-source — Apache 2.0.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <span className="rounded-full border px-4 py-1.5 font-mono text-xs" style={{ borderColor: accent + "60", color: accent }}>
                100B+ DOWNLOADS
              </span>
              <span className="rounded-full border border-white/20 px-4 py-1.5 font-mono text-xs text-white/50">
                QWEN-72B
              </span>
              <span className="rounded-full border border-white/20 px-4 py-1.5 font-mono text-xs text-white/50">
                APACHE 2.0
              </span>
              <span className="rounded-full border border-white/20 px-4 py-1.5 font-mono text-xs text-white/50">
                30+ LANGUAGES
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* MODEL FAMILY — grid of cards */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-mono text-xs tracking-[0.3em] uppercase text-white/30">
            The Qwen Family
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Qwen-72B", label: "Foundation", desc: "GPT-4 class reasoning. Apache 2.0. The flag bearer." },
              { name: "Qwen-VL", label: "Vision", desc: "Multimodal. Reads images, documents, screens. GPT-4V rival." },
              { name: "Qwen-Audio", label: "Audio", desc: "Speech recognition, translation, analysis. Beyond text." },
              { name: "Qwen-Coder", label: "Code", desc: "Competitive with GPT-4 on HumanEval. Open-source code gen." },
            ].map((model, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all hover:border-white/30"
              >
                <p className="font-mono text-xs" style={{ color: accent }}>
                  {model.label}
                </p>
                <h3 className="mt-2 font-sans text-xl font-bold text-white/90">
                  {model.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">
                  {model.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* METRICS — strip */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex flex-wrap justify-between gap-8">
            {[
              { value: "100B+", label: "Model Downloads" },
              { value: "72B", label: "Max Parameters" },
              { value: "30+", label: "Languages Supported" },
              { value: "Apache 2.0", label: "License" },
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

      {/* TIMELINE */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-mono text-xs tracking-[0.3em] uppercase text-white/30">
            The Qwen Timeline
          </h2>
          <div className="relative mt-10 border-l-2 pl-8" style={{ borderColor: accent + "30" }}>
            {[
              { date: "Aug 2023", event: "Qwen-7B Released", detail: "First public release. Apache 2.0. Solid performance. The world notices." },
              { date: "Dec 2023", event: "Qwen-72B Launch", detail: "72B parameter model. Rivals Llama 2-70B and Claude 2. Open-source with no restrictions." },
              { date: "Feb 2024", event: "Qwen-VL Multimodal", detail: "Vision-language model. Matches GPT-4V on benchmarks. Chinese, English, and multilingual." },
              { date: "Apr 2024", event: "Qwen-Audio", detail: "Speech and audio understanding. Transcription, analysis, emotion detection. Open weights." },
              { date: "Jun 2024", event: "100B Downloads", detail: "Qwen crosses 100 billion cumulative downloads. The most downloaded open model family from Asia." },
              { date: "Aug 2024", event: "Qwen-Coder", detail: "Competitive with GPT-4 on coding benchmarks. Open-source. Apache 2.0. No usage restrictions." },
            ].map((item, i) => (
              <div key={i} className="relative mb-10 last:mb-0">
                <div
                  className="absolute -left-[35px] top-1 h-3 w-3 rounded-full border-2 bg-[#0A0A0A]"
                  style={{ borderColor: accent }}
                />
                <p className="font-mono text-xs" style={{ color: accent }}>
                  {item.date}
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
              &ldquo;Open-source is not a compromise. It is a strategy. Qwen proves that
              you can build world-class AI and give it away — and still win.&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-4">
              <div
                className="h-10 w-10 rounded-full"
                style={{ background: accent, opacity: 0.3 }}
              />
              <div>
                <p className="font-sans font-bold text-white/80">Jingren Zhou</p>
                <p className="font-mono text-xs text-white/30">
                  VP AI, Alibaba Cloud
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
            <span style={{ color: accent }}>AI has no borders.</span>
            <br />
            <span className="text-white/30">Deploy the best models, wherever they come from.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-white/40">
            Unitalk runs Qwen alongside Llama, Mistral, and Hermes.
            Your agents use the best model for every task. No ideological lock-in.
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