import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { ModelesIaContent } from '@/components/modeles-ia-content'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Capacité IA : mensuelle, prépayée ou BYOK | Unitalk',
  description:
    'Dimensionnez la capacité IA de chaque Collaborateur : forfait mensuel, crédits prépayés ou clés fournisseur BYOK dès 25 €.',
  alternates: { canonical: '/capacite-ia' },
  openGraph: {
    title: 'Capacité IA pour vos Collaborateurs | Unitalk',
    description: 'Choisissez un volume de travail et un mode de paiement sans gérer le routage technique des modèles.',
    url: 'https://unitalk.ai/capacite-ia',
    type: 'website',
  },
}

export default function CapaciteIaPage() {
  return (
    <>
      <Navbar />
      <ModelesIaContent />
      <SiteFooter />
    </>
  )
}
