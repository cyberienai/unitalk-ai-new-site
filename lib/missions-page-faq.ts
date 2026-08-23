import type { Lang } from '@/lib/language-context'

export const MISSIONS_PAGE_FAQ: Record<Lang, readonly (readonly [string, string])[]> = {
  fr: [
    ['Que se passe-t-il après avoir choisi une mission ?', 'Alma adapte la mission à votre contexte, prépare le Collaborateur IA et identifie les applications, données et validations nécessaires avant le lancement.'],
    ['Que couvre la première mission offerte ?', 'Elle vous permet de cadrer, préparer et tester une première mission sans carte bancaire. Elle prend fin avec la mission, après 7 jours ou après 1 million de tokens, selon la première limite atteinte.'],
    ['Quelles actions restent sous mon contrôle ?', 'Vous choisissez les applications accessibles et les actions qui nécessitent votre validation. Aucune action sensible n’est exécutée sans votre accord.'],
    ['À quelles applications mon Collaborateur IA peut-il accéder ?', 'Plus de 3 200 intégrations sont disponibles. Votre Collaborateur IA accède uniquement aux applications que vous connectez et aux autorisations utiles à sa mission.'],
  ],
  en: [
    ['What happens after I choose a mission?', 'Alma adapts the mission to your context, prepares the AI Collaborator and identifies the applications, data and approvals required before launch.'],
    ['What does the included first mission cover?', 'It lets you scope, prepare and test a first mission without a credit card. It ends with the mission, after 7 days or after 1 million tokens, whichever comes first.'],
    ['Which actions remain under my control?', 'You choose the accessible applications and the actions that require your approval. No sensitive action is executed without your consent.'],
    ['Which applications can my AI Collaborator access?', 'More than 3,200 integrations are available. Your AI Collaborator accesses only the applications you connect and the permissions required for its mission.'],
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
