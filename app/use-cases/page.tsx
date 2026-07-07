import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { UseCasesContent } from '@/components/use-cases-content'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Use Cases · Unitalk',
  description:
    'Découvrez comment les collaborateurs IA Unitalk transforment différents secteurs et cas d\'usage. De la vente au support, en passant par l\'administratif, chaque métier trouve sa solution.',
}

export default function UseCasesPage() {
  return (
    <>
      <Navbar />
      <UseCasesContent />
      <SiteFooter />
    </>
  )
}
