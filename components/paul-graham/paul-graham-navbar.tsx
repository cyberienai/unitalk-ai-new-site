'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { UnitalkLogo } from '@/components/unitalk-logo'
import { LanguageToggle } from '@/components/language-toggle'
import { useLanguage } from '@/lib/language-context'

export function PaulGrahamNavbar() {
  const { lang } = useLanguage()

  return (
    <nav aria-label={lang === 'fr' ? 'Navigation principale' : 'Main navigation'} className="graham-nav">
      <div className="graham-shell">
        <Link href="/" className="graham-brand" aria-label="Unitalk, accueil">
          <UnitalkLogo className="h-7 w-auto" />
          <span>Unitalk</span>
        </Link>
        <p>{lang === 'fr' ? 'Des missions réelles, sous votre contrôle' : 'Real missions, under your control'}</p>
        <div>
          <Link href="/missions" className="graham-nav-link">{lang === 'fr' ? 'Missions' : 'Missions'}</Link>
          <LanguageToggle />
          <Link href="/decouvrir?source=paul-graham" className="graham-nav-cta">
            {lang === 'fr' ? 'Essayer Unitalk' : 'Try Unitalk'}<ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </nav>
  )
}
