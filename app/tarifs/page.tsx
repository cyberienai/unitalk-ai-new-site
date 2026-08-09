import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { TarifsContent } from '@/components/tarifs-content'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Tarifs · Unitalk',
  description:
    'Des Collaborateurs IA à la mesure de votre entreprise, à partir de 49 € par mois avec tarif dégressif. Profils métier illimités. Réglez les usages IA en crédits prépayés ou avec vos propres clés API. 7 jours d’essai, sans carte bancaire.',
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
