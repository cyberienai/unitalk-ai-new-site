'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { Kicker } from '@/components/home/section-kicker'
import { AlmaInline } from '@/components/alma-inline'
import type { Lang } from '@/lib/language-context'

type Profile = {
  name: string
  slug: string
  role: string
  avatar: string
  desc: string
  capacity: 'quarterTime' | 'halfTime' | 'fullTime'
  tag: string
}

const COPY = {
  fr: {
    kicker: 'La Place de Marché',
    title: 'Choisissez le Collaborateur IA adapté à votre première mission.',
    lead: 'Besoin d’aide pour vos emails, votre prospection ou votre relation client ? Alma cadre votre besoin et prépare le Collaborateur IA adapté à votre mission.',
    cta: 'Voir tous les profils métier',
    recruit: 'Configurer',
    previous: 'Afficher les profils précédents',
    next: 'Afficher les profils suivants',
    selector: 'Choisir un groupe de Collaborateurs IA',
    capacityNote: 'La capacité indique le volume de missions et d’actions que le Collaborateur IA peut prendre en charge.',
    profiles: [
      { name: 'Emma', slug: 'emma', role: 'Assistante de direction', avatar: '/images/emma-avatar.png', desc: 'Gère vos emails, prépare vos comptes rendus et organise votre agenda.', capacity: 'fullTime', tag: 'Temps plein · 149€/mois' },
      { name: 'Chloé', slug: 'chloe', role: 'Commerciale', avatar: '/images/chloe-avatar.png', desc: 'Recherche des prospects, prépare les relances et documente le suivi commercial.', capacity: 'quarterTime', tag: 'Quart-temps · 74€/mois' },
      { name: 'Lucas', slug: 'lucas', role: 'Relation client', avatar: '/images/lucas-avatar.png', desc: 'Traite les demandes entrantes, met à jour le CRM et qualifie les leads.', capacity: 'halfTime', tag: 'Mi-temps · 99€/mois' },
      { name: 'Nadia', slug: 'nadia', role: 'Responsable marketing', avatar: '/images/nadia-avatar.png', desc: 'Prépare les campagnes, coordonne les contenus et suit les résultats marketing.', capacity: 'halfTime', tag: 'Mi-temps · 99€/mois' },
      { name: 'Marcus', slug: 'marcus', role: 'Responsable CRM', avatar: '/images/marcus-avatar.png', desc: 'Structure les données clients, les segments et les communications du cycle de vie.', capacity: 'fullTime', tag: 'Temps plein · 149€/mois' },
      { name: 'Hugo', slug: 'hugo', role: 'Coordinateur des opérations', avatar: '/images/hugo-avatar.png', desc: 'Suit les processus, prépare les points de contrôle et coordonne les actions récurrentes.', capacity: 'quarterTime', tag: 'Quart-temps · 74€/mois' },
    ] satisfies Profile[],
  },
  en: {
    kicker: 'The Marketplace',
    title: 'Choose the AI Collaborator suited to your first mission.',
    lead: 'Need help with email, prospecting or customer relations? Alma scopes your need and prepares the AI Collaborator suited to your mission.',
    cta: 'View all job profiles',
    recruit: 'Configure',
    previous: 'Show previous profiles',
    next: 'Show next profiles',
    selector: 'Choose a group of AI Collaborators',
    capacityNote: 'Capacity indicates the volume of missions and actions the AI Collaborator can handle.',
    profiles: [
      { name: 'Emma', slug: 'emma', role: 'Executive Assistant', avatar: '/images/emma-avatar.png', desc: 'Handles emails, prepares meeting notes and organizes your calendar.', capacity: 'fullTime', tag: 'Full-time · €149/mo' },
      { name: 'Chloé', slug: 'chloe', role: 'Sales Representative', avatar: '/images/chloe-avatar.png', desc: 'Finds prospects, prepares follow-ups and documents sales activity.', capacity: 'quarterTime', tag: 'Part-time · €74/mo' },
      { name: 'Lucas', slug: 'lucas', role: 'Customer Relations', avatar: '/images/lucas-avatar.png', desc: 'Handles inbound requests, updates the CRM and qualifies leads.', capacity: 'halfTime', tag: 'Half-time · €99/mo' },
      { name: 'Nadia', slug: 'nadia', role: 'Marketing Manager', avatar: '/images/nadia-avatar.png', desc: 'Prepares campaigns, coordinates content and tracks marketing results.', capacity: 'halfTime', tag: 'Half-time · €99/mo' },
      { name: 'Marcus', slug: 'marcus', role: 'CRM Manager', avatar: '/images/marcus-avatar.png', desc: 'Structures customer data, segments and lifecycle communications.', capacity: 'fullTime', tag: 'Full-time · €149/mo' },
      { name: 'Hugo', slug: 'hugo', role: 'Operations Coordinator', avatar: '/images/hugo-avatar.png', desc: 'Tracks processes, prepares control points and coordinates recurring actions.', capacity: 'quarterTime', tag: 'Part-time · €74/mo' },
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

  return (
    <section className="border-y border-[#DED6C8] bg-[#EAE3D4] py-16 sm:py-20">
      <div className="editorial-shell">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl text-center lg:text-left">
            <Kicker>{t.kicker}</Kicker>
            <h2 className="mt-5 text-balance font-sf text-[32px] font-semibold leading-[1.08] tracking-[-0.035em] text-[#1C1A17] sm:text-[40px] md:text-[44px]">{t.title}</h2>
            <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-[#4E483F] md:text-[17px]"><AlmaInline />{' '}{t.lead}</p>
          </div>
          <Link href="/collaborateurs-ia/profils-metier" className="group mx-auto inline-flex items-center gap-2 rounded-full border border-[#D10E63] px-6 py-3 text-sm font-bold text-[#D10E63] transition-all hover:bg-[#D10E63] hover:text-white lg:mx-0">
            {t.cta}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-10">
          <p className="mb-5 text-center text-sm text-[#625B50] lg:text-left">{t.capacityNote}</p>
          <div className="md:hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={mobileProfile.slug} initial={reduce ? false : { opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={reduce ? { opacity: 0 } : { opacity: 0, x: -20 }} transition={{ duration: reduce ? 0 : 0.35, ease }}>
                <ProfileCard profile={mobileProfile} recruit={t.recruit} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="hidden grid-cols-3 gap-4 md:grid">
            <AnimatePresence mode="popLayout" initial={false}>
              {desktopProfiles.map((profile, index) => <motion.div layout key={profile.slug} initial={reduce ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? { opacity: 0 } : { opacity: 0, y: -14 }} transition={{ duration: reduce ? 0 : 0.35, delay: reduce ? 0 : index * 0.06, ease }}><ProfileCard profile={profile} recruit={t.recruit} /></motion.div>)}
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button type="button" onClick={() => move(-1)} aria-label={t.previous} className="flex size-10 items-center justify-center rounded-full border border-[#D8D0C2] bg-[#FAF8F3] text-[#4E483F] outline-none hover:border-[#D10E63]/50 focus-visible:ring-2 focus-visible:ring-[#D10E63]"><ChevronLeft className="size-4" /></button>
            <div role="tablist" aria-label={t.selector} className="flex gap-2">
              {profiles.map((profile, index) => <button key={profile.slug} type="button" role="tab" aria-selected={start === index} aria-label={profile.name} onClick={() => setStart(index)} className={`h-3 rounded-full outline-none transition-all focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 ${start === index ? 'w-8 bg-[#D10E63]' : 'w-3 bg-[#857C6E] hover:bg-[#625B50]'}`} />)}
            </div>
            <button type="button" onClick={() => move(1)} aria-label={t.next} className="flex size-10 items-center justify-center rounded-full border border-[#D8D0C2] bg-[#FAF8F3] text-[#4E483F] outline-none hover:border-[#D10E63]/50 focus-visible:ring-2 focus-visible:ring-[#D10E63]"><ChevronRight className="size-4" /></button>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProfileCard({ profile, recruit }: { profile: Profile; recruit: string }) {
  return <article className="group flex h-full min-h-[310px] flex-col rounded-3xl border border-[#D8D0C2] bg-[#FAF8F3] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#D10E63]/30 hover:shadow-[0_16px_34px_-20px_rgba(28,26,23,.24)] sm:p-6"><div className="flex items-center gap-4"><div className="relative size-16 shrink-0 overflow-hidden rounded-full ring-2 ring-[#D10E63]/10"><Image src={profile.avatar} alt={profile.name} fill sizes="64px" className="object-cover" /></div><div><h3 className="font-sf text-xl font-bold text-[#1C1A17]">{profile.name}</h3><p className="mt-1 text-[13px] font-semibold text-[#625B50]">{profile.role}</p></div></div><p className="mt-5 text-sm leading-7 text-[#5A5348]">{profile.desc}</p><div className="mt-auto pt-6"><span className="inline-flex rounded-full bg-[#EDE7DA] px-3 py-1 text-[11px] font-bold uppercase tracking-[.06em] text-[#625B50]">{profile.tag}</span><Link href={`/tarifs?profil=${profile.slug}&capacite=${profile.capacity}#configurateur`} className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#D10E63]/10 px-4 text-sm font-bold text-[#B00C54] transition-colors hover:bg-[#D10E63] hover:text-white">{recruit} {profile.name}<ArrowRight className="size-4" /></Link></div></article>
}
