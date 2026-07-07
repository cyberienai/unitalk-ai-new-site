'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronRight, Shield, Database, Cpu, Repeat, Check, Lock, FileCheck } from 'lucide-react'
import { SectionHeader } from './section-header'

/* ----------------------------- 7. AI Gateway (dark) ----------------------------- */

const GATEWAY_MODELS = [
  'ChatGPT', 'Claude', 'Gemini', 'Grok', 'Mistral', 'Llama', 'Qwen', 
  'DeepSeek', 'Kimi', 'GLM', 'Minimax', 'Phi', 'Perplexity', 'Image', 
  'Veo', 'Nana Banana', 'Kling', 'Wan', 'Audio', 'Ollama',
]

export function AIGatewaySection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#1A1613] px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            'radial-gradient(circle at 50% 0%, rgba(209,14,99,0.2), transparent 55%), radial-gradient(circle at 80% 100%, rgba(241,114,159,0.12), transparent 50%)',
        }}
      />
      <div className="relative mx-auto max-w-4xl text-center">
        <SectionHeader
          eyebrow="Unitalk AI Gateway"
          title="Tous les modèles IA. "
          titleAccent="Une seule ressource d'entreprise."
          subtitle="Vos humains et vos agents accèdent aux dernières versions des meilleurs modèles depuis un même endroit - sans clés API à gérer, une seule facture."
          align="center"
          dark
        />

        <div className="h-10" />

        <div className="mb-12 flex flex-wrap justify-center gap-4">
          {GATEWAY_MODELS.map((m, i) => {
            const modelLogoMap: Record<string, string> = {
              'ChatGPT': 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/openai/default.svg',
              'Claude': 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/anthropic/default.svg',
              'Gemini': 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/google/default.svg',
              'Grok': 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/x/default.svg',
              'Mistral': 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/mistral/default.svg',
              'Llama': 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/meta/default.svg',
              'Qwen': 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/alibaba-cloud/default.svg',
              'DeepSeek': 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/deepseek/default.svg',
              'Kimi': 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/zhipu/default.svg',
              'GLM': 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/zhipu/default.svg',
              'Minimax': 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/tencent/default.svg',
              'Phi': 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/microsoft/default.svg',
              'Perplexity': 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/perplexity/default.svg',
              'Image': 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/openai/default.svg',
              'Veo': 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/google/default.svg',
              'Nana Banana': 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/google/default.svg',
              'Kling': 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/kuaishou/default.svg',
              'Wan': 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/alibaba/default.svg',
              'Audio': 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/elevenlabs/default.svg',
              'Local': 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/ollama/default.svg',
            }
            const logoUrl = modelLogoMap[m]
            return (
              <motion.div
                key={m}
                className="group inline-flex items-center justify-center rounded-xl border-2 border-[#D10E63]/20 bg-gradient-to-br from-[#D10E63]/8 to-[#D10E63]/3 p-3 transition-all hover:border-[#D10E63]/40 hover:bg-[#D10E63]/12 hover:scale-110"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                title={m}
              >
                {logoUrl ? (
                  <img
                    src={logoUrl}
                    alt={m}
                    className="h-8 w-8 object-contain transition-all group-hover:scale-110 brightness-110"
                    onError={(e) => {
                      // Fallback to text if logo fails to load
                      e.currentTarget.style.display = 'none'
                      e.currentTarget.nextElementSibling?.removeAttribute('hidden')
                    }}
                  />
                ) : null}
                <span hidden className="text-sm font-semibold text-[#E7E1D6]">
                  {m}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* --------------------------- 8. Souveraineté (light) --------------------------- */

const SOVEREIGNTY_PILLARS = [
  {
    icon: Database,
    title: 'Isolation de vos données',
    description: 'Chiffrement intégral. Compartimentage strict. Zéro accès sans permission.',
  },
  {
    icon: Cpu,
    title: 'Aucun entraînement sur vos données',
    description: 'Zéro rétention. Vos prompts ne quittent jamais votre périmètre.',
  },
  {
    icon: Repeat,
    title: 'No vendor lock-in',
    description: 'Migration à tout moment. Orchestration d\'open source. Aucune dépendance. Liberté totale.',
  },
  {
    icon: Lock,
    title: 'Confidentialité ultime',
    description: 'Unitalk Desktop + Ollama pour vos données sensibles si besoin. 100% on-premise. Zéro cloud requis.',
  },
  {
    icon: FileCheck,
    title: 'Conformité certifiée',
    description: 'RGPD, ISO 27001, SOC 2.',
  },
]

export function SovereigntySection() {
  return (
    <section className="w-full bg-[#1C1A17] px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto mb-20 max-w-2xl text-center">
          <SectionHeader
            eyebrow="Souveraineté"
            title="Vos agents. Vos données. Votre infrastructure. "
            titleAccent="Liberté à chaque instant. Contrôle permanent."
            align="center"
            dark
          />
        </div>

        <div className="space-y-5">
          {SOVEREIGNTY_PILLARS.map((pillar, i) => {
            const Icon = pillar.icon
            return (
              <motion.div
                key={pillar.title}
                className="group flex gap-6 rounded-2xl border border-[#D10E63]/15 bg-gradient-to-br from-[#D10E63]/5 to-transparent p-8 backdrop-blur-sm transition-all hover:border-[#D10E63]/40 hover:bg-gradient-to-br hover:from-[#D10E63]/10 hover:to-[#D10E63]/3 hover:shadow-[0_8px_32px_rgba(209,14,99,0.15)]"
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                <span className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#D10E63]/20 to-[#D10E63]/10 text-[#D10E63] group-hover:from-[#D10E63]/30 group-hover:to-[#D10E63]/15">
                  <Icon className="h-7 w-7" strokeWidth={1.4} />
                </span>
                <div className="flex-1">
                  <h3 className="mb-2 text-lg font-bold text-[#F7F4EE]">{pillar.title}</h3>
                  <p className="leading-relaxed text-[#E7E1D6]">{pillar.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------ 9. Offres (light) ------------------------------ */

const OFFERS = [
  {
    name: 'Solo',
    subtitle: 'Votre premier vrai collaborateur IA.',
    text: 'Pour indépendant, dirigeant, consultant, créateur ou solopreneur.',
    points: [
      '1 Collaborateur IA personnel',
      '10 profils prêts à l\u2019emploi',
      'Mémoire personnelle',
      'Alma vous guide en 7 étapes',
      'Création gratuite, sans carte bancaire',
    ],
    cta: 'Découvrir Solo',
    href: '/solo',
    badge: 'Gratuit',
    featured: true,
  },
  {
    name: 'Teams',
    subtitle: 'Un Collaborateur IA pour chaque membre.',
    text: 'Chaque employé dispose de son agent. Toute l\u2019équipe partage un contexte commun.',
    points: [
      '1 agent par employé',
      'Mémoire commune',
      'Accès contrôlés',
      'Profils métier',
      'Adoption guidée par Alma',
    ],
    cta: 'Découvrir Teams',
    href: '/teams',
    badge: null,
    featured: false,
  },
  {
    name: 'Business',
    subtitle: 'Vos agents, vos apps, votre serveur dédié.',
    text: 'Déployez des Collaborateurs IA dans une infrastructure privée avec vos données et vos API.',
    points: [
      'Serveur IA dédié',
      'Apps natives : n8n, Twenty, Payload, Stalwart',
      'Modèles au choix',
      'Gouvernance et souveraineté',
      'Accompagnement avancé',
    ],
    cta: 'Découvrir Business',
    href: '/business',
    badge: 'Serveur dédié',
    featured: false,
  },
]

export function OffersSection() {
  return (
    <section id="offres" className="w-full bg-[#EFE9DC] px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-14 max-w-2xl">
          <SectionHeader
            eyebrow="Offres"
            title="Choisissez votre façon de "
            titleAccent="démarrer."
            align="center"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {OFFERS.map((o, i) => (
            <motion.div
              key={o.name}
              className={`relative flex flex-col rounded-2xl border p-8 ${
                o.featured
                  ? 'border-[#D10E63]/40 bg-[#FBF9F3] shadow-[0_20px_60px_-20px_rgba(209,14,99,0.35)] lg:-mt-2 lg:mb-2'
                  : 'border-[#DcD4C4] bg-[#FBF9F3]'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              {o.badge && (
                <span
                  className={`mb-4 inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold ${
                    o.featured ? 'bg-[#D10E63] text-[#FBF9F3]' : 'bg-[#1C1A17]/8 text-[#1C1A17]'
                  }`}
                >
                  {o.badge}
                </span>
              )}
              <h3 className="mb-1 text-2xl font-bold text-[#1C1A17]">{o.name}</h3>
              <p className="mb-4 text-sm font-medium text-[#4E483F]">{o.subtitle}</p>
              <p className="mb-6 text-sm leading-relaxed text-[#857C6E]">{o.text}</p>

              <ul className="mb-8 flex-1 space-y-3">
                {o.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm text-[#4E483F]">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#D10E63]" />
                    {p}
                  </li>
                ))}
              </ul>

              <a
                href={o.href}
                className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors ${
                  o.featured
                    ? 'bg-[#D10E63] text-[#FBF9F3] hover:bg-[#B00B52]'
                    : 'border border-[#DcD4C4] bg-transparent text-[#1C1A17] hover:bg-[#EFE9DC]'
                }`}
              >
                {o.cta}
                <ChevronRight className="h-4 w-4" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------ 10. FAQ (light) ------------------------------ */

const FAQ = [
  {
    q: "Qu'est-ce qu'un Collaborateur IA ?",
    a: "Un Collaborateur IA est un agent IA doté d'une identité, d'une intelligence, d'une mémoire, de compétences, d'outils, de ressources et d'instructions de travail. Il peut raisonner, planifier, exécuter, apprendre et collaborer.",
  },
  {
    q: 'Est-ce que je dois connaître Hermes ?',
    a: "Non. Hermes Agent est la base open source qui propulse les agents. Unitalk s'occupe de l'expérience, de l'infrastructure, de la mémoire, des modèles et de l'adoption.",
  },
  {
    q: 'Puis-je commencer gratuitement ?',
    a: 'Oui. Vous pouvez créer votre premier Collaborateur IA gratuitement, sans carte bancaire. Alma vous guide en 7 étapes et la mise en service prend moins de 15 minutes.',
  },
  {
    q: 'Quels modèles sont accessibles ?',
    a: 'Unitalk AI Gateway peut donner accès aux meilleurs modèles : GPT, Claude, Gemini, Grok, Mistral, Qwen, DeepSeek, Kimi, GLM, Minimax, modèles image, vidéo, audio, code et modèles locaux.',
  },
  {
    q: 'Mes données restent-elles sous contrôle ?',
    a: 'Oui. Unitalk propose plusieurs niveaux : cloud mutualisé, Desktop, hébergement à Paris, modèles locaux, serveur dédié, accès contrôlés et mémoire maîtrisée.',
  },
]

export function HomeFaq() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section className="w-full bg-[#F3EFE6] px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12">
          <SectionHeader
            eyebrow="FAQ"
            title="Questions "
            titleAccent="fréquentes."
            align="center"
          />
        </div>
        <div className="space-y-3">
          {FAQ.map((item, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-[#DcD4C4] bg-[#FBF9F3]"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                aria-expanded={open === i}
              >
                <span className="text-base font-semibold text-[#1C1A17]">{item.q}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-[#857C6E] transition-transform ${open === i ? 'rotate-180' : ''}`}
                />
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-sm leading-relaxed text-[#4E483F]">{item.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------------------- 11. CTA final (dark) ---------------------------- */

export function FinalCtaSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#1A1613] px-5 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            'radial-gradient(circle at 50% 0%, rgba(209,14,99,0.26), transparent 55%), radial-gradient(circle at 50% 120%, rgba(241,114,159,0.16), transparent 55%)',
        }}
      />
      <div className="relative mx-auto max-w-3xl text-center">
        <motion.p
          className="mb-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#F1729F]"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Prêt à déléguer pour de vrai ?
        </motion.p>

        <motion.h2
          className="font-sf mb-6 text-balance font-bold leading-[1.05] text-[#FBF9F3]"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', letterSpacing: '-0.02em' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.06 }}
        >
          {'Ne créez pas un simple agent. '}
          <span className="text-[#F1729F]">Créez un vrai collaborateur.</span>
        </motion.h2>

        <motion.div
          className="mx-auto mb-9 flex max-w-xl flex-wrap justify-center gap-2"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.12 }}
        >
          {[
            'Une identité',
            'Une intelligence',
            'Une mémoire',
            'Des compétences',
            'Des outils',
            'Des ressources',
            'Ses instructions de travail',
          ].map((chip) => (
            <span
              key={chip}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-sm text-[#D8D1C5]"
            >
              <Check className="h-3.5 w-3.5 text-[#F1729F]" />
              {chip}
            </span>
          ))}
        </motion.div>

        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.18 }}
        >
          <a
            href="/signup"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D10E63] px-8 py-4 text-base font-semibold text-[#FBF9F3] transition-colors hover:bg-[#B00B52]"
          >
            Créer mon Collaborateur IA gratuit
            <ChevronRight className="h-5 w-5" />
          </a>

          {/* Alma reassurance row */}
          <div className="flex items-center gap-2.5 text-sm text-[#A79F91]">
            <img
              src="/alma-avatar.png"
              alt="Alma"
              className="h-7 w-7 rounded-full object-cover ring-2 ring-[#D10E63]/40"
            />
            <span>
              <span className="font-semibold text-[#E7E1D6]">Alma</span> vous guide en 7 étapes -
              moins de 15 minutes, sans carte bancaire.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
