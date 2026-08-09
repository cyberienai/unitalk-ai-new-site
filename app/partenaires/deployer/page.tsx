import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { PartnerDeployContent } from '@/components/partner-deploy-content'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Partner · Déployer chez vos clients · Unitalk',
  description:
    'Déployez des Collaborateurs IA chez vos clients pour 499 € / mois. Espace multi-clients, profils métier illimités, co-branding, academy, support prioritaire et partage des revenus. Chaque client conserve son propre abonnement.',
}

export default function PartnerDeployPage() {
  return (
    <>
      <Navbar />
      <PartnerDeployContent />
      <SiteFooter />
    </>
  )
}
