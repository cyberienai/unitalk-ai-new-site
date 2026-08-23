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
    { question: 'Combien de tokens sont inclus ?', answer: 'Chaque Collaborateur IA dispose de 5 millions de tokens par mois pour le modèle DeepSeek V4 Flash, hébergé en Europe sur l’infrastructure Microsoft Azure. Le volume total inclus augmente avec le nombre de Collaborateurs IA de votre équipe.' },
    { question: 'Comment se termine la mission offerte ?', answer: 'La mission offerte prend fin lorsqu’elle est terminée, après 7 jours ou après 1 million de tokens, selon la première limite atteinte. Aucun abonnement payant n’est activé sans votre accord.' },
    { question: 'Puis-je modifier ou résilier ma configuration ?', answer: 'Oui. Vous pouvez modifier le nombre de Collaborateurs IA, votre licence Workspace et votre mode de consommation. Vous pouvez également résilier sans engagement.' },
    { question: 'Où suivre la consommation ?', answer: 'La consommation de chaque Collaborateur IA est suivie depuis le Workspace de votre entreprise.' },
  ],
  en: [
    { question: 'What will I pay today?', answer: 'Nothing to start your first mission: it is included and no credit card is required.' },
    { question: 'What is included in the €49/month price?', answer: 'Each AI Collaborator includes its identity, memory, unlimited job profiles and skills, communication tools, a dedicated Hermes agent instance and 5 million tokens per month.' },
    { question: 'How many tokens are included?', answer: 'Each AI Collaborator includes 5 million tokens per month for the DeepSeek V4 Flash model, hosted in Europe on Microsoft Azure infrastructure. Your total included volume increases with the number of AI Collaborators on your team.' },
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
