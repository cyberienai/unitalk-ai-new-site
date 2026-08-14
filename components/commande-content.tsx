'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Check, Minus, Plus, Trash2, Users, Building2 } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { useMyTeam } from '@/lib/my-team-context'
import { ROLE_DETAILS } from '@/lib/collaborators-catalog'
import {
  CONSUMPTION_MODES,
  computeOrder,
  tierForCount,
  formatEuro,
  type ConsumptionModeId,
} from '@/lib/pricing'

const ease = [0.22, 1, 0.36, 1] as const

// Collaborateurs IA proposés à l'ajout rapide (les 6 profils de l'illustration).
const ORDERABLE_SLUGS = ['emma', 'lea', 'arthur', 'hugo', 'nadia', 'ines'] as const

const T = {
  fr: {
    eyebrow: 'Bon de commande',
    title: 'Composez votre équipe',
    subtitle:
      'Ajoutez vos Collaborateurs IA, choisissez leurs profils et votre mode de consommation. Le prix s’ajuste automatiquement.',
    yourTeam: 'Vos Collaborateurs IA',
    empty: 'Votre commande est vide. Ajoutez un premier Collaborateur IA ci-dessous.',
    profilesLabel: 'Profils',
    profilesIncluded: 'Profils inclus, illimités',
    remove: 'Retirer',
    addTitle: 'Ajouter un Collaborateur IA',
    addHint: 'Le prix par Collaborateur IA baisse à mesure que vous en ajoutez.',
    add: 'Ajouter',
    added: 'Ajouté',
    licenseTitle: 'Licence organisation',
    licenseDesc:
      'Un seul abonnement pour tous les membres de votre organisation. Inclus, sans coût par membre.',
    licenseIncluded: 'Inclus',
    consumptionTitle: 'Mode de consommation',
    consumptionHint: 'Comment souhaitez-vous financer l’usage des modèles IA ?',
    summaryTitle: 'Récapitulatif',
    collaboratorsLine: 'Collaborateurs IA',
    unitLine: 'Prix unitaire',
    tierLine: 'Palier',
    consumptionLine: 'Consommation',
    totalLine: 'Total mensuel',
    perMonth: '/ mois',
    quote: 'Sur devis',
    validate: 'Valider ma commande',
    contactSales: 'Parler à un expert',
    trialNote: '7 jours d’essai gratuit, sans carte bancaire.',
    exampleNote: 'Tarifs indicatifs, susceptibles d’évoluer.',
  },
  en: {
    eyebrow: 'Order',
    title: 'Build your team',
    subtitle:
      'Add your AI Collaborators, choose their profiles and your consumption mode. The price adjusts automatically.',
    yourTeam: 'Your AI Collaborators',
    empty: 'Your order is empty. Add your first AI Collaborator below.',
    profilesLabel: 'Profiles',
    profilesIncluded: 'Profiles included, unlimited',
    remove: 'Remove',
    addTitle: 'Add an AI Collaborator',
    addHint: 'The price per AI Collaborator drops as you add more.',
    add: 'Add',
    added: 'Added',
    licenseTitle: 'Organization license',
    licenseDesc:
      'A single subscription for every member of your organization. Included, no per-seat cost.',
    licenseIncluded: 'Included',
    consumptionTitle: 'Consumption mode',
    consumptionHint: 'How do you want to fund AI model usage?',
    summaryTitle: 'Summary',
    collaboratorsLine: 'AI Collaborators',
    unitLine: 'Unit price',
    tierLine: 'Tier',
    consumptionLine: 'Consumption',
    totalLine: 'Monthly total',
    perMonth: '/ month',
    quote: 'Custom quote',
    validate: 'Confirm my order',
    contactSales: 'Talk to an expert',
    trialNote: '7-day free trial, no credit card required.',
    exampleNote: 'Indicative pricing, subject to change.',
  },
} as const

