import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { TeamDirectory } from '@/components/team-directory'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Construire mon équipe · Unitalk',
  description:
    "Parcourez les Collaborateurs IA par métier ou par domaine d'entreprise, consultez leur profil et ajoutez-les à votre équipe. La façon la plus simple de recruter sans embaucher.",
}

export default function TeamPage() {
  return (
    <>
      <Navbar />
      <TeamDirectory />
      <SiteFooter />
    </>
  )
}
