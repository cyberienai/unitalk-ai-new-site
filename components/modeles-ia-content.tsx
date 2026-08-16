'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/language-context'
import { AlmaFace } from '@/components/alma-face'

type FeatKey = 'best' | 'multimodal' | 'memory' | 'skills'

const FEAT_ICON: Record<FeatKey, ReactNode> = {
  best: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2 15 8l6 .9-4.5 4.3 1 6-5.5-3-5.5 3 1-6L3 8.9 9 8z" />
    </svg>
  ),
  multimodal: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21" />
    </svg>
  ),
  memory: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a5 5 0 0 0-5 5v1a4 4 0 0 0-1 7.87V19a3 3 0 0 0 6 0" />
      <path d="M12 2a5 5 0 0 1 5 5v1a4 4 0 0 1 1 7.87V19a3 3 0 0 1-6 0" />
    </svg>
  ),
  skills: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
}

const FEAT_ORDER: FeatKey[] = ['best', 'multimodal', 'memory', 'skills']

type Feat = { title: string; desc: string }

const T = {
  fr: {
    eyebrow: 'Modèles IA',
    title1: 'Les meilleurs modèles. ',
    title2: 'Vos règles.',
    subtitle:
      'Votre Collaborateur IA accède aux modèles autorisés via Unitalk AI Gateway. Vous choisissez comment les utiliser : vos propres clés, des crédits Unitalk ou les deux.',
    modesLabel: 'Choisissez la capacité de chaque Collaborateur IA',
    byokTitle: 'BYOK — vos propres clés',
    byokDesc:
      'Bring Your Own Key : connectez vos clés API (GPT, Claude, Gemini…) et ne payez que l’abonnement. Vous gardez la main sur vos coûts, au prix réel des modèles.',
    byokPoints: ['Vos clés, vos coûts', 'Aucune marge sur les modèles', 'Contrôle total des accès'],
    byokBadge: '0 €/mois',
    quarterTitle: 'Quart-temps',
    quarterDesc: 'Pour une charge légère ou des missions récurrentes avec 5 millions de tokens par mois.',
    quarterPoints: ['5 millions de tokens/mois', '25 €/mois par Collaborateur IA', 'Offert jusqu’au 31 décembre 2026'],
    quarterBadge: 'Pour démarrer',
    halfTitle: 'Mi-temps',
    halfDesc: 'Pour une prise en charge quotidienne avec davantage de volume et de continuité.',
    halfPoints: ['10 millions de tokens/mois', '50 €/mois par Collaborateur IA', 'Capacité ajustable à tout moment'],
    halfBadge: 'Quotidien',
    fullTitle: 'Temps plein',
    fullDesc: 'Pour les processus complexes, les volumes importants et les missions intensives.',
    fullPoints: ['20 millions de tokens/mois', '100 €/mois par Collaborateur IA', 'Capacité ajustable à tout moment'],
    fullBadge: 'Intensif',
    switchNote: 'La capacité IA finance l’usage des modèles. Elle s’ajoute à la licence du Collaborateur IA et peut évoluer sans modifier son identité.',
    featLabel: 'Ce que ça change pour votre Collaborateur IA',
    feats: {
      best: { title: 'Accès aux meilleurs modèles', desc: 'GPT, Claude, Gemini et plus — toujours le bon modèle pour la bonne tâche.' },
      multimodal: { title: 'Multimodal', desc: 'Voix, texte, image, audio, code : votre Collaborateur IA comprend et produit tous les formats.' },
      memory: { title: 'Mémoire persistante', desc: 'Un contexte d’entreprise qui se souvient de tout, d’un échange à l’autre.' },
      skills: { title: 'Compétences extensibles', desc: 'Des compétences auto-apprises et une connexion à 3 000+ apps via MCP.' },
    } as Record<FeatKey, Feat>,
    ctaTitle1: 'Pas sûr du bon choix ? ',
    ctaTitle2: 'Alma vous conseille.',
    ctaDesc:
      'Elle vous recommande BYOK ou crédits selon votre usage, lors de votre appel. Gratuit, sans carte bancaire.',
    ctaBtn: 'Créer mon Collaborateur IA gratuitement',
  },
  en: {
    eyebrow: 'AI models',
    title1: 'The best models. ',
    title2: 'Your rules.',
    subtitle:
      'Your AI Collaborator accesses authorized models through Unitalk AI Gateway. Choose your own keys, Unitalk credits, or both.',
    modesLabel: 'Choose each AI Collaborator’s capacity',
    byokTitle: 'BYOK — your own keys',
    byokDesc:
      'Bring Your Own Key: connect your API keys (GPT, Claude, Gemini…) and only pay for the subscription. You stay in control of your costs, at the models’ real price.',
    byokPoints: ['Your keys, your costs', 'No markup on models', 'Full access control'],
    byokBadge: '€0/month',
    quarterTitle: 'Quarter-time',
    quarterDesc: 'For a light workload or recurring missions with 5 million tokens per month.',
    quarterPoints: ['5 million tokens/month', '€25/month per AI Collaborator', 'Free through December 31, 2026'],
    quarterBadge: 'Start here',
    halfTitle: 'Half-time',
    halfDesc: 'For daily work with more volume and continuity.',
    halfPoints: ['10 million tokens/month', '€50/month per AI Collaborator', 'Adjust capacity at any time'],
    halfBadge: 'Daily',
    fullTitle: 'Full-time',
    fullDesc: 'For complex processes, high volumes and intensive missions.',
    fullPoints: ['20 million tokens/month', '€100/month per AI Collaborator', 'Adjust capacity at any time'],
    fullBadge: 'Intensive',
    switchNote: 'AI capacity funds model usage. It is added to the AI Collaborator license and can change without altering its identity.',
    featLabel: 'What it means for your AI Collaborator',
    feats: {
      best: { title: 'Access to the best models', desc: 'GPT, Claude, Gemini and more — always the right model for the right task.' },
      multimodal: { title: 'Multimodal', desc: 'Voice, text, image, audio, code: your AI Collaborator understands and produces every format.' },
      memory: { title: 'Persistent memory', desc: 'A company context that remembers everything, from one exchange to the next.' },
      skills: { title: 'Extensible skills', desc: 'Self-taught skills and a connection to 3,000+ apps via MCP.' },
    } as Record<FeatKey, Feat>,
    ctaTitle1: 'Not sure which to pick? ',
    ctaTitle2: 'Alma advises you.',
    ctaDesc:
      'She recommends BYOK or credits based on your usage, on your call. Free, no credit card.',
    ctaBtn: 'Create my AI Collaborator for free',
  },
}

