import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { ModelesIaContent } from '@/components/modeles-ia-content'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Modèles IA · Unitalk',
  description:
    'Accédez aux modèles d’IA autorisés via Unitalk AI Gateway. Utilisez vos propres clés (BYOK), des crédits Unitalk ou une configuration hybride.',
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
