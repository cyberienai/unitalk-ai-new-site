'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Kicker } from '@/components/home/section-kicker'
import type { Lang } from '@/lib/language-context'

const COPY = {
  fr: {
    kicker: 'La Place de Marché',
    title: 'Découvrez des Collaborateurs IA autonomes prêts à rejoindre votre équipe.',
    lead: 'Alma vous aide à définir la mission et configure le bon Collaborateur IA. Le Collaborateur IA exécute. Parcourez des profils métier prêts à s’intégrer dans votre équipe, propulsés par le moteur open source Hermes.',
    cta: 'Explorer tous les profils métier',
    recruit: 'Recruter',
    profiles: [
      {
        name: 'Emma',
        role: 'Assistante de direction',
        avatar: '/images/emma-avatar.png',
        desc: 'Gère vos emails, prépare vos comptes rendus et organise votre agenda.',
        tag: 'Temps plein · 149€/mois',
        tagStyle: 'bg-[#D10E63] text-white ring-1 ring-[#D10E63]/20 shadow-sm',
      },
      {
        name: 'Lucas',
        role: 'Relation client',
        avatar: '/images/lucas-avatar.png',
        desc: 'Traite les demandes entrantes, met à jour le CRM et qualifie les leads.',
        tag: 'Mi-temps · 99€/mois',
        tagStyle: 'bg-[#FAF8F3] text-[#1C1A17] ring-1 ring-[#D8D0C2] border border-[#DED6C8]/10',
      },
      {
        name: 'Chloé',
        role: 'Commerciale',
        avatar: '/images/chloe-avatar.png',
        desc: 'Recherche de prospects, relances régulières et suivi commercial.',
        tag: 'Quart-temps · 74€/mois',
        tagStyle: 'bg-[#EDE7DA] text-[#6B6560] ring-1 ring-[#DED6C8]/20',
      },
    ],
  },
  en: {
    kicker: 'The Marketplace',
    title: 'Discover autonomous AI Collaborators ready to join your team.',
    lead: 'Alma helps define the mission and configures the right AI Collaborator. The AI Collaborator executes it. Browse job profiles ready to join your team, powered by the open-source Hermes engine.',
    cta: 'Explore all job profiles',
    recruit: 'Hire',
    profiles: [
      {
        name: 'Emma',
        role: 'Executive Assistant',
        avatar: '/images/emma-avatar.png',
        desc: 'Handles your emails, prepares minutes, and organizes your calendar.',
        tag: 'Full-time · €149/mo',
        tagStyle: 'bg-[#D10E63] text-white ring-1 ring-[#D10E63]/20 shadow-sm',
      },
      {
        name: 'Lucas',
        role: 'Customer Relations',
        avatar: '/images/lucas-avatar.png',
        desc: 'Manages incoming inquiries, updates the CRM, and qualifies leads.',
        tag: 'Half-time · €99/mo',
        tagStyle: 'bg-[#FAF8F3] text-[#1C1A17] ring-1 ring-[#D8D0C2] border border-[#DED6C8]/10',
      },
      {
        name: 'Chloé',
        role: 'Sales Representative',
        avatar: '/images/chloe-avatar.png',
        desc: 'Prospects leads, conducts regular follow-ups, and manages sales.',
        tag: 'Part-time · €74/mo',
        tagStyle: 'bg-[#EDE7DA] text-[#6B6560] ring-1 ring-[#DED6C8]/20',
      },
    ],
  },
} as const

const ease = [0.22, 1, 0.36, 1] as const

export function SectionProfilesEarly({ lang = 'fr' }: { lang?: Lang }) {
  const t = COPY[lang]
  const reduce = useReducedMotion()

  const enter = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.6, delay: reduce ? 0 : delay, ease },
  })

  return (
    <section className="border-y border-[#DED6C8] bg-[#EAE3D4] py-16 sm:py-20">
      <div className="editorial-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16 xl:gap-24">
        {/* Left Side — Copy */}
        <div className="max-w-xl text-center lg:text-left">
          <motion.div {...enter(0)}>
            <Kicker>{t.kicker}</Kicker>
          </motion.div>
          <motion.h2 
            {...enter(0.08)} 
            className="mt-5 text-balance font-sf text-[32px] font-semibold leading-[1.08] tracking-[-0.035em] text-[#1C1A17] sm:text-[40px] md:text-[44px]"
          >
            {t.title}
          </motion.h2>
          <motion.p 
            {...enter(0.16)} 
            className="mt-6 text-[16px] leading-relaxed text-[#4E483F] md:text-[17px]"
          >
            {t.lead}
          </motion.p>
          <motion.div {...enter(0.22)} className="mt-8">
            <Link 
              href="/collaborateurs-ia/profils-metier" 
              className="group inline-flex items-center gap-2 rounded-full border border-[#D10E63] px-6 py-3 text-sm font-bold text-[#D10E63] transition-all hover:bg-[#D10E63] hover:text-white"
            >
              {t.cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>

        {/* Right Side — Grid of Profiles */}
        <div className="grid gap-4 sm:grid-cols-1">
          {t.profiles.map((profile, index) => (
            <motion.div
              key={profile.name}
              initial={reduce ? false : { opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: reduce ? 0 : index * 0.1, ease }}
              className="group flex flex-col gap-4 rounded-2xl border border-[#D8D0C2] bg-[#FAF8F3] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#D10E63]/30 hover:shadow-[0_12px_30px_-10px_rgba(28,26,23,0.08)] sm:flex-row sm:items-center sm:justify-between"
            >
              {/* Left Column — Avatar & Details */}
              <div className="flex items-start gap-4">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-[#D10E63]/10 transition-transform group-hover:scale-105">
                  <Image 
                    src={profile.avatar} 
                    alt={profile.name} 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-sf text-lg font-bold text-[#1C1A17]">{profile.name}</h3>
                  <p className="text-xs font-semibold text-[#857C6E]">{profile.role}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#5A5348] max-w-sm">{profile.desc}</p>
                </div>
              </div>

              {/* Right Column — Tag (Top-right) and CTA Button */}
              <div className="flex items-center justify-between border-t border-[#DED6C8]/40 pt-4 sm:flex sm:flex-col sm:items-end sm:border-0 sm:pt-0">
                {/* Tech value Tag */}
                <span className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.06em] sm:mb-3 ${profile.tagStyle}`}>
                  {profile.tag}
                </span>
                
                {/* Recruit CTA Button */}
                <Link
                  href={`/decouvrir?profil=${profile.name.toLowerCase()}`}
                  className="inline-flex items-center gap-1 rounded-full bg-[#D10E63]/10 px-4 py-2 text-xs font-bold text-[#D10E63] transition-colors hover:bg-[#D10E63] hover:text-white"
                >
                  {t.recruit}
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
