'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { type StoreItem, DOMAIN_LABELS } from '@/lib/store-catalog'

/**
 * A single profil métier card. The WHOLE card is the link (one focus target),
 * warm-grey border, generous padding, no generic role icon (avoids the
 * template look), a 1–2px lift on hover and a crisp focus ring. Shows the
 * profil name, its primary responsibility, and up to three key responsibilities.
 */
export function ProfilCard({ item }: { item: StoreItem }) {
  const { lang } = useLanguage()
  const domain = DOMAIN_LABELS[item.facet]?.[lang]
  const responsibilities = (item.knowHow ?? []).slice(0, 3)
  const cta = lang === 'fr' ? 'Ajouter à un Collaborateur IA' : 'Add to an AI Collaborator'

  return (
    <Link
      href={`/decouvrir?store=${item.slug}`}
      className="group flex flex-col rounded-2xl border border-[#E1D9C9] bg-[#FBF9F3] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#D10E63]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F1EA]"
    >
      {domain && (
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#A89C88]">{domain}</span>
      )}
      <h3 className="mt-2 text-[19px] font-semibold tracking-[-0.01em] text-[#1C1A17]">{item.name[lang]}</h3>
      <p className="mt-2 text-pretty text-[14px] leading-relaxed text-[#6B6459]">{item.description[lang]}</p>

      <ul className="mt-4 flex flex-col gap-1.5">
        {responsibilities.map((r, i) => (
          <li key={i} className="flex items-start gap-2 text-[13px] leading-snug text-[#4E483F]">
            <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#C7BDAC]" />
            {r[lang]}
          </li>
        ))}
      </ul>

      <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#B00C54]">
        {cta}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  )
}
