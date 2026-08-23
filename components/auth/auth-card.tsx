'use client'

import { useRef, useState, useTransition } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { UnitalkLogo } from '@/components/unitalk-logo'
import { useLanguage } from '@/lib/language-context'
import { establishSession } from '@/app/actions/auth'
import type { AuthProvider } from '@/lib/mock-auth'
import { GoogleIcon, MicrosoftIcon } from './provider-icons'
import { localizedHref } from '@/lib/i18n-routing'

type Mode = 'sign-in' | 'sign-up'

const COPY = {
  fr: {
    signInTitle: 'Bon retour',
    signInSub: 'Connectez-vous pour retrouver votre workspace.',
    signUpTitle: 'Créer votre compte',
    signUpSub: 'Quelques secondes pour lancer votre premier Collaborateur IA.',
    google: 'Continuer avec Google',
    microsoft: 'Continuer avec Microsoft',
    or: 'ou',
    emailLabel: 'Adresse e-mail',
    emailPlaceholder: 'vous@entreprise.com',
    continue: 'Continuer',
    codeTitle: 'Vérifiez votre e-mail',
    codeSubA: 'Nous avons envoyé un code à',
    codeHint: 'Saisissez le code à 6 chiffres (démo : n’importe quel code fonctionne).',
    verify: 'Vérifier',
    resend: 'Renvoyer le code',
    back: 'Utiliser une autre méthode',
    switchToSignUpPre: 'Pas encore de compte ?',
    switchToSignUp: 'Créer un compte',
    switchToSignInPre: 'Vous avez déjà un compte ?',
    switchToSignIn: 'Se connecter',
    legal: 'En continuant, vous acceptez nos conditions et notre politique de confidentialité.',
    demo: 'Démonstration — authentification simulée, aucune donnée réelle.',
    invalidEmail: 'Entrez une adresse e-mail valide.',
  },
  en: {
    signInTitle: 'Welcome back',
    signInSub: 'Sign in to return to your workspace.',
    signUpTitle: 'Create your account',
    signUpSub: 'A few seconds to launch your first AI Collaborator.',
    google: 'Continue with Google',
    microsoft: 'Continue with Microsoft',
    or: 'or',
    emailLabel: 'Email address',
    emailPlaceholder: 'you@company.com',
    continue: 'Continue',
    codeTitle: 'Check your email',
    codeSubA: 'We sent a code to',
    codeHint: 'Enter the 6-digit code (demo: any code works).',
    verify: 'Verify',
    resend: 'Resend code',
    back: 'Use another method',
    switchToSignUpPre: 'No account yet?',
    switchToSignUp: 'Sign up',
    switchToSignInPre: 'Already have an account?',
    switchToSignIn: 'Sign in',
    legal: 'By continuing, you agree to our terms and privacy policy.',
    demo: 'Demo — simulated authentication, no real data.',
    invalidEmail: 'Enter a valid email address.',
  },
} as const

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function AuthCard({ mode, redirectTo, context = 'unitalk' }: { mode: Mode; redirectTo: string; context?: 'unitalk' | 'academy' }) {
  const { lang } = useLanguage()
  const t = COPY[lang]
  const [isPending, startTransition] = useTransition()

  const [step, setStep] = useState<'method' | 'code'>('method')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [code, setCode] = useState<string[]>(['', '', '', '', '', ''])
  const [loadingProvider, setLoadingProvider] = useState<AuthProvider | null>(null)
  const codeRefs = useRef<(HTMLInputElement | null)[]>([])

  const otherPath = context === 'academy'
    ? mode === 'sign-in' ? '/academy/inscription' : '/academy/connexion'
    : mode === 'sign-in' ? localizedHref('signUp', lang) : localizedHref('signIn', lang)
  const otherHref = `${otherPath}?redirect=${encodeURIComponent(redirectTo)}`

  function submit(provider: AuthProvider, emailValue?: string) {
    setLoadingProvider(provider)
    const fd = new FormData()
    fd.set('provider', provider)
    if (emailValue) fd.set('email', emailValue)
    fd.set('redirect', redirectTo)
    startTransition(() => establishSession(fd))
  }

  function handleEmailContinue() {
    if (!EMAIL_RE.test(email)) {
      setEmailError(t.invalidEmail)
      return
    }
    setEmailError('')
    setStep('code')
    // Focus first code box on next tick.
    requestAnimationFrame(() => codeRefs.current[0]?.focus())
  }

  function setCodeDigit(index: number, value: string) {
    const digit = value.replace(/\D/g, '').slice(-1)
    setCode((prev) => {
      const next = [...prev]
      next[index] = digit
      return next
    })
    if (digit && index < 5) codeRefs.current[index + 1]?.focus()
  }

  function handleCodeKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      codeRefs.current[index - 1]?.focus()
    }
  }

  function handleCodePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (!pasted) return
    const next = ['', '', '', '', '', '']
    for (let i = 0; i < pasted.length; i++) next[i] = pasted[i]
    setCode(next)
    codeRefs.current[Math.min(pasted.length, 5)]?.focus()
  }

  const codeComplete = code.every((d) => d !== '')
  const busy = isPending || loadingProvider !== null
  const title = context === 'academy'
    ? mode === 'sign-in' ? (lang === 'fr' ? 'Retrouvez votre parcours' : 'Return to your learning path') : (lang === 'fr' ? 'Rejoignez Unitalk Academy' : 'Join Unitalk Academy')
    : mode === 'sign-in' ? t.signInTitle : t.signUpTitle
  const subtitle = context === 'academy'
    ? mode === 'sign-in' ? (lang === 'fr' ? 'Le même compte pour vos missions, vos formations et Unitalk AI.' : 'One account for your missions, training and Unitalk AI.') : (lang === 'fr' ? 'Alma personnalisera votre première mission avant de vous ouvrir l’espace Formations.' : 'Alma will personalize your first mission before opening Training.')
    : mode === 'sign-in' ? t.signInSub : t.signUpSub

  return (
    <div className="w-full max-w-[25rem]">
      {/* Brand */}
      <div className="mb-8 flex flex-col items-center text-center">
        <a href={context === 'academy' ? '/academy' : localizedHref('home', lang)} className="mb-6 inline-flex items-center gap-2" aria-label="Unitalk">
          <UnitalkLogo size={28} />
          <span className="font-inter text-lg font-semibold text-[#1C1A17]">Unitalk</span>
        </a>
        <h1 className="font-sf text-[1.7rem] font-bold tracking-[-0.02em] text-[#1C1A17]">
          {title}
        </h1>
        <p className="mt-2 max-w-xs text-pretty text-[14px] leading-relaxed text-[#6B6560]">
          {subtitle}
        </p>
      </div>

      {/* Card */}
      <div className="rounded-[1.5rem] border border-[#E7E0D2] bg-[#FBF9F3] p-6 shadow-[0_1px_2px_rgba(28,26,23,0.04),0_12px_40px_-12px_rgba(28,26,23,0.18)] sm:p-7">
        <AnimatePresence mode="wait" initial={false}>
          {step === 'method' ? (
            <motion.div
              key="method"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
            >
              {/* SSO */}
              <div className="flex flex-col gap-3">
                <SsoButton
                  onClick={() => submit('google')}
                  disabled={busy}
                  loading={loadingProvider === 'google'}
                  icon={<GoogleIcon />}
                  label={t.google}
                />
                <SsoButton
                  onClick={() => submit('microsoft')}
                  disabled={busy}
                  loading={loadingProvider === 'microsoft'}
                  icon={<MicrosoftIcon />}
                  label={t.microsoft}
                />
              </div>

              {/* Divider */}
              <div className="my-5 flex items-center gap-3">
                <span className="h-px flex-1 bg-[#E7E0D2]" />
                <span className="text-[12px] font-medium uppercase tracking-wide text-[#A79F90]">{t.or}</span>
                <span className="h-px flex-1 bg-[#E7E0D2]" />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="auth-email" className="text-[13px] font-semibold text-[#4E483F]">
                  {t.emailLabel}
                </label>
                <input
                  id="auth-email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder={t.emailPlaceholder}
                  value={email}
                  disabled={busy}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.nativeEvent.isComposing && e.keyCode !== 229) {
                      e.preventDefault()
                      handleEmailContinue()
                    }
                  }}
                  className="h-11 rounded-xl border border-[#DDD5C7] bg-white px-3.5 text-[15px] text-[#1C1A17] outline-none transition-colors placeholder:text-[#B3AB9C] focus:border-[#D10E63] focus:ring-2 focus:ring-[#D10E63]/20"
                />
                {emailError && <p className="text-[12.5px] text-[#C0392B]">{emailError}</p>}
              </div>

              <button
                type="button"
                onClick={handleEmailContinue}
                disabled={busy}
                className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-xl bg-[#D10E63] text-[15px] font-semibold text-[#FBF9F3] transition-colors hover:bg-[#B00C54] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBF9F3] disabled:opacity-60"
              >
                {t.continue}
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="code"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="font-sf text-lg font-bold text-[#1C1A17]">{t.codeTitle}</h2>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#6B6560]">
                {t.codeSubA} <span className="font-semibold text-[#1C1A17]">{email}</span>
              </p>

              <div className="mt-5 flex justify-between gap-2" onPaste={handleCodePaste}>
                {code.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => {
                      codeRefs.current[i] = el
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    disabled={busy}
                    aria-label={`${lang === 'fr' ? 'Chiffre' : 'Digit'} ${i + 1}`}
                    onChange={(e) => setCodeDigit(i, e.target.value)}
                    onKeyDown={(e) => handleCodeKeyDown(i, e)}
                    className="h-12 w-full rounded-xl border border-[#DDD5C7] bg-white text-center font-sf text-lg font-semibold text-[#1C1A17] outline-none transition-colors focus:border-[#D10E63] focus:ring-2 focus:ring-[#D10E63]/20"
                  />
                ))}
              </div>
              <p className="mt-3 text-[12.5px] leading-relaxed text-[#A79F90]">{t.codeHint}</p>

              <button
                type="button"
                onClick={() => submit('email', email)}
                disabled={busy || !codeComplete}
                className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-xl bg-[#D10E63] text-[15px] font-semibold text-[#FBF9F3] transition-colors hover:bg-[#B00C54] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBF9F3] disabled:opacity-50"
              >
                {loadingProvider === 'email' ? <Spinner /> : t.verify}
              </button>

              <div className="mt-4 flex items-center justify-between text-[13px]">
                <button
                  type="button"
                  onClick={() => setCode(['', '', '', '', '', ''])}
                  className="font-medium text-[#B00C54] transition-colors hover:text-[#8A0A41]"
                >
                  {t.resend}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setStep('method')
                    setCode(['', '', '', '', '', ''])
                  }}
                  className="font-medium text-[#6B6560] transition-colors hover:text-[#1C1A17]"
                >
                  {t.back}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Switch mode */}
      <p className="mt-6 text-center text-[14px] text-[#6B6560]">
        {mode === 'sign-in' ? t.switchToSignUpPre : t.switchToSignInPre}{' '}
        <a href={otherHref} className="font-semibold text-[#B00C54] transition-colors hover:text-[#8A0A41]">
          {mode === 'sign-in' ? t.switchToSignUp : t.switchToSignIn}
        </a>
      </p>

      {/* Legal + demo note */}
      <p className="mx-auto mt-5 max-w-xs text-balance text-center text-[11.5px] leading-relaxed text-[#A79F90]">
        {t.legal}
      </p>
      <p className="mt-2 text-center font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#C2BAAB]">
        {t.demo}
      </p>
    </div>
  )
}

function SsoButton({
  onClick,
  disabled,
  loading,
  icon,
  label,
}: {
  onClick: () => void
  disabled: boolean
  loading: boolean
  icon: React.ReactNode
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex h-11 w-full items-center justify-center gap-2.5 rounded-xl border border-[#DDD5C7] bg-white text-[14.5px] font-semibold text-[#1C1A17] transition-colors hover:bg-[#F6F2EA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/40 disabled:opacity-60"
    >
      {loading ? <Spinner /> : icon}
      <span>{label}</span>
    </button>
  )
}

function Spinner() {
  return (
    <span
      aria-hidden="true"
      className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent opacity-70"
    />
  )
}
