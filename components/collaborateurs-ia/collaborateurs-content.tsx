'use client'

import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { CollaborateurExperience } from './collaborateur-experience'

export function CollaborateursContent() {
  return (
    <div className="min-h-screen bg-[#F3EFE6] text-[#1C1A17]">
      <Navbar />
      <CollaborateurExperience />
      <SiteFooter />
    </div>
  )
}
