'use client'

import Link from 'next/link'
import { startTransition, useState } from 'react'
import { ChevronDown, Minus, Plus } from 'lucide-react'
import { persistPricingDraft } from '@/app/actions/pricing'
import {
  configurationBreakdownAt,
  configurationTotalAt,
  unitalkPricing,
  type AiCapacityId,
} from '@/lib/unitalk-pricing'
import { usePricingDraft } from './pricing-draft-context'

const CURRENT_DATE = new Date('2026-08-13T12:00:00Z')
const PERIODS = [
  ['Jusqu’au 21 décembre 2026', new Date('2026-12-21T12:00:00Z')],
  ['Du 22 au 31 décembre 2026', new Date('2026-12-22T12:00:00Z')],
  ['À partir du 1 janvier 2027', new Date('2027-01-01T12:00:00Z')],
] as const

export function PricingConfigurator() {
  const { draft, setCollaborators, setCapacity, setCoCreators } = usePricingDraft()
  const { collaborators, capacity, coCreators } = draft
  const [pending, setPending] = useState(false)
  const breakdown = configurationBreakdownAt(collaborators, capacity, coCreators, CURRENT_DATE)
  const capacityConfig = unitalkPricing.aiCapacity[capacity]

  function submit() {
    setPending(true)
    startTransition(() => persistPricingDraft({ collaborators, capacity, coCreators }).catch(() => setPending(false)))
  }

  return (
    <div id="configurateur" className="grid gap-6 lg:grid-cols-[0.96fr_1.04fr] lg:gap-8">
      <div className="rounded-[18px] border border-[#DED6C8] bg-[#FAF8F3] p-5 sm:p-6">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#B00C54]">Votre configuration</p>
        <ConfigRow title="Collaborateurs IA" description="Une identité durable, avec des profils métier illimités">
          <Counter value={collaborators} min={unitalkPricing.aiCollaborator.min} max={unitalkPricing.aiCollaborator.max} onChange={setCollaborators} removeLabel="Retirer un Collaborateur IA" addLabel="Ajouter un Collaborateur IA" noun="Collaborateurs IA" />
        </ConfigRow>

        <fieldset className="border-t border-[#DED6C8] py-4">
          <legend className="text-[15px] font-semibold">Capacité par Collaborateur IA</legend>
          <div role="radiogroup" aria-label="Capacité par Collaborateur IA" className="mt-3 grid gap-2 sm:grid-cols-2">
            {(Object.entries(unitalkPricing.aiCapacity) as [AiCapacityId, (typeof unitalkPricing.aiCapacity)[AiCapacityId]][]).map(([id, option]) => {
              const selected = capacity === id
              const tokens = option.tokens ? `${option.tokens / 1_000_000} M / mois` : 'Vos clés'
              const promotion = 'freeUntil' in option ? `Offerte jusqu’au ${formatShortDate(option.freeUntil)}` : undefined
              return (
                <label key={id} className={`cursor-pointer rounded-2xl border p-3 outline-none transition-colors focus-within:ring-2 focus-within:ring-[#D10E63] ${selected ? 'border-[#D10E63] bg-[#FCEBF2]' : 'border-[#DED6C8] bg-white hover:border-[#D10E63]/40'}`}>
                  <span className="flex items-start gap-2.5">
                    <input type="radio" name="capacity" value={id} checked={selected} onChange={() => setCapacity(id)} className="mt-1 accent-[#D10E63]" />
                    <span><strong className="block text-sm">{option.label}</strong><span className="mt-0.5 block text-xs text-[#6E665A]">{tokens}</span><span className="sr-only">{option.monthlyPrice} euros par mois. {promotion ?? ''}</span></span>
                  </span>
                </label>
              )
            })}
          </div>
          <p className="mt-3 text-xs text-[#6E665A]">Appliquée à {collaborators} Collaborateur{collaborators > 1 ? 's' : ''} IA.</p>
          {capacity === 'byok' && <p className="mt-1 text-xs font-semibold text-[#4E483F]">Frais du fournisseur facturés séparément.</p>}
        </fieldset>

        <ConfigRow title="Co-créateurs IA" description="Formalisation et publication de profils, compétences, missions et applications métier" muted={coCreators === 0}>
          <Counter value={coCreators} min={unitalkPricing.aiCocreator.min} max={unitalkPricing.aiCocreator.max} onChange={setCoCreators} removeLabel="Retirer un Co-créateur IA" addLabel="Ajouter un Co-créateur IA" noun="Co-créateurs IA" />
          <Link href="/co-createur-ia" className="mt-3 inline-flex text-xs font-bold text-[#B00C54] underline-offset-4 hover:underline">Découvrir la formation →</Link>
        </ConfigRow>
      </div>

      <EstimateCard collaborators={collaborators} capacity={capacity} coCreators={coCreators} breakdown={breakdown} capacityLabel={capacityConfig.label} pending={pending} onSubmit={submit} />
    </div>
  )
}

