'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { UnitalkLogo } from './unitalk-logo'
import { useLanguage } from '@/lib/language-context'

const T = {
  fr: {
    eyebrow: 'Unitalk · L’entreprise augmentée',
    title: 'Le travail évolue.',
    accent: 'Votre équipe aussi.',
    cta: 'Créer mon Collaborateur IA',
    secondaryCta: 'Découvrir les profils',
    navigation: 'Navigation du pied de page',
    columns: [
      {
        title: 'Produit',
        links: [
          ['Collaborateurs IA', '/marketplace/collaborateurs-ia'],
          ['Missions', '/missions'],
          ['Compétences', '/marketplace/competences'],
          ['Tarifs', '/tarifs'],
        ],
      },
      {
        title: 'Ressources',
        links: [
          ['Blog', '/blog'],
          ['Documentation', '/documentation'],
          ['Academy', '/academy'],
          ['Changelog', '/changelog'],
        ],
      },
      {
        title: 'Entreprise',
        links: [
          ['À propos', '/manifeste'],
          ['Contact', 'https://cal.com/patrickchassany/30min'],
          ['Sécurité', '/securite'],
        ],
      },
      {
        title: 'Partenaires',
        links: [
          ['Programme d’affiliation', '/partenaires#affiliation'],
          ['Devenir partenaire', '/partenaires'],
          ['Réseau de co-créateurs', '/reseau-co-createurs'],
        ],
      },
    ],
    legal: [
      ['Mentions légales', '/mentions-legales'],
      ['Confidentialité', '/confidentialite'],
      ['Conditions', '/conditions'],
    ],
    rights: 'Tous droits réservés.',
    signature: 'Open source · Hébergé en France · Propulsé par Hermes',
    language: 'Langue du site',
  },
  en: {
    eyebrow: 'Unitalk · The augmented organization',
    title: 'Work is evolving.',
    accent: 'So is your team.',
    cta: 'Create my AI Collaborator',
    secondaryCta: 'Discover profiles',
    navigation: 'Footer navigation',
    columns: [
      {
        title: 'Product',
        links: [
          ['AI Collaborators', '/marketplace/collaborateurs-ia'],
          ['Missions', '/missions'],
          ['Skills', '/marketplace/competences'],
          ['Pricing', '/tarifs'],
        ],
      },
      {
        title: 'Resources',
        links: [
          ['Blog', '/blog'],
          ['Documentation', '/documentation'],
          ['Academy', '/academy'],
          ['Changelog', '/changelog'],
        ],
      },
      {
        title: 'Company',
        links: [
          ['About', '/manifeste'],
          ['Contact', 'https://cal.com/patrickchassany/30min'],
          ['Security', '/securite'],
        ],
      },
      {
        title: 'Partners',
        links: [
          ['Affiliate program', '/partenaires#affiliation'],
          ['Become a partner', '/partenaires'],
          ['Co-creator network', '/reseau-co-createurs'],
        ],
      },
    ],
    legal: [
      ['Legal notice', '/mentions-legales'],
      ['Privacy', '/confidentialite'],
      ['Terms', '/conditions'],
    ],
    rights: 'All rights reserved.',
    signature: 'Open source · Hosted in France · Powered by Hermes',
    language: 'Site language',
  },
} as const

export function SiteFooter() {
  const { lang, setLang } = useLanguage()
  const t = T[lang]

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#1C1A17] text-[#F3EFE6]">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-48 size-[34rem] rounded-full border-[5rem] border-[#D10E63]/10" />

      <div className="editorial-shell relative py-14 sm:py-20 lg:py-24">
        <div className="grid gap-10 border-b border-white/15 pb-14 sm:pb-16 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[.18em] text-[#F2A4C5]">{t.eyebrow}</p>
            <h2 className="mt-6 max-w-4xl text-[clamp(2.8rem,6.2vw,6.5rem)] font-semibold leading-[.88] tracking-[-.065em]">
              {t.title}
              <span className="block text-[#F04F91]">{t.accent}</span>
            </h2>
          </div>

          <div className="flex flex-col items-start gap-5 lg:items-end">
            <Link href="/missions?composer=1&source=footer" className="group inline-flex min-h-14 items-center gap-8 rounded-full bg-[#F3EFE6] px-6 text-sm font-bold text-[#1C1A17] transition-transform hover:-translate-y-0.5">
              {t.cta}
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link href="/marketplace/collaborateurs-ia" className="border-b border-white/40 pb-1 text-sm font-semibold text-[#C8C0B3] transition-colors hover:border-white hover:text-white">
              {t.secondaryCta}
            </Link>
          </div>
        </div>

        <div className="grid gap-12 py-14 sm:grid-cols-[1fr_2fr] sm:py-16 lg:grid-cols-[1.05fr_3fr]">
          <Link href="/" aria-label="Unitalk" className="inline-flex h-fit w-fit items-center gap-3">
            <UnitalkLogo size={30} />
            <span className="font-inter text-lg font-semibold">Unitalk</span>
          </Link>

          <nav aria-label={t.navigation} className="grid grid-cols-2 gap-x-8 gap-y-11 lg:grid-cols-4">
            {t.columns.map((column) => (
              <div key={column.title}>
                <h3 className="font-mono text-[10px] font-bold uppercase tracking-[.16em] text-[#F2A4C5]">{column.title}</h3>
                <ul className="mt-5 space-y-3.5">
                  {column.links.map(([label, href]) => (
                    <li key={label}>
                      {href.startsWith('http') ? (
                        <a href={href} target="_blank" rel="noreferrer" className="text-sm text-[#B8AF9F] transition-colors hover:text-white">{label}</a>
                      ) : (
                        <Link href={href} className="text-sm text-[#B8AF9F] transition-colors hover:text-white">{label}</Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="border-t border-white/15 pt-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#8F877A]">
              <span>© {new Date().getFullYear()} Unitalk AI. {t.rights}</span>
              {t.legal.map(([label, href]) => <Link key={label} href={href} className="transition-colors hover:text-white">{label}</Link>)}
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center lg:justify-end">
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[.12em] text-[#8F877A]">{t.signature}</p>
              <div aria-label={t.language} className="flex w-fit items-center rounded-full border border-white/15 p-1 text-[10px] font-bold">
                {(['fr', 'en'] as const).map((language) => (
                  <button key={language} type="button" onClick={() => setLang(language)} aria-pressed={lang === language} className={`rounded-full px-2.5 py-1 uppercase transition-colors ${lang === language ? 'bg-[#F3EFE6] text-[#1C1A17]' : 'text-[#8F877A] hover:text-white'}`}>
                    {language}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
