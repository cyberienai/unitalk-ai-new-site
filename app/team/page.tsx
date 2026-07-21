import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { TeamDirectory } from '@/components/team-directory'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Notre équipe augmentée · Unitalk',
  description:
    "Les meilleures stratégies pour intégrer des talents : découvrez nos binômes humain / Collaborateur IA, consultez leurs profils et composez votre équipe. La façon la plus simple de recruter sans embaucher.",
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
