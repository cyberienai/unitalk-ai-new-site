import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { CollabWhyContent } from '@/components/collab-why-content'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Pourquoi Unitalk ? · Collaborateurs IA · Unitalk',
  description:
    'Les 8 U de Unitalk : universal, unique, unified, useful, ubiquitous, understanding, upgradeable et user-controlled. L’interface de travail ouverte et gouvernée qui fait de l’IA une véritable capacité de votre entreprise.',
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
