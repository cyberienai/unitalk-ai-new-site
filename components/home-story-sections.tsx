'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Brain,
  CalendarDays,
  Check,
  ClipboardList,
  Code2,
  Fingerprint,
  Globe,
  KeyRound,
  Mail,
  Megaphone,
  MessageSquare,
  Mic,
  Monitor,
  Phone,
  Plus,
  Sparkles,
  Target,
  Terminal,
  Star,
  UserRound,
  UsersRound,
  Wrench,
  X,
} from 'lucide-react'

const roleIcons = [Megaphone, Phone, MessageSquare, ClipboardList, Code2, BarChart3, UsersRound]
const attributeIcons = [UserRound, Target, Brain, Sparkles, Wrench, Fingerprint]
const memberIcons = [Mail, Phone, CalendarDays, Mic, BadgeCheck, KeyRound, Brain, Wrench]
const workIcons = [Monitor, Globe, MessageSquare, Terminal]

const content = {
  fr: {
    // Section: Le concept (agent → collaborateur)
    conceptEyebrow: 'LE CONCEPT UNITALK',
    conceptTitle: 'Ce n’est pas un agent.',
    conceptAccent: 'C’est un collaborateur.',
    conceptLead:
      'Un agent exécute une tâche, puis disparaît. Un Collaborateur IA a une identité professionnelle : un poste, un responsable, une mémoire et une place dans votre équipe.',
    conceptAgentLabel: 'Un agent IA',
    conceptAgent: [
      'Répond à une requête',
      'Sans nom ni visage',
      'Oublie tout après la tâche',
      'Un outil que l’on utilise',
    ],
    conceptCollabLabel: 'Un Collaborateur IA',
    conceptCollab: [
      'Occupe un poste dans l’équipe',
      'A un nom, un e-mail, une voix',
      'Se souvient et progresse',
      'Un collègue qui vous appartient',
    ],
    conceptClosing: 'La différence, c’est une identité professionnelle.',
    conceptBenefit: 'Vous ne pilotez plus des outils. Vous dirigez une équipe qui grandit avec vous.',

    // Section: Vos Collaborateurs IA sont déjà prêts
    catEyebrow: 'VOS COLLABORATEURS IA SONT DÉJÀ PRÊTS',
    catTitle: 'Commencez avec un.',
    catAccent: "Ajoutez-en d'autres à mesure que votre entreprise grandit.",
    catRoles: ['Marketing', 'Ventes', 'Support', 'Administration', 'Développement', 'Finance', 'RH'],
    catRolesNote: 'Ou créez un Collaborateur IA spécialement conçu pour votre métier.',
    catCta: 'Découvrir les Collaborateurs IA',

    // Section: Construisez votre équipe
    teamEyebrow: 'CONSTRUISEZ VOTRE ÉQUIPE DE COLLABORATEURS IA',
    teamTitle: 'Chaque Collaborateur IA possède :',
    teamLead:
      'Un vrai collaborateur ne se définit pas par ce qu’il sait faire, mais par ce qu’il est : une identité professionnelle complète.',
    teamAttributes: [
      { title: 'Un rôle', body: 'Sa place et ses responsabilités dans votre organisation.' },
      { title: 'Une mission', body: 'Un objectif clair auquel il se consacre.' },
      { title: 'Une mémoire', body: 'Ce qu\'il apprend reste et lui sert au fil du temps.' },
      { title: 'Ses propres compétences', body: 'Des savoir-faire choisis pour ses missions.' },
      { title: 'Ses outils', body: 'Les applications et accès dont il a besoin pour agir.' },
      { title: 'Sa propre identité', body: 'Un nom, un e-mail et une présence bien à lui.' },
    ],
    teamStatements: [
      'Ils travaillent ensemble.',
      'Ils travaillent avec vos équipes.',
      'Ils partagent les connaissances de votre entreprise.',
    ],

    // Section: Emma, un exemple concret
    emmaEyebrow: 'UN EXEMPLE CONCRET',
    emmaJoinLabel: 'Elle rejoint votre organisation avec :',
    emmaAttributes: ['Une identité', 'Une mission', "Des droits d'accès", 'Une mémoire', 'Une présence numérique'],
    emmaTasks: [
      'Elle répond aux emails.',
      'Organise les réunions.',
      'Prépare les comptes rendus.',
      'Met à jour votre CRM.',
      'Coordonne vos équipes.',
    ],
    emmaClosingLead: 'Vous lui confiez une mission.',
    emmaClosingAccent: "Elle l'exécute.",

    // Section: Chaque Collaborateur IA rejoint votre organigramme
    memberEyebrow: 'CHAQUE COLLABORATEUR IA REJOINT VOTRE ORGANIGRAMME',
    memberTitle: 'Livré prêt à travailler.',
    memberAccent: 'Il devient un membre de votre organisation.',
    deliveredLabel: 'Chaque Collaborateur IA est livré avec :',
    delivered: [
      'Un agent Hermès',
      'De la mémoire collaborative',
      'Ses propres outils et ressources',
      'Son hébergement sur Unitalk AI Cloud ou l’un de ses partenaires',
    ],
    memberAttrsLabel: 'Avec :',
    memberAttrs: [
      'Une adresse email',
      'Un numéro de téléphone',
      'Un calendrier',
      'Une voix',
      'Un profil public',
      "Des droits d'accès",
      'Une mémoire',
      'Ses propres outils',
    ],
    memberAudience: ['Vos collaborateurs.', 'Vos clients.', 'Vos partenaires.'],
    memberClosing: "Peuvent lui écrire, l'appeler, prendre rendez-vous avec lui ou lui confier une mission.",

    // Section: Manifeste agentique
    manifestoEyebrow: 'LA RÉVOLUTION DE L’AGENTIQUE',
    manifestoTitle: 'Les prochains actifs sont des Collaborateurs IA autonomes.',
    manifestoLead: 'Participez à la révolution de l’agentique. Transformez vos compétences en Collaborateur IA et générez des revenus avec votre intelligence.',
    manifestoGoodLabel: 'La bonne nouvelle',
    manifestoGood: 'Vous êtes propriétaire de votre intelligence.',
    manifestoBadLabel: 'La mauvaise',
    manifestoBad: 'C’est le seul capital qu’il vous reste.',
    manifestoCta: 'Faire fructifier votre intelligence',

    // Section: Votre intelligence appartient à votre entreprise
    proofEyebrow: 'VOTRE INTELLIGENCE APPARTIENT À VOTRE ENTREPRISE',
    proofTitle: "Les modèles d'IA évolueront.",
    proofLead: 'Vos Collaborateurs IA resteront.',
    proofItems: ['Chaque conversation.', 'Chaque mission.', 'Chaque document.', 'Chaque connaissance.'],
    proofItemsVerb: 'Enrichissent leur mémoire.',
    proofBody: 'Et cette mémoire appartient à votre entreprise.',
    // Section: Unitalk Work
    workEyebrow: 'UNITALK WORK',
    workTitle: 'Travaillez avec vos Collaborateurs IA où que vous soyez.',
    workAvailableLabel: 'Disponible :',
    workChannels: [
      'Sur Desktop',
      'Dans votre navigateur',
      'Dans vos messageries',
      'Dans votre terminal',
    ],
    workLocal: 'En local avec Ollama.',
    workCloud: 'Ou dans le cloud avec Unitalk AI Gateway.',
    // Section: Les meilleurs modèles, automatiquement
    modelsEyebrow: 'LES MEILLEURS MODÈLES. AUTOMATIQUEMENT.',
    modelsList: ['Claude', 'ChatGPT', 'Gemini', 'Mistral', 'Qwen', 'DeepSeek', 'Images', 'Vidéo', 'Audio', 'Code'],
    modelsBody: 'Chaque Collaborateur IA utilise automatiquement le meilleur modèle pour chaque mission.',
    modelsAccent: "Vous n'avez rien à choisir.",

    // Section: Emma
    emmaTitle: 'Emma, Executive Assistant.',
    emmaStatsLabel: 'Une réputation qui se construit',
    emmaStats: [
      { value: '4,9/5', label: 'Satisfaction' },
      { value: '1 240', label: 'Missions accomplies' },
      { value: '8 mois', label: 'Dans l’équipe' },
    ],
    emmaIntroStrong: 'Un membre à part entière.',
    emmaIntro: "Emma rejoint votre organisation avec un rôle, une mission, des droits d'accès et une identité. Comme un collègue, elle se souvient, progresse et bâtit sa réputation mission après mission.",
    emmaName: 'Emma',
    emmaRole: 'Executive Assistant',
    emmaEmail: 'emma@votre-entreprise.fr',
    emmaSkills: ['Planning', 'CRM', 'Export', 'Synthèse', 'Veille'],
    emmaMissions: [
      { label: 'Dernière mission', body: 'A organisé 14 réunions, coordonné 3 comités et préparé les comptes rendus — le tout en une matinée.' },
      { label: "Ce qu'elle fait chaque jour", body: 'Gère la boîte email, met à jour le CRM, prépare les reportings, alerte sur les sujets critiques.' },
    ],
    emmaCta: "Voir la fiche complète d'Emma",
    emmaNote: 'Chaque Collaborateur IA s\'adapte à ses missions. Les compétences se choisissent à la création et évoluent avec lui.',

    // Section: Trois façons de commencer
    plansEyebrow: 'TROIS FAÇONS DE COMMENCER',
    plansTitle: "Une porte d'entrée pour chaque organisation.",
    plans: [
      {
        name: 'Solo',
        audience: 'Pour les indépendants et professions libérales',
        pitch: 'Faites le travail de plusieurs personnes, seul.',
        price: '30 €',
        unit: 'par mois / agent',
        cta: 'Voir les tarifs',
        href: '/tarifs',
      },
      {
        name: 'Team',
        audience: 'Pour les équipes en croissance',
        pitch: 'Augmentez les capacités de votre équipe sans recruter au même rythme.',
        price: '25 €',
        unit: 'par agent / mois',
        cta: 'Voir les tarifs',
        href: '/tarifs',
        popular: true,
      },
      {
        name: 'Business',
        audience: 'Pour les organisations établies',
        pitch: "Construisez l'infrastructure d'intelligence de votre entreprise.",
        price: 'Sur devis',
        unit: 'Infrastructure privée',
        cta: 'Voir les tarifs',
        href: '/tarifs',
      },
    ],
    popularBadge: 'LE PLUS CHOISI',

    // Section: CTA final
    finalEyebrow: 'PRÊT · COMMENCER ?',
    finalTitle: 'Votre premier Collaborateur IA vous attend.',
    finalSteps: [
      'Essayez-le gratuitement pendant 7 jours.',
      'Confiez-lui une première mission.',
      "Découvrez ce qu'un Collaborateur IA peut apporter à votre entreprise.",
    ],
    finalCta: 'Commencer gratuitement',
    finalFinePrint: 'Essai gratuit 7 jours · Sans engagement · Déploiement en quelques minutes',
  },
  en: {
    catEyebrow: 'YOUR AI COLLABORATORS ARE ALREADY READY',
    catTitle: 'Start with one.',
    catAccent: 'Add more as your company grows.',
    catRoles: ['Marketing', 'Sales', 'Support', 'Administration', 'Development', 'Finance', 'HR'],
    catRolesNote: 'Or create an AI Collaborator built specifically for your field.',
    catCta: 'Discover AI Collaborators',

    teamEyebrow: 'BUILD YOUR TEAM OF AI COLLABORATORS',
    teamTitle: 'Every AI Collaborator has:',
    teamLead:
      'A real collaborator isn’t defined by what it can do, but by what it is: a complete professional identity.',
    teamAttributes: [
      { title: 'A role', body: 'Its place and responsibilities within your organization.' },
      { title: 'A mission', body: 'A clear objective it dedicates itself to.' },
      { title: 'A memory', body: 'What it learns stays and serves it over time.' },
      { title: 'Its own skills', body: 'Know-how chosen for its missions.' },
      { title: 'Its tools', body: 'The apps and access it needs to act.' },
      { title: 'Its own identity', body: 'A name, an email and a presence of its own.' },
    ],
    teamStatements: [
      'They work together.',
      'They work with your teams.',
      'They share your company knowledge.',
    ],

    // Section: The concept (agent → collaborator)
    conceptEyebrow: 'THE UNITALK CONCEPT',
    conceptTitle: 'It’s not an agent.',
    conceptAccent: 'It’s a collaborator.',
    conceptLead:
      'An agent runs a task, then vanishes. An AI Collaborator has a professional identity: a role, a manager, a memory and a place on your team.',
    conceptAgentLabel: 'An AI agent',
    conceptAgent: [
      'Answers a prompt',
      'No name, no face',
      'Forgets everything after the task',
      'A tool you use',
    ],
    conceptCollabLabel: 'An AI Collaborator',
    conceptCollab: [
      'Holds a role on the team',
      'Has a name, an email, a voice',
      'Remembers and improves',
      'A colleague you own',
    ],
    conceptClosing: 'The difference is a professional identity.',
    conceptBenefit: 'You no longer manage tools. You lead a team that grows with you.',

    emmaEyebrow: 'A CONCRETE EXAMPLE',
    emmaJoinLabel: 'She joins your organization with:',
    emmaAttributes: ['An identity', 'A mission', 'Access rights', 'A memory', 'A digital presence'],
    emmaTasks: [
      'She answers emails.',
      'Schedules meetings.',
      'Prepares meeting notes.',
      'Keeps your CRM up to date.',
      'Coordinates your teams.',
    ],
    emmaClosingLead: 'You hand her a mission.',
    emmaClosingAccent: 'She executes it.',

    memberEyebrow: 'EVERY AI COLLABORATOR JOINS YOUR ORG CHART',
    memberTitle: 'Ready to work out of the box.',
    memberAccent: 'It becomes a member of your organization.',
    deliveredLabel: 'Every AI Collaborator ships with:',
    delivered: [
      'A Hermès agent',
      'Collaborative memory',
      'Its own tools and resources',
      'Its hosting on Unitalk AI Cloud or one of its partners',
    ],
    memberAttrsLabel: 'With:',
    memberAttrs: [
      'An email address',
      'A phone number',
      'A calendar',
      'A voice',
      'A public profile',
      'Access rights',
      'A memory',
      'Its own tools',
    ],
    memberAudience: ['Your teammates.', 'Your clients.', 'Your partners.'],
    memberClosing: 'Can write to it, call it, book a meeting with it or hand it a mission.',

    // Section: Agentic manifesto
    manifestoEyebrow: 'THE AGENTIC REVOLUTION',
    manifestoTitle: 'The next assets are autonomous AI Collaborators.',
    manifestoLead: 'Join the agentic revolution. Turn your skills into an AI Collaborator and generate revenue with your intelligence.',
    manifestoGoodLabel: 'The good news',
    manifestoGood: 'You own your intelligence.',
    manifestoBadLabel: 'The bad news',
    manifestoBad: 'It’s the only capital you have left.',
    manifestoCta: 'Grow your intelligence',

    proofEyebrow: 'YOUR INTELLIGENCE BELONGS TO YOUR COMPANY',
    proofTitle: 'AI models will evolve.',
    proofLead: 'Your AI Collaborators will remain.',
    proofItems: ['Every conversation.', 'Every mission.', 'Every document.', 'Every piece of knowledge.'],
    proofItemsVerb: 'Enriches their memory.',
    proofBody: 'And that memory belongs to your company.',
    workEyebrow: 'UNITALK WORK',
    workTitle: 'Work with your AI Collaborators wherever you are.',
    workAvailableLabel: 'Available:',
    workChannels: [
      'On Desktop',
      'In your browser',
      'In your messaging apps',
      'In your terminal',
    ],
    workLocal: 'Locally with Ollama.',
    workCloud: 'Or in the cloud with Unitalk AI Gateway.',
    modelsEyebrow: 'THE BEST MODELS. AUTOMATICALLY.',
    modelsList: ['Claude', 'ChatGPT', 'Gemini', 'Mistral', 'Qwen', 'DeepSeek', 'Images', 'Video', 'Audio', 'Code'],
    modelsBody: 'Every AI Collaborator automatically uses the best model for each mission.',
    modelsAccent: 'You have nothing to choose.',

    emmaTitle: 'Emma, Executive Assistant.',
    emmaStatsLabel: 'A reputation that builds over time',
    emmaStats: [
      { value: '4.9/5', label: 'Satisfaction' },
      { value: '1,240', label: 'Missions completed' },
      { value: '8 months', label: 'On the team' },
    ],
    emmaIntroStrong: 'A full-fledged team member.',
    emmaIntro: 'Emma joins your organization with a role, a mission, access rights and an identity. Like a colleague, she remembers, improves and builds her reputation mission after mission.',
    emmaName: 'Emma',
    emmaRole: 'Executive Assistant',
    emmaEmail: 'emma@your-company.com',
    emmaSkills: ['Planning', 'CRM', 'Export', 'Summary', 'Monitoring'],
    emmaMissions: [
      { label: 'Latest mission', body: 'Organized 14 meetings, coordinated 3 committees and prepared the minutes — all in one morning.' },
      { label: 'What she does every day', body: 'Manages the inbox, updates the CRM, prepares reporting, flags critical topics.' },
    ],
    emmaCta: "See Emma's full profile",
    emmaNote: 'Every AI Collaborator adapts to its missions. Skills are chosen at creation and evolve over time.',

    plansEyebrow: 'THREE WAYS TO START',
    plansTitle: 'An entry point for every organization.',
    plans: [
      {
        name: 'Solo',
        audience: 'For freelancers and independent professionals',
        pitch: 'Do the work of several people, on your own.',
        price: '€30',
        unit: 'per month / agent',
        cta: 'View pricing',
        href: '/tarifs',
      },
      {
        name: 'Team',
        audience: 'For growing teams',
        pitch: 'Grow your team capabilities without hiring at the same pace.',
        price: '€25',
        unit: 'per agent / month',
        cta: 'View pricing',
        href: '/tarifs',
        popular: true,
      },
      {
        name: 'Business',
        audience: 'For established organizations',
        pitch: 'Build your company intelligence infrastructure.',
        price: 'Custom',
        unit: 'Private infrastructure',
        cta: 'View pricing',
        href: '/tarifs',
      },
    ],
    popularBadge: 'MOST CHOSEN',

    finalEyebrow: 'READY TO START?',
    finalTitle: 'Your first AI Collaborator is waiting.',
    finalSteps: [
      'Try it free for 7 days.',
      'Hand it a first mission.',
      'Discover what an AI Collaborator can bring to your business.',
    ],
    finalCta: 'Start for free',
    finalFinePrint: '7-day free trial · No commitment · Deployed in minutes',
  },
} as const

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.55 }}>
      {children}
    </motion.div>
  )
}

