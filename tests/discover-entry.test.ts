import { describe, expect, it } from 'vitest'
import { parseDiscoverSource } from '@/lib/discover-entry'

describe('parseDiscoverSource', () => {
  it.each(['nav', 'tarifs', 'mission-store', 'profile-store', 'alma-store', 'alma-profile', 'paul-graham', 'direct'] as const)('accepts %s', source => {
    expect(parseDiscoverSource(source)).toBe(source)
  })

  it('neutralizes unknown and missing sources', () => {
    expect(parseDiscoverSource('https://attacker.test')).toBe('direct')
    expect(parseDiscoverSource('unknown')).toBe('direct')
    expect(parseDiscoverSource(null)).toBe('direct')
  })
})
