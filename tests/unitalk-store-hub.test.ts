import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const hub = readFileSync(new URL('../components/unitalk-store-hub.tsx', import.meta.url), 'utf8')
const page = readFileSync(new URL('../app/marketplace/page.tsx', import.meta.url), 'utf8')

describe('Marketplace IA hub', () => {
  it('centralizes AI Collaborators and the five equipment categories', () => {
    expect(page).toContain('UnitalkStoreHub')
    for (const label of ['Collaborateurs IA','Profils métier','Compétences','Applications','Modèles IA','Serveurs IA']) expect(hub).toContain(label)
    expect(hub).toContain('STORE_CATEGORIES')
    expect(hub).toContain("heroTitle: 'Une identité qui reste. Des profils métier qui évoluent.'")
  })

  it('shows canonical public AI Collaborators first', () => {
    expect(hub.indexOf("id: 'collaborateurs-ia'")).toBeLessThan(hub.indexOf("id: 'profils-metier'"))
    expect(hub).toContain('MARKETPLACE_COLLABORATOR_SLUGS')
    expect(hub).toContain('ROLE_DETAILS[slug]')
    expect(hub).toContain('collaboratorHref(detail.slug)')
    expect(hub).toContain('detail.avatar')
    expect(hub).toContain("explain: { fr: 'Comprendre le Collaborateur IA'")
  })

  it('states the catalog and knowledge-work positioning', () => {
    expect(hub).toContain('Une identité qui reste. Des profils métier qui évoluent.')
    expect(hub).toContain('Un profil métier de référence pour chaque métier de la connaissance')
  })

  it('starts directly with the catalog', () => {
    expect(hub).not.toContain('AlmaMissionComposer')
    expect(hub).not.toContain('getSpeechRecognition')
    expect(hub).toContain('pt-24 sm:px-8 sm:pb-14 sm:pt-28')
  })

  it('uses one horizontal category navigation', () => {
    expect(hub).not.toContain("w-[220px] shrink-0")
    expect(hub).not.toContain('sticky top-24')
    expect(hub).toContain('onClick={() => selectCategory(category.id)}')
    expect(hub).toContain('role="tablist"')
    expect(hub).toContain('overflow-x-auto scrollbar-hide')
  })

  it('centralizes real catalogs with search and featured cards', () => {
    expect(hub).toContain('STORE_ITEMS')
    expect(hub).toContain('itemsForCategory')
    expect(hub).toContain('MarketplaceItemCard')
    expect(hub).toContain('Rechercher un profil métier')
    expect(hub).toContain('category={activeCategory}')
    expect(hub).toContain("window.location.hash.slice(1)")
    expect(hub).toContain("window.addEventListener('popstate'")
  })

  it('orders job profiles by broad SMB demand', () => {
    expect(hub).toContain('PROFILE_DEMAND_ORDER')
    const commercial = hub.indexOf("'commercial'")
    const administrative = hub.indexOf("'gestionnaire-administratif'")
    const executive = hub.indexOf("'assistante-de-direction'")
    const transformation = hub.indexOf("'conseiller-transformation-ia'")
    expect(commercial).toBeGreaterThan(-1)
    expect(commercial).toBeLessThan(administrative)
    expect(administrative).toBeLessThan(executive)
    expect(executive).toBeLessThan(transformation)
    expect(hub).toContain("PROFILE_DEMAND_RANK.get(a.slug)")
  })

  it('keeps each category explanation on its reference route', () => {
    for (const href of ['/collaborateurs-ia/profils-metier','/collaborateurs-ia/competences','/collaborateurs-ia/applications','/modeles-ia','/collaborateurs-ia/serveurs']) expect(hub).toContain(`href: '${href}'`)
  })
})
