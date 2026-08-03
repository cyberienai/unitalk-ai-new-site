import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { WorkspaceContent } from '@/components/workspace-content'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Workspace · Unitalk',
  description:
    'Le Workspace privé de votre organisation : Missions, conversations, fichiers, validations et résultats réunis au même endroit. Vous donnez le cap, votre Collaborateur IA fait avancer le travail.',
}

export default function WorkspacePage() {
  return (
    <>
      <Navbar />
      <WorkspaceContent />
      <SiteFooter />
    </>
  )
}
