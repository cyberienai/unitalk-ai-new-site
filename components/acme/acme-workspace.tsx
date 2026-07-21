'use client'

import { ArrowUpRight, ClipboardList } from 'lucide-react'
import { useLanguage, useT } from '@/lib/language-context'
import { getAcmeAiBySlug, getAcmeMember, ACME_WORKSPACES, ACME } from '@/lib/acme-demo'
import { Breadcrumb, InternalBanner, Monogram } from '@/components/acme/acme-shared'

export function AcmeWorkspace({ slug }: { slug: string }) {
  const { lang } = useLanguage()
  const member = getAcmeAiBySlug(slug)
  const workspace = ACME_WORKSPACES[slug]

  const t = useT({
    fr: {
      space: 'Espace équipe',
      publicView: '← Vue publique',
      internalTitle: (name: string) => `${name} — vue interne`,
      assign: 'Assigner une tâche',
      open: 'Ouvrir dans Unitalk Work',
      tools: 'Outils connectés',
      worksWith: 'Elle travaille avec',
      worksWithM: 'Il travaille avec',
      collab: (name: string) =>
        `${name} peut solliciter ses collègues sur une mission commune. Ce qu'elle apprend reste partagé au sein d'${ACME.name}.`,
      today: "Aujourd'hui",
      date: 'Lundi 20 juillet',
    },
    en: {
      space: 'Team space',
      publicView: '← Public view',
      internalTitle: (name: string) => `${name} — internal view`,
      assign: 'Assign a task',
      open: 'Open in Unitalk Work',
      tools: 'Connected tools',
      worksWith: 'She works with',
      worksWithM: 'He works with',
      collab: (name: string) =>
        `${name} can call on colleagues for a shared mission. What they learn stays shared within ${ACME.name}.`,
      today: 'Today',
      date: 'Monday, July 20',
    },
  })

  if (!member || !workspace) return null
  const worksWithLabel = lang === 'fr' ? t.worksWith : t.worksWithM

  return (
    <main className="w-full bg-[#FBF9F3]">
      <InternalBanner />
      <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 border-b border-[#E4DDCE] py-6">
          <Breadcrumb
            items={[{ label: ACME.name, href: '/team/annuaire' }, { label: member.name, href: `/team/${slug}/profil` }, { label: t.space }]}
          />
          <a
            href={`/team/${slug}/profil`}
            className="inline-flex min-h-9 items-center rounded-full border border-[#E4DDCE] bg-[#FBF9F3] px-4 font-mono text-sm text-[#4E483F] transition-colors hover:border-[#D10E63] hover:text-[#D10E63]"
          >
            {t.publicView}
          </a>
        </div>

        <header className="pt-14">
          <h1 className="font-serif text-4xl font-semibold tracking-[-0.02em] text-[#1C1A17] md:text-5xl">
            {t.internalTitle(member.name)}
          </h1>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#DDD5CA] bg-[#FBF9F3] px-5 text-sm font-bold text-[#1C1A17] transition-colors hover:border-[#D10E63] hover:text-[#D10E63]"
            >
              <ClipboardList className="h-4 w-4" />
              {t.assign}
            </button>
            <button
              type="button"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#2A3B2E] px-5 text-sm font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5"
            >
              {t.open}
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </header>

        {/* Connected tools */}
        <section className="border-t border-[#E4DDCE] py-10">
          <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#857C6E]">{t.tools}</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {workspace.tools.map((tool) => (
              <span
                key={tool}
                className="rounded-xl border border-[#E4DDCE] bg-[#F8F5EC] px-4 py-2.5 font-mono text-sm text-[#4E483F]"
              >
                {tool}
              </span>
            ))}
          </div>
        </section>

        {/* Works with */}
        <section className="border-t border-[#E4DDCE] py-10">
          <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#857C6E]">{worksWithLabel}</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {workspace.worksWith.map((id) => {
              const colleague = getAcmeMember(id)
              if (!colleague) return null
              return (
                <a
                  key={id}
                  href={colleague.slug ? `/team/${colleague.slug}/espace` : undefined}
                  className="flex items-center gap-4 rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] px-5 py-4 transition-colors hover:border-[#D10E63]/50"
                >
                  <Monogram name={colleague.name} color={colleague.color} />
                  <div className="min-w-0">
                    <p className="font-sf font-bold text-[#1C1A17]">{colleague.name}</p>
                    <p className="truncate text-sm text-[#857C6E]">{colleague.role[lang]}</p>
                  </div>
                </a>
              )
            })}
          </div>
          <p className="mt-5 max-w-2xl text-pretty leading-relaxed text-[#6B6560]">{t.collab(member.name)}</p>
        </section>

        {/* Today */}
        <section className="border-t border-[#E4DDCE] py-10 pb-20">
          <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#857C6E]">{t.today}</h2>
          <div className="mt-5 overflow-hidden rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3]">
            <p className="border-b border-[#EEE8DB] px-6 py-4 font-mono text-sm text-[#857C6E]">{t.date}</p>
            <ul>
              {workspace.today.map((stat, i) => (
                <li
                  key={stat.label.en}
                  className={`flex items-center justify-between px-6 py-5 ${i > 0 ? 'border-t border-[#EEE8DB]' : ''}`}
                >
                  <span className="text-[#1C1A17]">{stat.label[lang]}</span>
                  <span className="font-serif text-2xl font-semibold text-[#1C1A17]">{stat.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </main>
  )
}
