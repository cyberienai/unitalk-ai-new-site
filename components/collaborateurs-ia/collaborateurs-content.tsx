'use client'

import { Navbar } from '@/components/navbar'
import { CollabSubNav } from '@/components/collab-subnav'
import { SiteFooter } from '@/components/site-footer'
import { CollaborateurExperience } from './collaborateur-experience'

export function CollaborateursContent() {
  return (
    <div className="min-h-screen bg-[#F3EFE6] text-[#1C1A17]">
      <Navbar />
      <CollabSubNav active="/collaborateurs-ia" />
      <CollaborateurExperience />
      <SiteFooter />
    </div>
  )
}
