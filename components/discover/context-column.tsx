'use client'

import { Check } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { getMission, type FlowState } from './types'

function AlmaHead({ className = 'h-10 w-10' }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/alma-avatar.png"
      alt="Alma"
      className={`${className} rounded-full object-cover ring-1 ring-[#E4DDCE]`}
    />
  )
}

/** The mission, kept visible while Alma works the later steps. */
function MissionRecap({
  lang,
  missionSlug,
  heading,
  note,
}: {
  lang: Lang
  missionSlug: string
  heading: string
  note?: string
}) {
  const m = getMission(missionSlug)
  const rows = [
    { label: lang === 'fr' ? 'Résultat attendu' : 'Expected result', value: m.result[lang] },
    { label: lang === 'fr' ? 'Rythme' : 'Cadence', value: m.cadence[lang] || m.deliveryTime[lang] },
    { label: lang === 'fr' ? 'Validation' : 'Approval', value: m.validation[lang] },
  ]
  return (
    <div className="lg:sticky lg:top-8">
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#8A8175]">{heading}</p>
      <h3 className="mt-3 font-sf text-base font-bold leading-snug tracking-[-0.01em] text-[#1C1A17]">
        {m.title[lang]}
      </h3>
      <dl className="mt-4 flex flex-col gap-3 border-t border-[#EBE4D6] pt-4">
        {rows.map((r) => (
          <div key={r.label}>
            <dt className="text-[11px] font-medium text-[#8A8175]">{r.label}</dt>
            <dd className="mt-0.5 text-[13px] leading-relaxed text-[#3B362F]">{r.value}</dd>
          </div>
        ))}
      </dl>
      {note && (
        <p className="mt-4 border-t border-[#EBE4D6] pt-4 text-[12px] leading-relaxed text-[#8A8175]">{note}</p>
      )}
    </div>
  )
}

/** Alma's recommendation summary, shown on the assignment step. */
function ProposalSummary({ lang, missionSlug }: { lang: Lang; missionSlug: string }) {
  const mission = getMission(missionSlug)
  return (
    <div className="lg:sticky lg:top-8">
      <div className="flex items-center gap-3">
        <AlmaHead className="h-9 w-9" />
        <div className="leading-tight">
          <p className="text-sm font-bold text-[#1C1A17]">Alma</p>
          <p className="text-[12px] text-[#8A8175]">
            {lang === 'fr' ? 'Ce qu’il faut pour l’accomplir' : 'What it takes to deliver'}
          </p>
        </div>
      </div>
      <dl className="mt-5 flex flex-col gap-4 border-t border-[#EBE4D6] pt-4 text-sm">
        <div>
          <dt className="text-xs font-medium text-[#8A8175]">{lang === 'fr' ? 'Profil métier' : 'Job profile'}</dt>
          <dd className="mt-0.5 font-semibold text-[#1C1A17]">{mission.profile[lang]}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-[#8A8175]">{lang === 'fr' ? 'Compétences' : 'Skills'}</dt>
          <dd className="mt-1.5 flex flex-col gap-1.5">
            {mission.skills.slice(0, 4).map((s) => (
              <span key={s[lang]} className="flex items-center gap-2 text-[13px] text-[#3B362F]">
                <Check className="h-3.5 w-3.5 shrink-0 text-[#D10E63]" strokeWidth={2.5} />
                {s[lang]}
              </span>
            ))}
          </dd>
        </div>
      </dl>
      <p className="mt-4 border-t border-[#EBE4D6] pt-4 text-[12px] leading-relaxed text-[#8A8175]">
        {lang === 'fr'
          ? 'Le profil métier apporte une responsabilité durable. Les compétences ajoutent ce qu’exige cette mission. Profils métier illimités.'
          : 'The job profile brings a durable responsibility. Skills add what this mission requires. Unlimited job profiles.'}
      </p>
    </div>
  )
}

export function ContextColumn({ state, lang }: { state: FlowState; lang: Lang }) {
  const contextNote =
    lang === 'fr'
      ? 'Le contexte de votre entreprise n’est pas encore appliqué.'
      : 'Your company context is not applied yet.'
  return (
    <div className="flex flex-col gap-4">
      {state.step === 'entreprise' && (
        <MissionRecap
          lang={lang}
          missionSlug={state.missionSlug}
          heading={lang === 'fr' ? 'Mission à adapter' : 'Mission to adapt'}
          note={state.contextProgress > 0 ? undefined : contextNote}
        />
      )}
      {state.step === 'affectation' && <ProposalSummary lang={lang} missionSlug={state.missionSlug} />}
      {(state.step === 'acces' || state.step === 'workspace') && (
        <MissionRecap
          lang={lang}
          missionSlug={state.missionSlug}
          heading={lang === 'fr' ? 'Mission définie' : 'Mission defined'}
        />
      )}
    </div>
  )
}

export { AlmaHead }
