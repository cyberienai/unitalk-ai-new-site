'use client'

import { UnitalkLogo } from './unitalk-logo'
import { useLanguage } from '@/lib/language-context'

const COMPARISONS = [
  'Claude',
  'ChatGPT',
  'Gemini Spark',
  'Microsoft Scout',
  'OpenClaw',
  'Dust',
  'Delos',
]

const T = {
  fr: {
    tagline: 'Vos vrais collaborateurs IA',
    comparisons: 'Comparatifs',
    dataFrance: 'Données hébergées en France',
    rights: 'Tous droits réservés.',
    legal: 'Mentions légales',
    privacy: 'Confidentialité',
    terms: 'CGU',
    columns: [
      {
        title: 'Produit',
        links: [
          { label: 'Solutions', href: '/solutions' },
          { label: 'Cas d’usage', href: '/agents' },
          { label: 'Tarif', href: '/tarifs' },
          { label: 'Agent public', href: '/agent-ia-public' },
          { label: 'FAQ', href: '/#faq' },
        ],
      },
      {
        title: 'Entreprise',
        links: [
          { label: 'À propos', href: '#' },
          { label: 'Devenir partenaire', href: '/partenaires' },
          { label: 'Blog', href: '#' },
        ],
      },
      {
        title: 'Ressources',
        links: [
          { label: 'Formation', href: '#' },
          { label: 'Guide de démarrage', href: '#' },
          { label: 'Changelog', href: '#' },
          { label: 'Statut', href: '#' },
          { label: 'Support', href: '#' },
        ],
      },
    ],
  },
  en: {
    tagline: 'Your real AI collaborators',
    comparisons: 'Comparisons',
    dataFrance: 'Data hosted in France',
    rights: 'All rights reserved.',
    legal: 'Legal notice',
    privacy: 'Privacy',
    terms: 'Terms',
    columns: [
      {
        title: 'Product',
        links: [
          { label: 'Solutions', href: '/solutions' },
          { label: 'Use cases', href: '/agents' },
          { label: 'Pricing', href: '/tarifs' },
          { label: 'Public agent', href: '/agent-ia-public' },
          { label: 'FAQ', href: '/#faq' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About', href: '#' },
          { label: 'Become a partner', href: '/partenaires' },
          { label: 'Blog', href: '#' },
        ],
      },
      {
        title: 'Resources',
        links: [
          { label: 'Training', href: '#' },
          { label: 'Getting started', href: '#' },
          { label: 'Changelog', href: '#' },
          { label: 'Status', href: '#' },
          { label: 'Support', href: '#' },
        ],
      },
    ],
  },
}

export function SiteFooter() {
  const { lang } = useLanguage()
  const t = T[lang]
  const FOOTER_COLUMNS = t.columns
  return (
    <footer className="relative overflow-hidden bg-[#1C1A17] text-[#F3EFE6]">
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-12 lg:gap-10">
          {/* Brand + contact */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-4">
            <div className="flex items-center gap-2.5">
              <UnitalkLogo size={28} />
              <span className="font-inter text-base font-semibold text-[#F3EFE6]">Unitalk AI</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#A79E8E]">
              {t.tagline}
            </p>
            <div className="mt-5 flex flex-col gap-2.5">
              <a
                href="tel:+33189713394"
                className="group inline-flex items-center gap-2 text-sm text-[#C9C0B0] transition-colors hover:text-[#F3EFE6]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="flex-shrink-0 text-[#F0559B]">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span className="underline underline-offset-2">01 89 71 33 94</span>
              </a>
              <a
                href="mailto:hello@unitalk.ai"
                className="group inline-flex items-center gap-2 text-sm text-[#C9C0B0] transition-colors hover:text-[#F3EFE6]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="flex-shrink-0 text-[#F0559B]">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-10 6L2 7" />
                </svg>
                <span className="underline underline-offset-2">hello@unitalk.ai</span>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#F0559B]">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[#A79E8E] transition-colors hover:text-[#F3EFE6]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Comparatifs column */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-2">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#F0559B]">
              {t.comparisons}
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 sm:grid-cols-4 lg:grid-cols-1">
              {COMPARISONS.map((name) => (
                <li key={name}>
                  <a
                    href="#"
                    className="text-sm text-[#A79E8E] transition-colors hover:text-[#F3EFE6]"
                  >
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-[rgba(243,239,230,0.12)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[#8F877A]">
            © {new Date().getFullYear()} Unitalk AI. {t.rights}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href="#" className="text-xs text-[#A79E8E] transition-colors hover:text-[#F3EFE6]">
              {t.legal}
            </a>
            <a href="#" className="text-xs text-[#A79E8E] transition-colors hover:text-[#F3EFE6]">
              {t.privacy}
            </a>
            <a href="#" className="text-xs text-[#A79E8E] transition-colors hover:text-[#F3EFE6]">
              {t.terms}
            </a>
            <span className="inline-flex items-center gap-1.5 text-xs text-[#A79E8E]">
              <span aria-hidden="true" className="inline-flex overflow-hidden rounded-sm border border-[rgba(243,239,230,0.2)]">
                <span className="h-3.5 w-1.5 bg-[#0055A4]" />
                <span className="h-3.5 w-1.5 bg-white" />
                <span className="h-3.5 w-1.5 bg-[#EF4135]" />
              </span>
              {t.dataFrance}
            </span>
          </div>
        </div>
      </div>

      {/* Giant solid wordmark — decorative, clipped by the bottom edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex justify-center leading-[0.72] select-none"
      >
        <span
          className="font-sf font-bold whitespace-nowrap translate-y-[0.28em]"
          style={{
            fontSize: 'clamp(6rem, 24vw, 26rem)',
            letterSpacing: '-0.04em',
            color: 'rgba(243,239,230,0.06)',
          }}
        >
          Unitalk
        </span>
      </div>
    </footer>
  )
}
