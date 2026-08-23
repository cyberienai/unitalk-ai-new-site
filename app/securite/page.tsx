import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { SecurityContent } from '@/components/security-content'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Centre de confiance et sécurité | Unitalk',
  description: 'Statut documenté des contrôles d’accès, données, hébergement, résilience, incidents et garanties de sécurité Unitalk.',
  alternates: { canonical: '/securite', languages: { fr: '/securite', en: '/en/security', 'x-default': '/securite' } },
}

export default function SecurityPage() {
  return <><Navbar/><SecurityContent/><SiteFooter/></>
}
