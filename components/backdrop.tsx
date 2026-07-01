'use client'

/**
 * Ambient background layers, editorial paper style.
 * Everything here is decorative and non-interactive — no neon, no orbs.
 */

/* Hero backdrop: faint ink rule grid fading downward + a single hairline frame */
export function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div
        className="bg-grid absolute inset-0 opacity-70"
        style={{
          maskImage: 'radial-gradient(120% 90% at 50% 0%, #000 30%, transparent 90%)',
          WebkitMaskImage: 'radial-gradient(120% 90% at 50% 0%, #000 30%, transparent 90%)',
        }}
      />
    </div>
  )
}

/* Softer backdrop for content sections — kept as a no-op paper layer so imports stay valid */
export function SectionBackdrop({ withDots = false }: { withDots?: boolean }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {withDots && <div className="bg-dots absolute inset-0 opacity-40" />}
    </div>
  )
}
