'use client'

import { motion } from 'framer-motion'
import { ArrowRight, GraduationCap, Plug, PlusCircle, TrendingUp, UserPlus } from 'lucide-react'
import { useT } from '@/lib/language-context'

const STEP_ICONS = [PlusCircle, UserPlus, GraduationCap, Plug, TrendingUp]

export function CollabHowContent() {
  const t = useT({
    fr: {
      eyebrow: 'Comment ça fonctionne',
      title: 'De la création à l\'autonomie.',
      subtitle: 'Cinq étapes simples pour faire entrer un Collaborateur IA dans votre entreprise.',
      steps: [
        { title: 'Créer', body: 'Vous créez un Collaborateur IA en quelques minutes et lui donnez un rôle.' },
        { title: 'Inviter', body: 'Chaque employé reçoit son Collaborateur IA, comme un nouveau membre d\'équipe.' },
        { title: 'Former', body: 'Vous lui transmettez vos procédures, votre contexte et vos attentes.' },
        { title: 'Travailler', body: 'Vous connectez vos applications : il agit dans vos outils au quotidien.' },
        { title: 'Apprendre', body: 'Chaque mission enrichit sa mémoire. Il devient meilleur avec le temps.' },
      ],
      recapTitle: 'Ce qui se passe, concrètement.',
      recap: [
        'Chaque employé reçoit son Collaborateur IA.',
        'Vous connectez les applications.',
        'Ils apprennent votre métier.',
        'Ils deviennent meilleurs.',
      ],
      ctaTitle: 'Prêt à créer le vôtre ?',
      ctaBtn: 'Créer mon Collaborateur IA',
    },
    en: {
      eyebrow: 'How it works',
      title: 'From creation to autonomy.',
      subtitle: 'Five simple steps to bring an AI Collaborator into your company.',
      steps: [
        { title: 'Create', body: 'You create an AI Collaborator in minutes and give it a role.' },
        { title: 'Invite', body: 'Every employee gets their AI Collaborator, like a new team member.' },
        { title: 'Train', body: 'You share your procedures, your context and your expectations.' },
        { title: 'Work', body: 'You connect your apps: it acts inside your tools every day.' },
        { title: 'Learn', body: 'Every mission enriches its memory. It gets better over time.' },
      ],
      recapTitle: 'What actually happens.',
      recap: [
        'Every employee gets their AI Collaborator.',
        'You connect the applications.',
        'They learn your business.',
        'They get better.',
      ],
      ctaTitle: 'Ready to create yours?',
      ctaBtn: 'Create my AI Collaborator',
    },
  })

  return (
    <main className="w-full bg-[#F3EFE6]">

      {/* Hero */}
      <section className="px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#D10E63]">{t.eyebrow}</p>
          <h1 className="text-balance font-sf text-4xl font-bold leading-[1.05] text-[#1C1A17] [letter-spacing:-0.04em] sm:text-5xl lg:text-6xl">{t.title}</h1>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-[#4E483F]">{t.subtitle}</p>
        </div>
      </section>

      {/* Steps flow */}
      <section className="border-t border-[#DDD5CA] px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-col gap-4">
            {t.steps.map((step, i) => {
              const Icon = STEP_ICONS[i]
              return (
                <motion.div
                  key={step.title}
                  className="flex items-start gap-5 rounded-3xl border border-[#DDD5CA] bg-[#FBF9F3] p-6 sm:p-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                >
                  <div className="flex flex-col items-center">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#1C1A17]">
                      <Icon className="h-6 w-6 text-[#FBF9F3]" />
                    </span>
                    <span className="mt-2 font-mono text-xs font-semibold text-[#D10E63]">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="pt-1">
                    <h3 className="text-xl font-bold text-[#1C1A17] sm:text-2xl">{step.title}</h3>
                    <p className="mt-2 text-pretty leading-relaxed text-[#6B6560]">{step.body}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Recap */}
      <section className="border-t border-[#DDD5CA] bg-[#EAE3D4] px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-balance text-center font-sf text-3xl font-semibold text-[#1C1A17] [letter-spacing:-0.03em] sm:text-5xl">{t.recapTitle}</h2>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {t.recap.map((item, i) => (
              <motion.div
                key={item}
                className="flex items-center gap-4 rounded-2xl border border-[#DDD5CA] bg-[#FBF9F3] p-5"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#D10E63] font-mono text-sm font-bold text-[#FBF9F3]">{i + 1}</span>
                <p className="font-medium text-[#1C1A17]">{item}</p>
              </motion.div>
            ))}
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
