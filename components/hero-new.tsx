'use client'

import { motion } from 'framer-motion'
import { ChevronRight, Mail, Phone, Calendar, FileText, Brain, Zap, CheckCircle2 } from 'lucide-react'

const T = {
  fr: {
    eyebrow: 'Infrastructure IA collaborative et souveraine',
    headline: 'Unitalk transforme les agents IA en vrais collaborateurs.',
    subheadline:
      'Créez en quelques minutes un Collaborateur IA Unitalk avec une identité, une intelligence, une mémoire, des compétences, des outils, des ressources et des instructions de travail.',
    manifesto: ['Il raisonne.', 'Il planifie.', "Il exécute.", 'Il apprend.', 'Il collabore.', "Il s'améliore en continu."],
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
    sofiaStep: 'Étape 3/7',
    sofiaBadge: 'Guidée par Alma',
    sofiaCreateBtn: 'Créer Sofia avec Alma',
    sofiaMemory: 'Offres, clients, documents',
    sofiaSkills: 'Prospection, relance, synthèse, CRM',
    sofiaAccess: 'CRM, email, calendrier, fichiers',
    sofiaModels: 'GPT, Claude, Gemini, Mistral',
  },
  en: {
    eyebrow: 'Collaborative and sovereign AI infrastructure',
    headline: 'Unitalk transforms AI agents into real collaborators.',
    subheadline:
      'Create a Unitalk AI Collaborator in minutes with an identity, intelligence, memory, skills, tools, resources and work instructions.',
    manifesto: ['It reasons.', 'It plans.', 'It executes.', 'It learns.', 'It collaborates.', 'It improves continuously.'],
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
    sofiaStep: 'Step 3/7',
    sofiaBadge: 'Guided by Alma',
    sofiaCreateBtn: 'Create Sofia with Alma',
    sofiaMemory: 'Offers, clients, documents',
    sofiaSkills: 'Prospecting, follow-up, synthesis, CRM',
    sofiaAccess: 'CRM, email, calendar, files',
    sofiaModels: 'GPT, Claude, Gemini, Mistral',
  },
}

