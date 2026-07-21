// Fictional "Acme" company demo data.
// Shows how Unitalk looks once deployed inside a real organization:
// team members and their AI Collaborators, public profiles, and an internal workspace view.

import type { Bilingual } from '@/lib/collaborators-catalog'

export const ACME = {
  name: 'Acme',
}

export type AcmeKind = 'human' | 'ai'

export type AcmeMember = {
  id: string
  name: string
  kind: AcmeKind
  // monogram accent color (muted, identity-only)
  color: string
  role: Bilingual
  department: Bilingual
  // humans: their AI collaborator id (if any); ai: the human they report to
  linkedTo?: string
  // ai only: slug of the detailed catalog profile + public/internal demo
  slug?: string
}

export const ACME_MEMBERS: AcmeMember[] = [
  {
    id: 'patrick-martin',
    name: 'Patrick Martin',
    kind: 'human',
    color: '#5F6B4A',
    role: { fr: 'Fondateur', en: 'Founder' },
    department: { fr: 'Direction', en: 'Leadership' },
    linkedTo: 'emma',
  },
  {
    id: 'emma',
    name: 'Emma',
    kind: 'ai',
    color: '#2F5D50',
    role: { fr: 'Executive Assistant', en: 'Executive Assistant' },
    department: { fr: 'Direction', en: 'Leadership' },
    linkedTo: 'patrick-martin',
    slug: 'emma',
  },
  {
    id: 'julie-chen',
    name: 'Julie Chen',
    kind: 'human',
    color: '#A9603F',
    role: { fr: 'Responsable commerciale', en: 'Head of Sales' },
    department: { fr: 'Ventes', en: 'Sales' },
    linkedTo: 'alex',
  },
  {
    id: 'alex',
    name: 'Alex',
    kind: 'ai',
    color: '#8B5A3C',
    role: { fr: 'Prospection', en: 'Prospecting' },
    department: { fr: 'Ventes', en: 'Sales' },
    linkedTo: 'julie-chen',
    slug: 'alex',
  },
  {
    id: 'marc-dubois',
    name: 'Marc Dubois',
    kind: 'human',
    color: '#4A5A72',
    role: { fr: 'Responsable support', en: 'Head of Support' },
    department: { fr: 'Relation client', en: 'Customer Relations' },
    linkedTo: 'sophia',
  },
  {
    id: 'sophia',
    name: 'Sophia',
    kind: 'ai',
    color: '#5B5FA6',
    role: { fr: 'Support client', en: 'Customer Support' },
    department: { fr: 'Relation client', en: 'Customer Relations' },
    linkedTo: 'marc-dubois',
    slug: 'sophia',
  },
  {
    id: 'nadia-benali',
    name: 'Nadia Benali',
    kind: 'human',
    color: '#7A5A8C',
    role: { fr: 'Responsable administrative', en: 'Head of Administration' },
    department: { fr: 'Finance', en: 'Finance' },
  },
  {
    id: 'thomas-roussel',
    name: 'Thomas Roussel',
    kind: 'human',
    color: '#4F7A64',
    role: { fr: 'Coordinateur', en: 'Coordinator' },
    department: { fr: 'Opérations', en: 'Operations' },
  },
  {
    id: 'lea-moreau',
    name: 'Léa Moreau',
    kind: 'human',
    color: '#B08540',
    role: { fr: 'Chargée de marketing', en: 'Marketing Manager' },
    department: { fr: 'Marketing', en: 'Marketing' },
  },
]

export function getAcmeMember(id: string): AcmeMember | undefined {
  return ACME_MEMBERS.find((m) => m.id === id)
}

// Public profile of a human member who chose to publish it.
// Their AI proxy filters incoming requests and handles no-value-added tasks,
// only escalating to the human when it matters.
export type MemberProfile = {
  published: boolean
  headline: Bilingual
  // tasks the member (via their AI) can take off your plate
  delegate: Bilingual[]
  // what the AI proxy handles before the human is involved
  proxyHandles: Bilingual[]
}

export const ACME_MEMBER_PROFILES: Record<string, MemberProfile> = {
  'patrick-martin': {
    published: true,
    headline: {
      fr: 'Fondateur d’Acme. Emma, son assistante IA, filtre et traite les demandes avant de le solliciter.',
      en: 'Founder of Acme. Emma, his AI assistant, filters and handles requests before involving him.',
    },
    delegate: [
      { fr: 'Prendre rendez-vous avec Patrick', en: 'Book a meeting with Patrick' },
      { fr: 'Poser une question à l’équipe direction', en: 'Ask the leadership team a question' },
      { fr: 'Transmettre un dossier ou une proposition', en: 'Send over a document or proposal' },
    ],
    proxyHandles: [
      { fr: 'Qualifier votre demande et y répondre', en: 'Qualify your request and reply' },
      { fr: 'Proposer un créneau et confirmer le rendez-vous', en: 'Offer a slot and confirm the meeting' },
      { fr: 'Router vers le bon interlocuteur, humain ou IA', en: 'Route to the right person, human or AI' },
    ],
  },
}

export function getMemberProfile(id: string): MemberProfile | undefined {
  return ACME_MEMBER_PROFILES[id]
}

export function getAcmeAiBySlug(slug: string): AcmeMember | undefined {
  return ACME_MEMBERS.find((m) => m.kind === 'ai' && m.slug === slug)
}

// Internal workspace demo data, keyed by AI collaborator slug.
export type WorkspaceData = {
  tools: string[]
  worksWith: string[] // member ids
  today: { label: Bilingual; value: number }[]
}

export const ACME_WORKSPACES: Record<string, WorkspaceData> = {
  emma: {
    tools: ['Google Workspace', 'Microsoft 365', 'Notion', 'HubSpot', 'Salesforce', 'Slack', 'Teams'],
    worksWith: ['alex', 'sophia'],
    today: [
      { label: { fr: 'Réunions organisées', en: 'Meetings organized' }, value: 12 },
      { label: { fr: 'Emails traités', en: 'Emails handled' }, value: 48 },
      { label: { fr: 'Documents générés', en: 'Documents generated' }, value: 6 },
      { label: { fr: 'Appels passés', en: 'Calls made' }, value: 9 },
    ],
  },
  alex: {
    tools: ['Email', 'CRM', 'LinkedIn', 'HubSpot', 'Calendrier', 'Slack'],
    worksWith: ['emma', 'sophia'],
    today: [
      { label: { fr: 'Leads qualifiés', en: 'Leads qualified' }, value: 21 },
      { label: { fr: 'Relances envoyées', en: 'Follow-ups sent' }, value: 37 },
      { label: { fr: 'Rendez-vous fixés', en: 'Meetings booked' }, value: 8 },
      { label: { fr: 'Fiches CRM mises à jour', en: 'CRM records updated' }, value: 54 },
    ],
  },
  sophia: {
    tools: ['Helpdesk', 'Chat', 'Email', 'CRM', 'Base de connaissances', 'Slack'],
    worksWith: ['emma', 'alex'],
    today: [
      { label: { fr: 'Tickets résolus', en: 'Tickets resolved' }, value: 63 },
      { label: { fr: 'Conversations en direct', en: 'Live conversations' }, value: 29 },
      { label: { fr: 'Escalades', en: 'Escalations' }, value: 4 },
      { label: { fr: 'Articles FAQ mis à jour', en: 'FAQ articles updated' }, value: 5 },
    ],
  },
}