function EstimateCard({ collaborators, capacity, coCreators, breakdown, capacityLabel, pending, onSubmit }: { collaborators: number; capacity: AiCapacityId; coCreators: number; breakdown: ReturnType<typeof configurationBreakdownAt>; capacityLabel: string; pending: boolean; onSubmit: () => void }) {
  return (
    <aside aria-label="Estimation mensuelle" className="rounded-[18px] border border-[#DED6C8] bg-[#FAF8F3] p-5 shadow-[0_16px_45px_-38px_rgba(28,26,23,.45)] sm:p-6">
      <div className="flex items-start justify-between gap-4 border-b border-[#DED6C8] pb-4">
        <div><p className="font-semibold">Unitalk</p><h2 className="mt-1 text-xl font-semibold">Estimation mensuelle</h2><p className="mt-1 text-xs text-[#6E665A]">Mise à jour selon votre configuration</p></div>
        <span className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#B00C54]">Simulation</span>
      </div>

      <dl className="py-3 text-[12px]">
        <PriceLine label="Organisation Unitalk" detail="1 × 50 €" value={breakdown.organizationBase} />
        {breakdown.organizationDiscount > 0 && <PriceLine label="Offre Organisation · jusqu’au 21/12/2026" value={-breakdown.organizationDiscount} discount />}
        <PriceLine label="Collaborateur IA" detail={`${collaborators} × 49 €`} value={breakdown.collaboratorsBase} />
        <PriceLine label={`Capacité ${capacityLabel}`} detail={`${collaborators} × ${unitalkPricing.aiCapacity[capacity].monthlyPrice} €`} value={breakdown.capacityBase} />
        {breakdown.capacityDiscount > 0 && <PriceLine label="Offre Capacité · jusqu’au 31/12/2026" value={-breakdown.capacityDiscount} discount />}
        {coCreators > 0 && <PriceLine label="Co-créateur IA" detail={`${coCreators} × 50 €`} value={breakdown.coCreatorsBase} />}
      </dl>

      <dl className="border-t border-[#DED6C8] pt-3 text-[12px]">
        <TotalLine label="Sous-total avant promotions" value={breakdown.subtotal} />
        <TotalLine label="Promotions" value={-breakdown.promotions} />
        <div className="mt-3 flex items-end justify-between gap-4 border-t border-[#1C1A17] pt-3"><dt><strong className="block text-sm">Après l’essai</strong><span className="text-[11px] text-[#6E665A]">Jusqu’au 21 décembre 2026</span></dt><dd aria-live="polite" aria-atomic="true" className="text-2xl font-semibold tracking-[-0.03em]">{breakdown.total} €<span className="text-xs font-normal text-[#6E665A]">/mois</span></dd></div>
        <div className="mt-3 flex justify-between rounded-xl bg-[#F3EFE6] px-3 py-2"><dt><strong>Aujourd’hui</strong><span className="ml-2 text-[11px] text-[#6E665A]">7 jours d’essai · Aucune carte bancaire</span></dt><dd className="font-semibold">0 €</dd></div>
        <p className="mt-2 text-[11px] text-[#6E665A]">Jusqu’à 1 million de tokens IA pendant l’essai</p>
      </dl>

      <button type="button" onClick={onSubmit} disabled={pending} className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#D10E63] px-6 text-sm font-bold text-white outline-none transition-colors hover:bg-[#B00C54] focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 disabled:opacity-60">{pending ? 'Préparation…' : 'Commencer avec cette configuration →'}</button>
      <p className="mt-2 text-center text-[11px] text-[#6E665A]">Aucune carte bancaire pendant l’essai.</p>

      <details className="group mt-3 border-t border-[#DED6C8] pt-3">
        <summary className="flex cursor-pointer list-none items-center justify-between text-xs font-bold outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]"><span>Voir l’évolution du prix</span><ChevronDown className="size-4 transition-transform group-open:rotate-180" /></summary>
        <dl className="mt-3 space-y-2 text-[11px]">{PERIODS.map(([label, date]) => <div key={label} className="flex justify-between gap-3"><dt>{label}</dt><dd className="font-semibold">{configurationTotalAt(collaborators, capacity, coCreators, date)} €/mois</dd></div>)}</dl>
        <p className="mt-3 text-[11px] leading-5 text-[#6E665A]">Ces montants reflètent la fin progressive des offres Organisation et Capacité.</p>
      </details>
    </aside>
  )
}

