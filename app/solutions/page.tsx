import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { SolutionsContent } from '@/components/solutions-content'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Solutions par métier · Unitalk',
  description:
    'Un agent IA pour chaque métier : ventes, support, administratif, marketing, finance, RH. Votre agent endosse le rôle dont vous avez besoin, avec les compétences et les outils qui vont avec.',
}

export default function SolutionsPage() {
  return (
    <>
      <Navbar />
      <SolutionsContent />
      <SiteFooter />
    </>
  )
}
