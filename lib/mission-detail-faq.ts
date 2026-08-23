import type { Lang } from '@/lib/language-context'

export type MissionFaq = { question: string; answer: string }

const FAQS: Record<string, Record<Lang, MissionFaq[]>> = {
  'trouver-de-nouveaux-clients': {
    fr: [
      { question: 'Hugo contacte-t-il directement les prospects ?', answer: 'Non par défaut. Hugo prépare et qualifie la sélection. Toute prise de contact ou modification sensible du CRM suit les autorisations et validations définies par votre entreprise.' },
      { question: 'Quelles sources peut-il utiliser ?', answer: 'Uniquement les sources publiques et applications que vous autorisez, par exemple votre CRM, les sites des entreprises ciblées ou vos bases internes accessibles.' },
      { question: 'Comment les prospects sont-ils qualifiés ?', answer: 'Vous définissez les critères utiles : secteur, taille, zone, budget, signaux d’intérêt et exclusions. Chaque recommandation conserve une justification et les sources disponibles.' },
      { question: 'Comment éviter les doublons et les contacts à exclure ?', answer: 'La mission peut comparer la sélection avec votre CRM et vos listes d’exclusion, selon les accès accordés. Les clients existants et contacts opposés à la prospection peuvent être écartés.' },
      { question: 'Que couvre la première mission offerte ?', answer: 'Elle permet de cadrer et tester une première mission sans carte bancaire. Elle prend fin lorsque la mission est terminée, après 7 jours ou après 1 million de tokens, selon la première limite atteinte.' },
    ],
    en: [
      { question: 'Does Hugo contact prospects directly?', answer: 'Not by default. Hugo prepares and qualifies the shortlist. Any outreach or sensitive CRM update follows the permissions and approvals defined by your organization.' },
      { question: 'Which sources can Hugo use?', answer: 'Only public sources and applications you authorize, such as your CRM, target company websites or accessible internal databases.' },
      { question: 'How are prospects qualified?', answer: 'You define useful criteria such as industry, size, region, budget, intent signals and exclusions. Each recommendation retains a rationale and available sources.' },
      { question: 'How are duplicates and excluded contacts handled?', answer: 'The mission can compare the shortlist with your CRM and exclusion lists, depending on granted access. Existing customers and opted-out contacts can be excluded.' },
      { question: 'What does the included first mission cover?', answer: 'It lets you scope and test a first mission without a credit card. It ends when the mission is complete, after 7 days or after 1 million tokens, whichever comes first.' },
    ],
  },
}

export function missionFaq(slug: string, lang: Lang): MissionFaq[] {
  return FAQS[slug]?.[lang] ?? []
}
