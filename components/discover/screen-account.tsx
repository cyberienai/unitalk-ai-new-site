'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Loader2, Mail } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { startSession } from '@/app/actions/auth'
import type { AuthProvider } from '@/lib/mock-auth'
import { UnitalkLogo } from '@/components/unitalk-logo'

// Screen 0 — account creation. Intentionally the simplest surface of the whole
// flow: a logo, one promise, three ways in. No password, no credit card, no
// company details. Each action creates a REAL (simulated) session cookie, then
// hands off to the first step — so the user is never asked to sign in again,
// and the Workspace opens directly at the end of the flow.
export function ScreenAccount({ lang, onAuthenticated }: { lang: Lang; onAuthenticated: () => void }) {
  const reduce = useReducedMotion()
  const t = COPY[lang]
  const [pending, setPending] = useState<AuthProvider | null>(null)

  async function go(provider: AuthProvider) {
    if (pending) return
    setPending(provider)
    try {
      // Create the session up front — the account exists from the very first
      // screen, so the journey ends by opening the Workspace, not by re-login.
      await startSession(provider)
      onAuthenticated()
    } catch {
      setPending(null)
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-[440px] flex-col items-center justify-center py-10 text-center">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="w-full"
      >
        <div className="flex justify-center">
          <UnitalkLogo size={30} />
        </div>

        <h1 className="mt-7 text-balance font-sf text-[clamp(1.6rem,4vw,2.15rem)] font-semibold leading-tight tracking-[-0.03em] text-[#1C1A17]">
          {t.title}
        </h1>
        <p className="mt-3 text-pretty text-[15px] leading-relaxed text-[#4E483F]">{t.subtitle}</p>

        <div className="mt-9 flex flex-col gap-3">
          {/* The three ways in share one visual weight: no option is pushed
              ahead of the others — the user simply picks what they already use. */}
          <AuthButton onClick={() => go('google')} pending={pending === 'google'} disabled={!!pending}>
            <GoogleMark />
            {t.google}
          </AuthButton>

          <AuthButton onClick={() => go('microsoft')} pending={pending === 'microsoft'} disabled={!!pending}>
            <MicrosoftMark />
            {t.microsoft}
          </AuthButton>

          <div className="relative my-1 flex items-center gap-3">
            <span className="h-px flex-1 bg-[#E4DDCE]" />
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#8A8175]">{t.or}</span>
            <span className="h-px flex-1 bg-[#E4DDCE]" />
          </div>

          <AuthButton onClick={() => go('email')} pending={pending === 'email'} disabled={!!pending}>
            <Mail className="h-[18px] w-[18px] text-[#6E665A]" />
            {t.email}
          </AuthButton>
        </div>

        <p className="mt-7 text-[12px] leading-relaxed text-[#6E665A]">{t.reassure}</p>
      </motion.div>
    </div>
  )
}

// One shared button style for all three sign-in options — equal visual weight.
function AuthButton({
  children,
  onClick,
  pending,
  disabled,
}: {
  children: React.ReactNode
  onClick: () => void
  pending: boolean
  disabled: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-busy={pending}
      className="group inline-flex h-12 items-center justify-center gap-3 rounded-xl border border-[#E4DDCE] bg-white px-5 text-[15px] font-semibold text-[#1C1A17] shadow-[0_1px_0_rgba(255,255,255,0.7)_inset,0_10px_24px_-18px_rgba(28,26,23,0.5)] transition-colors hover:border-[#D8D0C2] hover:bg-[#FBF9F3] disabled:cursor-wait disabled:opacity-70"
    >
      {pending ? <Loader2 className="h-[18px] w-[18px] animate-spin text-[#6E665A]" /> : children}
    </button>
  )
}

function GoogleMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[18px] w-[18px]">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.56c2.08-1.92 3.28-4.74 3.28-8.09Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.76c-.98.66-2.24 1.06-3.72 1.06-2.86 0-5.28-1.93-6.15-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.85 14.11a6.6 6.6 0 0 1 0-4.22V7.05H2.18a11 11 0 0 0 0 9.9l3.67-2.84Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.05l3.67 2.84C6.72 7.31 9.14 5.38 12 5.38Z"
      />
    </svg>
  )
}

function MicrosoftMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[18px] w-[18px]">
      <path fill="#F25022" d="M3 3h8.5v8.5H3z" />
      <path fill="#7FBA00" d="M12.5 3H21v8.5h-8.5z" />
      <path fill="#00A4EF" d="M3 12.5h8.5V21H3z" />
      <path fill="#FFB900" d="M12.5 12.5H21V21h-8.5z" />
    </svg>
  )
}

const COPY = {
  fr: {
    title: 'Créez votre compte Unitalk.',
    subtitle: 'Utilisez votre adresse professionnelle pour commencer.',
    google: 'Continuer avec Google',
    microsoft: 'Continuer avec Microsoft',
    email: 'Recevoir un lien par email',
    or: 'ou',
    reassure: 'Aucun mot de passe, aucune carte bancaire. Vous pourrez tout ajuster ensuite.',
  },
  en: {
    title: 'Create your Unitalk account.',
    subtitle: 'Use your work email to get started.',
    google: 'Continue with Google',
    microsoft: 'Continue with Microsoft',
    email: 'Get a link by email',
    or: 'or',
    reassure: 'No password, no credit card. You can adjust everything later.',
  },
} as const
