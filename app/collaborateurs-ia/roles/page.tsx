import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { CollabRolesContent } from '@/components/collab-roles-content'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Les rôles disponibles · Collaborateurs IA · Unitalk',
  description:
    "Découvrez le catalogue de Collaborateurs IA Unitalk, organisés par département : direction, marketing, ventes, support, finance, RH et plus. Chaque rôle est une fiche de poste prête à l'emploi.",
}

export default function RolesPage() {
  return (
    <>
      <Navbar />
      <CollabRolesContent />
      <SiteFooter />
    </>
  )
}
