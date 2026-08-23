import type { Lang } from '@/lib/language-context'

export const MISSIONS_PAGE_FAQ: Record<Lang, readonly (readonly [string, string])[]> = {
  fr: [
    ['Que se passe-t-il après avoir choisi une mission ?', 'Vous précisez le résultat attendu. Alma adapte la mission à votre contexte et prépare le Collaborateur IA, ses outils et les validations nécessaires.'],
    ['Quelles actions restent sous mon contrôle ?', 'Vous définissez les accès et les validations. Les actions sensibles restent soumises à votre accord avant leur exécution.'],
    ['Que couvre la première mission offerte ?', 'Elle permet de cadrer et tester une première mission sans carte bancaire. Elle prend fin lorsque la mission est terminée, après 7 jours ou après 1 million de tokens, selon la première limite atteinte.'],
    ['Puis-je utiliser mes propres applications ?', 'Oui. Les applications sont connectées uniquement avec votre autorisation et selon les accès utiles à la mission.'],
  ],
  en: [
    ['What happens after I choose a mission?', 'You define the expected outcome. Alma adapts the mission to your context and prepares the AI Collaborator, its tools and required approvals.'],
    ['Which actions remain under my control?', 'You define access and approvals. Sensitive actions remain subject to your approval before execution.'],
    ['What does the included first mission cover?', 'It lets you scope and test a first mission without a credit card. It ends when the mission is complete, after 7 days or after 1 million tokens, whichever comes first.'],
    ['Can I use my own applications?', 'Yes. Applications are connected only with your authorization and according to the access required for the mission.'],
  ],
}

export function missionsFaqJsonLd(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: MISSIONS_PAGE_FAQ[lang].map(([question, answer]) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  }
}
