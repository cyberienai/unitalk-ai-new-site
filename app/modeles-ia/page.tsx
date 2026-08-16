import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { ModelesIaContent } from '@/components/modeles-ia-content'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Modèles IA : capacité, BYOK et crédits prépayés',
  description:
    'Accédez aux modèles d’IA autorisés avec une capacité mensuelle, vos propres clés BYOK ou des crédits prépayés dès 25 €.',
  alternates: { canonical: '/modeles-ia' },
  openGraph: {
    title: 'Modèles IA : le bon modèle, sous vos règles | Unitalk',
    description: 'Capacité mensuelle, BYOK ou crédits prépayés dès 25 € pour vos Collaborateurs IA.',
    url: 'https://unitalk.ai/modeles-ia',
    type: 'website',
  },
}

export default function ModelesIaPage() {
  return (
    <>
      <Navbar />
      <ModelesIaContent />
      <SiteFooter />
    </>
  )
}
