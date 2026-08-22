import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const page = readFileSync(new URL('../components/missions-content.tsx', import.meta.url), 'utf8')
const card = readFileSync(new URL('../components/missions/store-card.tsx', import.meta.url), 'utf8')
const route = readFileSync(new URL('../app/missions/page.tsx', import.meta.url), 'utf8')

describe('missions conversion path', () => {
  it('separates mission creation from catalog search', () => {
    expect(page).toContain('Quel travail voulez-vous confier à votre Collaborateur IA ?')
    expect(page).toContain('Que voulez-vous faire avancer ?')
    expect(page).toContain("search: 'Rechercher'")
  })

  it('shows Alma with her avatar wherever she is named', () => {
    expect(page).toContain('withAlmaAvatar(t.heroCta)')
    expect(page).toContain("withAlmaAvatar('Alma')")
    expect(page).toContain('withAlmaAvatar(t.finalCta)')
  })

  it('keeps the user request through authentication', () => {
    expect(page).toContain('Personnaliser mon Collaborateur IA')
    expect(page).toContain('AlmaMissionComposer')
    expect(page).toContain('unitalk_mission_')
    expect(page).toContain('/decouvrir?draft=${encodeURIComponent(draftId)}&source=mission-store')
  })

  it('uses explicit, accessible card actions', () => {
    expect(card).toContain("'Confier cette mission'")
    expect(card).toContain('href={`/missions/${mission.slug}`}')
    expect(card).not.toContain('className="absolute inset-0 z-0')
    expect(card).not.toContain('Crédits Mission')
  })

  it('keeps mission cards focused on the result and action', () => {
    expect(card).toContain('{mission.result[lang]}')
    expect(card).not.toContain("'Résultat'")
    expect(card).toContain('ROLE_DETAILS[mission.collaboratorSlug]')
    expect(card).toContain('collaboratorHref(collaborator.slug)')
    expect(card).toContain('PlayCircle')
    expect(card).toContain("'Guide'")
    expect(card).not.toContain('Proposée par la communauté')
    expect(card).not.toContain('Validation professionnelle')
  })

  it('keeps a single canonical for filtered variants', () => {
    expect(route).toContain("alternates: { canonical: '/missions' }")
  })
})
