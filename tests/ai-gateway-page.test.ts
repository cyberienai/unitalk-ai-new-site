import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const gateway = readFileSync(new URL('../components/ai-gateway-content.tsx', import.meta.url), 'utf8')
const page = readFileSync(new URL('../app/ai-gateway/page.tsx', import.meta.url), 'utf8')

describe('Unitalk AI Gateway publication', () => {
  it('publishes the gateway instead of a coming-soon page', () => {
    expect(page).toContain('AiGatewayContent')
    expect(page).not.toContain('ComingSoonContent')
    expect(gateway).toContain('Un seul accès gouverné à vos modèles d’IA.')
  })

  it('documents gateway control and access modes', () => {
    expect(gateway).toContain('Routage intelligent')
    expect(gateway).toContain('Repli automatique')
    expect(gateway).toContain('Clés virtuelles')
    expect(gateway).toContain('Observabilité')
    for (const mode of ['Crédits Unitalk', 'BYOK', 'Hybride']) expect(gateway).toContain(mode)
  })

  it('lets users browse image, audio and video model families', () => {
    expect(gateway).toContain("image: 'Image'")
    expect(gateway).toContain("audio: 'Audio'")
    expect(gateway).toContain("video: 'Vidéo'")
    for (const family of ['FLUX', 'ElevenLabs', 'Kling', 'Runway']) expect(gateway).toContain(family)
  })

  it('explains centralized administration and billing', () => {
    expect(gateway).toContain('Facturation centralisée')
    expect(gateway).toContain('Collaborateurs IA et humains, administrés au même endroit.')
    expect(gateway).toContain('membres humains, les Collaborateurs IA, leurs rôles, leurs droits, leurs budgets et leurs moyens de paiement')
    expect(gateway).toContain('abonnements, capacités IA, crédits prépayés et consommation')
  })
})
