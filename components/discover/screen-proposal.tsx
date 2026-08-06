'use client'

import { Check, ArrowRight, ShieldCheck } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { useAlma } from '@/lib/alma-context'
import { getMission } from './types'

export function ScreenProposal({
  lang,
  missionSlug,
  onContinue,
}: {
  lang: Lang
  missionSlug: string
  onContinue: () => void
}) {
  const { openAlma } = useAlma()
  const t = COPY[lang]
  const m = getMission(missionSlug)

  const contextItems =
    lang === 'fr'
      ? ['Offre comprise', 'Clientèle cible confirmée', 'Critères de qualification validés', 'Vocabulaire métier intégré']
      : ['Offer understood', 'Target audience confirmed', 'Qualification criteria validated', 'Business vocabulary integrated']

  return (
    <div>
      <p className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-[#D10E63]">{t.kicker}</p>
      <h1 className="mt-4 text-balance font-sf text-[clamp(1.7rem,3.6vw,2.6rem)] font-semibold leading-tight tracking-[-0.03em] text-[#1C1A17]">
        {t.title}
      </h1>

      {/* Collaborator identity (no fixed name before recruitment) */}
      <div className="mt-7 flex items-center gap-3 rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-4">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1C1A17] text-lg font-bold text-[#FBF9F3]">
          IA
        </span>
        <div>
          <p className="font-sf text-base font-bold text-[#1C1A17]">{t.collaborator}</p>
          <p className="text-sm text-[#5A544A]">
            {t.readyWith} <span className="font-semibold text-[#1C1A17]">{m.profile[lang]}</span>.
          </p>
        </div>
      </div>

      {/* Proposal body */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Block title={t.firstMission}>
          <p className="font-sf text-lg font-bold leading-snug text-[#1C1A17]">{m.title[lang]}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-[#5A544A]">{m.result[lang]}</p>
        </Block>

        <Block title={t.skills}>
          <ul className="flex flex-col gap-2">
            {m.skills.map((s) => (
              <li key={s[lang]} className="flex items-center gap-2 text-sm text-[#3B362F]">
                <Check className="h-4 w-4 shrink-0 text-[#D10E63]" strokeWidth={2.5} />
                {s[lang]}
              </li>
            ))}
          </ul>
        </Block>

        <Block title={t.context}>
          <ul className="flex flex-col gap-2">
            {contextItems.map((c) => (
              <li key={c} className="flex items-center gap-2 text-sm text-[#3B362F]">
                <Check className="h-4 w-4 shrink-0 text-[#D10E63]" strokeWidth={2.5} />
                {c}
              </li>
            ))}
          </ul>
        </Block>

        <Block title={t.expected}>
          <p className="text-sm leading-relaxed text-[#3B362F]">{m.deliverable[lang]}</p>
        </Block>
      </div>

      {/* Working frame */}
      <div className="mt-4 flex items-start gap-3 rounded-2xl border border-[#E4DDCE] bg-[#F3EFE6] p-4">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#D10E63]" />
        <p className="text-sm leading-relaxed text-[#3B362F]">{m.validation[lang]}</p>
      </div>

      {/* Actions */}
      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={onContinue}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1C1A17] px-6 py-3.5 text-sm font-bold text-[#FBF9F3] transition-colors hover:bg-[#000]"
        >
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#FBF9F3] text-[10px] font-bold text-[#1C1A17]">
            G
          </span>
          {t.google}
        </button>
        <button
          type="button"
          onClick={openAlma}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#D8D0C2] bg-[#FBF9F3] px-6 py-3.5 text-sm font-semibold text-[#3B362F] transition-colors hover:border-[#D10E63]/40"
        >
          {t.edit}
        </button>
      </div>
      <p className="mt-4 text-[13px] leading-relaxed text-[#8A8175]">{t.micro}</p>
    </div>
  )
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-5">
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#8A8175]">{title}</p>
      <div className="mt-3">{children}</div>
    </div>
  )
}

const COPY = {
  fr: {
    kicker: 'Votre Collaborateur IA est préparé',
    title: 'Voici comment il peut commencer à travailler.',
    collaborator: 'Votre Collaborateur IA',
    readyWith: 'Prêt avec le profil métier',
    firstMission: 'Première mission',
    skills: 'Compétences mobilisées',
    context: 'Contexte disponible',
    expected: 'Résultat attendu',
    google: 'Continuer avec Google',
    edit: 'Modifier avec Alma',
    micro: 'Aucun accès à Gmail, Drive ou Agenda n’est demandé à cette étape.',
  },
  en: {
    kicker: 'Your AI Collaborator is prepared',
    title: 'Here’s how it can start working.',
    collaborator: 'Your AI Collaborator',
    readyWith: 'Ready with the job profile',
    firstMission: 'First mission',
    skills: 'Skills mobilized',
    context: 'Available context',
    expected: 'Expected result',
    google: 'Continue with Google',
    edit: 'Edit with Alma',
    micro: 'No access to Gmail, Drive or Calendar is requested at this step.',
  },
} as const
