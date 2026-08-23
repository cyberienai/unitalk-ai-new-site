import type { Lang } from '@/lib/language-context'

export type PricingFaqItem = {
  question: string
  answer: string
  link?: { href: string; label: string }
}

export const pricingFaqItems: Record<Lang, readonly PricingFaqItem[]> = {
  fr: [
    { question: 'Que vais-je payer aujourd’hui ?', answer: 'Rien pour commencer votre première mission : elle est offerte et aucune carte bancaire n’est demandée.' },
    { question: 'Que comprend le prix de 49 €/mois ?', answer: 'Chaque Collaborateur IA comprend son identité, sa mémoire, ses profils métier et compétences illimités, ses outils de communication, une instance dédiée de l’agent Hermes et 5 millions de tokens par mois.' },
    { question: 'Quels crédits sont inclus avec le Workspace ?', answer: 'Le Workspace inclut chaque mois 1 000 crédits en Solo, 2 500 en Équipe ou 20 000 en Entreprise. Ils permettent d’utiliser un assistant IA privé ou partagé avec plusieurs modèles, même sans ajouter de Collaborateur IA.' },
    { question: 'Quelle différence entre le Workspace et un Collaborateur IA ?', answer: 'Le Workspace est l’espace de travail où humains et IA collaborent : conversations, missions, planification, résultats et validations. Un Collaborateur IA y prend en charge des missions avec une identité, une mémoire, des compétences et des outils autorisés.' },
    { question: 'Combien de tokens sont inclus ?', answer: 'Chaque Collaborateur IA dispose de 5 millions de tokens par mois avec DeepSeek V4 Flash, hébergé en Europe sur Microsoft Azure. Pour utiliser d’autres modèles, vous pouvez consommer les crédits IA inclus ou prépayés, ou connecter vos propres clés API.' },
    { question: 'Comment se termine la mission offerte ?', answer: 'La mission offerte prend fin lorsqu’elle est terminée, après 7 jours ou après 1 million de tokens, selon la première limite atteinte. Aucun abonnement payant n’est activé sans votre accord.' },
    { question: 'Puis-je modifier ou résilier ma configuration ?', answer: 'Oui. Vous pouvez modifier le nombre de Collaborateurs IA, votre licence Workspace et votre mode de consommation. Vous pouvez également résilier sans engagement.' },
    { question: 'Où suivre la consommation ?', answer: 'La consommation de chaque Collaborateur IA est suivie depuis le Workspace de votre entreprise.' },
  ],
  en: [
    { question: 'What will I pay today?', answer: 'Nothing to start your first mission: it is included and no credit card is required.' },
    { question: 'What is included in the €49/month price?', answer: 'Each AI Collaborator includes its identity, memory, unlimited job profiles and skills, communication tools, a dedicated Hermes agent instance and 5 million tokens per month.' },
    { question: 'Which credits are included with the Workspace?', answer: 'The Workspace includes 1,000 monthly credits on Solo, 2,500 on Team or 20,000 on Business. They let you use a private or shared multimodel AI assistant without adding an AI Collaborator.' },
    { question: 'What is the difference between Workspace and an AI Collaborator?', answer: 'Workspace is the work environment where humans and AI collaborate through conversations, missions, scheduling, outcomes and approvals. An AI Collaborator handles missions there with an identity, memory, skills and authorized tools.' },
    { question: 'How many tokens are included?', answer: 'Each AI Collaborator includes 5 million tokens per month with DeepSeek V4 Flash, hosted in Europe on Microsoft Azure. For other models, use included or prepaid AI credits, or connect your own API keys.' },
    { question: 'How does the included mission end?', answer: 'The included mission ends when it is complete, after 7 days or after 1 million tokens, whichever comes first. No paid subscription is activated without your approval.' },
    { question: 'Can I change or cancel my configuration?', answer: 'Yes. You can change the number of AI Collaborators, your Workspace plan and your usage mode. You can also cancel with no commitment.' },
    { question: 'Where can I track usage?', answer: 'Usage for each AI Collaborator is tracked from your organization Workspace.' },
  ],
}

export function pricingFaqJsonLd(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: pricingFaqItems[lang].map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  }
}
