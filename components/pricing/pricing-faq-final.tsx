'use client'

import Link from 'next/link'
import { useId, useState, type ReactNode } from 'react'
import { useLanguage } from '@/lib/language-context'

const ITEMS = {
  fr: [
    ['La première mission est-elle vraiment gratuite ?', 'Oui. Vous disposez d’un Collaborateur IA pour une première mission, sans carte bancaire. L’essai prend fin dès que la mission est terminée, après 7 jours ou après 1 million de tokens, selon la première limite atteinte.'],
    ['Quelle différence entre un Assistant IA et un Collaborateur IA ?', 'Un Assistant IA aide un membre dans une conversation. Un Collaborateur IA possède une identité, une mémoire, des compétences et un environnement de travail propres pour prendre en charge des missions sous contrôle humain.'],
    ['À qui peut être rattaché un Collaborateur IA ?', 'À une personne, une équipe, un département ou toute l’entreprise. Ses connaissances, ses outils et ses autorisations sont adaptés à ce périmètre.'],
    ['Facturez-vous chaque membre de l’équipe ?', 'Non. La licence est un forfait mensuel par entreprise : 0 € pour 1 utilisateur, 49 € jusqu’à 10 utilisateurs et 299 € jusqu’à 100 utilisateurs.'],
    ['Que permet la Licence Workspace Unitalk sans Collaborateur IA ?', 'Chaque membre accède au Workspace avec des Assistants IA privés ou partagés illimités. La licence inclut aussi les modèles autorisés, les intégrations, l’administration, les droits et les validations. La formule à 49 € inclut 2 500 crédits IA par mois et celle à 299 € en inclut 20 000.'],
    ['Que comprend un Collaborateur IA à 49 € par mois ?', 'Son identité, sa mémoire, ses outils de communication, une instance dédiée de l’agent Hermes, 1 million de tokens et 60 minutes de téléphone.'],
    ['Où les humains et les Collaborateurs IA travaillent-ils ensemble ?', 'Dans Unitalk Workspace sur le Web et dans l’application Desktop, ainsi que dans le Terminal / CLI. Hermes prend également en charge Telegram, Discord, Slack, Google Chat, WhatsApp, WhatsApp Cloud API, Signal, SMS, Email, Home Assistant, Mattermost, Matrix, DingTalk, Feishu / Lark, WeCom, Weixin, BlueBubbles et Photon pour iMessage, QQ, Yuanbao, Microsoft Teams, LINE, ntfy, Raft, IRC, Buzz et SimpleX.'],
    ['Un Collaborateur IA peut-il gérer des appels téléphoniques ?', 'Oui. Il peut devenir un Collaborateur IA vocal pour recevoir et passer des appels téléphoniques selon le numéro, les horaires, les scripts, les droits et les règles d’escalade définis par votre entreprise. Chaque Collaborateur inclut 60 minutes de téléphone.'],
    ['À quels modèles IA ai-je accès ?', <>Unitalk donne un accès unifié aux modèles autorisés par votre entreprise : texte, analyse multimodale, génération et édition d’images, vidéo, audio, transcription et code. <Link href="/marketplace/modeles-ia" className="font-bold text-[#B00C54] underline decoration-[#D10E63]/30 underline-offset-4">Explorer les modèles IA</Link>.</>],
    ['Combien d’applications puis-je connecter ?', 'Unitalk permet des intégrations sécurisées avec plus de 3 000 applications via Pipedream. Chaque Collaborateur accède uniquement aux applications et aux actions que votre entreprise lui autorise.'],
    ['Hermes est-il une boîte noire ?', 'Non. Chaque Collaborateur IA s’appuie sur une instance dédiée de Hermes, un moteur agentique open source. Unitalk ajoute l’identité, la mémoire, les outils de communication, le Workspace, les missions, les droits et la gouvernance nécessaires à un usage professionnel.'],
    ['Suis-je dépendant de Unitalk ?', 'Non. Vous pouvez exporter vos données, vos profils métier, vos compétences et vos configurations. Votre entreprise conserve ainsi le travail et les méthodes construits avec ses Collaborateurs IA.'],
    ['Comment mon entreprise capitalise-t-elle sur ses Collaborateurs IA ?', 'Chaque mission validée peut enrichir leur mémoire, leurs profils métier, leurs compétences et leurs méthodes. Ces actifs restent gouvernés par votre entreprise et peuvent être réutilisés, partagés ou exportés.'],
    ['À quoi servent les crédits ?', 'Ils financent la consommation des modèles IA, des API externes et des minutes de téléphone supplémentaires. Les recharges commencent à 25 €.'],
    ['Puis-je utiliser mes propres clés API ?', 'Oui. Le mode BYOK vous permet d’utiliser vos clés et de payer directement vos fournisseurs. Le mode hybride combine vos clés et les crédits Unitalk.'],
  ],
  en: [
    ['Is the first mission really free?', 'Yes. You get an AI Collaborator for one first mission with no credit card. The trial ends when the mission is complete, after 7 days or after 1 million tokens, whichever comes first.'],
    ['What is the difference between an AI Assistant and an AI Collaborator?', 'An AI Assistant helps a member in a conversation. An AI Collaborator has its own identity, memory, skills and work environment to take ownership of missions under human control.'],
    ['Who can an AI Collaborator be assigned to?', 'An individual, a team, a department or the whole organization. Its knowledge, tools and permissions are adapted to that scope.'],
    ['Do you charge for every team member?', 'No. The license is a monthly flat fee per organization: €0 for 1 user, €49 for up to 10 users and €299 for up to 100 users.'],
    ['What can the organization license do without an AI Collaborator?', 'Every member can access the Workspace with unlimited private or shared AI Assistants. The license also includes authorized models, integrations, administration, permissions and approvals. The €49 plan includes 2,500 AI credits per month and the €299 plan includes 20,000.'],
    ['What is included with a €49/month AI Collaborator?', 'Identity, memory, communication tools, a dedicated Hermes agent instance, 1 million tokens and 60 phone minutes.'],
    ['Where do humans and AI Collaborators work together?', 'In Unitalk Workspace on the Web and in the Desktop application, as well as in the Terminal / CLI. Hermes also supports Telegram, Discord, Slack, Google Chat, WhatsApp, WhatsApp Cloud API, Signal, SMS, Email, Home Assistant, Mattermost, Matrix, DingTalk, Feishu / Lark, WeCom, Weixin, BlueBubbles and Photon for iMessage, QQ, Yuanbao, Microsoft Teams, LINE, ntfy, Raft, IRC, Buzz and SimpleX.'],
    ['Can an AI Collaborator handle phone calls?', 'Yes. It can become a voice AI Collaborator for inbound and outbound calls according to the number, hours, scripts, permissions and escalation rules defined by your organization. Each Collaborator includes 60 phone minutes.'],
    ['Which AI models can I access?', <>Unitalk provides unified access to models authorized by your organization: text, multimodal analysis, image generation and editing, video, audio, transcription and code. <Link href="/marketplace/modeles-ia" className="font-bold text-[#B00C54] underline decoration-[#D10E63]/30 underline-offset-4">Explore AI models</Link>.</>],
    ['How many applications can I connect?', 'Unitalk supports secure integrations with more than 3,000 applications via Pipedream. Each Collaborator can access only the applications and actions authorized by your organization.'],
    ['Is Hermes a black box?', 'No. Each AI Collaborator runs on a dedicated instance of Hermes, an open-source agent runtime. Unitalk adds identity, memory, communication tools, Workspace, missions, permissions and governance for professional use.'],
    ['Am I locked into Unitalk?', 'No. You can export your data, job profiles, skills and configurations. Your organization retains the work and methods built with its AI Collaborators.'],
    ['How does my organization build value through its AI Collaborators?', 'Each approved mission can enrich their memory, job profiles, skills and methods. These assets remain governed by your organization and can be reused, shared or exported.'],
    ['What are credits used for?', 'They fund AI model usage, external APIs and additional phone minutes. Top-ups start at €25.'],
    ['Can I use my own API keys?', 'Yes. BYOK lets you use your keys and pay providers directly. Hybrid mode combines your keys with Unitalk credits.'],
  ],
} as const

