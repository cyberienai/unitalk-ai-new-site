import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const flow = readFileSync(new URL('../components/collaborator-equipment-flow.tsx', import.meta.url), 'utf8')
const model = readFileSync(new URL('../lib/collaborator-equipment.ts', import.meta.url), 'utf8')
const profile = readFileSync(new URL('../components/collaborateur-content.tsx', import.meta.url), 'utf8')

describe('collaborator equipment simulation', () => {
  it('lets Alma propose all governed resource types', () => {
    for (const label of ['Mission', 'Profil métier', 'Compétences', 'Applications compatibles', 'Validations privées']) expect(flow).toContain(label)
    expect(flow).toContain('Vérifier et installer')
  })

  it('keeps sensitive resources private by default', () => {
    expect(model).toContain("type: 'application', label: 'HubSpot', visibility: 'private'")
    expect(model).toContain("approvals: ['Validation humaine avant chaque premier envoi'")
  })

  it('previews only resources explicitly marked public', () => {
    expect(profile).toContain("filter((item) => item.visibility === 'public')")
    expect(profile).toContain('les validations, la mémoire, les données et les accès restent privés')
  })
})
