import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { AgentHermesContent } from '@/components/agent-hermes-content'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Agent Hermes · Unitalk',
  description:
    'Découvrez Hermes Agent, le framework d\'agents IA autonome et open source qui apprend, crée ses propres compétences et s\'exécute 24h/24 en arrière-plan. Le vrai collaborateur IA.',
}

export default function AgentHermesPage() {
  return (
    <>
      <Navbar />
      <AgentHermesContent />
      <SiteFooter />
    </>
  )
}
