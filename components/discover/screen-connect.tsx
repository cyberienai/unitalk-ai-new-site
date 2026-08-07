'use client'

import { ArrowRight, Eye, Zap, Lock, ShieldCheck } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { getMission } from './types'
import { TOOL_TYPE_ACCESS } from './tool-access'

export function ScreenConnect({
  lang,
  missionSlug,
  onContinue,
}: {
  lang: Lang
  missionSlug: string
  onContinue: () => void
}) {
  const t = COPY[lang]
  const m = getMission(missionSlug)

  // m.tools holds tool *types* for the mission's profile (e.g. Tableur, ERP,
  // Email). We present each as a category of application with the data it would
  // read and the actions allowed — types, not yet a specific connected product.
  const apps = m.tools
    .map((label) => TOOL_TYPE_ACCESS[label])
    .filter((x): x is NonNullable<typeof x> => Boolean(x))
    .slice(0, 4)

  return (
    <div>
      <p className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-[#D10E63]">{t.kicker}</p>
      <h1 className="mt-3 text-balance font-sf text-[clamp(1.5rem,3vw,2.1rem)] font-semibold leading-tight tracking-[-0.03em] text-[#1C1A17]">
        {t.title}
      </h1>
      <p className="mt-2.5 max-w-xl text-pretty text-[15px] leading-relaxed text-[#4E483F]">{t.lead}</p>

      {/* Per-app authorization: exactly what the Collaborateur can read and do. */}
      <div className="mt-6 flex flex-col gap-4">
        {apps.length > 0 ? (
          apps.map((a) => (
            <div key={a.name.en} className="rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-5">
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-sf text-base font-bold text-[#1C1A17]">{a.name[lang]}</p>
                <span className="rounded-full bg-[#EBE4D6] px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8A8175]">
                  {t.toolType}
                </span>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <AccessBlock icon={Eye} label={t.dataRead}>
                  {a.dataAccessed.map((d) => (
                    <li key={d[lang]}>{d[lang]}</li>
                  ))}
                </AccessBlock>
                <AccessBlock icon={Zap} label={t.actions}>
                  {a.actions.map((d) => (
                    <li key={d[lang]}>{d[lang]}</li>
                  ))}
                </AccessBlock>
              </div>

              <p className="mt-4 flex items-start gap-2 border-t border-[#EBE4D6] pt-3 text-[13px] leading-relaxed text-[#5A544A]">
                <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#8A8175]" />
                {a.connection[lang]}
              </p>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-5">
            <p className="text-sm leading-relaxed text-[#3B362F]">{t.appsEmpty}</p>
          </div>
        )}
      </div>

      {/* Limits & human validation */}
      <div className="mt-4 flex items-start gap-3 rounded-2xl border border-[#E4DDCE] bg-[#F3EFE6] p-4">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#D10E63]" />
        <div>
          <p className="text-sm font-semibold text-[#1C1A17]">{t.limitsTitle}</p>
          <p className="mt-1 text-sm leading-relaxed text-[#3B362F]">{m.validation[lang]}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={onContinue}
        className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#D10E63] px-6 py-3.5 text-sm font-bold text-[#FBF9F3] transition-colors hover:bg-[#E51872]"
      >
        {t.cta}
        <ArrowRight className="h-4 w-4" />
      </button>

      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
        {t.reassurance.map((r) => (
          <li key={r} className="text-xs font-medium text-[#5F594F]">
            {r}
          </li>
        ))}
      </ul>
    </div>
  )
}

function AccessBlock({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  children: React.ReactNode
}) {
  return (
    <div>
      <p className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#8A8175]">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </p>
      <ul className="mt-2 flex list-disc flex-col gap-1 pl-4 text-sm leading-relaxed text-[#3B362F] marker:text-[#D10E63]">
        {children}
      </ul>
    </div>
  )
}

const COPY = {
  fr: {
    kicker: 'Étape 5 · Accès',
    title: 'Autorisez précisément ce que votre Collaborateur IA peut faire.',
    lead: 'Chaque application est reliée par une connexion sécurisée. Vous voyez exactement les données consultées et les actions permises, et vous gardez la main sur chaque validation sensible.',
    dataRead: 'Données consultées',
    actions: 'Actions autorisées',
    toolType: 'Type d’outil',
    connectionFallback: 'Connexion sécurisée, révocable à tout moment depuis votre Workspace.',
    limitsTitle: 'Limites et validations humaines',
    appsEmpty: 'Aucun accès externe n’est requis à cette étape. Votre Collaborateur IA travaille à partir des sources publiques et du contexte de votre entreprise.',
    cta: 'Valider les accès',
    reassurance: ['Essai gratuit', 'Hébergé en France', 'Conforme au RGPD', 'Accès révocables'],
  },
  en: {
    kicker: 'Step 5 · Access',
    title: 'Authorize exactly what your AI Collaborator can do.',
    lead: 'Each application is linked through a secure connection. You see exactly which data is read and which actions are allowed, and you keep control over every sensitive approval.',
    dataRead: 'Data accessed',
    actions: 'Authorized actions',
    toolType: 'Tool type',
    connectionFallback: 'Secure connection, revocable at any time from your Workspace.',
    limitsTitle: 'Limits and human approvals',
    appsEmpty: 'No external access is required at this step. Your AI Collaborator works from public sources and your company context.',
    cta: 'Approve access',
    reassurance: ['Free trial', 'Hosted in France', 'GDPR compliant', 'Revocable access'],
  },
} as const
