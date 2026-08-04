'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowRight, ArrowLeft, Check, ShieldCheck, Clock, FileText, Wallet, Sparkles, PlugZap } from 'lucide-react'
import { useLanguage, type Lang } from '@/lib/language-context'
import { getMission, DELAY_TBD } from '@/lib/missions-catalog'
import { ROLE_DETAILS } from '@/lib/collaborators-catalog'
import { missionQuestions } from '@/lib/mission-questions'

type Copy = {
  stepIdentify: string
  stepComplete: string
  stepLaunch: string
  confideTitle: string
  missionWord: string
  deliverableWord: string
  delayWord: string
  handledByWord: string
  profileWord: string
  collaboratorWord: string
  identifyTitle: string
  identifyLead: string
  emailLabel: string
  emailPlaceholder: string
  emailError: string
  identifyCta: string
  keepNote: string
  noAccountNote: string
  completeTitle: string
  completeLead: string
  optionalWord: string
  noToolTitle: string
  noToolBody: string
  continueCta: string
  backWord: string
  recapTitle: string
  recapLead: string
  validationsWord: string
  priceWord: string
  priceValue: string
  capWord: string
  capValue: string
  addedNote: string
  launchCta: string
  missingTitle: string
  missingBody: string
  browseCta: string
}

const T: Record<Lang, Copy> = {
  fr: {
    stepIdentify: 'Identifier',
    stepComplete: 'Préciser',
    stepLaunch: 'Lancer',
    confideTitle: 'Confier cette Mission',
    missionWord: 'Mission',
    deliverableWord: 'Livrable',
    delayWord: 'Délai',
    handledByWord: 'Réalisée par',
    profileWord: 'Profil mobilisé',
    collaboratorWord: 'Collaborateur IA',
    identifyTitle: 'Où envoyer votre proposition ?',
    identifyLead: 'Indiquez votre adresse professionnelle. Votre Mission et vos choix sont conservés.',
    emailLabel: 'Adresse professionnelle',
    emailPlaceholder: 'vous@votre-entreprise.com',
    emailError: 'Merci d’indiquer une adresse professionnelle valide.',
    identifyCta: 'Recevoir ma proposition',
    keepNote: 'Votre Mission est conservée à chaque étape.',
    noAccountNote: 'Pas de compte à créer maintenant.',
    completeTitle: 'Quelques précisions',
    completeLead: 'Notre conseillère IA a besoin de l’essentiel pour préparer la Mission. Le reste s’enrichit après le lancement.',
    optionalWord: 'facultatif',
    noToolTitle: 'Pas d’outil à connecter maintenant',
    noToolBody: 'Si vos outils ne sont pas connectés, votre Collaborateur IA prépare un fichier ou une liste dans le Workspace. Vous relierez vos outils plus tard.',
    continueCta: 'Continuer',
    backWord: 'Retour',
    recapTitle: 'Prêt à lancer votre Mission',
    recapLead: 'Vérifiez l’essentiel. Vous gardez la main à chaque validation.',
    validationsWord: 'Validations',
    priceWord: 'Budget',
    priceValue: 'Budget d’essai inclus',
    capWord: 'Plafond de dépense',
    capValue: 'Plafonné pour cette Mission — aucun dépassement sans votre accord.',
    addedNote: 'Votre Collaborateur IA est ajouté à votre organisation.',
    launchCta: 'Lancer la Mission',
    missingTitle: 'Choisissez d’abord une Mission',
    missingBody: 'Parcourez le catalogue et sélectionnez la Mission que vous voulez confier.',
    browseCta: 'Voir les Missions',
  },
  en: {
    stepIdentify: 'Identify',
    stepComplete: 'Specify',
    stepLaunch: 'Launch',
    confideTitle: 'Hand over this Mission',
    missionWord: 'Mission',
    deliverableWord: 'Deliverable',
    delayWord: 'Timeline',
    handledByWord: 'Handled by',
    profileWord: 'Profile mobilized',
    collaboratorWord: 'AI Collaborator',
    identifyTitle: 'Where should we send your proposal?',
    identifyLead: 'Enter your work email. Your Mission and your choices are kept.',
    emailLabel: 'Work email',
    emailPlaceholder: 'you@your-company.com',
    emailError: 'Please enter a valid work email.',
    identifyCta: 'Get my proposal',
    keepNote: 'Your Mission is kept at every step.',
    noAccountNote: 'No account to create right now.',
    completeTitle: 'A few details',
    completeLead: 'Our AI advisor needs the essentials to prepare the Mission. The rest is enriched after launch.',
    optionalWord: 'optional',
    noToolTitle: 'No tool to connect right now',
    noToolBody: 'If your tools aren’t connected, your AI Collaborator prepares a file or a list in the Workspace. You’ll connect your tools later.',
    continueCta: 'Continue',
    backWord: 'Back',
    recapTitle: 'Ready to launch your Mission',
    recapLead: 'Check the essentials. You stay in control at every approval.',
    validationsWord: 'Approvals',
    priceWord: 'Budget',
    priceValue: 'Trial budget included',
    capWord: 'Spending cap',
    capValue: 'Capped for this Mission — no overrun without your approval.',
    addedNote: 'Your AI Collaborator is added to your organization.',
    launchCta: 'Launch the Mission',
    missingTitle: 'Pick a Mission first',
    missingBody: 'Browse the catalog and select the Mission you want to hand over.',
    browseCta: 'See Missions',
  },
}

