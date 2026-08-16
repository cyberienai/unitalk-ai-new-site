import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { CommandeContent } from '@/components/commande-content'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Bon de commande · Unitalk',
  description:
    'Composez votre équipe de Collaborateurs IA : ajoutez des profils, choisissez votre licence entreprise et votre mode de consommation (abonnement, crédits prépayés ou BYOK). Le prix s’ajuste automatiquement.',
  robots: { index: false, follow: false },
}

export default function CommandePage() {
  return (
    <>
      <Navbar />
      <CommandeContent />
      <SiteFooter />
    </>
  )
}
