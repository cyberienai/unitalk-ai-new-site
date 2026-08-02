'use client'

import { useLanguage } from '@/lib/language-context'
import { Navbar } from './navbar'
import { HeroNew } from './hero-new'
import { CollaboratorsShowcase } from './collaborators-showcase'
import { SectionMissions } from './home/section-missions'
import { SectionWork } from './home/section-work'
import { SectionTeam } from './home/section-team'
import { SectionWorkspace } from './home/section-workspace'
import { SectionOwnership } from './home/section-ownership'
import { SectionAlma } from './home/section-alma'
import { SectionFinalCta } from './home/section-final-cta'
import { SiteFooter } from './site-footer'

export function HomeNew() {
  const { lang } = useLanguage()

  return (
    <div className="min-h-screen bg-[#F3EFE6] text-[#1C1A17]">
      {/* 1. Header / Navigation */}
      <Navbar />

      {/* 1. Il vous manque quelqu'un — Hero */}
      <HeroNew lang={lang} />

      {/* 2. Les Collaborateurs IA — Catalogue */}
      <CollaboratorsShowcase lang={lang} />

      {/* 3. Choisissez sa mission */}
      <SectionMissions lang={lang} />

      {/* 4. Regardez-le travailler */}
      <SectionWork lang={lang} />

      {/* 5. Votre équipe */}
      <SectionTeam lang={lang} />

      {/* 6. Votre espace de travail */}
      <SectionWorkspace lang={lang} />

      {/* 7. Ils vous appartiennent */}
      <SectionOwnership lang={lang} />

      {/* 8. Alma */}
      <SectionAlma lang={lang} />

      {/* 9. Recrutez votre premier Collaborateur IA — CTA final */}
      <SectionFinalCta lang={lang} />

      {/* Footer */}
      <SiteFooter />
    </div>
  )
}
