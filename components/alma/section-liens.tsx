'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { Kicker } from '@/components/home/section-kicker'

const COPY = {
  fr: {
    kicker: 'Liens produit',
    items: [
      {
        eyebrow: 'Missions',
        title: 'Commencez par le travail à accomplir.',
        body: 'Décrivez votre besoin à Alma ou choisissez une mission existante.',
        cta: 'Explorer les missions',
        href: '/missions',
      },
      {
        eyebrow: 'Collaborateurs IA',
        title: 'Découvrez qui prendra le travail en charge.',
        body: 'Identité, mémoire, profils métier, compétences et applications évoluent sans repartir de zéro.',
        cta: 'Découvrir les Collaborateurs IA',
        href: '/collaborateurs-ia',
      },
      {
        eyebrow: 'Espace de travail collaboratif',
        title: 'Suivez le travail, les validations et les résultats.',
        body: 'Humains et Collaborateurs IA partagent les mêmes missions et le même contexte.',
        cta: 'Découvrir l’espace de travail collaboratif',
        href: '/workspace',
      },
    ],
  },
  en: {
    kicker: 'Product links',
    items: [
      {
        eyebrow: 'Missions',
        title: 'Start with the work to be done.',
        body: 'Describe your need to Alma or pick an existing mission.',
        cta: 'Explore missions',
        href: '/missions',
      },
      {
        eyebrow: 'AI Collaborators',
        title: 'Discover who will take the work on.',
        body: 'Identity, memory, job profiles, skills and applications evolve without starting from scratch.',
        cta: 'Discover AI Collaborators',
        href: '/collaborateurs-ia',
      },
      {
        eyebrow: 'Collaborative workspace',
        title: 'Follow the work, the validations and the results.',
        body: 'Humans and AI Collaborators share the same missions and the same context.',
        cta: 'Discover the collaborative workspace',
        href: '/workspace',
      },
    ],
  },
} as const

export function SectionLiens() {
  const { lang } = useLanguage()
  const t = COPY[lang]

  return (
    <section className="border-b border-[#E7E0D2] bg-[#F4F1EA] px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <Kicker>{t.kicker}</Kicker>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {t.items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className="group flex flex-col rounded-3xl border border-[#E4DDCE] bg-[#FBF9F3] p-6 transition-colors hover:border-[#D10E63]/40 hover:bg-[#FBF3F7]"
            >
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#A89C88]">{it.eyebrow}</p>
              <p className="mt-3 text-[19px] font-semibold leading-snug tracking-[-0.01em] text-[#1C1A17]">{it.title}</p>
              <p className="mt-2 flex-1 text-[14px] leading-relaxed text-[#5A5348]">{it.body}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#B00C54]">
                {it.cta}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
