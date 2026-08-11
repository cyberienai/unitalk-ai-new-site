'use client'

import { useMemo } from 'react'
import { ArrowRight, Check, ShieldCheck, Sparkles, User } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import type { MissionInfo } from './types'

// Step 3 — AI Collaborator. Always the creation of the company's FIRST
// Collaborator (never an existing-collaborator case). A compact card recaps the
// mission, the recommended job profile and the human-approval rule; then the
// user names the Collaborator. The primary CTA personalizes live with the name.
// No models, VPS, apps, permissions or technical connections are shown.
export function ScreenCollaborateur({
  lang,
  mission,
  profile,
  name,
  onName,
  onContinue,
}: {
  lang: Lang
  mission: MissionInfo
  profile: { fr: string; en: string }
  name: string
  onName: (name: string) => void
  onContinue: () => void
}) {
  const t = COPY[lang]
  const trimmed = name.trim()

  const initials = useMemo(() => {
    if (!trimmed) return ''
    return trimmed
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w.charAt(0).toUpperCase())
      .join('')
  }, [trimmed])

  return (
    <div className="mx-auto w-full max-w-[880px]">
      <p className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-[#D10E63]">{t.kicker}</p>
      <h1 className="mt-3 text-balance font-sf text-[clamp(1.6rem,3.4vw,2.3rem)] font-semibold leading-tight tracking-[-0.03em] text-[#1C1A17]">
        {t.title}
      </h1>
      <p className="mt-3 max-w-xl text-pretty text-[15px] leading-relaxed text-[#4E483F]">{t.subtitle}</p>

      <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)]">
        {/* Compact preparation card */}
        <div className="rounded-3xl border border-[#EAE3D5] bg-white p-6 shadow-[0_1px_0_rgba(255,255,255,0.7)_inset,0_28px_50px_-34px_rgba(28,26,23,0.4)] sm:p-7">
          <p className="inline-flex items-center gap-1.5 rounded-full bg-[#D10E63]/10 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#B00C54]">
            <Sparkles className="h-3.5 w-3.5" />
            {t.prepares}
          </p>

          <dl className="mt-5 flex flex-col divide-y divide-[#EFE8DA]">
            <div className="pb-4">
              <dt className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#8A8175]">{t.mission}</dt>
              <dd className="mt-1.5 font-sf text-[15px] font-bold leading-snug text-[#1C1A17]">{mission.title}</dd>
              <dd className="mt-1 text-[13px] leading-relaxed text-[#5A544A]">{mission.result}</dd>
            </div>
            <div className="py-4">
              <dt className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#8A8175]">{t.profile}</dt>
              <dd className="mt-1.5 flex items-center gap-2 text-[14px] font-semibold text-[#1C1A17]">
                <Check className="h-4 w-4 shrink-0 text-[#D10E63]" strokeWidth={2.5} />
                {profile[lang]}
              </dd>
            </div>
            <div className="pt-4">
              <dt className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#8A8175]">
                {t.validation}
              </dt>
              <dd className="mt-1.5 flex items-center gap-2 text-[14px] leading-relaxed text-[#3B362F]">
                <ShieldCheck className="h-4 w-4 shrink-0 text-[#2E9E5B]" strokeWidth={2.5} />
                {mission.validation}
              </dd>
            </div>
          </dl>
        </div>

        {/* Naming + identity preview */}
        <div className="rounded-3xl border border-[#EAE3D5] bg-[#FBF9F3] p-6 shadow-[0_1px_0_rgba(255,255,255,0.7)_inset,0_28px_50px_-34px_rgba(28,26,23,0.4)] sm:p-7">
          <div className="flex items-center gap-3.5">
            <span
              aria-hidden="true"
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full border font-sf text-lg font-bold transition-colors ${
                trimmed ? 'border-[#E4DDCE] bg-white text-[#B00C54]' : 'border-[#E4DDCE] bg-[#F3EDE1] text-[#B4AC9E]'
              }`}
            >
              {trimmed ? initials : <User className="h-6 w-6" strokeWidth={1.75} />}
            </span>
            <div className="min-w-0 leading-tight">
              <p className="truncate font-sf text-[16px] font-bold text-[#1C1A17]">
                {trimmed || t.placeholderIdentity}
              </p>
              <p className="text-[13px] text-[#8A8175]">
                {t.profileTag} {profile[lang]}
              </p>
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="collab-name" className="block text-[14px] font-semibold text-[#1C1A17]">
              {t.nameQuestion}
            </label>
            <input
              id="collab-name"
              type="text"
              autoComplete="off"
              value={name}
              onChange={(e) => onName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && trimmed && !e.nativeEvent.isComposing) onContinue()
              }}
              placeholder={t.namePlaceholder}
              className="mt-2 w-full rounded-xl border border-[#E4DDCE] bg-white px-4 py-3 text-[15px] font-medium text-[#1C1A17] outline-none transition-colors placeholder:font-normal placeholder:text-[#B4AC9E] focus:border-[#D10E63]/60 focus:ring-4 focus:ring-[#D10E63]/10"
            />
            <p className="mt-2 text-[12px] leading-relaxed text-[#6E665A]">{t.nameHint}</p>
          </div>

          <button
            type="button"
            onClick={onContinue}
            disabled={!trimmed}
            className="group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#D10E63] px-6 py-3.5 text-sm font-bold text-[#FBF9F3] transition-colors hover:bg-[#E51872] disabled:cursor-not-allowed disabled:bg-[#E4DDCE] disabled:text-[#9A9184]"
          >
            {trimmed ? `${t.prepare} ${trimmed}` : t.prepareEmpty}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-enabled:group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  )
}

const COPY = {
  fr: {
    kicker: 'Collaborateur IA',
    title: 'Alma prépare votre premier Collaborateur IA.',
    subtitle:
      'Elle lui apporte le profil métier et les savoir-faire nécessaires pour accomplir cette mission.',
    prepares: 'Préparation en cours',
    mission: 'Mission',
    profile: 'Profil métier recommandé',
    validation: 'Validation humaine',
    profileTag: 'Profil',
    placeholderIdentity: 'Votre Collaborateur IA',
    nameQuestion: 'Comment souhaitez-vous l’appeler ?',
    namePlaceholder: 'Ex. Lucas',
    nameHint: 'Un prénom rend la collaboration plus naturelle au quotidien.',
    prepare: 'Préparer',
    prepareEmpty: 'Choisissez un prénom pour continuer',
  },
  en: {
    kicker: 'AI Collaborator',
    title: 'Alma is preparing your first AI Collaborator.',
    subtitle: 'She gives it the job profile and know-how needed to carry out this mission.',
    prepares: 'Preparing',
    mission: 'Mission',
    profile: 'Recommended job profile',
    validation: 'Human approval',
    profileTag: 'Profile',
    placeholderIdentity: 'Your AI Collaborator',
    nameQuestion: 'What would you like to call it?',
    namePlaceholder: 'e.g. Lucas',
    nameHint: 'A first name makes the day-to-day collaboration feel more natural.',
    prepare: 'Prepare',
    prepareEmpty: 'Choose a first name to continue',
  },
} as const
