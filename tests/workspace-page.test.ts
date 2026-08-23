import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const source = readFileSync(new URL('../components/workspace/workspace-final-content.tsx', import.meta.url), 'utf8')
const page = readFileSync(new URL('../app/workspace/page.tsx', import.meta.url), 'utf8')

describe('Workspace landing', () => {
  it('uses the shared visual grammar and one clear hero', () => {
    expect(source).toContain('hero-heading')
    expect(source).toContain('Un espace de travail\\npour humains et Collaborateurs IA.')
    expect(source).toContain('editorial-shell')
    expect(source).toContain('CtaButton')
    expect(source).toContain('rounded-[24px]')
  })

  it('uses stable governance vocabulary', () => {
    for (const term of ['Droit', 'Validation', 'Décision', 'Exécution', 'Trace']) expect(source).toContain(term)
    expect(source).toContain('Une application n’accorde aucun droit à elle seule.')
  })

  it('does not publish unverified vendors or ambiguous free claims', () => {
    for (const claim of ['Clerk', 'Honcho', 'Pipedream', 'Stalwart', 'Telnyx', 'Utilisateurs humains gratuits', 'Chat gratuit', 'Desktop gratuit', '3 000']) expect(source).not.toContain(claim)
  })

  it('marks the product scene as an illustrative fictional demonstration', () => {
    expect(source).toContain('interface est présentée à titre illustratif')
    expect(source).toContain('Démonstration générique du Workspace')
  })

  it('embeds the official Hermes Desktop demonstration locally', () => {
    expect(source).toContain("const HERMES_DEMO = '/hermes-desktop-demo.mp4'")
    expect(source).toContain("const HERMES_POSTER = '/hermes-desktop-demo.webp'")
    expect(source).toContain('autoPlay loop muted playsInline')
    expect(source).toContain('Voir la source officielle')
  })

  it('presents the Workspace through mission, memory, tools and governance', () => {
    for (const term of ['Travaillez partout', 'Gardez le contexte', 'Planifiez le travail', 'Déléguez des missions', 'Utilisez vos outils', 'Isolez l’exécution']) expect(source).toContain(term)
    expect(source).toContain('Hermes est le moteur agentique open source au cœur de la distribution Unitalk AI')
    expect(source).toContain('Unitalk ajoute le Workspace partagé')
  })

  it('explains the free Workspace and first mission path', () => {
    expect(source).toContain('Votre Workspace est gratuit. Votre première mission aussi.')
    expect(source).toContain('Connectez l’AI Gateway au Workspace')
    expect(source).toContain('Unitalk AI Cloud')
    expect(source).toContain('Lancer ma mission offerte')
  })

  it('renders confirmed onboarding directly in Workspace', () => {
    expect(page).toContain('onboardingComplete(draft)')
    expect(page).toContain('<WorkspaceFinalContent onboarding={workspace}')
    expect(source).toContain('onboarding.missionTitle')
    expect(source).toContain('onboarding.collaboratorName')
    expect(source).toContain('Première mission · Prête à démarrer')
    expect(page).toContain('collaboratorTemplateSlug: onboarding.collaboratorTemplateSlug')
    expect(source).toContain('Démonstration générique du Workspace')
    expect(source).toContain('indépendant de votre mission')
  })
})
