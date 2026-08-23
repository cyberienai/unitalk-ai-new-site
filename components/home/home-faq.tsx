'use client'

import { useId, useRef, useState } from 'react'
import Link from 'next/link'
import { ChevronDown, Plus } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { Kicker } from './section-kicker'

const QUESTIONS = {
  fr: [
    ['Au juste, qu’est-ce que votre Collaborateur IA ?', 'Il possède une véritable identité, appartient à votre entreprise et dispose de sa propre mémoire, de ses propres outils de communication et de son propre ordinateur dans le cloud, où il écrit et exécute du code pour accomplir des tâches. Ce n’est pas un chatbot. C’est un Collaborateur IA qui accomplit vos missions et fait un vrai travail.'],
    ['En quoi votre Collaborateur IA est-il différent de ChatGPT ou des autres assistants IA ?', 'La plupart des outils d’IA génèrent du texte et répondent surtout à des demandes ponctuelles. Votre Collaborateur IA possède une identité, dispose d’un espace de travail persistant, conserve le contexte utile et exécute des missions dans les applications autorisées. Il effectue des actions : envoyer des e-mails, mettre à jour des CRM, créer des applications ou générer des rapports. Vous n’avez pas à faire de copier-coller. Votre Collaborateur IA effectue le travail de bout en bout.'],
    ['Que peut vraiment faire votre Collaborateur IA ?', 'Il peut prospecter, préparer une réunion, traiter des demandes clients, analyser des données, produire des documents ou automatiser des tâches répétitives.'],
    ['À quels outils votre Collaborateur IA se connecte-t-il ?', 'Plus de 3 200, dont Salesforce, HubSpot, Linear, Notion, Jira, Stripe, GitHub, Google Drive, Slack, Microsoft Teams et bien d’autres. Si votre outil n’est pas pris en charge, votre Collaborateur IA peut créer une intégration personnalisée.'],
    ['Mes données sont-elles sécurisées ?', 'Oui. Les accès sont limités au périmètre nécessaire à chaque mission. Chaque Collaborateur IA dispose d’un environnement de calcul isolé et accède uniquement aux outils que vous connectez explicitement. Les données sont chiffrées en transit et au repos. Nous n’entraînons pas nos modèles sur vos données.'],
    ['Votre Collaborateur IA a-t-il accès à tous mes messages ?', 'Non. Il accède uniquement aux comptes, espaces et données que vous autorisez.'],
    ['Comment votre Collaborateur IA apprend-il à connaître mon équipe ?', 'Votre Collaborateur IA se construit une base de connaissances au fil du temps à partir des conversations et du contexte de votre organisation. Il consigne ce qu’il apprend dans des « compétences » : des notes internes auxquelles il se réfère pour travailler plus efficacement avec votre équipe.'],
    ['Votre Collaborateur IA peut-il faire des erreurs ?', 'Oui. Comme toute intelligence artificielle, il peut se tromper. Votre Collaborateur IA est compétent, mais pas infaillible. Il vérifie son travail et demande une confirmation avant les actions à fort enjeu, comme l’envoi d’e-mails ou le déploiement en production. Vous gardez le contrôle.'],
    ['Que se passe-t-il si votre Collaborateur IA ne peut pas faire quelque chose ?', 'Il signale le blocage, demande les informations manquantes ou sollicite une décision humaine.'],
    ['Combien de temps prend la configuration ?', 'Une première mission se prépare en quelques minutes. Le délai dépend ensuite des applications et de la personnalisation nécessaires.'],
    ['Plusieurs personnes de mon équipe peuvent-elles utiliser votre Collaborateur IA ?', 'Oui. Les membres autorisés collaborent dans le Workspace selon leurs rôles et leurs droits.'],
    ['Comment démarrer ?', 'Décrivez le résultat attendu ou choisissez une mission. Alma vous guide ensuite dans la préparation.'],
    ['Les intégrations sont-elles partagées avec toute mon équipe ?', 'Pas automatiquement. Leur disponibilité dépend des droits accordés à chaque membre et à chaque Collaborateur IA.'],
    ['Les autres membres peuvent-ils voir mes conversations privées avec votre Collaborateur IA ?', 'Les conversations et contenus suivent les règles d’accès définies par votre entreprise.'],
    ['Que se passe-t-il avec mes données si je déconnecte une intégration ?', 'L’accès à l’intégration est supprimé. La conservation des données déjà traitées suit les paramètres et obligations applicables.'],
    ['Comment votre Collaborateur IA gère-t-il les contrôles d’accès ?', 'Il agit avec les permissions attribuées par votre entreprise, qui peut les limiter ou les révoquer.'],
    ['Mes données sont-elles chiffrées ?', 'Les mesures de chiffrement et leur périmètre sont décrits dans la documentation de sécurité et le DPA.'],
    ['Votre Collaborateur IA partage-t-il des données entre différentes équipes ou entreprises ?', 'Non par défaut. Les données sont séparées entre les entreprises et suivent les autorisations définies.'],
    ['Puis-je supprimer toutes mes données ?', 'Vous pouvez demander leur effacement selon les conditions précisées dans notre politique de confidentialité et notre DPA.'],
    ['Comment votre Collaborateur IA utilise-t-il mes messages ?', 'Il les utilise pour comprendre vos demandes, exécuter les missions autorisées et conserver le contexte nécessaire.'],
    ['Quelles certifications de conformité Unitalk possède-t-il ?', 'Les certifications effectivement obtenues sont indiquées sur la page Sécurité. Une démarche en cours n’est jamais présentée comme acquise.'],
    ['Que prévoit la feuille de route en matière de confidentialité et de sécurité ?', 'Elle renforce progressivement les contrôles d’accès, la traçabilité, la gestion des données et la documentation destinée aux entreprises.'],
  ],
  en: [
    ['What exactly is your AI Collaborator?', 'It has a distinct identity, belongs to your organization and has its own memory, communication tools and cloud computer, where it writes and runs code to complete tasks. It is not a chatbot. It is an AI Collaborator that carries out your missions and does real work.'],
    ['How is your AI Collaborator different from ChatGPT or other AI assistants?', 'Most AI tools generate text and mainly answer one-off requests. Your AI Collaborator has an identity, its own persistent workspace, retains useful context and executes missions in authorized applications. It can send emails, update CRMs, create applications or generate reports. You do not have to copy and paste: your AI Collaborator carries out the work from end to end.'],
    ['What can your AI Collaborator actually do?', 'It can prospect, prepare meetings, handle customer requests, analyze data, produce documents or automate repetitive tasks.'],
    ['Which tools can your AI Collaborator connect to?', 'More than 3,200, including Salesforce, HubSpot, Linear, Notion, Jira, Stripe, GitHub, Google Drive, Slack, Microsoft Teams and many more. If your tool is not supported, your AI Collaborator can create a custom integration.'],
    ['Is my data secure?', 'Yes. Access is limited to what each mission requires. Each AI Collaborator has an isolated computing environment and accesses only the tools you explicitly connect. Data is encrypted in transit and at rest. We do not train our models on your data.'],
    ['Does your AI Collaborator have access to all my messages?', 'No. It accesses only the accounts, spaces and data you authorize.'],
    ['How does your AI Collaborator learn about my team?', 'Your AI Collaborator builds a knowledge base over time from conversations and your organization’s context. It records what it learns in “skills”: internal notes it refers to in order to work more effectively with your team.'],
    ['Can your AI Collaborator make mistakes?', 'Yes. Like any artificial intelligence, it can make mistakes. Your AI Collaborator is capable, but not infallible. It checks its work and requests confirmation before high-impact actions, such as sending emails or deploying to production. You remain in control.'],
    ['What happens if your AI Collaborator cannot do something?', 'It reports the blocker, requests missing information or asks for a human decision.'],
    ['How long does setup take?', 'A first mission can be prepared in minutes. Timing then depends on the applications and customization required.'],
    ['Can several people on my team use your AI Collaborator?', 'Yes. Authorized members collaborate in Workspace according to their roles and permissions.'],
    ['How do I get started?', 'Describe the expected outcome or choose a mission. Alma then guides the preparation.'],
    ['Are integrations shared with my entire team?', 'Not automatically. Availability depends on the permissions granted to each member and AI Collaborator.'],
    ['Can other members see my private conversations with your AI Collaborator?', 'Conversations and content follow the access rules defined by your organization.'],
    ['What happens to my data when I disconnect an integration?', 'Access to the integration is removed. Previously processed data follows applicable settings and obligations.'],
    ['How does your AI Collaborator handle access controls?', 'It acts with permissions assigned by your organization, which can limit or revoke them.'],
    ['Is my data encrypted?', 'Encryption measures and their scope are described in the security documentation and DPA.'],
    ['Does your AI Collaborator share data across teams or organizations?', 'Not by default. Data is separated between organizations and follows defined permissions.'],
    ['Can I delete all my data?', 'You may request deletion under the conditions in our privacy policy and DPA.'],
    ['How does your AI Collaborator use my messages?', 'It uses them to understand requests, execute authorized missions and retain necessary context.'],
    ['Which compliance certifications does Unitalk hold?', 'Certifications actually obtained are listed on the Security page. Work in progress is never presented as certified.'],
    ['What is planned for privacy and security?', 'The roadmap progressively strengthens access controls, traceability, data management and enterprise documentation.'],
  ],
} as const

