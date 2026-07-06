'use client'

import { motion } from 'framer-motion'
import { ChevronRight, Mail, Phone, Calendar, Database, Zap, Wrench, Cpu, CheckCircle2 } from 'lucide-react'

const T = {
  fr: {
    eyebrow: 'Infrastructure IA collaborative et souveraine',
    headline: 'Unitalk transforme les agents IA en vrais collaborateurs.',
    subheadline:
      'Créez en quelques minutes un Collaborateur IA Unitalk avec une identité, une mémoire, des compétences, des outils et ses propres instructions de travail.',
    manifesto: ['Il raisonne', 'Il planifie', 'Il exécute', 'Il apprend', 'Il collabore', "Il s'améliore"],
    signature: "L'IA qui travaille avec votre organisation.",
    ctaPrimary: 'Créer mon Collaborateur IA gratuit',
    ctaMicrocopy: 'Mise en service en moins de 15 minutes avec Alma, notre agent vocal. Sans carte bancaire.',
    ctaSecondary: 'Voir comment ça marche',
    sofiaTitle: 'Votre premier Collaborateur IA',
    sofiaName: 'Sofia',
    sofiaRole: 'Assistante commerciale',
    sofiaEmail: 'sofia@votreentreprise.fr',
    sofiaPhone: 'Ligne dédiée',
    sofiaStatus: 'Prête à travailler',
    sofiaStep: 'Étape 3 sur 7',
    sofiaBadge: 'Guidée par Alma',
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
    headline: 'Unitalk transforms AI agents into real collaborators.',
    subheadline:
      'Create a Unitalk AI Collaborator in minutes with an identity, memory, skills, tools and its own work instructions.',
    manifesto: ['It reasons', 'It plans', 'It executes', 'It learns', 'It collaborates', 'It improves'],
    signature: 'The AI that works with your organization.',
    ctaPrimary: 'Create my AI Collaborator for free',
    ctaMicrocopy: 'Onboarded in less than 15 minutes with Alma, our voice agent. No credit card.',
    ctaSecondary: 'See how it works',
    sofiaTitle: 'Your first AI Collaborator',
    sofiaName: 'Sofia',
    sofiaRole: 'Sales Assistant',
    sofiaEmail: 'sofia@yourcompany.com',
    sofiaPhone: 'Dedicated line',
    sofiaStatus: 'Ready to work',
    sofiaStep: 'Step 3 of 7',
    sofiaBadge: 'Guided by Alma',
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

  return (
    <section className="relative w-full overflow-hidden bg-[#F3EFE6] px-5 py-14 sm:px-6 sm:py-20 lg:px-8">
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
            className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-[#DcD4C4] bg-[#FBF9F3]/70 px-3.5 py-1.5"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#4F5BD5]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#857C6E]">
              {t.eyebrow}
            </span>
          </motion.div>

          <motion.h1
            className="font-sf mb-6 text-balance font-bold text-[#1C1A17]"
            style={{ fontSize: 'clamp(2.2rem, 4.6vw, 3.6rem)', lineHeight: 1.02, letterSpacing: '-0.03em' }}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.06 }}
          >
            {t.headline}
          </motion.h1>

          <motion.p
            className="mb-7 max-w-xl text-lg leading-relaxed text-[#4E483F] sm:text-xl"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.14 }}
          >
            {t.subheadline}
          </motion.p>

          {/* Manifesto as chips */}
          <motion.div
            className="mb-8 flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
          >
            {t.manifesto.map((line) => (
              <span
                key={line}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#DcD4C4] bg-[#FBF9F3] px-3 py-1.5 text-sm font-medium text-[#1C1A17]"
              >
                <span className="h-1 w-1 rounded-full bg-[#D10E63]" />
                {line}
              </span>
            ))}
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
            <button className="inline-flex items-center justify-center gap-1 rounded-full border border-[#DcD4C4] bg-transparent px-6 py-3.5 text-sm font-medium text-[#1C1A17] transition-colors hover:bg-[#EFE9DC]">
              {t.ctaSecondary}
            </button>
          </motion.div>

          <motion.p
            className="mt-4 max-w-md text-xs leading-relaxed text-[#857C6E] sm:text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease, delay: 0.32 }}
          >
            {t.ctaMicrocopy}
          </motion.p>
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
                'radial-gradient(circle at 30% 20%, rgba(79,91,213,0.35), transparent 55%), radial-gradient(circle at 80% 90%, rgba(209,14,99,0.25), transparent 55%)',
            }}
          />

          <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-[#1A1613] p-6 shadow-2xl sm:p-7">
            {/* top sheen */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-24"
              style={{ background: 'radial-gradient(ellipse 60% 100% at 50% 0%, rgba(79,91,213,0.18), transparent)' }}
            />

            {/* header row */}
            <div className="relative mb-6 flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#4F5BD5]/30 bg-[#4F5BD5]/15 px-3 py-1 text-xs font-medium text-[#B7BEF0]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#8B96EC]" />
                {t.sofiaBadge}
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8A8175]">
                {t.sofiaStep}
              </span>
            </div>

            {/* identity */}
            <div className="relative mb-6 flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#4F5BD5] to-[#D10E63] text-xl font-bold text-white">
                S
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8A8175]">
                  {t.sofiaTitle}
                </p>
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
                    <Icon className="h-4 w-4 shrink-0 text-[#8B96EC]" />
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
                  className="h-full rounded-full bg-gradient-to-r from-[#4F5BD5] to-[#8B96EC]"
                  initial={{ width: 0 }}
                  whileInView={{ width: '43%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* status + button */}
            <div className="relative mb-4 flex items-center gap-2 rounded-xl border border-[#4F5BD5]/20 bg-[#4F5BD5]/10 px-3 py-2.5">
              <CheckCircle2 className="h-4 w-4 text-[#8B96EC]" />
              <span className="text-sm font-medium text-[#B7BEF0]">{t.sofiaStatus}</span>
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
