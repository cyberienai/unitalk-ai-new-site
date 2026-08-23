import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const showcase = readFileSync(new URL('../components/alma/alma-final-content.tsx', import.meta.url), 'utf8')
const profile = readFileSync(new URL('../components/alma/alma-public-profile.tsx', import.meta.url), 'utf8')
const showcasePage = readFileSync(new URL('../app/collaborateurs-ia/alma/page.tsx', import.meta.url), 'utf8')
const profilePage = readFileSync(new URL('../app/[handle]/alma/page.tsx', import.meta.url), 'utf8')

describe('Alma commercial showcase', () => {
  it('presents the complete customer relationship lifecycle', () => {
    expect(showcase).toContain('Responsable IA de la relation client')
    for (const stage of ['Informer', 'Évaluer', 'Recommander', 'Activer', 'Accompagner', 'Développer']) expect(showcase).toContain(stage)
    expect(showcase).toContain('Du premier contact au développement du compte.')
  })

  it('demonstrates omnichannel continuity and human handoff', () => {
    for (const channel of ['Web et Workspace', 'Voix et téléphone', 'E-mail', 'Slack, WhatsApp, Telegram']) expect(showcase).toContain(channel)
    expect(showcase).toContain('Plusieurs canaux, un même contexte')
    expect(showcase).toContain('Alma traite la continuité. L’expert prend la décision.')
  })

  it('keeps a concrete voice-enabled conversion path', () => {
    expect(showcase).toContain('/inscription?source=alma-profile&intent=nouvelle-mission')
    expect(showcase).toContain('localStorage.setItem(`unitalk_mission_${draftId}`')
    expect(showcase).toContain('/decouvrir?source=alma-profile&draft=')
    expect(showcase).toContain('webkitSpeechRecognition')
    expect(showcase).toContain('aria-pressed={listening}')
  })

  it('links to the distinct verified public identity', () => {
    expect(showcase).toContain('href="/@unitalk/alma"')
    expect(showcasePage).toContain("canonical: '/collaborateurs-ia/alma'")
    expect(showcasePage).toContain("type: 'website'")
  })
})

describe('Alma public professional profile', () => {
  it('states identity, affiliation and disclosure', () => {
    expect(profile).toContain('Identité vérifiée')
    expect(profile).toContain('Collaboratrice IA de Unitalk · Supervision : Patrick Chassany')
    expect(profile).toContain('Vous échangez avec une intelligence artificielle.')
    expect(profile).toContain('@unitalk/alma')
  })

  it('publishes responsibilities, limits and data boundaries', () => {
    expect(profile).toContain('Ses responsabilités chez Unitalk.')
    expect(profile).toContain('Ce qu’Alma peut faire. Ce qu’elle doit transmettre.')
    expect(profile).toContain('Signer un contrat ou engager juridiquement Unitalk')
    expect(profile).toContain('Public, relationnel et privé restent séparés.')
  })

  it('keeps the profile canonical separate from the commercial showcase', () => {
    expect(profile).toContain('href="/collaborateurs-ia/alma"')
    expect(profilePage).toContain("canonical: '/@unitalk/alma'")
    expect(profilePage).toContain("type: 'profile'")
  })
})
