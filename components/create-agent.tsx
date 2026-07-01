'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { AlmaChat } from './alma-chat'
import { UnitalkLogo } from './unitalk-logo'
import { useLanguage } from '@/lib/language-context'

const ease = [0.22, 1, 0.36, 1] as const

const T = {
  fr: {
    fastest: 'La façon la plus rapide',
    letStrong: 'Alma',
    letPre: 'Laissez ',
    letPost: ' créer votre agent',
    almaBody: 'Donnez votre nom de domaine, elle vous appelle et façonne votre agent sur mesure — sans formulaire.',
    createAccount: 'Créer votre compte',
    trial: 'Essai de 7 jours · sans carte bancaire.',
    continueWith: 'Continuer avec',
    orEmail: 'ou par email',
    emailLabel: 'Adresse email professionnelle',
    emailPlaceholder: 'vous@entreprise.fr',
    continueEmail: 'Continuer avec l’email',
    termsPre: 'En continuant, vous acceptez les ',
    termsLink: 'conditions d’utilisation',
    termsMid: ' et la ',
    privacyLink: 'politique de confidentialité',
    haveAccount: 'Déjà un compte ?',
    signIn: 'Se connecter',
  },
  en: {
    fastest: 'The fastest way',
    letStrong: 'Alma',
    letPre: 'Let ',
    letPost: ' build your agent',
    almaBody: 'Give your domain name, she calls you and crafts your custom agent — no forms.',
    createAccount: 'Create your account',
    trial: '7-day trial · no credit card.',
    continueWith: 'Continue with',
    orEmail: 'or by email',
    emailLabel: 'Work email address',
    emailPlaceholder: 'you@company.com',
    continueEmail: 'Continue with email',
    termsPre: 'By continuing, you accept the ',
    termsLink: 'terms of use',
    termsMid: ' and the ',
    privacyLink: 'privacy policy',
    haveAccount: 'Already have an account?',
    signIn: 'Sign in',
  },
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
    </svg>
  )
}

function SlackIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#36C5F0" d="M9 2.5A2.5 2.5 0 1 0 9 7.5H11.5V5A2.5 2.5 0 0 0 9 2.5z" />
      <path fill="#2EB67D" d="M21.5 9A2.5 2.5 0 1 0 16.5 9V11.5H19A2.5 2.5 0 0 0 21.5 9z" />
      <path fill="#ECB22E" d="M15 21.5A2.5 2.5 0 1 0 15 16.5H12.5V19A2.5 2.5 0 0 0 15 21.5z" />
      <path fill="#E01E5A" d="M2.5 15A2.5 2.5 0 1 0 7.5 15V12.5H5A2.5 2.5 0 0 0 2.5 15z" />
    </svg>
  )
}

function TeamsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#5059C9" d="M17 8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM22 10h-5.2c-.4 0-.8.4-.8.8v5.4c0 1.9 1.3 3.6 3.2 3.8A3.5 3.5 0 0 0 23 16.5v-5c0-.8-.6-1.5-1-1.5z" />
      <path fill="#7B83EB" d="M13.5 8.5A3 3 0 1 0 13.5 2.5a3 3 0 0 0 0 6zM15.8 10H6.2c-.7 0-1.2.6-1.2 1.3v6c0 3 2.4 5.6 5.4 5.7A5.7 5.7 0 0 0 16 17.3v-6c0-.7-.5-1.3-1.2-1.3z" />
      <path fill="#fff" d="M11.5 8.2H4.3v-1h7.2zM7.1 8.7h1.4v6.2H7.1z" opacity=".9" />
    </svg>
  )
}

const SSO = [
  { label: 'Google', Icon: GoogleIcon },
  { label: 'Slack', Icon: SlackIcon },
  { label: 'Teams', Icon: TeamsIcon },
]