export function HeroNew({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = T[lang]

  return (
    <section className="relative w-full overflow-hidden bg-[#F3EFE6] px-5 py-12 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-16 lg:py-12">
        {/* Left column — copy */}
        <motion.div
          className="flex flex-col justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Eyebrow */}
          <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#857C6E]">
            {t.eyebrow}
          </p>

          {/* Headline */}
          <h1 className="font-sf mb-6 text-4xl font-bold leading-tight text-[#1C1A17] sm:text-5xl lg:text-[3.5rem]">
            {t.headline}
          </h1>

          {/* Subheadline */}
          <p className="mb-8 text-lg leading-relaxed text-[#4E483F] sm:text-xl">{t.subheadline}</p>

          {/* Manifesto */}
          <div className="mb-10 space-y-2">
            {t.manifesto.map((line, i) => (
              <p key={i} className="text-sm font-medium text-[#1C1A17] sm:text-base">
                {line}
              </p>
            ))}
          </div>

          {/* Signature */}
          <p className="mb-8 text-sm italic text-[#857C6E]">{t.signature}</p>

          {/* Primary CTA */}
          <button className="mb-3 inline-flex items-center justify-center gap-2 rounded-full bg-[#D10E63] px-7 py-3.5 text-sm font-semibold text-[#FBF9F3] transition-all hover:bg-[#B00B52] sm:text-base">
            {t.ctaPrimary}
            <ChevronRight className="h-4 w-4" />
          </button>

          {/* CTA microcopy */}
          <p className="mb-6 text-xs text-[#857C6E] sm:text-sm">{t.ctaMicrocopy}</p>

          {/* Secondary CTA */}
          <button className="text-sm font-medium text-[#D10E63] transition-colors hover:text-[#B00B52]">
            {t.ctaSecondary} →
          </button>
        </motion.div>

        {/* Right column — Sofia card */}
        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative w-full max-w-md rounded-2xl border border-[#DcD4C4]/40 bg-gradient-to-br from-[#1C1A17]/5 to-[#1C1A17]/2 backdrop-blur-sm p-6 shadow-lg sm:p-8">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-1.5 rounded-full bg-[#4F5BD5]/12 px-3 py-1.5 text-xs font-medium text-[#4F5BD5]">
              <span className="h-2 w-2 rounded-full bg-[#4F5BD5]" />
              {t.sofiaBadge}
            </div>

            {/* Title */}
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#857C6E]">{t.sofiaTitle}</p>

            {/* Name + Role */}
            <h2 className="mb-1 text-2xl font-bold text-[#1C1A17]">{t.sofiaName}</h2>
            <p className="mb-6 text-sm text-[#4E483F]">{t.sofiaRole}</p>

            {/* Details grid */}
            <div className="mb-6 space-y-3 border-t border-[#DcD4C4]/40 pt-6">
              <div className="flex items-start gap-3">
                <Mail className="h-4 w-4 shrink-0 text-[#D10E63] mt-0.5" />
                <div className="text-sm">
                  <p className="text-[10px] font-semibold uppercase text-[#857C6E]">Email</p>
                  <p className="text-[#1C1A17]">{t.sofiaEmail}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 shrink-0 text-[#D10E63] mt-0.5" />
                <div className="text-sm">
                  <p className="text-[10px] font-semibold uppercase text-[#857C6E]">Téléphone</p>
                  <p className="text-[#1C1A17]">{t.sofiaPhone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="h-4 w-4 shrink-0 text-[#D10E63] mt-0.5" />
                <div className="text-sm">
                  <p className="text-[10px] font-semibold uppercase text-[#857C6E]">Calendrier</p>
                  <p className="text-[#1C1A17]">Connecté</p>
                </div>
              </div>
            </div>

            {/* Memory, Skills, Access */}
            <div className="mb-6 space-y-3 border-t border-[#DcD4C4]/40 pt-6">
              <div>
                <p className="text-[10px] font-semibold uppercase text-[#857C6E] mb-1">Mémoire</p>
                <p className="text-sm text-[#1C1A17]">{t.sofiaMemory}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase text-[#857C6E] mb-1">Compétences</p>
                <p className="text-sm text-[#1C1A17]">{t.sofiaSkills}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase text-[#857C6E] mb-1">Accès</p>
                <p className="text-sm text-[#1C1A17]">{t.sofiaAccess}</p>
              </div>
            </div>

            {/* Modèles */}
            <div className="mb-6 border-t border-[#DcD4C4]/40 pt-6">
              <p className="text-[10px] font-semibold uppercase text-[#857C6E] mb-2">Modèles IA</p>
              <p className="text-sm text-[#1C1A17]">{t.sofiaModels}</p>
            </div>

            {/* Progress bar */}
            <div className="mb-6 border-t border-[#DcD4C4]/40 pt-6">
              <p className="text-[10px] font-semibold uppercase text-[#857C6E] mb-2">{t.sofiaStep}</p>
              <div className="h-1.5 w-full rounded-full bg-[#DcD4C4]">
                <div className="h-full w-3/7 rounded-full bg-[#4F5BD5]" />
              </div>
            </div>

            {/* Status */}
            <div className="mb-6 flex items-center gap-2 rounded-lg bg-[#4F5BD5]/10 px-3 py-2">
              <CheckCircle2 className="h-4 w-4 text-[#4F5BD5]" />
              <span className="text-sm font-medium text-[#4F5BD5]">{t.sofiaStatus}</span>
            </div>

            {/* Button */}
            <button className="w-full rounded-lg bg-[#D10E63] px-4 py-3 text-sm font-semibold text-[#FBF9F3] transition-colors hover:bg-[#B00B52]">
              {t.sofiaCreateBtn}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
