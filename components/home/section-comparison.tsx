'use client'

import { useLanguage } from '@/lib/language-context'
import { Kicker } from '@/components/home/section-kicker'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const COPY = {
  fr: {
    kicker: 'La différence',
    title: 'Un agent prêt à l’emploi vous donne une capacité.',
    titleAccent: 'Unitalk développe la vôtre.',
    lead: 'Les agents prêts à l’emploi sont devenus performants. La vraie différence ne se joue plus sur la capacité brute, mais sur ce qui vous appartient : la méthode, l’identité et l’expérience accumulée.',
    beforeTitle: 'Un agent prêt à l’emploi',
    afterTitle: 'Un Collaborateur IA Unitalk',
    before: [
      'Des compétences identiques pour tous',
      'Un résultat produit dans le service',
      'Une identité liée à une fonction',
      'Un contexte conservé par la plateforme',
    ],
    after: [
      'Une méthode propre à votre entreprise',
      'Une compétence testée et versionnée',
      'Une identité persistante',
      'Un partage et des accès gouvernés',
      'Une expérience conservée dans votre Workspace',
    ],
  },
  en: {
    kicker: 'The difference',
    title: 'An off-the-shelf agent gives you a capability.',
    titleAccent: 'Unitalk builds yours.',
    lead: 'Off-the-shelf agents have become capable. The real difference is no longer raw capability, but what belongs to you: the method, the identity and the experience you accumulate.',
    beforeTitle: 'An off-the-shelf agent',
    afterTitle: 'A Unitalk AI Collaborator',
    before: [
      'The same skills for everyone',
      'A result produced inside the service',
      'An identity tied to a function',
      'Context kept by the platform',
    ],
    after: [
      'A method specific to your company',
      'A tested and versioned skill',
      'A persistent identity',
      'Governed sharing and access',
      'Experience kept in your Workspace',
    ],
  },
}

export function SectionComparison() {
  const { lang } = useLanguage()
  const t = COPY[lang]

  return (
    <section className="border-t border-[#E7E0D2] bg-[#F4F1EA] px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <Kicker>{t.kicker}</Kicker>
        <h2 className="mt-5 max-w-3xl text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-[#1C1A17] sm:text-4xl md:text-5xl">
          {t.title} <span className="text-[#D10E63]">{t.titleAccent}</span>
        </h2>
        <p className="mt-5 max-w-2xl text-pretty text-[15px] leading-relaxed text-[#6B6459] sm:text-base">{t.lead}</p>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {/* Before — muted, inert */}
          <div className="rounded-3xl border border-[#E4DDCE] bg-[#EDE7DA]/60 p-7">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#9A9184]">{t.beforeTitle}</p>
            <ul className="mt-6 flex flex-col gap-4">
              {t.before.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] leading-snug text-[#857C6E]">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#CFC6B4]">
                    <span className="h-[2px] w-2.5 rounded-full bg-[#B4AB99]" aria-hidden />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* After — alive, magenta-accented */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl border border-[#1C1A17] bg-[#1C1A17] p-7"
          >
            <span aria-hidden className="absolute left-0 top-0 h-full w-[3px] bg-[#D10E63]" />
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#E8A0BE]">{t.afterTitle}</p>
            <ul className="mt-6 flex flex-col gap-4">
              {t.after.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] font-medium leading-snug text-[#F4F1EA]">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D10E63]">
                    <Check className="h-3 w-3 text-white" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