const STEPS: (keyof Pick<Copy, 'stepIdentify' | 'stepComplete' | 'stepLaunch'>)[] = ['stepIdentify', 'stepComplete', 'stepLaunch']

export function ConfierContent() {
  const { lang } = useLanguage()
  const t = T[lang]
  const router = useRouter()
  const params = useSearchParams()
  const slug = params.get('mission') ?? ''
  const mission = getMission(slug)

  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [emailTouched, setEmailTouched] = useState(false)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const questions = useMemo(() => (mission ? missionQuestions(mission.category) : []), [mission])
  const collab = mission ? ROLE_DETAILS[mission.collaboratorSlug] : undefined
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())

  // No Mission selected — guide back to the catalog rather than a dead end.
  if (!mission) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-5 py-24 text-center">
        <h1 className="font-sf text-2xl font-bold tracking-[-0.02em] text-[#1C1A17]">{t.missingTitle}</h1>
        <p className="mt-3 text-pretty leading-relaxed text-[#5F594F]">{t.missingBody}</p>
        <Link
          href="/missions"
          className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-[#D10E63] px-5 py-3 text-sm font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5"
        >
          {t.browseCta}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </main>
    )
  }

  function launch() {
    router.push(`/workspace?mission=${encodeURIComponent(slug)}&launched=1`)
  }

  return (
    <main className="px-5 py-10 sm:px-8 sm:py-14">
      <div className="mx-auto max-w-2xl">
        {/* Progress */}
        <ol className="flex items-center gap-2" aria-label="Progression">
          {STEPS.map((key, i) => {
            const n = i + 1
            const done = n < step
            const active = n === step
            return (
              <li key={key} className="flex flex-1 items-center gap-2">
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold transition-colors ${
                    done ? 'bg-[#22A06B] text-[#F3EFE6]' : active ? 'bg-[#D10E63] text-[#FBF9F3]' : 'bg-[#E4DDCE] text-[#8A8175]'
                  }`}
                >
                  {done ? <Check className="h-3.5 w-3.5" /> : n}
                </span>
                <span className={`text-xs font-semibold ${active ? 'text-[#1C1A17]' : 'text-[#8A8175]'}`}>{t[key]}</span>
                {i < STEPS.length - 1 && <span className="ml-1 hidden h-px flex-1 bg-[#E4DDCE] sm:block" />}
              </li>
            )
          })}
        </ol>

        {/* Mission summary — always visible, the Mission is never lost */}
        <div className="mt-6 rounded-3xl border border-[#E4DDCE] bg-[#FBF9F3] p-5">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A8175]">{t.confideTitle}</p>
          <h1 className="mt-2 font-sf text-xl font-bold tracking-[-0.02em] text-[#1C1A17] sm:text-2xl">{mission.title[lang]}</h1>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="flex items-start gap-2.5">
              <FileText className="mt-0.5 h-4 w-4 shrink-0 text-[#D10E63]" />
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wide text-[#8A8175]">{t.deliverableWord}</p>
                <p className="text-sm leading-snug text-[#3F3A33]">{mission.deliverable[lang]}</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#D10E63]" />
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wide text-[#8A8175]">{t.delayWord}</p>
                <p className="text-sm leading-snug text-[#3F3A33]">{DELAY_TBD[lang]}</p>
              </div>
            </div>
          </div>
          {collab && (
            <div className="mt-4 flex items-center gap-3 border-t border-[#E4DDCE] pt-4">
              <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
                <Image src={collab.avatar || '/placeholder.svg'} alt={collab.name} fill className="object-cover" sizes="40px" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-bold text-[#1C1A17]">
                  {collab.name} <span className="font-normal text-[#8A8175]">· {t.collaboratorWord}</span>
                </p>
                <p className="truncate text-xs text-[#6E665A]">
                  {t.profileWord} : <span className="font-semibold text-[#D10E63]">{mission.profile[lang]}</span>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Step 1 — Identify */}
        {step === 1 && (
          <section className="mt-6 rounded-3xl border border-[#E4DDCE] bg-[#F3EFE6] p-6">
            <h2 className="font-sf text-lg font-bold tracking-[-0.01em] text-[#1C1A17]">{t.identifyTitle}</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#5F594F]">{t.identifyLead}</p>
            <label className="mt-5 block">
              <span className="text-xs font-bold uppercase tracking-wide text-[#8A8175]">{t.emailLabel}</span>
              <input
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setEmailTouched(true)}
                placeholder={t.emailPlaceholder}
                className="mt-1.5 w-full rounded-2xl border border-[#DCD4C4] bg-[#FBF9F3] px-4 py-3 text-sm text-[#1C1A17] outline-none transition-colors placeholder:text-[#A79F91] focus:border-[#D10E63] focus:ring-2 focus:ring-[#D10E63]/25"
              />
              {emailTouched && !emailValid && <span className="mt-1.5 block text-xs font-medium text-[#C0392B]">{t.emailError}</span>}
            </label>
            <button
              onClick={() => (emailValid ? setStep(2) : setEmailTouched(true))}
              className="mt-5 flex w-full items-center justify-center gap-1.5 rounded-full bg-[#D10E63] px-5 py-3 text-sm font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5"
            >
              {t.identifyCta}
              <ArrowRight className="h-4 w-4" />
            </button>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-[#6E665A]">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-[#22A06B]" />
                {t.keepNote}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-[#22A06B]" />
                {t.noAccountNote}
              </span>
            </div>
          </section>
        )}

        {/* Step 2 — Complete only the necessary */}
        {step === 2 && (
          <section className="mt-6 rounded-3xl border border-[#E4DDCE] bg-[#F3EFE6] p-6">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#D10E63]" />
              <h2 className="font-sf text-lg font-bold tracking-[-0.01em] text-[#1C1A17]">{t.completeTitle}</h2>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-[#5F594F]">{t.completeLead}</p>

            <div className="mt-5 space-y-5">
              {questions.map((q) => (
                <div key={q.id}>
                  <label className="block">
                    <span className="text-sm font-semibold text-[#1C1A17]">
                      {q.label[lang]}
                      {q.optional && <span className="ml-1.5 text-xs font-normal text-[#8A8175]">({t.optionalWord})</span>}
                    </span>
                    {q.type === 'choice' ? (
                      <div className="mt-2 flex flex-col gap-2">
                        {q.options?.map((opt) => {
                          const selected = answers[q.id] === opt[lang]
                          return (
                            <button
                              key={opt.en}
                              type="button"
                              onClick={() => setAnswers((a) => ({ ...a, [q.id]: opt[lang] }))}
                              className={`flex items-center gap-2.5 rounded-2xl border px-4 py-2.5 text-left text-sm transition-colors ${
                                selected
                                  ? 'border-[#D10E63] bg-[#D10E63]/[0.06] font-semibold text-[#1C1A17]'
                                  : 'border-[#DCD4C4] bg-[#FBF9F3] text-[#3F3A33] hover:border-[#D10E63]/40'
                              }`}
                            >
                              <span
                                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                                  selected ? 'border-[#D10E63] bg-[#D10E63]' : 'border-[#BDB4A3]'
                                }`}
                              >
                                {selected && <span className="h-1.5 w-1.5 rounded-full bg-[#FBF9F3]" />}
                              </span>
                              {opt[lang]}
                            </button>
                          )
                        })}
                      </div>
                    ) : q.type === 'textarea' ? (
                      <textarea
                        rows={3}
                        value={answers[q.id] ?? ''}
                        onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
                        placeholder={q.placeholder[lang]}
                        className="mt-1.5 w-full resize-none rounded-2xl border border-[#DCD4C4] bg-[#FBF9F3] px-4 py-3 text-sm text-[#1C1A17] outline-none transition-colors placeholder:text-[#A79F91] focus:border-[#D10E63] focus:ring-2 focus:ring-[#D10E63]/25"
                      />
                    ) : (
                      <input
                        type="text"
                        value={answers[q.id] ?? ''}
                        onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
                        placeholder={q.placeholder[lang]}
                        className="mt-1.5 w-full rounded-2xl border border-[#DCD4C4] bg-[#FBF9F3] px-4 py-3 text-sm text-[#1C1A17] outline-none transition-colors placeholder:text-[#A79F91] focus:border-[#D10E63] focus:ring-2 focus:ring-[#D10E63]/25"
                      />
                    )}
                  </label>
                </div>
              ))}
            </div>

            {/* No-integration reassurance */}
            <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[#DCD4C4] bg-[#FBF9F3] p-4">
              <PlugZap className="mt-0.5 h-4 w-4 shrink-0 text-[#D10E63]" />
              <div>
                <p className="text-sm font-bold text-[#1C1A17]">{t.noToolTitle}</p>
                <p className="mt-1 text-sm leading-relaxed text-[#5F594F]">{t.noToolBody}</p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-3">
              <button
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#DCD4C4] px-4 py-2.5 text-sm font-semibold text-[#3F3A33] transition-colors hover:border-[#1C1A17]"
              >
                <ArrowLeft className="h-4 w-4" />
                {t.backWord}
              </button>
              <button
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#D10E63] px-5 py-3 text-sm font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5"
              >
                {t.continueCta}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </section>
        )}

        {/* Step 3 — Confirm & launch */}
        {step === 3 && (
          <section className="mt-6 rounded-3xl border border-[#E4DDCE] bg-[#F3EFE6] p-6">
            <h2 className="font-sf text-lg font-bold tracking-[-0.01em] text-[#1C1A17]">{t.recapTitle}</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#5F594F]">{t.recapLead}</p>

            <dl className="mt-5 divide-y divide-[#E4DDCE] rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3]">
              <div className="flex items-start gap-3 p-4">
                <FileText className="mt-0.5 h-4 w-4 shrink-0 text-[#D10E63]" />
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-wide text-[#8A8175]">{t.deliverableWord}</dt>
                  <dd className="text-sm text-[#3F3A33]">{mission.deliverable[lang]}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#D10E63]" />
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-wide text-[#8A8175]">{t.delayWord}</dt>
                  <dd className="text-sm text-[#3F3A33]">{DELAY_TBD[lang]}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#D10E63]" />
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-wide text-[#8A8175]">{t.validationsWord}</dt>
                  <dd className="text-sm text-[#3F3A33]">{mission.validation[lang]}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4">
                <Wallet className="mt-0.5 h-4 w-4 shrink-0 text-[#D10E63]" />
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-wide text-[#8A8175]">{t.priceWord}</dt>
                  <dd className="text-sm text-[#3F3A33]">{t.priceValue}</dd>
                  <dd className="mt-0.5 text-xs text-[#6E665A]">{t.capValue}</dd>
                </div>
              </div>
              {collab && (
                <div className="flex items-center gap-3 p-4">
                  <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full">
                    <Image src={collab.avatar || '/placeholder.svg'} alt={collab.name} fill className="object-cover" sizes="36px" />
                  </span>
                  <div className="min-w-0">
                    <dt className="text-[11px] font-bold uppercase tracking-wide text-[#8A8175]">{t.handledByWord}</dt>
                    <dd className="text-sm text-[#3F3A33]">
                      {collab.name} · <span className="font-semibold text-[#D10E63]">{mission.profile[lang]}</span>
                    </dd>
                  </div>
                </div>
              )}
            </dl>

            <p className="mt-4 flex items-center gap-2 text-xs text-[#6E665A]">
              <Check className="h-3.5 w-3.5 text-[#22A06B]" />
              {t.addedNote}
            </p>

            <div className="mt-6 flex items-center justify-between gap-3">
              <button
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#DCD4C4] px-4 py-2.5 text-sm font-semibold text-[#3F3A33] transition-colors hover:border-[#1C1A17]"
              >
                <ArrowLeft className="h-4 w-4" />
                {t.backWord}
              </button>
              <button
                onClick={launch}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#D10E63] px-6 py-3 text-sm font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5"
              >
                {t.launchCta}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </section>
        )}

        {/* Link back to the Mission sheet */}
        <div className="mt-6 text-center">
          <Link
            href={`/missions/${slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8A8175] underline-offset-4 transition-colors hover:text-[#D10E63] hover:underline"
          >
            <ArrowLeft className="h-3 w-3" />
            {mission.title[lang]}
          </Link>
        </div>
      </div>
    </main>
  )
}
