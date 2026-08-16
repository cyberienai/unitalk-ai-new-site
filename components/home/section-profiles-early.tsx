'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { Kicker } from '@/components/home/section-kicker'
import { AlmaInline } from '@/components/alma-inline'
import type { Lang } from '@/lib/language-context'
import { unitalkPricing } from '@/lib/unitalk-pricing'

type Profile = {
  name: string
  slug: string
  role: string
  avatar: string
  desc: string
  tags: readonly string[]
}

const COPY = {
  fr: {
    kicker: 'Collaborateurs IA',
    title: 'Trouvez le Collaborateur IA adapté à votre travail.',
    lead: 'Chaque Collaborateur IA garde une identité durable. Ses profils métier, compétences et outils évoluent avec ses missions.',
    almaLead: 'Vous ne savez pas lequel choisir ? Alma vous aide à trouver celui qui convient à votre mission.',
    cta: 'Voir tous les profils métier',
    choose: 'Personnaliser',
    priceSuffix: '/ mois',
    priceFrom: 'À partir de',
    previous: 'Afficher les Collaborateurs précédents',
    next: 'Afficher les Collaborateurs suivants',
    selector: 'Choisir un groupe de Collaborateurs IA',
    profiles: [
      { name: 'Emma', slug: 'emma', role: 'Assistante de direction', avatar: '/images/emma-avatar.png', desc: 'Organise votre agenda, traite vos e-mails et prépare vos réunions.', tags: ['E-mail', 'Agenda', 'Documents'] },
      { name: 'Chloé', slug: 'chloe', role: 'Commerciale', avatar: '/images/chloe-avatar.png', desc: 'Recherche vos prospects, prépare vos relances et documente le suivi commercial.', tags: ['Prospection', 'CRM', 'Relances'] },
      { name: 'Lucas', slug: 'lucas', role: 'Relation client', avatar: '/images/lucas-avatar.png', desc: 'Répond aux demandes entrantes, qualifie les leads et met à jour votre CRM.', tags: ['Support', 'Qualification', 'CRM'] },
      { name: 'Nadia', slug: 'nadia', role: 'Responsable marketing', avatar: '/images/nadia-avatar.png', desc: 'Prépare vos campagnes, coordonne vos contenus et suit leurs résultats.', tags: ['Campagnes', 'Contenus', 'Analyse'] },
      { name: 'Marcus', slug: 'marcus', role: 'Responsable CRM', avatar: '/images/marcus-avatar.png', desc: 'Structure vos données clients, vos segments et vos communications.', tags: ['CRM', 'Segments', 'Données'] },
      { name: 'Hugo', slug: 'hugo', role: 'Coordinateur des opérations', avatar: '/images/hugo-avatar.png', desc: 'Suit vos processus, prépare les contrôles et coordonne les actions récurrentes.', tags: ['Processus', 'Contrôle', 'Coordination'] },
    ] satisfies Profile[],
  },
  en: {
    kicker: 'AI Collaborators',
    title: 'Find the AI Collaborator suited to your work.',
    lead: 'Each AI Collaborator keeps a durable identity. Its job profiles, skills and tools evolve with its missions.',
    almaLead: 'Not sure whom to choose? Alma helps you find the right one for your mission.',
    cta: 'View all job profiles',
    choose: 'Personalize',
    priceSuffix: '/ month',
    priceFrom: 'From',
    previous: 'Show previous AI Collaborators',
    next: 'Show next AI Collaborators',
    selector: 'Choose a group of AI Collaborators',
    profiles: [
      { name: 'Emma', slug: 'emma', role: 'Executive Assistant', avatar: '/images/emma-avatar.png', desc: 'Organizes your calendar, handles email and prepares meetings.', tags: ['Email', 'Calendar', 'Documents'] },
      { name: 'Chloé', slug: 'chloe', role: 'Sales Representative', avatar: '/images/chloe-avatar.png', desc: 'Finds prospects, prepares follow-ups and documents sales activity.', tags: ['Prospecting', 'CRM', 'Follow-ups'] },
      { name: 'Lucas', slug: 'lucas', role: 'Customer Relations', avatar: '/images/lucas-avatar.png', desc: 'Handles inbound requests, qualifies leads and updates your CRM.', tags: ['Support', 'Qualification', 'CRM'] },
      { name: 'Nadia', slug: 'nadia', role: 'Marketing Manager', avatar: '/images/nadia-avatar.png', desc: 'Prepares campaigns, coordinates content and tracks results.', tags: ['Campaigns', 'Content', 'Analysis'] },
      { name: 'Marcus', slug: 'marcus', role: 'CRM Manager', avatar: '/images/marcus-avatar.png', desc: 'Structures customer data, segments and communications.', tags: ['CRM', 'Segments', 'Data'] },
      { name: 'Hugo', slug: 'hugo', role: 'Operations Coordinator', avatar: '/images/hugo-avatar.png', desc: 'Tracks processes, prepares controls and coordinates recurring actions.', tags: ['Processes', 'Control', 'Coordination'] },
    ] satisfies Profile[],
  },
} as const

const ease = [0.22, 1, 0.36, 1] as const

