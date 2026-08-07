'use client'

import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Pause, Play } from 'lucide-react'
import type { Lang } from '@/lib/language-context'

/**
 * PRODUCT THEATRE — a LIGHT operational register (not a dark futuristic panel).
 * The parent (HeroHome) owns the active index so the rotating H1 action and this
 * panel are always the SAME mission — one state machine, never two timers. Each
 * scenario reads top to bottom like a working document:
 *   header → human ask → Alma frames → assignment → skills → first action
 * All secondary text is AA on warm white (>= #655F56); no 9px microtext, no
 * all-caps whisper labels, no glow. Rejouer / Pause are functional; static under
 * prefers-reduced-motion.
 */

export type Bi = { fr: string; en: string }
const p = (b: Bi, l: Lang) => b[l]

export type Scenario = {
  /** H1 tail, e.g. "relancer vos factures impayées". */
  action: Bi
  human: Bi
  mission: Bi
  validation: Bi
  skills: [Bi, Bi]
  firstAction: Bi
}

/** All scenarios equip the SAME durable Collaborator (Emma), on-doctrine: a
 *  Collaborateur IA accumulates capabilities across missions. */
export const SCENARIOS: Scenario[] = [
  {
    action: { fr: 'relancer vos factures impayées', en: 'chase your unpaid invoices' },
    human: { fr: 'Relance chaque semaine nos factures impayées.', en: 'Chase our unpaid invoices every week.' },
    mission: { fr: 'Relancer les factures impayées', en: 'Chase unpaid invoices' },
    validation: { fr: 'Marc valide avant tout contentieux', en: 'Marc approves before any collections' },
    skills: [
      { fr: 'Relance des factures', en: 'Invoice chasing' },
      { fr: 'Suivi des paiements', en: 'Payment tracking' },
    ],
    firstAction: { fr: 'Identifier les échéances dépassées.', en: 'Identify overdue due dates.' },
  },
  {
    action: { fr: 'préparer votre comité de direction', en: 'prepare your executive committee' },
    human: { fr: 'Prépare le dossier de notre prochain comité de direction.', en: 'Prepare the file for our next executive committee.' },
    mission: { fr: 'Préparer un comité de direction', en: 'Prepare an executive committee' },
    validation: { fr: 'Vous validez le dossier avant diffusion', en: 'You approve the file before it circulates' },
    skills: [
      { fr: 'Collecter les indicateurs', en: 'Gather the indicators' },
      { fr: 'Préparer un dossier de décision', en: 'Prepare a decision file' },
    ],
    firstAction: { fr: 'Demander les données aux responsables.', en: 'Request the data from team leads.' },
  },
  {
    action: { fr: 'rédiger vos comptes rendus', en: 'write your meeting notes' },
    human: { fr: 'Rédige les comptes rendus de nos réunions.', en: 'Write the notes from our meetings.' },
    mission: { fr: 'Rédiger les comptes rendus', en: 'Write meeting notes' },
    validation: { fr: 'Vous relisez avant partage', en: 'You review before sharing' },
    skills: [
      { fr: 'Synthèse de réunion', en: 'Meeting synthesis' },
      { fr: 'Diffusion structurée', en: 'Structured distribution' },
    ],
    firstAction: { fr: 'Récupérer l’ordre du jour et les notes.', en: 'Collect the agenda and the notes.' },
  },
]

const T = {
  fr: {
    scenarioWord: 'Scénario',
    convoTitle: 'Conversation',
    convoSub: 'Sophie, dirigeante de Solvea · Alma',
    almaName: 'Alma',
    sophie: 'Sophie · Dirigeante de Solvea',
    almaReply: 'Je structure la mission et je vous recommande Emma, déjà dans votre organisation.',
    missionLabel: 'Mission',
    validationLabel: 'Validation',
    assign: 'Emma peut prendre cette mission',
    emmaRole: 'Assistante de direction',
    existing: 'Collaboratrice IA existante',
    recommended: 'Affectation recommandée',
    skillsTitle: 'Deux compétences à développer',
    firstLabel: 'Première action',
    pause: 'Pause',
    play: 'Rejouer',
    of: 'sur',
  },
  en: {
    scenarioWord: 'Scenario',
    convoTitle: 'Conversation',
    convoSub: 'Sophie, founder of Solvea · Alma',
    almaName: 'Alma',
    sophie: 'Sophie · Founder of Solvea',
    almaReply: 'I’m structuring the mission and I recommend Emma, already in your organization.',
    missionLabel: 'Mission',
    validationLabel: 'Validation',
    assign: 'Emma can take this mission',
    emmaRole: 'Executive assistant',
    existing: 'Existing AI Collaborator',
    recommended: 'Recommended assignment',
    skillsTitle: 'Two skills to develop',
    firstLabel: 'First action',
    pause: 'Pause',
    play: 'Replay',
    of: 'of',
  },
} as const

