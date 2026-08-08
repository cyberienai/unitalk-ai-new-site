import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { CollabWhyContent } from '@/components/collab-why-content'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Pourquoi Unitalk ? · Collaborateurs IA · Unitalk',
  description:
    "Hermes, Gateway, open source, serveur privé, mémoire, RGPD, sécurité, organisation et identité : l'infrastructure souveraine qui rend les Collaborateurs IA possibles.",
}

export default function PourquoiUnitalkPage() {
  return (
    <>
      <Navbar />
      <CollabWhyContent />
      <SiteFooter />
    </>
  )
}
