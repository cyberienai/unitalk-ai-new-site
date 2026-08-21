'use client'

import { useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AppWindow, ArrowRight, BriefcaseBusiness, Cpu, Server, Wrench } from 'lucide-react'
import { AlmaInline } from '@/components/alma-inline'
import { useLanguage } from '@/lib/language-context'
import type { Lang as SiteLang } from '@/lib/language-context'
import { collaboratorHref, MARKETPLACE_COLLABORATOR_SLUGS, ROLE_DETAILS } from '@/lib/collaborators-catalog'
import { APP_CATEGORY_LABELS, DOMAIN_LABELS, STORE_ITEMS, storeItemHref } from '@/lib/store-catalog'

type Lang = 'fr' | 'en'
type Bi = { fr: string; en: string }
type Category = {
  id: string
  title: Bi
  description: Bi
  heroTitle: Bi
  heroAccent: Bi
  heroLead: Bi
  search: Bi
  action: Bi
  explain: Bi
  missing?: { title: Bi; body: Bi; action: Bi; href: string }
  href: string
  accent: string
}

type MarketplaceItem = {
  key: string
  title: string
  description: string
  href?: string
  addHref?: string
  missionHref?: string
  meta: string
  origin?: string
  creator?: 'unitalk' | 'community'
  avatar?: string
  pending?: boolean
  status?: Bi
  keywords?: string[]
  highlights?: string[]
  highlightsLabel?: string
  score?: number
  starterMission?: string
  starterResult?: string
  identityLabel?: string
  facetKey?: string
  facetKeys?: string[]
  profileKeys?: string[]
  input?: string
  result?: string
  proof?: string
  profileSlug?: string
}

const PAGE_SIZE = 12
const MOBILE_COLLABORATOR_PREVIEW_SIZE = 6

const PROFILE_DEPARTMENTS = [
  { id: 'direction-strategie', label: { fr: 'Direction et stratégie', en: 'Leadership & strategy' }, profiles: ['coordinatrice-missions', 'conseiller-transformation-ia', 'assistante-de-direction', 'responsable-projet', 'chef-projet-digital', 'directeur-general', 'responsable-strategie-veille', 'directeur-commercial'] },
  { id: 'administration', label: { fr: 'Administration', en: 'Administration' }, profiles: ['gestionnaire-administratif', 'responsable-services-generaux', 'gestionnaire-documentaire', 'charge-appels-offres'] },
  { id: 'ventes-avant-vente', label: { fr: 'Ventes et avant-vente', en: 'Sales & pre-sales' }, profiles: ['commercial', 'charge-prospection', 'responsable-comptes-cles', 'ingenieur-affaires', 'responsable-administration-ventes', 'consultant-avant-vente', 'commercial-terrain'] },
  { id: 'relation-reussite-client', label: { fr: 'Relation et réussite client', en: 'Customer relations & success' }, profiles: ['support-client', 'agent-telephonique', 'responsable-relation-client', 'responsable-reussite-client', 'gestionnaire-reclamations', 'responsable-experience-client'] },
  { id: 'marketing-communication', label: { fr: 'Marketing et communication', en: 'Marketing & communications' }, profiles: ['content-strategist', 'responsable-marketing', 'analyste-etudes-qualitatives', 'charge-relations-presse', 'responsable-influence', 'consultant-strategie-digitale', 'responsable-seo', 'gestionnaire-campagnes-publicitaires', 'responsable-acquisition', 'responsable-editorial', 'redacteur-web', 'community-manager', 'responsable-crm', 'analyste-etudes-marche', 'chef-produit-marketing', 'charge-communication'] },
  { id: 'finance-comptabilite', label: { fr: 'Finance et comptabilité', en: 'Finance & accounting' }, profiles: ['analyste-financier', 'directeur-administratif-financier', 'comptable', 'controleur-gestion', 'tresorier-entreprise', 'gestionnaire-facturation-recouvrement', 'auditeur-interne'] },
  { id: 'ressources-humaines', label: { fr: 'Ressources humaines', en: 'Human resources' }, profiles: ['charge-de-recrutement', 'responsable-ressources-humaines', 'gestionnaire-administration-personnel', 'responsable-developpement-rh', 'charge-relations-sociales', 'responsable-qualite-vie-travail'] },
  { id: 'juridique-conformite', label: { fr: 'Juridique et conformité', en: 'Legal & compliance' }, profiles: ['juriste-contrats', 'responsable-conformite', 'delegue-protection-donnees', 'charge-veille-reglementaire', 'responsable-responsabilite-societale'] },
  { id: 'achats-logistique-qualite', label: { fr: 'Achats, logistique et qualité', en: 'Procurement, logistics & quality' }, profiles: ['coordinateur-operations', 'responsable-achats', 'acheteur', 'approvisionneur', 'responsable-logistique', 'responsable-qualite'] },
  { id: 'produit', label: { fr: 'Produit', en: 'Product' }, profiles: ['responsable-produit', 'concepteur-experience-utilisateur'] },
  { id: 'donnees', label: { fr: 'Analyse de données', en: 'Data analysis' }, profiles: ['analyste-donnees', 'responsable-informatique-decisionnelle', 'analyste-web'] },
  { id: 'informatique-developpement', label: { fr: 'Informatique et développement', en: 'IT & development' }, profiles: ['developpeur', 'integrateur-no-code-automatisation', 'webmaster'] },
  { id: 'cybersecurite-qualite-logicielle', label: { fr: 'Cybersécurité et DevOps', en: 'Cybersecurity & DevOps' }, profiles: ['responsable-cybersecurite', 'ingenieur-qualite-logicielle'] },
  { id: 'formation-transformation', label: { fr: 'Formation et transformation', en: 'Training & transformation' }, profiles: ['conseillere-adoption-ia', 'charge-formation', 'formateur-entreprise', 'responsable-conduite-changement', 'responsable-amelioration-processus'] },
] as const

function profileDomainsFor(profileSlugs: string[] = []) {
  return PROFILE_DEPARTMENTS.filter((department) => profileSlugs.some((slug) => (department.profiles as readonly string[]).includes(slug)))
}

const COLLABORATOR_PROFILE_EXAMPLES: Record<string, Bi[]> = {
  emma: [{ fr: 'Gestion administrative', en: 'Administration' }, { fr: 'Coordination de projets', en: 'Project coordination' }, { fr: 'Gestion documentaire', en: 'Document management' }, { fr: 'Organisation des déplacements', en: 'Travel coordination' }, { fr: 'Suivi des échéances', en: 'Deadline tracking' }],
  camille: [{ fr: 'Études de marché', en: 'Market research' }, { fr: 'Analyse concurrentielle', en: 'Competitive analysis' }, { fr: 'Planification stratégique', en: 'Strategic planning' }, { fr: 'Cartographie des risques', en: 'Risk mapping' }, { fr: 'Synthèses exécutives', en: 'Executive summaries' }],
  lea: [{ fr: 'Référencement naturel', en: 'SEO' }, { fr: 'Animation des réseaux sociaux', en: 'Social media management' }, { fr: 'Analyse de performance', en: 'Performance analysis' }, { fr: 'Rédaction web', en: 'Web copywriting' }, { fr: 'Veille éditoriale', en: 'Editorial monitoring' }],
  hugo: [{ fr: 'Préparation d’offres commerciales', en: 'Sales proposal preparation' }, { fr: 'Gestion de comptes', en: 'Account management' }, { fr: 'Suivi des performances commerciales', en: 'Sales performance tracking' }, { fr: 'Analyse concurrentielle', en: 'Competitive analysis' }, { fr: 'Prévision des ventes', en: 'Sales forecasting' }],
  ines: [{ fr: 'Gestion de la base de connaissances', en: 'Knowledge base management' }, { fr: 'Analyse de la satisfaction client', en: 'Customer satisfaction analysis' }, { fr: 'Préparation des rapports de support', en: 'Support reporting' }, { fr: 'Détection des demandes récurrentes', en: 'Recurring request detection' }, { fr: 'Suivi des engagements de service', en: 'Service-level tracking' }],
  arthur: [{ fr: 'DevOps', en: 'DevOps' }, { fr: 'Analyse de données', en: 'Data analysis' }, { fr: 'Documentation technique', en: 'Technical documentation' }, { fr: 'Revue de code', en: 'Code review' }, { fr: 'Surveillance applicative', en: 'Application monitoring' }],
  nadia: [{ fr: 'Prévisions de trésorerie', en: 'Cash flow forecasting' }, { fr: 'Reporting financier', en: 'Financial reporting' }, { fr: 'Contrôle de gestion', en: 'Management control' }, { fr: 'Analyse des écarts budgétaires', en: 'Budget variance analysis' }, { fr: 'Suivi des indicateurs financiers', en: 'Financial KPI tracking' }],
  chloe: [{ fr: 'Opérations RH', en: 'People operations' }, { fr: 'Intégration des salariés', en: 'Employee onboarding' }, { fr: 'Formation', en: 'Training' }, { fr: 'Gestion des entretiens annuels', en: 'Performance review management' }, { fr: 'Suivi des compétences internes', en: 'Workforce skills tracking' }],
  iris: [{ fr: 'Recherche utilisateur', en: 'User research' }, { fr: 'Assurance qualité', en: 'Quality assurance' }, { fr: 'Analyse des retours produit', en: 'Product feedback analysis' }, { fr: 'Priorisation de la roadmap', en: 'Roadmap prioritization' }, { fr: 'Suivi des indicateurs produit', en: 'Product KPI tracking' }],
  lucas: [{ fr: 'Planification opérationnelle', en: 'Operations planning' }, { fr: 'Coordination transverse', en: 'Cross-functional coordination' }, { fr: 'Amélioration des processus', en: 'Process improvement' }, { fr: 'Gestion des risques opérationnels', en: 'Operational risk management' }, { fr: 'Suivi des coûts opérationnels', en: 'Operational cost tracking' }],
  gabriel: [{ fr: 'Sourcing fournisseurs', en: 'Supplier sourcing' }, { fr: 'Gestion des contrats', en: 'Contract management' }, { fr: 'Suivi des renouvellements', en: 'Renewal tracking' }, { fr: 'Analyse des dépenses', en: 'Spend analysis' }, { fr: 'Évaluation des risques fournisseurs', en: 'Supplier risk assessment' }],
  marcus: [{ fr: 'Conformité RGPD', en: 'GDPR compliance' }, { fr: 'Veille réglementaire', en: 'Regulatory monitoring' }, { fr: 'Gestion des politiques internes', en: 'Internal policy management' }, { fr: 'Cartographie des risques', en: 'Risk mapping' }, { fr: 'Préparation des audits', en: 'Audit preparation' }],
}

// Editorial demand order for French SMBs. Unknown future profiles stay at the end.
const PROFILE_DEMAND_ORDER = [
  'charge-prospection',
  'commercial',
  'directeur-commercial',
  'responsable-comptes-cles',
  'commercial-terrain',
  'ingenieur-affaires',
  'consultant-avant-vente',
  'responsable-administration-ventes',
  'gestionnaire-administratif',
  'assistante-de-direction',
  'directeur-general',
  'responsable-strategie-veille',
  'support-client',
  'agent-telephonique',
  'responsable-reussite-client',
  'gestionnaire-reclamations',
  'responsable-experience-client',
  'analyste-financier',
  'directeur-administratif-financier',
  'comptable',
  'controleur-gestion',
  'tresorier-entreprise',
  'gestionnaire-facturation-recouvrement',
  'responsable-relation-client',
  'responsable-marketing',
  'charge-relations-presse',
  'responsable-influence',
  'chef-produit-marketing',
  'charge-communication',
  'responsable-projet',
  'responsable-crm',
  'integrateur-no-code-automatisation',
  'coordinateur-operations',
  'content-strategist',
  'responsable-seo',
  'redacteur-web',
  'community-manager',
  'chef-projet-digital',
  'responsable-editorial',
  'gestionnaire-campagnes-publicitaires',
  'responsable-acquisition',
  'webmaster',
  'analyste-web',
  'analyste-etudes-qualitatives',
  'analyste-etudes-marche',
  'analyste-donnees',
  'charge-de-recrutement',
  'responsable-ressources-humaines',
  'gestionnaire-administration-personnel',
  'responsable-developpement-rh',
  'charge-relations-sociales',
  'responsable-qualite-vie-travail',
  'consultant-strategie-digitale',
  'responsable-produit',
  'concepteur-experience-utilisateur',
  'charge-formation',
  'formateur-entreprise',
  'developpeur',
  'responsable-cybersecurite',
  'ingenieur-qualite-logicielle',
  'responsable-informatique-decisionnelle',
  'responsable-achats',
  'acheteur',
  'approvisionneur',
  'responsable-logistique',
  'responsable-qualite',
  'responsable-services-generaux',
  'gestionnaire-documentaire',
  'charge-appels-offres',
  'juriste-contrats',
  'responsable-conformite',
  'delegue-protection-donnees',
  'charge-veille-reglementaire',
  'responsable-responsabilite-societale',
  'auditeur-interne',
  'responsable-conduite-changement',
  'responsable-amelioration-processus',
  'conseillere-adoption-ia',
  'conseiller-transformation-ia',
  'coordinatrice-missions',
] as const

const PROFILE_DEMAND_RANK = new Map<string, number>(PROFILE_DEMAND_ORDER.map((slug, index) => [slug, index]))
const PROFILE_NAMES = new Map(STORE_ITEMS.filter((item) => item.type === 'profil').map((item) => [item.slug, item.name]))