export function ModelesIaContent() {
  const { lang } = useLanguage()
  const t = T[lang]

  const modes = [
    { title: t.byokTitle, desc: t.byokDesc, points: t.byokPoints, badge: t.byokBadge, highlight: false },
    { title: t.quarterTitle, desc: t.quarterDesc, points: t.quarterPoints, badge: t.quarterBadge, highlight: true },
    { title: t.halfTitle, desc: t.halfDesc, points: t.halfPoints, badge: t.halfBadge, highlight: false },
    { title: t.fullTitle, desc: t.fullDesc, points: t.fullPoints, badge: t.fullBadge, highlight: false },
  ]

  return (
    <main className="w-full bg-[#F3EFE6]">
      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-grid pt-28 sm:pt-32 pb-10 sm:pb-14">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D10E63]">{t.eyebrow}</p>
          <h1
            className="mt-3 font-sf text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] text-[#1C1A17] text-balance"
            style={{ letterSpacing: '-0.03em' }}
          >
            {t.title1}<span className="text-[#D10E63]">{t.title2}</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-[#4E483F]">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Two payment modes */}
      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#857C6E]">{t.modesLabel}</p>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {modes.map((mode) => (
            <motion.div
              key={mode.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4 }}
              className={
                'flex flex-col rounded-3xl border p-8 ' +
                (mode.highlight
                  ? 'border-[#D10E63]/40 bg-[#FBF9F3] shadow-[0_8px_30px_rgba(209,14,99,0.08)]'
                  : 'border-[#DcD4C4] bg-[#FBF9F3]')
              }
            >
              <div className="flex items-center justify-between">
                <h2 className="font-sf text-2xl font-bold leading-snug text-[#1C1A17]" style={{ letterSpacing: '-0.02em' }}>
                  {mode.title}
                </h2>
                <span
                  className={
                    'rounded-full px-3 py-1 text-[11px] font-semibold ' +
                    (mode.highlight ? 'bg-[#D10E63] text-[#FBF9F3]' : 'bg-[#EAE3D4] text-[#4E483F]')
                  }
                >
                  {mode.badge}
                </span>
              </div>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#4E483F]">{mode.desc}</p>
              <ul className="mt-6 space-y-2.5 border-t border-[#DcD4C4] pt-6">
                {mode.points.map((point) => (
                  <li key={point} className="flex items-center gap-2.5 text-sm text-[#3A362F]">
                    <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-[#D10E63]/12 text-[#D10E63]">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        <p className="mt-5 text-center text-sm text-[#857C6E]">{t.switchNote}</p>
      </section>

      {/* Feature grid */}
      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pb-14">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#857C6E]">{t.featLabel}</p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEAT_ORDER.map((key, i) => {
            const feat = t.feats[key]
            return (
              <motion.article
                key={key}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex flex-col rounded-2xl border border-[#DcD4C4] bg-[#FBF9F3] p-6"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D10E63]/10 text-[#D10E63]">
                  {FEAT_ICON[key]}
                </span>
                <h3 className="mt-5 font-sf text-lg font-bold leading-snug text-[#1C1A17]" style={{ letterSpacing: '-0.02em' }}>
                  {feat.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4E483F]">{feat.desc}</p>
              </motion.article>
            )
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pb-24">
        <div className="rounded-3xl bg-[#1C1A17] px-6 py-12 sm:px-12 sm:py-16 text-center">
          <h2
            className="font-sf text-2xl sm:text-3xl md:text-4xl font-bold leading-[1.1] text-[#FBF9F3] text-balance"
            style={{ letterSpacing: '-0.02em' }}
          >
                {t.ctaTitle1}
                <span className="text-[#FF6FB0]">{withAlmaAvatar(t.ctaTitle2)}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-[#C4BAA8]">
            {withAlmaAvatar(t.ctaDesc)}
          </p>
          <Link
            href="/decouvrir"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#D10E63] px-6 py-3 text-sm font-semibold text-[#FBF9F3] transition-colors hover:bg-[#B00B52]"
          >
            {t.ctaBtn}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </section>
    </main>
  )
}

function withAlmaAvatar(value: string) {
  return value.split('Alma').map((part, index) => (
    <span key={`${part}-${index}`}>
      {index > 0 && <><AlmaFace />Alma</>}
      {part}
    </span>
  ))
}
