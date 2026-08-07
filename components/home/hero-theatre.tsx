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
    validation: { fr: 'Vous validez avant tout passage en contentieux', en: 'You approve before any collections' },
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
    sophieName: 'Sophie',
    sophieRole: 'Dirigeante de Solvea',
    almaRole: 'Chief of Staff',
    almaName: 'Alma',
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
    sophieName: 'Sophie',
    sophieRole: 'Founder of Solvea',
    almaRole: 'Chief of Staff',
    almaName: 'Alma',
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
      className="relative w-full overflow-hidden rounded-[22px] border border-[#E4DCCE] bg-[#FFFDF9] text-[#1C1A17]"
      style={{ boxShadow: '0 1px 1px rgba(48,37,28,0.04), 0 8px 20px -8px rgba(48,37,28,0.10), 0 34px 64px -24px rgba(48,37,28,0.16)' }}
    >
      {/* Hairline top edge with a discreet magenta signature. */}
      <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1C1A17]/25 to-transparent" />
      <span aria-hidden className="absolute left-0 top-0 h-px w-16 bg-[#B00C54]" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#EFE8DB] px-6 pb-3.5 pt-4">
          <div className="flex items-center gap-3.5">
            <div className="flex items-center gap-2.5">
              <Image src="/images/sophie-avatar.png" alt="" width={32} height={32} className="h-8 w-8 shrink-0 rounded-full object-cover ring-1 ring-[#EAE1D2]" />
              <div className="leading-tight">
                <p className="text-[13.5px] font-semibold tracking-[-0.01em] text-[#1C1A17]">{t.sophieName}</p>
                <p className="text-[11.5px] tracking-[0.01em] text-[#6B6459]">{t.sophieRole}</p>
              </div>
            </div>
            <span aria-hidden className="h-7 w-px bg-[#E7DFD0]" />
            <div className="flex items-center gap-2.5">
              <Image src="/alma-avatar.png" alt="" width={32} height={32} className="h-8 w-8 shrink-0 rounded-full object-cover ring-1 ring-[#EAE1D2]" />
              <div className="leading-tight">
                <p className="text-[13.5px] font-semibold tracking-[-0.01em] text-[#1C1A17]">{t.almaName}</p>
                <p className="text-[11.5px] font-medium tracking-[0.01em] text-[#B00C54]">{t.almaRole}</p>
              </div>
            </div>
          </div>
        <div className="flex flex-col items-end gap-2">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-[#8A8272]">
            {two(index + 1)} <span className="text-[#C3BAAA]">/</span> {two(SCENARIOS.length)}
          </p>
          <div className="flex items-center justify-end gap-1.5">
            {SCENARIOS.map((sc, i) => (
              <button
                key={sc.mission.en}
                type="button"
                onClick={() => onSelect(i)}
                aria-label={`${t.scenarioWord} ${i + 1} ${t.of} ${SCENARIOS.length} — ${p(sc.mission, lang)}`}
                aria-current={i === index}
                className={`h-1 rounded-full transition-all duration-300 ${i === index ? 'w-7 bg-[#B00C54]' : 'w-1.5 bg-[#DED6C8] hover:bg-[#BDB3A1]'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Stage */}
      <div className="px-6 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease }}
          >
            {/* Sophie speaks to Alma — outgoing chat message */}
            <motion.div {...nodeAnim(0.02)} className="flex items-end justify-end gap-2.5">
              <p className="max-w-[85%] rounded-[16px] rounded-br-[5px] border border-[#F3D9E5] bg-[#FBEAF1] px-4 py-2.5 text-right text-[14px] leading-relaxed text-[#3A2530]">{p(s.human, lang)}</p>
              <Image src="/images/sophie-avatar.png" alt="" width={30} height={30} className="h-[30px] w-[30px] shrink-0 rounded-full object-cover ring-1 ring-[#EAE1D2]" />
            </motion.div>

            {/* Alma replies — incoming chat message */}
            <motion.div {...nodeAnim(0.1)} className="mt-2.5 flex items-end gap-2.5">
              <Image src="/alma-avatar.png" alt="" width={30} height={30} className="h-[30px] w-[30px] shrink-0 rounded-full object-cover ring-1 ring-[#EAE1D2]" />
              <p className="max-w-[85%] rounded-[16px] rounded-bl-[5px] border border-[#EBE3D5] bg-[#F6F1E8] px-4 py-2.5 text-[14px] leading-relaxed text-[#2C2822]">{t.almaReply}</p>
            </motion.div>

            {/* The mission sheet Alma attaches to her reply — crossed by the thread */}
            <div className="relative mt-5 pl-8">
              <span aria-hidden className="absolute left-2 top-1.5 bottom-3 w-px bg-[#E7DFD0]" />
              <span aria-hidden className="absolute left-2 top-1.5 h-[58%] w-px bg-gradient-to-b from-[#B00C54] to-[#B00C54]/45" />

              {/* Mission + validation */}
              <motion.div {...nodeAnim(0.14)} className="relative pb-5">
                <span className="absolute -left-[27px] top-[5px] h-[11px] w-[11px] rounded-full bg-[#B00C54] ring-[3px] ring-[#FFFDF9]" />
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#AFA695]">{t.missionLabel}</p>
                <p className="mt-1 text-[15px] font-medium tracking-[-0.005em] text-[#1C1A17]">{p(s.mission, lang)}</p>
                <p className="mt-2 flex items-center gap-1.5 text-[12.5px] text-[#2C5F8A]">
                  <span aria-hidden className="h-1 w-1 shrink-0 rounded-full bg-[#2C5F8A]" />
                  <span className="font-semibold">{t.validationLabel}</span>
                  <span className="text-[#6C8DA8]">· {p(s.validation, lang)}</span>
                </p>
              </motion.div>

              {/* Assignment — discreet seal, no neon badge */}
              <motion.div {...nodeAnim(0.22)} className="relative pb-5">
                <span className="absolute -left-[31px] top-px flex h-[19px] w-[19px] items-center justify-center rounded-full bg-[#FFFDF9] ring-[1.5px] ring-[#B00C54]">
                  <Image src="/images/emma-avatar.png" alt="" width={17} height={17} className="h-[17px] w-[17px] rounded-full object-cover" />
                </span>
                <p className="text-[14px] font-semibold tracking-[-0.005em] text-[#1C1A17]">{t.assign}</p>
                <p className="mt-0.5 text-[13px] text-[#6B6459]">
                  {t.emmaRole} · {t.existing}
                </p>
                <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#EAF0F5] px-2.5 py-1 text-[11.5px] font-semibold tracking-[0.01em] text-[#2C5F8A]">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#2C5F8A]" />
                  {t.recommended}
                </p>
              </motion.div>

              {/* Skills to develop */}
              <motion.div {...nodeAnim(0.3)} className="relative pb-5">
                <span className="absolute -left-[27px] top-[5px] h-[11px] w-[11px] rounded-full border-[1.5px] border-[#B00C54] bg-[#FFFDF9]" />
                <p className="text-[14px] font-semibold tracking-[-0.005em] text-[#1C1A17]">{t.skillsTitle}</p>
                <ul className="mt-2.5 flex flex-col gap-2">
                  {s.skills.map((sk) => (
                    <li key={sk.en} className="flex items-center gap-2.5 text-[14px] text-[#3E3830]">
                      <span aria-hidden className="h-px w-3 shrink-0 bg-[#D89BB6]" />
                      {p(sk, lang)}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* First action */}
              <motion.div {...nodeAnim(0.38)} className="relative">
                <span className="absolute -left-[27px] top-[5px] h-[11px] w-[11px] rounded-full bg-[#2C5F8A] ring-[3px] ring-[#FFFDF9]" />
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#AFA695]">{t.firstLabel}</p>
                <p className="mt-1 text-[15px] font-medium tracking-[-0.005em] text-[#1C1A17]">{p(s.firstAction, lang)}</p>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between border-t border-[#EFE8DB] bg-[#FCFAF4] px-6 py-3">
        <button
          type="button"
          onClick={onTogglePlay}
          className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#6B6459] transition-colors hover:text-[#1C1A17] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B00C54] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FCFAF4] rounded-md"
        >
          {playing ? (
            <>
              <Pause className="h-3.5 w-3.5" /> {t.pause}
            </>
          ) : (
            <>
              <Play className="h-3.5 w-3.5" fill="currentColor" /> {t.play}
            </>
          )}
        </button>
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-[#A79E8C]">
          {t.scenarioWord} {two(index + 1)}
        </span>
      </div>
    </div>
  )
}
