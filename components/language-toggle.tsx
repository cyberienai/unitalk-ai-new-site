'use client'

import { useLanguage } from '@/lib/language-context'

// Shared FR/EN toggle — the single source of truth for the language control,
// matching the home top nav exactly (flag + language code, one click to swap).
// Reused across surfaces (home nav, onboarding flow) so the control stays
// visually homogeneous with the brand charter.

function FrenchFlag() {
  return (
    <span aria-hidden="true" className="inline-flex overflow-hidden rounded-sm border border-[#DcD4C4]">
      <span className="h-4 w-[6px] bg-[#0055A4]" />
      <span className="h-4 w-[6px] bg-white" />
      <span className="h-4 w-[6px] bg-[#EF4135]" />
    </span>
  )
}

function UkFlag() {
  return (
    <span aria-hidden="true" className="inline-block h-4 w-[18px] overflow-hidden rounded-sm border border-[#DcD4C4]">
      <svg viewBox="0 0 60 30" className="h-full w-full">
        <clipPath id="uk-clip-toggle">
          <rect width="60" height="30" />
        </clipPath>
        <g clipPath="url(#uk-clip-toggle)">
          <rect width="60" height="30" fill="#012169" />
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" clipPath="url(#uk-clip-toggle)" />
          <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10" />
          <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
        </g>
      </svg>
    </span>
  )
}

export function LanguageToggle({ className = '' }: { className?: string }) {
  const { lang, setLang } = useLanguage()
  const toggleLang = () => setLang(lang === 'fr' ? 'en' : 'fr')
  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}
      className={`inline-flex items-center gap-1.5 rounded-md px-1.5 py-2 text-xs font-medium text-[#1C1A17] outline-none transition-colors hover:text-[#D10E63] focus-visible:ring-2 focus-visible:ring-[#D10E63]/40 ${className}`}
    >
      {lang === 'fr' ? <FrenchFlag /> : <UkFlag />}
      {lang === 'fr' ? 'FR' : 'EN'}
    </button>
  )
}
