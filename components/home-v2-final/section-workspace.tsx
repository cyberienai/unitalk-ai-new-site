'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Check, Loader2, FileText } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as const

type WorkspaceMission = {
  missionName: string
  steps: { label: string; done: boolean }[]
  deliverableTitle: string
  deliverableItems: string[]
  deliverableStatus: string
}

const T = {
  fr: {
    eyebrow: 'La mission est lancée',
    title: 'Emma passe à l’action.',
    intro:
      'Une fois la mission confiée, Emma travaille dans son espace : elle avance étape par étape et vous sollicite au bon moment.',
    missionLabel: 'Mission en cours',
    validationTitle: 'En attente de votre validation',
    validate: 'Valider le livrable',
    modify: 'Demander une modification',
    conclusion:
      'Vous gardez la main sur les décisions. Emma prend en charge le travail, vous validez l’essentiel.',
    cta: 'Découvrir le Workspace',
    missions: {
      newsletter: {
        missionName: 'Préparer la prochaine newsletter',
        steps: [
          { label: 'Analyse des derniers contenus publiés', done: true },
          { label: 'Sélection des sujets du mois', done: true },
          { label: 'Rédaction des sections', done: true },
          { label: 'Création du visuel de couverture', done: true },
          { label: 'Validation avant publication', done: false },
        ],
        deliverableTitle: 'Newsletter — Septembre',
        deliverableItems: [
          'Édito : les nouveautés du mois',
          'Focus produit : la nouvelle fonctionnalité',
          'Étude de cas client',
          'Sélection d’articles du blog',
          'Invitation au prochain webinaire',
        ],
        deliverableStatus: 'Prête à être publiée',
      },
      prospects: {
        missionName: 'Qualifier une liste de prospects',
        steps: [
          { label: 'Import de la liste cible', done: true },
          { label: 'Enrichissement des contacts', done: true },
          { label: 'Scoring des prospects', done: true },
          { label: 'Rédaction des séquences email', done: true },
          { label: 'Validation avant envoi', done: false },
        ],
        deliverableTitle: 'Liste de prospects qualifiés',
        deliverableItems: [
          '120 contacts enrichis et vérifiés',
          'Score de priorité par prospect',
          'Séquence email en 3 messages',
          'Créneaux de relance planifiés',
          'Fiche de synthèse par compte',
        ],
        deliverableStatus: 'Prête à être contactée',
      },
      recrutement: {
        missionName: 'Organiser un recrutement',
        steps: [
          { label: 'Rédaction de la fiche de poste', done: true },
          { label: 'Sourcing des candidats', done: true },
          { label: 'Tri des candidatures', done: true },
          { label: 'Préqualification téléphonique', done: true },
          { label: 'Validation de la short-list', done: false },
        ],
        deliverableTitle: 'Short-list de candidats',
        deliverableItems: [
          'Fiche de poste finalisée',
          '8 candidats présélectionnés',
          'Comptes-rendus de préqualification',
          'Disponibilités pour entretien',
          'Recommandation de l’équipe',
        ],
        deliverableStatus: 'Prête pour vos entretiens',
      },
      ventes: {
        missionName: 'Analyser les ventes du trimestre',
        steps: [
          { label: 'Collecte des données de vente', done: true },
          { label: 'Nettoyage et consolidation', done: true },
          { label: 'Construction du tableau de bord', done: true },
          { label: 'Analyse des tendances', done: true },
          { label: 'Validation des recommandations', done: false },
        ],
        deliverableTitle: 'Tableau de bord des ventes',
        deliverableItems: [
          'Chiffre d’affaires par canal',
          'Évolution vs trimestre précédent',
          'Top produits et clients',
          'Prévisions du prochain trimestre',
          'Recommandations d’action',
        ],
        deliverableStatus: 'Prêt à être présenté',
      },
    } as Record<string, WorkspaceMission>,
  },
  en: {
    eyebrow: 'The mission is live',
    title: 'Emma gets to work.',
    intro:
      'Once the mission is entrusted, Emma works in her own space: she moves step by step and asks for you at the right moment.',
    missionLabel: 'Mission in progress',
    validationTitle: 'Waiting for your approval',
    validate: 'Approve the deliverable',
    modify: 'Request a change',
    conclusion:
      'You stay in control of decisions. Emma handles the work, you approve what matters.',
    cta: 'Discover the Workspace',
    missions: {
      newsletter: {
        missionName: 'Prepare the next newsletter',
        steps: [
          { label: 'Reviewing recently published content', done: true },
          { label: 'Selecting this month’s topics', done: true },
          { label: 'Writing the sections', done: true },
          { label: 'Creating the cover visual', done: true },
          { label: 'Validation before publishing', done: false },
        ],
        deliverableTitle: 'Newsletter — September',
        deliverableItems: [
          'Editorial: this month’s highlights',
          'Product focus: the new feature',
          'Customer case study',
          'A selection of blog articles',
          'Invite to the next webinar',
        ],
        deliverableStatus: 'Ready to publish',
      },
      prospects: {
        missionName: 'Qualify a prospect list',
        steps: [
          { label: 'Importing the target list', done: true },
          { label: 'Enriching the contacts', done: true },
          { label: 'Scoring the prospects', done: true },
          { label: 'Writing the email sequences', done: true },
          { label: 'Validation before sending', done: false },
        ],
        deliverableTitle: 'Qualified prospect list',
        deliverableItems: [
          '120 enriched, verified contacts',
          'Priority score per prospect',
          '3-message email sequence',
          'Scheduled follow-up slots',
          'Summary sheet per account',
        ],
        deliverableStatus: 'Ready to reach out',
      },
      recrutement: {
        missionName: 'Run a hiring process',
        steps: [
          { label: 'Writing the job description', done: true },
          { label: 'Sourcing candidates', done: true },
          { label: 'Screening applications', done: true },
          { label: 'Phone pre-qualification', done: true },
          { label: 'Validating the short-list', done: false },
        ],
        deliverableTitle: 'Candidate short-list',
        deliverableItems: [
          'Finalized job description',
          '8 shortlisted candidates',
          'Pre-qualification debriefs',
          'Interview availabilities',
          'Team recommendation',
        ],
        deliverableStatus: 'Ready for your interviews',
      },
      ventes: {
        missionName: 'Analyze the quarter’s sales',
        steps: [
          { label: 'Collecting sales data', done: true },
          { label: 'Cleaning and consolidating', done: true },
          { label: 'Building the dashboard', done: true },
          { label: 'Analyzing trends', done: true },
          { label: 'Validating recommendations', done: false },
        ],
        deliverableTitle: 'Sales dashboard',
        deliverableItems: [
          'Revenue by channel',
          'Change vs previous quarter',
          'Top products and customers',
          'Next quarter forecast',
          'Recommended actions',
        ],
        deliverableStatus: 'Ready to present',
      },
    } as Record<string, WorkspaceMission>,
  },
} as const

