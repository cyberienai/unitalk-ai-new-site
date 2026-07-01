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
      { label: 'Devenir partenaire', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Carrières', href: '#' },
    ],
  },
  {
    title: 'Ressources',
    links: [
      { label: 'Documentation', href: '#' },
      { label: 'Guide de démarrage', href: '#' },
      { label: 'Statut', href: '#' },
      { label: 'Support', href: '#' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="relative border-t border-[rgba(255,255,255,0.08)] bg-[#0A0A0A] text-white">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-12 lg:gap-10">
          {/* Brand + contact */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-4">
            <div className="flex items-center gap-2.5">
              <UnitalkLogo size={28} />
              <span className="font-inter text-base font-semibold text-white">Unitalk AI</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#8E8E93]">
              Votre agent IA sur mesure, créé par Alma. Une vraie identité, prête à travailler.
            </p>
            <div className="mt-5 flex flex-col gap-2.5">
              <a
                href="tel:+33189713394"
                className="group inline-flex items-center gap-2 text-sm text-[#C7C7D1] transition-colors hover:text-white"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="flex-shrink-0 text-[#FF0099]">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span className="underline underline-offset-2">01 89 71 33 94</span>
              </a>
              <a
                href="mailto:hello@unitalk.ai"
                className="group inline-flex items-center gap-2 text-sm text-[#C7C7D1] transition-colors hover:text-white"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="flex-shrink-0 text-[#FF0099]">
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
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF0099]">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[#8E8E93] transition-colors hover:text-white"
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
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF0099]">
              Démarrer
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-[#8E8E93]">
              Essai de 7 jours, sans carte bancaire.
            </p>
            <a
              href="#"
              className="mt-4 inline-flex items-center justify-center rounded-full bg-[#FF0099] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#E00085]"
            >
              Créer mon agent
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-[rgba(255,255,255,0.08)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[#6E6E76]">
            © {new Date().getFullYear()} Unitalk AI. Tous droits réservés.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href="#" className="text-xs text-[#8E8E93] transition-colors hover:text-white">
              Mentions légales
            </a>
            <a href="#" className="text-xs text-[#8E8E93] transition-colors hover:text-white">
              Confidentialité
            </a>
            <a href="#" className="text-xs text-[#8E8E93] transition-colors hover:text-white">
              CGU
            </a>
            <span className="inline-flex items-center gap-1.5 text-xs text-[#8E8E93]">
              <span aria-hidden="true" className="inline-flex overflow-hidden rounded-sm border border-[rgba(255,255,255,0.15)]">
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
