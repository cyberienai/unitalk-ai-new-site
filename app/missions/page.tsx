import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { MissionsContent } from '@/components/missions-content'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Missions · Unitalk',
  description:
    'Confiez une première Mission à votre Collaborateur IA. Commencez par un résultat concret : Unitalk prépare les savoir-faire, les outils et le cadre de travail nécessaires.',
}

export default function MissionsPage() {
  return (
    <>
      <Navbar />
      <MissionsContent />
      <SiteFooter />
    </>
  )
}
