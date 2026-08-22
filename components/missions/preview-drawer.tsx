'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, X, Check } from 'lucide-react'
import { type Mission, type MissionCategory } from '@/lib/missions-catalog'
import type { Lang } from '@/lib/language-context'

const CREATE_ORG_HREF = '/decouvrir'

function categoryLabel(cats: MissionCategory[], key: string, lang: Lang): string {
  return cats.find((c) => c.key === key)?.label[lang] ?? key
}

export function PreviewDrawer({
  mission,
  categories,
  lang,
  onClose,
}: {
  mission: Mission | null
  categories: MissionCategory[]
  lang: Lang
  onClose: () => void
}) {
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!mission) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [mission, onClose])

  const t = {
    receive: lang === 'fr' ? 'Ce que vous recevez' : 'What you receive',
    example: lang === 'fr' ? 'Exemple fictif' : 'Sample (illustrative)',
    prepares: lang === 'fr' ? 'Alma préparera' : 'Alma will prepare',
    profile: lang === 'fr' ? 'Profil métier' : 'Job profile',
    skills: lang === 'fr' ? 'Compétences' : 'Skills',
    apps: lang === 'fr' ? 'Applications nécessaires' : 'Required apps',
    continuity:
      lang === 'fr'
        ? 'Cette mission enrichit les savoir-faire de votre Collaborateur IA. Son identité, sa mémoire et son historique restent continus.'
        : 'This mission enriches your AI Collaborator’s know-how. Its identity, memory and history stay continuous.',
    entrust: lang === 'fr' ? 'Préparer cette mission avec Alma' : 'Prepare this mission with Alma',
    detail: lang === 'fr' ? 'Voir la fiche détaillée' : 'See full details',
    close: lang === 'fr' ? 'Fermer' : 'Close',
    validationWord: lang === 'fr' ? 'Règle de validation' : 'Validation rule',
  }

  return (
    <AnimatePresence>
      {mission && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-[#241F1D]/40 backdrop-blur-[2px]"
            aria-hidden="true"
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={mission.title[lang]}
            initial={reduce ? { opacity: 0 } : { x: '100%' }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: '100%' }}
            transition={{ type: 'tween', duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 z-50 flex h-full w-full flex-col bg-[var(--store-page)] sm:max-w-[468px]"
          >
            <div className="flex items-start justify-between gap-4 px-6 pt-6">
              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--store-muted)]">
                    {categoryLabel(categories, mission.category, lang)}
                  </span>
                </div>
                <h2 className="mt-2 font-sf text-[22px] font-semibold leading-snug tracking-[-0.01em] text-[var(--store-text)]">
                  {mission.title[lang]}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label={t.close}
                className="shrink-0 rounded-lg p-1.5 text-[var(--store-muted)] transition-colors hover:bg-[var(--store-text)]/[0.06]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              <p className="text-sm leading-relaxed text-[var(--store-muted)]">{mission.result[lang]}</p>

              <h3 className="mt-6 text-[13px] font-bold text-[var(--store-text)]">{t.receive}</h3>
              <ul className="mt-2 flex flex-col gap-1.5">
                {mission.produces.map((p) => (
                  <li key={p[lang]} className="flex items-start gap-2 text-[13px] leading-relaxed text-[var(--store-muted)]">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#D10E63]" strokeWidth={2.5} />
                    {p[lang]}
                  </li>
                ))}
              </ul>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--store-muted)]/70">
                {t.example}
              </p>

              <div className="mt-6 rounded-xl border border-[var(--store-line)] bg-[var(--store-surface)] p-4">
                <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#AD0C53]">
                  {t.prepares}
                </h3>
                <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-[var(--store-muted)]">
                  {t.profile}
                </p>
                <p className="mt-0.5 text-sm font-semibold text-[var(--store-text)]">{mission.profile[lang]}</p>
                <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-[var(--store-muted)]">
                  {t.skills}
                </p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {mission.skills.slice(0, 3).map((s) => (
                    <span
                      key={s[lang]}
                      className="rounded-full bg-[#FCEAF2] px-2.5 py-1 text-xs font-medium text-[#AD0C53]"
                    >
                      {s[lang]}
                    </span>
                  ))}
                </div>
                {mission.tools.length > 0 && (
                  <>
                    <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-[var(--store-muted)]">
                      {t.apps}
                    </p>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {mission.tools.map((tool) => (
                        <span
                          key={tool}
                          className="rounded-full border border-[var(--store-line)] bg-[var(--store-page)] px-2.5 py-1 text-xs font-medium text-[var(--store-text)]"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="mt-5">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--store-muted)]">
                  {t.validationWord}
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-[var(--store-text)]">{mission.validation[lang]}</p>
              </div>

              <p className="mt-5 border-l-2 border-[#D10E63] pl-3 text-[13px] leading-relaxed text-[var(--store-muted)]">
                {t.continuity}
              </p>
            </div>

            <div className="border-t border-[var(--store-line)] bg-[var(--store-surface)] px-6 py-4">
              <Link
                href={`${CREATE_ORG_HREF}?mission=${mission.slug}`}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#D10E63] px-5 py-3 text-sm font-bold text-[#FBF9F3] transition-colors hover:bg-[#B90C57]"
              >
                {t.entrust}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={`/missions/${mission.slug}`}
                className="mt-2 flex w-full items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold text-[var(--store-text)] transition-colors hover:bg-[var(--store-text)]/[0.05]"
              >
                {t.detail}
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
