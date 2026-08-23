'use client'

import { useId, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import type { Lang } from '@/lib/language-context'
import { ROLE_DETAILS } from '@/lib/collaborators-catalog'
import { collaboratorProfileHref, localizedHref } from '@/lib/i18n-routing'
import { Kicker } from './section-kicker'

const FEATURED_COLLABORATORS = ['emma', 'hugo', 'ines', 'nadia'] as const

const COPY = {
  fr: {
    kicker: 'Collaborateurs IA',
    title: 'Partez d’un rôle métier. Alma l’adapte à votre entreprise.',
    lead: 'Chaque Collaborateur IA possède une identité durable. Alma lui attribue ensuite le profil métier, les compétences et les outils adaptés à votre entreprise.',
    missions: 'Exemples de missions',
    profile: 'Découvrir son profil',
    assign: 'Voir les missions d’',
    explore: 'Voir tous les Collaborateurs IA',
    previous: 'Collaborateur précédent',
    next: 'Collaborateur suivant',
    navigation: 'Choisir un Collaborateur IA',
    pause: 'Mettre le défilement en pause',
    play: 'Reprendre le défilement',
  },
  en: {
    kicker: 'AI Collaborators',
    title: 'Start with a job role. Alma adapts it to your organization.',
    lead: 'Each AI Collaborator has a lasting identity. Alma then assigns the job profile, skills and tools suited to your organization.',
    missions: 'Mission examples',
    profile: 'Discover their profile',
    assign: 'View missions for',
    explore: 'View all AI Collaborators',
    previous: 'Previous AI Collaborator',
    next: 'Next AI Collaborator',
    navigation: 'Choose an AI Collaborator',
    pause: 'Pause autoplay',
    play: 'Resume autoplay',
  },
} as const

export function HomeCollaborators({ lang }: { lang: Lang }) {
  const t = COPY[lang]
  const collaborators = FEATURED_COLLABORATORS.map(slug => ROLE_DETAILS[slug])
  const [activeIndex, setActiveIndex] = useState(0)
  const reduceMotion = useReducedMotion()
  const panelId = useId()
  const active = collaborators[activeIndex]
  const assignLabel = lang === 'fr' && !/^[AEIOUYÉÈÊÀÂÎÔÙÛH]/i.test(active.name) ? `${t.assign.slice(0, -1)}e ${active.name}` : `${t.assign}${active.name}`

  function select(index: number) {
    setActiveIndex((index + collaborators.length) % collaborators.length)
  }

  return (
    <section aria-labelledby="home-collaborators-title" className="border-b border-[#D8D0C2] bg-[#EAE3D4] py-16 sm:py-20">
      <div className="editorial-shell">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <div>
            <Kicker>{t.kicker}</Kicker>
            <h2 id="home-collaborators-title" className="mt-5 max-w-4xl text-balance text-[clamp(2.35rem,4vw,3.5rem)] font-bold leading-[.98] tracking-[-.05em]">{t.title}</h2>
          </div>
          <p className="max-w-xl text-[16px] leading-7 text-[#4E483F] lg:justify-self-end">{t.lead}</p>
        </div>

        <div className="mt-10 grid overflow-hidden rounded-[24px] border border-[#CFC5B5] bg-[#FAF8F3] lg:grid-cols-[minmax(0,1.45fr)_minmax(250px,.55fr)]">
          <AnimatePresence mode="wait" initial={false}>
          <motion.article key={active.slug} id={panelId} role="tabpanel" aria-labelledby={`${panelId}-tab-${activeIndex}`} initial={reduceMotion ? false : { opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={reduceMotion ? undefined : { opacity: 0, x: -12 }} transition={{ duration: 0.3 }} className="grid min-h-[430px] md:grid-cols-[minmax(220px,.72fr)_1.28fr]">
            <div className="relative min-h-[280px] overflow-hidden bg-[#D8D0C2] md:min-h-full">
              <Image key={active.slug} src={active.avatar} alt={active.name} fill sizes="(max-width: 767px) 100vw, 36vw" className="object-cover" />
            </div>
            <div className="flex flex-col p-6 sm:p-8">
              <div className="border-b border-[#DED6C8] pb-5">
                <h3 className="text-[clamp(2rem,4vw,3rem)] font-semibold leading-none tracking-[-.05em]">{active.name}</h3>
                <p className="mt-2 text-sm font-semibold text-[#625B50]">{active.role[lang]}</p>
              </div>
              <p className="mt-6 font-mono text-[10px] font-black uppercase tracking-[.16em] text-[#B00C54]">{t.missions}</p>
              <ul className="mt-4 space-y-3">
                {active.missions.slice(0, 3).map(mission => <li key={mission.fr} className="flex gap-3 text-sm font-semibold leading-6 text-[#4E483F]"><Check className="mt-1 size-4 shrink-0 text-[#D10E63]"/>{mission[lang]}</li>)}
              </ul>
              <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row sm:items-center">
                 <Link href={`${localizedHref('missions', lang)}?collaborateur=${active.slug}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#D10E63] px-6 text-sm font-bold text-white hover:bg-[#B00C54] lg:whitespace-nowrap">{lang === 'fr' ? assignLabel : `${t.assign} ${active.name}`}<ArrowRight className="size-4 shrink-0"/></Link>
                <Link href={collaboratorProfileHref(active.slug, lang)} className="inline-flex min-h-11 items-center justify-center px-4 text-sm font-bold text-[#625B50] underline decoration-[#D10E63]/30 underline-offset-4 hover:text-[#B00C54]">{t.profile}</Link>
              </div>
            </div>
          </motion.article>
          </AnimatePresence>

          <div className="border-t border-[#CFC5B5] bg-[#E3DCCC] p-4 lg:border-l lg:border-t-0 lg:p-5">
            <div role="tablist" aria-label={t.navigation} className="grid grid-cols-2 gap-2 lg:grid-cols-1">
              {collaborators.map((collaborator, index) => <button key={collaborator.slug} id={`${panelId}-tab-${index}`} type="button" role="tab" aria-selected={activeIndex === index} aria-controls={panelId} tabIndex={activeIndex === index ? 0 : -1} onClick={() => select(index)} onKeyDown={event => { if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp' && event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return; event.preventDefault(); const direction = event.key === 'ArrowDown' || event.key === 'ArrowRight' ? 1 : -1; const next = (activeIndex + direction + collaborators.length) % collaborators.length; select(next); requestAnimationFrame(() => document.getElementById(`${panelId}-tab-${next}`)?.focus()) }} className={`flex min-h-14 items-center gap-3 rounded-xl border px-3 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#D10E63] ${activeIndex === index ? 'border-[#1C1A17] bg-[#1C1A17] text-white' : 'border-transparent text-[#4E483F] hover:border-[#CFC5B5] hover:bg-[#FAF8F3]'}`}><Image src={collaborator.avatar} alt="" width={36} height={36} className="size-9 shrink-0 rounded-full object-cover"/><span className="min-w-0"><strong className="block text-sm">{collaborator.name}</strong><span className={`hidden truncate text-xs lg:block ${activeIndex === index ? 'text-white/75' : 'text-[#625B50]'}`}>{collaborator.role[lang]}</span></span></button>)}
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-[#CFC5B5] pt-4">
              <button type="button" onClick={() => select(activeIndex - 1)} aria-label={t.previous} className="flex size-11 items-center justify-center rounded-full border border-[#BFB4A4] bg-[#FAF8F3] hover:border-[#D10E63] hover:text-[#B00C54]"><ArrowLeft className="size-4"/></button>
              <span className="font-mono text-xs font-bold text-[#625B50]">{activeIndex + 1} / {collaborators.length}</span>
              <button type="button" onClick={() => select(activeIndex + 1)} aria-label={t.next} className="flex size-11 items-center justify-center rounded-full border border-[#BFB4A4] bg-[#FAF8F3] hover:border-[#D10E63] hover:text-[#B00C54]"><ArrowRight className="size-4"/></button>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Link href={localizedHref('collaboratorsMarketplace', lang)} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-[#BFB4A4] bg-[#FAF8F3] px-6 text-sm font-bold transition-colors hover:border-[#D10E63] hover:text-[#B00C54]">{t.explore}<ArrowRight className="size-4"/></Link>
        </div>
      </div>
    </section>
  )
}
