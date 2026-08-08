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

export type Collaborator = {
  name: string
  role: Bi
  avatar: string
  /** 'new' = Alma proposes a new Collaborator; 'existing' = already in the org. */
  status: 'new' | 'existing'
}

export type Scenario = {
  /** Business area, shown as the H1 kicker. */
  dept: Bi
  /** H1 tail, e.g. "relancer vos factures impayées". */
  action: Bi
  human: Bi
  almaReply: Bi
  collab: Collaborator
  mission: Bi
  validation: Bi
  skills: [Bi, Bi]
  firstAction: Bi
}

/** Twelve missions, two per business area. On-doctrine (durable Collaborators):
 *  the first mission of an area proposes a NEW Collaborator, the second equips
 *  the SAME existing one — capabilities accumulate, they are never disposable. */
export const SCENARIOS: Scenario[] = [
  // ── Sales · Chloé ──────────────────────────────────────────────
  {
    dept: { fr: 'Sales', en: 'Sales' },
    action: { fr: 'qualifier vos prospects', en: 'qualify your prospects' },
    human: { fr: 'Trouve et qualifie nos prospects les plus prometteurs.', en: 'Find and qualify our most promising prospects.' },
    almaReply: { fr: 'Je structure la mission et je vous propose Chloé, une nouvelle Collaboratrice IA commerciale.', en: 'I’m structuring the mission and I propose Chloé, a new sales AI Collaborator.' },
    collab: { name: 'Chloé', role: { fr: 'Commerciale', en: 'Sales rep' }, avatar: '/images/chloe-avatar.png', status: 'new' },
    mission: { fr: 'Cibler et qualifier les prospects', en: 'Target and qualify prospects' },
    validation: { fr: 'Vous validez la liste avant tout contact', en: 'You approve the list before any outreach' },
    skills: [
      { fr: 'Ciblage des comptes', en: 'Account targeting' },
      { fr: 'Qualification des prospects', en: 'Prospect qualification' },
    ],
    firstAction: { fr: 'Analyser votre marché et vos clients actuels.', en: 'Analyze your market and current customers.' },
  },
  {
    dept: { fr: 'Sales', en: 'Sales' },
    action: { fr: 'décrocher plus de rendez-vous', en: 'book more meetings' },
    human: { fr: 'Décroche plus de rendez-vous avec ces prospects.', en: 'Book more meetings with these prospects.' },
    almaReply: { fr: 'Chloé, déjà dans votre organisation, peut prendre cette mission — j’ajoute une compétence.', en: 'Chloé, already in your organization, can take this mission — I’m adding a skill.' },
    collab: { name: 'Chloé', role: { fr: 'Commerciale', en: 'Sales rep' }, avatar: '/images/chloe-avatar.png', status: 'existing' },
    mission: { fr: 'Décrocher des rendez-vous', en: 'Book meetings' },
    validation: { fr: 'Vous validez les messages avant envoi', en: 'You approve messages before they go out' },
    skills: [
      { fr: 'Prise de contact personnalisée', en: 'Personalized outreach' },
      { fr: 'Prise de rendez-vous', en: 'Meeting booking' },
    ],
    firstAction: { fr: 'Rédiger une première séquence de contact.', en: 'Draft a first outreach sequence.' },
  },
  // ── Marketing · Léa ────────────────────────────────────────────
  {
    dept: { fr: 'Marketing', en: 'Marketing' },
    action: { fr: 'publier vos contenus', en: 'publish your content' },
    human: { fr: 'Crée et publie nos contenus chaque semaine.', en: 'Create and publish our content every week.' },
    almaReply: { fr: 'Je structure la mission et je vous propose Léa, une nouvelle Collaboratrice IA marketing.', en: 'I’m structuring the mission and I propose Léa, a new marketing AI Collaborator.' },
    collab: { name: 'Léa', role: { fr: 'Responsable marketing', en: 'Marketing lead' }, avatar: '/images/lea-avatar.png', status: 'new' },
    mission: { fr: 'Créer et publier les contenus', en: 'Create and publish content' },
    validation: { fr: 'Vous validez chaque contenu avant publication', en: 'You approve each piece before it’s published' },
    skills: [
      { fr: 'Rédaction éditoriale', en: 'Editorial writing' },
      { fr: 'Planification des publications', en: 'Publishing schedule' },
    ],
    firstAction: { fr: 'Proposer un calendrier éditorial.', en: 'Propose an editorial calendar.' },
  },
  {
    dept: { fr: 'Marketing', en: 'Marketing' },
    action: { fr: 'analyser vos campagnes', en: 'analyze your campaigns' },
    human: { fr: 'Analyse les résultats de nos campagnes.', en: 'Analyze the results of our campaigns.' },
    almaReply: { fr: 'Léa, déjà dans votre organisation, peut prendre cette mission — j’ajoute une compétence.', en: 'Léa, already in your organization, can take this mission — I’m adding a skill.' },
    collab: { name: 'Léa', role: { fr: 'Responsable marketing', en: 'Marketing lead' }, avatar: '/images/lea-avatar.png', status: 'existing' },
    mission: { fr: 'Analyser les campagnes', en: 'Analyze campaigns' },
    validation: { fr: 'Vous validez les recommandations avant action', en: 'You approve recommendations before action' },
    skills: [
      { fr: 'Analyse des performances', en: 'Performance analysis' },
      { fr: 'Recommandations d’optimisation', en: 'Optimization recommendations' },
    ],
    firstAction: { fr: 'Rassembler les indicateurs des campagnes.', en: 'Gather the campaign metrics.' },
  },
  // ── RH · Hugo ──────────────────────────────────────────────────
  {
    dept: { fr: 'RH', en: 'HR' },
    action: { fr: 'présélectionner vos candidats', en: 'shortlist your candidates' },
    human: { fr: 'Présélectionne les candidats pour ce poste.', en: 'Shortlist the candidates for this role.' },
    almaReply: { fr: 'Je structure la mission et je vous propose Hugo, un nouveau Collaborateur IA RH.', en: 'I’m structuring the mission and I propose Hugo, a new HR AI Collaborator.' },
    collab: { name: 'Hugo', role: { fr: 'Chargé de recrutement', en: 'Recruiter' }, avatar: '/images/hugo-avatar.png', status: 'new' },
    mission: { fr: 'Présélectionner les candidats', en: 'Shortlist candidates' },
    validation: { fr: 'Vous validez la présélection avant tout contact', en: 'You approve the shortlist before any contact' },
    skills: [
      { fr: 'Tri des candidatures', en: 'Application screening' },
      { fr: 'Évaluation des profils', en: 'Profile assessment' },
    ],
    firstAction: { fr: 'Analyser la fiche de poste et les candidatures.', en: 'Analyze the job spec and applications.' },
  },
  {
    dept: { fr: 'RH', en: 'HR' },
    action: { fr: 'mener vos pré-entretiens', en: 'run your pre-interviews' },
    human: { fr: 'Mène les pré-entretiens téléphoniques des candidats retenus.', en: 'Run the phone pre-interviews with shortlisted candidates.' },
    almaReply: { fr: 'Hugo, déjà dans votre organisation, peut prendre cette mission — j’ajoute une compétence.', en: 'Hugo, already in your organization, can take this mission — I’m adding a skill.' },
    collab: { name: 'Hugo', role: { fr: 'Chargé de recrutement', en: 'Recruiter' }, avatar: '/images/hugo-avatar.png', status: 'existing' },
    mission: { fr: 'Mener les pré-entretiens', en: 'Run pre-interviews' },
    validation: { fr: 'Vous validez la trame avant les appels', en: 'You approve the script before the calls' },
    skills: [
      { fr: 'Entretien téléphonique', en: 'Phone interview' },
      { fr: 'Synthèse des candidats', en: 'Candidate summary' },
    ],
    firstAction: { fr: 'Préparer la trame de pré-entretien.', en: 'Prepare the pre-interview script.' },
  },
  // ── Support · Nadia ────────────────────────────────────────────
  {
    dept: { fr: 'Support', en: 'Support' },
    action: { fr: 'répondre à vos clients 24 h/24', en: 'answer your customers 24/7' },
    human: { fr: 'Réponds à nos clients 24 h/24.', en: 'Answer our customers 24/7.' },
    almaReply: { fr: 'Je structure la mission et je vous propose Nadia, une nouvelle Collaboratrice IA support.', en: 'I’m structuring the mission and I propose Nadia, a new support AI Collaborator.' },
    collab: { name: 'Nadia', role: { fr: 'Support client', en: 'Customer support' }, avatar: '/images/nadia-avatar.png', status: 'new' },
    mission: { fr: 'Répondre aux clients 24 h/24', en: 'Answer customers 24/7' },
    validation: { fr: 'Vous validez les réponses sensibles', en: 'You approve sensitive replies' },
    skills: [
      { fr: 'Réponse aux demandes', en: 'Request handling' },
      { fr: 'Escalade des cas complexes', en: 'Complex-case escalation' },
    ],
    firstAction: { fr: 'Analyser vos demandes clients récentes.', en: 'Analyze your recent customer requests.' },
  },
  {
    dept: { fr: 'Support', en: 'Support' },
    action: { fr: 'résoudre les demandes courantes', en: 'resolve common requests' },
    human: { fr: 'Résous seule les demandes les plus courantes.', en: 'Resolve the most common requests on your own.' },
    almaReply: { fr: 'Nadia, déjà dans votre organisation, peut prendre cette mission — j’ajoute une compétence.', en: 'Nadia, already in your organization, can take this mission — I’m adding a skill.' },
    collab: { name: 'Nadia', role: { fr: 'Support client', en: 'Customer support' }, avatar: '/images/nadia-avatar.png', status: 'existing' },
    mission: { fr: 'Résoudre les demandes courantes', en: 'Resolve common requests' },
    validation: { fr: 'Vous validez les procédures automatisées', en: 'You approve the automated procedures' },
    skills: [
      { fr: 'Résolution autonome', en: 'Autonomous resolution' },
      { fr: 'Base de connaissances', en: 'Knowledge base' },
    ],
    firstAction: { fr: 'Identifier les demandes les plus fréquentes.', en: 'Identify the most frequent requests.' },
  },
  // ── Téléphone · voix · Iris ────────────────────────────────────
  {
    dept: { fr: 'Téléphone · voix', en: 'Phone · voice' },
    action: { fr: 'qualifier vos appels', en: 'qualify your calls' },
    human: { fr: 'Appelle et qualifie nos prospects par téléphone.', en: 'Call and qualify our prospects by phone.' },
    almaReply: { fr: 'Je structure la mission et je vous propose Iris, une nouvelle Collaboratrice IA vocale.', en: 'I’m structuring the mission and I propose Iris, a new voice AI Collaborator.' },
    collab: { name: 'Iris', role: { fr: 'Agent vocal', en: 'Voice agent' }, avatar: '/images/iris-avatar.png', status: 'new' },
    mission: { fr: 'Qualifier les prospects par téléphone', en: 'Qualify prospects by phone' },
    validation: { fr: 'Vous validez le script avant les appels', en: 'You approve the script before the calls' },
    skills: [
      { fr: 'Appel sortant', en: 'Outbound calling' },
      { fr: 'Qualification à l’oral', en: 'Spoken qualification' },
    ],
    firstAction: { fr: 'Préparer le script d’appel.', en: 'Prepare the call script.' },
  },
  {
    dept: { fr: 'Téléphone · voix', en: 'Phone · voice' },
    action: { fr: 'répondre à vos appels', en: 'answer your calls' },
    human: { fr: 'Réponds à nos appels entrants sans temps d’attente.', en: 'Answer our inbound calls with no wait time.' },
    almaReply: { fr: 'Iris, déjà dans votre organisation, peut prendre cette mission — j’ajoute une compétence.', en: 'Iris, already in your organization, can take this mission — I’m adding a skill.' },
    collab: { name: 'Iris', role: { fr: 'Agent vocal', en: 'Voice agent' }, avatar: '/images/iris-avatar.png', status: 'existing' },
    mission: { fr: 'Répondre aux appels entrants', en: 'Answer inbound calls' },
    validation: { fr: 'Vous validez les transferts vers un humain', en: 'You approve transfers to a human' },
    skills: [
      { fr: 'Accueil téléphonique', en: 'Phone reception' },
      { fr: 'Routage des appels', en: 'Call routing' },
    ],
    firstAction: { fr: 'Cartographier les motifs d’appel.', en: 'Map the reasons customers call.' },
  },
  // ── Finance · Emma ─────────────────────────────────────────────
  {
    dept: { fr: 'Finance', en: 'Finance' },
    action: { fr: 'relancer vos impayés', en: 'chase your unpaid invoices' },
    human: { fr: 'Relance chaque semaine nos factures impayées.', en: 'Chase our unpaid invoices every week.' },
    almaReply: { fr: 'Je structure la mission et je vous propose Emma, une nouvelle Collaboratrice IA finance.', en: 'I’m structuring the mission and I propose Emma, a new finance AI Collaborator.' },
    collab: { name: 'Emma', role: { fr: 'Assistante de direction', en: 'Executive assistant' }, avatar: '/images/emma-avatar.png', status: 'new' },
    mission: { fr: 'Relancer les factures impayées', en: 'Chase unpaid invoices' },
    validation: { fr: 'Vous validez avant tout passage en contentieux', en: 'You approve before any collections' },
    skills: [
      { fr: 'Relance des factures', en: 'Invoice chasing' },
      { fr: 'Suivi des paiements', en: 'Payment tracking' },
    ],
    firstAction: { fr: 'Identifier les échéances dépassées.', en: 'Identify overdue due dates.' },
  },
  {
    dept: { fr: 'Finance', en: 'Finance' },
    action: { fr: 'anticiper votre trésorerie', en: 'anticipate your cash flow' },
    human: { fr: 'Anticipe nos besoins de trésorerie pour les mois à venir.', en: 'Anticipate our cash-flow needs for the coming months.' },
    almaReply: { fr: 'Emma, déjà dans votre organisation, peut prendre cette mission — j’ajoute une compétence.', en: 'Emma, already in your organization, can take this mission — I’m adding a skill.' },
    collab: { name: 'Emma', role: { fr: 'Assistante de direction', en: 'Executive assistant' }, avatar: '/images/emma-avatar.png', status: 'existing' },
    mission: { fr: 'Anticiper la trésorerie', en: 'Anticipate cash flow' },
    validation: { fr: 'Vous validez les hypothèses de prévision', en: 'You approve the forecast assumptions' },
    skills: [
      { fr: 'Prévision de trésorerie', en: 'Cash-flow forecasting' },
      { fr: 'Suivi des encaissements', en: 'Receivables tracking' },
    ],
    firstAction: { fr: 'Réunir vos flux d’encaissement et de dépenses.', en: 'Collect your inflows and outflows.' },
  },
]

