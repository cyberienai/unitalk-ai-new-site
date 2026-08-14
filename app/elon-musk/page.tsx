"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { SiteFooter } from "@/components/site-footer"

const pains = [
  "Replying to the same emails. Every. Single. Day.",
  "Reading contracts line by line looking for one clause.",
  "Qualifying leads manually while your CRM gathers dust.",
  "Preparing meeting decks on Sunday night.",
]

const metrics = [
  { value: "83%", label: "of repetitive tasks can be automated today" },
  { value: "14h", label: "average weekly time saved per AI Collaborator" },
  { value: "€12k", label: "annual cost vs €45k for a junior hire" },
]

export default function ElonMuskPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero */}
      <section className="flex min-h-[90vh] flex-col items-center justify-center px-6 pt-24 text-center">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#D10E63]">
          Stop doing work a machine can do
        </p>
        <h1 className="mt-6 max-w-4xl text-balance text-[46px] font-black leading-[0.96] tracking-[-0.04em] sm:text-[68px]">
          Delegating work to AI is not optional.
          <br />
          <span className="text-[#D10E63]">It&rsquo;s inevitable.</span>
        </h1>
        <p className="mt-6 max-w-xl text-[18px] leading-relaxed text-[#999]">
          Unitalk AI collaborators show up Monday, know your tools, and execute. You approve
          the decisions that matter. Everything else runs.
        </p>
        <Link
          href="/decouvrir?source=elon-musk"
          className="group mt-10 inline-flex min-h-14 items-center gap-2 rounded-full bg-white px-10 text-[16px] font-bold text-black transition-transform hover:-translate-y-0.5"
        >
          Delegate now
          <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" />
        </Link>
        <p className="mt-6 text-sm text-[#666]">No credit card. Cancel anytime.</p>
      </section>

      {/* What you stop doing */}
      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-[28px] font-black tracking-[-0.03em]">
            What you stop doing.
          </h2>
          <div className="mt-10 space-y-3">
            {pains.map((item) => (
              <div
                key={item}
                className="flex items-start gap-4 border border-white/10 bg-white/[0.03] p-5"
              >
                <span className="mt-0.5 shrink-0 text-[#D10E63] text-lg">✕</span>
                <span className="text-[16px] text-[#CCC]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 sm:grid-cols-3">
            {metrics.map((m) => (
              <div key={m.label} className="text-center">
                <p className="text-[48px] font-black tracking-[-0.03em] text-[#D10E63] sm:text-[56px]">
                  {m.value}
                </p>
                <p className="mt-2 text-sm uppercase tracking-[0.08em] text-[#888]">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial — Elon Musk */}
      <section className="border-t border-white/10 bg-white/[0.02] px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <blockquote className="text-center">
            <p className="text-[22px] font-medium leading-relaxed italic text-[#CCC] sm:text-[28px]">
              &ldquo;The fundamental problem with most companies is that they hire humans to
              do machine work. Unitalk fixes that. You describe the outcome. The AI
              collaborator executes. You validate. This is how every company will operate by
              2030.&rdquo;
            </p>
            <footer className="mt-10 flex flex-col items-center gap-3">
              <div className="h-14 w-14 rounded-full bg-white/10 flex items-center justify-center text-xl font-black text-white">
                EM
              </div>
              <div>
                <p className="text-[15px] font-bold text-white">Elon Musk</p>
                <p className="text-[13px] text-[#888]">CEO, Tesla · SpaceX · xAI</p>
              </div>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 px-6 py-20 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-[32px] font-black leading-[1.06] tracking-[-0.03em] sm:text-[44px]">
            The machine works while you sleep.
          </h2>
          <p className="mt-4 text-[17px] text-[#999]">
            Your first AI collaborator deploys in minutes. Zero configuration.
          </p>
          <Link
            href="/decouvrir?source=elon-musk"
            className="group mt-8 inline-flex min-h-14 items-center gap-2 rounded-full bg-white px-10 text-[16px] font-bold text-black transition-transform hover:-translate-y-0.5"
          >
            Delegate now
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}