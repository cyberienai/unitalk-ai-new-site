import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { SecurityContent } from '@/components/security-content'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Sécurité, données et contrôle humain | Unitalk',
  description: 'Découvrez l’approche Unitalk concernant l’hébergement, les données, les accès, les validations humaines et la traçabilité.',
  alternates: { canonical: '/securite', languages: { fr: '/securite', en: '/en/security', 'x-default': '/securite' } },
}

export default function SecurityPage() {
  return <><Navbar/><SecurityContent/><SiteFooter/></>
}