export function CreateAgent() {
  const [email, setEmail] = useState('')
  const { lang } = useLanguage()
  const t = T[lang]

  return (
    <main className="min-h-screen w-full bg-[#0A0A0A] text-white lg:grid lg:grid-cols-2">
      {/* Left: Alma — domain + call */}
      <section className="relative flex flex-col justify-center overflow-hidden border-b border-white/[0.06] px-5 py-14 sm:px-8 lg:border-b-0 lg:border-r lg:py-16">
        {/* Soft magenta glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/3 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full opacity-30 blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(255,0,153,0.35), transparent 70%)' }}
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto flex w-full max-w-md flex-col items-center">
          <motion.div
            className="mb-8 text-center"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#8A8A92]">
              {t.fastest}
            </p>
            <h2
              className="mt-3 font-heading font-light text-white text-balance"
              style={{ fontSize: 'clamp(1.9rem, 4vw, 2.75rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
            >
              {t.letPre}<span className="italic text-[#FF0099]">{t.letStrong}</span>{t.letPost}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#B4B4BC]">
              {t.almaBody}
            </p>
          </motion.div>

          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease, delay: 0.1 }}
          >
            <AlmaChat />
          </motion.div>
        </div>
      </section>

      {/* Right: email + SSO */}
      <section className="relative flex flex-col justify-center px-5 py-14 sm:px-8 lg:py-16">
        <div className="mx-auto flex w-full max-w-sm flex-col">
          {/* Brand */}
          <motion.a
            href="/"
            className="mb-10 inline-flex items-center gap-2.5 self-start"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            <UnitalkLogo size={28} />
            <span className="text-base font-semibold text-white">Unitalk AI</span>
          </motion.a>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease, delay: 0.06 }}
          >
            <h1
              className="font-heading font-light text-white text-balance"
              style={{ fontSize: 'clamp(1.9rem, 4vw, 2.75rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
            >
              {t.createAccount}
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-[#8A8A92]">
              {t.trial}
            </p>
          </motion.div>

          {/* SSO buttons */}
          <motion.div
            className="mt-8 flex flex-col gap-2.5"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease, delay: 0.12 }}
          >
            {SSO.map(({ label, Icon }) => (
              <button
                key={label}
                className="flex h-12 items-center justify-center gap-3 rounded-xl border border-white/12 bg-white/[0.04] text-sm font-medium text-white transition-colors hover:border-white/25 hover:bg-white/[0.07]"
              >
                <Icon />
                {t.continueWith} {label}
              </button>
            ))}
          </motion.div>

          {/* Divider */}
          <motion.div
            className="my-6 flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease, delay: 0.2 }}
          >
            <span className="h-px flex-1 bg-white/10" />
            <span className="text-xs text-[#6E6E76]">{t.orEmail}</span>
            <span className="h-px flex-1 bg-white/10" />
          </motion.div>

          {/* Email form */}
          <motion.form
            className="flex flex-col gap-3"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease, delay: 0.24 }}
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="email" className="sr-only">
              {t.emailLabel}
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.emailPlaceholder}
              className="h-12 rounded-xl border border-white/12 bg-white/[0.04] px-4 text-sm text-white placeholder-[#6E6E76] transition-colors focus:border-[#FF0099]/60 focus:outline-none"
              autoComplete="email"
            />
            <button
              type="submit"
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#FF0099] text-sm font-semibold text-white transition-colors hover:bg-[#E00085]"
            >
              {t.continueEmail}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </motion.form>

          {/* Footer links */}
          <motion.p
            className="mt-8 text-xs leading-relaxed text-[#6E6E76]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease, delay: 0.3 }}
          >
            {t.termsPre}
            <a href="#" className="text-[#8A8A92] underline underline-offset-2 hover:text-white">{t.termsLink}</a>{t.termsMid}
            <a href="#" className="text-[#8A8A92] underline underline-offset-2 hover:text-white">{t.privacyLink}</a>.
          </motion.p>

          <motion.p
            className="mt-4 text-sm text-[#8A8A92]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease, delay: 0.34 }}
          >
            {t.haveAccount}{' '}
            <a href="#" className="font-medium text-white underline underline-offset-2 hover:text-[#FF0099]">{t.signIn}</a>
          </motion.p>
        </div>
      </section>
    </main>
  )
}
