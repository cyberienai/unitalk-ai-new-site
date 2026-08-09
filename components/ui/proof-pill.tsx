type ProofPillProps = {
  children: React.ReactNode
  /** Use on dark backgrounds (e.g. the "Pourquoi Unitalk" hero). Defaults to the light/cream variant. */
  dark?: boolean
  className?: string
}

/**
 * Shared proof chip used at the top of page heros (trial / reassurance line).
 * Same shape everywhere — a dot accent + mono uppercase label inside a soft magenta pill.
 */
export function ProofPill({ children, dark = false, className = '' }: ProofPillProps) {
  const tone = dark
    ? 'border-[#E8548C]/40 bg-[#E8548C]/10 text-[#F4A9C6]'
    : 'border-[#D10E63]/25 bg-[#D10E63]/[0.07] text-[#B00C54]'
  const dot = dark ? 'bg-[#E8548C]' : 'bg-[#D10E63]'

  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 ${tone} ${className}`}>
      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} aria-hidden />
      <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em]">{children}</span>
    </span>
  )
}
