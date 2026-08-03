import type { Metadata } from 'next'
import { Suspense } from 'react'
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
      <Suspense fallback={<div className="min-h-screen bg-[#F3EFE6]" />}>
        <WorkspaceContent />
      </Suspense>
      <SiteFooter />
    </>
  )
}
