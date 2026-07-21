import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { AlmaContent } from '@/components/alma-content'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Alma — Responsable des Collaborateurs IA · Unitalk',
  description:
    'Alma crée, optimise et accompagne vos Collaborateurs IA. Votre interlocutrice unique pour construire votre organisation augmentée. Quand il le faut, elle escalade vers un Ingénieur IA nommé.',
}

export default function AlmaPage() {
  return (
    <>
      <Navbar />
      <AlmaContent />
      <SiteFooter />
    </>
  )
}
