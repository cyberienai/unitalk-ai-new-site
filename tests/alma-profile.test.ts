import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const alma = readFileSync(new URL('../components/alma/alma-final-content.tsx', import.meta.url), 'utf8')
const discover = readFileSync(new URL('../components/discover/discover-flow.tsx', import.meta.url), 'utf8')
const account = readFileSync(new URL('../components/discover/screen-account.tsx', import.meta.url), 'utf8')

describe('Alma public profile', () => {
  it('starts the generic signup without selecting a mission', () => {
    expect(alma).toContain('/inscription?source=alma-profile&intent=nouvelle-mission')
    expect(alma).not.toContain('/decouvrir?mission=')
    expect(discover).toContain("{ kind: 'empty', source }")
    expect(account).toContain("almaGenericTitle: 'Vous n\\'avez pas encore choisi de mission.'")
    expect(account).toContain("genericTitle: 'Décrivez d’abord le travail à accomplir.'")
    expect(account).toContain("genericSteps: ['Présenter votre entreprise', 'Définir une première mission', 'Préparer votre Collaborateur IA']")
  })

  it('uses the canonical mission coordinator positioning', () => {
    expect(alma).toContain('Coordinatrice de missions IA')
    expect(alma).toContain('Son profil de Coordinatrice de missions IA est inclus avec la Licence Entreprise.')
    expect(alma).toContain('Alma fait d’abord progresser un Collaborateur IA existant.')
    expect(alma).not.toContain('En activité')
  })

  it('shows a concrete mission deliverable and links the Alma Store', () => {
    expect(alma).toContain('Réduire les retards de paiement')
    expect(alma).toContain('Relancer les factures impayées')
    expect(alma).toContain('href="/unitalk/@alma/store"')
  })

  it('captures a concrete need before signup and carries it to discovery', () => {
    expect(alma).toContain('Quel travail voulez-vous confier ?')
    expect(alma).toContain('localStorage.setItem(`unitalk_mission_${draftId}`')
    expect(alma).toContain('/decouvrir?source=alma-profile&draft=')
    expect(alma).toContain('Préparer ma mission avec Alma')
    expect(alma).toContain('Rien n’est activé sans votre validation')
    expect(alma).toContain('webkitSpeechRecognition')
    expect(alma).toContain('aria-pressed={listening}')
  })

  it('uses the radical editorial system from the AI models page', () => {
    expect(alma).toContain('lg:min-h-[410px]')
    expect(alma).not.toContain('min-h-[760px]')
    expect(alma).toContain('text-[clamp(3rem,6vw,6.2rem)]')
    expect(alma).toContain('bg-[#181615]')
    expect(alma).toContain('bg-[#D10E63]')
    expect(alma).toContain('lg:grid-cols-[1.05fr_.95fr]')
  })

  it('uses a concrete conversion path without promising a new identity', () => {
    expect(alma).toContain('Alma prépare qui s’en charge.')
    expect(alma).toContain('Un besoin devient une mission prête à confier.')
    expect(alma).toContain('Équiper l’existant avant de créer')
    expect(alma).toContain('Alma prépare la mission, les accès et les validations.')
  })
})
