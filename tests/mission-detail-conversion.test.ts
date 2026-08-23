import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const detail = readFileSync(new URL('../components/mission-detail-content.tsx', import.meta.url), 'utf8')
const account = readFileSync(new URL('../components/discover/screen-account.tsx', import.meta.url), 'utf8')
const route = readFileSync(new URL('../app/missions/[slug]/page.tsx', import.meta.url), 'utf8')
const conversion = readFileSync(new URL('../lib/mission-conversion-copy.ts', import.meta.url), 'utf8')
const proxy = readFileSync(new URL('../proxy.ts', import.meta.url), 'utf8')
const flow = readFileSync(new URL('../components/discover/discover-flow.tsx', import.meta.url), 'utf8')
const faq = readFileSync(new URL('../lib/mission-detail-faq.ts', import.meta.url), 'utf8')
const onboarding = readFileSync(new URL('../lib/discover-onboarding-state.ts', import.meta.url), 'utf8')

describe('mission detail conversion', () => {
  it('turns the right column into a mission decision card', () => {
    for (const copy of ['Préparer ma première liste de prospects', 'Première mission offerte', 'Sans carte bancaire']) expect(detail).toContain(copy)
    expect(detail).toContain('aria-labelledby="mission-decision-title"')
    expect(detail).toContain('source=mission-detail')
    expect(detail).not.toContain('Ensuite : compte → validation des critères → Workspace.')
  })

  it('provides prospect-specific decision copy', () => {
    expect(conversion).toContain("'trouver-de-nouveaux-clients'")
    expect(conversion).toContain('Validation avant tout contact ou modification du CRM')
  })

  it('shows a concrete deliverable, guide and FAQ', () => {
    expect(detail).toContain('ProspectDeliverablePreview')
    expect(detail).toContain('Comment la qualification est établie')
    expect(detail).toContain('Forte correspondance')
    expect(detail).toContain("prospectDecisionTitle: 'Votre première liste'")
    expect(detail).toContain('Donnez trois repères à Alma')
    expect(detail).toContain('!isProspectingMission && <section aria-labelledby="mission-produces-title"')
    expect(detail).not.toContain('82 / 100')
    expect(detail).toContain('/blog/trouver-prospects-qualifies-ia')
    expect(detail).toContain('faq.map')
    expect(faq).toContain('Hugo contacte-t-il directement les prospects ?')
    expect(detail).toContain('Cible')
    expect(detail).toContain('Volume')
    expect(detail).toContain("new URLSearchParams({ ...(target.trim() ? { cible: target.trim() }")
  })

  it('supports pre-auth scoping and trailing-dot redirects', () => {
    expect(flow).toContain("step === 'mission' && <ScreenMission")
    expect(flow).toContain("searchParams.get('cible')")
    expect(onboarding).toContain("mission.slug === 'trouver-de-nouveaux-clients'")
    expect(proxy).toContain("pathname.endsWith('.')")
    expect(proxy).toContain('NextResponse.redirect(target, 308)')
  })

  it('keeps the selected mission ahead of the recommended collaborator in signup', () => {
    expect(account).toContain('collaborator && !mission')
  })

  it('avoids duplicating Unitalk in the document title', () => {
    expect(route).toContain('`${mission.title.fr} · Mission IA`')
    expect(route).not.toContain('`${mission.title.fr} · Missions · Unitalk`')
  })
})
