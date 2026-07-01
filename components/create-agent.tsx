'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { UnitalkLogo } from './unitalk-logo'
import { useLanguage } from '@/lib/language-context'

const ease = [0.22, 1, 0.36, 1] as const

type Step = 'welcome' | 'preparing' | 'slot' | 'confirm' | 'done'

const T = {
  fr: {
    // Welcome
    greeting: 'Bonjour, je suis Alma.',
    welcomeTitle: 'Nous allons créer votre agent ensemble.',
    welcomeBody:
      'En quelques minutes, je découvre votre entreprise, je vous appelle et je prépare votre premier agent à travailler. J’ai simplement besoin de quelques informations pour vous rappeler.',
    firstName: 'Prénom',
    lastName: 'Nom',
    email: 'Email professionnel',
    domain: 'Nom de domaine',
    phone: 'Téléphone',
    emailPh: 'vous@entreprise.fr',
    domainPh: 'entreprise.fr',
    phonePh: '+33 6 12 34 56 78',
    continue: 'Continuer',
    reassure1: 'Essai gratuit de 7 jours',
    reassure2: 'Aucune carte bancaire',
    reassure3: 'Je vous appelle personnellement',
    haveAccount: 'Déjà un compte ?',
    signIn: 'Se connecter',
    // Preparing
    thanks: (name: string) => `Merci ${name}.`,
    preparingTitle: 'Je prépare déjà votre entreprise.',
    preparingBody:
      'Je collecte les informations publiques disponibles. Cela prend généralement moins d’une minute.',
    checks: ['Site web', 'Entreprise', 'Activité', 'Présence en ligne', 'Coordonnées'],
    // Slot
    readyTitle: 'C’est prêt.',
    slotBody: 'Choisissez le moment où je vous appelle.',
    slots: ['Maintenant', 'Dans 15 minutes', 'Cet après-midi', 'Demain'],
    confirmSlot: 'Continuer',
    // Confirm
    callTitle: 'Je vous appellerai au',
    duration: 'Durée',
    durationValue: '10 minutes',
    duringCall: 'Pendant cet appel :',
    during: [
      'je découvre votre entreprise',
      'je crée votre agent',
      'je le connecte à vos outils',
      'il commence à travailler',
    ],
    confirmCall: 'Confirmer l’appel',
    changeSlot: 'Changer de créneau',
    // Done
    doneTitle: 'C’est confirmé.',
    doneBody: (slot: string, phone: string) =>
      `Je vous appelle ${slot.toLowerCase()} au ${phone}. Gardez votre téléphone à portée de main — à tout de suite.`,
    doneNote: 'Vous pouvez fermer cette page, je m’occupe du reste.',
    stepLabel: (n: number, total: number) => `Étape ${n} sur ${total}`,
  },
  en: {
    greeting: 'Hello, I’m Alma.',
    welcomeTitle: 'We’ll create your agent together.',
    welcomeBody:
      'In a few minutes, I discover your company, call you and get your first agent ready to work. I just need a few details to call you back.',
    firstName: 'First name',
    lastName: 'Last name',
    email: 'Work email',
    domain: 'Domain name',
    phone: 'Phone',
    emailPh: 'you@company.com',
    domainPh: 'company.com',
    phonePh: '+1 555 123 4567',
    continue: 'Continue',
    reassure1: '7-day free trial',
    reassure2: 'No credit card',
    reassure3: 'I call you personally',
    haveAccount: 'Already have an account?',
    signIn: 'Sign in',
    thanks: (name: string) => `Thank you, ${name}.`,
    preparingTitle: 'I’m already preparing your company.',
    preparingBody:
      'I’m gathering the public information available. This usually takes less than a minute.',
    checks: ['Website', 'Company', 'Activity', 'Online presence', 'Contact details'],
    readyTitle: 'All set.',
    slotBody: 'Choose when I call you.',
    slots: ['Now', 'In 15 minutes', 'This afternoon', 'Tomorrow'],
    confirmSlot: 'Continue',
    callTitle: 'I’ll call you at',
    duration: 'Duration',
    durationValue: '10 minutes',
    duringCall: 'During this call:',
    during: [
      'I discover your company',
      'I create your agent',
      'I connect it to your tools',
      'it starts working',
    ],
    confirmCall: 'Confirm the call',
    changeSlot: 'Change time',
    doneTitle: 'It’s confirmed.',
    doneBody: (slot: string, phone: string) =>
      `I’ll call you ${slot.toLowerCase()} at ${phone}. Keep your phone close — talk to you soon.`,
    doneNote: 'You can close this page, I’ll take care of the rest.',
    stepLabel: (n: number, total: number) => `Step ${n} of ${total}`,
  },
}

