'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Mail, Sparkles } from 'lucide-react'
import { useLanguage, useT } from '@/lib/language-context'
import { ROLE_DETAILS, TEAM_HUMANS } from '@/lib/collaborators-catalog'

export function HumanProfile({ handle }: { handle: string }) {
  const { lang } = useLanguage()
  const human = TEAM_HUMANS[handle]
  const ai = human ? ROLE_DETAILS[human.pairSlug] : undefined

  const t = useT({
    fr: {
      back: 'Notre équipe',
      teamTag: 'Membre de l’équipe',
      about: 'À propos',
      contact: 'Contact',
      partnerTitle: 'Son binôme IA',
      partnerBody: (name: string) => `${human?.name.split(' ')[0]} travaille au quotidien avec ${name}, son Collaborateur IA.`,
      viewPartner: 'Voir le profil',
      aiTag: 'Collaborateur IA',
    },
    en: {
      back: 'Our team',
      teamTag: 'Team member',
      about: 'About',
      contact: 'Contact',
      partnerTitle: 'Their AI partner',
      partnerBody: (name: string) => `${human?.name.split(' ')[0]} works daily with ${name}, their AI Collaborator.`,
      viewPartner: 'View profile',
      aiTag: 'AI Collaborator',
    },
  })

  if (!human) return null

  return (
    <main className="w-full bg-[#F3EFE6]">
      <div className="mx-auto max-w-3xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
        <Link
          href="/collaborateurs-ia/profils-metier"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6B6560] transition-colors hover:text-[#1C1A17]"
        >
          <ArrowLeft className="h-4 w-4" />
          {t.back}
        </Link>

        <div className="mt-6 overflow-hidden rounded-3xl border border-[#DDD5CA] bg-[#FBF9F3]">
          <div className="flex flex-col items-start gap-5 p-6 sm:flex-row sm:items-center sm:p-8">
            <span className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full ring-2 ring-[#1C1A17]/10">
              <Image src={human.avatar || '/placeholder.svg'} alt={human.name} fill className="object-cover" sizes="96px" priority />
            </span>
            <div className="min-w-0">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#857C6E]">{t.teamTag}</p>
              <h1 className="mt-1 font-sf text-3xl font-bold tracking-[-0.02em] text-[#1C1A17]">{human.name}</h1>
              <p className="mt-1 text-[#6B6560]">
                {human.role[lang]} <span className="text-[#A09789]">· {human.department[lang]}</span>
              </p>
              <p className="mt-0.5 font-mono text-sm text-[#857C6E]">@{human.handle}</p>
            </div>
          </div>

          <div className="border-t border-[#DDD5CA] p-6 sm:p-8">
            <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#857C6E]">{t.about}</h2>
            <p className="mt-3 text-pretty leading-relaxed text-[#4E483F]">{human.bio[lang]}</p>

            {human.email && (
              <a
                href={`mailto:${human.email}`}
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#DDD5CA] px-4 py-2 text-sm font-medium text-[#4E483F] transition-colors hover:border-[#1C1A17] hover:text-[#1C1A17]"
              >
                <Mail className="h-4 w-4" />
                {human.email}
              </a>
            )}
          </div>
        </div>

        {/* AI partner */}
        {ai && (
          <div className="mt-5 rounded-3xl border border-[#D10E63]/25 bg-[#FBF9F3] p-6 sm:p-8">
            <h2 className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#D10E63]">
              <Sparkles className="h-3.5 w-3.5" />
              {t.partnerTitle}
            </h2>
            <p className="mt-3 leading-relaxed text-[#4E483F]">{t.partnerBody(ai.name)}</p>
            <Link
              href={`/@${ai.slug}`}
              className="group mt-5 flex items-center gap-4 rounded-2xl border border-[#DDD5CA] bg-[#F3EFE6] p-4 transition-colors hover:border-[#D10E63]/50"
            >
              <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-[#D10E63]/20">
                <Image src={ai.avatar || '/placeholder.svg'} alt={ai.name} fill className="object-cover" sizes="56px" />
                <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-[#F3EFE6] bg-emerald-500" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#D10E63]">{t.aiTag}</p>
                <h3 className="mt-0.5 font-sf text-lg font-bold text-[#1C1A17]">{ai.name}</h3>
                <p className="truncate text-sm text-[#6B6560]">{ai.role[lang]}</p>
              </div>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#D10E63]">
                {t.viewPartner}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}
