import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { MISSIONS } from '@/lib/missions-catalog'

const source = readFileSync(new URL('../components/missions-content.tsx', import.meta.url), 'utf8')

describe('Léa missions in the missions catalog', () => {
  it('ranks popular marketing missions and keeps Léa’s catalog coverage', () => {
    expect(source).toContain("marketing: ['construire-un-calendrier-editorial'")
    expect(source).toContain("marketing: 'Marketing'")
    for (const slug of ['construire-un-calendrier-editorial', 'ameliorer-mon-referencement', 'decliner-un-contenu-multicanal']) {
      expect(MISSIONS.find((mission) => mission.slug === slug)?.collaboratorSlug).toBe('lea')
    }
  })
})
