'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronRight, Shield, Database, Cpu, Repeat, Check } from 'lucide-react'
import { SectionHeader } from './section-header'

/* ----------------------------- 7. AI Gateway (dark) ----------------------------- */

const GATEWAY_MODELS = [
  'GPT', 'Claude', 'Gemini', 'Grok', 'Mistral', 'Qwen', 'DeepSeek',
  'Kimi', 'GLM', 'Minimax', 'Image', 'Vidéo', 'Audio', 'Code', 'Local',
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
          subtitle="Vos humains et vos agents accèdent aux meilleurs modèles depuis un même endroit - sans clés API à gérer, ni abonnements empilés."
          align="center"
          dark
        />

        <div className="h-10" />

        <div className="mb-12 flex flex-wrap justify-center gap-2.5">
          {GATEWAY_MODELS.map((m, i) => {
            const modelColors: Record<string, { bg: string; border: string; text: string }> = {
              'GPT': { bg: 'bg-green-900/20', border: 'border-green-500/30', text: 'text-green-300' },
              'Claude': { bg: 'bg-amber-900/20', border: 'border-amber-500/30', text: 'text-amber-300' },
              'Gemini': { bg: 'bg-blue-900/20', border: 'border-blue-500/30', text: 'text-blue-300' },
              'Grok': { bg: 'bg-cyan-900/20', border: 'border-cyan-500/30', text: 'text-cyan-300' },
              'Mistral': { bg: 'bg-orange-900/20', border: 'border-orange-500/30', text: 'text-orange-300' },
              'Qwen': { bg: 'bg-purple-900/20', border: 'border-purple-500/30', text: 'text-purple-300' },
              'DeepSeek': { bg: 'bg-indigo-900/20', border: 'border-indigo-500/30', text: 'text-indigo-300' },
              'Kimi': { bg: 'bg-pink-900/20', border: 'border-pink-500/30', text: 'text-pink-300' },
              'GLM': { bg: 'bg-rose-900/20', border: 'border-rose-500/30', text: 'text-rose-300' },
              'Minimax': { bg: 'bg-violet-900/20', border: 'border-violet-500/30', text: 'text-violet-300' },
              'Image': { bg: 'bg-teal-900/20', border: 'border-teal-500/30', text: 'text-teal-300' },
              'Vidéo': { bg: 'bg-fuchsia-900/20', border: 'border-fuchsia-500/30', text: 'text-fuchsia-300' },
              'Audio': { bg: 'bg-sky-900/20', border: 'border-sky-500/30', text: 'text-sky-300' },
              'Code': { bg: 'bg-slate-900/20', border: 'border-slate-500/30', text: 'text-slate-300' },
              'Local': { bg: 'bg-lime-900/20', border: 'border-lime-500/30', text: 'text-lime-300' },
            }
            const colors = modelColors[m] || { bg: 'bg-white/[0.05]', border: 'border-white/10', text: 'text-[#E7E1D6]' }
            return (
              <motion.span
                key={m}
                className={`inline-flex items-center rounded-full border font-semibold px-4 py-2 text-sm transition-all hover:scale-110 ${colors.bg} ${colors.border} ${colors.text}`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
              >
                {m}
              </motion.span>
            )
          })}
        </div>

        <p className="mx-auto max-w-2xl text-xl font-semibold leading-snug text-[#F7F4EE]">
          {"L'IA devient une ressource d'entreprise."}
          <br />
          <span className="text-[#E7E1D6]">{"Pas une pile d'abonnements individuels."}</span>
        </p>
      </div>
    </section>
  )
}

/* --------------------------- 8. Souveraineté (light) --------------------------- */

const SOVEREIGNTY = [
  { icon: Shield, title: 'Votre propriété intellectuelle' },
  { icon: Database, title: 'Vos données' },
  { icon: Cpu, title: 'Vos fournisseurs IA' },
  { icon: Repeat, title: 'Votre liberté de changer de modèle' },
]

export function SovereigntySection() {
  return (
    <section className="w-full bg-[#F3EFE6] px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto mb-12 max-w-2xl">
          <SectionHeader
            eyebrow="Souveraineté"
            title="Les modèles changent. "
            titleAccent="Votre infrastructure reste."
            subtitle="Avec Unitalk, vous gardez la maîtrise de ce qui compte vraiment."
            align="center"
          />
        </div>

        <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SOVEREIGNTY.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.title}
                className="group rounded-2xl border border-[#DcD4C4] bg-[#FBF9F3] p-6 transition-all hover:-translate-y-1 hover:border-[#1C1A17]/20 hover:shadow-[0_12px_40px_-12px_rgba(28,26,23,0.25)]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#1C1A17] text-[#FBF9F3] transition-colors group-hover:bg-[#D10E63]">
                  <Icon className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <p className="text-sm font-semibold text-[#1C1A17]">{s.title}</p>
              </motion.div>
            )
          })}
        </div>

        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-base leading-relaxed text-[#4E483F]">
            Tout reste dans votre environnement Unitalk, sous votre contrôle.
          </p>
          <p className="text-xl font-semibold text-[#1C1A17]">
            Vos agents. Vos compétences. Votre code. Vos données. Votre mémoire.
          </p>
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
      'Apps natives : n8n, Twenty, Payload, Plane',
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
