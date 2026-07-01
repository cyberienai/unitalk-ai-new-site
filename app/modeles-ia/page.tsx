import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { ModelesIaContent } from '@/components/modeles-ia-content'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Modèles IA · Unitalk',
  description:
    'Les meilleurs modèles d’IA via notre moteur open source Hermes. Payez avec vos propres clés (BYOK) ou des crédits prépayés gérés par Unitalk.',
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
