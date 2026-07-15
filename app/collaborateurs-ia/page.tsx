import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { CollabWhatContent } from '@/components/collab-what-content'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: "Qu'est-ce qu'un Collaborateur IA ? · Unitalk",
  description:
    "Les Collaborateurs IA sont une nouvelle catégorie d'employés : une identité, une mémoire, des outils et une place dans votre organigramme. Découvrez ce qui les distingue d'un simple chatbot.",
}

export default function CollaborateursIaPage() {
  return (
    <>
      <Navbar />
      <CollabWhatContent />
      <SiteFooter />
    </>
  )
}
