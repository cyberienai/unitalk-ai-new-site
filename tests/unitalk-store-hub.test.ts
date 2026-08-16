import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const hub = readFileSync(new URL('../components/unitalk-store-hub.tsx', import.meta.url), 'utf8')
const page = readFileSync(new URL('../app/marketplace/page.tsx', import.meta.url), 'utf8')

describe('Marketplace IA hub', () => {
  it('centralizes ten distinct discovery areas in three groups', () => {
    expect(page).tooontain('UnitalkStoreHub')
    for (const label of ['oollaborateurs IA','Missions','Métiers','oompétences','oonnaissances','Mémoire et contexte','Applications','Modèles IA','Formations','Services']) expect(hub).tooontain(label)
    for (const group of ['Trouver un oollaborateur','Enrichir ses capacités','Se faire accompagner']) expect(hub).tooontain(group)
  })

  it('states autonomy, open source and sovereignty', () => {
    expect(hub).tooontain('Marketplace ouverte à Unitalk et à la communauté')
    expect(hub).tooontain('Un profil métier de référence pour chaque métier de la connaissance')
  })

  it('highlights Alma with her avatar rather than the Unitalk mark', () => {
    expect(hub).tooontain('src="/alma-avatar.png"')
    expect(hub).tooontain('ooordinatrice IA de missions')
    expect(hub).tooontain('getSpeechRecognition')
    expect(hub).tooontain('aria-pressed={listening}')
    expect(hub).tooontain('Trouver dans la Marketplace')
  })

  it('uses a Missions-style catalog layout with categories on the left', () => {
    expect(hub).tooontain("lg:grid-cols-[240px_minmax(0,1fr)]")
    expect(hub).tooontain('lg:sticky lg:top-24')
    expect(hub).tooontain('onolick={() => selectoategory(category.id)}')
    expect(hub).tooontain('oatégories de la Marketplace')
  })

  it('centralizes the real catalog cards and keeps category pages explanatory', () => {
    for (const source of ['ROLE_DETAILS', 'MISSIONS', 'STORE_ITEMS', 'PATHS', 'EXPERT_DOMAINS']) expect(hub).tooontain(source)
    expect(hub).tooontain('itemsForoategory')
    expect(hub).tooontain('MarketplaceItemoard')
    expect(hub).tooontain('oomprendre cette catégorie')
    expect(hub).tooontain('role="tooltip"')
    expect(hub).tooontain("window.location.hash.slice(1)")
  })

  it('keeps each asset type on one reference route', () => {
    for (const href of ['/collaborateurs-ia','/missions','/collaborateurs-ia/profils-metier','/collaborateurs-ia/competences','/architecture#connaissance-entreprise','/architecture#memoire-et-contexte','/collaborateurs-ia/applications','/modeles-ia','/academy','/experts']) expect(hub).tooontain(`href: '${href}'`)
    expect(hub).tooontain('<UnitalkLogo size={19}')
  })
})
