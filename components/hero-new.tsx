'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Mail, Phone, Calendar, Database, Zap, Wrench, Cpu, CheckCircle2, CreditCard, Unlock } from 'lucide-react'

const T = {
  fr: {
    eyebrow: "L'IA qui travaille pour votre organisation",
    headline: 'Unitalk donne à votre équipe ',
    headlineAccent: 'un vrai collaborateur.',
    subheadline:
      'Un collaborateur avec une identité, une mémoire, des compétences et ses propres outils, qui travaille avec votre équipe.',
    manifesto: ['Raisonne', 'Planifie', 'Exécute', 'Apprend', 'Se souvient', 'Collabore', "S'améliore"],
    signature: "L'IA qui travaille avec votre organisation.",
    ctaPrimary: 'Créer mon Collaborateur IA',
    ctaProofs: [
      { icon: Zap, label: 'Gratuit immédiat' },
      { icon: CreditCard, label: 'Sans CB' },
      { icon: Unlock, label: 'Sans engagement' },
    ],
    ctaSecondary: 'Voir comment ça marche',
    sofiaTitle: 'Votre premier Collaborateur IA',
    sofiaName: 'Sofia',
    sofiaRole: 'Assistante commerciale',
    sofiaEmail: 'sofia@votreentreprise.fr',
    sofiaPhone: 'Ligne dédiée',
    sofiaStatus: 'Prête à travailler',
    sofiaStep: 'Étape 3 sur 7',
    sofiaBadge: 'vous guide, étape par étape.',
    sofiaCreateBtn: 'Créer Sofia avec Alma',
    labelEmail: 'Email',
    labelPhone: 'Téléphone',
    labelCal: 'Calendrier',
    calValue: 'Connecté',
    rows: [
      { icon: Database, label: 'Mémoire', value: 'Offres, clients, documents' },
      { icon: Zap, label: 'Compétences', value: 'Prospection, relance, CRM' },
      { icon: Wrench, label: 'Accès', value: 'CRM, email, calendrier' },
      { icon: Cpu, label: 'Modèles', value: 'GPT, Claude, Gemini, Mistral' },
    ],
  },
  en: {
    eyebrow: 'Collaborative and sovereign AI infrastructure',
    headline: 'Unitalk transforms AI agents into ',
    headlineAccent: 'real collaborators.',
    subheadline:
      'Create a Unitalk AI Collaborator in minutes with an identity, a memory, an intelligence, skills, tools, resources and its own work instructions.',
    manifesto: ['It reasons', 'It plans', 'It executes', 'It learns', 'It collaborates', 'It improves'],
    signature: 'The AI that works with your organization.',
    ctaPrimary: 'Create my AI Collaborator for free',
    ctaProofs: [
      { icon: Zap, label: 'Free & instant' },
      { icon: CreditCard, label: 'No credit card' },
      { icon: Unlock, label: 'No commitment' },
    ],
    ctaSecondary: 'See how it works',
    sofiaTitle: 'Your first AI Collaborator',
    sofiaName: 'Sofia',
    sofiaRole: 'Sales Assistant',
    sofiaEmail: 'sofia@yourcompany.com',
    sofiaPhone: 'Dedicated line',
    sofiaStatus: 'Ready to work',
    sofiaStep: 'Step 3 of 7',
    sofiaBadge: 'guides you, step by step.',
    sofiaCreateBtn: 'Create Sofia with Alma',
    labelEmail: 'Email',
    labelPhone: 'Phone',
    labelCal: 'Calendar',
    calValue: 'Connected',
    rows: [
      { icon: Database, label: 'Memory', value: 'Offers, clients, documents' },
      { icon: Zap, label: 'Skills', value: 'Prospecting, follow-up, CRM' },
      { icon: Wrench, label: 'Access', value: 'CRM, email, calendar' },
      { icon: Cpu, label: 'Models', value: 'GPT, Claude, Gemini, Mistral' },
    ],
  },
}

const ease = [0.22, 1, 0.36, 1] as const

