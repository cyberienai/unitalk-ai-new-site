'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, Check, ShieldCheck } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { UnitalkLogo } from '@/components/unitalk-logo'
import { AlmaHead } from './context-column'
import type { MissionInfo } from './types'

export function ScreenCollaborateur({
  lang,
  mission,
  profile,
  name,
  onName,
  onCreated,
}: {
  lang: Lang
  mission: MissionInfo
  profile: { fr: string; en: string }
  name: string
  onName: (name: string) => void
  onCreated: (name: string) => void
}) {
  const t = COPY[lang]
  const router = useRouter()
  const [opening, setOpening] = useState(false)
  const [confirming, setConfirming] = useState(false)
  const displayName = capitalizeName(name)
  const initial = displayName.charAt(0)

  function createCollaborator() {
    if (!displayName || opening) return
    if (!confirming) {
      onCreated(displayName)
      setConfirming(true)
      return
    }
    setOpening(true)
    router.push('/workspace')
  }

  return (
    <div className="grid overflow-hidden rounded-[2rem] border border-[#DED5C5] bg-[#FBF9F3] shadow-[0_30px_80px_-42px_rgba(28,26,23,0.5)] lg:grid-cols-[minmax(16rem,1fr)_minmax(0,2fr)]">
      <aside className="relative flex min-w-0 flex-col overflow-hidden bg-[#211E1A] px-6 py-6 text-white sm:px-8 lg:px-9">
        <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#D10E63]/15 blur-3xl" />
        <div className="relative flex h-full flex-col">
          <div className="flex items-center gap-3">
            <AlmaHead className="h-11 w-11 shrink-0 ring-1 ring-white/15" />
            <div>
              <p className="font-sf text-[15px] font-bold">Alma</p>
              <p className="mt-0.5 text-[12px] text-[#BDB5AC]">{t.almaRole}</p>
            </div>
          </div>

          <p className="mt-8 text-pretty font-sf text-xl font-medium leading-relaxed text-[#F4EFE8]">“{confirming ? t.almaConfirm : t.alma}”</p>

          <div className="mt-8 border-t border-white/10 pt-5">
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#E38AB4]">{t.mission}</p>
            <p className="mt-2 line-clamp-3 font-sf text-[16px] font-semibold leading-relaxed text-white">{mission.title}</p>
          </div>

          <div className="mt-auto pt-7">
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold text-[#E9E2D9]">
              <Check className="h-3.5 w-3.5 text-[#E38AB4]" strokeWidth={3} />
              {t.previousStepsDone}
            </span>
          </div>
        </div>
      </aside>

      <section className="flex min-w-0 items-center justify-center px-6 py-6 sm:px-9 lg:px-10">
        <div className="w-full max-w-md">
          {!confirming ? <>
          <div className="flex justify-center">
            <span
              aria-hidden="true"
              className={`flex h-16 w-16 items-center justify-center rounded-full border-2 font-sf text-2xl font-bold transition-colors ${
                displayName
                  ? 'border-[#D10E63]/55 bg-white text-[#D10E63]'
                  : 'border-[#D8D0C2] bg-[#F3EFE6] text-[#9B9285]'
              }`}
            >
              {initial || <UnitalkLogo size={24} />}
            </span>
          </div>

          <label htmlFor="collab-name" className="mt-4 block text-[13px] font-semibold text-[#1C1A17]">
            {t.firstName}
          </label>
          <input
            id="collab-name"
            autoFocus
            type="text"
            autoComplete="off"
            value={name}
            onChange={(event) => onName(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && displayName && !event.nativeEvent.isComposing) createCollaborator()
            }}
            placeholder={t.namePlaceholder}
            className="mt-3 h-12 w-full rounded-xl border border-[#D8D0C2] bg-white px-4 text-[15px] font-medium text-[#1C1A17] outline-none transition-colors placeholder:font-normal placeholder:text-[#8A8175] focus:border-[#D10E63]/60 focus:ring-4 focus:ring-[#D10E63]/10"
          />
          <p className="mt-2 text-[12px] leading-relaxed text-[#6E665A]">{t.nameHint}</p>

          <button
            type="button"
            onClick={createCollaborator}
            disabled={!displayName || opening}
            className="group mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#D10E63] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#E51872] disabled:cursor-not-allowed disabled:bg-[#E5DED1] disabled:text-[#655E54] disabled:shadow-none"
          >
            {displayName ? `${t.continueWith} ${displayName}` : t.createEmpty}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-enabled:group-hover:translate-x-0.5" />
          </button>
          </> : <TrialConfirmation name={displayName} mission={mission.title} profile={profile[lang]} opening={opening} onBack={() => setConfirming(false)} onOpen={createCollaborator} t={t} />}
        </div>
      </section>
    </div>
  )
}