export function SectionWorkspace({
  lang = 'fr',
  missionKey = 'newsletter',
}: {
  lang?: 'fr' | 'en'
  missionKey?: string
}) {
  const t = T[lang]
  const m = t.missions[missionKey] ?? t.missions.newsletter

  return (
    <section className="relative overflow-hidden bg-[#FBF9F3] py-20 sm:py-28">
      <div className="editorial-shell">
        <div className="max-w-2xl text-left">
          <p className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D10E63]">
            {t.eyebrow}
          </p>
          <h2 className="text-balance font-sf text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-[#1C1A17]">
            {t.title}
          </h2>
          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-[#4E483F]">
            {t.intro}
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Progress panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease }}
            className="premium-shadow rounded-[1.5rem] border border-[#D8D0C2] bg-[#F3EFE6] p-5 sm:p-6"
          >
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#5F594F]">
              {t.missionLabel}
            </p>
            <AnimatePresence mode="wait">
              <motion.div
                key={missionKey}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease }}
              >
                <p className="mt-1 text-lg font-bold text-[#1C1A17]">{m.missionName}</p>

                <ul className="mt-5 flex flex-col gap-3">
                  {m.steps.map((step) => (
                    <li key={step.label} className="flex items-center gap-3">
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                          step.done ? 'bg-[#D10E63] text-[#FBF9F3]' : 'bg-[#E4DDCE] text-[#D10E63]'
                        }`}
                        aria-hidden="true"
                      >
                        {step.done ? (
                          <Check className="h-3.5 w-3.5" strokeWidth={3} />
                        ) : (
                          <Loader2 className="h-3.5 w-3.5 animate-spin motion-reduce:animate-none" />
                        )}
                      </span>
                      <span
                        className={`text-sm ${
                          step.done ? 'text-[#6E665A] line-through decoration-[#C9BFAF]' : 'font-semibold text-[#1C1A17]'
                        }`}
                      >
                        {step.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 rounded-2xl border border-[#D10E63]/25 bg-[#D10E63]/[0.05] p-4">
              <p className="text-sm font-bold text-[#A80B50]">{t.validationTitle}</p>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#D10E63] px-4 py-2.5 text-sm font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2"
                >
                  <Check className="h-4 w-4" strokeWidth={2.5} />
                  {t.validate}
                </button>
                <button
                  type="button"
                  className="inline-flex flex-1 items-center justify-center rounded-full border border-[#D8D0C2] bg-[#FBF9F3] px-4 py-2.5 text-sm font-semibold text-[#4E483F] transition-colors hover:border-[#D10E63]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2"
                >
                  {t.modify}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Deliverable preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            className="premium-shadow flex flex-col rounded-[1.5rem] border border-[#D8D0C2] bg-[#FBF9F3] p-5 sm:p-6"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={missionKey}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease }}
                className="flex flex-1 flex-col"
              >
                <div className="flex items-center gap-3 border-b border-[#E4DDCE] pb-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D10E63]/10 text-[#D10E63]">
                    <FileText className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-[#1C1A17]">{m.deliverableTitle}</p>
                    <p className="text-[11px] text-[#6E665A]">{m.deliverableStatus}</p>
                  </div>
                </div>
                <ul className="mt-4 flex flex-1 flex-col gap-2.5">
                  {m.deliverableItems.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-[#4E483F]">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D10E63]" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex items-center gap-2 rounded-xl bg-[#F3EFE6] px-3 py-2 text-xs font-semibold text-[#A80B50]">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  {m.deliverableStatus}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        <div className="mx-auto mt-8 max-w-2xl text-center">
          <p className="text-pretty text-sm leading-relaxed text-[#6E665A]">{t.conclusion}</p>
          <a
            href="/workspace"
            className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#D10E63] hover:underline"
          >
            {t.cta}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
