// Shared navigation for the "Collaborateurs IA" section.
// Used by the navbar dropdown/burger and by the section sub-nav on each page.

export type CollabNavLink = {
  fr: string
  en: string
  href: string
}

export const COLLAB_SECTION = {
  fr: 'Collaborateurs IA',
  en: 'AI Collaborators',
  href: '/collaborateurs-ia',
}

export const COLLAB_NAV_LINKS: CollabNavLink[] = [
  { fr: "Qu'est-ce qu'un Collaborateur IA ?", en: 'What is an AI Collaborator?', href: '/collaborateurs-ia' },
  { fr: 'Comment ça fonctionne ?', en: 'How it works', href: '/collaborateurs-ia/comment-ca-fonctionne' },
  { fr: 'Les rôles disponibles', en: 'Available roles', href: '/collaborateurs-ia/roles' },
  { fr: 'Comparatif', en: 'Comparison', href: '/collaborateurs-ia/comparatif' },
  { fr: 'Pourquoi Unitalk ?', en: 'Why Unitalk?', href: '/collaborateurs-ia/pourquoi-unitalk' },
]
