import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { ProposerContent } from '@/components/proposer-content'

export const metadata: Metadata = {
  title: 'Proposer une mission',
  description:
    'Vous avez conçu une mission utile à d’autres entreprises ? Proposez-la : Unitalk prépare l’ouverture du catalogue aux missions de la communauté.',
  alternates: { canonical: '/missions/proposer' },
  // Not a public marketing page yet — keep it out of the index until community
  // publishing actually ships.
  robots: { index: false, follow: true },
}

export default function ProposerPage() {
  return (
    <>
      <Navbar />
      <ProposerContent />
      <SiteFooter />
    </>
  )
}
