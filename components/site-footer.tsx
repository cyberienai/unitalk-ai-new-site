'use client'

import { usePathname } from 'next/navigation'
import { UnitalkLogo } from './unitalk-logo'
import { useLanguage } from '@/lib/language-context'

const T = {
  fr: {
    tagline: 'Votre intelligence vous appartient.',
    dataFrance: 'Données hébergées en France',
    rights: 'Tous droits réservés.',
    columns: [
      {
        title: 'Produit',
        links: [
          {
            label: 'Collaborateurs IA',
            href: '/collaborateurs-ia',
            children: [
              { label: 'Profils métier', href: '/collaborateurs-ia/profils-metier' },
              { label: 'Compétences', href: '/collaborateurs-ia/competences' },
              { label: 'Unitalk Store', href: '/collaborateurs-ia/applications' },
            ],
          },
          { label: 'Missions', href: '/missions' },
          { label: 'Workspace', href: '/workspace' },
          { label: 'Unitalk Desktop', href: '/desktop' },
          { label: 'Tarifs', href: '/tarifs' },
          { label: 'Documentation', href: '/documentation' },
        ],
      },
      {
        title: 'Écosystème',
        links: [
          { label: 'Devenir Co-créateur IA', href: '/co-createur-ia' },
          { label: 'Unitalk Academy', href: '/academy' },
          { label: 'Experts', href: '/experts' },
          { label: 'Devenir expert', href: '/experts#devenir-expert' },
          { label: 'Partenaires', href: '/partenaires' },
          { label: 'Platform', href: '/platform' },
          { label: 'Open source', href: '/manifeste' },
        ],
      },
      {
        title: 'Ressources',
        links: [
          { label: 'Pourquoi Unitalk', href: '/collaborateurs-ia/pourquoi-unitalk' },
          { label: 'Blog', href: '/blog' },
          { label: 'Changelog', href: '/changelog' },
          { label: 'Architecture', href: '/architecture' },
          { label: 'AI Gateway', href: '/ai-gateway' },
          { label: 'AI server', href: '/ai-server' },
          { label: 'Paul Graham', href: '/paul-graham' },
          { label: 'Elon Musk', href: '/elon-musk' },
          { label: "Architectes de l'IA", href: '/leaders' },
        ],
      },
      {
        title: 'Entreprise',
        links: [
          { label: 'Contact', href: 'mailto:hello@unitalk.ai' },
          { label: 'Sécurité', href: '/hebergeurs' },
          { label: 'Mentions légales', href: '/mentions-legales' },
          { label: 'Confidentialité', href: '/confidentialite' },
          { label: 'Conditions', href: '/conditions' },
        ],
      },
    ],
  },
  en: {
    tagline: 'Own your intelligence.',
    dataFrance: 'Data hosted in France',
    rights: 'All rights reserved.',
    columns: [
      {
        title: 'Product',
        links: [
          {
            label: 'AI Collaborators',
            href: '/collaborateurs-ia',
            children: [
              { label: 'Job profiles', href: '/collaborateurs-ia/profils-metier' },
              { label: 'Skills', href: '/collaborateurs-ia/competences' },
              { label: 'Unitalk Store', href: '/collaborateurs-ia/applications' },
            ],
          },
          { label: 'Missions', href: '/missions' },
          { label: 'Workspace', href: '/workspace' },
          { label: 'Unitalk Desktop', href: '/desktop' },
          { label: 'Pricing', href: '/tarifs' },
          { label: 'Documentation', href: '/documentation' },
        ],
      },
      {
        title: 'Ecosystem',
        links: [
          { label: 'Become an AI Co-creator', href: '/co-createur-ia' },
          { label: 'Unitalk Academy', href: '/academy' },
          { label: 'Experts', href: '/experts' },
          { label: 'Become an expert', href: '/experts#devenir-expert' },
          { label: 'Partners', href: '/partenaires' },
          { label: 'Platform', href: '/platform' },
          { label: 'Open source', href: '/manifeste' },
        ],
      },
      {
        title: 'Resources',
        links: [
          { label: 'Why Unitalk', href: '/collaborateurs-ia/pourquoi-unitalk' },
          { label: 'Blog', href: '/blog' },
          { label: 'Changelog', href: '/changelog' },
          { label: 'Architecture', href: '/architecture' },
          { label: 'AI Gateway', href: '/ai-gateway' },
          { label: 'AI server', href: '/ai-server' },
          { label: 'Paul Graham', href: '/paul-graham' },
          { label: 'Elon Musk', href: '/elon-musk' },
          { label: 'AI Architects', href: '/leaders' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'Contact', href: 'mailto:hello@unitalk.ai' },
          { label: 'Security', href: '/hebergeurs' },
          { label: 'Legal notice', href: '/mentions-legales' },
          { label: 'Privacy', href: '/confidentialite' },
          { label: 'Terms', href: '/conditions' },
        ],
      },
    ],
  },
}

export function SiteFooter() {
  const { lang } = useLanguage()
  const t = T[lang]
  const FOOTER_COLUMNS = t.columns
  const pathname = usePathname()
  function handleLinkClick(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (href !== '/missions' || pathname !== '/missions' || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })
  }
  return (
    <footer className="relative overflow-hidden bg-[#1C1A17] text-[#F3EFE6]">
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-12 lg:gap-x-10">
          {/* Brand + contact */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-4">
            <div className="flex items-center gap-2.5">
              <UnitalkLogo size={28} />
              <span className="font-inter text-base font-semibold text-[#F3EFE6]">Unitalk</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#A79E8E]">
              {t.tagline}
            </p>
            <div className="mt-6 flex flex-col gap-4">
              <a href="tel:+331****3394" className="group inline-flex flex-col gap-1">
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#B8AF9F]">
                  {lang === 'fr' ? 'Téléphone' : 'Phone'}
                </span>
                <span className="text-sm text-[#C9C0B0] transition-colors group-hover:text-[#F3EFE6]">01 89 71 33 94</span>
              </a>
              <a href="mailto:hello@unitalk.ai" className="group inline-flex flex-col gap-1">
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#B8AF9F]">Email</span>
                <span className="text-sm text-[#C9C0B0] transition-colors group-hover:text-[#F3EFE6]">hello@unitalk.ai</span>
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
                      onClick={(event) => handleLinkClick(event, link.href)}
                      className="inline-block text-sm text-[#A79E8E] transition-all duration-200 hover:translate-x-0.5 hover:text-[#F3EFE6]"
                    >
                      {link.label}
                    </a>
                    {'children' in link && link.children ? (
                      <ul className="mt-2.5 space-y-2 border-l border-[rgba(243,239,230,0.14)] pl-3">
                        {link.children.map((child) => (
                          <li key={child.label}>
                            <a
                              href={child.href}
                              className="inline-block text-[13px] text-[#8F877A] transition-all duration-200 hover:translate-x-0.5 hover:text-[#C9C0B0]"
                            >
                              {child.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-[rgba(243,239,230,0.12)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[#8F877A]">
            © {new Date().getFullYear()} Unitalk AI. {t.rights}
          </p>
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

      {/* Giant solid wordmark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex justify-center leading-[0.72] select-none"
      >
        <span
          className="font-sf font-bold whitespace-nowrap translate-y-[0.28em]"
          style={{
            fontSize: 'clamp(6rem, 24vw, 26rem)',
            letterSpacing: '-0.04em',
            color: 'rgba(243,239,230,0.035)',
          }}
        >
          Unitalk
        </span>
      </div>
    </footer>
  )
}
