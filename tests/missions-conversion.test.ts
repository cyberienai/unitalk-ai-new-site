import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const page = readFileSync(new URL('../components/missions-content.tsx', import.meta.url), 'utf8')
const card = readFileSync(new URL('../components/missions/store-card.tsx', import.meta.url), 'utf8')
const route = readFileSync(new URL('../app/missions/page.tsx', import.meta.url), 'utf8')
const catalog = readFileSync(new URL('../lib/missions-catalog.ts', import.meta.url), 'utf8')
const store = readFileSync(new URL('../lib/missions-store.ts', import.meta.url), 'utf8')

describe('missions conversion path', () => {
  it('separates mission creation from catalog search', () => {
    expect(page).toContain('Quel travail voulez-vous confier à votre Collaborateur IA ?')
    expect(page).toContain("catalogTitleStart: 'Vendre plus. Mieux servir vos clients.'")
    expect(page).toContain("catalogTitleEnd: 'Produire. Innover.'")
    expect(page).toContain("search: 'Rechercher une mission'")
  })

  it('shows Alma with her avatar wherever she is named', () => {
    expect(page).toContain('withAlmaAvatar(t.heroCta)')
    expect(page).toContain("withAlmaAvatar('Alma')")
    expect(page).toContain('withAlmaAvatar(t.catalogLead)')
  })

  it('keeps the user request through authentication', () => {
    expect(page).toContain('Préparer ma mission avec Alma')
    expect(page).toContain('AlmaMissionComposer')
    expect(page).toContain('unitalk_mission_')
    expect(page).toContain("new URLSearchParams({ source: 'mission-store', draft: draftId })")
  })

  it('does not expose the mission description in the URL', () => {
    expect(page).not.toContain("q: clean.slice(0, 1500)")
    expect(page).toContain("source: 'mission-store'")
    expect(page).toContain('onStarterSelect={setNeed}')
  })

  it('uses explicit, accessible card actions', () => {
    expect(card).toContain("'Découvrir la mission'")
    expect(card).toContain('missionHref(mission.slug, lang)')
    expect(card).not.toContain("'Voir le détail'")
    expect(card).not.toContain('className="absolute inset-0 z-0')
    expect(card).not.toContain('Crédits Mission')
  })

  it('ends with answers to key conversion questions', () => {
    expect(page).toContain("faqTitle: 'Avant de confier votre première mission.'")
    expect(page).toContain('Que se passe-t-il après avoir choisi une mission ?')
    expect(page).toContain('Quelles actions restent sous mon contrôle ?')
    expect(page).not.toContain("finalTitle: 'Vous savez ce qui doit être fait.'")
  })

  it('explains the product outcome and the included first mission', () => {
    expect(page).toContain("titleStart: 'Ne demandez plus à l’IA.'")
    expect(page).toContain("titleAccent: 'Confiez-lui le travail.'")
    expect(page).not.toContain('7 jours ou 1 million de tokens')
    expect(page).not.toContain('Aucun abonnement payant n’est activé sans votre accord.')
  })

  it('keeps mission cards focused on the result and action', () => {
    expect(card).toContain('{mission.result[lang]}')
    expect(card).not.toContain("'Résultat'")
    expect(card).toContain("'Livrable :'")
    expect(card).not.toContain("'Validation'")
    expect(card).toContain('ROLE_DETAILS[mission.collaboratorSlug]')
    expect(card).toContain('collaboratorProfileHref(collaborator.slug, lang)')
    expect(card).not.toContain('getMissionGuideHref(mission)')
    expect(card).not.toContain('Proposée par la communauté')
    expect(card).not.toContain('Validation professionnelle')
  })

  it('keeps a single canonical for filtered variants', () => {
    expect(route).toContain("alternates: { canonical: '/missions', languages:")
  })

  it('makes every mission accessible without availability statuses', () => {
    expect(catalog).not.toContain('MissionStatus')
    expect(catalog).not.toContain('availabilityReason')
    expect(catalog).not.toMatch(/status: '(available|on-setup|coming-soon)'/)
    expect(store).not.toContain('AVAILABILITIES')
    expect(store).not.toContain('disponibilite')
  })
})