function Eyebrow({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <p className={`font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#D10E63] ${className}`}>{children}</p>
}

export function HomeStorySections({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = content[lang]
  return (
    <>
      {/* Le concept : agent → collaborateur */}
      <section className="section-rule relative overflow-hidden bg-[#1C1A17] py-24 text-[#F3EFE6] md:py-32">
        <Reveal className="editorial-shell relative">
          <div className="max-w-3xl">
            <Eyebrow className="mb-5">{t.conceptEyebrow}</Eyebrow>
            <h2 className="text-balance font-sf text-4xl font-semibold leading-[1.02] tracking-[-0.045em] md:text-5xl">
              {t.conceptTitle} <span className="text-[#D10E63]">{t.conceptAccent}</span>
            </h2>
            <p className="mt-6 max-w-2xl text-pretty font-sf text-lg leading-relaxed text-[#C9C2B6] md:text-xl">{t.conceptLead}</p>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-2 md:gap-6">
            {/* Agent */}
            <div className="rounded-3xl border border-[#33302B] bg-[#211D19] p-8">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#857C6E]">{t.conceptAgentLabel}</p>
              <ul className="mt-6 flex flex-col gap-4">
                {t.conceptAgent.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[#A09789]">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#4A453E]"><X className="h-3.5 w-3.5" strokeWidth={2.2} /></span>
                    <span className="text-pretty text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Collaborateur */}
            <div className="rounded-3xl border border-[#D10E63]/40 bg-[#D10E63]/[0.08] p-8">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D10E63]">{t.conceptCollabLabel}</p>
              <ul className="mt-6 flex flex-col gap-4">
                {t.conceptCollab.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[#F3EFE6]">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#D10E63] text-[#FBF9F3]"><Check className="h-3.5 w-3.5" strokeWidth={2.5} /></span>
                    <span className="text-pretty text-base font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 flex items-center gap-4 border-t border-[#33302B] pt-10">
            <Fingerprint className="h-8 w-8 shrink-0 text-[#D10E63]" strokeWidth={1.6} />
            <p className="text-balance font-sf text-2xl font-semibold tracking-[-0.025em] md:text-3xl">{t.conceptClosing}</p>
          </div>
          <p className="mt-6 max-w-2xl text-pretty font-sf text-lg leading-relaxed text-[#C9C2B6] md:text-xl">{t.conceptBenefit}</p>
        </Reveal>
      </section>

      {/* Collaborateurs prêts */}
      <section className="section-rule relative overflow-hidden bg-[#FBF9F3] py-24 md:py-32">
        <div aria-hidden="true" className="bg-editorial pointer-events-none absolute inset-0 opacity-35" />
        <Reveal className="editorial-shell relative">
          <div className="max-w-3xl">
            <Eyebrow className="mb-5">{t.catEyebrow}</Eyebrow>
            <h2 className="text-balance font-sf text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-[#1C1A17] md:text-5xl">{t.catTitle}</h2>
            <p className="mt-4 text-pretty font-sf text-2xl font-semibold leading-snug tracking-[-0.025em] text-[#D10E63] md:text-3xl">{t.catAccent}</p>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.catRoles.map((role, index) => {
              const Icon = roleIcons[index]
              return (
                <motion.div key={role} className="flex items-center gap-3 rounded-2xl border border-[#D8D0C2] bg-[#FBF9F3] px-5 py-4" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: (index % 4) * 0.05 }}>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#D8D0C2] text-[#D10E63]"><Icon className="h-5 w-5" strokeWidth={1.8} /></span>
                  <span className="font-sf text-lg font-bold tracking-[-0.02em] text-[#1C1A17]">{role}</span>
                </motion.div>
              )
            })}
            <motion.a href="/collaborateurs-ia" className="flex items-center gap-3 rounded-2xl border border-dashed border-[#D10E63] bg-[#D10E63]/[0.05] px-5 py-4 transition-colors hover:bg-[#D10E63]/[0.1]" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#D10E63] text-[#FBF9F3]"><Plus className="h-5 w-5" strokeWidth={2} /></span>
              <span className="text-pretty text-sm font-semibold leading-snug text-[#D10E63]">{t.catRolesNote}</span>
            </motion.a>
          </div>

          <a href="/collaborateurs-ia" className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-[#D10E63] transition-[gap] hover:gap-3">{t.catCta}<ArrowRight className="h-4 w-4" /></a>
        </Reveal>
      </section>

      {/* Construisez votre équipe */}
      <section className="section-rule bg-[#F3EFE4] py-24 md:py-32">
        <Reveal className="editorial-shell">
          <div className="max-w-3xl">
            <Eyebrow className="mb-5">{t.teamEyebrow}</Eyebrow>
            <h2 className="text-balance font-sf text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-[#1C1A17] md:text-5xl">{t.teamTitle}</h2>
            <p className="mt-5 max-w-2xl text-pretty font-sf text-lg leading-relaxed text-[#6B6560] md:text-xl">{t.teamLead}</p>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.teamAttributes.map((attr, index) => {
              const Icon = attributeIcons[index]
              return (
                <motion.article key={attr.title} className="rounded-2xl border border-[#D8D0C2] bg-[#FBF9F3] p-6" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: (index % 3) * 0.05 }}>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D10E63]/[0.08] text-[#D10E63]"><Icon className="h-5 w-5" strokeWidth={1.8} /></span>
                  <h3 className="mt-5 font-sf text-xl font-bold tracking-[-0.02em] text-[#1C1A17]">{attr.title}</h3>
                  <p className="mt-2 text-pretty text-sm leading-6 text-[#6B6560]">{attr.body}</p>
                </motion.article>
              )
            })}
          </div>

          <div className="mt-12 border-t border-[#D8D0C2] pt-10">
            <ul className="flex flex-col gap-3">
              {t.teamStatements.map((statement) => (
                <li key={statement} className="flex items-center gap-3 font-sf text-2xl font-semibold tracking-[-0.025em] text-[#1C1A17] md:text-3xl">
                  <ArrowRight className="h-6 w-6 shrink-0 text-[#D10E63]" strokeWidth={2} />
                  <span className="text-pretty">{statement}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* Emma, un exemple concret */}
      <section className="section-rule bg-[#FBF9F3] py-24 md:py-32">
        <Reveal className="editorial-shell">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            {/* Carte identité */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <div className="overflow-hidden rounded-3xl border border-[#D8D0C2] bg-[#F3EFE4]">
                <div className="relative aspect-[4/5] w-full">
                  <Image src="/images/emma-avatar.png" alt={`Portrait d'${t.emmaName}, Collaborateur IA`} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2">
                    <h3 className="font-sf text-2xl font-bold tracking-[-0.02em] text-[#1C1A17]">{t.emmaName}</h3>
                    <BadgeCheck className="h-5 w-5 text-[#D10E63]" strokeWidth={2} />
                  </div>
                  <p className="mt-1 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#857C6E]">{t.emmaRole}</p>
                </div>
              </div>
            </div>

            {/* Récit */}
            <div>
              <Eyebrow className="mb-5">{t.emmaEyebrow}</Eyebrow>
              <p className="text-balance font-sf text-3xl font-semibold leading-[1.1] tracking-[-0.035em] text-[#1C1A17] md:text-4xl">{t.emmaIntro}</p>

              <p className="mt-8 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#A09789]">{t.emmaJoinLabel}</p>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {t.emmaAttributes.map((attr) => (
                  <span key={attr} className="rounded-full border border-[#D8D0C2] bg-[#F3EFE4] px-4 py-2 text-sm font-semibold text-[#1C1A17]">{attr}</span>
                ))}
              </div>

              <ul className="mt-8 flex flex-col gap-2.5 border-t border-[#D8D0C2] pt-8">
                {t.emmaTasks.map((task) => (
                  <li key={task} className="flex items-center gap-3 font-sf text-lg font-semibold tracking-[-0.02em] text-[#1C1A17]">
                    <Check className="h-4 w-4 shrink-0 text-[#D10E63]" strokeWidth={2.5} />
                    {task}
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-t border-[#D8D0C2] pt-8">
                <p className="font-sf text-2xl font-semibold tracking-[-0.025em] text-[#1C1A17] md:text-3xl">{t.emmaClosingLead}</p>
                <p className="mt-1 font-sf text-2xl font-semibold tracking-[-0.025em] text-[#D10E63] md:text-3xl">{t.emmaClosingAccent}</p>
              </div>

              <a href="/collaborateurs-ia" className="mt-9 inline-flex items-center gap-2 text-sm font-bold text-[#D10E63] transition-[gap] hover:gap-3">{t.emmaCta}<ArrowRight className="h-4 w-4" /></a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Rejoint votre organigramme */}
      <section className="section-rule bg-[#FBF9F3] py-24 md:py-32">
        <Reveal className="editorial-shell">
          <div className="max-w-3xl">
            <Eyebrow className="mb-5">{t.memberEyebrow}</Eyebrow>
            <h2 className="text-balance font-sf text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-[#1C1A17] md:text-5xl">{t.memberTitle}</h2>
            <p className="mt-4 text-pretty font-sf text-2xl font-semibold leading-snug tracking-[-0.025em] text-[#D10E63] md:text-3xl">{t.memberAccent}</p>
          </div>

          <div className="mt-14">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#A09789]">{t.memberAttrsLabel}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {t.memberAttrs.map((attr, index) => {
                const Icon = memberIcons[index]
                return (
                  <motion.div key={attr} className="flex items-center gap-3 rounded-2xl border border-[#D8D0C2] bg-[#F3EFE4] px-4 py-3.5" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: (index % 4) * 0.05 }}>
                    <Icon className="h-5 w-5 shrink-0 text-[#D10E63]" strokeWidth={1.8} />
                    <span className="text-sm font-semibold text-[#1C1A17]">{attr}</span>
                  </motion.div>
                )
              })}
            </div>
          </div>

          <div className="mt-12 border-t border-[#D8D0C2] pt-10">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#A09789]">{t.deliveredLabel}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {t.delivered.map((item, index) => (
                <motion.div key={item} className="flex items-start gap-3 rounded-2xl border border-[#D8D0C2] bg-[#F3EFE4] px-4 py-3.5" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: (index % 2) * 0.05 }}>
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#D10E63]" strokeWidth={1.8} />
                  <span className="text-sm font-semibold text-[#1C1A17]">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-12 border-t border-[#D8D0C2] pt-10">
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {t.memberAudience.map((who) => (
                <span key={who} className="font-sf text-2xl font-semibold tracking-[-0.025em] text-[#1C1A17] md:text-3xl">{who}</span>
              ))}
            </div>
            <p className="mt-3 max-w-2xl text-pretty font-sf text-xl font-medium leading-snug text-[#6B6560] md:text-2xl">{t.memberClosing}</p>
          </div>
        </Reveal>
      </section>

      {/* Propriété et accès */}
      <section className="section-rule bg-[#1C1A17] py-24 text-[#FBF9F3] md:py-32">
        <Reveal className="editorial-shell">
          <div className="max-w-3xl">
            <Eyebrow className="mb-6 text-[#F0559B]">{t.proofEyebrow}</Eyebrow>
            <h2 className="text-balance font-sf text-4xl font-semibold leading-[1.05] tracking-[-0.045em] md:text-5xl">{t.proofTitle}<br /><span className="text-[#F0559B]">{t.proofLead}</span></h2>
          </div>
          <ul className="mt-8 flex flex-col gap-1.5">
            {t.proofItems.map((item) => (
              <li key={item} className="font-sf text-2xl font-semibold tracking-[-0.02em] text-[#E7E0D5] md:text-3xl">{item}</li>
            ))}
          </ul>
          <p className="mt-4 font-sf text-2xl font-semibold tracking-[-0.02em] text-[#E7E0D5] md:text-3xl">{t.proofItemsVerb}</p>
          <p className="mt-8 max-w-2xl text-pretty font-sf text-2xl font-semibold tracking-[-0.025em] text-[#F0559B] md:text-3xl">{t.proofBody}</p>
        </Reveal>
      </section>

      {/* Manifeste agentique */}
      <section className="section-rule bg-[#FBF9F3] py-24 md:py-32">
        <Reveal className="editorial-shell">
          <div className="max-w-3xl">
            <Eyebrow className="mb-5">{t.manifestoEyebrow}</Eyebrow>
            <h2 className="text-balance font-sf text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-[#1C1A17] md:text-5xl">{t.manifestoTitle}</h2>
            <p className="mt-5 text-pretty font-sf text-xl font-medium leading-snug text-[#6B6560] md:text-2xl">{t.manifestoLead}</p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#D8D0C2] bg-[#F3EFE4] p-6">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#A09789]">{t.manifestoGoodLabel}</p>
              <p className="mt-3 text-pretty font-sf text-2xl font-semibold tracking-[-0.025em] text-[#1C1A17]">{t.manifestoGood}</p>
            </div>
            <div className="rounded-2xl border border-[#1C1A17] bg-[#1C1A17] p-6 text-[#FBF9F3]">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#F0559B]">{t.manifestoBadLabel}</p>
              <p className="mt-3 text-pretty font-sf text-2xl font-semibold tracking-[-0.025em]">{t.manifestoBad}</p>
            </div>
          </div>

          <div className="mt-10">
            <Link href="/signup" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#D10E63] px-7 text-sm font-semibold text-[#FBF9F3] transition-colors hover:bg-[#A80B50]">
              {t.manifestoCta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Emma */}
      <section className="section-rule relative overflow-hidden bg-[#FBF9F3] py-24 md:py-32">
        <div aria-hidden="true" className="bg-dots pointer-events-none absolute inset-0 opacity-40" />
        <Reveal className="editorial-shell relative grid items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-24">
          <div className="premium-shadow overflow-hidden rounded-[1.75rem] border border-[#D8D0C2] bg-[#FBF9F3]">
            <div className="flex items-center justify-between border-b border-[#E4DDCE] p-5 sm:p-6">
              <div className="flex items-center gap-4"><img src="/assistant-avatar.png" alt={t.emmaName} className="h-14 w-14 rounded-full object-cover" /><div><p className="font-sf text-xl font-bold text-[#1C1A17]">{t.emmaName}</p><p className="text-sm text-[#D10E63]">{t.emmaRole}</p></div></div>
              <span className="h-2.5 w-2.5 rounded-full bg-[#D10E63]" aria-label={lang === 'fr' ? 'Disponible' : 'Available'} />
            </div>
            <div className="p-5 sm:p-6">
              <p className="flex items-center gap-2 text-xs text-[#857C6E]"><Mail className="h-3.5 w-3.5" />{t.emmaEmail}</p>
              <div className="mt-5 flex flex-wrap gap-2">{t.emmaSkills.map((skill) => <span key={skill} className="rounded-full border border-[#D8D0C2] px-3 py-1.5 text-[11px] font-semibold text-[#6B6560]">{skill}</span>)}</div>
              <div className="mt-7 border-t border-[#E4DDCE]">
                {t.emmaMissions.map((mission, index) => { const Icon = index === 0 ? CalendarDays : BarChart3; return <div key={mission.label} className="flex gap-4 border-b border-[#E4DDCE] py-5 last:border-0"><Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#D10E63]" /><div><p className="text-xs font-bold uppercase tracking-[0.12em] text-[#1C1A17]">{mission.label}</p><p className="mt-2 text-pretty text-sm leading-6 text-[#6B6560]">{mission.body}</p></div></div> })}
              </div>
              <div className="mt-6 rounded-2xl bg-[#F3EFE4] p-5">
                <p className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#A09789]"><Star className="h-3.5 w-3.5 text-[#D10E63]" fill="currentColor" />{t.emmaStatsLabel}</p>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {t.emmaStats.map((stat) => <div key={stat.label}><p className="font-sf text-2xl font-bold tracking-[-0.03em] text-[#1C1A17]">{stat.value}</p><p className="mt-1 text-[11px] leading-tight text-[#857C6E]">{stat.label}</p></div>)}
                </div>
              </div>
            </div>
          </div>

          <div>
            <Eyebrow className="mb-6">{lang === 'fr' ? 'UN VRAI MEMBRE DE L’ÉQUIPE' : 'A REAL TEAM MEMBER'}</Eyebrow>
            <h2 className="text-balance font-sf text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-[#1C1A17] md:text-6xl">{t.emmaTitle}</h2>
            <p className="mt-6 max-w-xl text-pretty text-base leading-7 text-[#6B6560] md:text-lg"><span className="font-bold text-[#1C1A17]">{t.emmaIntroStrong}</span> {t.emmaIntro}</p>
            <p className="mt-6 max-w-lg border-l-2 border-[#D10E63] pl-5 text-sm leading-6 text-[#857C6E]">{t.emmaNote}</p>
            <a href="/@emma" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#D10E63] px-6 py-3 text-sm font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5">{t.emmaCta}<ArrowRight className="h-4 w-4" /></a>
          </div>
        </Reveal>
      </section>

      {/* Unitalk Work */}
      <section id="unitalk-work" className="section-rule scroll-mt-20 bg-[#F3EFE4] py-24 md:py-32">
        <Reveal className="editorial-shell">
          <div className="max-w-3xl">
            <Eyebrow className="mb-5">{t.workEyebrow}</Eyebrow>
            <h2 className="text-balance font-sf text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-[#1C1A17] md:text-5xl">{t.workTitle}</h2>
          </div>

          <div className="mt-14">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#A09789]">{t.workAvailableLabel}</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {t.workChannels.map((channel, index) => {
                const Icon = workIcons[index]
                return (
                  <motion.div key={channel} className="flex items-center gap-3 rounded-2xl border border-[#D8D0C2] bg-[#FBF9F3] px-5 py-4" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: (index % 4) * 0.05 }}>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#D8D0C2] text-[#D10E63]"><Icon className="h-5 w-5" strokeWidth={1.8} /></span>
                    <span className="font-sf text-base font-bold tracking-[-0.02em] text-[#1C1A17]">{channel}</span>
                  </motion.div>
                )
              })}
            </div>
          </div>

          <div className="mt-12 border-t border-[#D8D0C2] pt-10">
            <p className="font-sf text-2xl font-semibold tracking-[-0.025em] text-[#1C1A17] md:text-3xl">{t.workLocal}</p>
            <p className="mt-1 text-pretty font-sf text-2xl font-semibold tracking-[-0.025em] text-[#D10E63] md:text-3xl">{t.workCloud}</p>
          </div>
        </Reveal>
      </section>

      {/* Les meilleurs modèles, automatiquement */}
      <section className="section-rule bg-[#1C1A17] py-24 text-[#FBF9F3] md:py-32">
        <Reveal className="editorial-shell">
          <div className="max-w-3xl">
            <Eyebrow className="mb-6 text-[#F0559B]">{t.modelsEyebrow}</Eyebrow>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            {t.modelsList.map((model, index) => (
              <motion.span key={model} className="rounded-full border border-[#FBF9F3]/20 px-5 py-2.5 font-sf text-lg font-semibold tracking-[-0.02em] text-[#E7E0D5] md:text-xl" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: (index % 5) * 0.04 }}>{model}</motion.span>
            ))}
          </div>
          <div className="mt-12 border-t border-[#FBF9F3]/15 pt-10">
            <p className="max-w-2xl text-pretty font-sf text-2xl font-semibold leading-snug tracking-[-0.025em] md:text-3xl">{t.modelsBody}</p>
            <p className="mt-3 font-sf text-2xl font-semibold tracking-[-0.025em] text-[#F0559B] md:text-3xl">{t.modelsAccent}</p>
          </div>
        </Reveal>
      </section>

      {/* Trois façons de commencer */}
      <section id="offres" className="section-rule relative overflow-hidden bg-[#F3EFE6] py-24 md:py-32">
        <div aria-hidden="true" className="bg-editorial pointer-events-none absolute inset-0 opacity-35" />
        <Reveal className="editorial-shell relative">
          <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <Eyebrow>{t.plansEyebrow}</Eyebrow>
            <h2 className="text-balance font-sf text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-[#1C1A17] md:text-5xl">{t.plansTitle}</h2>
          </div>
          <div className="mt-14 grid gap-4 lg:grid-cols-3">
            {t.plans.map((plan) => (
              <div key={plan.name} className={`relative flex flex-col rounded-[1.5rem] border bg-[#FBF9F3] p-7 md:p-8 ${'popular' in plan && plan.popular ? 'border-[#D10E63] premium-shadow lg:-translate-y-3' : 'border-[#D8D0C2]'}`}>
                {'popular' in plan && plan.popular && <span className="absolute right-7 top-8 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-[#D10E63]">{t.popularBadge}</span>}
                <p className="font-sf text-xl font-bold text-[#1C1A17]">{plan.name}</p>
                <p className="mt-2 text-sm font-medium text-[#D10E63]">{plan.audience}</p>
                <p className="mt-4 text-pretty text-sm leading-relaxed text-[#6B6560]">{plan.pitch}</p>
                <div className="mt-8 flex items-baseline gap-2">
                  <span className="font-sf text-4xl font-bold text-[#1C1A17] [letter-spacing:-0.03em]">{plan.price}</span>
                </div>
                <p className="mt-2 text-xs font-medium text-[#857C6E]">{plan.unit}</p>
                <a
                  href={plan.href}
                  className={`mt-8 inline-flex min-h-11 items-center justify-center rounded-full px-6 py-2.5 text-sm font-bold transition-all ${'popular' in plan && plan.popular ? 'bg-[#D10E63] text-[#FBF9F3] hover:-translate-y-0.5' : 'border border-[#C9C0B2] bg-[#FBF9F3] text-[#1C1A17] hover:border-[#D10E63] hover:text-[#D10E63]'}`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* CTA final */}
      <section className="section-rule bg-[#D10E63] py-24 text-center text-[#FBF9F3] md:py-32">
        <Reveal className="editorial-shell max-w-4xl">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#FBF9F3]/35"><UsersRound className="h-5 w-5" /></span>
          <p className="mt-7 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#FBF9F3]/75">{t.finalEyebrow}</p>
          <h2 className="mt-5 text-balance font-sf text-4xl font-semibold leading-[1] tracking-[-0.05em] md:text-6xl">{t.finalTitle}</h2>
          <ul className="mx-auto mt-7 flex max-w-xl flex-col gap-2.5">
            {t.finalSteps.map((step) => (
              <li key={step} className="flex items-center justify-center gap-2 text-pretty text-base leading-7 text-[#FBF9F3]/85 md:text-lg">
                <Check className="h-4 w-4 shrink-0 text-[#FBF9F3]" strokeWidth={2.5} />
                {step}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex justify-center">
            <a href="/signup" className="inline-flex items-center gap-2 rounded-full bg-[#FBF9F3] px-7 py-3.5 font-bold text-[#1C1A17] transition-transform hover:-translate-y-0.5">
              {t.finalCta}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <p className="mt-6 text-sm text-[#FBF9F3]/75">{t.finalFinePrint}</p>
        </Reveal>
      </section>
    </>
  )
}
