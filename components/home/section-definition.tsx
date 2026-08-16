'use client'

import Image from 'next/image'
import { ArrowRight, Check, MessageSquareText, ShieldCheck } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { Kicker } from '@/components/home/section-kicker'

const COPY = {
  fr: {
    kicker: 'Première mission offerte',
    title: 'Testez gratuitement une mission réelle.',
    lead: 'Partez d’un besoin concret de votre entreprise. Alma le prépare, votre Collaborateur IA le réalise et vous gardez la décision.',
    steps: [
      { title: 'Décrivez', body: 'Votre besoin, à l’écrit ou à la voix.', icon: MessageSquareText },
      { title: 'Alma prépare', body: 'Objectif, profil, outils et validations.', avatar: '/alma-avatar.png' },
      { title: 'Il travaille', body: 'Dans le périmètre que vous avez défini.', icon: ShieldCheck },
      { title: 'Vous validez', body: 'Le résultat et la suite.', icon: Check },
    ],
    cta: 'Préparer ma première mission',
    note: 'Première mission offerte, sans carte bancaire',
  },
  en: {
    kicker: 'First mission included',
    title: 'Test a real mission for free.',
    lead: 'Start with a concrete business need. Alma prepares it, your AI Collaborator completes it and you keep the final say.',
    steps: [
      { title: 'Describe', body: 'Your need, in writing or by voice.', icon: MessageSquareText },
      { title: 'Alma prepares', body: 'Outcome, profile, tools and approvals.', avatar: '/alma-avatar.png' },
      { title: 'It works', body: 'Within the scope you defined.', icon: ShieldCheck },
      { title: 'You approve', body: 'The result and what happens next.', icon: Check },
    ],
    cta: 'Prepare my first mission',
    note: 'First mission included, with no credit card required',
  },
} as const

export function SectionDefinition({ lang = 'fr' }: { lang?: Lang }) {
  const t = COPY[lang]
  return (
    <section className="border-b border-[#DED6C8] bg-[#F3EFE6] py-14 sm:py-16">
      <div className="editorial-shell">
        <div className="max-w-3xl">
          <Kicker>{t.kicker}</Kicker>
          <h2 className="mt-4 text-balance font-sf text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-[#1C1A17]">{t.title}</h2>
          <p className="mt-5 max-w-2xl text-[16px] leading-7 text-[#4E483F] sm:text-[17px]">{t.lead}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button type="button" onClick={() => window.dispatchEvent(new Event('open-home-alma'))} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#D10E63] px-6 text-sm font-bold text-white transition-colors hover:bg-[#B00C54] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F3EFE6]">
              {t.cta}<ArrowRight className="size-4" />
            </button>
            <p className="inline-flex items-center gap-2 text-sm font-bold text-[#B00C54]"><Check className="size-4" />{t.note}</p>
          </div>
        </div>

        <ol className="mt-10 grid border-t border-[#CFC5B5] md:grid-cols-2 lg:grid-cols-4">
          {t.steps.map((step, index) => {
            const Icon = 'icon' in step ? step.icon : null
            return (
              <li key={step.title} className="relative border-b border-[#CFC5B5] py-6 md:px-6 md:[&:nth-child(odd)]:border-r md:[&:nth-child(odd)]:pl-0 lg:border-b-0 lg:border-r lg:[&:nth-child(odd)]:pl-6 lg:first:pl-0 lg:last:border-r-0">
                <span className="absolute -top-2.5 left-0 bg-[#F3EFE6] pr-2 text-xs font-black text-[#B00C54]">0{index + 1}</span>
                <div className="flex items-center gap-3 pt-1">
                  {'avatar' in step ? (
                    <Image src={step.avatar} alt={lang === 'fr' ? 'Alma, Coordinatrice de missions IA' : 'Alma, AI mission coordinator'} width={36} height={36} className="size-9 shrink-0 rounded-full object-cover ring-2 ring-[#D10E63]/25" />
                  ) : (
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#D10E63]/10 text-[#B00C54]">{Icon && <Icon className="size-[18px]" />}</span>
                  )}
                  <h3 className="text-lg font-semibold leading-tight text-[#1C1A17]">{step.title}</h3>
                </div>
                <p className="mt-3 max-w-[15rem] text-sm leading-6 text-[#5A5348]">{step.body}</p>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
