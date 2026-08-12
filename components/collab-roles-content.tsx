'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { useLanguage, useT } from '@/lib/language-context'
import { DEPARTMENTS } from '@/lib/collaborators-catalog'

export function CollabRolesContent() {
  const { lang } = useLanguage()
  const t = useT({
    fr: {
      eyebrow: 'Le catalogue',
      title: 'Un catalogue de Collaborateurs IA.',
      subtitle: "Ce n'est pas un marketplace. C'est un catalogue de rôles, comme des fiches de poste, prêts à rejoindre votre organisation.",
      featured: 'Fiches détaillées',
      viewRole: 'Voir la fiche',
      soon: 'Bientôt',
      ctaTitle: 'Un rôle manque à l\'appel ?',
      ctaSubtitle: 'Décrivez votre besoin, nous concevons le Collaborateur IA adapté.',
      ctaBtn: 'Créer un Collaborateur IA',
    },
    en: {
      eyebrow: 'The catalog',
      title: 'A catalog of AI Collaborators.',
      subtitle: "It's not a marketplace. It's a catalog of roles, like job descriptions, ready to join your organization.",
      featured: 'Detailed profiles',
      viewRole: 'View profile',
      soon: 'Soon',
      ctaTitle: 'A role is missing?',
      ctaSubtitle: 'Describe your need and we design the right AI Collaborator.',
      ctaBtn: 'Create an AI Collaborator',
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

      {/* Catalog by department */}
      <section className="border-t border-[#DDD5CA] px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-14">
          {DEPARTMENTS.map((dept, deptIndex) => (
            <motion.div
              key={dept.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: Math.min(deptIndex, 4) * 0.05 }}
            >
              <div className="flex items-center gap-4">
                <h2 className="font-sf text-2xl font-semibold text-[#1C1A17] [letter-spacing:-0.02em] sm:text-3xl">{dept.label[lang]}</h2>
                <span className="h-px flex-1 bg-[#DDD5CA]" />
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {dept.roles.map((role) => {
                  const content = (
                    <>
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-[#1C1A17]">{role.name}</h3>
                        {role.slug ? (
                          <ArrowUpRight className="h-5 w-5 text-[#D10E63]" />
                        ) : (
                          <span className="rounded-full bg-[#EAE3D4] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#857C6E]">{t.soon}</span>
                        )}
                      </div>
                      <p className="mt-2 text-sm text-[#6B6560]">{role.title[lang]}</p>
                      {role.slug && <p className="mt-4 text-xs font-semibold text-[#D10E63]">{t.viewRole}</p>}
                    </>
                  )
                  return role.slug ? (
                    <a
                      key={role.name}
                      href={`/collaborateurs-ia/roles/${role.slug}`}
                      className="rounded-2xl border-2 border-[#D10E63]/25 bg-[#FBF9F3] p-5 transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(209,14,99,0.14)]"
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={role.name} className="rounded-2xl border border-[#DDD5CA] bg-[#FBF9F3] p-5">
                      {content}
                    </div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#D10E63] px-5 py-24 text-center text-[#FBF9F3] sm:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-balance font-sf text-4xl font-semibold [letter-spacing:-0.04em] md:text-5xl">{t.ctaTitle}</h2>
          <p className="mx-auto mt-5 max-w-xl text-[#FBF9F3]/85">{t.ctaSubtitle}</p>
          <a href="/signup" className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#FBF9F3] px-7 py-3.5 font-bold text-[#1C1A17] transition-transform hover:-translate-y-0.5">
            {t.ctaBtn}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  )
}
