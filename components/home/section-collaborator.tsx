'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { collaboratorHref } from '@/lib/collaborators-catalog'
import type { Lang } from '@/lib/language-context'
import { Kicker } from './section-kicker'

const T = {
  fr: {
    kicker: 'Votre Collaborateur IA',
    title: 'Une identité qui reste. Des profils qui évoluent.',
    subtitle:
      'Votre Collaborateur IA conserve sa fonction, sa mémoire, son contexte et son expérience. Ajoutez-lui de nouveaux savoir-faire à mesure que ses responsabilités évoluent.',
    name: 'Emma',
    role: 'Collaboratrice IA commerciale',
    profilesLabel: 'Profils',
    profiles: 'Prospection · Réunions · Reporting',
    missionLabel: 'Mission en cours',
    mission: 'Préparer les prospects prioritaires',
    validationLabel: 'Prochaine validation',
    validation: '12 prises de contact',
    statusLabel: 'Statut',
    status: 'Travaille',
    seeProfile: 'Voir le profil d’Emma',
    discoverAll: 'Découvrir les Collaborateurs IA',
  },
  en: {
    kicker: 'Your AI Collaborator',
    title: 'An identity that stays. Profiles that evolve.',
    subtitle:
      'Your AI Collaborator keeps its function, its memory, its context and its experience. Add new skills as its responsibilities grow.',
    name: 'Emma',
    role: 'AI Sales Collaborator',
    profilesLabel: 'Profiles',
    profiles: 'Prospecting · Meetings · Reporting',
    missionLabel: 'Mission in progress',
    mission: 'Prepare the priority prospects',
    validationLabel: 'Next validation',
    validation: '12 outreach contacts',
    statusLabel: 'Status',
    status: 'Working',
    seeProfile: 'See Emma’s profile',
    discoverAll: 'Discover the AI Collaborators',
  },
}

export function SectionCollaborator({ lang }: { lang: Lang }) {
  const t = T[lang]

  return (
    <section className="bg-[#EFEADF] px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        {/* Copy */}
        <div className="max-w-xl">
          <Kicker>{t.kicker}</Kicker>
          <h2 className="mt-3 text-balance font-sf text-3xl font-bold tracking-[-0.02em] text-[#1C1A17] sm:text-4xl">
            {t.title}
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-[#5F594F]">{t.subtitle}</p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href={collaboratorHref('emma')}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#D10E63] px-5 py-2.5 text-sm font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5"
            >
              {t.seeProfile}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/collaborateurs-ia"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#4E483F] underline-offset-4 transition-colors hover:text-[#D10E63] hover:underline"
            >
              {t.discoverAll}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Emma professional card */}
        <div className="relative">
          <div className="premium-shadow rounded-[1.75rem] border border-[#D8D0C2] bg-[#FBF9F3] p-6 sm:p-8">
            <div className="flex items-center gap-4">
              <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-[#1C1A17]/[0.08] sm:h-20 sm:w-20">
                <Image src="/images/emma-avatar.png" alt={t.name} fill className="object-cover" sizes="80px" />
              </span>
              <div className="min-w-0">
                <p className="font-sf text-2xl font-bold tracking-[-0.02em] text-[#1C1A17]">{t.name}</p>
                <p className="text-sm font-medium text-[#D10E63]">{t.role}</p>
              </div>
            </div>

            <dl className="mt-6 space-y-4">
              <div className="border-t border-[#E9E2D4] pt-4">
                <dt className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A8175]">{t.profilesLabel}</dt>
                <dd className="mt-1.5 text-[15px] font-medium text-[#1C1A17]">{t.profiles}</dd>
              </div>
              <div className="border-t border-[#E9E2D4] pt-4">
                <dt className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A8175]">{t.missionLabel}</dt>
                <dd className="mt-1.5 text-[15px] font-medium text-[#1C1A17]">{t.mission}</dd>
              </div>
              <div className="border-t border-[#E9E2D4] pt-4">
                <dt className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A8175]">{t.validationLabel}</dt>
                <dd className="mt-1.5 text-[15px] font-medium text-[#1C1A17]">{t.validation}</dd>
              </div>
              <div className="border-t border-[#E9E2D4] pt-4">
                <dt className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A8175]">{t.statusLabel}</dt>
                <dd className="mt-1.5 inline-flex items-center gap-2 rounded-full bg-[#22A06B]/12 px-3 py-1 text-sm font-semibold text-[#1B7A50]">
                  <span className="h-2 w-2 rounded-full bg-[#22A06B]" aria-hidden="true" />
                  {t.status}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
