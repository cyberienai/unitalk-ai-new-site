import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const flow = readFileSync(new URL('../components/collaborator-equipment-flow.tsx', import.meta.url), 'utf8')
const model = readFileSync(new URL('../lib/collaborator-equipment.ts', import.meta.url), 'utf8')
const profile = readFileSync(new URL('../components/collaborateur-content.tsx', import.meta.url), 'utf8')

describe('collaborator Alma personalization', () => {
  it('starts from a real mission without simulating installation', () => {
    expect(flow).toContain('Quelle mission voulez-vous confier à')
    expect(flow).toContain('Préparer la mission')
    expect(flow).toContain('/missions?composer=1&collaborateur=')
    expect(flow).not.toContain('Vérifier et installer')
    expect(flow).not.toContain('Brouillon installé')
  })

  it('keeps sensitive resources private by default', () => {
    expect(model).toContain("type: 'application', label: 'HubSpot', visibility: 'private'")
    expect(model).toContain("approvals: ['Validation humaine avant chaque premier envoi'")
  })

  it('explains governed identity, applications, models and continuity', () => {
    for (const claim of ['Identité IA de votre Collaborateur', 'Communication', 'Environnement de travail', 'Accès gouvernés par l’entreprise', 'Plus de 3 000 connecteurs', 'Unitalk AI Gateway', 'Supervision humaine réattribuable', 'Questions fréquentes']) expect(profile).toContain(claim)
  })
})
