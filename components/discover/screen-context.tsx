'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check, Pencil, FileText } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { AlmaHead } from './context-column'
import { getProfile, guessProfileKey } from '@/lib/discover-profiles'

type Beat = {
  kind: 'observation' | 'question'
  text: { fr: string; en: string }
  source?: { fr: string; en: string }
  progressAfter: number
}

export function ScreenContext({
  lang,
  domain,
  onProgress,
  onContinue,
}: {
  lang: Lang
  domain: string
  onProgress: (n: number) => void
  onContinue: () => void
}) {
  const t = COPY[lang]
  const beats = buildBeats(domain)
  const [index, setIndex] = useState(0)
  const [correcting, setCorrecting] = useState(false)
  const [answer, setAnswer] = useState('')

  const done = index >= beats.length
  const current = beats[index]

  function advance(nextProgress: number) {
    onProgress(nextProgress)
    setCorrecting(false)
    setAnswer('')
    setIndex((i) => i + 1)
  }

  return (
    <div>
      <p className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-[#D10E63]">{t.kicker}</p>
      <h1 className="mt-4 text-balance font-sf text-[clamp(1.7rem,3.6vw,2.6rem)] font-semibold leading-tight tracking-[-0.03em] text-[#1C1A17]">
        {t.title}
      </h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-[#4E483F]">{t.lead}</p>

      {/* Conversation log */}
      <div className="mt-8 flex flex-col gap-4">
        {beats.slice(0, index).map((b, i) => (
          <div key={i} className="flex items-start gap-2.5 opacity-60">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#D10E63]/15 text-[#A80B50]">
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
            </span>
            <p className="text-sm leading-relaxed text-[#5A544A]">{b.text[lang]}</p>
          </div>
        ))}

        {!done && current && (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-5"
          >
            <div className="flex items-start gap-3">
              <AlmaHead className="h-9 w-9" />
              <div className="flex-1">
                <p className="text-[15px] font-semibold leading-relaxed text-[#1C1A17]">{current.text[lang]}</p>
                {current.source && (
                  <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-[#8A8175]">
                    <FileText className="h-3.5 w-3.5" />
                    {current.source[lang]}
                  </p>
                )}
              </div>
            </div>

            {/* Actions */}
            {current.kind === 'observation' && !correcting && (
              <div className="mt-4 flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={() => advance(current.progressAfter)}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#D10E63] px-4 py-2.5 text-sm font-bold text-[#FBF9F3] transition-colors hover:bg-[#E51872]"
                >
                  <Check className="h-4 w-4" />
                  {t.confirm}
                </button>
                <button
                  type="button"
                  onClick={() => setCorrecting(true)}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#D8D0C2] bg-white/60 px-4 py-2.5 text-sm font-semibold text-[#3B362F] transition-colors hover:border-[#D10E63]/40"
                >
                  <Pencil className="h-4 w-4" />
                  {t.correct}
                </button>
              </div>
            )}

            {(current.kind === 'question' || correcting) && (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  advance(current.progressAfter)
                }}
                className="mt-4"
              >
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder={correcting ? t.correctPlaceholder : t.answerPlaceholder}
                  aria-label={current.text[lang]}
                  className="w-full rounded-xl border border-[#D8D0C2] bg-white/70 px-4 py-3 text-sm text-[#1C1A17] outline-none placeholder:text-[#9A9184] focus:border-[#D10E63]"
                />
                <button
                  type="submit"
                  className="mt-3 inline-flex items-center gap-2 rounded-xl bg-[#D10E63] px-4 py-2.5 text-sm font-bold text-[#FBF9F3] transition-colors hover:bg-[#E51872]"
                >
                  {correcting ? t.save : t.send}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}
          </motion.div>
        )}
      </div>

      {done && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
          <p className="text-sm leading-relaxed text-[#3B362F]">{t.doneNote}</p>
          <button
            type="button"
            onClick={onContinue}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#D10E63] px-6 py-3.5 text-sm font-bold text-[#FBF9F3] transition-colors hover:bg-[#E51872]"
          >
            {t.continue}
            <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </div>
  )
}

function buildBeats(domain: string): Beat[] {
  const home = domain
    ? { fr: `page d’accueil de ${domain} · Consultée aujourd’hui`, en: `${domain} homepage · Read today` }
    : { fr: 'informations publiques · Consultées aujourd’hui', en: 'public information · Read today' }
  const about = domain
    ? { fr: `page « À propos » de ${domain} · Consultée aujourd’hui`, en: `${domain} “About” page · Read today` }
    : { fr: 'pages publiques · Consultées aujourd’hui', en: 'public pages · Read today' }

  // Honest, scripted analysis: from the domain we pick a plausible profile type
  // and present it as a hypothesis to confirm — never as a factual crawl result.
  const profile = getProfile(guessProfileKey(domain))
  const firstObservation: { fr: string; en: string } = domain
    ? {
        fr: `D’après ${domain}, votre activité ressemble à : « ${profile.label.fr} ». ${profile.tagline.fr} Est-ce exact ?`,
        en: `Based on ${domain}, your activity looks like: “${profile.label.en}”. ${profile.tagline.en} Is that right?`,
      }
    : {
        fr: `Sans site indiqué, je pars d’une hypothèse : « ${profile.label.fr} ». ${profile.tagline.fr} Dites-moi si je me trompe.`,
        en: `Without a site, I start from a hypothesis: “${profile.label.en}”. ${profile.tagline.en} Tell me if I’m wrong.`,
      }

  return [
    {
      kind: 'observation',
      text: firstObservation,
      source: home,
      progressAfter: 1,
    },
    {
      kind: 'observation',
      text: {
        fr: 'Je vous proposerai un premier Collaborateur IA adapté à cette activité. Vous pourrez tout ajuster ensuite.',
        en: 'I’ll suggest a first AI Collaborator suited to this activity. You’ll be able to adjust everything afterwards.',
      },
      source: about,
      progressAfter: 3,
    },
    {
      kind: 'question',
      text: {
        fr: 'Quelle est votre priorité actuelle ?',
        en: 'What is your current priority?',
      },
      progressAfter: 4,
    },
    {
      kind: 'question',
      text: {
        fr: 'Quelles actions doivent toujours être validées par une personne ?',
        en: 'Which actions must always be approved by a person?',
      },
      progressAfter: 6,
    },
  ]
}

const COPY = {
  fr: {
    kicker: 'Le contexte de votre Organisation',
    title: 'Alma découvre comment votre entreprise travaille.',
    lead: 'Elle rassemble les informations publiques disponibles, échange avec vous pour préciser ce que votre site ne dit pas et construit une mémoire organisationnelle que vous pouvez consulter et modifier.',
    confirm: 'Confirmer',
    correct: 'Corriger',
    correctPlaceholder: 'Précisez ce qu’Alma devrait retenir…',
    answerPlaceholder: 'Votre réponse…',
    save: 'Enregistrer',
    send: 'Répondre',
    doneNote: 'Le contexte de votre Organisation est prêt. Alma peut maintenant préparer un Collaborateur IA pour une première mission.',
    continue: 'Continuer',
  },
  en: {
    kicker: 'Your Organization context',
    title: 'Alma learns how your company works.',
    lead: 'She gathers the available public information, talks with you to clarify what your site doesn’t say, and builds an organizational memory you can review and edit.',
    confirm: 'Confirm',
    correct: 'Correct',
    correctPlaceholder: 'Tell Alma what she should keep instead…',
    answerPlaceholder: 'Your answer…',
    save: 'Save',
    send: 'Answer',
    doneNote: 'Your Organization context is ready. Alma can now prepare an AI Collaborator for a first mission.',
    continue: 'Continue',
  },
} as const