export function PricingFaqFinal() {
  const { lang } = useLanguage()
  return <section className="bg-[#FAF8F3] px-5 py-16 sm:px-8 sm:py-24"><div className="editorial-shell grid gap-10 lg:grid-cols-[.7fr_1.3fr]"><div><p className="font-mono text-[10px] font-black uppercase tracking-[.2em] text-[#B00C54]">FAQ</p><h2 className="mt-5 text-[clamp(2.5rem,5vw,4.8rem)] font-semibold leading-[.94] tracking-[-.06em]">{lang === 'fr' ? 'L’essentiel, sans astérisque.' : 'The essentials, no fine print.'}</h2></div><div className="border-t border-[#CFC5B5]">{ITEMS[lang].map(([q, a]) => <Item key={q} q={q} a={a}/>)}</div></div></section>
}

function Item({ q, a }: { q: ReactNode; a: ReactNode }) {
  const [open, setOpen] = useState(false)
  const id = useId()
  return <div className="border-b border-[#CFC5B5]"><button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen(value => !value)} className="flex min-h-20 w-full items-center justify-between gap-6 text-left text-lg font-semibold outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]"><span>{q}</span><span aria-hidden className="font-mono text-[#D10E63]">{open ? '−' : '+'}</span></button>{open && <p id={id} className="max-w-2xl pb-7 pr-8 text-[15px] leading-7 text-[#4E483F]">{a}</p>}</div>
}
