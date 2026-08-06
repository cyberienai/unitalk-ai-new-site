'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ArrowDown, Brain, Check, Mail, Phone, Sparkles, UserRound, Wrench, X } from 'lucide-react'
import { useT } from '@/lib/language-context'

const CARD_ICONS = [UserRound, Brain, Wrench, Sparkles]
const WORK_ICONS = [Mail, ArrowDown, Phone, Check]

export function CollabWhatContent() {
  const t = useT({
    fr: {
      eyebrow: 'Assistant vs Collaborateur',
      titleLine1: 'L\'Assistant IA augmente vos collaborateurs.',
      titleLine2: 'Le Collaborateur IA augmente votre organisation.',
      subtitle: 'Il possède une identité, une mémoire, des outils et travaille durablement aux côtés de vos équipes.',
      humanLabel: 'Un employé',
      collabLabel: 'Son Collaborateur IA',
      tableTitle: 'Bien plus qu\'un chatbot.',
      colChat: 'ChatGPT',
      colCollab: 'Collaborateur IA',
      rows: [
        ['Une conversation', 'Une identité'],
        ['Oublie', 'Une mémoire permanente'],
        ['Aucun outil', 'Email, agenda, téléphone'],
        ['Isolé', 'Travaille avec l\'équipe'],
        ['Pas d\'organisation', 'Membre de l\'organigramme'],
      ],
      makeTitle: 'Ce qui fait un Collaborateur IA',
      cards: [
        { title: 'Identité', body: 'Un nom, un rôle, une place dans votre organigramme.' },
        { title: 'Mémoire', body: 'Une mémoire permanente qui grandit avec chaque mission.' },
        { title: 'Outils', body: 'Email, agenda, téléphone et vos applications métier.' },
        { title: 'Compétences', body: 'Un savoir-faire dédié à sa fonction, qui s\'améliore.' },
      ],
      workTitle: 'Ils travaillent comme vos équipes.',
      workSubtitle: 'Une journée type d\'Emma, Assistante de Direction.',
      work: [
        'Emma répond à un email.',
        'Prend un rendez-vous.',
        'Met à jour le CRM.',
        'Passe un appel.',
      ],
      ctaTitle: 'Recrutez votre premier Collaborateur IA.',
      ctaBtn: 'Créer mon Collaborateur IA',
    },
    en: {
      eyebrow: 'Assistant vs Collaborator',
      titleLine1: 'An AI Assistant augments your employees.',
      titleLine2: 'An AI Collaborator augments your organization.',
      subtitle: 'It has an identity, a memory, tools and works durably alongside your teams.',
      humanLabel: 'An employee',
      collabLabel: 'Their AI Collaborator',
      tableTitle: 'Much more than a chatbot.',
      colChat: 'ChatGPT',
      colCollab: 'AI Collaborator',
      rows: [
        ['A conversation', 'An identity'],
        ['Forgets', 'A permanent memory'],
        ['No tools', 'Email, calendar, phone'],
        ['Isolated', 'Works with the team'],
        ['No organization', 'Member of the org chart'],
      ],
      makeTitle: 'What makes an AI Collaborator',
      cards: [
        { title: 'Identity', body: 'A name, a role, a place in your org chart.' },
        { title: 'Memory', body: 'A permanent memory that grows with every mission.' },
        { title: 'Tools', body: 'Email, calendar, phone and your business apps.' },
        { title: 'Skills', body: 'Expertise dedicated to its role, that keeps improving.' },
      ],
      workTitle: 'They work like your teams.',
      workSubtitle: 'A typical day for Emma, Executive Assistant.',
      work: [
        'Emma answers an email.',
        'Books a meeting.',
        'Updates the CRM.',
        'Makes a call.',
      ],
      ctaTitle: 'Hire your first AI Collaborator.',
      ctaBtn: 'Create my AI Collaborator',
    },
  })

  return (
    <main className="w-full bg-[#F3EFE6]">
      {/* Hero */}
      <section className="px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#D10E63]">{t.eyebrow}</p>
            <h1 className="text-balance font-sf text-4xl font-bold leading-[1.08] [letter-spacing:-0.04em] sm:text-5xl lg:text-[3.5rem]">
              <span className="block text-[#6B6560]">{t.titleLine1}</span>
              <span className="mt-2 block text-[#D10E63]">{t.titleLine2}</span>
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-[#4E483F]">{t.subtitle}</p>
          </div>

          <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-4">
            <div className="flex w-full items-center gap-4 rounded-2xl border border-[#DDD5CA] bg-[#FBF9F3] p-5">
              <img src="/thomas-avatar.png" alt="" className="h-14 w-14 shrink-0 rounded-full object-cover grayscale-[25%]" />
              <div>
                <p className="text-sm font-bold text-[#1C1A17]">Thomas</p>
                <p className="text-xs text-[#6B6560]">{t.humanLabel}</p>
              </div>
            </div>
            <ArrowDown className="h-6 w-6 text-[#D10E63]" aria-hidden="true" />
            <div className="flex w-full items-center gap-4 rounded-2xl border-2 border-[#D10E63]/25 bg-[#FBF9F3] p-5 shadow-[0_18px_48px_rgba(209,14,99,0.12)]">
              <div className="relative shrink-0">
                <img src="/nina-avatar.png" alt="" className="h-14 w-14 rounded-full object-cover ring-2 ring-[#D10E63]/20" />
                <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-[#FBF9F3] bg-[#D10E63]" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#1C1A17]">Emma</p>
                <p className="text-xs font-medium text-[#D10E63]">{t.collabLabel}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section id="gouvernance" className="scroll-mt-20 border-t border-[#DDD5CA] px-5 py-20 sm:scroll-mt-24 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-balance text-center font-sf text-3xl font-semibold text-[#1C1A17] [letter-spacing:-0.03em] sm:text-5xl">{t.tableTitle}</h2>
          <div className="mt-12 overflow-hidden rounded-3xl border border-[#DDD5CA] bg-[#FBF9F3]">
            <div className="grid grid-cols-2 border-b border-[#DDD5CA] bg-[#EAE3D4]">
              <div className="px-5 py-4 text-sm font-bold text-[#857C6E] sm:px-8 sm:text-base">{t.colChat}</div>
              <div className="border-l border-[#DDD5CA] px-5 py-4 text-sm font-bold text-[#D10E63] sm:px-8 sm:text-base">{t.colCollab}</div>
            </div>
            {t.rows.map((row, i) => (
              <div key={i} className="grid grid-cols-2 border-b border-[#DDD5CA] last:border-b-0">
                <div className="flex items-center gap-2 px-5 py-4 text-[#6B6560] sm:px-8">
                  <X className="h-4 w-4 shrink-0 text-[#B7AE9F]" aria-hidden="true" />
                  <span className="text-sm sm:text-base">{row[0]}</span>
                </div>
                <div className="flex items-center gap-2 border-l border-[#DDD5CA] px-5 py-4 font-medium text-[#1C1A17] sm:px-8">
                  <Check className="h-4 w-4 shrink-0 text-[#D10E63]" aria-hidden="true" />
                  <span className="text-sm sm:text-base">{row[1]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What makes a collaborator */}
      <section id="workspace" className="scroll-mt-20 border-t border-[#DDD5CA] px-5 py-20 sm:scroll-mt-24 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-balance text-center font-sf text-3xl font-semibold text-[#1C1A17] [letter-spacing:-0.03em] sm:text-5xl">{t.makeTitle}</h2>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.cards.map((card, i) => {
              const Icon = CARD_ICONS[i]
              return (
                <motion.div
                  key={card.title}
                  className="rounded-2xl border border-[#DDD5CA] bg-[#FBF9F3] p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1C1A17]">
                    <Icon className="h-6 w-6 text-[#FBF9F3]" />
                  </span>
                  <h3 className="mt-6 text-xl font-bold text-[#1C1A17]">{card.title}</h3>
                  <p className="mt-3 text-pretty text-sm leading-relaxed text-[#6B6560]">{card.body}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* They work like your teams */}
      <section id="demonstration" className="scroll-mt-20 border-t border-[#DDD5CA] bg-[#1C1A17] px-5 py-20 text-[#FBF9F3] sm:scroll-mt-24 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance font-sf text-3xl font-semibold [letter-spacing:-0.03em] sm:text-5xl">{t.workTitle}</h2>
          <p className="mt-5 text-[#BDB5A9]">{t.workSubtitle}</p>
          <div className="mt-12 flex flex-col gap-3">
            {t.work.map((step, i) => {
              const Icon = WORK_ICONS[i]
              return (
                <motion.div
                  key={step}
                  className="flex items-center gap-4 rounded-2xl border border-[#FBF9F3]/15 bg-[#FBF9F3]/5 p-4 text-left"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.12 }}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#D10E63]">
                    <Icon className="h-5 w-5 text-[#FBF9F3]" />
                  </span>
                  <p className="font-medium">{step}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#D10E63] px-5 py-24 text-center text-[#FBF9F3] sm:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-balance font-sf text-4xl font-semibold [letter-spacing:-0.04em] md:text-6xl">{t.ctaTitle}</h2>
          <a href="/signup" className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#FBF9F3] px-7 py-3.5 font-bold text-[#1C1A17] transition-transform hover:-translate-y-0.5">
            {t.ctaBtn}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  )
}
