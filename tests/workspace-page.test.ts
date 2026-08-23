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
    expect(source).toContain('<main id="main-content"')
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
    expect(source).toContain('Le moteur exécute. Unitalk orchestre le travail')
    expect(source).toContain('Unitalk ajoute au moteur open source le Workspace partagé')
    for (const vendor of ['Honcho', 'Stalwart', 'Telnyx']) expect(source).not.toContain(vendor)
    expect(source).toContain('Un espace pour chacun.')
    expect(source).toContain('Un contexte commun pour avancer.')
    expect(source).toContain('text-[#D10E63]">{t.spacesAccent}')
  })

  it('labels the source video and onboarding destination accurately', () => {
    expect(source).toContain("demoTitle: 'Le moteur open source utilisé par Unitalk'")
    expect(source).toContain("demoTitle: 'The open-source engine used by Unitalk'")
    expect(source).toContain("openMission: 'Voir un exemple de mission'")
    expect(source).toContain("href={onboarding ? '#mission-example'")
  })

  it('uses Nadia for the unpaid-invoice example', () => {
    expect(source).toContain('Nadia identifie 12 factures échues.')
    expect(source).toContain("unitalkPreviewBody: 'Nadia · Collaboratrice IA Finance'")
    expect(source).toContain('src="/images/nadia-avatar.png"')
    expect(source).not.toContain('Emma identifie 12 factures échues.')
  })

  it('explains the free Workspace and first mission path', () => {
    expect(source).toContain("freeTitle: 'Votre Workspace Solo est gratuit.'")
    expect(source).toContain("freeAccent: 'Votre première mission aussi.'")
    expect(source).toContain('Alma configure l’accès aux modèles IA')
    expect(source).toContain('Unitalk AI Cloud')
    expect(source).toContain('Créer mon Workspace Solo')
  })

  it('presents Unitalk Desktop as the enterprise distribution of Hermes Desktop', () => {
    expect(source).toContain('Unitalk Desktop est la distribution Unitalk du projet open source Hermes Desktop.')
    expect(source).toContain('AI Gateway')
    expect(source).toContain("downloadKicker: 'Unitalk Desktop'")
    expect(source).toContain('Synchronisation avec Unitalk AI Cloud')
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
    expect(source).toContain('Unitalk Desktop en est une distribution enrichie')
  })
})
