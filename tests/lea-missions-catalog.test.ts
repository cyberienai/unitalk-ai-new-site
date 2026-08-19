import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { MISSIONS } from '@/lib/missions-catalog'

const source = readFileSync(new URL('../components/missions-content.tsx', import.meta.url), 'utf8')

describe('Léa missions in the missions catalog', () => {
  it('publishes a dedicated ready-to-use selection', () => {
    expect(source).toContain('Missions prêtes à l’emploi avec Léa')
    expect(source).toContain('/missions?collaborateur=lea&vue=toutes')
    for (const slug of ['construire-un-calendrier-editorial', 'ameliorer-mon-referencement', 'decliner-un-contenu-multicanal']) {
      expect(source).toContain(slug)
      expect(MISSIONS.find((mission) => mission.slug === slug)?.collaboratorSlug).toBe('lea')
    }
  })
})
