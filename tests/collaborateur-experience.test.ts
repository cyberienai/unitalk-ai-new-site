import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const source = readFileSync(new URL('../components/collaborateurs-ia/collaborateur-experience.tsx', import.meta.url), 'utf8')
const architecture = readFileSync(new URL('../components/collaborateurs-ia/collaborator-architecture.tsx', import.meta.url), 'utf8')
const evolution = readFileSync(new URL('../components/collaborateurs-ia/collaborator-evolution.tsx', import.meta.url), 'utf8')

describe('CollaborateurExperience', () => {
  it('opens with one clear promise and a mission-first CTA', () => {
    expect(source).toContain('Un agent sait agir.')
    expect(source).toContain('Un Collaborateur sait travailler avec vous.')
    expect(source).toContain('/missions?composer=1&source=collaborateurs-ia-hero')
  })

  it('reduces the product anatomy to three layers', () => {
    expect(source).toContain('Trois couches, un Collaborateur')
    for (const title of ['Hermes', 'Unitalk', 'Workspace']) expect(source).toContain(`title="${title}"`)
    expect(source).toContain('Hermes donne l’autonomie. Unitalk la rend collaborative.')
  })

  it('places the detailed architecture on the understanding page', () => {
    expect(source).toContain('<CollaboratorArchitecture lang={lang} />')
    expect(architecture).toContain('Un Collaborateur IA n’est pas simplement un agent.')
    expect(architecture).toContain('Hermes conduit le travail.')
    expect(architecture).toContain('Unitalk garde la continuité.')
  })

  it('places the lasting identity example on the understanding page', () => {
    expect(source).toContain('<CollaboratorEvolution lang={lang} />')
    expect(evolution).toContain('Un Collaborateur. Plusieurs métiers. Des compétences illimitées.')
  })

  it('uses a compact identity example based on Lea', () => {
    expect(source).toContain('ROLE_DETAILS.lea')
    expect(source).toContain('<IdentityCard')
    expect(source).toContain('compact />')
    expect(source).toContain('Exemple · Léa')
  })

  it('shows a limited preview of Lea applications and models', () => {
    expect(source).toContain('<ApplicationLogos apps={LEA_APPLICATIONS} limit={4} />')
    expect(source).toContain('<ModelLogos limit={4} />')
    expect(source).toContain('/marketplace#applications')
    expect(source).toContain('/marketplace#modeles-ia')
  })

  it('explains the four organizational placements separately from permissions', () => {
    expect(source).toContain('Une place claire dans votre entreprise')
    for (const label of ['Une personne', 'Une équipe', 'Un département', 'Toute l’entreprise']) expect(source).toContain(label)
    expect(source).toContain('Rattaché pour travailler. Détenu et gouverné par votre entreprise.')
    expect(source).toContain('Les droits déterminent séparément les données, applications et actions accessibles.')
  })

  it('clearly introduces Hugo as another concrete example', () => {
    expect(source).toContain('Autre exemple · Hugo')
    expect(source).toContain('Qualifier les prospects entrants')
    expect(source).toContain('Autoriser le premier contact pour ces 9 prospects ?')
    expect(source).toContain('Démonstration fictive · Hugo')
  })

  it('keeps the primary conversion mission-first', () => {
    expect(source).toContain('/missions?composer=1&source=collaborateurs-ia')
    expect(source).toContain('Confier une première mission')
    expect(source).toContain('Explorer la Marketplace')
    expect(source).not.toContain('AlmaMissionComposer')
  })
})
