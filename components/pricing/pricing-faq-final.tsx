'use client'

import Link from 'next/link'
import { useId, useState, type ReactNode } from 'react'
import { useLanguage } from '@/lib/language-context'

const ITEMS = {
  fr: [
    ['L’essai gratuit est-il vraiment gratuit ?', 'Oui. Vous disposez d’un Collaborateur IA pour une première mission, sans carte bancaire et sans activation payante automatique. L’essai prend fin dès que la mission est terminée, après 7 jours ou après 1 million de tokens, selon la première limite atteinte.'],
    ['Que puis-je faire avec 1 million de tokens ?', 'Cela dépend des modèles et des formats utilisés. Pour du texte, 1 million de tokens permet généralement de réaliser plusieurs missions de rédaction, d’analyse, de recherche ou de traitement documentaire. Les images, l’audio, la vidéo et les modèles avancés peuvent consommer davantage. Votre consommation reste visible dans Unitalk.'],
    ['Puis-je changer d’offre à tout moment ?', 'Oui. Vous pouvez faire évoluer le nombre de Collaborateurs IA, la licence Workspace et la capacité IA selon vos besoins. Aucun changement payant n’est activé automatiquement sans votre accord.'],
    ['Les crédits inutilisés sont-ils reportés ?', 'Les crédits prépayés restent disponibles dans le solde de votre entreprise jusqu’à leur utilisation. Les crédits mensuels inclus dans une offre ne sont pas reportés au mois suivant.'],
    ['Quelle différence entre un Assistant IA et un Collaborateur IA ?', 'Un Assistant IA aide un membre dans une conversation. Un Collaborateur IA possède une identité, une mémoire, des compétences et un environnement de travail propres pour prendre en charge des missions sous contrôle humain.'],
    ['Que comprend la Licence Workspace Unitalk ?', 'La licence est un forfait par entreprise, jamais par siège : gratuite pour 1 utilisateur, 49 € jusqu’à 10 et 299 € jusqu’à 100. Elle inclut le Workspace Web et Desktop, des Assistants IA illimités, les modèles autorisés, plus de 3 000 intégrations, les droits et les validations. La formule Solo inclut 1 000 crédits offerts une seule fois, la formule à 49 € inclut 2 500 crédits IA par mois et celle à 299 € en inclut 20 000.'],
    ['Que comprend un Collaborateur IA à 49 € par mois ?', 'Son identité, sa mémoire, ses profils métier et compétences illimités, ses outils de communication et une instance dédiée de l’agent Hermes. Il peut recevoir et passer des appels téléphoniques selon les règles définies par votre entreprise. Chaque Collaborateur inclut 1 million de tokens et 60 minutes de téléphone par mois.'],
    ['Comment fonctionnent les crédits et le BYOK ?', 'Les crédits financent les modèles IA, les API externes et les minutes de téléphone supplémentaires. Les recharges commencent à 25 €. Vous pouvez aussi utiliser vos propres clés API ou combiner les deux en mode hybride.'],
    ['Quels modèles, applications et canaux sont disponibles ?', <>Unitalk donne accès aux modèles autorisés pour le texte, l’analyse multimodale, les images, la vidéo, l’audio, la transcription et le code. Plus de 3 000 applications sont disponibles via Pipedream. Hermes fonctionne aussi dans Workspace, Desktop, Terminal / CLI et les principales messageries. <Link href="/marketplace/modeles-ia" className="font-bold text-[#B00C54] underline decoration-[#D10E63]/30 underline-offset-4">Explorer les modèles IA</Link>.</>],
    ['Puis-je exporter ce que mon entreprise construit ?', 'Oui. Vos données, profils métier, compétences et configurations sont exportables. Chaque mission validée enrichit une capacité réutilisable et gouvernée par votre entreprise. Hermes est open source ; Unitalk y ajoute l’identité, la mémoire, les communications, le Workspace, les missions, les droits et la gouvernance.'],
  ],
  en: [
    ['Is the free trial really free?', 'Yes. You get an AI Collaborator for one first mission with no credit card and no automatic paid activation. The trial ends when the mission is complete, after 7 days or after 1 million tokens, whichever comes first.'],
    ['What can I do with 1 million tokens?', 'It depends on the models and formats used. For text, 1 million tokens will generally cover several writing, analysis, research or document-processing missions. Images, audio, video and advanced models may consume more. Your usage remains visible in Unitalk.'],
    ['Can I change plans at any time?', 'Yes. You can change the number of AI Collaborators, the Workspace license and AI capacity as your needs evolve. No paid change is activated automatically without your approval.'],
    ['Do unused credits roll over?', 'Prepaid credits remain available in your organization balance until they are used. Monthly credits included with a plan do not roll over to the next month.'],
    ['What is the difference between an AI Assistant and an AI Collaborator?', 'An AI Assistant helps a member in a conversation. An AI Collaborator has its own identity, memory, skills and work environment to take ownership of missions under human control.'],
    ['What does the Unitalk Workspace license include?', 'The license is a flat fee per organization, never per seat: free for 1 user, €49 for up to 10 and €299 for up to 100. It includes the Web and Desktop Workspace, unlimited AI Assistants, authorized models, 3,000+ integrations, permissions and approvals. Solo includes 1,000 credits once, the €49 plan includes 2,500 AI credits per month and the €299 plan includes 20,000.'],
    ['What is included with a €49/month AI Collaborator?', 'Identity, memory, unlimited job profiles and skills, communication tools and a dedicated Hermes agent instance. It can receive and place phone calls under the rules defined by your organization. Each Collaborator includes 1 million tokens and 60 phone minutes.'],
    ['How do credits and BYOK work?', 'Credits fund AI models, external APIs and additional phone minutes. Top-ups start at €25. You can also use your own API keys or combine both in hybrid mode.'],
    ['Which models, applications and channels are available?', <>Unitalk provides authorized models for text, multimodal analysis, images, video, audio, transcription and code. More than 3,000 applications are available through Pipedream. Hermes also works in Workspace, Desktop, Terminal / CLI and major messaging platforms. <Link href="/marketplace/modeles-ia" className="font-bold text-[#B00C54] underline decoration-[#D10E63]/30 underline-offset-4">Explore AI models</Link>.</>],
    ['Can I export what my organization builds?', 'Yes. Your data, job profiles, skills and configurations are exportable. Each approved mission builds reusable capability governed by your organization. Hermes is open source; Unitalk adds identity, memory, communications, Workspace, missions, permissions and governance.'],
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
