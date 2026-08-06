'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import type { Lang } from '@/lib/language-context'

export function ScreenConnect({ lang, onContinue }: { lang: Lang; onContinue: () => void }) {
  const t = COPY[lang]
  const [email, setEmail] = useState('')

  return (
    <div className="max-w-md">
      <p className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-[#D10E63]">{t.kicker}</p>
      <h1 className="mt-4 text-balance font-sf text-[clamp(1.7rem,3.6vw,2.5rem)] font-semibold leading-tight tracking-[-0.03em] text-[#1C1A17]">
        {t.title}
      </h1>
      <p className="mt-4 text-base leading-relaxed text-[#4E483F]">{t.lead}</p>

      <button
        type="button"
        onClick={onContinue}
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1C1A17] px-6 py-3.5 text-sm font-bold text-[#FBF9F3] transition-colors hover:bg-[#000]"
      >
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#FBF9F3] text-[10px] font-bold text-[#1C1A17]">
          G
        </span>
        {t.google}
      </button>

      <div className="my-5 flex items-center gap-3">
        <span className="h-px flex-1 bg-[#D8D0C2]" />
        <span className="text-xs font-medium uppercase tracking-wider text-[#8A8175]">{t.or}</span>
        <span className="h-px flex-1 bg-[#D8D0C2]" />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          onContinue()
        }}
      >
        <label htmlFor="connect-email" className="text-sm font-medium text-[#3B362F]">
          {t.emailLabel}
        </label>
        <input
          id="connect-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="prenom@votre-entreprise.fr"
          className="mt-2 w-full rounded-xl border border-[#D8D0C2] bg-[#FBF9F3] px-4 py-3 text-sm text-[#1C1A17] outline-none placeholder:text-[#9A9184] focus:border-[#D10E63]"
        />
        <button
          type="submit"
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#D10E63] px-6 py-3.5 text-sm font-bold text-[#FBF9F3] transition-colors hover:bg-[#E51872]"
        >
          {t.emailCta}
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>

      <p className="mt-5 text-[13px] leading-relaxed text-[#8A8175]">{t.legal}</p>
      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
        {t.reassurance.map((r) => (
          <li key={r} className="text-xs font-medium text-[#5F594F]">
            {r}
          </li>
        ))}
      </ul>
    </div>
  )
}

const COPY = {
  fr: {
    kicker: 'Enregistrez votre préparation',
    title: 'Retrouvez votre Collaborateur IA dans votre Workspace.',
    lead: 'Connectez-vous pour enregistrer le contexte construit avec Alma et commencer votre essai gratuit de 7 jours.',
    google: 'Continuer avec Google',
    or: 'ou',
    emailLabel: 'Adresse e-mail professionnelle',
    emailCta: 'Continuer avec mon e-mail',
    legal:
      'En continuant, vous acceptez les Conditions d’utilisation et reconnaissez avoir pris connaissance de la Politique de confidentialité.',
    reassurance: ['7 jours gratuits', 'Hébergé en France', 'Conforme au RGPD'],
  },
  en: {
    kicker: 'Save your preparation',
    title: 'Find your AI Collaborator in your Workspace.',
    lead: 'Sign in to save the context built with Alma and start your 7-day free trial.',
    google: 'Continue with Google',
    or: 'or',
    emailLabel: 'Work email address',
    emailCta: 'Continue with my email',
    legal:
      'By continuing, you accept the Terms of Use and acknowledge the Privacy Policy.',
    reassurance: ['7 days free', 'Hosted in France', 'GDPR compliant'],
  },
} as const
