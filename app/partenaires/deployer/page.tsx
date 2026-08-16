import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { PartnerDeployContent } from '@/components/partner-deploy-content'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Programme Partenaire · Déployer des Collaborateurs IA chez vos clients',
  description:
    'Partez d’une mission réelle, prouvez la valeur puis déployez des Collaborateurs IA chez plusieurs clients avec l’espace Partner Unitalk à 499 € par mois.',
  alternates: { canonical: '/partenaires/deployer' },
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