function ConfigRow({ title, description, children, muted = false }: { title: string; description: string; children: React.ReactNode; muted?: boolean }) {
  return <section className={`border-t border-[#DED6C8] py-4 first:border-t-0 ${muted ? 'opacity-75' : ''}`}><h2 className="text-[15px] font-semibold">{title}</h2><p className="mt-1 max-w-lg text-xs leading-5 text-[#6E665A]">{description}</p><div className="mt-3">{children}</div></section>
}

function Counter({ value, min, max, onChange, removeLabel, addLabel, noun }: { value: number; min: number; max: number; onChange: (value: number) => void; removeLabel: string; addLabel: string; noun: string }) {
  return <div className="inline-flex items-center rounded-full border border-[#DED6C8] bg-white p-1"><button type="button" aria-label={removeLabel} disabled={value <= min} onClick={() => onChange(Math.max(min, value - 1))} className="flex size-9 items-center justify-center rounded-full outline-none hover:bg-[#F3EFE6] focus-visible:ring-2 focus-visible:ring-[#D10E63] disabled:opacity-30"><Minus className="size-4" /></button><output aria-label={`${noun} : ${value}`} aria-live="polite" className="min-w-12 text-center text-sm font-bold">{value}</output><button type="button" aria-label={addLabel} disabled={value >= max} onClick={() => onChange(Math.min(max, value + 1))} className="flex size-9 items-center justify-center rounded-full outline-none hover:bg-[#F3EFE6] focus-visible:ring-2 focus-visible:ring-[#D10E63] disabled:opacity-30"><Plus className="size-4" /></button></div>
}

function PriceLine({ label, detail, value, discount = false }: { label: string; detail?: string; value: number; discount?: boolean }) {
  return <div className="grid grid-cols-[1fr_auto] gap-x-3 py-1.5"><dt className={discount ? 'text-[#B00C54]' : ''}>{label}{detail && <span className="ml-1 text-[10px] text-[#6E665A]">{detail}</span>}</dt><dd className={`font-semibold ${discount ? 'text-[#B00C54]' : ''}`}>{formatEuro(value)}</dd></div>
}

function TotalLine({ label, value }: { label: string; value: number }) {
  return <div className="flex justify-between gap-3 py-1"><dt>{label}</dt><dd className="font-semibold">{formatEuro(value)}</dd></div>
}

function formatEuro(value: number) {
  return `${value < 0 ? '−' : ''}${Math.abs(value)} €`
}

function formatShortDate(iso: string) {
  const [year, month, day] = iso.split('-')
  return `${day}/${month}/${year}`
}

export function MultiCollaboratorConfigurator() {
  return null
}
