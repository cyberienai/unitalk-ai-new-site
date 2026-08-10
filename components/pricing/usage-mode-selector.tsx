'use client'

import type { Lang } from '@/lib/language-context'
import type { UsageMode } from '@/lib/pricing-config'
import { enabledCreditBudgets } from '@/lib/pricing-config'
import { formatEuro } from './format'

const COPY = {
  fr: {
    title: 'Comment souhaitez-vous régler les usages IA ?',
    modes: {
      unitalk_credits: { label: 'Crédits Unitalk', hint: 'À partir de 10 € / mois' },
      byok: { label: 'Mes propres clés API', hint: 'Facturation directe par vos fournisseurs' },
      hybrid: { label: 'Hybride', hint: 'Vos clés + un budget Unitalk' },
    },
    changeable: 'Vous pourrez modifier ce choix à tout moment.',
    creditsTitle: 'Budget mensuel de crédits',
    creditsBody: 'Définissez un budget prépayé et partagé entre tous vos Collaborateurs IA.',
    creditsUnder: 'Vous pourrez modifier ou compléter ce budget depuis votre Workspace.',
    creditsMax: 'Les budgets supérieurs à 500 € sont définis avec Unitalk.',
    byokTitle: 'Vos propres clés API',
    byokBody:
      'Utilisez les comptes modèles déjà souscrits par votre entreprise. Vous serez facturé directement par vos fournisseurs.',
    byokList: [
      'aucun crédit Unitalk consommé pour les appels concernés',
      'mêmes missions, mémoire, compétences et validations',
      'changement de modèle sans recréer le Collaborateur IA',
      'configuration sécurisée après la création du Workspace',
    ],
    byokFooter: 'Vos fournisseurs sont facturés séparément.',
    hybridTitle: 'Mode hybride',
    hybridBody:
      'Utilisez vos clés pour vos modèles habituels et des crédits Unitalk pour la voix, la téléphonie, les modèles ponctuels ou la continuité de service.',
    hybridFooter: 'Les appels réalisés avec vos clés restent facturés directement par vos fournisseurs.',
    budgetLegend: 'Budget mensuel de crédits',
  },
  en: {
    title: 'How would you like to settle AI usage?',
    modes: {
      unitalk_credits: { label: 'Unitalk credits', hint: 'From €10 / month' },
      byok: { label: 'My own API keys', hint: 'Billed directly by your providers' },
      hybrid: { label: 'Hybrid', hint: 'Your keys + a Unitalk budget' },
    },
    changeable: 'You can change this choice at any time.',
    creditsTitle: 'Monthly credit budget',
    creditsBody: 'Set a prepaid budget shared across all your Collaborateurs IA.',
    creditsUnder: 'You can change or top up this budget from your Workspace.',
    creditsMax: 'Budgets above €500 are arranged with Unitalk.',
    byokTitle: 'Your own API keys',
    byokBody:
      'Use the model accounts your company already subscribes to. You will be billed directly by your providers.',
    byokList: [
      'no Unitalk credits consumed for those calls',
      'same missions, memory, skills and validations',
      'switch models without recreating the Collaborateur IA',
      'secure setup after your Workspace is created',
    ],
    byokFooter: 'Your providers are billed separately.',
    hybridTitle: 'Hybrid mode',
    hybridBody:
      'Use your keys for your usual models and Unitalk credits for voice, telephony, occasional models or service continuity.',
    hybridFooter: 'Calls made with your keys are still billed directly by your providers.',
    budgetLegend: 'Monthly credit budget',
  },
} as const

const MODE_ORDER: UsageMode[] = ['unitalk_credits', 'byok', 'hybrid']

function BudgetChips({
  lang,
  selected,
  onSelect,
}: {
  lang: Lang
  selected: number | null
  onSelect: (amount: number) => void
}) {
  const t = COPY[lang]
  return (
    <div
      role="radiogroup"
      aria-label={t.budgetLegend}
      className="flex flex-wrap gap-2"
    >
      {enabledCreditBudgets().map((amount) => {
        const active = selected === amount
        return (
          <button
            key={amount}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onSelect(amount)}
            className={`min-h-11 rounded-xl border px-4 text-[14px] font-semibold tabular-nums outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#D10E63]/40 ${
              active
                ? 'border-[#D10E63] bg-[#D10E63] text-[#FBF9F3]'
                : 'border-[#EAE3D5] bg-white text-[#1C1A17] hover:border-[#D10E63]/50'
            }`}
          >
            {formatEuro(amount, lang)}
          </button>
        )
      })}
    </div>
  )
}

