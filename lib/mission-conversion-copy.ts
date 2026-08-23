import type { Lang } from '@/lib/language-context'

type MissionConversionCopy = { summary: string; input: string; deliverable: string; control: string }

const DEFAULT_COPY: Record<Lang, MissionConversionCopy> = {
  fr: { summary: 'Alma adapte cette mission à votre entreprise avant son lancement.', input: 'Votre contexte, vos règles et les accès autorisés', deliverable: 'Le résultat décrit dans la mission, prêt à examiner', control: 'Validation humaine avant toute action sensible' },
  en: { summary: 'Alma adapts this mission to your organization before it starts.', input: 'Your context, rules and authorized access', deliverable: 'The mission outcome, ready to review', control: 'Human approval before any sensitive action' },
}

const COPY: Record<string, Record<Lang, MissionConversionCopy>> = {
  'trouver-de-nouveaux-clients': {
    fr: { summary: 'Hugo recherche et qualifie des entreprises selon vos critères. Il prépare une liste sourcée que votre équipe examine avant toute action commerciale.', input: 'Cible, zone, critères de qualification et exclusions', deliverable: 'Liste qualifiée avec sources, justification et points à vérifier', control: 'Validation avant tout contact ou modification du CRM' },
    en: { summary: 'Hugo researches and qualifies companies against your criteria. He prepares a sourced list for your team to review before any sales action.', input: 'Target, region, qualification criteria and exclusions', deliverable: 'Qualified list with sources, rationale and points to verify', control: 'Approval before any outreach or CRM update' },
  },
}

export function missionConversionCopy(slug: string, lang: Lang): MissionConversionCopy {
  return COPY[slug]?.[lang] ?? DEFAULT_COPY[lang]
}
