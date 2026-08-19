import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const source = readFileSync(new URL('../components/collaborateurs-ia/collaborateur-experience.tsx', import.meta.url), 'utf8')

describe('CollaborateurExperience', () => {
  it('opens with the Hermes and Unitalk positioning', () => {
    expect(source).toContain('Un agent sait agir.')
    expect(source).toContain('Un Collaborateur sait travailler avec vous.')
    expect(source).toContain('Hermes × Unitalk')
  })

  it('presents Hermes as the agentic core', () => {
    expect(source).toContain('Hermes conduit le travail.')
    expect(source).toContain('Raisonner · planifier · agir')
    expect(source).toContain('/documentation/licence-collaborateur-ia')
  })

  it('reuses the concrete identity card shown on Lea profile', () => {
    expect(source).toContain('IdentityCard')
    expect(source).toContain('ROLE_DETAILS.lea')
    expect(source).toContain('Une identité propre. Des accès propres.')
    expect(source).toContain('Carte d’identité de votre Collaborateur IA')
  })

  it('defines the human and AI shared workspace', () => {
    expect(source).toContain('Le travail sort de la boîte de dialogue.')
    expect(source).toContain('Workspace partagé')
    expect(source).toContain('Même espace. Même contexte. Des responsabilités différentes.')
  })

  it('sends applications and models to the Marketplace', () => {
    expect(source).toContain('ApplicationLogos')
    expect(source).toContain('ModelLogos')
    expect(source).toContain("['Notion', 'Canva', 'WordPress', 'LinkedIn', 'Analytics', 'Gmail']")
    expect(source).toContain('/marketplace#applications')
    expect(source).toContain('/marketplace#modeles-ia')
    expect(source).toContain('Ses ressources évoluent. Son identité demeure.')
    expect(source).toContain('La disponibilité dépend du fournisseur')
  })

  it('proves the collaboration through a concrete fictional mission', () => {
    expect(source).toContain('Une mission, concrètement')
    expect(source).toContain('Qualifier les prospects entrants')
    expect(source).toContain('Autoriser le premier contact pour ces 9 prospects ?')
    expect(source).toContain('Démonstration fictive')
  })

  it('offers two clear routes in both the hero and final section', () => {
    expect(source).toContain('Explorer la Marketplace')
    expect(source).toContain('Confier une première mission')
    expect(source).toContain('/missions?composer=1&source=collaborateurs-ia-hero')
    expect(source).toContain('/missions?composer=1&source=collaborateurs-ia')
    expect(source).not.toContain('AlmaMissionComposer')
  })

  it('localizes every visible workspace and core label', () => {
    for (const key of ['coreLabel', 'humanLabel', 'aiLabel', 'sharedWorkspace']) expect(source).toContain(`t.${key}`)
    expect(source).not.toContain('label="Humains"')
    expect(source).not.toContain('>Agent core<')
  })
})