const MODEL_ITEMS = [
  { key: 'gpt', title: 'GPT', maker: 'OpenAI', meta: 'Texte · Vision · Code', modalities: ['texte', 'raisonnement', 'image', 'audio', 'multimodal'] },
  { key: 'claude', title: 'Claude', maker: 'Anthropic', meta: 'Texte · Analyse · Code', modalities: ['texte', 'raisonnement', 'multimodal'] },
  { key: 'gemini', title: 'Gemini', maker: 'Google', meta: 'Texte · Vision · Multimodal', modalities: ['texte', 'raisonnement', 'image', 'audio', 'video', 'multimodal'] },
  { key: 'mistral', title: 'Mistral', maker: 'Mistral AI', meta: 'Texte · Code · Europe', modalities: ['texte', 'raisonnement', 'open-source'] },
  { key: 'deepseek', title: 'DeepSeek', maker: 'DeepSeek', meta: 'Raisonnement · Code', modalities: ['texte', 'raisonnement', 'open-source'] },
  { key: 'llama', title: 'Llama', maker: 'Meta', meta: 'Open weights · Texte', modalities: ['texte', 'open-source'] },
] as const

const MODEL_MODALITY_LABELS: Record<string, Bi> = {
  texte: { fr: 'Texte', en: 'Text' },
  raisonnement: { fr: 'Raisonnement', en: 'Reasoning' },
  image: { fr: 'Image', en: 'Image' },
  audio: { fr: 'Audio', en: 'Audio' },
  video: { fr: 'Vidéo', en: 'Video' },
  multimodal: { fr: 'Multimodal', en: 'Multimodal' },
  'open-source': { fr: 'Open source', en: 'Open source' },
}

const MODEL_MODALITY_ORDER = ['texte', 'raisonnement', 'multimodal', 'image', 'audio', 'video', 'open-source'] as const

const STORE_CATEGORIES: Category[] = [
  {
    id: 'collaborateurs-ia', title: { fr: 'Collaborateurs IA', en: 'AI Collaborators' },
    description: { fr: 'Personnalisez son identité, puis rattachez votre Collaborateur IA à une personne, une équipe, un département ou toute l’entreprise.', en: 'Personalize their identity, then assign your AI Collaborator to one person, a team, a department or your entire company.' },
    heroTitle: { fr: 'Choisissez le Collaborateur IA qui rejoindra votre équipe.', en: 'Choose the AI Collaborator who will join your team.' },
    heroAccent: { fr: 'qui rejoindra votre équipe.', en: 'who will join your team.' },
    heroLead: { fr: 'Personnalisez son identité, puis faites évoluer ses responsabilités et ses compétences au fil des missions.', en: 'Personalize their identity, then evolve their responsibilities and skills over the course of their missions.' },
    search: { fr: 'Rechercher un Collaborateur IA', en: 'Search AI Collaborators' }, action: { fr: 'Voir son profil', en: 'View profile' }, explain: { fr: 'Comment fonctionne un Collaborateur IA ?', en: 'How does an AI Collaborator work?' },
    href: '/collaborateurs-ia', accent: '#D10E63',
  },
  {
    id: 'profils-metier', title: { fr: 'Profils métier', en: 'Job profiles' },
    description: { fr: 'Un profil métier de référence pour chaque métier de la connaissance.', en: 'One reference job profile for every knowledge-work profession.' },
    heroTitle: { fr: 'Ajoutez gratuitement les profils métier dont votre Collaborateur IA a besoin.', en: 'Add the job profiles your AI Collaborator needs for free.' },
    heroAccent: { fr: 'dont votre Collaborateur IA a besoin.', en: 'your AI Collaborator needs for free.' },
    heroLead: { fr: 'Chaque profil métier est personnalisé pour votre entreprise.', en: 'Each job profile is customized for your organization.' },
    search: { fr: 'Rechercher un profil métier', en: 'Search job profiles' }, action: { fr: 'Découvrir ce profil', en: 'Explore this profile' }, explain: { fr: 'Comprendre les profils métier', en: 'Understand job profiles' },
    missing: { title: { fr: 'Le profil métier dont vous avez besoin manque ?', en: 'Can’t find the job profile you need?' }, body: { fr: 'Décrivez le rôle, les responsabilités et les limites attendues. Alma vous aide à préparer un profil adapté à votre entreprise.', en: 'Describe the expected role, responsibilities and boundaries. Alma helps you prepare a profile tailored to your organization.' }, action: { fr: 'Créer un profil métier', en: 'Create a job profile' }, href: '/decouvrir?source=marketplace&intention=nouveau-profil-metier' },
    href: '/collaborateurs-ia/profils-metier', accent: '#C80B5B',
  },
  {
    id: 'competences', title: { fr: 'Compétences', en: 'Skills' },
    description: { fr: 'Des méthodes précises, documentées, gratuites et réutilisables par vos Collaborateurs IA.', en: 'Precise, documented, free methods that your AI Collaborators can reuse.' },
    heroTitle: { fr: 'Ajoutez gratuitement les compétences nécessaires à chaque mission.', en: 'Add the skills each mission needs for free.' },
    heroAccent: { fr: 'nécessaires à chaque mission.', en: 'each mission needs for free.' },
    heroLead: { fr: 'Chaque compétence est adaptée au profil et aux missions de votre Collaborateur.', en: 'Each skill is tailored to your Collaborator’s profile and missions.' },
    search: { fr: 'Rechercher une compétence', en: 'Search skills' }, action: { fr: 'Ajouter à un Collaborateur IA', en: 'Add to an AI Collaborator' }, explain: { fr: 'Comprendre les compétences', en: 'Understand skills' },
    missing: { title: { fr: 'Une compétence vous manque ?', en: 'Missing a skill?' }, body: { fr: 'Expliquez le savoir-faire attendu. Alma vous aide à le transformer en compétence claire, testable et réutilisable.', en: 'Describe the know-how you need. Alma helps turn it into a clear, testable and reusable skill.' }, action: { fr: 'Créer une compétence', en: 'Create a skill' }, href: '/decouvrir?source=marketplace&intention=nouvelle-competence' },
    href: '/collaborateurs-ia/competences', accent: '#C80B5B',
  },
  {
    id: 'applications', title: { fr: 'Applications', en: 'Applications' },
    description: { fr: 'Les outils, connecteurs et applications métier autorisés.', en: 'Approved tools, connectors and business applications.' },
    heroTitle: { fr: 'Connectez les outils du travail. Choisissez ce qu’il peut y faire.', en: 'Connect the tools for the job. Choose what they can do.' },
    heroAccent: { fr: 'Choisissez ce qu’il peut y faire.', en: 'Choose what they can do.' },
    heroLead: { fr: 'Messagerie, CRM, gestion de projet ou création : attribuez uniquement les applications nécessaires à chaque Collaborateur IA.', en: 'Email, CRM, project management or creation: assign only the applications each AI Collaborator needs.' },
    search: { fr: 'Rechercher une application', en: 'Search applications' }, action: { fr: 'Voir l’application', en: 'View application' }, explain: { fr: 'Comprendre les applications', en: 'Understand applications' },
    missing: { title: { fr: 'Votre application n’est pas encore proposée ?', en: 'Is your application not listed yet?' }, body: { fr: 'Indiquez l’outil à connecter et l’usage visé. Nous vérifions les accès, les actions disponibles et les conditions d’intégration.', en: 'Tell us which tool to connect and the intended use. We review access, available actions and integration requirements.' }, action: { fr: 'Demander une intégration', en: 'Request an integration' }, href: '/decouvrir?source=marketplace&intention=nouvelle-application' },
    href: '/collaborateurs-ia/applications', accent: '#B7501E',
  },
  {
    id: 'modeles-ia', title: { fr: 'Modèles IA', en: 'AI models' },
    description: { fr: 'Les intelligences auxquelles vos Collaborateurs IA peuvent accéder selon leurs droits et leurs missions.', en: 'The intelligences your AI Collaborators can access according to their permissions and missions.' },
    heroTitle: { fr: 'Les modèles IA auxquels vos Collaborateurs ont accès.', en: 'The AI models your Collaborators can access.' },
    heroAccent: { fr: 'vos Collaborateurs ont accès.', en: 'your Collaborators can access.' },
    heroLead: { fr: 'Unitalk sélectionne automatiquement le modèle le plus pertinent pour chaque mission. Vous pouvez voir et contrôler les modèles disponibles pour votre entreprise.', en: 'Unitalk automatically selects the most relevant model for each mission. You can view and control the models available to your company.' },
    search: { fr: 'Rechercher un modèle IA', en: 'Search AI models' }, action: { fr: 'Découvrir le modèle', en: 'Explore model' }, explain: { fr: 'Comprendre les modèles IA', en: 'Understand AI models' },
    missing: { title: { fr: 'Vous souhaitez utiliser un autre modèle IA ?', en: 'Want to use another AI model?' }, body: { fr: 'Partagez le modèle ou le fournisseur souhaité. Nous étudions sa compatibilité, son coût et ses conditions d’accès.', en: 'Share the model or provider you want. We assess compatibility, cost and access requirements.' }, action: { fr: 'Proposer un modèle', en: 'Suggest a model' }, href: '/decouvrir?source=marketplace&intention=nouveau-modele-ia' },
    href: '/modeles-ia', accent: '#1D6692',
  },
  {
    id: 'serveurs-ia', title: { fr: 'Serveurs IA', en: 'AI servers' },
    description: { fr: 'L’infrastructure d’exécution de vos Collaborateurs IA, évolutive selon la charge, la confidentialité et la souveraineté attendues.', en: 'Your AI Collaborators’ execution infrastructure, scalable to your workload, privacy and sovereignty requirements.' },
    heroTitle: { fr: 'Où votre Collaborateur travaille. Une infrastructure qui évolue.', en: 'Where your Collaborator works. Infrastructure that scales.' },
    heroAccent: { fr: 'Une infrastructure qui évolue.', en: 'Infrastructure that scales.' },
    heroLead: { fr: 'Choisissez l’infrastructure qui correspond à vos exigences de puissance, de confidentialité et de souveraineté. Augmentez ses ressources lorsque le travail l’exige.', en: 'Choose infrastructure that matches your performance, privacy and sovereignty requirements. Increase its resources when the work demands it.' },
    search: { fr: 'Rechercher un serveur IA', en: 'Search AI servers' }, action: { fr: 'Voir le serveur', en: 'View server' }, explain: { fr: 'Comprendre les serveurs IA', en: 'Understand AI servers' },
    href: '/collaborateurs-ia/serveurs', accent: '#216641',
  },
]

