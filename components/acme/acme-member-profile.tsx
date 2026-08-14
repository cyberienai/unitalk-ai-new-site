'use client'

import Image from 'next/image'
import { ArrowRight, BadgeCheck, CalendarDays, Globe, Mail, Sparkles } from 'lucide-react'
import { useLanguage, useT } from '@/lib/language-context'
import { getAcmeMember, getMemberProfile, ACME } from '@/lib/acme-demo'
import { ROLE_DETAILS } from '@/lib/collaborators-catalog'
import { Breadcrumb, Monogram } from '@/components/acme/acme-shared'

export function AcmeMemberProfile({ id }: { id: string }) {
  const { lang } = useLanguage()
  const member = getAcmeMember(id)
  const profile = getMemberProfile(id)

  const t = useT({
    fr: {
      back: "← Retour à l'équipe",
      at: 'chez',
      published: 'Profil public',
      verified: 'Identité vérifiée',
      writePlaceholder: (name: string) => `Écrire à ${name}...`,
      proxyNote: (ai: string) => `${ai} répond en premier et traite ce qui peut l’être`,
      calendar: 'Prendre rendez-vous',
      email: 'Envoyer un message',
      proxyTitle: (ai: string) => `${ai} filtre pour ${'lui'}`,
      proxyIntro: (ai: string, name: string) =>
        `${ai}, l’assistante IA de ${name}, accueille toute personne — connue ou non — délègue les tâches sans valeur ajoutée et ne mobilise ${name} que lorsque c’est utile.`,
      proxyHandlesTitle: 'Ce qu’elle gère seule',
      delegateTitle: 'Ce que vous pouvez déléguer',
      openness: 'Ouvert aux contacts externes',
      hosted: 'Identité numérique hébergée par',
      ownership: (company: string) => `Profil publié par le membre. Mémoire et compétences propriété d'${company}.`,
    },
    en: {
      back: '← Back to the team',
      at: 'at',
      published: 'Public profile',
      verified: 'Verified identity',
      writePlaceholder: (name: string) => `Write to ${name}...`,
      proxyNote: (ai: string) => `${ai} replies first and handles what she can`,
      calendar: 'Book a meeting',
      email: 'Send a message',
      proxyTitle: (ai: string) => `${ai} filters for them`,
      proxyIntro: (ai: string, name: string) =>
        `${ai}, ${name}'s AI assistant, welcomes anyone — known or not — delegates no-value-added tasks and only involves ${name} when it matters.`,
      proxyHandlesTitle: 'What she handles alone',
      delegateTitle: 'What you can delegate',
      openness: 'Open to external contacts',
      hosted: 'Digital identity hosted by',
      ownership: (company: string) => `Profile published by the member. Memory and skills owned by ${company}.`,
    },
  })

  if (!member || !profile) return null

  const ai = member.linkedTo ? getAcmeMember(member.linkedTo) : undefined
  const aiName = ai?.name ?? 'Unitalk'
  const aiDetail = ai?.slug ? ROLE_DETAILS[ai.slug] : undefined

  return (
    <main className="w-full bg-[#FBF9F3]">
      <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 py-6">
          <Breadcrumb items={[{ label: ACME.name }, { label: member.name }]} />
        </div>

        {/* Identity */}
        <div className="flex flex-col items-center pt-10 text-center">
          <Monogram name={member.name} color={member.color} size="lg" />
          <span className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-[#EDE7DA] px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5F594F]">
            <Globe className="h-3.5 w-3.5" />
            {t.published}
          </span>
          <h1 className="mt-4 font-serif text-4xl font-semibold tracking-[-0.02em] text-[#1C1A17] md:text-5xl">{member.name}</h1>
          <p className="mt-3 text-xl text-[#6B6560]">
            <span className="font-semibold text-[#1C1A17]">{member.role[lang]}</span> {t.at} {ACME.name}
          </p>
          <p className="mx-auto mt-4 max-w-lg text-pretty leading-relaxed text-[#6B6560]">{profile.headline[lang]}</p>
          <p className="mt-4 inline-flex items-center gap-1.5 text-sm text-[#857C6E]">
            <BadgeCheck className="h-4 w-4 text-[#2F5D50]" />
            {t.verified}
          </p>
        </div>

        {/* Contact box — routed through the AI proxy */}
        <div className="mt-10 rounded-3xl border border-[#E4DDCE] bg-[#FBF9F3] p-6 shadow-[0_1px_0_rgba(0,0,0,0.02)]">
          <p className="text-lg text-[#A09789]">{t.writePlaceholder(member.name)}</p>
          <div className="mt-8 flex items-center justify-between gap-4 border-t border-[#EEE8DB] pt-4">
            <span className="flex items-center gap-2 font-mono text-sm text-[#857C6E]">
              {aiDetail ? (
                <span className="relative h-6 w-6 overflow-hidden rounded-full ring-1 ring-[#D10E63]/20">
                  <Image src={aiDetail.avatar || '/placeholder.svg'} alt={aiName} fill className="object-cover" sizes="24px" />
                </span>
              ) : (
                <Sparkles className="h-4 w-4 text-[#2F5D50]" />
              )}
              {t.proxyNote(aiName)}
            </span>
            <button
              type="button"
              aria-label={t.writePlaceholder(member.name)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#2F5D50] text-[#FBF9F3] transition-transform hover:-translate-y-0.5"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <ActionPill icon={<CalendarDays className="h-4 w-4" />} label={t.calendar} />
          <ActionPill icon={<Mail className="h-4 w-4" />} label={t.email} />
        </div>

        {/* AI proxy explanation */}
        <section className="mt-12 rounded-3xl border border-[#E4DDCE] bg-[#F3EFE6] p-6 sm:p-8">
          <div className="flex items-center gap-3">
            {aiDetail ? (
              <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-[#D10E63]/20">
                <Image src={aiDetail.avatar || '/placeholder.svg'} alt={aiName} fill className="object-cover" sizes="44px" />
              </span>
            ) : (
              <Monogram name={aiName} color={ai?.color ?? '#2F5D50'} size="sm" />
            )}
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#D10E63]">{t.proxyTitle(aiName)}</p>
              {ai?.slug && (
                <a href={`/team/${ai.slug}/profil`} className="text-sm font-bold text-[#1C1A17] underline-offset-2 hover:text-[#D10E63] hover:underline">
                  {aiName} · {ai.role[lang]}
                </a>
              )}
            </div>
          </div>
          <p className="mt-4 text-pretty leading-relaxed text-[#4E483F]">{t.proxyIntro(aiName, member.name)}</p>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#857C6E]">{t.proxyHandlesTitle}</p>
              <ul className="space-y-2">
                {profile.proxyHandles.map((item) => (
                  <li key={item.fr} className="flex items-start gap-2 text-sm text-[#1C1A17]">
                    <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[#2F5D50]" />
                    {item[lang]}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#857C6E]">{t.delegateTitle}</p>
              <ul className="space-y-2">
                {profile.delegate.map((item) => (
                  <li key={item.fr} className="flex items-start gap-2 text-sm text-[#1C1A17]">
                    <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-[#D10E63]" />
                    {item[lang]}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-[#E7EDE5] px-3 py-1.5 text-xs font-semibold text-[#2F5D50]">
            <Globe className="h-3.5 w-3.5" />
            {t.openness}
          </p>
        </section>

        {/* Ownership note */}
        <p className="mx-auto mt-14 max-w-md text-pretty pb-20 text-center text-sm leading-6 text-[#A09789]">
          {t.hosted}{' '}
          <a href="/" className="font-semibold text-[#6B6560] underline underline-offset-2 hover:text-[#D10E63]">
            Unitalk
          </a>
          . {t.ownership(ACME.name)}
        </p>
      </div>
    </main>
  )
}

function ActionPill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button
      type="button"
      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#E4DDCE] bg-[#FBF9F3] px-5 text-sm font-semibold text-[#1C1A17] transition-colors hover:border-[#D10E63] hover:text-[#D10E63]"
    >
      {icon}
      {label}
    </button>
  )
}
