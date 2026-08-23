import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { AlmaFinalContent } from '@/components/alma/alma-final-content'

export const metadata: Metadata = {
  title: 'Alma, responsable IA de la relation client',
  description: 'Découvrez Alma, la Collaboratrice IA qui informe, qualifie, recommande, forme et accompagne les clients Unitalk sur tous leurs canaux.',
  alternates: { canonical: '/collaborateurs-ia/alma' },
  openGraph: { title: 'Alma · Responsable IA de la relation client · Unitalk', description: 'Une relation client continue, du premier échange au suivi des usages, avec relais humain lorsque nécessaire.', url: '/collaborateurs-ia/alma', type: 'website' },
}

export default function AlmaPage() {
  return <><Navbar /><AlmaFinalContent /><SiteFooter /></>
}
