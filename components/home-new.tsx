'use client'

import { useLanguage } from '@/lib/language-context'
import { Navbar } from './navbar'
import { HeroNew } from './hero-new'
import { CollaboratorsShowcase } from './collaborators-showcase'
import { SectionMissions } from './home/section-missions'
import { SectionCollaborator } from './home/section-collaborator'
import { SectionWork } from './home/section-work'
import { SectionOwnership } from './home/section-ownership'
import { SiteFooter } from './site-footer'

export function HomeNew() {
  const { lang } = useLanguage()

  return (
    <div className="min-h-screen bg-[#F3EFE6] text-[#1C1A17]">
      {/* Header / Navigation */}
      <Navbar />

      {/* 1. Il vous manque quelqu'un — Hero */}
      <HeroNew lang={lang} />

      {/* Catalogue des Collaborateurs IA */}
      <div id="collaborateurs-ia">
        <CollaboratorsShowcase lang={lang} />
      </div>

      {/* 2. Choisissez sa mission */}
      <div id="missions">
        <SectionMissions lang={lang} />
      </div>

      {/* 3. Votre Collaborateur IA */}
      <SectionCollaborator lang={lang} />

      {/* 4. Regardez-le travailler */}
      <div id="workspace">
        <SectionWork lang={lang} />
      </div>

      {/* 5. Il appartient à votre Organisation (+ Alma) */}
      <SectionOwnership lang={lang} />

      {/* Footer */}
      <SiteFooter />
    </div>
  )
}
