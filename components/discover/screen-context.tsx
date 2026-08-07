'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, Pencil, Globe, Upload, MessageSquare, Building2, Loader2 } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { AlmaHead } from './context-column'
import { getProfile, guessProfileKey, normalizeDomain } from '@/lib/discover-profiles'
import { getMission } from './types'

type Bi = { fr: string; en: string }
type Phase = 'input' | 'describe' | 'analyzing' | 'review'
type SourceKind = 'site' | 'import' | 'describe' | 'creation'

type Block = {
  key: string
  label: Bi
  value: Bi
  /** Contributes to the right-panel progress bar when confirmed. */
  progressAt: number
}

export function ScreenContext({
  lang,
  domain,
  missionSlug,
  onProgress,
  onContinue,
}: {
  lang: Lang
  domain: string
  missionSlug: string
  onProgress: (n: number) => void
  onContinue: () => void
}) {
  const t = COPY[lang]
  const [phase, setPhase] = useState<Phase>('input')
  const [domainInput, setDomainInput] = useState(domain || '')
  const [showAlt, setShowAlt] = useState(false)
  const [source, setSource] = useState<{ kind: SourceKind; label: Bi } | null>(null)
  const [blocks, setBlocks] = useState<Block[]>([])
  const [confirmed, setConfirmed] = useState<Record<string, boolean>>({})
  const [editingKey, setEditingKey] = useState<string | null>(null)
  const [draft, setDraft] = useState('')

  const normalized = normalizeDomain(domainInput)

  function startAnalysis(profileKey: string, src: { kind: SourceKind; label: Bi }, built: Block[]) {
    setSource(src)
    setBlocks(built)
    setConfirmed({})
    onProgress(0)
    setPhase('analyzing')
  }

  function analyzeSite() {
    if (!normalized) return
    startAnalysis(
      guessProfileKey(normalized),
      { kind: 'site', label: { fr: `${normalized} · analysé aujourd’hui`, en: `${normalized} · analyzed today` } },
      buildBlocksFromDomain(normalized, missionSlug),
    )
  }

  function analyzeImport(fileName: string) {
    startAnalysis(
      'default',
      { kind: 'import', label: { fr: `Document importé · ${fileName}`, en: `Imported document · ${fileName}` } },
      buildBlocksFromDomain('', missionSlug),
    )
  }

  function startCreation() {
    startAnalysis(
      'default',
      { kind: 'creation', label: { fr: 'Entreprise en création', en: 'Company being created' } },
      buildCreationBlocks(missionSlug),
    )
  }

  function submitDescribe(form: DescribeForm) {
    setSource({ kind: 'describe', label: { fr: 'Décrit avec Alma', en: 'Described with Alma' } })
    setBlocks(buildBlocksFromDescribe(form, missionSlug))
    setConfirmed({})
    onProgress(0)
    setPhase('review')
  }

  function confirmBlock(b: Block) {
    setConfirmed((c) => ({ ...c, [b.key]: true }))
    onProgress(b.progressAt)
    setEditingKey(null)
  }

  function saveEdit(b: Block) {
    setBlocks((bs) => bs.map((x) => (x.key === b.key ? { ...x, value: { fr: draft, en: draft } } : x)))
    confirmBlock(b)
  }

  const allConfirmed = blocks.length > 0 && blocks.every((b) => confirmed[b.key])

  return (
    <div>
      <p className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-[#D10E63]">{t.kicker}</p>
      <h1 className="mt-3 text-balance font-sf text-[clamp(1.5rem,3vw,2.1rem)] font-semibold leading-tight tracking-[-0.03em] text-[#1C1A17]">
        {phase === 'review' ? t.reviewTitle : t.title}
      </h1>
      <p className="mt-2.5 max-w-xl text-pretty text-[15px] leading-relaxed text-[#4E483F]">
        {phase === 'review' ? t.reviewLead : t.lead}
      </p>

      {/* Alma prompt bubble — always visible, reframes per phase. */}
      <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-5">
        <AlmaHead className="h-9 w-9" />
        <p className="flex-1 text-[15px] font-semibold leading-relaxed text-[#1C1A17]">
          {phase === 'input' && t.almaAsk}
          {phase === 'describe' && t.almaDescribe}
          {phase === 'analyzing' && t.almaAnalyzing}
          {phase === 'review' && t.almaReview}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {/* PHASE 1 — the source (site first, never an invented context) */}
        {phase === 'input' && (
          <motion.div
            key="input"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4"
          >
            <div className="rounded-2xl border border-[#E4DDCE] bg-white/60 p-5">
              <label htmlFor="company-domain" className="flex items-center gap-2 text-sm font-semibold text-[#1C1A17]">
                <Globe className="h-4 w-4 text-[#D10E63]" />
                {t.domainLabel}
              </label>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                <input
                  id="company-domain"
                  type="text"
                  inputMode="url"
                  value={domainInput}
                  onChange={(e) => setDomainInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.nativeEvent.isComposing) analyzeSite()
                  }}
                  placeholder={t.domainPlaceholder}
                  className="flex-1 rounded-xl border border-[#D8D0C2] bg-white px-4 py-3 text-sm text-[#1C1A17] outline-none placeholder:text-[#9A9184] focus:border-[#D10E63]"
                />
                <button
                  type="button"
                  onClick={analyzeSite}
                  disabled={!normalized}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#D10E63] px-5 py-3 text-sm font-bold text-[#FBF9F3] transition-colors hover:bg-[#E51872] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {t.analyze}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-2.5 text-[12px] leading-relaxed text-[#8A8175]">{t.domainHint}</p>
            </div>

            <button
              type="button"
              onClick={() => setShowAlt((s) => !s)}
              className="mt-4 text-sm font-semibold text-[#A80B50] underline decoration-[#D10E63]/30 underline-offset-4 hover:decoration-[#D10E63]"
            >
              {t.noSite}
            </button>

            <AnimatePresence>
              {showAlt && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    <label className="flex cursor-pointer flex-col gap-2 rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-4 text-left transition-colors hover:border-[#D10E63]/40">
                      <Upload className="h-5 w-5 text-[#D10E63]" />
                      <span className="text-sm font-bold text-[#1C1A17]">{t.srcImport}</span>
                      <span className="text-[12px] leading-relaxed text-[#8A8175]">{t.srcImportDesc}</span>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.ppt,.pptx,.key,.txt"
                        className="sr-only"
                        onChange={(e) => {
                          const f = e.target.files?.[0]
                          if (f) analyzeImport(f.name)
                        }}
                      />
                    </label>

                    <button
                      type="button"
                      onClick={() => setPhase('describe')}
                      className="flex flex-col gap-2 rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-4 text-left transition-colors hover:border-[#D10E63]/40"
                    >
                      <MessageSquare className="h-5 w-5 text-[#D10E63]" />
                      <span className="text-sm font-bold text-[#1C1A17]">{t.srcDescribe}</span>
                      <span className="text-[12px] leading-relaxed text-[#8A8175]">{t.srcDescribeDesc}</span>
                    </button>

                    <button
                      type="button"
                      onClick={startCreation}
                      className="flex flex-col gap-2 rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-4 text-left transition-colors hover:border-[#D10E63]/40"
                    >
                      <Building2 className="h-5 w-5 text-[#D10E63]" />
                      <span className="text-sm font-bold text-[#1C1A17]">{t.srcCreation}</span>
                      <span className="text-[12px] leading-relaxed text-[#8A8175]">{t.srcCreationDesc}</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Guided description (5 questions) */}
        {phase === 'describe' && (
          <motion.div key="describe" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <DescribeFormView lang={lang} onBack={() => setPhase('input')} onSubmit={submitDescribe} />
          </motion.div>
        )}

        {/* PHASE 2 — scripted analysis of the provided source */}
        {phase === 'analyzing' && (
          <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <AnalyzingView lang={lang} sourceLabel={source?.label ?? null} onDone={() => setPhase('review')} />
          </motion.div>
        )}

        {/* PHASE 3 — the user confirms or corrects what Alma understood */}
        {phase === 'review' && (
          <motion.div key="review" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
            {source && (
              <p className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-[#E1D9C9] bg-[#FBF9F3] px-3 py-1 text-[12px] font-medium text-[#5A544A]">
                <Check className="h-3.5 w-3.5 text-[#2E9E5B]" strokeWidth={3} />
                {t.sourcePrefix} {source.label[lang]}
              </p>
            )}

            <div className="flex flex-col gap-3">
              {blocks.map((b) => {
                const isDone = confirmed[b.key]
                const isEditing = editingKey === b.key
                return (
                  <div
                    key={b.key}
                    className={[
                      'rounded-2xl border p-5 transition-colors',
                      isDone ? 'border-[#2E9E5B]/40 bg-[#F1F7F2]' : 'border-[#E4DDCE] bg-[#FBF9F3]',
                    ].join(' ')}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A8175]">
                        {b.label[lang]}
                      </p>
                      {isDone ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#1F7A45]">
                          <Check className="h-3.5 w-3.5" strokeWidth={3} />
                          {t.confirmed}
                        </span>
                      ) : (
                        <span className="rounded-full bg-[#F3E8D6] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#9A7B34]">
                          {t.toConfirm}
                        </span>
                      )}
                    </div>

                    {isEditing ? (
                      <div className="mt-3">
                        <textarea
                          value={draft}
                          onChange={(e) => setDraft(e.target.value)}
                          rows={3}
                          aria-label={b.label[lang]}
                          className="w-full rounded-xl border border-[#D8D0C2] bg-white px-4 py-3 text-sm leading-relaxed text-[#1C1A17] outline-none focus:border-[#D10E63]"
                        />
                        <div className="mt-2.5 flex gap-2">
                          <button
                            type="button"
                            onClick={() => saveEdit(b)}
                            className="inline-flex items-center gap-2 rounded-xl bg-[#D10E63] px-4 py-2 text-sm font-bold text-[#FBF9F3] transition-colors hover:bg-[#E51872]"
                          >
                            <Check className="h-4 w-4" />
                            {t.save}
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingKey(null)}
                            className="rounded-xl border border-[#D8D0C2] bg-white/60 px-4 py-2 text-sm font-semibold text-[#3B362F]"
                          >
                            {t.cancel}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="mt-2 text-[15px] leading-relaxed text-[#3B362F]">{b.value[lang]}</p>
                        {!isDone && (
                          <div className="mt-4 flex flex-wrap gap-2.5">
                            <button
                              type="button"
                              onClick={() => confirmBlock(b)}
                              className="inline-flex items-center gap-2 rounded-xl bg-[#D10E63] px-4 py-2 text-sm font-bold text-[#FBF9F3] transition-colors hover:bg-[#E51872]"
                            >
                              <Check className="h-4 w-4" />
                              {t.confirm}
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setEditingKey(b.key)
                                setDraft(b.value[lang])
                              }}
                              className="inline-flex items-center gap-2 rounded-xl border border-[#D8D0C2] bg-white/60 px-4 py-2 text-sm font-semibold text-[#3B362F] transition-colors hover:border-[#D10E63]/40"
                            >
                              <Pencil className="h-4 w-4" />
                              {t.correct}
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )
              })}
            </div>

            <motion.div initial={false} animate={{ opacity: allConfirmed ? 1 : 0.5 }} className="mt-6">
              <p className="text-sm leading-relaxed text-[#3B362F]">{allConfirmed ? t.doneNote : t.confirmAllHint}</p>
              <button
                type="button"
                onClick={onContinue}
                disabled={!allConfirmed}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#D10E63] px-6 py-3.5 text-sm font-bold text-[#FBF9F3] transition-colors hover:bg-[#E51872] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {t.continue}
                <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Analyzing view — honest scripted steps, never a real crawl.                */
/* -------------------------------------------------------------------------- */

function AnalyzingView({ lang, sourceLabel, onDone }: { lang: Lang; sourceLabel: Bi | null; onDone: () => void }) {
  const reduce = useReducedMotion()
  const steps = ANALYZE_STEPS[lang]
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (reduce) {
      onDone()
      return
    }
    const stepMs = 620
    const timers = steps.map((_, i) => setTimeout(() => setActive(i + 1), stepMs * (i + 1)))
    const finish = setTimeout(onDone, stepMs * (steps.length + 1))
    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(finish)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="mt-4 rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-6">
      {sourceLabel && (
        <p className="mb-4 text-[12px] font-medium text-[#8A8175]">{sourceLabel[lang]}</p>
      )}
      <ul className="flex flex-col gap-3">
        {steps.map((label, i) => {
          const done = i < active
          const current = i === active
          return (
            <li key={label} className="flex items-center gap-3">
              <span
                className={[
                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors',
                  done ? 'bg-[#2E9E5B] text-[#FBF9F3]' : current ? 'bg-[#D10E63]/15 text-[#D10E63]' : 'border border-[#D8D0C2] text-transparent',
                ].join(' ')}
              >
                {done ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : current ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
              </span>
              <span className={done || current ? 'text-sm font-semibold text-[#1C1A17]' : 'text-sm text-[#9A9184]'}>
                {label}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Guided description form (5 questions)                                      */
/* -------------------------------------------------------------------------- */

type DescribeForm = { nom: string; activite: string; offre: string; clients: string; methode: string }

function DescribeFormView({
  lang,
  onBack,
  onSubmit,
}: {
  lang: Lang
  onBack: () => void
  onSubmit: (f: DescribeForm) => void
}) {
  const t = COPY[lang]
  const [f, setF] = useState<DescribeForm>({ nom: '', activite: '', offre: '', clients: '', methode: '' })
  const fields: { key: keyof DescribeForm; label: string; placeholder: string }[] = [
    { key: 'nom', label: t.qNom, placeholder: t.qNomPh },
    { key: 'activite', label: t.qActivite, placeholder: t.qActivitePh },
    { key: 'offre', label: t.qOffre, placeholder: t.qOffrePh },
    { key: 'clients', label: t.qClients, placeholder: t.qClientsPh },
    { key: 'methode', label: t.qMethode, placeholder: t.qMethodePh },
  ]
  const ready = f.nom.trim() && f.activite.trim()

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (ready) onSubmit(f)
      }}
      className="mt-4 rounded-2xl border border-[#E4DDCE] bg-white/60 p-5"
    >
      <div className="flex flex-col gap-4">
        {fields.map((field) => (
          <div key={field.key}>
            <label htmlFor={`d-${field.key}`} className="text-sm font-semibold text-[#1C1A17]">
              {field.label}
            </label>
            <input
              id={`d-${field.key}`}
              type="text"
              value={f[field.key]}
              onChange={(e) => setF((prev) => ({ ...prev, [field.key]: e.target.value }))}
              placeholder={field.placeholder}
              className="mt-1.5 w-full rounded-xl border border-[#D8D0C2] bg-white px-4 py-2.5 text-sm text-[#1C1A17] outline-none placeholder:text-[#9A9184] focus:border-[#D10E63]"
            />
          </div>
        ))}
      </div>
      <div className="mt-5 flex gap-2.5">
        <button
          type="submit"
          disabled={!ready}
          className="inline-flex items-center gap-2 rounded-xl bg-[#D10E63] px-5 py-3 text-sm font-bold text-[#FBF9F3] transition-colors hover:bg-[#E51872] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {t.buildContext}
          <ArrowRight className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={onBack}
          className="rounded-xl border border-[#D8D0C2] bg-white/60 px-5 py-3 text-sm font-semibold text-[#3B362F]"
        >
          {t.back}
        </button>
      </div>
    </form>
  )
}

/* -------------------------------------------------------------------------- */
/* Block builders — scripted, presented as "to confirm".                      */
/* -------------------------------------------------------------------------- */

function buildBlocksFromDomain(domainStr: string, missionSlug: string): Block[] {
  const p = getProfile(guessProfileKey(domainStr))
  const a = ANALYSIS[p.key] ?? ANALYSIS.default
  const m = getMission(missionSlug)
  return [
    { key: 'activite', label: { fr: 'Activité', en: 'Business' }, value: a.activite, progressAt: 1 },
    { key: 'offre', label: { fr: 'Offre', en: 'Offer' }, value: a.offre, progressAt: 2 },
    { key: 'clients', label: { fr: 'Clients', en: 'Customers' }, value: a.clients, progressAt: 3 },
    {
      key: 'mission',
      label: { fr: 'Pour cette mission', en: 'For this mission' },
      value: {
        fr: `Pour « ${m.title.fr} », je m’appuierai sur votre vocabulaire métier (${a.vocab.fr}) et je validerai avec vous avant toute action engageante.`,
        en: `For “${m.title.en}”, I’ll rely on your business vocabulary (${a.vocab.en}) and check with you before any binding action.`,
      },
      progressAt: 6,
    },
  ]
}

function buildBlocksFromDescribe(f: DescribeForm, missionSlug: string): Block[] {
  const m = getMission(missionSlug)
  const clean = (s: string, fallback: string) => (s.trim() ? s.trim() : fallback)
  return [
    {
      key: 'activite',
      label: { fr: 'Activité', en: 'Business' },
      value: {
        fr: `${clean(f.nom, 'Votre entreprise')} — ${clean(f.activite, 'activité à préciser')}.`,
        en: `${clean(f.nom, 'Your company')} — ${clean(f.activite, 'business to clarify')}.`,
      },
      progressAt: 1,
    },
    {
      key: 'offre',
      label: { fr: 'Offre', en: 'Offer' },
      value: { fr: clean(f.offre, 'Offre à préciser.'), en: clean(f.offre, 'Offer to clarify.') },
      progressAt: 2,
    },
    {
      key: 'clients',
      label: { fr: 'Clients', en: 'Customers' },
      value: { fr: clean(f.clients, 'Clients à préciser.'), en: clean(f.clients, 'Customers to clarify.') },
      progressAt: 3,
    },
    {
      key: 'mission',
      label: { fr: 'Pour cette mission', en: 'For this mission' },
      value: {
        fr: `Méthode actuelle : ${clean(f.methode, 'à préciser')}. Pour « ${m.title.fr} », je m’appuierai dessus et validerai avec vous avant toute action engageante.`,
        en: `Current method: ${clean(f.methode, 'to clarify')}. For “${m.title.en}”, I’ll build on it and check with you before any binding action.`,
      },
      progressAt: 6,
    },
  ]
}

function buildCreationBlocks(missionSlug: string): Block[] {
  const m = getMission(missionSlug)
  return [
    {
      key: 'activite',
      label: { fr: 'Activité', en: 'Business' },
      value: { fr: 'Entreprise en création — précisez votre activité prévue.', en: 'Company being created — describe your planned business.' },
      progressAt: 1,
    },
    {
      key: 'offre',
      label: { fr: 'Offre', en: 'Offer' },
      value: { fr: 'Offre prévue à préciser.', en: 'Planned offer to clarify.' },
      progressAt: 2,
    },
    {
      key: 'clients',
      label: { fr: 'Clients', en: 'Customers' },
      value: { fr: 'Clients visés à préciser.', en: 'Target customers to clarify.' },
      progressAt: 3,
    },
    {
      key: 'mission',
      label: { fr: 'Pour cette mission', en: 'For this mission' },
      value: {
        fr: `Nous partons d’une base vierge pour « ${m.title.fr} ». Vous complétez, je valide chaque action avec vous.`,
        en: `We start from a blank base for “${m.title.en}”. You fill it in, I check every action with you.`,
      },
      progressAt: 6,
    },
  ]
}

/* -------------------------------------------------------------------------- */
/* Scripted analysis content per profile type (a demonstration, to confirm).  */
/* -------------------------------------------------------------------------- */

const ANALYSIS: Record<string, { activite: Bi; offre: Bi; clients: Bi; vocab: Bi }> = {
  saas: {
    activite: { fr: 'Éditeur de logiciel en ligne (SaaS), avec une croissance portée par le produit et le marketing.', en: 'Online software company (SaaS), growth driven by product and marketing.' },
    offre: { fr: 'Un produit en abonnement, décliné en plusieurs formules selon les usages.', en: 'A subscription product, offered in several plans by usage.' },
    clients: { fr: 'Des entreprises utilisatrices, souvent des équipes tech, marketing ou opérations.', en: 'Business users, often tech, marketing or operations teams.' },
    vocab: { fr: 'abonnement, onboarding, churn, MRR', en: 'subscription, onboarding, churn, MRR' },
  },
  agence: {
    activite: { fr: 'Agence de prestations créatives et marketing, organisée par projets clients.', en: 'Creative and marketing services agency, organized by client projects.' },
    offre: { fr: 'Des prestations sur mesure : création, contenu, campagnes.', en: 'Tailored services: creative, content, campaigns.' },
    clients: { fr: 'Des marques et entreprises qui externalisent leur communication.', en: 'Brands and companies outsourcing their communications.' },
    vocab: { fr: 'brief, livrable, deadline, retainer', en: 'brief, deliverable, deadline, retainer' },
  },
  conseil: {
    activite: { fr: 'Cabinet de conseil : expertise, accompagnement et pilotage pour ses clients.', en: 'Consulting firm: expertise, advisory and steering for its clients.' },
    offre: { fr: 'Des missions d’accompagnement facturées au temps ou au forfait.', en: 'Advisory engagements billed by time or fixed fee.' },
    clients: { fr: 'Des dirigeants et directions métier en quête d’expertise externe.', en: 'Executives and business leaders seeking external expertise.' },
    vocab: { fr: 'mission, livrable, honoraires, échéance', en: 'engagement, deliverable, fees, deadline' },
  },
  ecommerce: {
    activite: { fr: 'Boutique en ligne : acquisition, service client et logistique au quotidien.', en: 'Online store: acquisition, customer service and daily logistics.' },
    offre: { fr: 'Un catalogue de produits vendus directement en ligne.', en: 'A catalog of products sold directly online.' },
    clients: { fr: 'Des particuliers ou professionnels achetant sur votre site.', en: 'Individuals or businesses buying on your site.' },
    vocab: { fr: 'panier, commande, expédition, retour', en: 'cart, order, shipping, return' },
  },
  pme: {
    activite: { fr: 'Une PME avec une équipe polyvalente : direction, commerce, finance et relation client.', en: 'An SMB with a versatile team: leadership, sales, finance and customer relations.' },
    offre: { fr: 'Des produits ou services vendus à vos clients réguliers.', en: 'Products or services sold to your regular customers.' },
    clients: { fr: 'Un portefeuille de clients professionnels ou particuliers.', en: 'A portfolio of business or individual customers.' },
    vocab: { fr: 'devis, facture, relance, échéance', en: 'quote, invoice, reminder, due date' },
  },
  default: {
    activite: { fr: 'Une organisation avec une activité à préciser ensemble.', en: 'An organization whose business we’ll clarify together.' },
    offre: { fr: 'Une offre de produits ou services à confirmer.', en: 'A product or service offer to confirm.' },
    clients: { fr: 'Des clients à préciser selon votre réalité.', en: 'Customers to clarify based on your reality.' },
    vocab: { fr: 'devis, facture, relance, client', en: 'quote, invoice, reminder, customer' },
  },
}

const ANALYZE_STEPS: Record<Lang, string[]> = {
  fr: [
    'Lecture de la source fournie',
    'Identification de l’activité',
    'Repérage de l’offre et des clients',
    'Extraction du vocabulaire métier',
  ],
  en: [
    'Reading the provided source',
    'Identifying the business',
    'Spotting the offer and customers',
    'Extracting business vocabulary',
  ],
}

const COPY = {
  fr: {
    kicker: 'Étape 2 · Votre entreprise',
    title: 'Votre mission est prête. Présentez-moi votre entreprise.',
    lead: 'Indiquez votre site : je l’analyse et je vous montre ce que j’en comprends. Je n’invente rien — vous confirmez ou corrigez chaque point.',
    reviewTitle: 'Voici ce que je comprends de votre entreprise.',
    reviewLead: 'Confirmez ce qui est juste, corrigez le reste. Ce contexte servira à toutes les missions, pas seulement celle-ci.',
    almaAsk: 'Quel est le site de votre entreprise ? Je l’analyse et je vous montre ma lecture, à valider.',
    almaDescribe: 'Pas de site ? Répondez à quelques questions : je reconstitue votre contexte à partir de vos réponses.',
    almaAnalyzing: 'J’analyse la source que vous m’avez donnée…',
    almaReview: 'Voici ma lecture. Elle n’est pas gravée dans le marbre — corrigez tout ce qui doit l’être.',
    domainLabel: 'Le site de votre entreprise',
    domainPlaceholder: 'exemple.fr',
    domainHint: 'Analyse de démonstration : je m’appuie sur votre domaine pour proposer une lecture à confirmer, pas un audit.',
    analyze: 'Analyser mon entreprise',
    noSite: 'Mon entreprise n’a pas de site web',
    srcImport: 'Importer une présentation',
    srcImportDesc: 'Plaquette, PDF ou présentation de votre activité.',
    srcDescribe: 'Décrire mon activité avec Alma',
    srcDescribeDesc: 'Quelques questions pour reconstituer votre contexte.',
    srcCreation: 'Mon entreprise est en création',
    srcCreationDesc: 'On part d’une base vierge, à compléter ensemble.',
    sourcePrefix: 'Source :',
    toConfirm: 'À confirmer',
    confirmed: 'Confirmé',
    confirm: 'Confirmer',
    correct: 'Corriger',
    save: 'Enregistrer',
    cancel: 'Annuler',
    confirmAllHint: 'Confirmez ou corrigez chaque bloc pour continuer.',
    doneNote: 'Le contexte de votre entreprise est prêt. Je vais maintenant décomposer la mission en savoir-faire concrets.',
    continue: 'Voir les savoir-faire nécessaires',
    // describe form
    qNom: 'Nom de votre entreprise',
    qNomPh: 'Ex. Solvea',
    qActivite: 'Votre activité en une phrase',
    qActivitePh: 'Ce que fait votre entreprise',
    qOffre: 'Vos produits ou services',
    qOffrePh: 'Ce que vous vendez',
    qClients: 'Vos clients',
    qClientsPh: 'À qui vous vendez',
    qMethode: 'Comment gérez-vous cela aujourd’hui ?',
    qMethodePh: 'Outils, méthode actuelle…',
    buildContext: 'Construire mon contexte',
    back: 'Retour',
  },
  en: {
    kicker: 'Step 2 · Your company',
    title: 'Your mission is ready. Now introduce your company.',
    lead: 'Enter your website: I analyze it and show you what I understand. I invent nothing — you confirm or correct every point.',
    reviewTitle: 'Here is what I understand about your company.',
    reviewLead: 'Confirm what’s right, correct the rest. This context will serve every mission, not just this one.',
    almaAsk: 'What is your company’s website? I’ll analyze it and show you my reading, for you to confirm.',
    almaDescribe: 'No website? Answer a few questions: I’ll rebuild your context from your answers.',
    almaAnalyzing: 'Analyzing the source you gave me…',
    almaReview: 'Here is my reading. It’s not set in stone — correct anything that needs it.',
    domainLabel: 'Your company website',
    domainPlaceholder: 'example.com',
    domainHint: 'Demonstration analysis: I use your domain to propose a reading to confirm, not an audit.',
    analyze: 'Analyze my company',
    noSite: 'My company has no website',
    srcImport: 'Import a presentation',
    srcImportDesc: 'Brochure, PDF or a deck about your business.',
    srcDescribe: 'Describe my business with Alma',
    srcDescribeDesc: 'A few questions to rebuild your context.',
    srcCreation: 'My company is being created',
    srcCreationDesc: 'We start from a blank base, to fill in together.',
    sourcePrefix: 'Source:',
    toConfirm: 'To confirm',
    confirmed: 'Confirmed',
    confirm: 'Confirm',
    correct: 'Correct',
    save: 'Save',
    cancel: 'Cancel',
    confirmAllHint: 'Confirm or correct each block to continue.',
    doneNote: 'Your company context is ready. I will now break the mission down into concrete know-how.',
    continue: 'See the required know-how',
    qNom: 'Your company name',
    qNomPh: 'e.g. Solvea',
    qActivite: 'Your business in one sentence',
    qActivitePh: 'What your company does',
    qOffre: 'Your products or services',
    qOffrePh: 'What you sell',
    qClients: 'Your customers',
    qClientsPh: 'Who you sell to',
    qMethode: 'How do you handle this today?',
    qMethodePh: 'Tools, current method…',
    buildContext: 'Build my context',
    back: 'Back',
  },
} as const
