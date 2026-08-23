import Link from 'next/link'
import { ArrowRight, Eye, KeyRound, ShieldCheck, UserCheck } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { localizedHref } from '@/lib/i18n-routing'

const COPY = {
  fr: {
    kicker: 'Vous gardez le contrôle',
    title: 'Autonome sous votre supervision.',
    items: [
      ['Accès explicites', 'Le Collaborateur accède uniquement aux outils et espaces que vous autorisez.'],
      ['Validation humaine', 'Vous définissez les actions qu’il peut réaliser et celles qui exigent une décision.'],
      ['Environnement dédié', 'Chaque Collaborateur travaille dans un environnement configuré pour sa mission.'],
      ['Traçabilité', 'Son activité, ses résultats et ses demandes de validation restent visibles dans le Workspace.'],
    ],
    cta: 'Consulter la sécurité et le DPA',
  },
  en: {
    kicker: 'You stay in control',
    title: 'Autonomous under your supervision.',
    items: [
      ['Explicit access', 'The Collaborator accesses only the tools and spaces you authorize.'],
      ['Human approval', 'You define which actions it can perform and which require a decision.'],
      ['Dedicated environment', 'Each Collaborator works in an environment configured for its mission.'],
      ['Traceability', 'Its activity, results and approval requests remain visible in Workspace.'],
    ],
    cta: 'View security and the DPA',
  },
} as const

const ICONS = [KeyRound, UserCheck, ShieldCheck, Eye]

export function HomeGuardrails({ lang }: { lang: Lang }) {
  const copy = COPY[lang]
  return (
    <section aria-labelledby="home-guardrails-title" className="border-b border-[#D8D0C2] bg-[#1C1A17] py-16 text-[#F3EFE6] sm:py-20">
      <div className="editorial-shell grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-start">
        <div>
          <p className="inline-flex items-center rounded-xl border border-[#F15B9B]/40 bg-[#D10E63]/15 px-3.5 py-2 text-[13px] font-bold text-[#F7B8D2]">{copy.kicker}</p>
          <h2 id="home-guardrails-title" className="mt-5 max-w-xl text-balance text-[clamp(2.35rem,4vw,3.5rem)] font-bold leading-[.98] tracking-[-.05em]">{copy.title}</h2>
          <Link href={localizedHref('security', lang)} className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full border border-[#F15B9B] px-6 text-sm font-bold text-white transition-colors hover:bg-[#D10E63]">{copy.cta}<ArrowRight aria-hidden className="size-4" /></Link>
        </div>
        <div className="grid overflow-hidden rounded-[24px] border border-white/15 bg-white/[.04] sm:grid-cols-2">
          {copy.items.map(([title, body], index) => {
            const Icon = ICONS[index]
            return <article key={title} className="border-b border-white/15 p-6 last:border-b-0 sm:min-h-52 sm:border-r sm:p-7 sm:[&:nth-child(even)]:border-r-0 sm:[&:nth-child(n+3)]:border-b-0"><Icon aria-hidden className="size-5 text-[#F15B9B]"/><h3 className="mt-7 text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-7 text-[#CFC5B5]">{body}</p></article>
          })}
        </div>
      </div>
    </section>
  )
}