const T = {
  fr: {
    scenarioWord: 'Scénario',
    sophieName: 'Sophie',
    sophieRole: 'Dirigeante de Solvea',
    almaRole: 'Customer success Unitalk',
    almaName: 'Alma',
    missionLabel: 'Mission',
    validationLabel: 'Validation',
    canTake: 'peut prendre cette mission',
    newCollab: 'nouveau Collaborateur IA proposé',
    existing: 'déjà dans votre organisation',
    recommended: 'Affectation recommandée',
    proposed: 'Nouveau Collaborateur',
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
    almaRole: 'Customer success Unitalk',
    almaName: 'Alma',
    missionLabel: 'Mission',
    validationLabel: 'Validation',
    canTake: 'can take this mission',
    newCollab: 'new AI Collaborator proposed',
    existing: 'already in your organization',
    recommended: 'Recommended assignment',
    proposed: 'New Collaborator',
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
    <motion.div
      className="group relative w-full overflow-hidden rounded-[22px] border border-[#E4DCCE] bg-[#FFFDF9] text-[#1C1A17] transition-colors duration-300 hover:border-[#D9B9C8]"
      style={{ boxShadow: '0 1px 1px rgba(48,37,28,0.04), 0 8px 20px -8px rgba(48,37,28,0.10), 0 34px 64px -24px rgba(48,37,28,0.16)' }}
      initial={false}
      whileHover={
        reduce
          ? undefined
          : {
              y: -6,
              boxShadow:
                '0 2px 2px rgba(48,37,28,0.05), 0 14px 30px -10px rgba(176,12,84,0.14), 0 46px 80px -28px rgba(48,37,28,0.24)',
              transition: { duration: 0.4, ease },
            }
      }
    >
      {/* Hairline top edge with a magenta signature that sweeps across on hover. */}
      <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1C1A17]/25 to-transparent" />
      <span
        aria-hidden
        className="absolute left-0 top-0 h-px w-16 bg-[#B00C54] transition-[width] duration-500 ease-out group-hover:w-full"
      />

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
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
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
          <button
            type="button"
            onClick={onTogglePlay}
            aria-label={playing ? t.pause : t.play}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#E4DCCE] bg-[#FCFAF4] text-[#6B6459] transition-colors hover:border-[#D3C9B7] hover:text-[#1C1A17] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B00C54] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFDF9]"
          >
            {playing ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" fill="currentColor" />}
          </button>
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
              <p className="max-w-[85%] rounded-[16px] rounded-bl-[5px] border border-[#EBE3D5] bg-[#F6F1E8] px-4 py-2.5 text-[14px] leading-relaxed text-[#2C2822]">{p(s.almaReply, lang)}</p>
            </motion.div>

            {/* The mission sheet Alma attaches to her reply — crossed by the thread */}
            <div className="relative mt-5 pl-8">
              {/* Base rail — faint dotted guide */}
              <span
                aria-hidden
                className="absolute left-[7.5px] top-1.5 bottom-3 w-px"
                style={{ backgroundImage: 'linear-gradient(to bottom, #DCD3C4 0 3px, transparent 3px 7px)', backgroundSize: '1px 7px' }}
              />
              {/* Living thread — draws down as the nodes reveal */}
              <motion.span
                key={index}
                aria-hidden
                className="absolute left-2 top-1.5 bottom-3 w-[1.5px] origin-top -translate-x-1/2 rounded-full"
                style={{ background: 'linear-gradient(to bottom, #B00C54 0%, #C24A7E 55%, rgba(176,12,84,0.15) 100%)' }}
                initial={reduce ? false : { scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1.05, ease, delay: 0.14 }}
              />

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

              {/* Assignment — the Collaborator Alma proposes or equips */}
              <motion.div key={`assign-${index}`} {...nodeAnim(0.22)} className="relative pb-5">
                <span className="absolute -left-[31px] top-px flex h-[19px] w-[19px] items-center justify-center rounded-full bg-[#FFFDF9] ring-[1.5px] ring-[#B00C54]">
                  <Image src={s.collab.avatar} alt="" width={17} height={17} className="h-[17px] w-[17px] rounded-full object-cover" />
                </span>
                <p className="text-[14px] font-semibold tracking-[-0.005em] text-[#1C1A17]">
                  {s.collab.status === 'new' ? `${s.collab.name} — ${t.newCollab}` : `${s.collab.name} ${t.canTake}`}
                </p>
                <p className="mt-0.5 text-[13px] text-[#6B6459]">
                  {s.collab.status === 'existing' ? `${p(s.collab.role, lang)} · ${t.existing}` : p(s.collab.role, lang)}
                </p>
                {s.collab.status === 'new' ? (
                  <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#FBEAF1] px-2.5 py-1 text-[11.5px] font-semibold tracking-[0.01em] text-[#B00C54]">
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#B00C54]" />
                    {t.proposed}
                  </p>
                ) : (
                  <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#EAF0F5] px-2.5 py-1 text-[11.5px] font-semibold tracking-[0.01em] text-[#2C5F8A]">
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#2C5F8A]" />
                    {t.recommended}
                  </p>
                )}
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
    </motion.div>
  )
}