export function SectionProfilesEarly({ lang = 'fr' }: { lang?: Lang }) {
  const t = COPY[lang]
  const reduce = useReducedMotion()
  const [start, setStart] = useState(0)
  const profiles = t.profiles as readonly Profile[]
  const desktopProfiles = Array.from({ length: 3 }, (_, index) => profiles[(start + index) % profiles.length])
  const mobileProfile = profiles[start]

  function move(direction: number) {
    setStart((current) => (current + direction + profiles.length) % profiles.length)
  }

  return <section className="border-y border-[#DED6C8] bg-[#EAE3D4] py-16 sm:py-20">
    <div className="editorial-shell">
      <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="max-w-3xl text-center lg:text-left"><Kicker>{t.kicker}</Kicker><h2 className="mt-5 text-balance font-sf text-[32px] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-[40px] md:text-[44px]">{t.title}</h2><p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-[#4E483F] md:text-[17px]">{t.lead} <AlmaInline />{' '}{t.almaLead}</p></div>
        <Link href="/collaborateurs-ia/profils-metier" className="group mx-auto inline-flex items-center gap-2 rounded-full border border-[#D10E63] px-6 py-3 text-sm font-bold text-[#D10E63] hover:bg-[#D10E63] hover:text-white lg:mx-0">{t.cta}<ArrowRight className="size-4" /></Link>
      </div>

      <div className="mt-10">
        <div className="md:hidden"><AnimatePresence mode="wait" initial={false}><motion.div key={mobileProfile.slug} initial={reduce ? false : { opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={reduce ? { opacity: 0 } : { opacity: 0, x: -20 }} transition={{ duration: reduce ? 0 : 0.35, ease }}><ProfileCard profile={mobileProfile} t={t} /></motion.div></AnimatePresence></div>
        <div className="hidden grid-cols-3 gap-4 md:grid"><AnimatePresence mode="popLayout" initial={false}>{desktopProfiles.map((profile, index) => <motion.div layout key={profile.slug} initial={reduce ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? { opacity: 0 } : { opacity: 0, y: -14 }} transition={{ duration: reduce ? 0 : 0.35, delay: reduce ? 0 : index * 0.06, ease }}><ProfileCard profile={profile} t={t} /></motion.div>)}</AnimatePresence></div>
        <div className="mt-6 flex items-center justify-center gap-4"><button type="button" onClick={() => move(-1)} aria-label={t.previous} className="flex size-10 items-center justify-center rounded-full border border-[#D8D0C2] bg-[#FAF8F3] text-[#4E483F] hover:border-[#D10E63]/50 focus-visible:ring-2 focus-visible:ring-[#D10E63]"><ChevronLeft className="size-4" /></button><div role="tablist" aria-label={t.selector} className="flex gap-2">{profiles.map((profile, index) => <button key={profile.slug} type="button" role="tab" aria-selected={start === index} aria-label={profile.name} onClick={() => setStart(index)} className={`h-3 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] ${start === index ? 'w-8 bg-[#D10E63]' : 'w-3 bg-[#857C6E]'}`} />)}</div><button type="button" onClick={() => move(1)} aria-label={t.next} className="flex size-10 items-center justify-center rounded-full border border-[#D8D0C2] bg-[#FAF8F3] text-[#4E483F] hover:border-[#D10E63]/50 focus-visible:ring-2 focus-visible:ring-[#D10E63]"><ChevronRight className="size-4" /></button></div>
      </div>
    </div>
  </section>
}

function ProfileCard({ profile, t }: { profile: Profile; t: typeof COPY.fr | typeof COPY.en }) {
  const href = `/tarifs?profil=${profile.slug}#configurateur`
  return <article className="group flex h-full min-h-[330px] flex-col rounded-3xl border border-[#D8D0C2] bg-[#FAF8F3] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#D10E63]/30 hover:shadow-[0_16px_34px_-20px_rgba(28,26,23,.24)]"><div className="flex items-center gap-4"><div className="relative size-16 shrink-0 overflow-hidden rounded-full ring-2 ring-[#D10E63]/10"><Image src={profile.avatar} alt={profile.name} fill sizes="64px" className="object-cover" /></div><div><h3 className="font-sf text-xl font-bold">{profile.name}</h3><p className="mt-1 text-[13px] font-semibold text-[#625B50]">{profile.role}</p></div></div><p className="mt-5 text-sm leading-7 text-[#5A5348]">{profile.desc}</p><div className="mt-4 flex flex-wrap gap-2">{profile.tags.map((tag) => <span key={tag} className="rounded-full border border-[#D8D0C2] bg-[#F3EFE6] px-3 py-1 text-[11px] font-semibold text-[#625B50]">{tag}</span>)}</div><div className="mt-auto flex items-end justify-between gap-4 border-t border-[#DED6C8] pt-5"><div><p className="text-[10px] font-bold text-[#8A8175]">{t.priceFrom}</p><p className="mt-1 font-sf text-2xl font-bold">{unitalkPricing.aiCollaborator.monthlyPrice} € <span className="text-xs font-semibold text-[#6E665A]">{t.priceSuffix}</span></p></div><Link href={href} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#D10E63] px-4 text-sm font-bold text-[#B00C54] transition-colors hover:bg-[#D10E63] hover:text-white">{t.choose} {profile.name}<ArrowRight className="size-4" /></Link></div></article>
}
