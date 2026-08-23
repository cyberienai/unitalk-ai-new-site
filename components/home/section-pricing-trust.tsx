import Link from 'next/link'
import { ArrowRight, Database, KeyRound, Server } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { Kicker } from './section-kicker'

const COPY = {
  fr: {
    kicker: 'Sécurité et contrôle',
    title: 'Vos données, vos accès, vos règles.',
    lead: 'Une plateforme stable, en production depuis plus d’un an, qui limite chaque Collaborateur IA au périmètre que vous autorisez.',
    items: ['En production depuis plus d’un an', 'Hébergement en France et données chiffrées', 'DPA disponible'],
    cta: 'Voir la sécurité et le DPA',
  },
  en: {
    kicker: 'Security and control',
    title: 'Your data, your access, your rules.',
    lead: 'A stable platform, in production for over a year, that limits each AI Collaborator to the scope you authorize.',
    items: ['In production for over a year', 'Hosted in France with encrypted data', 'DPA available'],
    cta: 'View security and the DPA',
  },
} as const

export function HomeTrust({ lang }: { lang: Lang }) {
  const t = COPY[lang]
  const icons = [Server, Database, KeyRound]
  return (
    <section className="border-b border-[#D8D0C2] bg-[#EAE3D4] py-10 sm:py-12">
      <div className="editorial-shell">
        <div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div>
            <Kicker>{t.kicker}</Kicker>
            <h2 className="mt-4 max-w-2xl text-[clamp(2rem,3.5vw,3rem)] font-bold leading-[1] tracking-[-.045em]">{t.title}</h2>
            <p className="mt-4 max-w-xl text-[15px] leading-6 text-[#4E483F]">{t.lead}</p>
          </div>
          <div>
            <ul className="grid gap-3 sm:grid-cols-3">
              {t.items.map((item, index) => {
                const Icon = icons[index]
                return <li key={item} className="flex min-h-20 items-center gap-3 rounded-2xl border border-[#CFC5B5] bg-[#FAF8F3] px-4 py-3 text-[13px] font-bold leading-5"><Icon className="size-4 shrink-0 text-[#B00C54]"/>{item}</li>
              })}
            </ul>
            <Link href={lang === 'fr' ? '/securite' : '/en/security'} className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-bold text-[#B00C54] underline decoration-[#D10E63]/30 underline-offset-4">{t.cta}<ArrowRight className="size-4"/></Link>
          </div>
        </div>
      </div>
    </section>
  )
}