const LABELS = {
  fr: { kicker: 'Questions fréquentes', title: 'Ce qu’il faut savoir avant de commencer.', more: 'Voir les 18 autres questions', less: 'Réduire la FAQ', security: 'Voir la sécurité et le DPA' },
  en: { kicker: 'Frequently asked questions', title: 'What to know before you start.', more: 'View 18 more questions', less: 'Show fewer questions', security: 'View security and the DPA' },
} as const

export function HomeFaq({ lang }: { lang: Lang }) {
  const [showAll, setShowAll] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const questionsId = useId()
  const items = showAll ? QUESTIONS[lang] : QUESTIONS[lang].slice(0, 4)
  const labels = LABELS[lang]

  function toggleQuestions() {
    if (!showAll) {
      setShowAll(true)
      return
    }
    setShowAll(false)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
    })
  }

  return <section ref={sectionRef} className="scroll-mt-20 border-b border-[#D8D0C2] bg-[#F3EFE6] py-16 sm:py-20"><div className="editorial-shell grid gap-10 lg:grid-cols-[.7fr_1.3fr]"><div><Kicker>{labels.kicker}</Kicker><h2 className="mt-5 max-w-xl text-[clamp(2.35rem,4vw,3.5rem)] font-bold leading-[.98] tracking-[-.05em]">{labels.title}</h2></div><div><div id={questionsId} className="border-t border-[#CFC5B5]">{items.map(([question, answer], index) => <details key={question} className="group border-b border-[#CFC5B5]"><summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-4 text-left text-[15px] font-bold marker:content-none"><span>{question}</span><Plus aria-hidden className="size-4 shrink-0 text-[#B00C54] transition-transform group-open:rotate-45"/></summary><div className="max-w-2xl pb-5 pr-10 text-sm leading-7 text-[#5C554A]"><p>{answer}</p>{index === 4 && <Link href={lang === 'fr' ? '/securite' : '/en/security'} className="mt-3 inline-block font-bold text-[#B00C54] underline decoration-[#D10E63]/30 underline-offset-4">{labels.security}</Link>}</div></details>)}</div><button type="button" onClick={toggleQuestions} aria-expanded={showAll} aria-controls={questionsId} className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-[#BFB4A4] bg-[#FAF8F3] px-5 text-sm font-bold hover:border-[#D10E63] hover:text-[#B00C54]">{showAll ? labels.less : labels.more}<ChevronDown className={`size-4 transition-transform ${showAll ? 'rotate-180' : ''}`}/></button></div></div></section>
}
