import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { CollabHowContent } from '@/components/collab-how-content'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Comment ça fonctionne ? · Collaborateurs IA · Unitalk',
  description:
    "Créer, inviter, former, travailler, apprendre : découvrez comment un Collaborateur IA rejoint votre entreprise et gagne en autonomie à chaque mission.",
}

export default function CommentCaFonctionnePage() {
  return (
    <>
      <Navbar />
      <CollabHowContent />
      <SiteFooter />
    </>
  )
}
