'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, Pencil, Upload, MessageSquare, Building2, Loader2 } from 'lucide-react'
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
  const [scanTarget, setScanTarget] = useState<{ kind: SourceKind; text: string }>({ kind: 'site', text: '' })
  const [blocks, setBlocks] = useState<Block[]>([])
  const [confirmed, setConfirmed] = useState<Record<string, boolean>>({})
  const [editingKey, setEditingKey] = useState<string | null>(null)
  const [draft, setDraft] = useState('')

  const normalized = normalizeDomain(domainInput)

  function startAnalysis(
    profileKey: string,
    src: { kind: SourceKind; label: Bi },
    built: Block[],
    target: string,
  ) {
    setSource(src)
    setScanTarget({ kind: src.kind, text: target })
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
      normalized,
    )
  }

  function analyzeImport(fileName: string) {
    startAnalysis(
      'default',
      { kind: 'import', label: { fr: `Document importé · ${fileName}`, en: `Imported document · ${fileName}` } },
      buildBlocksFromDomain('', missionSlug),
      fileName,
    )
  }

  function startCreation() {
    startAnalysis(
      'default',
      { kind: 'creation', label: { fr: 'Entreprise en création', en: 'Company being created' } },
      buildCreationBlocks(missionSlug),
      lang === 'fr' ? 'entreprise en création' : 'company being created',
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

      {/* Alma prompt bubble — reframes per phase. On the input and analyzing
          phases Alma's voice lives inside the field / the scanner, so we skip
          the plain boxed bubble there. */}
      {(phase === 'describe' || phase === 'review') && (
        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-5">
          <AlmaHead className="h-9 w-9" />
          <p className="flex-1 text-[15px] font-semibold leading-relaxed text-[#1C1A17]">
            {phase === 'describe' && t.almaDescribe}
            {phase === 'review' && t.almaReview}
          </p>
        </div>
      )}

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
            {/* Source entry — a single, quiet focal point. No card, no chrome:
                one refined underline field carries the whole moment. */}
            <div className="mt-10 max-w-xl">
              {/* Alma, understated — one line, not a boxed bubble. */}
              <div className="flex items-center gap-2.5">
                <AlmaHead className="h-6 w-6 shrink-0" />
                <p className="text-[13px] leading-relaxed text-[#6B6459]">
                  <span className="font-semibold text-[#1C1A17]">{t.almaName}</span>
                  <span className="mx-1.5 text-[#C7BFB0]">·</span>
                  {t.almaAsk}
                </p>
              </div>

              {/* The field — large type on a hairline that draws the eye. */}
              <label htmlFor="company-domain" className="sr-only">
                {t.domainLabel}
              </label>
              <div className="mt-7 flex items-baseline gap-3 border-b border-[#D8D0C2] pb-4 transition-colors duration-300 focus-within:border-[#1C1A17]">
                <span className="shrink-0 select-none font-mono text-base text-[#C7BFB0] sm:text-lg">https://</span>
                <input
                  id="company-domain"
                  type="text"
                  inputMode="url"
                  autoComplete="url"
                  autoFocus
                  value={domainInput}
                  onChange={(e) => setDomainInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.nativeEvent.isComposing) analyzeSite()
                  }}
                  placeholder={t.domainPlaceholder}
                  className="min-w-0 flex-1 border-0 bg-transparent text-2xl font-medium tracking-[-0.01em] text-[#1C1A17] outline-none placeholder:font-normal placeholder:text-[#C7BFB0] sm:text-3xl"
                />
                <button
                  type="button"
                  onClick={analyzeSite}
                  disabled={!normalized}
                  className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[#A80B50] transition-colors disabled:cursor-not-allowed disabled:text-[#C7BFB0]"
                >
                  {t.analyze}
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-enabled:group-hover:translate-x-0.5" />
                </button>
              </div>

              {/* One quiet promise line — replaces the noisy chips. */}
              <p className="mt-5 text-pretty text-[13px] leading-relaxed text-[#6B6459]">
                <span className="text-[#9A9184]">{t.willReadLabel} — </span>
                {t.willReadInline}
              </p>

              <p className="mt-2 text-[12px] leading-relaxed text-[#9A9184]">{t.domainHint}</p>

              {/* No-site path — an understated editorial link. */}
              <button
                type="button"
                onClick={() => setShowAlt((s) => !s)}
                aria-expanded={showAlt}
                className="mt-8 inline-flex items-center gap-1.5 text-[13px] font-medium text-[#8A8175] underline decoration-[#D8D0C2] underline-offset-[5px] transition-colors hover:text-[#A80B50] hover:decoration-[#D10E63]/50"
              >
                {t.noSite}
              </button>
            </div>

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
            <AnalyzingView lang={lang} target={scanTarget} onDone={() => setPhase('review')} />
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

function AnalyzingView({
  lang,
  target,
  onDone,
}: {
  lang: Lang
  target: { kind: SourceKind; text: string }
  onDone: () => void
}) {
  const reduce = useReducedMotion()
  const t = COPY[lang]
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

  const prefix = target.kind === 'site' ? 'https://' : '↳'

  return (
    <div className="mt-10 max-w-xl">
      {/* THE LIVING ADDRESS BAR — the signature of this step. The source the
          user gave freezes onto the hairline and a light beam sweeps across it
          while Alma reads. One orchestrated motion, disabled for reduced-motion. */}
      <div className="relative overflow-hidden pb-4">
        <div className="flex items-baseline gap-3">
          <span className="shrink-0 select-none font-mono text-base text-[#C7BFB0] sm:text-lg">{prefix}</span>
          <span className="min-w-0 flex-1 truncate text-2xl font-medium tracking-[-0.01em] text-[#1C1A17] sm:text-3xl">
            {target.text}
          </span>
          <span className="ml-auto inline-flex shrink-0 items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#A80B50]">
            <motion.span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full bg-[#D10E63]"
              animate={reduce ? {} : { opacity: [1, 0.25, 1] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
            />
            {t.scanReading}
          </span>
        </div>

        {/* soft wide beam sweeping the whole bar */}
        {!reduce && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-[#D10E63]/12 to-transparent"
            initial={{ x: '-60%' }}
            animate={{ x: '160%' }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        {/* the hairline itself: dim base + a bright segment scanning along it */}
        <span aria-hidden className="absolute bottom-0 left-0 h-px w-full bg-[#D8D0C2]" />
        {!reduce && (
          <motion.span
            aria-hidden
            className="absolute bottom-0 left-0 h-px w-1/3 bg-gradient-to-r from-transparent via-[#D10E63] to-transparent"
            initial={{ x: '-50%' }}
            animate={{ x: '300%' }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </div>

      {/* Alma reads aloud — lines stream in, one at a time. */}
      <div className="mt-7 flex flex-col gap-2.5">
        <AnimatePresence initial={false}>
          {steps.map((label, i) => {
            if (i > active) return null
            const done = i < active
            return (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: done ? 0.55 : 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2.5"
              >
                <span className="flex h-4 w-4 shrink-0 items-center justify-center">
                  {done ? (
                    <Check className="h-3.5 w-3.5 text-[#2E9E5B]" strokeWidth={3} />
                  ) : (
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-[#D10E63]" />
                  )}
                </span>
                <span className={done ? 'text-sm text-[#8A8175]' : 'text-[15px] font-semibold text-[#1C1A17]'}>
                  {label}
                </span>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
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
    kicker: 'Entreprise · 2 sur 5',
    title: 'Un lien suffit pour que je comprenne votre entreprise.',
    lead: 'Collez l’adresse de votre site. Je le lis en quelques secondes et je reconstitue votre activité, votre offre, vos clients et votre vocabulaire — puis vous validez, point par point. Je n’invente rien.',
    reviewTitle: 'Voici ce que je comprends de votre entreprise.',
    reviewLead: 'Confirmez ce qui est juste, corrigez le reste. Ce contexte servira à toutes les missions, pas seulement celle-ci.',
    almaName: 'Alma',
    almaAsk: 'Donnez-moi l’adresse de votre site. Je le lis, je vous montre ma lecture — et vous gardez le dernier mot.',
    almaDescribe: 'Pas de site ? Répondez à quelques questions : je reconstitue votre contexte à partir de vos réponses.',
    almaAnalyzing: 'J’analyse la source que vous m’avez donnée…',
    scanReading: 'Lecture',
    almaReview: 'Voici ma lecture. Elle n’est pas gravée dans le marbre — corrigez tout ce qui doit l’être.',
    domainLabel: 'L’adresse de votre site web',
    domainPlaceholder: 'votre-entreprise.fr',
    domainHint: 'Lecture de démonstration à partir de votre domaine — une base à confirmer ensemble, pas un audit. Rien n’est enregistré sans votre accord.',
    analyze: 'Analyser mon site',
    willReadLabel: 'Ce que je lis pour vous',
    willReadInline: 'votre activité, votre offre, vos clients et votre vocabulaire métier.',
    noSite: 'Mon entreprise n’a pas encore de site',
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
    kicker: 'Company · 2 of 5',
    title: 'One link is all I need to understand your company.',
    lead: 'Paste your website address. I read it in seconds and rebuild your business, your offer, your customers and your vocabulary — then you validate, point by point. I invent nothing.',
    reviewTitle: 'Here is what I understand about your company.',
    reviewLead: 'Confirm what’s right, correct the rest. This context will serve every mission, not just this one.',
    almaName: 'Alma',
    almaAsk: 'Give me your website address. I’ll read it, show you my reading — and you keep the final say.',
    almaDescribe: 'No website? Answer a few questions: I’ll rebuild your context from your answers.',
    almaAnalyzing: 'Analyzing the source you gave me…',
    scanReading: 'Reading',
    almaReview: 'Here is my reading. It’s not set in stone — correct anything that needs it.',
    domainLabel: 'Your website address',
    domainPlaceholder: 'your-company.com',
    domainHint: 'A demonstration reading from your domain — a starting point to confirm together, not an audit. Nothing is saved without your consent.',
    analyze: 'Analyze my site',
    willReadLabel: 'What I read for you',
    willReadInline: 'your business, your offer, your customers and your business vocabulary.',
    noSite: 'My company doesn’t have a website yet',
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
