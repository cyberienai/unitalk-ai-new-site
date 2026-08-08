import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Navbar } from '@/components/navbar'
import { WorkspaceSwitch } from '@/components/workspace/workspace-switch'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Workspace · Unitalk',
  description:
    'Le workspace privé de votre organisation : missions, conversations, fichiers, validations et résultats réunis au même endroit. Vous donnez le cap, votre Collaborateur IA fait avancer le travail.',
}

export default function WorkspacePage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div className="min-h-screen bg-[#F3EFE6]" />}>
        <WorkspaceSwitch />
      </Suspense>
      <SiteFooter />
    </>
  )
}