export function CommandeContent() {
  const { lang } = useLanguage()
  const t = T[lang]
  const { members, add, remove, has } = useMyTeam()

  const [profileCounts, setProfileCounts] = useState<Record<string, number>>({})
  const [mode, setMode] = useState<ConsumptionModeId>('subscription')

  const count = members.length
  const order = useMemo(() => computeOrder(count, mode), [count, mode])
  const tier = tierForCount(Math.max(1, count))

  const setProfiles = (slug: string, delta: number) => {
    setProfileCounts((prev) => {
      const current = prev[slug] ?? 1
      return { ...prev, [slug]: Math.max(1, current + delta) }
    })
  }

  const quickAdd = ORDERABLE_SLUGS.map((slug) => ROLE_DETAILS[slug]).filter(Boolean)

  return (
    <main className="min-h-screen w-full bg-[#F3EFE6] pb-24 pt-28 sm:pt-32">
      <div className="editorial-shell">
        <header className="max-w-2xl">
          <p className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D10E63]">
            {t.eyebrow}
          </p>
          <h1 className="text-balance font-sf text-4xl font-bold leading-[1.05] tracking-[-0.035em] text-[#1C1A17] sm:text-5xl">
            {t.title}
          </h1>
          <p className="mt-4 text-pretty text-base leading-relaxed text-[#5F594F]">{t.subtitle}</p>
        </header>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Colonne de configuration */}
          <div className="flex flex-col gap-8">
            {/* Collaborateurs IA sélectionnés */}
            <section className="rounded-[1.75rem] border border-[#D8D0C2] bg-[#FBF9F3] p-6 sm:p-8">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-[#D10E63]" />
                <h2 className="font-sf text-xl font-bold tracking-[-0.02em] text-[#1C1A17]">{t.yourTeam}</h2>
              </div>

              {count === 0 ? (
                <p className="mt-4 rounded-2xl border border-dashed border-[#D8D0C2] bg-[#F3EFE6] px-4 py-6 text-center text-sm text-[#8A8175]">
                  {t.empty}
                </p>
              ) : (
                <ul className="mt-5 flex flex-col gap-3">
                  {members.map((m) => {
                    const profiles = profileCounts[m.slug] ?? 1
                    return (
                      <li
                        key={m.slug}
                        className="flex items-center gap-4 rounded-2xl border border-[#E4DCCF] bg-[#F3EFE6] p-3 sm:p-4"
                      >
                        <Image
                          src={m.avatar || '/placeholder.svg'}
                          alt={m.name}
                          width={48}
                          height={48}
                          className="h-12 w-12 shrink-0 rounded-full object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-bold text-[#1C1A17]">{m.name}</p>
                          <p className="truncate text-xs text-[#8A8175]">{m.role}</p>
                          <div className="mt-2 flex items-center gap-2">
                            <span className="text-[11px] font-medium text-[#6B6560]">{t.profilesLabel}</span>
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => setProfiles(m.slug, -1)}
                                aria-label="-1"
                                className="flex h-6 w-6 items-center justify-center rounded-full border border-[#D8D0C2] text-[#3F3A33] transition-colors hover:border-[#D10E63] hover:text-[#D10E63] disabled:opacity-40"
                                disabled={profiles <= 1}
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-5 text-center text-sm font-bold text-[#1C1A17]">{profiles}</span>
                              <button
                                type="button"
                                onClick={() => setProfiles(m.slug, 1)}
                                aria-label="+1"
                                className="flex h-6 w-6 items-center justify-center rounded-full border border-[#D8D0C2] text-[#3F3A33] transition-colors hover:border-[#D10E63] hover:text-[#D10E63]"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => remove(m.slug)}
                          aria-label={t.remove}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#8A8175] transition-colors hover:bg-[#D10E63]/10 hover:text-[#D10E63]"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </li>
                    )
                  })}
                </ul>
              )}
              <p className="mt-3 text-xs text-[#8A8175]">{t.profilesIncluded}</p>
            </section>

            {/* Ajout rapide */}
            <section className="rounded-[1.75rem] border border-[#D8D0C2] bg-[#FBF9F3] p-6 sm:p-8">
              <h2 className="font-sf text-xl font-bold tracking-[-0.02em] text-[#1C1A17]">{t.addTitle}</h2>
              <p className="mt-1 text-sm text-[#5F594F]">{t.addHint}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {quickAdd.map((r) => {
                  const inTeam = has(r.slug)
                  return (
                    <button
                      key={r.slug}
                      type="button"
                      onClick={() =>
                        add({ slug: r.slug, name: r.name, role: r.role[lang], avatar: r.avatar })
                      }
                      disabled={inTeam}
                      className={`flex items-center gap-3 rounded-2xl border p-3 text-left transition-colors ${
                        inTeam
                          ? 'border-[#D10E63]/30 bg-[#D10E63]/[0.06]'
                          : 'border-[#E4DCCF] bg-[#F3EFE6] hover:border-[#D10E63]/45'
                      }`}
                    >
                      <Image
                        src={r.avatar || '/placeholder.svg'}
                        alt={r.name}
                        width={40}
                        height={40}
                        className="h-10 w-10 shrink-0 rounded-full object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-[#1C1A17]">{r.name}</p>
                        <p className="truncate text-xs text-[#8A8175]">{r.role[lang]}</p>
                      </div>
                      <span
                        className={`flex h-7 items-center gap-1 rounded-full px-2.5 text-xs font-bold ${
                          inTeam ? 'text-[#D10E63]' : 'bg-[#1C1A17] text-[#FBF9F3]'
                        }`}
                      >
                        {inTeam ? (
                          <>
                            <Check className="h-3.5 w-3.5" /> {t.added}
                          </>
                        ) : (
                          <>
                            <Plus className="h-3.5 w-3.5" /> {t.add}
                          </>
                        )}
                      </span>
                    </button>
                  )
                })}
              </div>
            </section>

            {/* Licence organisation */}
            <section className="flex items-start gap-4 rounded-[1.75rem] border border-[#D8D0C2] bg-[#FBF9F3] p-6 sm:p-8">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#D10E63]/10 text-[#D10E63]">
                <Building2 className="h-5 w-5" />
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-sf text-lg font-bold tracking-[-0.02em] text-[#1C1A17]">{t.licenseTitle}</h2>
                  <span className="rounded-full bg-[#D10E63]/10 px-3 py-1 text-xs font-bold text-[#D10E63]">
                    {t.licenseIncluded}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[#5F594F]">{t.licenseDesc}</p>
              </div>
            </section>

            {/* Mode de consommation */}
            <section className="rounded-[1.75rem] border border-[#D8D0C2] bg-[#FBF9F3] p-6 sm:p-8">
              <h2 className="font-sf text-xl font-bold tracking-[-0.02em] text-[#1C1A17]">{t.consumptionTitle}</h2>
              <p className="mt-1 text-sm text-[#5F594F]">{t.consumptionHint}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {CONSUMPTION_MODES.map((m) => {
                  const selected = mode === m.id
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setMode(m.id)}
                      aria-pressed={selected}
                      className={`flex flex-col rounded-2xl border p-4 text-left transition-all ${
                        selected
                          ? 'border-[#D10E63] bg-[#D10E63]/[0.06] ring-1 ring-[#D10E63]'
                          : 'border-[#E4DCCF] bg-[#F3EFE6] hover:border-[#D10E63]/45'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-bold text-[#1C1A17]">{m.name[lang]}</span>
                        <span
                          className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                            selected ? 'border-[#D10E63] bg-[#D10E63]' : 'border-[#B9AF9E]'
                          }`}
                        >
                          {selected && <Check className="h-2.5 w-2.5 text-[#FBF9F3]" strokeWidth={3} />}
                        </span>
                      </div>
                      <span className="mt-0.5 text-[11px] font-semibold uppercase tracking-wide text-[#D10E63]">
                        {m.tagline[lang]}
                      </span>
                      <span className="mt-2 text-xs leading-relaxed text-[#5F594F]">{m.description[lang]}</span>
                      <span className="mt-3 text-sm font-bold text-[#1C1A17]">{m.priceLabel[lang]}</span>
                    </button>
                  )
                })}
              </div>
            </section>
          </div>

          {/* Récapitulatif sticky */}
          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <div className="premium-shadow rounded-[1.75rem] border border-[#D8D0C2] bg-[#FBF9F3] p-6 sm:p-8">
              <h2 className="font-sf text-xl font-bold tracking-[-0.02em] text-[#1C1A17]">{t.summaryTitle}</h2>

              <dl className="mt-6 flex flex-col gap-3 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-[#5F594F]">{t.collaboratorsLine}</dt>
                  <dd className="font-bold text-[#1C1A17]">{count}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-[#5F594F]">{t.tierLine}</dt>
                  <dd className="font-semibold text-[#3F3A33]">{tier.label[lang]}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-[#5F594F]">{t.unitLine}</dt>
                  <dd className="font-bold text-[#1C1A17]">
                    {order.unit === null ? t.quote : `${formatEuro(order.unit, lang)} ${t.perMonth}`}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-[#5F594F]">{t.consumptionLine}</dt>
                  <dd className="font-semibold text-[#3F3A33]">
                    {order.addon > 0 ? `+ ${formatEuro(order.addon, lang)}` : '—'}
                  </dd>
                </div>
              </dl>

              <div className="mt-6 flex items-end justify-between border-t border-[#E4DCCF] pt-5">
                <span className="text-sm font-semibold text-[#5F594F]">{t.totalLine}</span>
                {order.isQuote ? (
                  <span className="font-sf text-2xl font-bold text-[#D10E63]">{t.quote}</span>
                ) : (
                  <span className="font-sf text-3xl font-bold tracking-[-0.03em] text-[#1C1A17]">
                    {formatEuro(order.total ?? 0, lang)}
                    <span className="ml-1 text-sm font-medium text-[#8A8175]">{t.perMonth}</span>
                  </span>
                )}
              </div>

              <Link
                href={order.isQuote ? '/expertises' : '/decouvrir'}
                aria-disabled={count === 0}
                className={`mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-6 text-sm font-bold transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 ${
                  count === 0
                    ? 'pointer-events-none bg-[#D8D0C2] text-[#8A8175]'
                    : 'bg-[#D10E63] text-[#FBF9F3] hover:-translate-y-0.5'
                }`}
              >
                {order.isQuote ? t.contactSales : t.validate}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="mt-3 text-center text-xs text-[#8A8175]">{t.trialNote}</p>
              <p className="mt-1 text-center text-[11px] text-[#B9AF9E]">{t.exampleNote}</p>
            </div>
          </motion.aside>
        </div>
      </div>
    </main>
  )
}
