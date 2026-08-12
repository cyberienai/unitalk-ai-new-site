'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, Wrench } from 'lucide-react'
import { useLanguage, useT } from '@/lib/language-context'
import { ROLE_DETAILS } from '@/lib/collaborators-catalog'

export function CollabRoleDetail({ slug }: { slug: string }) {
  const { lang } = useLanguage()
  const role = ROLE_DETAILS[slug]

  const t = useT({
    fr: {
      back: 'Tous les rôles',
      skills: 'Compétences',
      tools: 'Outils',
      missions: 'Exemples de missions',
      ctaTitle: 'Recrutez',
      ctaBtn: 'Créer ce Collaborateur IA',
    },
    en: {
      back: 'All roles',
      skills: 'Skills',
      tools: 'Tools',
      missions: 'Example missions',
      ctaTitle: 'Hire',
      ctaBtn: 'Create this AI Collaborator',
    },
  })

  if (!role) return null

  return (
    <main className="w-full bg-[#F3EFE6]">

      {/* Hero */}
      <section className="px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <a href="/collaborateurs-ia/roles" className="inline-flex items-center gap-2 text-sm font-medium text-[#6B6560] transition-colors hover:text-[#D10E63]">
            <ArrowLeft className="h-4 w-4" />
            {t.back}
          </a>

          <div className="mt-8 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <div className="relative shrink-0">
              <img src={role.avatar || "/placeholder.svg"} alt={role.name} className="h-24 w-24 rounded-full object-cover ring-4 ring-[#D10E63]/15" />
              <span className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-2 border-[#F3EFE6] bg-[#D10E63]" />
            </div>
            <div>
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#D10E63]">{role.department[lang]}</p>
              <h1 className="mt-2 font-sf text-4xl font-bold text-[#1C1A17] [letter-spacing:-0.03em] sm:text-5xl">{role.name}</h1>
              <p className="mt-1 text-lg text-[#4E483F]">{role.role[lang]}</p>
            </div>
          </div>

          <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-[#4E483F]">{role.description[lang]}</p>
        </div>
      </section>

      {/* Skills + Tools */}
      <section className="border-t border-[#DDD5CA] px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-4xl gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-sf text-2xl font-semibold text-[#1C1A17] [letter-spacing:-0.02em]">{t.skills}</h2>
            <div className="mt-6 flex flex-col gap-3">
              {role.skills.map((skill) => (
                <div key={skill[lang]} className="flex items-center gap-3 rounded-2xl border border-[#DDD5CA] bg-[#FBF9F3] p-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#D10E63]/10">
                    <Check className="h-4 w-4 text-[#D10E63]" />
                  </span>
                  <p className="text-sm font-medium text-[#1C1A17]">{skill[lang]}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-sf text-2xl font-semibold text-[#1C1A17] [letter-spacing:-0.02em]">{t.tools}</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {role.tools.map((tool) => (
                <span key={tool} className="inline-flex items-center gap-2 rounded-full border border-[#DDD5CA] bg-[#FBF9F3] px-4 py-2 text-sm font-medium text-[#1C1A17]">
                  <Wrench className="h-4 w-4 text-[#D10E63]" />
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Missions */}
      <section className="border-t border-[#DDD5CA] bg-[#EAE3D4] px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-sf text-2xl font-semibold text-[#1C1A17] [letter-spacing:-0.02em] sm:text-3xl">{t.missions}</h2>
          <div className="mt-8 flex flex-col gap-4">
            {role.missions.map((mission, i) => (
              <motion.div
                key={mission[lang]}
                className="flex items-center gap-4 rounded-2xl border border-[#DDD5CA] bg-[#FBF9F3] p-5"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1C1A17] font-mono text-sm font-bold text-[#FBF9F3]">{i + 1}</span>
                <p className="font-medium text-[#1C1A17]">{mission[lang]}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#D10E63] px-5 py-24 text-center text-[#FBF9F3] sm:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-balance font-sf text-4xl font-semibold [letter-spacing:-0.04em] md:text-5xl">{t.ctaTitle} {role.name}.</h2>
          <a href="/signup" className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#FBF9F3] px-7 py-3.5 font-bold text-[#1C1A17] transition-transform hover:-translate-y-0.5">
            {t.ctaBtn}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  )
}
