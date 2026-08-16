export type EquipmentVisibility = 'private' | 'public'

export type EquipmentItem = {
  id: string
  type: 'mission' | 'profile' | 'skill' | 'application'
  label: string
  visibility: EquipmentVisibility
}

export type CollaboratorEquipmentDraft = {
  id: string
  collaboratorSlug: string
  collaboratorName: string
  request: string
  mission: EquipmentItem
  profile: EquipmentItem
  skills: EquipmentItem[]
  applications: EquipmentItem[]
  approvals: string[]
  createdAt: number
}

const STORAGE_PREFIX = 'unitalk_collaborator_equipment_'

const PRESETS: Record<string, Omit<CollaboratorEquipmentDraft, 'id' | 'collaboratorSlug' | 'collaboratorName' | 'request' | 'createdAt'>> = {
  sales: {
    mission: { id: 'trouver-de-nouveaux-clients', type: 'mission', label: 'Trouver et qualifier de nouveaux prospects', visibility: 'public' },
    profile: { id: 'commercial', type: 'profile', label: 'Commercial B2B', visibility: 'public' },
    skills: [
      { id: 'qualifier-un-prospect', type: 'skill', label: 'Qualifier un prospect', visibility: 'public' },
      { id: 'relancer-une-opportunite', type: 'skill', label: 'Relancer une opportunité', visibility: 'public' },
      { id: 'rediger-des-messages', type: 'skill', label: 'Rédiger des messages personnalisés', visibility: 'private' },
    ],
    applications: [
      { id: 'hubspot', type: 'application', label: 'HubSpot', visibility: 'private' },
      { id: 'gmail', type: 'application', label: 'Messagerie', visibility: 'private' },
      { id: 'google-agenda', type: 'application', label: 'Calendrier', visibility: 'private' },
    ],
    approvals: ['Validation humaine avant chaque premier envoi', 'Confirmation avant toute modification du CRM'],
  },
  support: {
    mission: { id: 'repondre-a-mes-clients', type: 'mission', label: 'Traiter les demandes clients entrantes', visibility: 'public' },
    profile: { id: 'relation-client', type: 'profile', label: 'Relation client', visibility: 'public' },
    skills: [
      { id: 'qualifier-une-demande', type: 'skill', label: 'Qualifier une demande', visibility: 'public' },
      { id: 'preparer-une-reponse', type: 'skill', label: 'Préparer une réponse contextualisée', visibility: 'public' },
    ],
    applications: [
      { id: 'gmail', type: 'application', label: 'Messagerie', visibility: 'private' },
      { id: 'slack', type: 'application', label: 'Slack', visibility: 'private' },
    ],
    approvals: ['Validation humaine des réponses sensibles avant envoi'],
  },
  executive: {
    mission: { id: 'preparer-un-comite-de-direction', type: 'mission', label: 'Préparer et suivre les réunions de direction', visibility: 'public' },
    profile: { id: 'assistante-de-direction', type: 'profile', label: 'Assistante de direction', visibility: 'public' },
    skills: [
      { id: 'rediger-un-compte-rendu', type: 'skill', label: 'Rédiger un compte-rendu', visibility: 'public' },
      { id: 'organiser-les-priorites', type: 'skill', label: 'Organiser les priorités', visibility: 'public' },
    ],
    applications: [
      { id: 'google-agenda', type: 'application', label: 'Google Agenda', visibility: 'private' },
      { id: 'notion', type: 'application', label: 'Notion', visibility: 'private' },
      { id: 'slack', type: 'application', label: 'Slack', visibility: 'private' },
    ],
    approvals: ['Validation humaine des décisions et communications engageantes'],
  },
}

function equipmentPreset(request: string) {
  const normalized = request.toLowerCase()
  if (/client|support|réclamation|reclamation|ticket/.test(normalized)) return PRESETS.support
  if (/réunion|reunion|agenda|direction|comité|comite|compte-rendu/.test(normalized)) return PRESETS.executive
  return PRESETS.sales
}

export function buildEquipmentDraft(collaboratorSlug: string, collaboratorName: string, request: string): CollaboratorEquipmentDraft {
  const preset = equipmentPreset(request)
  return {
    id: `equip_${crypto.randomUUID()}`,
    collaboratorSlug,
    collaboratorName,
    request: request.trim(),
    mission: { ...preset.mission },
    profile: { ...preset.profile },
    skills: preset.skills.map((item) => ({ ...item })),
    applications: preset.applications.map((item) => ({ ...item })),
    approvals: [...preset.approvals],
    createdAt: Date.now(),
  }
}

export function saveEquipmentDraft(draft: CollaboratorEquipmentDraft) {
  localStorage.setItem(STORAGE_PREFIX + draft.id, JSON.stringify(draft))
}

export function loadEquipmentDraft(id: string): CollaboratorEquipmentDraft | null {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + id)
    return raw ? JSON.parse(raw) as CollaboratorEquipmentDraft : null
  } catch {
    return null
  }
}
