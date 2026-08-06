import Image from 'next/image'

/**
 * Inline Alma avatar chip, sized to the surrounding text (1.05em by default).
 * Use it right before the "Alma" name wherever Alma is presented as a named
 * presence (hero lead, accroche titles, the voice-advisor pricing option…),
 * so the face always travels with the name.
 */
export function AlmaFace({
  em = 1.05,
  className = '',
}: {
  em?: number
  className?: string
}) {
  return (
    <Image
      src="/alma-avatar.png"
      alt=""
      width={28}
      height={28}
      aria-hidden="true"
      className={`mr-[0.3em] inline-block rounded-full object-cover align-[-0.2em] ring-1 ring-[#D10E63]/25 ${className}`}
      style={{ height: `${em}em`, width: `${em}em` }}
    />
  )
}
