import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { CollabCompareContent } from '@/components/collab-compare-content'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Chatbot, agent IA ou Collaborateur IA : le comparatif · Unitalk',
  description:
    'Comparez chatbots, agents IA et Collaborateurs IA Unitalk : identité, mémoire, missions, compétences, applications et contrôle humain.',
}

export default function ComparatifPage() {
  return (
    <>
      <Navbar />
      <CollabCompareContent />
      <SiteFooter />
    </>
  )
}
