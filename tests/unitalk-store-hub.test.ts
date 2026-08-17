import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const hub = readFileSync(new URL('../components/unitalk-store-hub.tsx', import.meta.url), 'utf8')
const composer = readFileSync(new URL('../components/alma-mission-composer.tsx', import.meta.url), 'utf8')
const page = readFileSync(new URL('../app/marketplace/page.tsx', import.meta.url), 'utf8')

describe('Marketplace IA hub', () => {
  it('centralizes the five Store departments on one page', () => {
    expect(page).toContain('UnitalkStoreHub')
    for (const label of ['Profils métier','Compétences','Applications','Modèles IA','Serveurs IA']) expect(hub).toContain(label)
    expect(hub).toContain('STORE_CATEGORIES')
    expect(hub).toContain('Anatomie d’un agent autonome')
  })

  it('states the community and knowledge-work positioning', () => {
    expect(hub).toContain('L’autonomie ne se télécharge pas')
    expect(hub).toContain('Un profil métier de référence pour chaque métier de la connaissance')
  })

  it('highlights Alma with voice-assisted search', () => {
    expect(composer).toContain('src="/alma-avatar.png"')
    expect(hub).toContain('Coordinatrice de missions IA')
    expect(hub).toContain('getSpeechRecognition')
    expect(hub).toContain('AlmaMissionComposer')
    expect(hub).toContain('Continuer avec cette mission')
    expect(hub).toContain('unitalk_mission_')
  })

  it('uses a responsive category rail', () => {
    expect(hub).toContain("lg:grid-cols-[260px_minmax(0,1fr)]")
    expect(hub).toContain('lg:sticky lg:top-24')
    expect(hub).toContain('onClick={() => selectCategory(category.id)}')
    expect(hub).toContain('Catégories du Store')
    expect(hub).toContain('role="tooltip"')
  })

  it('centralizes real catalogs with search and featured cards', () => {
    for (const source of ['ROLE_DETAILS', 'MISSIONS', 'STORE_ITEMS', 'PATHS', 'EXPERT_DOMAINS']) expect(hub).toContain(source)
    expect(hub).toContain('itemsForCategory')
    expect(hub).toContain('MarketplaceItemCard')
    expect(hub).toContain('Rechercher dans cette catégorie')
    expect(hub).toContain('featured={index === 0 && !catalogQuery}')
    expect(hub).toContain("window.location.hash.slice(1)")
  })

  it('keeps each category explanation on its reference route', () => {
    for (const href of ['/collaborateurs-ia','/missions','/collaborateurs-ia/profils-metier','/collaborateurs-ia/competences','/architecture#connaissance-entreprise','/architecture#memoire-et-contexte','/collaborateurs-ia/applications','/modeles-ia','/collaborateurs-ia/serveurs','/academy','/experts']) expect(hub).toContain(`href: '${href}'`)
  })
})
