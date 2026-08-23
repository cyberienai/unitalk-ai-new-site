'use client'

import Link from 'next/link'
import { UnitalkLogo } from './unitalk-logo'
import { useLanguage } from '@/lib/language-context'
import { localizePublicHref } from '@/lib/i18n-routing'

const T = {
  fr: {
    navigation: 'Navigation du pied de page',
    tagline: 'Humains et IA collaborent.',
    discoverAlma: 'Découvrir Alma',
    columns: [
      {
         title: 'Marketplace',
         links: [
           ['Collaborateurs IA', '/marketplace/collaborateurs-ia'],
           ['Profils métier', '/marketplace/profils-metier'],
           ['Compétences', '/marketplace/competences'],
           ['Applications', '/marketplace/applications'],
           ['Modèles IA', '/marketplace/modeles-ia'],
           ['Serveurs IA', '/marketplace/serveurs-ia'],
         ],
      },
      {
         title: 'Plateforme',
         links: [
           ['Missions', '/missions'],
           ['Workspace', '/workspace'],
           ['Unitalk Desktop', '/desktop'],
           ['Hermes', '/hermes'],
           ['AI Gateway', '/ai-gateway'],
           ['Unitalk AI Cloud', '/marketplace/serveurs-ia'],
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
           ['DPA', '/securite#dpa'],
         ],
       },
       {
         title: 'Partenaires',
         links: [
           ['Programme d’affiliation', 'https://unitalk.promotekit.com/'],
           ['Devenir partenaire', '/partenaires'],
           ['Devenir co-créateur', '/reseau-co-createurs'],
        ],
      },
    ],
    legal: [
       ['Mentions légales', '/mentions-legales'],
       ['Confidentialité', '/confidentialite'],
       ['Conditions', '/conditions'],
     ],
    rights: 'Tous droits réservés.',
    hosted: 'Hébergé en France',
    powered: 'Propulsé par Hermes',
  },
  en: {
    navigation: 'Footer navigation',
    tagline: 'Humans and AI collaborate.',
    discoverAlma: 'Discover Alma',
    columns: [
      {
         title: 'Marketplace',
         links: [
           ['AI Collaborators', '/marketplace/collaborateurs-ia'],
           ['Job profiles', '/marketplace/profils-metier'],
           ['Skills', '/marketplace/competences'],
           ['Applications', '/marketplace/applications'],
           ['AI models', '/marketplace/modeles-ia'],
           ['AI servers', '/marketplace/serveurs-ia'],
         ],
      },
      {
         title: 'Platform',
         links: [
           ['Missions', '/missions'],
           ['Workspace', '/workspace'],
           ['Unitalk Desktop', '/desktop'],
           ['Hermes', '/hermes'],
           ['AI Gateway', '/ai-gateway'],
           ['Unitalk AI Cloud', '/marketplace/serveurs-ia'],
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
           ['DPA', '/securite#dpa'],
         ],
       },
       {
         title: 'Partners',
         links: [
           ['Affiliate program', 'https://unitalk.promotekit.com/'],
           ['Become a partner', '/partenaires'],
           ['Become a co-creator', '/reseau-co-createurs'],
        ],
      },
    ],
    legal: [
       ['Legal notice', '/mentions-legales'],
       ['Privacy', '/confidentialite'],
       ['Terms', '/conditions'],
     ],
    rights: 'All rights reserved.',
    hosted: 'Hosted in France',
    powered: 'Powered by Hermes',
  },
} as const

export function SiteFooter() {
  const { lang } = useLanguage()
  const t = T[lang]
  const columns = t.columns

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#1C1A17] text-[#F3EFE6]">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-48 size-[34rem] rounded-full border-[5rem] border-[#D10E63]/10" />

      <div className="editorial-shell relative pb-8 sm:pb-10">
        <div className="grid gap-12 py-14 sm:grid-cols-[1fr_2fr] sm:py-16 lg:grid-cols-[1.05fr_3fr]">
          <div className="h-fit">
            <Link href={lang === 'en' ? '/en' : '/'} aria-label="Unitalk" className="inline-flex w-fit items-center gap-3">
              <UnitalkLogo size={30} />
              <span className="font-inter text-lg font-semibold">Unitalk</span>
            </Link>
            <p className="mt-4 max-w-48 text-sm leading-6 text-[#B8AF9F]">{t.tagline}</p>
            <Link href={localizePublicHref('/collaborateurs-ia/alma', lang)} className="mt-4 inline-flex text-sm font-bold text-[#F2A4C5] transition-colors hover:text-white">{t.discoverAlma}<span aria-hidden="true" className="ml-2">→</span></Link>
          </div>

          <nav aria-label={t.navigation} className="grid grid-cols-2 gap-x-8 gap-y-11 lg:grid-cols-5">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="font-mono text-[10px] font-bold uppercase tracking-[.16em] text-[#F2A4C5]">{column.title}</h3>
                <ul className="mt-5 space-y-3.5">
                  {column.links.map(([label, href]) => (
                    <li key={label}>
                      {href.startsWith('http') ? (
                        <a href={href} target="_blank" rel="noreferrer" className="text-sm text-[#B8AF9F] transition-colors hover:text-white">{label}</a>
                      ) : (
                        <Link href={localizePublicHref(href, lang)} className="text-sm text-[#B8AF9F] transition-colors hover:text-white">{label}</Link>
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
              {t.legal.map(([label, href]) => <Link key={label} href={localizePublicHref(href, lang)} className="transition-colors hover:text-white">{label}</Link>)}
            </div>

             <div className="flex flex-wrap items-center gap-x-2 font-mono text-[11px] font-semibold uppercase tracking-[.12em] text-[#A9A092]">
               <Link href={localizePublicHref('/marketplace/serveurs-ia', lang)} className="transition-colors hover:text-white">{t.hosted}</Link>
               <span aria-hidden="true">·</span>
               <Link href={localizePublicHref('/hermes', lang)} className="transition-colors hover:text-white">{t.powered}</Link>
             </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
