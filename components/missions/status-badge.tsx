import { STATUS_LABELS, type MissionStatus } from '@/lib/missions-catalog'
import type { Lang } from '@/lib/language-context'

// Availability signal shown on every card and in the preview.
// available = discreet green, on-setup = discreet Unitalk pink, coming-soon = gray.
const STYLES: Record<MissionStatus, string> = {
  available: 'bg-[#E7F4EC] text-[#1C7A47] ring-1 ring-[#1C7A47]/15',
  'on-setup': 'bg-[#FCEAF2] text-[#AD0C53] ring-1 ring-[#D10E63]/15',
  'coming-soon': 'bg-[#EDEAE3] text-[#7A736A] ring-1 ring-[#7A736A]/15',
}

const DOT: Record<MissionStatus, string> = {
  available: 'bg-[#22A06B]',
  'on-setup': 'bg-[#D10E63]',
  'coming-soon': 'bg-[#9A9287]',
}

export function StatusBadge({
  status,
  lang,
  className = '',
}: {
  status: MissionStatus
  lang: Lang
  className?: string
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${STYLES[status]} ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${DOT[status]}`} aria-hidden="true" />
      {STATUS_LABELS[status][lang]}
    </span>
  )
}
