import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { TarifsContent } from '@/components/tarifs-content'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Tarifs · Unitalk',
  description:
    'Votre Collaborateur IA dès 49 € par mois. Creator pour créer votre Collaborateur IA, Partner pour le déployer chez vos clients, Platform pour construire sur notre infrastructure. Alma incluse. 7 jours d’essai, sans carte bancaire.',
}

export default function TarifsPage() {
  return (
    <>
      <Navbar />
      <TarifsContent />
      <SiteFooter />
    </>
  )
}
