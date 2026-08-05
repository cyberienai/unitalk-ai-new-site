'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

const T = {
  fr: {
    eyebrow: 'Dans la durée',
    title: 'Alma vous accompagne dans le temps.',
    subtitle:
      'Alma ne disparaît pas après votre inscription. Elle continue à faire évoluer votre organisation.',
    steps: [
      'vous interviewer régulièrement',
      'mesurer votre satisfaction',
      'découvrir vos nouveaux produits',
      'suivre l’évolution de votre site web',
      'surveiller votre réputation',
      'observer votre marché',
      'recommander de nouveaux Collaborateurs IA',
      'proposer de nouvelles missions',
      'suggérer de nouvelles expertises',
      'vous informer des nouveaux modèles IA pertinents',
    ],
    closing: 'Votre organisation devient plus performante au fil du temps.',
  },
  en: {
    eyebrow: 'Over time',
    title: 'Alma supports you over time.',
    subtitle:
      'Alma does not disappear after you sign up. She keeps evolving your organization.',
    steps: [
      'interview you regularly',
      'measure your satisfaction',
      'discover your new products',
      'track how your website evolves',
      'monitor your reputation',
      'watch your market',
      'recommend new AI Collaborators',
      'propose new missions',
      'suggest new expertise',
      'tell you about relevant new AI models',
    ],
    closing: 'Your organization gets more effective over time.',
  },
} as const

export function SectionAlmaTimeline({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = T[lang]

  return (
    <section className="border-t border-white/10 bg-[#1C1A17] py-24 sm:py-32">
      <div className="editorial-shell">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="mb-5 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] py-1 pl-1 pr-3">
              <Image src="/alma-avatar.png" alt="Alma" width={24} height={24} className="h-6 w-6 rounded-full object-cover ring-2 ring-[#D10E63]/40" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#F0658F]">{t.eyebrow}</span>
            </span>
          </div>
          <h2 className="text-balance font-sf text-3xl font-bold leading-[1.05] tracking-[-0.035em] text-[#F3EFE6] sm:text-4xl lg:text-[2.75rem]">
            {t.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-[#B8B0A4]">{t.subtitle}</p>
        </motion.header>

        <div className="relative mx-auto mt-14 max-w-3xl">
          {/* vertical rail */}
          <span aria-hidden="true" className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-[#D10E63] via-[#D10E63]/40 to-transparent sm:left-1/2 sm:-translate-x-1/2" />
          <ul className="flex flex-col gap-5">
            {t.steps.map((step, i) => (
              <motion.li
                key={step}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, ease, delay: (i % 5) * 0.06 }}
                className={`relative flex items-center gap-4 pl-8 sm:w-[calc(50%-1.5rem)] sm:pl-0 ${
                  i % 2 === 0 ? 'sm:mr-auto sm:pr-10 sm:text-right sm:flex-row-reverse' : 'sm:ml-auto sm:pl-10'
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute left-0 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#1C1A17] bg-[#D10E63] sm:left-auto ${
                    i % 2 === 0 ? 'sm:-right-[1.9rem]' : 'sm:-left-[1.9rem]'
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FBF9F3]" />
                </span>
                <p className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[14px] font-medium leading-snug text-[#F3EFE6]">
                  {step}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease }}
          className="mx-auto mt-12 max-w-xl text-balance text-center font-sf text-lg font-semibold text-[#F3EFE6]"
        >
          {t.closing}
        </motion.p>
      </div>
    </section>
  )
}
