'use client'

import Link from 'next/link'
import { UnitalkLogo } from './unitalk-logo'
import { useLanguage } from '@/lib/language-context'

const T = {
  fr: {
    contact: 'Contact',
    legal: 'Mentions légales',
    privacy: 'Confidentialité',
    terms: 'Conditions',
    rights: 'Tous droits réservés.',
    signature: 'Propulsé par Hermes · Open source · Hébergé en France',
  },
  en: {
    contact: 'Contact',
    legal: 'Legal notice',
    privacy: 'Privacy',
    terms: 'Terms',
    rights: 'All rights reserved.',
    signature: 'Powered by Hermes · Open source · Hosted in France',
  },
} as const

export function SiteFooter() {
  const { lang } = useLanguage()
  const t = T[lang]

  return (
    <footer className="border-t border-white/10 bg-[#1C1A17] text-[#F3EFE6]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" aria-label="Unitalk" className="inline-flex w-fit items-center gap-2.5">
            <UnitalkLogo size={28} />
            <span className="font-inter text-base font-semibold">Unitalk</span>
          </Link>

          <nav aria-label={lang === 'fr' ? 'Liens de pied de page' : 'Footer links'}>
            <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#B8AF9F]">
              <li><a href="mailto:hello@unitalk.ai" className="transition-colors hover:text-white">{t.contact}</a></li>
              <li><Link href="/mentions-legales" className="transition-colors hover:text-white">{t.legal}</Link></li>
              <li><Link href="/confidentialite" className="transition-colors hover:text-white">{t.privacy}</Link></li>
              <li><Link href="/conditions" className="transition-colors hover:text-white">{t.terms}</Link></li>
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[#8F877A]">
            © {new Date().getFullYear()} Unitalk AI. {t.rights}
          </p>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[.12em] text-[#8F877A]">
            {t.signature}
          </p>
        </div>
      </div>
    </footer>
  )
}
