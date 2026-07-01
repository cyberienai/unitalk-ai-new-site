'use client'

/**
 * Ambient animated background layers used across the page.
 * Everything here is decorative and non-interactive.
 */

/* Corner crosshair marks, blueprint style */
function CornerMarks() {
  const mark = (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-white/20">
      <path d="M9 0v18M0 9h18" stroke="currentColor" strokeWidth="1" />
    </svg>
  )
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block">
      <div className="absolute left-4 top-4">{mark}</div>
      <div className="absolute right-4 top-4">{mark}</div>
      <div className="absolute bottom-4 left-4">{mark}</div>
      <div className="absolute bottom-4 right-4">{mark}</div>
    </div>
  )
}

/* Hero backdrop: iridescent orb + drifting aurora + grid fade */
export function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* Grid, fading toward the bottom */}
      <div
        className="bg-grid absolute inset-0 opacity-60"
        style={{ maskImage: 'radial-gradient(120% 80% at 50% 0%, #000 40%, transparent 100%)', WebkitMaskImage: 'radial-gradient(120% 80% at 50% 0%, #000 40%, transparent 100%)' }}
      />

      {/* Drifting aurora blobs */}
      <div className="animate-aurora absolute -right-32 top-10 h-[38rem] w-[38rem] rounded-full bg-[#A075E8]/25 blur-[120px]" />
      <div className="animate-aurora absolute -left-40 top-40 h-[32rem] w-[32rem] rounded-full bg-[#5D9CEC]/20 blur-[120px]" style={{ animationDelay: '-7s' }} />
      <div className="animate-aurora absolute bottom-0 right-1/3 h-[26rem] w-[26rem] rounded-full bg-[#FF0099]/10 blur-[120px]" style={{ animationDelay: '-13s' }} />

      {/* Iridescent orb — echoes the Unitalk logo. Screen blend hides the black,
          keeps only the colored light; positioned so the swirl lands in open space. */}
      <img
        src="/images/aurora-orb.png"
        alt=""
        className="animate-orb absolute right-[-7rem] top-[-4rem] w-[17rem] max-w-none opacity-60 mix-blend-screen sm:right-[-14rem] sm:top-0 sm:w-[36rem] sm:opacity-100 md:right-[-13rem] md:top-[-2rem] lg:right-[-14rem] lg:w-[46rem]"
      />
    </div>
  )
}

/* Softer backdrop for content sections below the fold */
export function SectionBackdrop({ tone = 'purple' as 'purple' | 'blue' | 'pink', withCorners = false }) {
  const color = tone === 'blue' ? '#5D9CEC' : tone === 'pink' ? '#EC5D9C' : '#A075E8'
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="bg-dots absolute inset-0 opacity-40" />
      <div
        className="animate-aurora absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full blur-[130px]"
        style={{ background: `${color}22` }}
      />
      {withCorners && <CornerMarks />}
    </div>
  )
}