function itemsForCategory(categoryId: string, lang: Lang): MarketplaceItem[] {
  if (categoryId === 'collaborateurs-ia') {
    return MARKETPLACE_COLLABORATOR_SLUGS.map((slug) => ROLE_DETAILS[slug]).map((detail) => ({
      key: `collaborateur-${detail.slug}`,
      title: detail.name,
      description: detail.promise[lang],
      href: collaboratorHref(detail.slug),
      missionHref: `/decouvrir?q=${encodeURIComponent(detail.starterMission?.mission[lang] ?? detail.missions[0][lang])}&collaborateur=${encodeURIComponent(detail.slug)}&source=marketplace-collaborators`,
      meta: detail.role[lang],
      origin: detail.department[lang],
      avatar: detail.avatar,
      keywords: [...detail.skills.map((skill) => skill[lang]), ...detail.tools, ...detail.missions.map((mission) => mission[lang])],
      highlights: (COLLABORATOR_PROFILE_EXAMPLES[detail.slug] ?? []).map((profile) => profile[lang]),
      highlightsLabel: lang === 'fr' ? 'Profils métier à ajouter' : 'Job profiles to add',
      starterMission: detail.starterMission?.mission[lang],
      starterResult: detail.starterMission?.result[lang],
      identityLabel: lang === 'fr' ? (detail.gender === 'female' ? 'Collaboratrice IA' : 'Collaborateur IA') : 'AI Collaborator',
    }))
  }

  const storeType = categoryId === 'profils-metier' ? 'profil' : categoryId === 'competences' ? 'competence' : null
  if (storeType) {
    const items = STORE_ITEMS.filter((item) => item.type === storeType)
    if (storeType === 'profil') items.sort((a, b) => (PROFILE_DEMAND_RANK.get(a.slug) ?? Number.MAX_SAFE_INTEGER) - (PROFILE_DEMAND_RANK.get(b.slug) ?? Number.MAX_SAFE_INTEGER))
    return items.map((item) => ({
      key: `${item.type}-${item.slug}`, title: item.name[lang], description: item.description[lang], addHref: `/decouvrir?store=${item.slug}`,
      meta: storeType === 'profil' ? (DOMAIN_LABELS[item.facet]?.[lang] ?? item.facet) : (profileDomainsFor(item.relatedProfiles)[0]?.label[lang] ?? item.facet),
      origin: item.creator === 'unitalk' ? 'Unitalk' : lang === 'fr' ? 'Communauté' : 'Community', creator: item.creator,
      highlights: storeType === 'competence' ? undefined : (item.knowHow ?? item.enables ?? item.produces)?.slice(0, 2).map((value) => value[lang]),
      highlightsLabel: storeType === 'profil' ? (lang === 'fr' ? 'Savoir-faire' : 'Know-how') : (lang === 'fr' ? 'Ce qu’elle permet' : 'What it enables'),
      status: storeType === 'competence' ? { fr: 'Gratuite', en: 'Free' } : item.commercialStatus === 'paid' ? { fr: 'Licence requise', en: 'License required' } : { fr: 'Inclus selon votre offre', en: 'Included depending on your plan' },
      facetKey: item.facet,
      facetKeys: storeType === 'competence' ? profileDomainsFor(item.relatedProfiles).map((domain) => domain.id) : undefined,
      starterMission: storeType === 'profil' ? item.exampleMissions?.[0]?.[lang] : undefined,
      profileKeys: item.relatedProfiles,
      input: storeType === 'competence' ? item.contexts?.[0]?.[lang] : undefined,
      result: storeType === 'competence' ? item.produces?.[0]?.[lang] : undefined,
      proof: storeType === 'competence' ? (item.version ? `Version ${item.version} · ${lang === 'fr' ? 'à valider sur votre cas' : 'validate on your use case'}` : lang === 'fr' ? 'Méthode à valider sur votre cas' : 'Method to validate on your use case') : undefined,
      profileSlug: storeType === 'profil' ? item.slug : undefined,
    }))
  }
  if (categoryId === 'applications') {
    return STORE_ITEMS.filter((item) => item.type === 'application' || item.type === 'integration').map((item) => ({
      key: `${item.type}-${item.slug}`, title: item.name[lang], description: item.description[lang], href: storeItemHref(item),
      meta: item.editor ?? (item.type === 'integration' ? (lang === 'fr' ? 'Intégration' : 'Integration') : item.facet),
      origin: item.creator === 'unitalk' ? 'Unitalk' : lang === 'fr' ? 'Communauté' : 'Community', pending: item.commercialStatus === 'draft',
      status: item.commercialStatus === 'draft' ? { fr: 'Bientôt disponible', en: 'Coming soon' } : item.commercialStatus === 'paid' ? { fr: 'Licence requise', en: 'License required' } : { fr: 'Connectable', en: 'Connectable' }, facetKey: item.facet, input: item.uses?.[0]?.[lang] ?? item.contexts?.[0]?.[lang], result: item.actions?.[0]?.[lang] ?? item.produces?.[0]?.[lang],
    }))
  }
  if (categoryId === 'modeles-ia') {
    return MODEL_ITEMS.map((item) => ({
      key: item.key, title: item.title,
      description: lang === 'fr' ? `Famille de modèles ${item.maker}, disponible selon les droits, les clés et la configuration AI Gateway.` : `${item.maker} model family, available according to permissions, keys and AI Gateway configuration.`,
      href: '/modeles-ia', meta: item.meta, origin: item.maker, facetKeys: [...item.modalities], status: { fr: 'Selon votre fournisseur', en: 'Via your provider' }, input: lang === 'fr' ? 'Sélection automatique selon la mission' : 'Automatic selection for each mission', result: lang === 'fr' ? 'Accès contrôlé par votre entreprise' : 'Access controlled by your organization',
    }))
  }
  if (categoryId === 'serveurs-ia') {
    return STORE_ITEMS.filter((item) => item.type === 'server').map((item) => ({
      key: `${item.type}-${item.slug}`, title: item.name[lang], description: item.description[lang], href: storeItemHref(item),
      meta: lang === 'fr' ? 'Infrastructure privée' : 'Private infrastructure', origin: 'Unitalk', pending: item.commercialStatus === 'draft',
      status: item.commercialStatus === 'draft' ? { fr: 'Sur demande', en: 'On request' } : { fr: 'Provisionnable', en: 'Provisionable' }, facetKey: item.facet, input: item.contexts?.[0]?.[lang], result: item.enables?.[0]?.[lang],
    }))
  }
  return []
}

const COPY = {
  fr: {
    noResults: 'Aucune création ne correspond à cette recherche.', showMore: 'Voir tout le catalogue', showLess: 'Revenir à la sélection',
    emptyTitle: 'Catalogue en préparation', emptyBody: 'Cette catégorie est définie dans l’architecture Unitalk. Ses premières créations publiables seront ajoutées ici.',
    clear: 'Effacer les filtres', available: 'Disponible', preparation: 'Bientôt disponible', addProfile: 'Ajouter à un Collaborateur IA',
    result: 'résultat', results: 'résultats', almaTitle: 'Une mission en tête ? Alma prépare le bon Collaborateur.', almaBody: 'Décrivez le résultat attendu. Alma vous aide à choisir l’identité, les compétences, les sources autorisées et les validations humaines nécessaires.', almaAction: 'Confier une première mission', almaFinalAction: 'Préparer mon Collaborateur avec Alma',
    heroProofs: ['Première mission gratuite', 'Sans carte bancaire'],
    profileHeroProofs: ['Profils métier gratuits', 'Plusieurs profils par Collaborateur'],
    skillHeroProofs: ['Compétences gratuites', 'Méthodes documentées', 'Réutilisables par mission'],
    applicationHeroProofs: ['Accès gouvernés', 'Actions configurables', 'Connexions selon vos droits'],
    modelHeroProofs: ['Sélection automatique', 'Fournisseurs contrôlés', 'Modèles interchangeables'],
    serverHeroProofs: ['Infrastructure privée', 'Capacité évolutive', 'Déploiement gouverné'],
    showAllCollaborators: 'Voir les Collaborateurs IA',
    showMoreProfiles: 'Afficher 12 profils supplémentaires',
    creators: 'Créateur', allCreators: 'Tous', community: 'Communauté',
    departments: 'Départements', allDepartments: 'Tous les profils', profileCount: 'profils prêts à adapter', profileResult: 'profil', profileResults: 'profils', firstMission: 'Exemple de mission',
    skillCategories: 'Catégories de compétences', applicationCategories: 'Catégories d’applications', modelCategories: 'Modalités des modèles', serverCategories: 'Types d’infrastructure', allItems: 'Tout le catalogue',
  },
  en: {
    noResults: 'No item matches this search.', showMore: 'View the full catalog', showLess: 'Back to the selection',
    emptyTitle: 'Catalog in preparation', emptyBody: 'This category is defined in the Unitalk architecture. Its first publishable creations will be added here.',
    clear: 'Clear filters', available: 'Available', preparation: 'Coming soon', addProfile: 'Add to an AI Collaborator',
    result: 'result', results: 'results', almaTitle: 'A mission in mind? Alma prepares the right Collaborator.', almaBody: 'Describe the expected outcome. Alma helps you choose the identity, skills, authorized sources and required human approvals.', almaAction: 'Describe my first mission', almaFinalAction: 'Prepare my Collaborator with Alma',
    heroProofs: ['First mission free', 'No credit card'],
    profileHeroProofs: ['Free job profiles', 'Multiple profiles per Collaborator', 'Customizable methods and permissions'],
    skillHeroProofs: ['Free skills', 'Documented methods', 'Reusable across missions'],
    applicationHeroProofs: ['Governed access', 'Configurable actions', 'Connections based on permissions'],
    modelHeroProofs: ['Automatic selection', 'Controlled providers', 'Interchangeable models'],
    serverHeroProofs: ['Private infrastructure', 'Scalable capacity', 'Governed deployment'],
    showAllCollaborators: 'View AI Collaborators',
    showMoreProfiles: 'Show 12 more profiles',
    creators: 'Creator', allCreators: 'All', community: 'Community',
    departments: 'Departments', allDepartments: 'All profiles', profileCount: 'profiles ready to adapt', profileResult: 'profile', profileResults: 'profiles', firstMission: 'Mission example',
    skillCategories: 'Skill categories', applicationCategories: 'Application categories', modelCategories: 'Model modalities', serverCategories: 'Infrastructure types', allItems: 'Full catalog',
  },
} as const

