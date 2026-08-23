import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const source = readFileSync(new URL('../components/workspace/workspace-final-content.tsx', import.meta.url), 'utf8')
const page = readFileSync(new URL('../app/workspace/page.tsx', import.meta.url), 'utf8')

describe('Workspace landing', () => {
  it('uses the shared visual grammar and one clear hero', () => {
    expect(source).toContain('hero-heading')
    expect(source).toContain('Un espace de travail\\noù humains et IA collaborent.')
    expect(source).toContain('editorial-shell')
    expect(source).toContain('CtaButton')
    expect(source).toContain('rounded-[24px]')
  })

  it('uses stable governance vocabulary', () => {
    for (const term of ['Droit', 'Validation', 'Décision', 'Exécution', 'Trace']) expect(source).toContain(term)
    expect(source).toContain('Une application n’accorde aucun droit à elle seule.')
  })

  it('does not publish unverified vendors or ambiguous free claims', () => {
    for (const claim of ['Clerk', 'Pipedream', 'Utilisateurs humains gratuits', 'Chat gratuit', 'Desktop gratuit', '3 000']) expect(source).not.toContain(claim)
  })

  it('marks the product scene as an illustrative fictional demonstration', () => {
    expect(source).toContain('Ce n’est pas une capture du Workspace Unitalk')
    expect(source).toContain('Démonstration générique du Workspace')
  })

  it('embeds the official Hermes Desktop demonstration from its source', () => {
    expect(source).toContain("const HERMES_DEMO = 'https://hermes-assets.nousresearch.com/hermes-desktop.mp4'")
    expect(source).toContain('controls playsInline preload="metadata"')
    expect(source).toContain('Voir la source officielle')
  })

  it('presents the Workspace through mission, memory, tools and governance', () => {
    for (const term of ['Disponible partout', 'Mémoire persistante', 'Automatisation ciblée', 'Tâches multipliées', 'Navigation web', 'Exécution isolée']) expect(source).toContain(term)
    expect(source).toContain('Hermes exécute. Unitalk orchestre.')
    expect(source).toContain('Ensemble, ils déploient la collaboration à l’échelle de l’entreprise.')
    expect(source).toContain('Hermes est le moteur agentique open source au cœur de la distribution Unitalk AI')
    expect(source).toContain('Unitalk ajoute le Workspace partagé')
    expect(source).toContain('Honcho contribue à personnaliser')
    expect(source).toContain('Email et calendrier via Stalwart')
    expect(source).toContain('téléphone via Telnyx')
    expect(source).toContain('Un Workspace pour tous les membres autorisés.')
  })

  it('explains the free Workspace and first mission path', () => {
    expect(source).toContain('Votre Workspace Solo est gratuit. Votre première mission aussi.')
    expect(source).toContain('Alma configure l’accès aux modèles IA')
    expect(source).toContain('Unitalk AI Cloud')
    expect(source).toContain('Créer mon Workspace Solo')
  })

  it('presents Unitalk Desktop as the enterprise distribution of Hermes Desktop', () => {
    expect(source).toContain('Unitalk Desktop est la distribution Unitalk du projet open source Hermes Desktop.')
    expect(source).toContain('AI Gateway')
    expect(source).toContain('Gateway vers Unitalk AI Cloud')
    expect(source).toContain('Gestion des missions avec Alma')
    expect(source).toContain('Assistants IA partagés')
    expect(source).not.toContain('Hermes-Setup.dmg')
    expect(source).not.toContain('Hermes-Setup.exe')
  })

  it('renders confirmed onboarding directly in Workspace', () => {
    expect(page).toContain('onboardingComplete(draft)')
    expect(page).toContain('<WorkspaceFinalContent onboarding={workspace}')
    expect(source).toContain('onboarding.missionTitle')
    expect(source).toContain('onboarding.collaboratorName')
    expect(source).toContain('Première mission · Prête à démarrer')
    expect(page).toContain('collaboratorTemplateSlug: onboarding.collaboratorTemplateSlug')
    expect(source).toContain('Démonstration générique du Workspace')
    expect(source).toContain('Ce n’est pas une capture du Workspace Unitalk')
  })
})
