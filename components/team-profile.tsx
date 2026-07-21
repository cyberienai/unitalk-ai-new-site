'use client'

import Image from 'next/image'
import { ArrowLeft, ArrowRight, Building2, CalendarDays, Check, MessageSquare, Phone, Plus, Star, Wrench } from 'lucide-react'
import { useLanguage, useT } from '@/lib/language-context'
import { ROLE_DETAILS } from '@/lib/collaborators-catalog'
import { getAcmeAiBySlug } from '@/lib/acme-demo'

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

  const t = useT({
    fr: {
      back: 'Tous les métiers',
      available: 'Disponible maintenant',
      chat: 'Discuter',
      call: 'Téléphone',
      calendar: 'Calendrier',
      add: 'Ajouter à mon équipe',
      about: 'À propos',
      skills: 'Compétences',
      tools: 'Outils',
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
      about: 'About',
      skills: 'Skills',
      tools: 'Tools',
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
        <a
          href="/team"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#6B6560] transition-colors hover:text-[#D10E63]"
        >
          <ArrowLeft className="h-4 w-4" />
          {t.back}
        </a>

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
                <p className="mt-1 text-[#6B6560]">{detail.role[lang]}</p>

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
              <ActionButton icon={<Plus className="h-4 w-4" />} label={t.add} className="col-span-2" primary />
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
              <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#857C6E]">{t.tools}</h2>
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
}: {
  icon: React.ReactNode
  label: string
  className?: string
  primary?: boolean
}) {
  return (
    <button
      type="button"
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-4 text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 ${
        primary
          ? 'bg-[#D10E63] text-[#FBF9F3] hover:-translate-y-0.5'
          : 'border border-[#DDD5CA] bg-[#FBF9F3] text-[#1C1A17] hover:border-[#D10E63] hover:text-[#D10E63]'
      } ${className}`}
    >
      {icon}
      {label}
    </button>
  )
}