function AlmaBadge({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative shrink-0">
        <img
          src="/alma-avatar.png"
          alt="Alma"
          className="h-11 w-11 rounded-full object-cover ring-2 ring-[#D10E63]/30"
        />
        <span
          className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#F3EFE6] bg-[#4F5BD5]"
          aria-hidden="true"
        />
      </div>
      <div>
        <p className="text-sm font-semibold text-[#1C1A17]">Alma</p>
        <p className="text-[11px] text-[#857C6E]">{label}</p>
      </div>
    </div>
  )
}

function CheckIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

export function CreateAgent() {
  const { lang } = useLanguage()
  const t = T[lang]

  const [step, setStep] = useState<Step>('welcome')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [domain, setDomain] = useState('')
  const [phone, setPhone] = useState('')
  const [slot, setSlot] = useState<string | null>(null)

  const roleLabel = lang === 'fr' ? 'Je crée vos agents et les aide à progresser' : 'I create your agents and help them grow'

  const stepIndex: Record<Step, number> = {
    welcome: 1,
    preparing: 2,
    slot: 3,
    confirm: 4,
    done: 4,
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#F3EFE6] text-[#1C1A17]">
      {/* Soft magenta glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full opacity-[0.14] blur-[130px]"
        style={{ background: 'radial-gradient(circle, rgba(209,14,99,0.4), transparent 70%)' }}
        aria-hidden="true"
      />

      {/* Brand */}
      <div className="relative z-10 flex justify-center pt-10">
        <a href="/" className="inline-flex items-center gap-2.5">
          <UnitalkLogo size={28} />
          <span className="text-base font-semibold text-[#1C1A17]">Unitalk AI</span>
        </a>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-lg flex-col px-5 py-10 sm:py-14">
        {/* Progress */}
        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between text-[11px] font-medium uppercase tracking-wider text-[#857C6E]">
            <span>{t.stepLabel(stepIndex[step], 4)}</span>
          </div>
          <div className="h-1 w-full overflow-hidden rounded-full bg-[#E4DCCC]">
            <motion.div
              className="h-full rounded-full bg-[#D10E63]"
              initial={false}
              animate={{ width: `${(stepIndex[step] / 4) * 100}%` }}
              transition={{ duration: 0.5, ease }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* STEP 1 — Welcome + form */}
          {step === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease }}
            >
              <AlmaBadge label={roleLabel} />
              <h1
                className="mt-6 font-sf font-bold text-[#1C1A17] text-balance"
                style={{ fontSize: 'clamp(1.7rem, 4vw, 2.4rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
              >
                <span className="text-[#D10E63]">{t.greeting}</span> {t.welcomeTitle}
              </h1>
              <p className="mt-4 text-[15px] leading-relaxed text-[#4E483F]">{t.welcomeBody}</p>

              <form
                className="mt-8 flex flex-col gap-4"
                onSubmit={(e) => {
                  e.preventDefault()
                  setStep('preparing')
                }}
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label={t.firstName} value={firstName} onChange={setFirstName} autoComplete="given-name" required />
                  <Field label={t.lastName} value={lastName} onChange={setLastName} autoComplete="family-name" required />
                </div>
                <Field label={t.email} value={email} onChange={setEmail} type="email" placeholder={t.emailPh} autoComplete="email" required />
                <Field label={t.domain} value={domain} onChange={setDomain} placeholder={t.domainPh} required />
                <Field label={t.phone} value={phone} onChange={setPhone} type="tel" placeholder={t.phonePh} autoComplete="tel" required />

                <button
                  type="submit"
                  className="mt-2 flex h-12 items-center justify-center gap-2 rounded-xl bg-[#D10E63] text-sm font-semibold text-[#FBF9F3] transition-colors hover:bg-[#B00B52]"
                >
                  {t.continue}
                  <ArrowIcon />
                </button>
              </form>

              <div className="mt-7 flex flex-col gap-2.5">
                {[t.reassure1, t.reassure2, t.reassure3].map((r) => (
                  <div key={r} className="flex items-center gap-2.5 text-sm text-[#4E483F]">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#4F5BD5]/12 text-[#4F5BD5]">
                      <CheckIcon />
                    </span>
                    {r}
                  </div>
                ))}
              </div>

              <p className="mt-8 text-center text-sm text-[#4E483F]">
                {t.haveAccount}{' '}
                <a href="#" className="font-medium text-[#D10E63] underline underline-offset-2 hover:text-[#B00B52]">
                  {t.signIn}
                </a>
              </p>
            </motion.div>
          )}

          {/* STEP 2 — Preparing */}
          {step === 'preparing' && (
            <PreparingStep
              key="preparing"
              t={t}
              firstName={firstName || (lang === 'fr' ? 'à vous' : 'you')}
              onDone={() => setStep('slot')}
            />
          )}

          {/* STEP 3 — Slot */}
          {step === 'slot' && (
            <motion.div
              key="slot"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease }}
            >
              <AlmaBadge label={roleLabel} />
              <h1
                className="mt-6 font-sf font-bold text-[#1C1A17] text-balance"
                style={{ fontSize: 'clamp(1.7rem, 4vw, 2.4rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
              >
                <span className="text-[#4F5BD5]">{t.readyTitle}</span> {t.slotBody}
              </h1>

              <div className="mt-8 flex flex-col gap-3">
                {t.slots.map((s) => {
                  const active = slot === s
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSlot(s)}
                      className={`flex items-center justify-between rounded-xl border px-5 py-4 text-left text-[15px] font-medium transition-colors ${
                        active
                          ? 'border-[#D10E63] bg-[#FBF9F3] text-[#1C1A17]'
                          : 'border-[#DcD4C4] bg-[#FBF9F3] text-[#4E483F] hover:border-[#B8AE9A]'
                      }`}
                    >
                      {s}
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${
                          active ? 'border-[#D10E63] bg-[#D10E63] text-[#FBF9F3]' : 'border-[#CDC3B1] text-transparent'
                        }`}
                      >
                        <CheckIcon />
                      </span>
                    </button>
                  )
                })}
              </div>

              <button
                type="button"
                disabled={!slot}
                onClick={() => setStep('confirm')}
                className="mt-8 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#D10E63] text-sm font-semibold text-[#FBF9F3] transition-colors hover:bg-[#B00B52] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {t.confirmSlot}
                <ArrowIcon />
              </button>
            </motion.div>
          )}

          {/* STEP 4 — Confirm call */}
          {step === 'confirm' && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease }}
            >
              <AlmaBadge label={roleLabel} />

              <div className="mt-6 rounded-2xl border border-[#DcD4C4] bg-[#FBF9F3] p-6">
                <p className="text-sm text-[#857C6E]">{t.callTitle}</p>
                <p className="mt-1 font-sf text-2xl font-bold tracking-tight text-[#1C1A17]">
                  {phone || t.phonePh}
                </p>
                <div className="mt-4 flex items-center gap-2 text-sm text-[#4E483F]">
                  <span className="text-[#857C6E]">{t.duration} :</span>
                  <span className="font-medium text-[#1C1A17]">{t.durationValue}</span>
                </div>
              </div>

              <p className="mt-6 text-sm font-medium text-[#1C1A17]">{t.duringCall}</p>
              <div className="mt-3 flex flex-col gap-2.5">
                {t.during.map((d) => (
                  <div key={d} className="flex items-center gap-2.5 text-sm text-[#4E483F]">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#4F5BD5]/12 text-[#4F5BD5]">
                      <CheckIcon />
                    </span>
                    {d}
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setStep('done')}
                className="mt-8 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#D10E63] text-sm font-semibold text-[#FBF9F3] transition-colors hover:bg-[#B00B52]"
              >
                {t.confirmCall}
                <ArrowIcon />
              </button>
              <button
                type="button"
                onClick={() => setStep('slot')}
                className="mt-3 w-full text-center text-sm text-[#857C6E] underline underline-offset-2 hover:text-[#1C1A17]"
              >
                {t.changeSlot}
              </button>
            </motion.div>
          )}

          {/* DONE */}
          {step === 'done' && (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease }}
              className="flex flex-col items-center text-center"
            >
              <motion.div
                className="flex h-16 w-16 items-center justify-center rounded-full bg-[#4F5BD5]/12 text-[#4F5BD5]"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease, delay: 0.1 }}
              >
                <CheckIcon className="h-8 w-8" />
              </motion.div>
              <h1
                className="mt-6 font-sf font-bold text-[#1C1A17]"
                style={{ fontSize: 'clamp(1.7rem, 4vw, 2.4rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
              >
                {t.doneTitle}
              </h1>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#4E483F]">
                {t.doneBody(slot ?? t.slots[0], phone || t.phonePh)}
              </p>
              <p className="mt-6 text-sm text-[#857C6E]">{t.doneNote}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  autoComplete,
  required,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  placeholder?: string
  autoComplete?: string
  required?: boolean
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-[#857C6E]">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        className="h-12 rounded-xl border border-[#DcD4C4] bg-[#FBF9F3] px-4 text-sm text-[#1C1A17] placeholder-[#A79E8E] transition-colors focus:border-[#D10E63] focus:outline-none"
      />
    </label>
  )
}

function PreparingStep({
  t,
  firstName,
  onDone,
}: {
  t: (typeof T)['fr']
  firstName: string
  onDone: () => void
}) {
  const [progress, setProgress] = useState(0)
  const [revealed, setRevealed] = useState(0)
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone

  useEffect(() => {
    const start = Date.now()
    const total = 4200
    const interval = setInterval(() => {
      const elapsed = Date.now() - start
      const pct = Math.min(100, (elapsed / total) * 100)
      setProgress(pct)
      setRevealed(Math.min(t.checks.length, Math.floor((elapsed / total) * (t.checks.length + 0.5))))
      if (elapsed >= total) {
        clearInterval(interval)
        setTimeout(() => onDoneRef.current(), 650)
      }
    }, 60)
    return () => clearInterval(interval)
  }, [t.checks.length])

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.45, ease }}
    >
      <AlmaBadge label={t.thanks(firstName)} />
      <h1
        className="mt-6 font-sf font-bold text-[#1C1A17] text-balance"
        style={{ fontSize: 'clamp(1.7rem, 4vw, 2.4rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
      >
        {t.preparingTitle}
      </h1>
      <p className="mt-4 text-[15px] leading-relaxed text-[#4E483F]">{t.preparingBody}</p>

      <div className="mt-8 h-1.5 w-full overflow-hidden rounded-full bg-[#E4DCCC]">
        <div
          className="h-full rounded-full bg-[#D10E63] transition-[width] duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {t.checks.map((c, i) => {
          const on = i < revealed
          return (
            <div
              key={c}
              className={`flex items-center gap-3 text-[15px] transition-colors ${on ? 'text-[#1C1A17]' : 'text-[#B8AE9A]'}`}
            >
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors ${
                  on ? 'bg-[#4F5BD5]/12 text-[#4F5BD5]' : 'bg-[#E4DCCC] text-transparent'
                }`}
              >
                <CheckIcon />
              </span>
              {c}
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}
