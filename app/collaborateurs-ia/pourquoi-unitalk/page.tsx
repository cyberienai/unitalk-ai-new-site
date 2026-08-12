import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { CollabWhyContent } from '@/components/collab-why-content'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Pourquoi Unitalk ? · Votre intelligence vous appartient',
  description:
    'Découvrez la vision Unitalk : une entreprise AI Native où humains et Collaborateurs IA travaillent ensemble, sur une base ouverte et gouvernée.',
  alternates: { canonical: 'https://unitalk.ai/collaborateurs-ia/pourquoi-unitalk' },
}

export default function PourquoiUnitalkPage() {
  return (
    <>
      <Navbar darkHero />
      <CollabWhyContent />
      <SiteFooter />
    </>
  )
}
