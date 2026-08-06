'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check, ShieldCheck, Users } from 'lucide-react'
import { useLanguage, type Lang } from '@/lib/language-context'

type Copy = {
  back: string
  badge: string
  title: string
  lead: string
  soonTitle: string
  soonBody: string
  emailLabel: string
  emailPlaceholder: string
  emailError: string
  missionLabel: string
  missionOptional: string
  missionPlaceholder: string
  submit: string
  successTitle: string
  successBody: string
  note: string
  browse: string
}

const T: Record<Lang, Copy> = {
  fr: {
    back: 'Retour aux missions',
    badge: 'Créateurs',
    title: 'Proposer une mission',
    lead: 'Vous avez conçu une mission utile à d’autres entreprises ? Décrivez-la : nous préparons l’ouverture du catalogue aux missions de la communauté.',
    soonTitle: 'Bientôt ouvert à la communauté',
    soonBody:
      'La publication de missions par les créateurs n’est pas encore disponible. Laissez votre adresse pour être prévenu dès l’ouverture — et partagez votre idée si vous le souhaitez.',
    emailLabel: 'Adresse professionnelle',
    emailPlaceholder: 'vous@votre-entreprise.com',
    emailError: 'Merci d’indiquer une adresse professionnelle valide.',
    missionLabel: 'Votre idée de mission',
    missionOptional: 'facultatif',
    missionPlaceholder: 'Ex. : Préparer une revue mensuelle des dépenses fournisseurs…',
    submit: 'Me tenir informé',
    successTitle: 'C’est noté, merci !',
    successBody: 'Nous vous préviendrons dès que la proposition de missions sera ouverte.',
    note: 'Aucun engagement. Nous ne partageons pas votre adresse.',
    browse: 'Parcourir les missions',
  },
  en: {
    back: 'Back to missions',
    badge: 'Creators',
    title: 'Propose a mission',
    lead: 'Have you designed a mission useful to other companies? Describe it: we’re preparing to open the catalog to community missions.',
    soonTitle: 'Coming soon to the community',
    soonBody:
      'Publishing missions as a creator isn’t available yet. Leave your email to be notified when it opens — and share your idea if you’d like.',
    emailLabel: 'Work email',
    emailPlaceholder: 'you@your-company.com',
    emailError: 'Please enter a valid work email.',
    missionLabel: 'Your mission idea',
    missionOptional: 'optional',
    missionPlaceholder: 'E.g. Prepare a monthly review of supplier spend…',
    submit: 'Keep me posted',
    successTitle: 'Got it, thank you!',
    successBody: 'We’ll let you know as soon as proposing missions is open.',
    note: 'No commitment. We don’t share your email.',
    browse: 'Browse missions',
  },
}

export function ProposerContent() {
  const { lang } = useLanguage()
  const t = T[lang]

  const [email, setEmail] = useState('')
  const [touched, setTouched] = useState(false)
  const [idea, setIdea] = useState('')
  const [sent, setSent] = useState(false)

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())

  function submit() {
    if (!emailValid) {
      setTouched(true)
      return
    }
    // No community backend yet — this simply records interest client-side.
    setSent(true)
  }

  return (
    <main className="min-h-[70vh] bg-[var(--store-page)] px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-xl">
        <Link
          href="/missions"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--store-muted)] transition-colors hover:text-[var(--store-text)]"
        >
          <ArrowLeft className="h-4 w-4" />
          {t.back}
        </Link>

        <div className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-[#FCEAF2] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#AD0C53]">
          <Users className="h-3.5 w-3.5" />
          {t.badge}
        </div>
        <h1 className="mt-4 text-balance font-sf text-3xl font-bold tracking-[-0.02em] text-[var(--store-text)] sm:text-4xl">
          {t.title}
        </h1>
        <p className="mt-3 text-pretty leading-relaxed text-[var(--store-muted)]">{t.lead}</p>

        {sent ? (
          <div className="mt-8 rounded-3xl border border-[var(--store-line)] bg-[var(--store-surface)] p-6 text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#E7F6EE]">
              <Check className="h-6 w-6 text-[#22A06B]" />
            </span>
            <h2 className="mt-4 font-sf text-lg font-bold text-[var(--store-text)]">{t.successTitle}</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--store-muted)]">{t.successBody}</p>
            <Link
              href="/missions"
              className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-[#D10E63] px-5 py-3 text-sm font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5"
            >
              {t.browse}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="mt-8 rounded-3xl border border-[var(--store-line)] bg-[var(--store-surface)] p-6">
            <h2 className="font-sf text-lg font-bold tracking-[-0.01em] text-[var(--store-text)]">{t.soonTitle}</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--store-muted)]">{t.soonBody}</p>

            <label className="mt-5 block">
              <span className="text-xs font-bold uppercase tracking-wide text-[var(--store-muted)]">{t.emailLabel}</span>
              <input
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouched(true)}
                placeholder={t.emailPlaceholder}
                className="mt-1.5 w-full rounded-2xl border border-[var(--store-line)] bg-[var(--store-page)] px-4 py-3 text-sm text-[var(--store-text)] outline-none transition-colors placeholder:text-[var(--store-muted)] focus:border-[#D10E63] focus:ring-2 focus:ring-[#D10E63]/25"
              />
              {touched && !emailValid && (
                <span className="mt-1.5 block text-xs font-medium text-[#C0392B]">{t.emailError}</span>
              )}
            </label>

            <label className="mt-4 block">
              <span className="text-xs font-bold uppercase tracking-wide text-[var(--store-muted)]">
                {t.missionLabel}
                <span className="ml-1.5 font-normal normal-case tracking-normal">({t.missionOptional})</span>
              </span>
              <textarea
                rows={3}
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder={t.missionPlaceholder}
                className="mt-1.5 w-full resize-none rounded-2xl border border-[var(--store-line)] bg-[var(--store-page)] px-4 py-3 text-sm text-[var(--store-text)] outline-none transition-colors placeholder:text-[var(--store-muted)] focus:border-[#D10E63] focus:ring-2 focus:ring-[#D10E63]/25"
              />
            </label>

            <button
              type="button"
              onClick={submit}
              className="mt-5 flex w-full items-center justify-center gap-1.5 rounded-full bg-[#D10E63] px-5 py-3 text-sm font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5"
            >
              {t.submit}
              <ArrowRight className="h-4 w-4" />
            </button>

            <p className="mt-4 inline-flex items-center gap-1.5 text-xs text-[var(--store-muted)]">
              <ShieldCheck className="h-3.5 w-3.5 text-[#22A06B]" />
              {t.note}
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
