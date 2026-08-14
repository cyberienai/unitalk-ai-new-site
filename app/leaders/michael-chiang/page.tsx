"use client";

import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";

const accent = "#F5F5F5";

export default function MichaelChiangPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Navbar />

      {/* HERO — minimal with terminal */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-36">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <p className="font-mono text-xs tracking-[0.3em] uppercase text-white/40">
                Ollama · Founder
              </p>
              <h1 className="mt-4 font-sans text-5xl font-black leading-[1.05] md:text-7xl">
                <span style={{ color: accent }}>Michael Chiang</span>
              </h1>
              <p className="mt-4 font-sans text-2xl font-bold leading-snug md:text-4xl" style={{ color: accent }}>
                One docker pull.
                <br />
                Llama 3 running locally.
              </p>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/50">
                Ollama is the &ldquo;docker pull&rdquo; of AI. Before Ollama, running a
                language model locally meant compiling C++, fighting CUDA drivers, and
                reading three READMEs. Michael Chiang made it one command.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full border border-white/20 px-4 py-1.5 font-mono text-xs text-white/50">
                  50M+ PULLS
                </span>
                <span className="rounded-full border border-white/20 px-4 py-1.5 font-mono text-xs text-white/50">
                  macOS · LINUX · WINDOWS
                </span>
                <span className="rounded-full border border-white/20 px-4 py-1.5 font-mono text-xs text-white/50">
                  ANY MODEL
                </span>
              </div>
            </div>
            <div
              className="rounded-2xl border border-white/10 p-1"
              style={{ background: "#111" }}
            >
              <div className="rounded-xl p-5 font-mono text-xs leading-relaxed">
                <p className="text-white/30">$ ollama pull llama3</p>
                <p className="mt-1 text-white/50">pulling manifest...</p>
                <p className="text-white/50">pulling 6a0746a1ec1a... 100%</p>
                <p className="text-white/50">pulling 4fa356c6... 100%</p>
                <p className="mt-2 text-green-500">verifying sha256 digest...</p>
                <p className="text-green-500">writing manifest...</p>
                <p className="mt-2 text-green-500">success</p>
                <p className="mt-2 text-white/30">$ ollama run llama3</p>
                <p className="mt-1">{">>>"} Hello, how can I help you today?</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* METRICS */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex flex-wrap justify-between gap-8">
            {[
              { value: "50M+", label: "Docker Pulls" },
              { value: "100+", label: "Models Available" },
              { value: "3", label: "Platforms (macOS, Linux, Windows)" },
              { value: "<5 min", label: "Time to first inference" },
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

      {/* WHY OLLAMA — cards */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-mono text-xs tracking-[0.3em] uppercase text-white/30">
            Why Ollama Changed Everything
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                num: "01",
                title: "Zero Friction",
                body: "No conda. No CUDA toolkit. No huggingface-cli. Just brew install ollama and you have GPT-4-class models running locally.",
              },
              {
                num: "02",
                title: "Modelfile Standard",
                body: "A Dockerfile for LLMs. Version your prompts, parameters, and system instructions. Reproducible, shareable, composable.",
              },
              {
                num: "03",
                title: "REST API Built-in",
                body: "Every model becomes an API endpoint. OpenAI-compatible. Drop-in replacement for any app that speaks chat completions.",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-all hover:border-white/40"
              >
                <p className="font-mono text-3xl font-black" style={{ color: accent }}>
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

      {/* BEFORE / AFTER — split comparison */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-mono text-xs tracking-[0.3em] uppercase text-white/30">
            Before Ollama vs After
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
              <div className="inline-block rounded-full border border-white/20 px-4 py-1 font-mono text-xs text-white/40">
                BEFORE OLLAMA
              </div>
              <ul className="mt-6 space-y-3 text-sm text-white/30">
                {[
                  "Clone repository → install dependencies → hope CUDA works",
                  "Download GGUF file manually from Hugging Face",
                  "Write Python script with llama-cpp-python",
                  "Manage quantization levels yourself",
                  "Pray your GPU is supported",
                  "40 minutes to first inference",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-white/20">✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="rounded-2xl border bg-white/[0.02] p-8"
              style={{ borderColor: accent + "30" }}
            >
              <div
                className="inline-block rounded-full border px-4 py-1 font-mono text-xs"
                style={{ borderColor: accent, color: accent }}
              >
                AFTER OLLAMA
              </div>
              <ul className="mt-6 space-y-3 text-sm text-white/70">
                {[
                  "ollama pull llama3",
                  "ollama run llama3",
                  "Done.",
                  "REST API at localhost:11434",
                  "OpenAI-compatible /v1/chat/completions",
                  "Every app, every language, every OS",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span style={{ color: accent }}>✓</span>
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
              &ldquo;Running AI locally should be as easy as docker pull. No PhD required.
              No cloud dependency. AI should be a local utility.&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-4">
              <div
                className="h-10 w-10 rounded-full"
                style={{ background: accent, opacity: 0.2 }}
              />
              <div>
                <p className="font-sans font-bold text-white/80">Michael Chiang</p>
                <p className="font-mono text-xs text-white/30">Founder, Ollama</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center">
          <h2 className="font-sans text-3xl font-black md:text-5xl">
            <span style={{ color: accent }}>AI runs everywhere.</span>
            <br />
            <span className="text-white/30">Not just in the cloud.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-white/40">
            Unitalk AI agents run locally or on your infrastructure.
            Powered by Ollama. No vendor dependency. True ownership.
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