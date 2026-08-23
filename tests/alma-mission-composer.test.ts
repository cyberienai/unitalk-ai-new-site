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
    expect(composer).toContain('event.ctrlKey || event.metaKey')
    expect(composer).toContain('aria-pressed={listening}')
    expect(composer).toContain('const fieldId = useId()')
    expect(composer).toContain('id={fieldId}')
    expect(composer).toContain('aria-labelledby={titleId}')
    expect(composer).toContain('<form action="/decouvrir" method="get"')
    expect(composer).toContain('aria-disabled={!clean}')
  })

  it('lets the homepage edit a suggested mission before submission', () => {
    expect(composer).toContain('onStarterSelect?: (starter: string) => void')
    expect(hero).toContain('onStarterSelect={setTranscript}')
  })

  it('is used by home and Missions', () => {
    for (const source of [hero, missions]) expect(source).toContain('<AlmaMissionComposer')
  })

  it('keeps Marketplace in the shared mission funnel', () => {
    expect(marketplace).toContain('/decouvrir')
  })
})