function capitalizeName(value: string): string {
  const clean = value.trim().replace(/\s+/g, ' ')
  return clean ? clean.charAt(0).toUpperCase() + clean.slice(1) : ''
}

const COPY = {
  fr: {
    alma: 'Donnez-lui un prénom.',
    almaRole: 'Conseillère IA · Unitalk',
    mission: 'Mission',
    previousStepsDone: 'Entreprise confirmée · Mission conservée',
    firstName: 'Prénom',
    namePlaceholder: 'Ex. Lucas',
    nameHint: 'Un prénom rend la collaboration plus naturelle au quotidien.',
    continueWith: 'Continuer avec',
    createEmpty: 'Choisissez un prénom pour continuer',
    opening: 'Ouverture du Workspace…',
    almaConfirm: 'Tout est prêt. Vérifiez avant d’ouvrir le Workspace.',
    readyTitle: (name: string) => `${name} est prêt pour sa première mission.`,
    freeMission: 'Première mission offerte', trial: '7 jours d’essai', noCard: 'Sans carte bancaire',
    apps: 'Applications', appsValue: 'À connecter dans le Workspace avec votre accord',
    approvals: 'Validations humaines', approvalsValue: 'Activées pour les actions sensibles',
    open: 'Activer l’essai et ouvrir le Workspace', back: 'Modifier le prénom',
    consent: 'Rien ne devient payant sans votre accord. Aucune application n’est connectée automatiquement.',
  },
  en: {
    alma: 'Give them a first name.',
    almaRole: 'AI advisor · Unitalk',
    mission: 'Mission',
    previousStepsDone: 'Company confirmed · Mission saved',
    firstName: 'First name',
    namePlaceholder: 'e.g. Lucas',
    nameHint: 'A first name makes day-to-day collaboration feel more natural.',
    continueWith: 'Continue with',
    createEmpty: 'Choose a first name to continue',
    opening: 'Opening the Workspace…',
    almaConfirm: 'Everything is ready. Review it before opening the Workspace.',
    readyTitle: (name: string) => `${name} is ready for the first mission.`,
    freeMission: 'First mission included', trial: '7-day trial', noCard: 'No credit card',
    apps: 'Applications', appsValue: 'Connect them in the Workspace with your approval',
    approvals: 'Human approvals', approvalsValue: 'Enabled for sensitive actions',
    open: 'Activate trial and open Workspace', back: 'Change first name',
    consent: 'Nothing becomes paid without your approval. No application is connected automatically.',
  },
} as const

function TrialConfirmation({ name, mission, profile, opening, onBack, onOpen, t }: { name: string; mission: string; profile: string; opening: boolean; onBack: () => void; onOpen: () => void; t: typeof COPY.fr | typeof COPY.en }) {
  return <div><div className="flex justify-center"><span className="flex size-16 items-center justify-center rounded-full bg-[#D10E63]/10 text-[#B00C54]"><Check className="size-8" strokeWidth={2.5}/></span></div><h2 className="mt-5 text-center font-sf text-[28px] font-semibold leading-tight tracking-[-.04em]">{t.readyTitle(name)}</h2><div className="mt-6 divide-y divide-[#E7E0D2] border-y border-[#E7E0D2]"><Summary label={t.mission} value={mission}/><Summary label={typeof t.firstName === 'string' ? t.firstName : 'Prénom'} value={`${name} · ${profile}`}/><Summary label={t.apps} value={t.appsValue}/><Summary label={t.approvals} value={t.approvalsValue}/></div><div className="mt-5 flex flex-wrap justify-center gap-2">{[t.freeMission,t.trial,t.noCard].map(item=><span key={item} className="rounded-full bg-[#EDE7DA] px-3 py-1.5 text-[11px] font-bold text-[#4E483F]">{item}</span>)}</div><p className="mt-5 flex gap-2 text-[12px] leading-5 text-[#625B50]"><ShieldCheck className="mt-0.5 size-4 shrink-0 text-[#B00C54]"/>{t.consent}</p><button type="button" onClick={onOpen} disabled={opening} className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#D10E63] px-5 text-sm font-bold text-white disabled:opacity-70">{opening?t.opening:t.open}<ArrowRight className="size-4"/></button><button type="button" onClick={onBack} disabled={opening} className="mt-3 inline-flex w-full items-center justify-center gap-1.5 py-2 text-xs font-bold text-[#625B50]"><ArrowLeft className="size-3.5"/>{t.back}</button></div>
}

function Summary({label,value}:{label:string;value:string}){return <div className="grid gap-1 py-3 sm:grid-cols-[7rem_1fr]"><p className="font-mono text-[9px] font-bold uppercase tracking-[.12em] text-[#8A8175]">{label}</p><p className="text-[13px] font-semibold leading-5 text-[#2D2924]">{value}</p></div>}
