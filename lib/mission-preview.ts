import type { Lang } from '@/lib/language-context'

export function getPreparedMissionPreview(value: string, lang: Lang) {
  const normalized = value.toLocaleLowerCase(lang)

  if (normalized.includes('factur') || normalized.includes('invoice')) return lang === 'fr'
    ? { title: 'Préparer et suivre la facturation', name: 'Nadia', role: 'Collaboratrice IA · Finance' }
    : { title: 'Prepare and track invoicing', name: 'Nadia', role: 'AI Collaborator · Finance' }

  if (normalized.includes('e-mail') || normalized.includes('email') || normalized.includes('mail')) return lang === 'fr'
    ? { title: 'Traiter les e-mails entrants', name: 'Emma', role: 'Collaboratrice IA · Assistante de direction' }
    : { title: 'Handle incoming emails', name: 'Emma', role: 'AI Collaborator · Executive Assistant' }

  const isProspecting = normalized.includes('prospect')
    || normalized.includes('lead')
    || normalized.includes('nouveau client')
    || normalized.includes('new customer')
    || normalized.includes('new client')

  if (isProspecting) return lang === 'fr'
    ? { title: 'Trouver des prospects qualifiés', name: 'Hugo', role: 'Collaborateur IA · Commercial' }
    : { title: 'Find qualified prospects', name: 'Hugo', role: 'AI Collaborator · Sales' }

  return lang === 'fr'
    ? { title: value.trim(), name: 'À définir avec Alma', role: 'Profil recommandé après cadrage' }
    : { title: value.trim(), name: 'To define with Alma', role: 'Profile recommended after scoping' }
}
