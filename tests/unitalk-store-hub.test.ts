import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const hub = readFileSync(new URL('../components/unitalk-store-hub.tsx', import.meta.url), 'utf8')
const page = readFileSync(new URL('../app/marketplace/page.tsx', import.meta.url), 'utf8')

describe('Marketplace IA hub', () => {
  it('centralizes ten distinct discovery areas in three groups', () => {
    expect(page).toContain('UnitalkStoreHub')
    for (const label of ['Collaborateurs IA','Missions','Métiers','Compétences','Connaissances','Mémoire et contexte','Applications','Modèles IA','Formations','Services']) expect(hub).toContain(label)
    for (const group of ['Trouver un Collaborateur','Enrichir ses capacités','Se faire accompagner']) expect(hub).toContain(group)
  })

  it('states autonomy, open source and sovereignty', () => {
    expect(hub).toContain('Marketplace ouverte à Unitalk et à la communauté')
    expect(hub).toContain('Un profil métier de référence pour chaque métier de la connaissance')
  })

  it('highlights Alma with her avatar rather than the Unitalk mark', () => {
    expect(hub).toContain('src="/alma-avatar.png"')
    expect(hub).toContain('Coordinatrice IA de missions')
    expect(hub).toContain('getSpeechRecognition')
    expect(hub).toContain('aria-pressed={listening}')
    expect(hub).toContain('Trouver dans la Marketplace')
  })

  it('uses a Missions-style catalog layout with categories on the left', () => {
    expect(hub).toContain("lg:grid-cols-[240px_minmax(0,1fr)]")
    expect(hub).toContain('lg:sticky lg:top-24')
    expect(hub).toContain('onClick={() => selectCategory(category.id)}')
    expect(hub).toContain('Catégories de la Marketplace')
  })

  it('centralizes the real catalog cards and keeps category pages explanatory', () => {
    for (const source of ['ROLE_DETAILS', 'MISSIONS', 'STORE_ITEMS', 'PATHS', 'EXPERT_DOMAINS']) expect(hub).toContain(source)
    expect(hub).toContain('itemsForCategory')
    expect(hub).toContain('MarketplaceItemCard')
    expect(hub).toContain('Comprendre cette catégorie')
    expect(hub).toContain('role="tooltip"')
    expect(hub).toContain("window.location.hash.slice(1)")
  })

  it('keeps each asset type on one reference route', () => {
    for (const href of ['/collaborateurs-ia','/missions','/collaborateurs-ia/profils-metier','/collaborateurs-ia/competences','/architecture#connaissance-entreprise','/architecture#memoire-et-contexte','/collaborateurs-ia/applications','/modeles-ia','/academy','/experts']) expect(hub).toContain(`href: '${href}'`)
    expect(hub).toContain('<UnitalkLogo size={19}')
  })
})