/** Accessible radio group for the consumption mode + progressive disclosure. */
export function UsageModeSelector({
  lang,
  usageMode,
  selectedCreditBudget,
  onModeChange,
  onBudgetChange,
}: {
  lang: Lang
  usageMode: UsageMode | null
  selectedCreditBudget: number | null
  onModeChange: (mode: UsageMode) => void
  onBudgetChange: (amount: number) => void
}) {
  const t = COPY[lang]
  return (
    <section aria-labelledby="usage-mode-title">
      <h3
        id="usage-mode-title"
        className="font-sf text-[22px] font-bold tracking-[-0.01em] leading-snug text-[#1C1A17]"
      >
        {t.title}
      </h3>

      <div role="radiogroup" aria-labelledby="usage-mode-title" className="mt-4 grid gap-2.5">
        {MODE_ORDER.map((mode) => {
          const active = usageMode === mode
          const m = t.modes[mode]
          return (
            <button
              key={mode}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onModeChange(mode)}
              className={`flex min-h-11 items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#D10E63]/40 ${
                active ? 'border-[#D10E63] bg-[#FBF3F7]' : 'border-[#EAE3D5] bg-white hover:border-[#D10E63]/40'
              }`}
            >
              <span className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                    active ? 'border-[#D10E63]' : 'border-[#B7AE9E]'
                  }`}
                >
                  {active && <span className="h-2 w-2 rounded-full bg-[#D10E63]" />}
                </span>
                <span className="text-[14.5px] font-semibold text-[#1C1A17]">{m.label}</span>
              </span>
              <span className="text-[12.5px] text-[#857C6E]">{m.hint}</span>
            </button>
          )
        })}
      </div>

      <p className="mt-2.5 text-[12.5px] text-[#857C6E]">{t.changeable}</p>

      {/* Progressive disclosure: only the selected mode's detail is shown. */}
      {usageMode === 'unitalk_credits' && (
        <div className="mt-4 rounded-2xl border border-[#EAE3D5] bg-[#FBF9F3] p-5">
          <h4 className="font-sf text-[17px] font-bold tracking-[-0.01em] text-[#1C1A17]">{t.creditsTitle}</h4>
          <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#6B6560]">{t.creditsBody}</p>
          <div className="mt-4">
            <BudgetChips lang={lang} selected={selectedCreditBudget} onSelect={onBudgetChange} />
          </div>
          <p className="mt-3 text-[12.5px] text-[#857C6E]">{t.creditsUnder}</p>
          <p className="mt-1 text-[12.5px] text-[#857C6E]">{t.creditsMax}</p>
        </div>
      )}

      {usageMode === 'byok' && (
        <div className="mt-4 rounded-2xl border border-[#EAE3D5] bg-[#FBF9F3] p-5">
          <h4 className="font-sf text-[17px] font-bold tracking-[-0.01em] text-[#1C1A17]">{t.byokTitle}</h4>
          <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#6B6560]">{t.byokBody}</p>
          <ul className="mt-3 grid gap-1.5 text-[13px] text-[#4A453F]">
            {t.byokList.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#B7AE9E]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[12.5px] font-medium text-[#6B6560]">{t.byokFooter}</p>
        </div>
      )}

      {usageMode === 'hybrid' && (
        <div className="mt-4 rounded-2xl border border-[#EAE3D5] bg-[#FBF9F3] p-5">
          <h4 className="font-sf text-[17px] font-bold tracking-[-0.01em] text-[#1C1A17]">{t.hybridTitle}</h4>
          <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#6B6560]">{t.hybridBody}</p>
          <div className="mt-4">
            <BudgetChips lang={lang} selected={selectedCreditBudget} onSelect={onBudgetChange} />
          </div>
          <p className="mt-3 text-[12.5px] text-[#857C6E]">{t.hybridFooter}</p>
        </div>
      )}
    </section>
  )
}
