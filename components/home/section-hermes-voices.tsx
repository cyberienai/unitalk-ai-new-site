'use client'

import Link from 'next/link'
import { HERMES_CREATORS } from '@/lib/hermes-creators'

type Lang = 'fr' | 'en'

const COPY = {
  fr: {
    kicker: 'Recommandés par',
    title: '10 voix qui mettent Hermes à l’épreuve.',
    body: 'Hermes est le socle agentique open source individuel de chaque Collaborateur IA Unitalk. Dix créateurs indépendants le testent, l’expliquent et le montrent en action.',
    link: 'Voir la sélection éditoriale',
    note: 'Créateurs affiliés Unitalk : chacun vous transmet sa commission de 30 % via son code personnel.',
  },
  en: {
    kicker: 'Recommended by',
    title: '10 voices putting Hermes to the test.',
    body: 'Hermes is the individual open-source agentic foundation of every Unitalk AI Collaborator. Ten independent creators test it, explain it and show it in action.',
    link: 'View the editorial selection',
    note: 'Unitalk affiliate creators: each passes their 30% commission on to you through a personal code.',
  },
} as const

export function SectionHermesVoices({ lang }: { lang: Lang }) {
  const t = COPY[lang]

  return (
    <section className="border-y border-[#302C28] bg-[#181615] px-5 py-16 text-[#FAF8F3] sm:px-8 sm:py-20">
      <div className="editorial-shell">
        <div className="grid gap-10 lg:grid-cols-[.78fr_1.22fr] lg:items-end">
          <div>
            <p className="font-mono text-[10px] font-black uppercase tracking-[.2em] text-[#F2A4C5]">{t.kicker}</p>
            <h2 className="mt-5 max-w-xl text-[clamp(2.25rem,4.5vw,4.5rem)] font-semibold leading-[.96] tracking-[-.055em]">{t.title}</h2>
            <p className="mt-6 max-w-xl text-[15px] leading-7 text-[#CFC6B8]">{t.body}</p>
            <Link href="/blog/hermes-agent-youtube" className="mt-7 inline-flex border-b border-[#F2A4C5]/60 pb-1 text-sm font-bold text-[#F2A4C5] transition-colors hover:border-white hover:text-white">{t.link}</Link>
          </div>

          <ol className="grid border-l border-t border-white/10 sm:grid-cols-2">
            {HERMES_CREATORS.map((creator, index) => (
              <li key={creator.videoUrl} className="group border-b border-r border-white/10 bg-white/[.018] transition-colors hover:bg-white/[.05]">
                <Link href={`/blog/hermes-agent-youtube?createur=${encodeURIComponent(creator.affiliateCode)}`} className="flex min-h-[76px] items-center gap-4 px-5 py-4 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#F2A4C5]">
                  <span className="font-mono text-[9px] tracking-[.16em] text-[#756D64]">{String(index + 1).padStart(2, '0')}</span>
                  <span className="text-[15px] font-semibold tracking-[-.01em] text-[#EAE4DA] transition-colors group-hover:text-white">{creator.name}</span>
                  <span className="ml-auto font-mono text-[8px] font-bold uppercase tracking-[.14em] text-[#8F8579]">{creator.language}</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
        <p className="mt-7 text-[10px] leading-5 text-[#756D64]">{t.note}</p>
      </div>
    </section>
  )
}