const ease = [0.22, 1, 0.36, 1] as const

/** Section label: small caps only where it genuinely labels a field. */
function FieldLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#80786D]">{children}</p>
}

export function HeroTheatre({
  lang = 'fr',
  index,
  playing,
  onTogglePlay,
  onSelect,
}: {
  lang?: Lang
  index: number
  playing: boolean
  onTogglePlay: () => void
  onSelect: (i: number) => void
}) {
  const t = T[lang]
  const reduce = useReducedMotion()
  const s = SCENARIOS[index]
  const two = (n: number) => String(n).padStart(2, '0')

  const nodeAnim = (delay: number) =>
    reduce
      ? { initial: false as const, animate: { opacity: 1, y: 0 } }
      : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, ease, delay } }

  return (
    <div
      className="relative w-full overflow-hidden rounded-[20px] border border-[#DDD5C8] bg-[#FFFDF9] text-[#1C1A17]"
      style={{ boxShadow: '0 24px 70px rgba(48, 37, 28, 0.12)' }}
    >
      {/* Thin anthracite top edge — reads like a professional object. */}
      <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-[#1C1A17]" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#EAE3D6] px-5 pb-3 pt-4">
          <div className="flex items-center gap-2.5">
            <span className="flex shrink-0 items-center">
              <Image src="/images/sophie-avatar.png" alt="" width={30} height={30} className="h-[30px] w-[30px] rounded-full object-cover ring-2 ring-[#FFFDF9]" />
              <Image src="/alma-avatar.png" alt="" width={30} height={30} className="-ml-2.5 h-[30px] w-[30px] rounded-full object-cover ring-2 ring-[#FFFDF9]" />
            </span>
            <div>
              <p className="text-[15px] font-semibold tracking-[-0.01em] text-[#1C1A17]">{t.convoTitle}</p>
              <p className="text-[13px] text-[#655F56]">{t.convoSub}</p>
            </div>
          </div>
        <div className="text-right">
          <p className="text-[13px] font-medium text-[#655F56]">
            {t.scenarioWord} {two(index + 1)} / {two(SCENARIOS.length)}
          </p>
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            {SCENARIOS.map((sc, i) => (
              <button
                key={sc.mission.en}
                type="button"
                onClick={() => onSelect(i)}
                aria-label={`${t.scenarioWord} ${i + 1} ${t.of} ${SCENARIOS.length} — ${p(sc.mission, lang)}`}
                aria-current={i === index}
                className={`h-1.5 rounded-full transition-all ${i === index ? 'w-6 bg-[#B00C54]' : 'w-1.5 bg-[#D8D0C2] hover:bg-[#B7AD9B]'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Stage */}
      <div className="px-5 py-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease }}
          >
            {/* Sophie speaks to Alma — outgoing chat message */}
            <motion.div {...nodeAnim(0.02)} className="flex items-start justify-end gap-2.5">
              <div className="flex min-w-0 flex-col items-end">
                <p className="text-[13px] font-semibold text-[#1C1A17]">{t.sophie}</p>
                <p className="mt-1 rounded-2xl rounded-tr-sm bg-[#FBEAF1] px-3.5 py-2 text-right text-[14px] leading-relaxed text-[#3A2530]">{p(s.human, lang)}</p>
              </div>
              <Image src="/images/sophie-avatar.png" alt="" width={32} height={32} className="h-8 w-8 shrink-0 rounded-full object-cover ring-1 ring-[#E6DDCF]" />
            </motion.div>

            {/* Alma replies — incoming chat message */}
            <motion.div {...nodeAnim(0.1)} className="mt-3 flex items-start gap-2.5">
              <Image src="/alma-avatar.png" alt="" width={32} height={32} className="h-8 w-8 shrink-0 rounded-full object-cover ring-1 ring-[#E6DDCF]" />
              <p className="min-w-0 rounded-2xl rounded-tl-sm bg-[#F4EEE4] px-3.5 py-2 text-[14px] leading-relaxed text-[#2C2822]">{t.almaReply}</p>
            </motion.div>

            {/* The mission sheet Alma attaches to her reply — crossed by the thread */}
            <div className="relative mt-4 pl-[30px]">
              <span aria-hidden className="absolute left-[9px] top-1 bottom-3 w-px bg-[#E1D9CB]" />
              <span aria-hidden className="absolute left-[9px] top-1 h-[62%] w-px bg-[#B00C54]" />

              {/* Mission + validation */}
              <motion.div {...nodeAnim(0.14)} className="relative pb-4">
                <span className="absolute -left-[30px] top-1.5 h-[15px] w-[15px] rounded-full bg-[#B00C54]" />
                <div className="rounded-xl border border-[#EAE3D6] bg-[#FBF7EF] px-3.5 py-2.5">
                  <p className="text-[15px] text-[#1C1A17]">
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8A8272]">{t.missionLabel} · </span>
                    <span className="font-medium">{p(s.mission, lang)}</span>
                  </p>
                  <div className="mt-2 flex items-center gap-2 border-t border-[#EFE8DB] pt-2">
                    <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-[#2C5F8A]" />
                    <p className="text-[14px] text-[#2C5F8A]">
                      <span className="font-semibold">{t.validationLabel} · </span>
                      {p(s.validation, lang)}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Assignment — discreet seal, no neon badge */}
              <motion.div {...nodeAnim(0.22)} className="relative pb-4">
                <span className="absolute -left-[30px] top-0.5 flex h-[19px] w-[19px] items-center justify-center rounded-full bg-[#FFFDF9] ring-[1.5px] ring-[#B00C54]">
                  <Image src="/images/emma-avatar.png" alt="" width={17} height={17} className="h-[17px] w-[17px] rounded-full object-cover" />
                </span>
                <p className="text-[14px] font-semibold text-[#1C1A17]">{t.assign}</p>
                <p className="mt-0.5 text-[13.5px] text-[#655F56]">
                  {t.emmaRole} · {t.existing}
                </p>
                    <p className="mt-1.5 inline-flex items-center gap-1.5 text-[13px] font-medium text-[#2C5F8A]">
                      <span aria-hidden className="h-2 w-2 rounded-full bg-[#2C5F8A]" />
                  {t.recommended}
                </p>
              </motion.div>

              {/* Skills to develop */}
              <motion.div {...nodeAnim(0.3)} className="relative pb-4">
                <span className="absolute -left-[30px] top-1 h-[15px] w-[15px] rounded-full border-[1.5px] border-[#B00C54] bg-[#FFFDF9]" />
                <p className="text-[14px] font-semibold text-[#1C1A17]">{t.skillsTitle}</p>
                <ul className="mt-2 flex flex-col gap-1.5">
                  {s.skills.map((sk) => (
                    <li key={sk.en} className="flex items-center gap-2 text-[14px] text-[#3E3830]">
                      <span aria-hidden className="text-[#B00C54]">+</span>
                      {p(sk, lang)}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* First action */}
              <motion.div {...nodeAnim(0.38)} className="relative">
                <span className="absolute -left-[30px] top-1.5 h-[15px] w-[15px] rounded-full bg-[#2C5F8A]" />
                <p className="text-[15px] text-[#1C1A17]">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8A8272]">{t.firstLabel} · </span>
                  <span className="font-medium">{p(s.firstAction, lang)}</span>
                </p>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 border-t border-[#EAE3D6] px-5 py-3">
        <button
          type="button"
          onClick={onTogglePlay}
          className="inline-flex items-center gap-2 rounded-full border border-[#D8D0C2] bg-[#FBF7EF] px-4 py-2 text-[13px] font-semibold text-[#1C1A17] transition-colors hover:bg-[#F1EADF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B00C54] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFDF9]"
        >
          {playing ? (
            <>
              <Pause className="h-4 w-4" /> {t.pause}
            </>
          ) : (
            <>
              <Play className="h-4 w-4" fill="currentColor" /> {t.play}
            </>
          )}
        </button>
        <span className="text-[13px] font-medium text-[#655F56]">
          {two(index + 1)} {t.of} {two(SCENARIOS.length)}
        </span>
      </div>
    </div>
  )
}
