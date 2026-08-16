'use client'

import { motion } from 'framer-motion'
import { Mic, Sparkles, LifeBuoy, ShieldCheck } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as const

const T = {
  fr: {
    items: [
      { icon: Mic, title: 'Voix ou texte', desc: 'Décrivez votre mission naturellement.' },
      { icon: Sparkles, title: '1 million de tokens inclus', desc: 'Pour tester une mission réelle pendant 7 jours.' },
      { icon: LifeBuoy, title: 'Accompagnement humain', desc: 'Alma cadre la mission, votre équipe garde la main.' },
      { icon: ShieldCheck, title: 'Hébergé en France', desc: 'RGPD, AI Act et données isolées.' },
    ],
  },
  en: {
    items: [
      { icon: Mic, title: 'Voice or text', desc: 'Describe your mission naturally.' },
      { icon: Sparkles, title: '1 million tokens included', desc: 'To test a real mission for 7 days.' },
      { icon: LifeBuoy, title: 'Human support', desc: 'Alma scopes the mission, your team stays in control.' },
      { icon: ShieldCheck, title: 'Hosted in France', desc: 'GDPR, AI Act and isolated data.' },
    ],
  },
} as const

export function SectionReassurance({ lang }: { lang: 'fr' | 'en' }) {
  const t = T[lang]

  return (
    <section aria-label={lang === 'fr' ? 'Réassurance' : 'Reassurance'} className="w-full border-t border-[#E9E2D4] bg-[#F3EFE6]">
      <div className="editorial-shell py-8 sm:py-10">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-6 lg:grid-cols-4">
          {t.items.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, ease, delay: i * 0.08 }}
                className="flex items-center gap-3"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#E4DCCF] bg-[#FBF9F3] text-[#D10E63]">
                  <Icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-bold leading-tight text-[#1C1A17]">{item.title}</p>
                  <p className="mt-0.5 text-[13px] leading-tight text-[#6B6560]">{item.desc}</p>
                </div>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
