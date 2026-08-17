'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { HERMES_CREATORS } from '@/lib/hermes-creators'

type Lang = 'fr' | 'en'

const COPY = {
  fr: {
    kicker: 'Hermes vu de l’extérieur',
    title: 'Hermes testé en pratique.',
    body: 'Des créateurs indépendants présentent le moteur open source utilisé par les Collaborateurs IA.',
    link: 'Voir la sélection éditoriale',
  },
  en: {
    kicker: 'Hermes from the outside',
    title: 'Hermes tested in practice.',
    body: 'Independent creators present the open-source engine used by AI Collaborators.',
    link: 'View the editorial selection',
  },
} as const

export function SectionHermesVoices({ lang }: { lang: Lang }) {
  const t = COPY[lang]
  const reduce = useReducedMotion()

  return (
    <section className="relative overflow-hidden border-y border-[#302C28] bg-[#181615] py-10 text-[#FAF8F3] sm:py-12">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[.035] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:72px_72px]" />
      <div aria-hidden className="pointer-events-none absolute -right-20 top-0 size-[34rem] rounded-full bg-[#D10E63]/20 blur-3xl" />
      <div className="editorial-shell">
        <div className="relative grid gap-8 lg:grid-cols-[.82fr_1.18fr] lg:items-center">
          <div className="relative z-10">
            <p className="font-mono text-[11px] font-black uppercase tracking-[.18em] text-[#F2A4C5]">{t.kicker}</p>
            <h2 className="mt-4 max-w-xl text-[clamp(2rem,3.5vw,3.3rem)] font-semibold leading-[.98] tracking-[-.05em]">{t.title}</h2>
            <p className="mt-4 max-w-xl text-[14px] leading-6 text-[#CFC6B8]">{t.body}</p>
            <Link href="/blog/hermes-agent-youtube" className="mt-5 inline-flex items-center text-sm font-bold text-[#F2A4C5] underline decoration-[#F2A4C5]/35 underline-offset-4 transition-colors hover:text-white hover:decoration-white">{t.link} →</Link>
          </div>

          <ol aria-label={lang === 'fr' ? 'Créateurs présentant Hermes' : 'Creators presenting Hermes'} className="scrollbar-hide -mr-5 flex snap-x gap-3 overflow-x-auto pb-3 pr-5 pt-2 sm:-mr-8 sm:pr-8 lg:mr-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:pr-0">
            {HERMES_CREATORS.slice(0, 10).map((creator, index) => (
              <motion.li key={creator.videoUrl} initial={reduce ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: .45, delay: reduce ? 0 : index * .045, ease: [0.22, 1, 0.36, 1] }} className="group w-[128px] shrink-0 snap-start lg:w-auto">
                <Link href={`/blog/hermes-agent-youtube?createur=${encodeURIComponent(creator.affiliateCode)}`} className="block rounded-[999px_999px_22px_22px] border border-white/10 bg-[#211E1B] p-2 pb-4 outline-none transition-all duration-300 hover:-translate-y-2 hover:border-[#F2A4C5]/55 hover:bg-[#292521] hover:shadow-[0_22px_45px_-24px_rgba(209,14,99,.7)] focus-visible:ring-2 focus-visible:ring-[#F2A4C5]">
                  <span className="relative block aspect-square overflow-hidden rounded-full bg-[#2D2925] ring-1 ring-white/10">
                    <Image src={creator.avatarUrl} alt={lang === 'fr' ? `Chaîne YouTube de ${creator.name}` : `${creator.name}’s YouTube channel`} fill sizes="(max-width: 1024px) 136px, 150px" referrerPolicy="no-referrer" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <span aria-hidden className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/15" />
                  </span>
                  <span className="mt-4 block text-center text-[13px] font-semibold tracking-[-.01em] text-[#EAE4DA]">{creator.name}</span>
                  <span className="mt-1 block text-center font-mono text-[10px] font-bold uppercase tracking-[.12em] text-[#AFA397]">{creator.language} · {String(index + 1).padStart(2, '0')}</span>
                  <span className="mt-3 block text-center text-[11px] font-bold text-[#F2A4C5] lg:opacity-0 lg:transition-opacity lg:group-hover:opacity-100 lg:group-focus-visible:opacity-100">{lang === 'fr' ? 'Voir la vidéo →' : 'View video →'}</span>
                </Link>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
