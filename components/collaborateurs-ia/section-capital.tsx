'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, Check, Share2 } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { SpecCard, type SpecRow } from './lucas-card'

const COPY = {
  fr: {
    kicker: 'Ce que l’entreprise conserve',
    title: 'Ce que vous validez devient un actif de votre entreprise.',
    lead: 'Une méthode testée et validée devient une compétence que votre entreprise peut conserver, améliorer, réutiliser et partager.',
    methodEyebrow: 'La méthode de Sophie',
    method: 'Après chaque appel, nous vérifions le dossier, classons la réclamation et planifions une relance sous trois jours.',
    skillEyebrow: 'La compétence de Solvea',
    skillTitle: 'Suivre une réclamation',
    skillRows: [
      { label: 'Source', value: 'Méthode transmise par Sophie' },
      { label: 'Créée avec', value: 'Lucas' },
      { label: 'Propriétaire', value: 'Solvea', tone: 'owner' },
      { label: 'Version', value: '1.0' },
      { label: 'Statut', status: 'Tests réussis · validée', tone: 'active' },
      { label: 'Partage', value: 'Équipe relation client' },
    ] as SpecRow[],
    usedBy: 'Lucas l’utilise aujourd’hui.',
    share: 'Partager avec Emma',
    receiveEyebrow: 'Emma reçoit la compétence',
    receiveRows: [
      { label: 'Emma peut utiliser', status: 'Version 1.0', tone: 'added' },
      { label: 'Propriétaire', value: 'Solvea reste propriétaire', tone: 'owner' },
      { label: 'Source et historique', status: 'Conservés', tone: 'active' },
    ] as SpecRow[],
    conclusion1: 'Lucas l’a apprise.',
    conclusion2: 'Solvea peut désormais la réutiliser.',
    memoryLine: 'La mémoire conserve ce que l’entreprise sait. La compétence conserve comment elle sait le faire.',
  },
  en: {
    kicker: 'What the company keeps',
    title: 'What you validate becomes an asset of your company.',
    lead: 'A tested and validated method becomes a skill your company can keep, improve, reuse and share.',
    methodEyebrow: 'Sophie’s method',
    method: 'After every call, we check the case, classify the complaint and schedule a follow-up within three days.',
    skillEyebrow: 'Solvea’s skill',
    skillTitle: 'Follow up on a complaint',
    skillRows: [
      { label: 'Source', value: 'Method shared by Sophie' },
      { label: 'Created with', value: 'Lucas' },
      { label: 'Owner', value: 'Solvea', tone: 'owner' },
      { label: 'Version', value: '1.0' },
      { label: 'Status', status: 'Tests passed · validated', tone: 'active' },
      { label: 'Sharing', value: 'Customer relations team' },
    ] as SpecRow[],
    usedBy: 'Lucas uses it today.',
    share: 'Share with Emma',
    receiveEyebrow: 'Emma receives the skill',
    receiveRows: [
      { label: 'Emma can use', status: 'Version 1.0', tone: 'added' },
      { label: 'Owner', value: 'Solvea stays the owner', tone: 'owner' },
      { label: 'Source and history', status: 'Kept', tone: 'active' },
    ] as SpecRow[],
    conclusion1: 'Lucas learned it.',
    conclusion2: 'Solvea can now reuse it.',
    memoryLine: 'Memory keeps what the company knows. A skill keeps how it knows to do it.',
  },
} as const

export function SectionCapital() {
  const { lang } = useLanguage()
  const reduce = useReducedMotion()
  const t = COPY[lang]

  return (
    <section className="border-b border-white/5 bg-[#161412] px-6 py-16 text-[#F4F1EA] sm:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="inline-flex items-center rounded-full border border-[#E8A0BF]/30 bg-[#E8A0BF]/10 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#F2BCD3]">
            {t.kicker}
          </p>
          <h2 className="mx-auto mt-5 max-w-2xl text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.02em] sm:text-4xl md:text-5xl">
            {t.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-[15px] leading-relaxed text-[#B8B0A4] sm:text-base">{t.lead}</p>
        </div>

        <div className="mt-12 flex flex-col items-center gap-5">
          {/* Sophie's method */}
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#211E1B] p-5">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#8E877C]">{t.methodEyebrow}</p>
            <p className="mt-2 text-pretty text-[15px] leading-relaxed text-[#C7C0B5]">“{t.method}”</p>
          </div>

          <ArrowDown aria-hidden className="h-5 w-5 text-[#D10E63]" />

          {/* The owned skill — glowing hero object */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-lg rounded-3xl border border-[#D10E63]/40 bg-[#211E1B] p-6 shadow-[0_0_80px_-20px_rgba(209,14,99,0.55)]"
          >
            <SpecCard eyebrow={t.skillEyebrow} title={t.skillTitle} rows={t.skillRows} dark className="border-0 bg-transparent p-0" />
            <p className="mt-3 flex items-center gap-2 border-t border-white/10 pt-3 text-[13px] text-[#B8B0A4]">
              <Image src="/images/lucas-avatar.png" alt="Lucas" width={24} height={24} className="h-6 w-6 rounded-full object-cover" />
              {t.usedBy}
            </p>
          </motion.div>

          {/* The share moment */}
          <div className="flex flex-col items-center">
            <span className="relative h-10 w-px overflow-hidden bg-[#D10E63]/25">
              <motion.span
                aria-hidden
                initial={reduce ? { scaleY: 1 } : { scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 origin-top bg-[#D10E63]"
              />
            </span>
            <motion.span
              initial={reduce ? false : { opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="inline-flex items-center gap-2 rounded-full bg-[#D10E63] px-5 py-2.5 text-[14px] font-bold text-[#FBF9F3] shadow-[0_10px_30px_-10px_rgba(209,14,99,0.8)]"
            >
              <Share2 className="h-4 w-4" />
              {t.share}
            </motion.span>
            <span className="relative h-10 w-px overflow-hidden bg-[#D10E63]/25">
              <motion.span
                aria-hidden
                initial={reduce ? { scaleY: 1 } : { scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute inset-0 origin-top bg-[#D10E63]"
              />
            </span>
          </div>

          {/* Emma receives */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="w-full max-w-lg"
          >
            <SpecCard eyebrow={t.receiveEyebrow} rows={t.receiveRows} dark accent />
          </motion.div>

          {/* Conclusion */}
          <div className="mt-6 w-full max-w-lg text-center">
            <p className="text-2xl font-semibold leading-tight tracking-[-0.02em] sm:text-3xl">{t.conclusion1}</p>
            <p className="text-2xl font-semibold leading-tight tracking-[-0.02em] text-[#F2BCD3] sm:text-3xl">{t.conclusion2}</p>
            <p className="mx-auto mt-5 max-w-md text-pretty text-[14px] leading-relaxed text-[#B8B0A4]">{t.memoryLine}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
