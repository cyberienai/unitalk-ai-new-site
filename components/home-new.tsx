'use client'

import { useLanguage } from '@/lib/language-context'
import { Navbar } from './navbar'
import { HeroNew } from './hero-new'
import { CollaboratorsShowcase } from './collaborators-showcase'
import { HomeStorySections } from './home-story-sections'
import { DiscoverSection } from './discover-section'
import { SiteFooter } from './site-footer'

export function HomeNew() {
  const { lang } = useLanguage()

  return (
    <div className="min-h-screen bg-[#F3EFE6] text-[#1C1A17]">
      {/* 1. Header / Navigation */}
      <Navbar />

      {/* 2. Hero — "Ils travaillent" */}
      <HeroNew lang={lang} />

      {/* 3. Catalogue de recrutement : "Les Collaborateurs IA existent" */}
      <CollaboratorsShowcase lang={lang} />

      {/* Nouveau récit éditorial : des outils isolés aux membres de l'organisation */}
      <HomeStorySections lang={lang} />

      {/* Démo interactive : « Découvrez votre organisation » */}
      <DiscoverSection lang={lang} />

      {/* 12. Footer */}
      <SiteFooter />
    </div>
  )
}
