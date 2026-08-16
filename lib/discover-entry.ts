export type DiscoverSource = 'nav' | 'tarifs' | 'mission-store' | 'profile-store' | 'alma-store' | 'alma-profile' | 'paul-graham' | 'collaborateurs-ia' | 'academy' | 'direct'

const SOURCES = new Set<DiscoverSource>(['nav', 'tarifs', 'mission-store', 'profile-store', 'alma-store', 'alma-profile', 'paul-graham', 'collaborateurs-ia', 'academy', 'direct'])

export function parseDiscoverSource(value: string | null): DiscoverSource {
  return value && SOURCES.has(value as DiscoverSource) ? value as DiscoverSource : 'direct'
}
