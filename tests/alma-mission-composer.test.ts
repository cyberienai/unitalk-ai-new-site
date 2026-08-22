import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const composer = readFileSync(new URL('../components/alma-mission-composer.tsx', import.meta.url), 'utf8')
const hero = readFileSync(new URL('../components/home/hero-hybrid.tsx', import.meta.url), 'utf8')
const missions = readFileSync(new URL('../components/missions-content.tsx', import.meta.url), 'utf8')
const marketplace = readFileSync(new URL('../components/unitalk-store-hub.tsx', import.meta.url), 'utf8')

describe('shared Alma mission composer', () => {
  it('provides the shared writing-first interaction', () => {
    expect(composer).toContain('AlmaMissionComposer')
    expect(composer).toContain("event.key === 'Enter'")
    expect(composer).toContain('aria-pressed={listening}')
    expect(composer).toContain('{clean && (')
    expect(composer).toContain('const fieldId = useId()')
    expect(composer).toContain('const field = fieldRef.current')
    expect(composer).toContain('id={fieldId}')
    expect(composer).toContain('aria-labelledby={titleId}')
  })

  it('lets the homepage submit a suggested mission immediately', () => {
    expect(composer).toContain('onStarterSelect?: (starter: string) => void')
    expect(hero).toContain('onStarterSelect={handoffNeed}')
  })

  it('is used by home, Missions and Marketplace', () => {
    for (const source of [hero, missions, marketplace]) expect(source).toContain('<AlmaMissionComposer')
  })

  it('keeps Marketplace drafts compatible with discovery', () => {
    expect(marketplace).toContain('unitalk_mission_')
    expect(marketplace).toContain('source=marketplace')
  })
})
