'use client'

/**
 * THE UNITALK SIGN SYSTEM — a small, closed family of proprietary marks that
 * replaces generic library icons across the homepage. Everything is built on a
 * 16×16 grid, 1.5px strokes, rounded caps, ONE colour per state, no gradients,
 * no filled coloured squares. Three families only:
 *
 *   1. UnitalkNode  — a radial burst derived from the logo. Denotes a person,
 *                     a Collaborator, an application or a skill; the meaning
 *                     varies by the number of branches, never by a new icon.
 *   2. MissionSeal  — the validation seal: the radial centre + a validation
 *                     stroke. Not a Lucide check.
 *   3. Registre     — the documentary frame used for the competence registry
 *                     (composed in-place from RegistreRow).
 *
 * The fourth family — the mission thread — lives in mission-thread.tsx.
 */

export function UnitalkNode({
  size = 16,
  branches = 8,
  color = 'currentColor',
  center = false,
  strokeWidth = 1.5,
  className = '',
}: {
  size?: number
  branches?: number
  color?: string
  center?: boolean
  strokeWidth?: number
  className?: string
}) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size} className={className} aria-hidden="true">
      {Array.from({ length: branches }).map((_, i) => (
        <g key={i} transform={`rotate(${(i * 360) / branches} 8 8)`}>
          <line x1="8" y1="1.9" x2="8" y2="4.2" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
        </g>
      ))}
      {center && <circle cx="8" cy="8" r="1.7" fill={color} />}
    </svg>
  )
}

/** Validation seal — a ring with a faint radial echo of the logo, closed by a
 *  single validation stroke. Green once a human has validated, magenta while it
 *  is still a pending decision. */
export function MissionSeal({
  size = 20,
  color = '#2E7D4F',
  strokeWidth = 1.6,
  className = '',
}: {
  size?: number
  color?: string
  strokeWidth?: number
  className?: string
}) {
  return (
    <svg viewBox="0 0 20 20" width={size} height={size} className={className} aria-hidden="true">
      <circle cx="10" cy="10" r="8.2" fill="none" stroke={color} strokeWidth={strokeWidth} opacity="0.9" />
      {[0, 90, 180, 270].map((a) => (
        <g key={a} transform={`rotate(${a} 10 10)`}>
          <line x1="10" y1="2.5" x2="10" y2="3.7" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" opacity="0.55" />
        </g>
      ))}
      <path d="M6.7 10.3 L9 12.6 L13.4 7.6" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** A single labelled line of the competence registry. Documentary, not a card. */
export function RegistreRow({
  label,
  value,
  valueClassName = '',
}: {
  label: string
  value: React.ReactNode
  valueClassName?: string
}) {
  return (
    <div className="flex items-baseline gap-4 py-2">
      <span className="w-28 shrink-0 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">{label}</span>
      <span className={`min-w-0 flex-1 text-[13.5px] leading-snug text-[#EFE9DE] ${valueClassName}`}>{value}</span>
    </div>
  )
}