function normalizeSearch(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

function scrollToStoreHero() {
  requestAnimationFrame(() => document.getElementById('marketplace-store-hero')?.scrollIntoView({
    block: 'start',
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
  }))
}

export function UnitalkStoreHub({ collaboratorsOnly = false, fixedLang, initialCategoryId }: { collaboratorsOnly?: boolean; fixedLang?: SiteLang; initialCategoryId?: string }) {
  const { lang: selectedLang } = useLanguage()
  const lang = fixedLang ?? selectedLang
  const t = COPY[lang]
  const initialCategory = STORE_CATEGORIES.some((category) => category.id === initialCategoryId) ? initialCategoryId! : STORE_CATEGORIES[0].id
  const [activeCategoryId, setActiveCategoryId] = useState(initialCategory)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [catalogQuery, setCatalogQuery] = useState('')
  const [skillCategory, setSkillCategory] = useState('')
  const [skillProfile, setSkillProfile] = useState('')
  const [profileDepartment, setProfileDepartment] = useState('')
  const [profileCreator, setProfileCreator] = useState('')
  const [catalogFacet, setCatalogFacet] = useState('')
  const [showAllCollaborators, setShowAllCollaborators] = useState(false)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const visibleCategories = collaboratorsOnly ? STORE_CATEGORIES.slice(0, 1) : STORE_CATEGORIES
  const navigationCategories = collaboratorsOnly ? STORE_CATEGORIES : visibleCategories
  const activeCategory = STORE_CATEGORIES.find((category) => category.id === activeCategoryId) ?? STORE_CATEGORIES[0]
  const isCollaboratorsLanding = collaboratorsOnly && activeCategory.id === 'collaborateurs-ia'
  const isProfilesCategory = activeCategory.id === 'profils-metier'
  const usesCatalogSidebar = ['competences', 'applications', 'modeles-ia', 'serveurs-ia'].includes(activeCategory.id)
  const usesFeaturedHero = isCollaboratorsLanding || ['profils-metier', 'competences', 'applications', 'modeles-ia', 'serveurs-ia'].includes(activeCategory.id)
  const featuredHeroProofs = isProfilesCategory
    ? t.profileHeroProofs
    : activeCategory.id === 'competences'
      ? t.skillHeroProofs
      : activeCategory.id === 'applications'
        ? t.applicationHeroProofs
        : activeCategory.id === 'modeles-ia'
          ? t.modelHeroProofs
          : activeCategory.id === 'serveurs-ia'
            ? t.serverHeroProofs
            : t.heroProofs
  const categoryItems = useMemo(() => itemsForCategory(activeCategory.id, lang), [activeCategory.id, lang])
  const profileDepartments = useMemo(() => PROFILE_DEPARTMENTS.map((department) => ({
    ...department,
    count: categoryItems.filter((item) => item.profileSlug && (department.profiles as readonly string[]).includes(item.profileSlug)).length,
  })).filter((department) => department.count > 0), [categoryItems])
  const profileCategoryTotal = profileDepartments.reduce((total, department) => total + department.count, 0)
  const filteredItems = useMemo(() => {
    const query = normalizeSearch(catalogQuery.trim())
    const department = PROFILE_DEPARTMENTS.find((item) => item.id === profileDepartment)
    const scopedItems = activeCategory.id === 'competences'
      ? categoryItems.filter((item) => (!catalogFacet || item.facetKeys?.includes(catalogFacet)) && (!skillCategory || item.facetKeys?.includes(skillCategory)) && (!skillProfile || item.profileKeys?.includes(skillProfile)))
      : isProfilesCategory && department
        ? categoryItems.filter((item) => item.profileSlug && (department.profiles as readonly string[]).includes(item.profileSlug) && (!profileCreator || item.creator === profileCreator))
        : isProfilesCategory && profileCreator
          ? categoryItems.filter((item) => item.creator === profileCreator)
        : usesCatalogSidebar && catalogFacet
          ? categoryItems.filter((item) => item.facetKey === catalogFacet || item.facetKeys?.includes(catalogFacet))
        : categoryItems
    if (!query) return scopedItems
    const tokens = query.split(/\s+/)
    const matches: MarketplaceItem[] = []
    for (const item of scopedItems) {
      const fields = [item.title, item.meta, item.origin ?? '', ...(item.keywords ?? []), ...(item.highlights ?? []), item.description].map(normalizeSearch)
      if (!tokens.every((token) => fields.some((field) => field.includes(token)))) continue
      const points = tokens.reduce((total, token) => total + (fields[0].includes(token) ? 40 : 0) + (fields[1].includes(token) ? 25 : 0) + (fields[2].includes(token) ? 15 : 0) + (fields.slice(3, -1).some((field) => field.includes(token)) ? 15 : 0) + (fields.at(-1)?.includes(token) ? 5 : 0), 0)
      matches.push({ ...item, score: Math.min(99, Math.round(points / tokens.length)) })
    }
    return matches.sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
  }, [activeCategory.id, catalogFacet, catalogQuery, categoryItems, isProfilesCategory, profileCreator, profileDepartment, skillCategory, skillProfile, usesCatalogSidebar])
  const visibleItems = filteredItems.slice(0, visibleCount)
  const catalogIntro = activeCategory.id === 'modeles-ia'
        ? { eyebrow: lang === 'fr' ? 'Intelligences disponibles' : 'Available intelligence', title: lang === 'fr' ? 'Le bon modèle est sélectionné pour chaque travail.' : 'The right model is selected for each task.', body: lang === 'fr' ? 'Comparez les familles disponibles. Votre entreprise contrôle les fournisseurs autorisés, les clés, les budgets et les modalités accessibles.' : 'Compare available model families. Your organization controls approved providers, keys, budgets and modalities.', note: lang === 'fr' ? `${categoryItems.length} familles de modèles` : `${categoryItems.length} model families` }
        : activeCategory.id === 'serveurs-ia'
          ? { eyebrow: lang === 'fr' ? 'Infrastructure d’exécution' : 'Execution infrastructure', title: lang === 'fr' ? 'Dimensionnez un environnement adapté au travail.' : 'Size an environment for the work ahead.', body: lang === 'fr' ? 'Comparez les niveaux de capacité, de confidentialité et de souveraineté avant de choisir votre infrastructure.' : 'Compare capacity, privacy and sovereignty levels before choosing your infrastructure.', note: lang === 'fr' ? `${categoryItems.length} options d’infrastructure` : `${categoryItems.length} infrastructure options` }
          : null
  function clearFilters() {
    setCatalogQuery('')
    setSkillCategory('')
    setSkillProfile('')
    setProfileDepartment('')
    setProfileCreator('')
    setCatalogFacet('')
    setVisibleCount(PAGE_SIZE)
  }

  useLayoutEffect(() => {
    const selectFromLocation = (scroll = false) => {
      const categoryId = collaboratorsOnly ? 'collaborateurs-ia' : window.location.hash.slice(1) || initialCategoryId || (window.location.pathname === '/marketplace/collaborateurs-ia' ? 'collaborateurs-ia' : '')
      if (STORE_CATEGORIES.some((category) => category.id === categoryId)) {
        setActiveCategoryId(categoryId)
        setVisibleCount(PAGE_SIZE)
        setCatalogQuery('')
        setSkillCategory('')
        setSkillProfile('')
        setProfileDepartment('')
        setProfileCreator('')
        setCatalogFacet('')
        requestAnimationFrame(() => {
          document.getElementById(`marketplace-tab-${categoryId}`)?.scrollIntoView({ behavior: scroll && !window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'smooth' : 'auto', block: 'nearest', inline: 'center' })
          if (scroll) scrollToStoreHero()
        })
      }
    }
    selectFromLocation()
    const handleLocationChange = () => selectFromLocation(true)
    window.addEventListener('hashchange', handleLocationChange)
    window.addEventListener('popstate', handleLocationChange)
    return () => {
      window.removeEventListener('hashchange', handleLocationChange)
      window.removeEventListener('popstate', handleLocationChange)
    }
  }, [collaboratorsOnly, initialCategoryId])

  function selectCategory(categoryId: string, scroll = true) {
    if (!visibleCategories.some((category) => category.id === categoryId)) return
    setActiveCategoryId(categoryId)
    setVisibleCount(PAGE_SIZE)
    setCatalogQuery('')
    setSkillCategory('')
    setSkillProfile('')
    setProfileDepartment('')
    setProfileCreator('')
    setCatalogFacet('')
    const href = `/marketplace/${categoryId}`
    window.history.replaceState(null, '', href)
    if (scroll) scrollToStoreHero()
    requestAnimationFrame(() => document.getElementById(`marketplace-tab-${categoryId}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' }))
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = visibleCategories.length - 1
    const next = event.key === 'ArrowRight' ? (index === last ? 0 : index + 1) : event.key === 'ArrowLeft' ? (index === 0 ? last : index - 1) : event.key === 'Home' ? 0 : event.key === 'End' ? last : null
    if (next === null) return
    event.preventDefault()
    selectCategory(visibleCategories[next].id, false)
    tabRefs.current[next]?.focus()
  }

  return (
    <main className="min-h-screen overflow-x-clip bg-[#F3EFE6] font-sf text-[#1C1A17]">
      <section id="marketplace-store-hero" className={`relative scroll-mt-[76px] overflow-hidden border-b border-[#D8CEBE] bg-[#EAE3D4] px-5 pt-28 sm:px-8 sm:pt-40 [@media(min-width:1024px)_and_(max-height:850px)]:pt-32 ${usesFeaturedHero ? 'pb-7 sm:pb-10 [@media(min-width:1024px)_and_(max-height:850px)]:pb-8' : 'pb-9 sm:pb-11 [@media(min-width:1024px)_and_(max-height:850px)]:pb-9'}`}>
         {usesFeaturedHero && <><div aria-hidden className="pointer-events-none absolute -right-24 top-10 size-72 rounded-full border border-[#D10E63]/15 sm:right-[8%] sm:size-96"/><div aria-hidden className="pointer-events-none absolute -right-8 top-24 size-40 rounded-full bg-[#D10E63]/[.045] blur-2xl sm:right-[16%] sm:size-56"/></>}
         <div className="relative mx-auto w-full max-w-6xl">
           <div>
             <h1 className={`max-w-6xl text-[clamp(2.35rem,5vw,5rem)] font-semibold leading-[.9] tracking-[-.064em] text-balance [@media(min-width:1024px)_and_(max-height:850px)]:text-[clamp(2.8rem,4.4vw,4rem)] ${activeCategory.id === 'competences' ? 'lg:whitespace-nowrap' : ''}`}>{activeCategory.heroTitle[lang].slice(0, -activeCategory.heroAccent[lang].length)}<span className="text-[#D10E63] lg:block">{activeCategory.heroAccent[lang]}</span></h1>
             <div className={usesFeaturedHero ? 'mt-5 grid gap-4 sm:mt-7 sm:gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-10' : ''}>
                <div><p className={`${usesFeaturedHero ? 'max-w-3xl' : 'mt-5 max-w-3xl sm:mt-6 lg:pr-8'} whitespace-pre-line text-pretty text-[15px] font-medium leading-6 text-[#322E29] sm:text-[16px] sm:font-normal sm:leading-7 sm:text-[#4E483F] ${isCollaboratorsLanding ? 'xl:max-w-none xl:whitespace-nowrap' : ''} [@media(min-width:1024px)_and_(max-height:850px)]:mt-4`}>{activeCategory.heroLead[lang]}</p>{isCollaboratorsLanding && <Link href="/decouvrir?source=marketplace-collaborators-hero" className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#D10E63] px-7 text-sm font-bold text-white outline-none transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-[#B00C54] focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EAE3D4]">{t.almaAction}<ArrowRight className="size-4" /></Link>}</div>
                 {usesFeaturedHero && <ul className={`flex gap-2 overflow-x-auto pb-1 text-[11px] font-bold text-[#322E29] scrollbar-hide sm:flex-wrap sm:pb-0 sm:text-[12px] sm:text-[#4E483F] lg:justify-end ${activeCategory.id === 'competences' ? 'lg:max-w-none lg:flex-nowrap' : 'lg:max-w-[28rem]'}`}>{featuredHeroProofs.map((proof) => <li key={proof} className="flex min-h-9 shrink-0 items-center gap-2 rounded-full border border-[#BEB2A1] bg-[#FAF8F3] px-3 shadow-[0_1px_0_rgba(28,26,23,.04)] sm:min-h-8 sm:border-[#CFC3B2] sm:bg-[#F3EFE6]/70 sm:shadow-none sm:backdrop-blur-sm"><span aria-hidden className="size-1.5 rounded-full bg-[#D10E63]"/>{proof}</li>)}</ul>}
            </div>
           </div>
         </div>
       </section>

      <div id="marketplace-category-tabs" className="sticky top-[76px] z-30 scroll-mt-[76px] border-y border-white/10 bg-[#211E1B]/95 px-5 text-white shadow-[0_10px_30px_-24px_rgba(0,0,0,.8)] backdrop-blur-md sm:px-8">
        <div className="mx-auto flex w-full max-w-6xl overflow-x-auto scrollbar-hide" role={collaboratorsOnly ? undefined : 'tablist'} aria-label={lang === 'fr' ? 'Catégories de la marketplace' : 'Marketplace categories'}>
            {navigationCategories.map((category, index) => {
              const active = activeCategory.id === category.id
               const className = `relative flex h-14 shrink-0 items-center px-4 text-[13px] font-semibold outline-none transition-colors first:pl-0 focus-visible:ring-2 focus-visible:ring-[#F2A4C5] focus-visible:ring-inset sm:h-16 sm:px-5 sm:text-sm ${active ? 'text-[#F15B9B]' : 'text-[#BEB4A8] hover:text-white'}`
               const label = <><span>{category.title[lang]}</span><span className={`absolute inset-x-4 bottom-0 h-[3px] bg-[#D10E63] transition-transform first:left-0 ${active ? 'scale-x-100' : 'scale-x-0'}`} /></>
               return collaboratorsOnly
                 ? <Link key={category.id} id={`marketplace-tab-${category.id}`} href={`/marketplace/${category.id}`} aria-current={active ? 'page' : undefined} className={className}>{label}</Link>
                 : <button ref={(node) => { tabRefs.current[index] = node }} key={category.id} id={`marketplace-tab-${category.id}`} type="button" role="tab" tabIndex={active ? 0 : -1} aria-selected={active} aria-controls="marketplace-results" onKeyDown={(event) => handleTabKeyDown(event, index)} onClick={() => selectCategory(category.id)} className={className}>{label}</button>
              })}
        </div>
      </div>

      <section id="categories" className={`scroll-mt-36 px-5 sm:px-8 ${collaboratorsOnly ? 'pb-20 pt-6 sm:pb-24 sm:pt-8 lg:pb-28 [@media(min-width:1024px)_and_(max-height:850px)]:pt-6' : 'pb-20 pt-7 sm:pt-9 lg:pb-24 [@media(min-width:1024px)_and_(max-height:850px)]:pt-7'}`}>
        <div className="mx-auto w-full max-w-6xl">
             <div id="marketplace-results" role={collaboratorsOnly ? 'region' : 'tabpanel'} aria-labelledby={`marketplace-tab-${activeCategory.id}`} className="scroll-mt-[184px]">
                     {isProfilesCategory && <ProfilesMarketplaceCatalog items={filteredItems} categoryTotal={profileCategoryTotal} creatorCounts={{ unitalk: categoryItems.filter(item => item.creator === 'unitalk').length, community: categoryItems.filter(item => item.creator === 'community').length }} departments={profileDepartments} activeDepartment={profileDepartment} onDepartment={(department) => { setProfileDepartment(department); setVisibleCount(PAGE_SIZE) }} activeCreator={profileCreator} onCreator={(creator) => { setProfileCreator(creator); setVisibleCount(PAGE_SIZE) }} query={catalogQuery} onQuery={(query) => { setCatalogQuery(query); setVisibleCount(PAGE_SIZE) }} visibleCount={visibleCount} onShowMore={() => setVisibleCount(count => Math.min(count + PAGE_SIZE, filteredItems.length))} lang={lang} category={activeCategory} labels={{ departments: t.departments, allDepartments: t.allDepartments, profileResult: t.profileResult, profileResults: t.profileResults, firstMission: t.firstMission, addProfile: t.addProfile, clear: t.clear, showMore: t.showMoreProfiles, creators: t.creators, allCreators: t.allCreators, community: t.community }} />}
                     {usesCatalogSidebar && <>{catalogIntro && <section className="mb-7 grid gap-5 border-b border-[#D8D0C2] pb-7 sm:mb-9 sm:pb-9 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end"><div><p className="font-mono text-[9px] font-black uppercase tracking-[.16em]" style={{ color: activeCategory.accent }}>{catalogIntro.eyebrow}</p><h2 className="mt-3 max-w-3xl text-[clamp(1.8rem,3vw,2.8rem)] font-semibold leading-[1.02] tracking-[-.045em]">{catalogIntro.title}</h2><p className="mt-4 max-w-3xl text-sm leading-7 text-[#625B50]">{catalogIntro.body}</p></div><p className="w-fit rounded-full border border-[#CFC5B5] bg-[#FAF8F3] px-4 py-2 text-xs font-bold text-[#3F3A33]">{catalogIntro.note}</p></section>}<MarketplaceSidebarCatalog items={filteredItems} allItems={categoryItems} activeFacet={catalogFacet} onFacet={(facet) => { setCatalogFacet(facet); setVisibleCount(PAGE_SIZE) }} query={catalogQuery} onQuery={(query) => { setCatalogQuery(query); setVisibleCount(PAGE_SIZE) }} visibleCount={visibleCount} onShowMore={() => setVisibleCount(count => Math.min(count + PAGE_SIZE, filteredItems.length))} lang={lang} category={activeCategory} labels={{ clear: t.clear, allItems: t.allItems, skillCategories: t.skillCategories, applicationCategories: t.applicationCategories, modelCategories: t.modelCategories, serverCategories: t.serverCategories, result: t.result, results: t.results, available: t.available, preparation: t.preparation, addProfile: t.addProfile, showMore: t.showMore }} /></>}
                    {!isCollaboratorsLanding && !isProfilesCategory && !usesCatalogSidebar && <div className="mb-5 sm:mb-6"><h2 className="text-[28px] font-semibold tracking-[-.04em] sm:text-[34px]">{activeCategory.title[lang]}</h2><p className="mt-2 max-w-4xl text-sm leading-6 text-[#625B50]">{activeCategory.description[lang]}</p>{activeCategory.id === 'serveurs-ia' && <Link href="/collaborateurs-ia/serveurs" className="mt-5 inline-flex min-h-10 items-center border-b border-[#216641] text-xs font-bold text-[#216641]">{lang === 'fr' ? 'Voir les options d’infrastructure' : 'View infrastructure options'}<span aria-hidden className="ml-2">→</span></Link>}</div>}
                       {isCollaboratorsLanding && <div className="mb-6 grid gap-5 border-b border-[#D8D0C2] pb-6 sm:mb-8 sm:pb-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-8"><h2 className="text-[clamp(1.8rem,2.3vw,2.05rem)] font-semibold leading-[1.02] tracking-[-.045em] xl:whitespace-nowrap">{lang === 'fr' ? 'Découvrez votre futur Collaborateur IA.' : 'Discover your future AI Collaborator.'}</h2><div className="w-fit border-l-2 border-[#D10E63] py-1 pl-4 lg:text-right"><p className="text-sm font-bold text-[#1C1A17]">{lang === 'fr' ? 'Dès 49 €/mois par Collaborateur IA' : 'From €49/month per AI Collaborator'}</p><p className="mt-1 text-[10px] font-semibold text-[#766D61]">{lang === 'fr' ? 'Sans engagement · Consommation des modèles d’IA facturée séparément' : 'No commitment · AI model usage billed separately'}</p></div></div>}
                   {categoryItems.length > 0 && !isCollaboratorsLanding && !isProfilesCategory && !usesCatalogSidebar && <div className="flex flex-col gap-3"><div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">{activeCategory.id !== 'collaborateurs-ia' && <label className="relative block w-full max-w-md"><span className="sr-only">{activeCategory.search[lang]}</span><input type="search" value={catalogQuery} onChange={(event) => { setCatalogQuery(event.target.value); setVisibleCount(PAGE_SIZE) }} placeholder={activeCategory.search[lang]} className="h-12 w-full rounded-full border border-[#CFC5B5] bg-[#FAF8F3] px-5 pr-12 text-sm outline-none transition-[border-color,box-shadow,background-color] placeholder:text-[#857C6E] focus:border-[var(--search-accent)] focus:bg-white focus:ring-4 focus:ring-[#1C1A17]/[.05]" style={{ '--search-accent': activeCategory.accent } as CSSProperties} />{catalogQuery && <button type="button" onClick={() => setCatalogQuery('')} aria-label={t.clear} className="absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-lg text-[#625B50] outline-none hover:bg-[#EAE3D4] focus-visible:ring-2 focus-visible:ring-[#D10E63]">×</button>}</label>}<Link href={activeCategory.href} className="inline-flex w-fit shrink-0 items-center border-b border-[#857C6E] pb-1 text-xs font-bold text-[#625B50] outline-none hover:text-[#1C1A17] focus-visible:ring-2 focus-visible:ring-[#D10E63] lg:ml-auto">{activeCategory.explain[lang]}<span aria-hidden="true" className="ml-3">↗</span></Link></div></div>}
                  {!isProfilesCategory && !usesCatalogSidebar && <p className="sr-only" aria-live="polite">{filteredItems.length} {filteredItems.length === 1 ? t.result : t.results}</p>}

                {!isProfilesCategory && !usesCatalogSidebar && (visibleItems.length > 0 ? <div className="mt-4 grid auto-rows-fr gap-3 sm:mt-5 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">{visibleItems.map((item, index) => <MarketplaceItemCard key={item.key} item={item} lang={lang} category={activeCategory} mobileHidden={isCollaboratorsLanding && !showAllCollaborators && index >= MOBILE_COLLABORATOR_PREVIEW_SIZE} featuredLast={isCollaboratorsLanding && visibleItems.length % 3 === 1 && index === visibleItems.length - 1} labels={{ details: activeCategory.action[lang], available: t.available, preparation: t.preparation, addProfile: t.addProfile }} />)}{activeCategory.missing && <MissingItemCard content={activeCategory.missing} lang={lang} accent={activeCategory.accent} />}</div> : categoryItems.length > 0 ? <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3"><div className="rounded-2xl border border-dashed border-[#CFC5B5] bg-[#FAF8F3] p-8 md:col-span-2"><h3 className="text-xl font-bold">{t.noResults}</h3><button type="button" onClick={clearFilters} className="mt-4 text-sm font-bold text-[#B00C54] underline underline-offset-4">{t.clear}</button></div>{activeCategory.missing && <MissingItemCard content={activeCategory.missing} lang={lang} accent={activeCategory.accent} />}</div> : <div className="mt-5 rounded-2xl border border-[#D8D0C2] bg-[#FAF8F3] p-8"><h3 className="text-2xl font-bold">{t.emptyTitle}</h3><p className="mt-3 max-w-xl text-sm leading-7 text-[#625B50]">{t.emptyBody}</p></div>)}
                 {isCollaboratorsLanding && !showAllCollaborators && <button type="button" onClick={() => setShowAllCollaborators(true)} className="mx-auto mt-6 flex min-h-12 w-full max-w-sm items-center justify-center rounded-full border border-[#1C1A17] px-5 text-sm font-bold outline-none transition-colors hover:bg-[#181615] hover:text-white focus-visible:ring-2 focus-visible:ring-[#D10E63] sm:hidden">{t.showAllCollaborators}<span aria-hidden className="ml-2">↓</span></button>}
                 {isCollaboratorsLanding && <div className="mt-10 border-y border-[#D8D0C2] py-6 text-center"><p className="text-sm font-semibold text-[#4E483F]">{lang === 'fr' ? 'Vous souhaitez comprendre son identité, sa mémoire et ses droits ?' : 'Want to understand its identity, memory and permissions?'}</p><Link href={activeCategory.href} className="mt-2 inline-flex min-h-9 items-center text-sm font-bold text-[#B00C54] underline decoration-[#D10E63]/35 underline-offset-4 outline-none transition-colors hover:text-[#1C1A17] focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-4">{lang === 'fr' ? 'Découvrir le fonctionnement d’un Collaborateur IA' : 'Discover how an AI Collaborator works'}<span aria-hidden className="ml-2">→</span></Link></div>}
                 {activeCategory.id !== 'collaborateurs-ia' && !isProfilesCategory && !usesCatalogSidebar && filteredItems.length > PAGE_SIZE && <div className="mt-9 text-center"><button type="button" onClick={() => setVisibleCount((count) => count >= filteredItems.length ? PAGE_SIZE : filteredItems.length)} className="inline-flex min-h-12 items-center rounded-full bg-[#181615] px-7 text-sm font-bold text-white transition-colors hover:bg-[#332F29]">{visibleCount >= filteredItems.length ? t.showLess : t.showMore}</button></div>}
                     {activeCategory.id === 'collaborateurs-ia' && <section className="mt-10 rounded-[24px] bg-[#181615] p-7 text-white sm:p-9"><h3 className="max-w-5xl text-[clamp(2rem,4vw,3.75rem)] font-semibold leading-[.98] tracking-[-.05em]">{lang === 'fr' ? <>Une mission en tête ? <span className="lg:whitespace-nowrap"><AlmaInline className="mr-2 !size-[.9em] align-[-.12em] ring-2 ring-white/30" />Alma prépare le bon Collaborateur.</span></> : <>A mission in mind? <span className="lg:whitespace-nowrap"><AlmaInline className="mr-2 !size-[.9em] align-[-.12em] ring-2 ring-white/30" />Alma prepares the right Collaborator.</span></>}</h3><div className="mt-5 grid gap-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-10"><div><p className="max-w-2xl text-[15px] leading-7 text-[#CFC6B8]">{withAlmaAvatar(t.almaBody)}</p><p className="mt-5 text-xs font-semibold leading-5 text-[#F2A4C5]">{lang === 'fr' ? 'Première mission gratuite · Sans carte bancaire · Sans engagement' : 'First mission free · No credit card · No commitment'}</p><p className="mt-3 text-xs leading-5 text-[#AFA397]">{lang === 'fr' ? 'Puis à partir de 49 €/mois par Collaborateur IA, auxquels s’ajoute la ' : 'Then from €49/month per AI Collaborator, plus '}<Link href="/tarifs#configurateur" className="font-bold text-[#F2A4C5] underline decoration-white/20 underline-offset-4">{lang === 'fr' ? 'consommation des modèles d’IA' : 'AI model usage'}</Link>.</p></div><Link href="/decouvrir?source=marketplace-collaborators-final" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[#D10E63] px-7 text-sm font-bold text-white outline-none transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-[#B00C54] focus-visible:ring-2 focus-visible:ring-[#F2A4C5] focus-visible:ring-offset-2 focus-visible:ring-offset-[#181615]">{t.almaFinalAction}<ArrowRight className="size-4" /></Link></div></section>}
          </div>
        </div>
      </section>
    </main>
  )
}

function withAlmaAvatar(value: string) {
  return value.split('Alma').map((part, index) => <span key={`${part}-${index}`}>{index > 0 && <><AlmaInline className="mr-1" />Alma</>}{part}</span>)
}

function MarketplaceSidebarCatalog({ items, allItems, activeFacet, onFacet, query, onQuery, visibleCount, onShowMore, lang, category, labels }: {
  items: MarketplaceItem[]
  allItems: MarketplaceItem[]
  activeFacet: string
  onFacet: (facet: string) => void
  query: string
  onQuery: (query: string) => void
  visibleCount: number
  onShowMore: () => void
  lang: Lang
  category: Category
  labels: { clear: string; allItems: string; skillCategories: string; applicationCategories: string; modelCategories: string; serverCategories: string; result: string; results: string; available: string; preparation: string; addProfile: string; showMore: string }
}) {
  const labelsByFacet = category.id === 'competences' ? Object.fromEntries(PROFILE_DEPARTMENTS.map((department) => [department.id, department.label])) : category.id === 'applications' ? APP_CATEGORY_LABELS : category.id === 'modeles-ia' ? MODEL_MODALITY_LABELS : null
  const facetTitle = category.id === 'competences' ? labels.skillCategories : category.id === 'applications' ? labels.applicationCategories : category.id === 'modeles-ia' ? labels.modelCategories : labels.serverCategories
  const hideFacetTitle = category.id === 'competences' || category.id === 'applications'
  const facets = [...new Set(allItems.flatMap((item) => item.facetKeys ?? (item.facetKey ? [item.facetKey] : [])))].map((facet) => ({
    id: facet,
    label: labelsByFacet?.[facet]?.[lang] ?? facet,
    count: allItems.filter((item) => item.facetKey === facet || item.facetKeys?.includes(facet)).length,
  })).sort((a, b) => category.id === 'competences'
    ? PROFILE_DEPARTMENTS.findIndex((department) => department.id === a.id) - PROFILE_DEPARTMENTS.findIndex((department) => department.id === b.id)
    : category.id === 'modeles-ia'
      ? MODEL_MODALITY_ORDER.indexOf(a.id as typeof MODEL_MODALITY_ORDER[number]) - MODEL_MODALITY_ORDER.indexOf(b.id as typeof MODEL_MODALITY_ORDER[number])
      : a.label.localeCompare(b.label, lang))
  const visibleCatalogItems = items.slice(0, visibleCount)

  return (
    <div>
      <div className="mb-5 lg:hidden">
        <label className={hideFacetTitle ? 'sr-only' : 'block font-mono text-[9px] font-black uppercase tracking-[.15em] text-[#766D61]'} htmlFor={`${category.id}-facet`}>{facetTitle}</label>
        <select id={`${category.id}-facet`} value={activeFacet} onChange={(event) => onFacet(event.target.value)} className={`${hideFacetTitle ? '' : 'mt-2 '}h-12 w-full rounded-full border border-[#CFC5B5] bg-[#FAF8F3] px-4 text-sm font-bold outline-none focus:border-[var(--facet-accent)] focus:ring-2 focus:ring-[#1C1A17]/10`} style={{ '--facet-accent': category.accent } as CSSProperties}>
          <option value="">{labels.allItems} · {allItems.length}</option>
          {facets.map((facet) => <option key={facet.id} value={facet.id}>{facet.label} · {facet.count}</option>)}
        </select>
        <label className="relative mt-3 block w-full"><span className="sr-only">{category.search[lang]}</span><input type="search" value={query} onChange={(event) => onQuery(event.target.value)} placeholder={category.search[lang]} className="h-12 w-full rounded-full border border-[#CFC5B5] bg-[#FAF8F3] px-5 pr-12 text-sm outline-none transition-[border-color,box-shadow,background-color] placeholder:text-[#857C6E] focus:border-[var(--facet-accent)] focus:bg-white focus:ring-4 focus:ring-[#1C1A17]/[.05]" style={{ '--facet-accent': category.accent } as CSSProperties} />{query && <button type="button" onClick={() => onQuery('')} aria-label={labels.clear} className="absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-lg text-[#625B50] outline-none hover:bg-[#EAE3D4] focus-visible:ring-2 focus-visible:ring-[var(--facet-accent)]">×</button>}</label>
      </div>

      <div className="grid gap-7 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start xl:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="sticky top-[164px] hidden rounded-[18px] border border-[#D8D0C2] bg-[#EAE3D4] p-3 lg:block">
          {!hideFacetTitle && <p className="px-3 pb-3 pt-2 font-mono text-[9px] font-black uppercase tracking-[.16em] text-[#766D61]">{facetTitle}</p>}
          <label className="relative mb-3 block w-full"><span className="sr-only">{category.search[lang]}</span><input type="search" value={query} onChange={(event) => onQuery(event.target.value)} placeholder={category.search[lang]} className="h-10 w-full rounded-xl border border-[#CFC5B5] bg-[#FAF8F3] px-3 pr-9 text-xs outline-none transition-[border-color,box-shadow,background-color] placeholder:text-[#857C6E] focus:border-[var(--facet-accent)] focus:bg-white focus:ring-2 focus:ring-[#1C1A17]/10" style={{ '--facet-accent': category.accent } as CSSProperties} />{query && <button type="button" onClick={() => onQuery('')} aria-label={labels.clear} className="absolute right-1 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-base text-[#625B50] outline-none hover:bg-[#EAE3D4] focus-visible:ring-2 focus-visible:ring-[var(--facet-accent)]">×</button>}</label>
          <button type="button" aria-pressed={!activeFacet} onClick={() => onFacet('')} className={`flex min-h-11 w-full items-center justify-between rounded-xl px-3 text-left text-[13px] font-bold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[var(--facet-accent)] ${!activeFacet ? 'bg-[#181615] text-white' : 'text-[#4E483F] hover:bg-[#F3EFE6]'}`} style={{ '--facet-accent': category.accent } as CSSProperties}><span>{labels.allItems}</span><span className={!activeFacet ? 'text-[#F2A4C5]' : 'text-[#857C6E]'}>{allItems.length}</span></button>
          <div className="my-2 border-t border-[#CFC5B5]" />
          {facets.map((facet) => <button key={facet.id} type="button" aria-pressed={activeFacet === facet.id} onClick={() => onFacet(facet.id)} className={`flex min-h-10 w-full items-center justify-between rounded-xl px-3 text-left text-[12px] font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[var(--facet-accent)] ${activeFacet === facet.id ? 'bg-[var(--facet-accent)] text-white' : 'text-[#4E483F] hover:bg-[#F3EFE6]'}`} style={{ '--facet-accent': category.accent } as CSSProperties}><span>{facet.label}</span><span className={activeFacet === facet.id ? 'text-white/70' : 'text-[#857C6E]'}>{facet.count}</span></button>)}
        </aside>

        <div className="min-w-0">
          <div className="flex items-center justify-end gap-4">{!['competences', 'applications'].includes(category.id) && <p className="mr-auto text-xs font-semibold text-[#766D61]" aria-live="polite">{items.length} {items.length === 1 ? labels.result : labels.results}{!activeFacet && !query ? ` · ${facets.length} ${lang === 'fr' ? 'catégories' : 'categories'}` : ''}</p>}<Link href={category.href} className="hidden min-h-10 shrink-0 items-center border-b border-[#857C6E] text-xs font-bold text-[#625B50] outline-none hover:text-[#1C1A17] focus-visible:ring-2 focus-visible:ring-[var(--facet-accent)] sm:inline-flex" style={{ '--facet-accent': category.accent } as CSSProperties}>{category.explain[lang]}<span aria-hidden className="ml-3">↗</span></Link></div>
          {category.id === 'modeles-ia' && <div className="mt-4 border-l-2 border-[#1D6692] bg-[#E7EDF0] px-5 py-4"><p className="text-sm font-bold">{lang === 'fr' ? 'Vous n’avez pas à choisir le modèle.' : 'You do not have to choose the model.'}</p><p className="mt-1 text-[13px] leading-6 text-[#4E483F]">{lang === 'fr' ? 'Unitalk sélectionne l’intelligence adaptée parmi les modèles autorisés par votre entreprise.' : 'Unitalk selects the right intelligence among the models authorized by your organization.'}</p></div>}
          {items.length > 0 ? <><div className="mt-4 grid auto-rows-fr gap-4 md:grid-cols-2">{visibleCatalogItems.map((item) => category.id === 'competences' ? <SkillMarketplaceCard key={item.key} item={item} lang={lang} category={category} addLabel={labels.addProfile} /> : <CatalogItemCard key={item.key} item={item} lang={lang} category={category} labels={{ details: category.action[lang], add: labels.addProfile }} />)}{category.missing && visibleCatalogItems.length === items.length && <MissingItemCard content={category.missing} lang={lang} accent={category.accent} />}</div>{visibleCatalogItems.length < items.length && <button type="button" onClick={onShowMore} className="mx-auto mt-8 flex min-h-12 items-center justify-center rounded-full border border-[#1C1A17] px-7 text-sm font-bold outline-none transition-colors hover:bg-[#181615] hover:text-white focus-visible:ring-2 focus-visible:ring-[var(--facet-accent)]" style={{ '--facet-accent': category.accent } as CSSProperties}>{labels.showMore}<span aria-hidden className="ml-2">↓</span></button>}</> : <div className="mt-5 rounded-[18px] border border-dashed border-[#CFC5B5] bg-[#FAF8F3] p-8"><h3 className="text-xl font-semibold">{lang === 'fr' ? 'Aucun résultat dans cette catégorie.' : 'No results in this category.'}</h3><button type="button" onClick={() => onQuery('')} className="mt-4 text-sm font-bold underline underline-offset-4" style={{ color: category.accent }}>{labels.clear}</button></div>}
        </div>
      </div>
    </div>
  )
}

type ProfileDepartment = (typeof PROFILE_DEPARTMENTS)[number] & { count: number }

function ProfilesMarketplaceCatalog({ items, categoryTotal, creatorCounts, departments, activeDepartment, onDepartment, activeCreator, onCreator, query, onQuery, visibleCount, onShowMore, lang, category, labels }: {
  items: MarketplaceItem[]
  categoryTotal: number
  creatorCounts: { unitalk: number; community: number }
  departments: ProfileDepartment[]
  activeDepartment: string
  onDepartment: (department: string) => void
  activeCreator: string
  onCreator: (creator: string) => void
  query: string
  onQuery: (query: string) => void
  visibleCount: number
  onShowMore: () => void
  lang: Lang
  category: Category
  labels: { departments: string; allDepartments: string; profileResult: string; profileResults: string; firstMission: string; addProfile: string; clear: string; showMore: string; creators: string; allCreators: string; community: string }
}) {
  const visibleProfiles = items.slice(0, visibleCount)

  return (
    <div>
      <div className="mb-5 lg:hidden">
        <label className="sr-only" htmlFor="profile-department">{labels.allDepartments}</label>
        <select id="profile-department" value={activeDepartment} onChange={(event) => onDepartment(event.target.value)} className="h-12 w-full rounded-full border border-[#CFC5B5] bg-[#FAF8F3] px-4 text-sm font-bold outline-none focus:border-[#C80B5B] focus:ring-2 focus:ring-[#C80B5B]/15">
          <option value="">{labels.allDepartments} · {categoryTotal}</option>
          {departments.map((department) => <option key={department.id} value={department.id}>{department.label[lang]} · {department.count}</option>)}
        </select>
        <label className="relative mt-3 block w-full"><span className="sr-only">{category.search[lang]}</span><input type="search" value={query} onChange={(event) => onQuery(event.target.value)} placeholder={category.search[lang]} className="h-12 w-full rounded-full border border-[#CFC5B5] bg-[#FAF8F3] px-5 pr-12 text-sm outline-none transition-[border-color,box-shadow,background-color] placeholder:text-[#857C6E] focus:border-[#C80B5B] focus:bg-white focus:ring-4 focus:ring-[#C80B5B]/[.08]" />{query && <button type="button" onClick={() => onQuery('')} aria-label={labels.clear} className="absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-lg text-[#625B50] outline-none hover:bg-[#EAE3D4] focus-visible:ring-2 focus-visible:ring-[#C80B5B]">×</button>}</label>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-hide" aria-label={labels.creators}>{[['', labels.allCreators, categoryTotal], ['unitalk', 'Unitalk', creatorCounts.unitalk], ['community', labels.community, creatorCounts.community]].map(([value, label, count]) => <button key={value as string} type="button" aria-pressed={activeCreator === value} onClick={() => onCreator(value as string)} className={`min-h-9 shrink-0 rounded-full border px-3 text-xs font-bold ${activeCreator === value ? 'border-[#C80B5B] bg-[#C80B5B] text-white' : 'border-[#CFC5B5] bg-[#FAF8F3] text-[#4E483F]'}`}>{label} · {count}</button>)}</div>
      </div>

      <div className="grid gap-7 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start xl:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="sticky top-[164px] hidden rounded-[18px] border border-[#D8D0C2] bg-[#EAE3D4] p-3 lg:block">
          <label className="relative mb-3 block w-full"><span className="sr-only">{category.search[lang]}</span><input type="search" value={query} onChange={(event) => onQuery(event.target.value)} placeholder={category.search[lang]} className="h-10 w-full rounded-xl border border-[#CFC5B5] bg-[#FAF8F3] px-3 pr-9 text-xs outline-none transition-[border-color,box-shadow,background-color] placeholder:text-[#857C6E] focus:border-[#C80B5B] focus:bg-white focus:ring-2 focus:ring-[#C80B5B]/15" />{query && <button type="button" onClick={() => onQuery('')} aria-label={labels.clear} className="absolute right-1 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-base text-[#625B50] outline-none hover:bg-[#EAE3D4] focus-visible:ring-2 focus-visible:ring-[#C80B5B]">×</button>}</label>
          <button type="button" aria-pressed={!activeDepartment} onClick={() => onDepartment('')} className={`flex min-h-11 w-full items-center justify-between rounded-xl px-3 text-left text-[13px] font-bold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#C80B5B] ${!activeDepartment ? 'bg-[#181615] text-white' : 'text-[#4E483F] hover:bg-[#F3EFE6]'}`}><span>{labels.allDepartments}</span><span className={!activeDepartment ? 'text-[#F2A4C5]' : 'text-[#857C6E]'}>{categoryTotal}</span></button>
          <div className="my-2 border-t border-[#CFC5B5]" />
          {departments.map((department) => <button key={department.id} type="button" aria-pressed={activeDepartment === department.id} onClick={() => onDepartment(department.id)} className={`flex min-h-10 w-full items-center justify-between rounded-xl px-3 text-left text-[12px] font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#C80B5B] ${activeDepartment === department.id ? 'bg-[#C80B5B] text-white' : 'text-[#4E483F] hover:bg-[#F3EFE6]'}`}><span>{department.label[lang]}</span><span className={activeDepartment === department.id ? 'text-white/70' : 'text-[#857C6E]'}>{department.count}</span></button>)}
          <div className="my-3 border-t border-[#CFC5B5]" />
          <p className="px-3 pb-2 font-mono text-[9px] font-black uppercase tracking-[.16em] text-[#766D61]">{labels.creators}</p>
          {[['', labels.allCreators, categoryTotal], ['unitalk', 'Unitalk', creatorCounts.unitalk], ['community', labels.community, creatorCounts.community]].map(([value, label, count]) => <button key={value as string} type="button" aria-pressed={activeCreator === value} onClick={() => onCreator(value as string)} className={`flex min-h-9 w-full items-center justify-between rounded-xl px-3 text-left text-[12px] font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#C80B5B] ${activeCreator === value ? 'bg-[#181615] text-white' : 'text-[#4E483F] hover:bg-[#F3EFE6]'}`}><span>{label}</span><span className={activeCreator === value ? 'text-[#F2A4C5]' : 'text-[#857C6E]'}>{count}</span></button>)}
        </aside>

        <div className="min-w-0">
          <p className="sr-only" aria-live="polite">{items.length} {items.length === 1 ? labels.profileResult : labels.profileResults}</p>
          {items.length > 0 ? <><div className="mt-4 grid auto-rows-fr gap-4 md:grid-cols-2">{visibleProfiles.map((item) => <ProfileMarketplaceCard key={item.key} item={item} labels={labels} />)}</div>{visibleProfiles.length < items.length && <button type="button" onClick={onShowMore} className="mx-auto mt-8 flex min-h-12 items-center justify-center rounded-full border border-[#1C1A17] px-7 text-sm font-bold outline-none transition-colors hover:bg-[#181615] hover:text-white focus-visible:ring-2 focus-visible:ring-[#C80B5B]">{labels.showMore}<span aria-hidden className="ml-2">↓</span></button>}</> : <div className="mt-5 rounded-[18px] border border-dashed border-[#CFC5B5] bg-[#FAF8F3] p-8"><h3 className="text-xl font-semibold">{lang === 'fr' ? 'Aucun profil ne correspond à votre recherche.' : 'No profile matches your search.'}</h3><button type="button" onClick={() => onQuery('')} className="mt-4 text-sm font-bold text-[#B00C54] underline underline-offset-4">{labels.clear}</button></div>}
        </div>
      </div>

      <section className="mt-12 overflow-hidden rounded-[22px] bg-[#181615] text-white sm:mt-16 lg:grid lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="p-7 sm:p-9"><p className="font-mono text-[9px] font-black uppercase tracking-[.16em] text-[#F2A4C5]">{lang === 'fr' ? 'Profil sur mesure' : 'Custom profile'}</p><h2 className="mt-4 max-w-3xl text-[clamp(1.8rem,3vw,3rem)] font-semibold leading-[1.02] tracking-[-.045em]">{lang === 'fr' ? 'Le métier dont vous avez besoin n’existe pas encore ?' : 'Can’t find the role you need?'}</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-[#CFC6B8]">{lang === 'fr' ? 'Décrivez le travail. Alma prépare le périmètre, les savoir-faire et les validations adaptés à votre entreprise.' : 'Describe the work. Alma prepares the scope, know-how and approvals for your organization.'}</p></div>
        <div className="flex flex-col gap-4 border-t border-white/10 p-7 lg:items-end lg:border-l lg:border-t-0 lg:p-9"><Link href={category.missing!.href} className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#F3EFE6] px-6 text-sm font-bold text-[#181615] lg:w-auto">{category.missing!.action[lang]}<span aria-hidden className="ml-2">→</span></Link><Link href="/co-createur-ia" className="text-center text-xs font-bold text-[#F2A4C5] underline decoration-white/20 underline-offset-4">{lang === 'fr' ? 'Devenir Co-créateur IA' : 'Become an AI Co-creator'}</Link></div>
      </section>
    </div>
  )
}

function ProfileMarketplaceCard({ item, labels }: { item: MarketplaceItem; labels: { firstMission: string; addProfile: string } }) {
  return (
    <Link id={item.key.replace('profil-', '')} href={item.addHref!} aria-label={`${labels.addProfile} : ${item.title}`} className="group relative flex min-h-[290px] flex-col overflow-hidden rounded-[16px] border border-[#D8D0C2] bg-[#FBF9F4] p-5 outline-none transition-[transform,border-color,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-[#C80B5B] hover:bg-[#FFFDF9] hover:shadow-[0_18px_45px_-38px_rgba(28,26,23,.8)] focus-visible:border-[#C80B5B] focus-visible:ring-2 focus-visible:ring-[#C80B5B] focus-visible:ring-offset-2 sm:min-h-[310px]">
      <div aria-hidden className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-[#C80B5B] transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100" />
      <div className="flex items-center gap-3.5">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#C80B5B]/10 text-[#B00C54] ring-1 ring-[#C80B5B]/20"><BriefcaseBusiness className="size-5" /></span>
        <div className="min-w-0">
          <p className="font-mono text-[9px] font-black uppercase tracking-[.13em] text-[#B00C54]">Profil métier</p>
          <h3 className="mt-1 line-clamp-2 text-[22px] font-semibold leading-none tracking-[-.04em] text-[#1C1A17]">{item.title}</h3>
          <p className="mt-1.5 truncate text-[12px] font-bold text-[#4E483F]">{item.meta}</p>
        </div>
      </div>
      <p className="mt-4 line-clamp-2 text-[13px] font-medium leading-[1.35rem] text-[#3F3A33] sm:text-[14px] sm:leading-6 sm:text-[#4E483F]">{item.description}</p>
      {item.starterMission && <dl className="mt-4 rounded-xl bg-[#F0EBE1] p-3.5"><dt className="font-mono text-[9px] font-black uppercase tracking-[.14em] text-[#857C6E]">{labels.firstMission}</dt><dd className="mt-1.5 line-clamp-2 text-[13px] font-bold leading-5 text-[#322E29]">{item.starterMission}</dd></dl>}
      <div className="mt-auto pt-4"><div className="border-t border-[#DED6C8] pt-3 transition-colors group-hover:border-[#C80B5B] group-focus-visible:border-[#C80B5B]"><span className="flex min-h-10 items-center justify-between rounded-full border border-[#CFC5B5] px-4 text-[11px] font-bold text-[#1C1A17] transition-[color,background-color,border-color] group-hover:border-[#C80B5B] group-hover:bg-[#C80B5B] group-hover:text-white group-focus-visible:border-[#C80B5B] group-focus-visible:bg-[#C80B5B] group-focus-visible:text-white sm:border-transparent sm:px-0 sm:text-xs sm:group-hover:px-4 sm:group-focus-visible:px-4">{labels.addProfile}<span aria-hidden className="ml-3 transition-transform group-hover:translate-x-1 group-focus-visible:translate-x-1">→</span></span></div></div>
    </Link>
  )
}

function SkillMarketplaceCard({ item, lang, category, addLabel }: { item: MarketplaceItem; lang: Lang; category: Category; addLabel: string }) {
  return (
    <Link href={item.addHref!} aria-label={`${addLabel} : ${item.title}`} className="group relative flex min-h-[290px] flex-col overflow-hidden rounded-[16px] border border-[#D8D0C2] bg-[#FBF9F4] p-5 text-left outline-none transition-[transform,border-color,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-[var(--profile-accent)] hover:bg-[#FFFDF9] hover:shadow-[0_18px_45px_-38px_rgba(28,26,23,.8)] focus-visible:border-[var(--profile-accent)] focus-visible:ring-2 focus-visible:ring-[var(--profile-accent)] focus-visible:ring-offset-2 sm:min-h-[310px]" style={{ '--profile-accent': category.accent } as CSSProperties}>
      <div aria-hidden className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-[var(--profile-accent)] transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100" />
      <div className="flex items-center gap-3.5">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--profile-accent)_10%,transparent)] text-[var(--profile-accent)] ring-1 ring-[color-mix(in_srgb,var(--profile-accent)_22%,transparent)]"><Wrench className="size-5" /></span>
        <div className="min-w-0"><div className="flex items-center gap-2"><p className="font-mono text-[9px] font-black uppercase tracking-[.13em] text-[var(--profile-accent)]">{lang === 'fr' ? 'Compétence' : 'Skill'}</p><span className="rounded-full bg-[#E4F3E8] px-2 py-0.5 font-mono text-[8px] font-black uppercase tracking-[.12em] text-[#216641]">{lang === 'fr' ? 'Gratuite' : 'Free'}</span></div><h3 className="mt-1 line-clamp-2 text-[22px] font-semibold leading-none tracking-[-.04em] text-[#1C1A17]">{item.title}</h3><p className="mt-1.5 truncate text-[12px] font-bold text-[#4E483F]">{item.meta}</p></div>
      </div>
      <p className="mt-4 line-clamp-2 text-[13px] font-medium leading-[1.35rem] text-[#3F3A33] sm:text-[14px] sm:leading-6 sm:text-[#4E483F]">{item.description}</p>
      <dl className="mt-4 rounded-xl bg-[#F0EBE1] p-3.5"><dt className="font-mono text-[9px] font-black uppercase tracking-[.14em] text-[#857C6E]">{lang === 'fr' ? 'Contexte → résultat' : 'Context → outcome'}</dt><dd className="mt-1.5 line-clamp-2 text-[12px] font-semibold leading-5 text-[#322E29]">{item.input ?? (lang === 'fr' ? 'Contexte défini avec Alma' : 'Context scoped with Alma')} → {item.result ?? (lang === 'fr' ? 'Résultat documenté à valider' : 'Documented result ready for approval')}</dd></dl>
      <div className="mt-auto pt-4"><div className="border-t border-[#DED6C8] pt-3 transition-colors group-hover:border-[var(--profile-accent)] group-focus-visible:border-[var(--profile-accent)]"><span className="flex min-h-10 items-center justify-between rounded-full border border-[#CFC5B5] px-4 text-[11px] font-bold text-[#1C1A17] transition-[color,background-color,border-color] group-hover:border-[var(--profile-accent)] group-hover:bg-[var(--profile-accent)] group-hover:text-white group-focus-visible:border-[var(--profile-accent)] group-focus-visible:bg-[var(--profile-accent)] group-focus-visible:text-white sm:border-transparent sm:px-0 sm:text-xs sm:group-hover:px-4 sm:group-focus-visible:px-4">{addLabel}<span aria-hidden className="ml-3 transition-transform group-hover:translate-x-1 group-focus-visible:translate-x-1">→</span></span></div></div>
    </Link>
  )
}

function CatalogItemCard({ item, lang, category, labels }: { item: MarketplaceItem; lang: Lang; category: Category; labels: { details: string; add: string } }) {
  const href = item.addHref ?? item.href
  const Icon = category.id === 'competences' ? Wrench : category.id === 'applications' ? AppWindow : category.id === 'modeles-ia' ? Cpu : Server
  const firstLabel = category.id === 'competences'
    ? (lang === 'fr' ? 'Contexte d’application' : 'Application context')
    : category.id === 'applications'
      ? (lang === 'fr' ? 'Usage principal' : 'Primary use')
      : category.id === 'modeles-ia'
        ? (lang === 'fr' ? 'Sélection' : 'Selection')
        : (lang === 'fr' ? 'Contexte conseillé' : 'Recommended context')
  const secondLabel = category.id === 'competences'
    ? (lang === 'fr' ? 'Résultat produit' : 'Produced result')
    : category.id === 'applications'
      ? (lang === 'fr' ? 'Action autorisée' : 'Authorized action')
      : category.id === 'modeles-ia'
        ? (lang === 'fr' ? 'Gouvernance' : 'Governance')
        : (lang === 'fr' ? 'Capacité apportée' : 'Provided capacity')
  const action = category.id === 'competences' ? labels.add : labels.details
  const content = <><div aria-hidden className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-[var(--profile-accent)] transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"/><div className="flex items-center gap-3.5"><span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--profile-accent)_10%,transparent)] text-[var(--profile-accent)] ring-1 ring-[color-mix(in_srgb,var(--profile-accent)_22%,transparent)]"><Icon className="size-5"/></span><div className="min-w-0"><div className="flex items-center gap-2"><p className="font-mono text-[9px] font-black uppercase tracking-[.13em] text-[var(--profile-accent)]">{item.meta}</p>{category.id === 'competences' && <span className="rounded-full bg-[#E4F3E8] px-2 py-0.5 font-mono text-[8px] font-black uppercase tracking-[.12em] text-[#216641]">{lang === 'fr' ? 'Gratuite' : 'Free'}</span>}</div><h3 className="mt-1 line-clamp-2 text-[22px] font-semibold leading-none tracking-[-.04em] text-[#1C1A17]">{item.title}</h3></div></div><p className="mt-4 line-clamp-3 text-[13px] font-medium leading-[1.35rem] text-[#4E483F] sm:text-[14px] sm:leading-6">{item.description}</p><dl className="mt-4 rounded-xl bg-[#F0EBE1] p-3.5"><div><dt className="font-mono text-[9px] font-black uppercase tracking-[.14em] text-[#857C6E]">{firstLabel}</dt><dd className="mt-1 line-clamp-2 text-[12px] font-semibold leading-5 text-[#322E29]">{item.input ?? (lang === 'fr' ? 'Configuration précisée avec Alma' : 'Configuration scoped with Alma')}</dd></div><div className="mt-2 border-t border-[#D8D0C2] pt-2"><dt className="font-mono text-[9px] font-black uppercase tracking-[.14em] text-[#857C6E]">{secondLabel}</dt><dd className="mt-1 line-clamp-2 text-[12px] font-semibold leading-5 text-[#322E29]">{item.result ?? (lang === 'fr' ? 'Résultat documenté à valider' : 'Documented result ready for approval')}</dd></div></dl>{category.id === 'competences' && item.profileKeys && item.profileKeys.length > 0 && <div className="mt-3 flex flex-wrap gap-1.5">{item.profileKeys.slice(0, 2).map((slug) => <span key={slug} className="rounded-full border border-[#D8D0C2] px-2.5 py-1 text-[10px] font-semibold text-[#4E483F]">{PROFILE_NAMES.get(slug)?.[lang] ?? slug}</span>)}</div>}<div className="mt-auto pt-4"><div className="border-t border-[#DED6C8] pt-3 transition-colors group-hover:border-[var(--profile-accent)] group-focus-visible:border-[var(--profile-accent)]"><div className="flex items-center justify-between gap-3"><p className="text-[10px] font-semibold text-[#857C6E]">{item.origin} · {item.status?.[lang]}</p><span aria-hidden className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#181615] text-white transition-colors group-hover:bg-[var(--profile-accent)]">→</span></div><p className="mt-2 text-xs font-bold text-[#1C1A17] transition-colors group-hover:text-[var(--profile-accent)]">{action}</p></div></div></>
  const className = "group relative flex min-h-[290px] flex-col overflow-hidden rounded-[16px] border border-[#D8D0C2] bg-[#FBF9F4] p-5 text-left outline-none transition-[transform,border-color,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-[var(--profile-accent)] hover:bg-[#FFFDF9] hover:shadow-[0_18px_45px_-38px_rgba(28,26,23,.8)] focus-visible:border-[var(--profile-accent)] focus-visible:ring-2 focus-visible:ring-[var(--profile-accent)] focus-visible:ring-offset-2 sm:min-h-[310px]"
  const style = { '--profile-accent': category.accent } as CSSProperties
  return href ? <Link href={href} aria-label={`${action} : ${item.title}`} className={className} style={style}>{content}</Link> : <article className={className} style={style}>{content}</article>
}

function MissingItemCard({ content, lang, accent }: { content: NonNullable<Category['missing']>; lang: Lang; accent: string }) {
  return (
    <Link href={content.href} className="group flex min-h-[240px] flex-col rounded-[16px] border border-dashed border-[#AFA596] bg-[#EAE3D4]/60 p-6 text-left transition-[border-color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:border-[var(--missing-accent)] hover:bg-[#EAE3D4] sm:min-h-[255px]" style={{ '--missing-accent': accent } as CSSProperties}>
      <p className="font-mono text-[9px] font-bold uppercase tracking-[.16em]" style={{ color: accent }}>{lang === 'fr' ? 'Sur demande' : 'On request'}</p>
      <h3 className="mt-5 text-[23px] font-semibold leading-[1.08] tracking-[-.04em]">{content.title[lang]}</h3>
      <p className="mt-4 text-[13px] leading-6 text-[#625B50]">{content.body[lang]}</p>
      <span className="mt-auto border-t border-[#CFC5B5] pt-4 text-xs font-bold transition-colors group-hover:text-[var(--missing-accent)]">{content.action[lang]}<span aria-hidden="true" className="ml-2">→</span></span>
    </Link>
  )
}

function MarketplaceItemCard({ item, lang, category, labels, featuredLast = false, mobileHidden = false }: { item: MarketplaceItem; lang: Lang; category: Category; labels: { details: string; available: string; preparation: string; addProfile: string }; featuredLast?: boolean; mobileHidden?: boolean }) {
  const hasDirectAdd = Boolean(item.addHref)
  const style = { '--profile-accent': category.accent } as CSSProperties
  if (hasDirectAdd) {
    return (
      <Link href={item.addHref!} aria-label={`${labels.addProfile} : ${item.title}`} className="group relative flex min-h-[238px] flex-col overflow-hidden rounded-[16px] border border-[#D8D0C2] bg-[#FBF9F4] p-5 text-left outline-none transition-[transform,border-color,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-[var(--profile-accent)] hover:bg-[#FFFDF9] hover:shadow-[0_18px_45px_-38px_rgba(28,26,23,.8)] focus-visible:border-[var(--profile-accent)] focus-visible:ring-2 focus-visible:ring-[var(--profile-accent)] focus-visible:ring-offset-2 sm:min-h-[248px] sm:p-6 [@media(min-width:1024px)_and_(max-height:850px)]:min-h-[230px] [@media(min-width:1024px)_and_(max-height:850px)]:p-5" style={style}>
        <div aria-hidden className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-[var(--profile-accent)] transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100" />
        <div className="flex items-start justify-between gap-3"><p className="font-mono text-[9px] font-black uppercase tracking-[.16em] text-[var(--profile-accent)]">{item.meta}</p>{category.id === 'competences' && <span className="rounded-full bg-[#E4F3E8] px-2.5 py-1 font-mono text-[9px] font-black uppercase tracking-[.12em] text-[#216641]">{lang === 'fr' ? 'Gratuite' : 'Free'}</span>}</div>
        <h3 className="mt-3 line-clamp-2 text-[21px] font-semibold leading-[1.08] tracking-[-.04em] text-[#1C1A17] sm:mt-4 sm:text-[23px]">{item.title}</h3>
        <p className="mt-2.5 line-clamp-3 text-[13px] leading-[1.4rem] text-[#625B50] sm:mt-3 sm:leading-6">{item.description}</p>
        {['competences', 'applications', 'modeles-ia', 'serveurs-ia'].includes(category.id) && <div className="mt-3 grid gap-3 sm:mt-4 sm:grid-cols-[1fr_auto] sm:items-end"><dl className="grid gap-1.5 rounded-xl bg-[#F0EBE1] p-2.5 text-xs sm:gap-2 sm:p-3"><div><dt className="font-mono text-[9px] font-black uppercase tracking-[.12em] text-[#857C6E]">{category.id === 'competences' ? (lang === 'fr' ? 'Contexte d’application' : 'Application context') : category.id === 'applications' ? (lang === 'fr' ? 'Usage principal' : 'Primary use') : category.id === 'modeles-ia' ? (lang === 'fr' ? 'Sélection' : 'Selection') : (lang === 'fr' ? 'Contexte conseillé' : 'Recommended context')}</dt><dd className="mt-0.5 line-clamp-2 font-semibold leading-5 text-[#3F3A33]">{item.input ?? (lang === 'fr' ? 'Configuration précisée avec Alma' : 'Configuration scoped with Alma')}</dd></div><div className="border-t border-[#D8D0C2] pt-1.5 sm:pt-2"><dt className="font-mono text-[9px] font-black uppercase tracking-[.12em] text-[#857C6E]">{category.id === 'competences' ? (lang === 'fr' ? 'Résultat produit' : 'Produced result') : category.id === 'applications' ? (lang === 'fr' ? 'Action autorisée' : 'Authorized action') : category.id === 'modeles-ia' ? (lang === 'fr' ? 'Gouvernance' : 'Governance') : (lang === 'fr' ? 'Capacité apportée' : 'Provided capacity')}</dt><dd className="mt-0.5 line-clamp-2 font-semibold leading-5 text-[#3F3A33]">{item.result ?? (lang === 'fr' ? 'Résultat documenté à valider' : 'Documented result to approve')}</dd></div></dl>{category.id === 'competences' && item.profileKeys && item.profileKeys.length > 0 && <div className="hidden sm:block [@media(min-width:1024px)_and_(max-height:850px)]:hidden"><p className="font-mono text-[9px] font-black uppercase tracking-[.12em] text-[#857C6E]">{lang === 'fr' ? 'Profils compatibles' : 'Compatible profiles'}</p><div className="mt-2 flex flex-wrap gap-1.5">{item.profileKeys.slice(0, 2).map((slug) => <span key={slug} className="rounded-full border border-[#D8D0C2] px-2.5 py-1 text-[10px] font-semibold text-[#4E483F]">{PROFILE_NAMES.get(slug)?.[lang] ?? slug}</span>)}</div></div>}</div>}
        {category.id === 'competences' && <p className="mt-2 hidden text-[10px] font-semibold leading-4 text-[#766D61] sm:block [@media(min-width:1024px)_and_(max-height:850px)]:hidden">{item.proof}</p>}
        {category.id !== 'competences' && item.highlights && item.highlights.length > 0 && <div className="mt-4"><p className="font-mono text-[9px] font-black uppercase tracking-[.14em] text-[#857C6E]">{item.highlightsLabel}</p><ul className="mt-1.5 space-y-1">{item.highlights.map((highlight, index) => <li key={highlight} className={`gap-2 text-xs font-semibold leading-[1.15rem] text-[#4E483F] ${index > 0 ? 'hidden sm:flex' : 'flex'}`}><span aria-hidden className="mt-[7px] size-1 shrink-0 rounded-full bg-[var(--profile-accent)]"/>{highlight}</li>)}</ul></div>}
        <div className="mt-auto pt-5 sm:pt-6">
          <div className="border-t border-[#DED6C8] pt-4 transition-colors group-hover:border-[var(--profile-accent)] group-focus-visible:border-[var(--profile-accent)]">
            <p className="text-[10px] font-semibold text-[#857C6E]">{item.origin} · {item.status?.[lang]}</p>
            <span className="mt-2.5 flex min-h-11 items-center justify-between rounded-full border border-[#CFC5B5] px-4 text-[11px] font-bold text-[#1C1A17] transition-[color,background-color,border-color] group-hover:border-[var(--profile-accent)] group-hover:bg-[var(--profile-accent)] group-hover:text-white group-focus-visible:border-[var(--profile-accent)] group-focus-visible:bg-[var(--profile-accent)] group-focus-visible:text-white sm:min-h-10 sm:border-transparent sm:px-0 sm:text-xs sm:group-hover:px-4 sm:group-focus-visible:px-4">
              {labels.addProfile}<span aria-hidden className="ml-3 transition-transform group-hover:translate-x-1 group-focus-visible:translate-x-1">→</span>
            </span>
          </div>
        </div>
      </Link>
    )
  }
   const content = (
     <>
       <div>
         {item.avatar ? <>
           <div className="flex items-center gap-3.5">
             <Image src={item.avatar} alt="" width={56} height={56} className="size-14 rounded-full object-cover ring-1 ring-[#D8D0C2]" />
             <div className="min-w-0">
               <p className="font-mono text-[9px] font-black uppercase tracking-[.13em] text-[var(--profile-accent)]">{item.identityLabel}</p>
               <h3 className="mt-1 text-[24px] font-semibold leading-none tracking-[-.045em] text-[#1C1A17]">{item.title}</h3>
               <p className="mt-1.5 truncate text-[12px] font-bold text-[#4E483F]">{item.meta}</p>
             </div>
           </div>
               <p className="mt-4 line-clamp-2 text-[13px] font-medium leading-[1.35rem] text-[#3F3A33] sm:line-clamp-2 sm:text-[14px] sm:leading-6 sm:text-[#4E483F]">{item.description}</p>
              {item.starterMission && <dl className="mt-4 rounded-xl bg-[#F0EBE1] p-3.5"><div><dt className="font-mono text-[9px] font-black uppercase tracking-[.14em] text-[#857C6E]">{lang === 'fr' ? 'Première mission' : 'First mission'}</dt><dd className="mt-1.5 line-clamp-2 text-[13px] font-bold leading-5 text-[#322E29]">{item.starterMission}</dd>{item.starterResult && <dd className="mt-2 line-clamp-2 border-t border-[#D8D0C2] pt-2 text-[11px] font-semibold leading-4 text-[#625B50]"><span className="font-bold text-[#B00C54]">{lang === 'fr' ? 'Résultat :' : 'Outcome:'}</span> {item.starterResult}</dd>}</div></dl>}
         </> : <>
           <h3 className="line-clamp-2 text-[24px] font-semibold leading-[1.04] tracking-[-.045em] text-[#1C1A17] sm:text-[26px]">{item.title}</h3>
           <p className="mt-3 line-clamp-2 text-[13px] leading-5 text-[#625B50] sm:mt-4 sm:text-sm sm:leading-6">{item.description}</p>
           {item.highlights && <details className="mt-4 sm:hidden"><summary className="cursor-pointer text-xs font-bold text-[#B00C54]">{item.highlightsLabel}</summary><div className="mt-2 flex flex-wrap items-center gap-1.5">{item.highlights.map((highlight) => <span key={highlight} className="rounded-full border border-[#D8D0C2] bg-[#FAF8F3] px-2.5 py-1 text-[11px] font-semibold text-[#4E483F]">{highlight}</span>)}<span className="px-1 text-[11px] font-bold text-[#766D61]">{lang === 'fr' ? 'et plus encore' : 'and more'}</span></div></details>}
           {item.highlights && <div className="mt-4 hidden sm:block"><p className="font-mono text-[10px] font-black uppercase tracking-[.12em] text-[#766D61]">{item.highlightsLabel}</p><div className="mt-2 flex flex-wrap items-center gap-1.5">{item.highlights.map((highlight) => <span key={highlight} className="rounded-full border border-[#D8D0C2] bg-[#FAF8F3] px-2.5 py-1 text-[11px] font-semibold text-[#4E483F]">{highlight}</span>)}<span className="px-1 text-[11px] font-bold text-[#766D61]">{lang === 'fr' ? 'et plus encore' : 'and more'}</span></div><p className="mt-3 text-[11px] font-bold text-[#B00C54]">+ {lang === 'fr' ? 'Ajouter des profils métier' : 'Add job profiles'}</p></div>}
         </>}
      </div>
      <div className="mt-auto pt-5 sm:pt-8">
        <div className="border-t border-[#DED6C8] pt-4 transition-colors group-hover:border-[var(--profile-accent)]">
              {hasDirectAdd ? <Link href={item.addHref!} className="relative z-10 flex min-h-11 w-full items-center justify-center rounded-full bg-[#1C1A17] px-4 text-center text-[13px] font-bold text-white outline-none transition-colors hover:bg-[var(--profile-accent)] focus-visible:ring-2 focus-visible:ring-[var(--profile-accent)]">{labels.addProfile}<span aria-hidden="true" className="ml-2">→</span></Link> : item.missionHref ? <div className="relative z-10"><Link href={item.missionHref} className="flex min-h-11 w-full items-center justify-center rounded-full bg-[#1C1A17] px-4 text-center text-[13px] font-bold text-white outline-none transition-colors group-hover:bg-[var(--profile-accent)] hover:bg-[var(--profile-accent)] focus-visible:ring-2 focus-visible:ring-[var(--profile-accent)]">{lang === 'fr' ? `Confier cette mission à ${item.title}` : `Assign this mission to ${item.title}`}<span aria-hidden="true" className="ml-2">→</span></Link>{item.href && <Link href={item.href} className="mt-2 block text-center text-[13px] font-bold text-[#625B50] underline decoration-[#CFC5B5] underline-offset-4 outline-none transition-colors hover:text-[var(--profile-accent)] focus-visible:ring-2 focus-visible:ring-[var(--profile-accent)]">{labels.details}</Link>}</div> : <div className="flex items-end justify-between gap-3"><span className="text-xs font-semibold text-[#625B50]">{item.status?.[lang] ?? (item.pending ? labels.preparation : labels.available)}</span>{item.href && <Link href={item.href} className="relative z-10 text-xs font-bold text-[#1C1A17] outline-none transition-colors hover:text-[var(--profile-accent)] focus-visible:ring-2 focus-visible:ring-[var(--profile-accent)]">{labels.details}<span aria-hidden="true" className="ml-2">→</span></Link>}</div>}
        </div>
      </div>
    </>
  )
   const className = `group relative flex-col overflow-hidden rounded-[16px] border border-[#D8D0C2] bg-[#FBF9F4] p-5 text-left outline-none transition-[transform,border-color,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-[var(--profile-accent)] hover:bg-[#FFFDF9] hover:shadow-[0_18px_45px_-38px_rgba(28,26,23,.8)] sm:p-6 [@media(min-width:1024px)_and_(max-height:850px)]:p-5 ${mobileHidden ? 'hidden sm:flex' : 'flex'} ${item.avatar ? 'min-h-[300px] sm:min-h-[330px]' : 'min-h-[220px] sm:min-h-[255px]'} ${featuredLast ? 'xl:col-start-2' : ''}`
  return <article className={className} style={style}><div className="relative flex min-h-full flex-1 flex-col">{content}</div></article>
}
