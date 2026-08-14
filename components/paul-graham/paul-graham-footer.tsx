'use client'

import Link from 'next/link'
import { UnitalkLogo } from '@/components/unitalk-logo'
import { useLanguage } from '@/lib/language-context'

export function PaulGrahamFooter() {
  const { lang } = useLanguage()

  return (
    <footer className="graham-footer">
      <div className="graham-shell">
        <div className="graham-footer-brand"><UnitalkLogo className="h-8 w-auto" /><strong>Unitalk</strong><span>{lang === 'fr' ? 'Donnez une capacité de travail à votre entreprise.' : 'Give your company work capacity.'}</span></div>
        <div className="graham-footer-links">
          <Link href="/missions">Missions</Link>
          <Link href="/tarifs">{lang === 'fr' ? 'Tarifs' : 'Pricing'}</Link>
          <Link href="/leaders">{lang === 'fr' ? 'Architectes IA' : 'AI Architects'}</Link>
          <Link href="/mentions-legales">{lang === 'fr' ? 'Mentions légales' : 'Legal'}</Link>
        </div>
        <p>Paris, France · <a href="mailto:hello@unitalk.ai">hello@unitalk.ai</a> · © {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}
