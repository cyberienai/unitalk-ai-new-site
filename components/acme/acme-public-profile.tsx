'use client'

import { ArrowRight, BadgeCheck, CalendarDays, Mail, Phone } from 'lucide-react'
import { useLanguage, useT } from '@/lib/language-context'
import { getAcmeAiBySlug, getAcmeMember, ACME } from '@/lib/acme-demo'
import { Breadcrumb, Monogram } from '@/components/acme/acme-shared'

export function AcmePublicProfile({ slug }: { slug: string }) {
  const { lang } = useLanguage()
  const member = getAcmeAiBySlug(slug)

  const t = useT({
    fr: {
      back: "← Retour à l'équipe",
      at: 'chez',
      linkedF: 'Rattachée à',
      linkedM: 'Rattaché à',
      verified: 'Identité vérifiée',
      writePlaceholder: (name: string) => `Écrire à ${name}...`,
      responds: 'Répond en moins de 10 secondes',
      calendar: 'Prendre rendez-vous',
      email: 'Envoyer un email',
      callF: 'Appeler',
      skills: (name: string) => `Ce que ${name} sait faire`,
      hosted: 'Identité numérique hébergée par',
      ownership: (company: string) => `Mémoire et compétences propriété exclusive d'${company}.`,
    },
    en: {
      back: '← Back to the team',
      at: 'at',
      linkedF: 'Reports to',
      linkedM: 'Reports to',
      verified: 'Verified identity',
      writePlaceholder: (name: string) => `Write to ${name}...`,
      responds: 'Replies in under 10 seconds',
      calendar: 'Book a meeting',
      email: 'Send an email',
      callF: 'Call',
      skills: (name: string) => `What ${name} can do`,
      hosted: 'Digital identity hosted by',
      ownership: (company: string) => `Memory and skills exclusively owned by ${company}.`,
    },
  })

  if (!member) return null
  const boss = member.linkedTo ? getAcmeMember(member.linkedTo) : undefined
  const linkedLabel = lang === 'fr' ? t.linkedF : t.linkedM

  return (
    <main className="w-full bg-[#FBF9F3]">
      <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 py-6">
          <Breadcrumb items={[{ label: ACME.name, href: '/team/annuaire' }, { label: member.name }]} />
          <a href="/team/annuaire" className="font-mono text-sm text-[#857C6E] transition-colors hover:text-[#D10E63]">
            {t.back}
          </a>
        </div>

        <div className="flex flex-col items-center pt-10 text-center">
          <div className="relative">
            <Monogram name={member.name} color={member.color} size="lg" />
            <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-[#FBF9F3] bg-emerald-500" aria-hidden="true" />
          </div>

          <h1 className="mt-6 font-serif text-4xl font-semibold tracking-[-0.02em] text-[#1C1A17] md:text-5xl">{member.name}</h1>
          <p className="mt-3 text-xl text-[#6B6560]">
            <span className="font-semibold text-[#1C1A17]">{member.role[lang]}</span> {t.at} {ACME.name}
          </p>
          {boss && (
            <p className="mt-3 text-[#6B6560]">
              {linkedLabel} <span className="font-semibold text-[#1C1A17]">{boss.name}</span>
            </p>
          )}
          <p className="mt-4 inline-flex items-center gap-1.5 text-sm text-[#857C6E]">
            <BadgeCheck className="h-4 w-4 text-[#2F5D50]" />
            {t.verified}
          </p>
        </div>

        {/* Message box */}
        <div className="mt-10 rounded-3xl border border-[#E4DDCE] bg-[#FBF9F3] p-6 shadow-[0_1px_0_rgba(0,0,0,0.02)]">
          <p className="text-lg text-[#A09789]">{t.writePlaceholder(member.name)}</p>
          <div className="mt-8 flex items-center justify-between gap-4 border-t border-[#EEE8DB] pt-4">
            <span className="font-mono text-sm text-[#857C6E]">{t.responds}</span>
            <button
              type="button"
              aria-label={t.writePlaceholder(member.name)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#2F5D50] text-[#FBF9F3] transition-transform hover:-translate-y-0.5"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Secondary actions */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <ActionPill icon={<CalendarDays className="h-4 w-4" />} label={t.calendar} />
          <ActionPill icon={<Mail className="h-4 w-4" />} label={t.email} />
          <ActionPill icon={<Phone className="h-4 w-4" />} label={`${t.callF} ${member.name}`} />
        </div>

        {/* Skills link → catalog detail */}
        <div className="mt-10 text-center">
          <a
            href={`/team/${slug}`}
            className="inline-flex items-center gap-2 font-semibold text-[#6B6560] transition-colors hover:text-[#D10E63]"
          >
            {t.skills(member.name)}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

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
