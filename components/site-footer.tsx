'use client'

import { UnitalkLogo } from './unitalk-logo'

const FOOTER_COLUMNS = [
  {
    title: 'Produit',
    links: [
      { label: 'Nos solutions', href: '#' },
      { label: 'Offres', href: '#offres' },
      { label: 'Trouver des agents', href: '#' },
      { label: 'Sécurité', href: '#' },
      { label: 'FAQ', href: '#faq' },
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
]

export function SiteFooter() {
  return (
    <footer className="relative border-t border-[#DcD4C4] bg-[#1C1A17] text-[#F3EFE6]">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-12 lg:gap-10">
          {/* Brand + contact */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-4">
            <div className="flex items-center gap-2.5">
              <UnitalkLogo size={28} />
              <span className="font-inter text-base font-semibold text-[#F3EFE6]">Unitalk AI</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#A79E8E]">
              Votre agent IA sur mesure, créé par Alma. Une vraie identité, prête à travailler.
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

          {/* CTA column */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-2">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#F0559B]">
              Démarrer
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-[#A79E8E]">
              Essai de 7 jours, sans carte bancaire.
            </p>
            <a
              href="#"
              className="mt-4 inline-flex items-center justify-center rounded-full bg-[#D10E63] px-5 py-2.5 text-sm font-medium text-[#FBF9F3] transition-colors hover:bg-[#B00B52]"
            >
              Créer mon agent
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-[rgba(243,239,230,0.12)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[#8F877A]">
            © {new Date().getFullYear()} Unitalk AI. Tous droits réservés.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href="#" className="text-xs text-[#A79E8E] transition-colors hover:text-[#F3EFE6]">
              Mentions légales
            </a>
            <a href="#" className="text-xs text-[#A79E8E] transition-colors hover:text-[#F3EFE6]">
              Confidentialité
            </a>
            <a href="#" className="text-xs text-[#A79E8E] transition-colors hover:text-[#F3EFE6]">
              CGU
            </a>
            <span className="inline-flex items-center gap-1.5 text-xs text-[#A79E8E]">
              <span aria-hidden="true" className="inline-flex overflow-hidden rounded-sm border border-[rgba(243,239,230,0.2)]">
                <span className="h-3.5 w-1.5 bg-[#0055A4]" />
                <span className="h-3.5 w-1.5 bg-white" />
                <span className="h-3.5 w-1.5 bg-[#EF4135]" />
              </span>
              Données hébergées en France
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
