'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Building2, CalendarDays, Check, MessageSquare, Phone, Plus, ShieldCheck, Star, UserRound, Wrench } from 'lucide-react'
import { useLanguage, useT } from '@/lib/language-context'
import { ROLE_DETAILS } from '@/lib/collaborators-catalog'
import { getAcmeAiBySlug } from '@/lib/acme-demo'
import { useMyTeam } from '@/lib/my-team-context'

const META: Record<string, { rating: number; reviews: number }> = {
  emma: { rating: 4.9, reviews: 128 },
  alex: { rating: 4.8, reviews: 94 },
  marcus: { rating: 4.7, reviews: 76 },
  sophia: { rating: 4.9, reviews: 152 },
}

export function TeamProfile({ slug }: { slug: string }) {
  const { lang } = useLanguage()
  const detail = ROLE_DETAILS[slug]
  const meta = META[slug] ?? { rating: 4.8, reviews: 80 }
  const { has, toggle } = useMyTeam()
  const inTeam = has(slug)

  // Accord en genre pour « Connecté·e à » (FR uniquement)
  const FEMALE_SLUGS = ['emma', 'sophia', 'nadia']
  const isFemale = FEMALE_SLUGS.includes(slug)
  const connectedLabel = lang === 'fr' ? `Connecté${isFemale ? 'e' : ''} à` : 'Connected to'
  const statusLabel = lang === 'fr' ? `Collaborateur${isFemale ? 'trice' : ''} IA` : 'AI Collaborator'

  const t = useT({
    fr: {
      back: 'Tous les métiers',
      available: 'Disponible maintenant',
      chat: 'Discuter',
      call: 'Téléphone',
      calendar: 'Calendrier',
      add: 'Ajouter à mon équipe',
      added: 'Ajouté à mon équipe',
      dataOwner: 'Propriétaire des données',
      responsibility: 'Responsable & données',
      manager: 'Responsable',
      companyLabel: 'Entreprise',
      about: 'À propos',
      skills: 'Compétences',
      missions: 'Missions types',
      reviews: 'avis',
      demoTitle: 'Voir en situation',
      demoBody: (name: string) => `Découvrez ${name} déployé chez Acme : son profil public et son espace équipe interne.`,
      demoCta: 'Ouvrir la démo Acme',
    },
    en: {
      back: 'All roles',
      available: 'Available now',
      chat: 'Chat',
      call: 'Call',
      calendar: 'Calendar',
      add: 'Add to my team',
      added: 'Added to my team',
      dataOwner: 'Data owner',
      responsibility: 'Manager & data',
      manager: 'Manager',
      companyLabel: 'Company',
      about: 'About',
      skills: 'Skills',
      missions: 'Typical missions',
      reviews: 'reviews',
      demoTitle: 'See it in action',
      demoBody: (name: string) => `See ${name} deployed at Acme: their public profile and internal team space.`,
      demoCta: 'Open the Acme demo',
    },
  })

  if (!detail) return null

  return (
    <main className="w-full bg-[#F3EFE6]">
      <div className="mx-auto max-w-5xl px-5 py-10 sm:px-6 sm:py-14 lg:px-8">
        <Link
          href="/team"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#6B6560] transition-colors hover:text-[#D10E63]"
        >
          <ArrowLeft className="h-4 w-4" />
          {t.back}
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-[320px_1fr] lg:gap-12">
          {/* Identity card + actions */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-3xl border border-[#DDD5CA] bg-[#FBF9F3]">
              <div className="relative aspect-square w-full">
                <Image
                  src={detail.avatar || '/placeholder.svg'}
                  alt={detail.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 320px"
                  priority
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2">
                  <h1 className="font-sf text-2xl font-bold tracking-[-0.02em] text-[#1C1A17]">{detail.name}</h1>
                </div>
                <p className="mt-0.5 font-mono text-sm text-[#D10E63]">
                  @{slug} <span className="text-[#857C6E]">· {detail.company.toLowerCase()}.ai</span>
                </p>
                <p className="mt-1 font-semibold text-[#1C1A17]">{statusLabel}</p>
                <p className="mt-0.5 text-sm text-[#6B6560]">
                  {detail.role[lang]}
                  {detail.managerHandle && (
                    <>
                      {' · '}
                      <Link href={`/@${detail.managerHandle}`} className="font-medium text-[#D10E63] hover:underline">
                        @{detail.managerHandle}
                      </Link>
                    </>
                  )}
                </p>

                <div className="mt-3 flex items-center gap-3">
                  <span className="flex items-center gap-1 text-sm font-semibold text-[#1C1A17]">
                    <Star className="h-4 w-4 fill-[#D10E63] text-[#D10E63]" />
                    {meta.rating.toFixed(1)}
                    <span className="font-normal text-[#857C6E]">
                      · {meta.reviews} {t.reviews}
                    </span>
                  </span>
                </div>

                <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {t.available}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <ActionButton icon={<MessageSquare className="h-4 w-4" />} label={t.chat} />
              <ActionButton icon={<Phone className="h-4 w-4" />} label={t.call} />
              <ActionButton icon={<CalendarDays className="h-4 w-4" />} label={t.calendar} />
              <ActionButton
                icon={inTeam ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                label={inTeam ? t.added : t.add}
                className="col-span-2"
                primary={!inTeam}
                selected={inTeam}
                pressed={inTeam}
                onClick={() => toggle({ slug, name: detail.name, role: detail.role[lang], avatar: detail.avatar })}
              />
            </div>

            {getAcmeAiBySlug(slug) && (
              <div className="mt-4 rounded-2xl border border-[#DDD5CA] bg-[#FBF9F3] p-5">
                <p className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#857C6E]">
                  <Building2 className="h-3.5 w-3.5" />
                  {t.demoTitle}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#6B6560]">{t.demoBody(detail.name)}</p>
                <a
                  href={`/team/${slug}/profil`}
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-[#D10E63] transition-[gap] hover:gap-2.5"
                >
                  {t.demoCta}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-10">
            <section>
              <span className="rounded-full bg-[#EAE3D4] px-3 py-1 text-[11px] font-medium text-[#4E483F]">
                {detail.department[lang]}
              </span>
              <h2 className="mt-4 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#857C6E]">{t.about}</h2>
              <p className="mt-3 text-pretty text-lg leading-relaxed text-[#1C1A17]">{detail.description[lang]}</p>
            </section>

            <section>
              <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#857C6E]">{t.skills}</h2>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {detail.skills.map((skill) => (
                  <li key={skill.en} className="flex items-start gap-2.5 text-[#1C1A17]">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#D10E63]" strokeWidth={2.5} />
                    <span className="text-sm">{skill[lang]}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#857C6E]">{connectedLabel}</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {detail.tools.map((tool) => (
                  <span
                    key={tool}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#DDD5CA] bg-[#FBF9F3] px-3.5 py-1.5 text-sm font-medium text-[#4E483F]"
                  >
                    <Wrench className="h-3.5 w-3.5 text-[#857C6E]" />
                    {tool}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#857C6E]">{t.missions}</h2>
              <ul className="mt-4 flex flex-col gap-3">
                {detail.missions.map((mission, i) => (
                  <li
                    key={mission.en}
                    className="flex items-center gap-4 rounded-2xl border border-[#DDD5CA] bg-[#FBF9F3] px-5 py-4"
                  >
                    <span className="font-mono text-sm font-semibold text-[#D10E63]">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-[#1C1A17]">{mission[lang]}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#857C6E]">{t.responsibility}</h2>
              <dl className="mt-4 divide-y divide-[#EAE3D4] overflow-hidden rounded-2xl border border-[#DDD5CA] bg-[#FBF9F3]">
                <div className="flex items-start gap-3 px-5 py-4">
                  <UserRound className="mt-0.5 h-4 w-4 shrink-0 text-[#857C6E]" />
                  <div className="min-w-0">
                    <dt className="text-[11px] font-medium uppercase tracking-wide text-[#857C6E]">{t.manager}</dt>
                    <dd className="mt-0.5 text-sm text-[#4E483F]">
                      <span className="font-semibold text-[#1C1A17]">{detail.manager.name}</span>
                      <span className="text-[#857C6E]"> · {detail.manager.role[lang]}</span>
                      {detail.managerEmail && (
                        <>
                          <br />
                          <a href={`mailto:${detail.managerEmail}`} className="font-medium text-[#D10E63] hover:underline">
                            {detail.managerEmail}
                          </a>
                        </>
                      )}
                    </dd>
                  </div>
                </div>
                <div className="flex items-start gap-3 px-5 py-4">
                  <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-[#857C6E]" />
                  <div className="min-w-0">
                    <dt className="text-[11px] font-medium uppercase tracking-wide text-[#857C6E]">{t.companyLabel}</dt>
                    <dd className="mt-0.5 text-sm font-semibold text-[#1C1A17]">{detail.company}</dd>
                  </div>
                </div>
                {detail.dataOwner && (
                  <div className="flex items-start gap-3 px-5 py-4">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#857C6E]" />
                    <div className="min-w-0">
                      <dt className="text-[11px] font-medium uppercase tracking-wide text-[#857C6E]">{t.dataOwner}</dt>
                      <dd className="mt-0.5 text-sm font-semibold text-[#1C1A17]">{detail.dataOwner}</dd>
                    </div>
                  </div>
                )}
              </dl>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}

function ActionButton({
  icon,
  label,
  className = '',
  primary = false,
  selected = false,
  pressed,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  className?: string
  primary?: boolean
  selected?: boolean
  pressed?: boolean
  onClick?: () => void
}) {
  const style = selected
    ? 'bg-[#1C1A17] text-[#FBF9F3] hover:-translate-y-0.5'
    : primary
      ? 'bg-[#D10E63] text-[#FBF9F3] hover:-translate-y-0.5'
      : 'border border-[#DDD5CA] bg-[#FBF9F3] text-[#1C1A17] hover:border-[#D10E63] hover:text-[#D10E63]'
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={pressed}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-4 text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 ${style} ${className}`}
    >
      {icon}
      {label}
    </button>
  )
}
