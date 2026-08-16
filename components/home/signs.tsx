'use client'

/**
 * Homepage validation seal. This proprietary mark distinguishes a human
 * approval from generic interface check icons.
 */

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
