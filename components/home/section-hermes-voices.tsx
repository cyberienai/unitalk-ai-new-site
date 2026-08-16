'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { HERMES_CREATORS } from '@/lib/hermes-creators'

type Lang = 'fr' | 'en'

const COPY = {
  fr: {
    kicker: 'Recommandés par',
    title: '10 voix qui mettent Hermes à l’épreuve.',
    body: 'Hermes est le moteur open source qui fait travailler les Collaborateurs IA Unitalk. Dix créateurs indépendants l’ont testé, challengé et montré en action.',
    link: 'Voir la sélection éditoriale',
    proof: '10 tests, cours, démonstrations et entretiens publics.',
  },
  en: {
    kicker: 'Recommended by',
    title: '10 voices putting Hermes to the test.',
    body: 'Hermes is the open-source engine that powers Unitalk AI Collaborators at work. Ten independent creators have tested, challenged and demonstrated it in action.',
    link: 'View the editorial selection',
    proof: '10 public tests, courses, demonstrations and interviews.',
  },
} as const

export function SectionHermesVoices({ lang }: { lang: Lang }) {
  const t = COPY[lang]
  const reduce = useReducedMotion()

  return (
    <section className="relative overflow-hidden border-y border-[#302C28] bg-[#181615] px-5 py-16 text-[#FAF8F3] sm:px-8 sm:py-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[.035] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:72px_72px]" />
      <div aria-hidden className="pointer-events-none absolute -right-20 top-0 size-[34rem] rounded-full bg-[#D10E63]/20 blur-3xl" />
      <div className="editorial-shell">
        <div className="relative grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:items-center">
          <div className="relative z-10">
            <p className="font-mono text-[10px] font-black uppercase tracking-[.2em] text-[#F2A4C5]">{t.kicker}</p>
            <h2 className="mt-5 max-w-xl text-[clamp(2.6rem,5vw,5.2rem)] font-semibold leading-[.92] tracking-[-.065em]">{t.title}</h2>
            <p className="mt-6 max-w-xl text-[15px] leading-7 text-[#CFC6B8]">{t.body}</p>
            <Link href="/blog/hermes-agent-youtube" className="mt-8 inline-flex min-h-11 items-center rounded-full border border-white/20 px-5 text-sm font-bold text-white transition-colors hover:border-[#F2A4C5] hover:text-[#F2A4C5]">{t.link}</Link>
          </div>

          <ol className="scrollbar-hide -mx-5 flex snap-x gap-4 overflow-x-auto px-5 pb-5 pt-4 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0">
            {HERMES_CREATORS.map((creator, index) => (
              <motion.li key={creator.videoUrl} initial={reduce ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: .55, delay: reduce ? 0 : index * .045, ease: [0.22, 1, 0.36, 1] }} className={`group w-[152px] shrink-0 snap-start lg:w-auto ${index % 2 ? 'lg:translate-y-9' : ''}`}>
                <Link href={`/blog/hermes-agent-youtube?createur=${encodeURIComponent(creator.affiliateCode)}`} className="block rounded-[999px_999px_22px_22px] border border-white/10 bg-[#211E1B] p-2 pb-4 outline-none transition-all duration-300 hover:-translate-y-2 hover:border-[#F2A4C5]/55 hover:bg-[#292521] hover:shadow-[0_22px_45px_-24px_rgba(209,14,99,.7)] focus-visible:ring-2 focus-visible:ring-[#F2A4C5]">
                  <span className="relative block aspect-square overflow-hidden rounded-full bg-[#2D2925] ring-1 ring-white/10">
                    <Image src={creator.avatarUrl} alt={`Chaîne YouTube ${creator.name}`} fill sizes="(max-width: 1024px) 136px, 150px" referrerPolicy="no-referrer" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <span aria-hidden className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/15" />
                  </span>
                  <span className="mt-4 block text-center text-[13px] font-semibold tracking-[-.01em] text-[#EAE4DA]">{creator.name}</span>
                  <span className="mt-1 block text-center font-mono text-[8px] font-bold uppercase tracking-[.14em] text-[#8F8579]">{creator.language} · {String(index + 1).padStart(2, '0')}</span>
                  <span className="mt-3 block text-center text-[10px] font-bold text-[#F2A4C5] opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">{lang === 'fr' ? 'Voir son test →' : 'View the test →'}</span>
                </Link>
              </motion.li>
            ))}
          </ol>
        </div>
        <p className="relative mt-8 max-w-3xl border-t border-white/10 pt-5 font-mono text-[10px] uppercase tracking-[.12em] text-[#8F8579]">{t.proof}</p>
      </div>
    </section>
  )
}