export function HeroNew({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = T[lang]
  const [activeVerb, setActiveVerb] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setActiveVerb((i) => (i + 1) % t.manifesto.length)
    }, 1400)
    return () => clearInterval(id)
  }, [t.manifesto.length])

  return (
    <section className="relative w-full overflow-hidden bg-[#F3EFE6] px-5 pb-14 pt-24 sm:px-6 sm:pb-20 sm:pt-28 lg:px-8">
      {/* Faint ink rule grid — same editorial backdrop as the solo hero */}
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 opacity-70"
        style={{
          maskImage: 'radial-gradient(120% 90% at 50% 0%, #000 30%, transparent 90%)',
          WebkitMaskImage: 'radial-gradient(120% 90% at 50% 0%, #000 30%, transparent 90%)',
        }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* Left column — copy */}
        <div className="flex flex-col justify-center">
          <motion.div
            className="mb-5 text-[11px] font-semibold lowercase tracking-[0.28em] text-[#857C6E]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            {t.eyebrow}
          </motion.div>

          <motion.h1
            className="font-sf mb-6 text-balance font-bold text-[#1C1A17]"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4.25rem)', lineHeight: 1.0, letterSpacing: '-0.03em' }}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.06 }}
          >
            {t.headline}
            <span className="text-[#D10E63]">{t.headlineAccent}</span>
          </motion.h1>

          <motion.p
            className="mb-7 max-w-xl text-lg leading-relaxed text-[#4E483F] sm:text-xl"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.14 }}
          >
            {t.subheadline}
          </motion.p>

          {/* Manifesto as chips — a rolling highlight sweeps through the verbs */}
          <motion.div
            className="mb-8 flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
          >
            {t.manifesto.map((line, i) => {
              const isActive = i === activeVerb
              return (
                <motion.span
                  key={line}
                  animate={{
                    backgroundColor: isActive ? '#D10E63' : '#FBF9F3',
                    borderColor: isActive ? '#D10E63' : '#DcD4C4',
                    color: isActive ? '#FBF9F3' : '#1C1A17',
                    scale: isActive ? 1.06 : 1,
                  }}
                  transition={{ duration: 0.45, ease }}
                  className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium"
                >
                  <motion.span
                    animate={{
                      backgroundColor: isActive ? '#FBF9F3' : '#D10E63',
                      scale: isActive ? [1, 1.9, 1] : 1,
                    }}
                    transition={{ duration: isActive ? 0.6 : 0.3, ease }}
                    className="h-1 w-1 rounded-full"
                  />
                  {line}
                </motion.span>
              )
            })}
          </motion.div>

          <motion.div
            className="flex flex-col gap-3 sm:flex-row sm:items-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.26 }}
          >
            <button className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D10E63] px-7 py-3.5 text-sm font-semibold text-[#FBF9F3] shadow-sm transition-all hover:bg-[#B00B52] sm:text-base">
              {t.ctaPrimary}
              <ChevronRight className="h-4 w-4" />
            </button>
          </motion.div>

          <motion.ul
            className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-[#857C6E] sm:text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease, delay: 0.32 }}
          >
            {t.ctaProofs.map((proof) => {
              const ProofIcon = proof.icon
              return (
                <li key={proof.label} className="inline-flex items-center gap-1.5">
                  <ProofIcon className="h-4 w-4 text-[#D10E63]" />
                  {proof.label}
                </li>
              )
            })}
          </motion.ul>
        </div>

        {/* Right column — Sofia dark glass card */}
        <motion.div
          className="relative flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.96, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.2 }}
        >
          {/* Glow behind card */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-6 rounded-[2rem] opacity-70 blur-2xl"
            style={{
              background:
                'radial-gradient(circle at 30% 20%, rgba(209,14,99,0.32), transparent 55%), radial-gradient(circle at 80% 90%, rgba(241,114,159,0.22), transparent 55%)',
            }}
          />

          <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-[#1A1613] p-6 shadow-2xl sm:p-7">
            {/* top sheen */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-24"
              style={{ background: 'radial-gradient(ellipse 60% 100% at 50% 0%, rgba(209,14,99,0.16), transparent)' }}
            />

            {/* header row */}
            <div className="relative mb-6 flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#D10E63]/30 bg-[#D10E63]/15 px-3 py-1 text-xs font-medium text-[#F1729F]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#F1729F]" />
                {t.sofiaTitle}
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8A8175]">
                {t.sofiaStep}
              </span>
            </div>

            {/* identity */}
            <div className="relative mb-6 flex items-center gap-4">
              <img
                src="/sofia-avatar.png"
                alt={t.sofiaName}
                className="h-14 w-14 shrink-0 rounded-2xl object-cover ring-1 ring-white/15"
              />
              <div>
                <h2 className="text-2xl font-bold leading-tight text-[#F7F4EE]">{t.sofiaName}</h2>
                <p className="text-sm text-[#B8B0A2]">{t.sofiaRole}</p>
              </div>
            </div>

            {/* contact chips */}
            <div className="relative mb-5 grid grid-cols-1 gap-2">
              {[
                { icon: Mail, label: t.labelEmail, value: t.sofiaEmail },
                { icon: Phone, label: t.labelPhone, value: t.sofiaPhone },
                { icon: Calendar, label: t.labelCal, value: t.calValue },
              ].map((row) => {
                const Icon = row.icon
                return (
                  <div
                    key={row.label}
                    className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2.5"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-[#F1729F]" />
                    <span className="w-20 text-[10px] font-semibold uppercase tracking-wide text-[#8A8175]">
                      {row.label}
                    </span>
                    <span className="truncate text-sm text-[#E7E1D6]">{row.value}</span>
                  </div>
                )
              })}
            </div>

            {/* capability rows */}
            <div className="relative mb-5 space-y-2 border-t border-white/[0.06] pt-5">
              {t.rows.map((row) => {
                const Icon = row.icon
                return (
                  <div key={row.label} className="flex items-start gap-3">
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#D10E63]" />
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-[#8A8175]">
                        {row.label}
                      </p>
                      <p className="text-sm text-[#E7E1D6]">{row.value}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* progress */}
            <div className="relative mb-5 border-t border-white/[0.06] pt-5">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#D10E63] to-[#F1729F]"
                  initial={{ width: 0 }}
                  whileInView={{ width: '43%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* status + button */}
            <div className="relative mb-4 flex items-center gap-2 rounded-xl border border-[#2E7D4F]/25 bg-[#2E7D4F]/10 px-3 py-2.5">
              <CheckCircle2 className="h-4 w-4 text-[#4F9E6E]" />
              <span className="text-sm font-medium text-[#8FCBA6]">{t.sofiaStatus}</span>
            </div>

            {/* Alma guide */}
            <div className="relative mb-4 flex items-center gap-3">
              <div className="relative shrink-0">
                <img
                  src="/alma-avatar.png"
                  alt="Alma"
                  className="h-9 w-9 rounded-full object-cover ring-2 ring-[#D10E63]/40"
                />
                <span
                  aria-hidden="true"
                  className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#1A1613] bg-[#2E7D4F]"
                />
              </div>
              <span className="text-sm text-[#B8B0A2]">
                <span className="font-semibold text-[#E7E1D6]">Alma</span> {t.sofiaBadge}
              </span>
            </div>

            <button className="relative w-full rounded-xl bg-[#D10E63] px-4 py-3 text-sm font-semibold text-[#FBF9F3] transition-colors hover:bg-[#B00B52]">
              {t.sofiaCreateBtn}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
