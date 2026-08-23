'use client'

import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import Image from 'next/image'
import { LocalizedLink as Link } from '@/components/localized-link'
import { AppWindow, ArrowRight, Cpu, Server } from 'lucide-react'
import { Anthropic, DeepSeek, Flux, Gemini, Kimi, Minimax, Mistral, Nvidia, OpenAI, Qwen, Tencent, XiaomiMiMo, Zhipu } from '@lobehub/icons'
import { siJitsi, siN8n, siOpencode, siPayloadcms, siPlane, siTwenty } from 'simple-icons'
import { AlmaInline } from '@/components/alma-inline'
import { Kicker } from '@/components/home/section-kicker'
import { useLanguage } from '@/lib/language-context'
import type { Lang as SiteLang } from '@/lib/language-context'
import { MARKETPLACE_COLLABORATOR_SLUGS, ROLE_DETAILS } from '@/lib/collaborators-catalog'
import { APP_CATEGORY_LABELS, DOMAIN_LABELS, STORE_ITEMS } from '@/lib/store-catalog'
import { AI_MODELS } from '@/lib/ai-models-catalog'
import { collaboratorProfileHref, localizePublicHref, localizedHref } from '@/lib/i18n-routing'

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
  logoId?: string
  iconSlug?: string
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
  modelModalities?: Bi[]
  modelCapabilities?: Bi[]
  modelType?: Bi
  modelTypeKey?: 'proprietaire' | 'poids-ouverts' | 'open-source'
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

const MODEL_ITEMS = AI_MODELS

const MODEL_MODALITY_LABELS: Record<string, Bi> = {
  texte: { fr: 'Texte', en: 'Text' },
  multimodal: { fr: 'Multimodal', en: 'Multimodal' },
  image: { fr: 'Image', en: 'Image' },
  audio: { fr: 'Audio', en: 'Audio' },
  video: { fr: 'Vidéo', en: 'Video' },
}

const MODEL_MODALITY_ORDER = ['texte', 'multimodal', 'image', 'audio', 'video'] as const
const MODEL_MODALITY_DISPLAY: Record<string, Bi> = {
  texte: { fr: 'Texte', en: 'Text' },
  multimodal: { fr: 'Multimodal', en: 'Multimodal' },
  image: { fr: 'Image', en: 'Image' },
  audio: { fr: 'Audio', en: 'Audio' },
  video: { fr: 'Vidéo', en: 'Video' },
}

const MODEL_CAPABILITY_LABELS: Record<string, Bi> = {
  raisonnement: { fr: 'Raisonnement', en: 'Reasoning' },
  code: { fr: 'Code', en: 'Code' },
  'deep-research': { fr: 'Recherche approfondie', en: 'Deep research' },
  speech: { fr: 'Synthèse vocale', en: 'Speech synthesis' },
  transcription: { fr: 'Transcription', en: 'Transcription' },
  'generation-image': { fr: 'Génération d’images', en: 'Image generation' },
  'generation-video': { fr: 'Génération vidéo', en: 'Video generation' },
}

const MODEL_CAPABILITY_ORDER = ['raisonnement', 'code', 'deep-research', 'speech', 'transcription', 'generation-image', 'generation-video'] as const

const SERVER_CATEGORY_LABELS: Record<string, Bi> = {
  'unitalk-ai-cloud': { fr: 'Unitalk AI Cloud', en: 'Unitalk AI Cloud' },
  'open-source': { fr: 'Applications open source', en: 'Open-source applications' },
  hebergeurs: { fr: 'Hébergeurs', en: 'Hosting providers' },
}

const OPEN_SOURCE_SERVER_APPS = [
  { key: 'hermes', category: { fr: 'Agent IA', en: 'AI agent' }, title: 'Hermes', installation: { fr: 'Installé par défaut', en: 'Installed by default' }, description: { fr: 'Exécute les missions de vos Collaborateurs IA avec outils, mémoire et tâches planifiées.', en: 'Runs your AI Collaborators’ missions with tools, memory and scheduled tasks.' } },
  { key: 'n8n', category: { fr: 'Automatisation', en: 'Automation' }, title: 'n8n', installation: { fr: 'Installé par défaut', en: 'Installed by default' }, description: { fr: 'Automatisez vos processus et connectez vos applications depuis votre serveur privé.', en: 'Automate processes and connect applications from your private server.' } },
  { key: 'gbrain', category: { fr: 'Mémoire et connaissances', en: 'Memory and knowledge' }, title: 'GBrain', installation: { fr: 'Déploiement en un clic', en: 'One-click deployment' }, description: { fr: 'Organisez une mémoire et une base de connaissances privées pour vos Collaborateurs IA.', en: 'Organize private memory and knowledge for your AI Collaborators.' } },
  { key: 'honcho', category: { fr: 'Mémoire agentique', en: 'Agent memory' }, title: 'Honcho', installation: { fr: 'Déploiement en un clic', en: 'One-click deployment' }, description: { fr: 'Ajoutez une mémoire persistante et des représentations évolutives à vos agents.', en: 'Add persistent memory and evolving representations to your agents.' } },
  { key: 'stalwart', category: { fr: 'Email et collaboration', en: 'Email and collaboration' }, title: 'Stalwart', installation: { fr: 'Déploiement en un clic', en: 'One-click deployment' }, description: { fr: 'Hébergez email, calendriers, contacts et fichiers avec des protocoles ouverts.', en: 'Host email, calendars, contacts and files using open protocols.' } },
  { key: 'paperclip', category: { fr: 'Orchestration', en: 'Orchestration' }, title: 'Paperclip', installation: { fr: 'Déploiement en un clic', en: 'One-click deployment' }, description: { fr: 'Orchestrez des workflows et des traitements sur votre infrastructure privée.', en: 'Orchestrate workflows and processing on your private infrastructure.' } },
  { key: 'buzz', category: { fr: 'Communication', en: 'Communication' }, title: 'Buzz', installation: { fr: 'Déploiement en un clic', en: 'One-click deployment' }, description: { fr: 'Réunissez humains et agents IA dans une plateforme de communication auto-hébergée.', en: 'Bring humans and AI agents together in a self-hosted communication platform.' } },
  { key: 'opencode', category: { fr: 'Code', en: 'Code' }, title: 'OpenCode', installation: { fr: 'Déploiement en un clic', en: 'One-click deployment' }, description: { fr: 'Travaillez sur vos dépôts et automatisez des tâches de développement dans votre environnement privé.', en: 'Work on repositories and automate development tasks in your private environment.' } },
  { key: 'twenty', category: { fr: 'CRM', en: 'CRM' }, title: 'Twenty', installation: { fr: 'Déploiement en un clic', en: 'One-click deployment' }, description: { fr: 'Gérez contacts, entreprises et opportunités dans un CRM open source privé.', en: 'Manage contacts, companies and opportunities in a private open-source CRM.' } },
  { key: 'payload', category: { fr: 'CMS', en: 'CMS' }, title: 'Payload', installation: { fr: 'Déploiement en un clic', en: 'One-click deployment' }, description: { fr: 'Gérez vos contenus et vos données structurées avec un CMS open source auto-hébergé.', en: 'Manage content and structured data with a self-hosted open-source CMS.' } },
  { key: 'jitsi', category: { fr: 'Visioconférence', en: 'Video conferencing' }, title: 'Jitsi', installation: { fr: 'Déploiement en un clic', en: 'One-click deployment' }, description: { fr: 'Organisez des visioconférences privées sans tarification par utilisateur.', en: 'Run private video conferences without per-user pricing.' } },
  { key: 'plane', category: { fr: 'Gestion de projet', en: 'Project management' }, title: 'Plane', installation: { fr: 'Déploiement en un clic', en: 'One-click deployment' }, description: { fr: 'Pilotez projets, cycles et tickets depuis votre infrastructure privée.', en: 'Manage projects, cycles and issues from your private infrastructure.' } },
] as const

const SERVER_HOSTS = [
  { key: 'ovhcloud', title: 'OVHcloud', meta: { fr: 'France', en: 'France' }, description: { fr: 'Cloud européen avec des régions en France et des offres adaptées aux exigences de souveraineté.', en: 'European cloud with French regions and services suited to sovereignty requirements.' } },
  { key: 'scaleway', title: 'Scaleway', meta: { fr: 'France', en: 'France' }, description: { fr: 'Cloud français proposant du calcul CPU et GPU dans des centres de données européens.', en: 'French cloud offering CPU and GPU compute in European data centers.' } },
  { key: 'outscale', title: 'OUTSCALE', meta: { fr: 'France', en: 'France' }, description: { fr: 'Cloud souverain français de Dassault Systèmes pour les environnements sensibles et réglementés.', en: 'French sovereign cloud from Dassault Systèmes for sensitive and regulated environments.' } },
  { key: 'clever-cloud', title: 'Clever Cloud', meta: { fr: 'France', en: 'France' }, description: { fr: 'Plateforme française opérée sur une infrastructure européenne et conçue pour des déploiements applicatifs maîtrisés.', en: 'French platform operated on European infrastructure for controlled application deployments.' } },
  { key: 'ionos', title: 'IONOS', meta: { fr: 'Allemagne', en: 'Germany' }, description: { fr: 'Cloud allemand avec des centres de données européens et des services adaptés aux entreprises.', en: 'German cloud with European data centers and services designed for organizations.' } },
  { key: 'hetzner', title: 'Hetzner', meta: { fr: 'Allemagne', en: 'Germany' }, description: { fr: 'Infrastructure européenne performante opérée depuis l’Allemagne et la Finlande.', en: 'High-performance European infrastructure operated from Germany and Finland.' } },
  { key: 'open-telekom-cloud', title: 'Open Telekom Cloud', meta: { fr: 'Allemagne', en: 'Germany' }, description: { fr: 'Cloud de Deutsche Telekom hébergé en Allemagne pour les environnements soumis au droit européen.', en: 'Deutsche Telekom cloud hosted in Germany for environments governed by European law.' } },
  { key: 'infomaniak', title: 'Infomaniak', meta: { fr: 'Suisse', en: 'Switzerland' }, description: { fr: 'Cloud suisse indépendant avec des centres de données exploités en Suisse.', en: 'Independent Swiss cloud with data centers operated in Switzerland.' } },
  { key: 'exoscale', title: 'Exoscale', meta: { fr: 'Suisse', en: 'Switzerland' }, description: { fr: 'Cloud européen basé en Suisse et présent dans plusieurs régions européennes.', en: 'European cloud based in Switzerland and available across several European regions.' } },
  { key: 'upcloud', title: 'UpCloud', meta: { fr: 'Finlande', en: 'Finland' }, description: { fr: 'Cloud finlandais haute performance disposant d’une infrastructure européenne.', en: 'High-performance Finnish cloud with European infrastructure.' } },
  { key: 'gcore', title: 'Gcore', meta: { fr: 'Luxembourg', en: 'Luxembourg' }, description: { fr: 'Cloud et edge européen basé au Luxembourg avec un réseau international à faible latence.', en: 'European cloud and edge provider based in Luxembourg with a low-latency international network.' } },
  { key: 'hostinger', title: 'Hostinger', meta: { fr: 'Lituanie', en: 'Lithuania' }, description: { fr: 'Hébergeur européen basé en Lituanie avec des centres de données dans l’Union européenne.', en: 'European hosting provider based in Lithuania with data centers in the European Union.' } },
  { key: 'aws', title: 'Amazon Web Services', meta: { fr: 'Hyperscaler', en: 'Hyperscaler' }, description: { fr: 'Déploiement sur AWS selon vos contrats, les régions autorisées et vos règles de gouvernance.', en: 'Deployment on AWS according to your contracts, approved regions and governance rules.' } },
  { key: 'azure', title: 'Microsoft Azure', meta: { fr: 'Hyperscaler', en: 'Hyperscaler' }, description: { fr: 'Déploiement sur Azure selon votre environnement Microsoft, vos contrats et les régions autorisées.', en: 'Deployment on Azure according to your Microsoft environment, contracts and approved regions.' } },
  { key: 'google-cloud', title: 'Google Cloud', meta: { fr: 'Hyperscaler', en: 'Hyperscaler' }, description: { fr: 'Déploiement sur Google Cloud selon vos contrats, les régions autorisées et vos exigences techniques.', en: 'Deployment on Google Cloud according to your contracts, approved regions and technical requirements.' } },
  { key: 'oracle-cloud', title: 'Oracle Cloud', meta: { fr: 'Hyperscaler', en: 'Hyperscaler' }, description: { fr: 'Déploiement sur Oracle Cloud selon vos contrats, vos charges de travail et les régions autorisées.', en: 'Deployment on Oracle Cloud according to your contracts, workloads and approved regions.' } },
] as const

const APPLICATION_LOGOS: Record<string, string> = {
  notion: 'app_X7Lhxr', 'google-sheets': 'app_168hvn', slack: 'app_M0hv7G', linear: 'app_X7Lh0L', gmail: 'app_OQYhq7', 'google-drive': 'app_1lxhk1', 'google-agenda': 'app_13Gh2V', supabase: 'app_1dBhP3', mysql: 'app_1YMhwo', postgresql: 'app_1M0hNB', aws: 'app_Xe3hD1', 'twilio-sendgrid': 'app_XKvh3O', 'amazon-ses': 'app_m5ghj5', klaviyo: 'app_X2Rhjl', zendesk: 'app_1pbhGX', 'microsoft-teams': 'app_1M0hlk', salesforce: 'app_OrZhD7', hubspot: 'app_OkrhlP',
}

const APPLICATION_CATEGORY_ORDER = ['communication', 'messagerie', 'collaboration', 'crm', 'helpdesk-support', 'marketing', 'productivite', 'documents', 'file-storage', 'databases', 'infrastructure-cloud', 'finance', 'rh', 'metier'] as const

const PIPEDREAM_APPLICATION_ORDER = ['notion', 'google-sheets', 'slack', 'linear', 'gmail', 'google-drive', 'google-agenda', 'supabase', 'mysql', 'postgresql', 'aws', 'twilio-sendgrid', 'amazon-ses', 'klaviyo', 'zendesk', 'microsoft-teams', 'salesforce', 'hubspot'] as const
const PIPEDREAM_APPLICATION_RANK = new Map<string, number>(PIPEDREAM_APPLICATION_ORDER.map((slug, index) => [slug, index]))
const APPLICATION_CATEGORY_OVERRIDES: Record<string, string> = {
  notion: 'productivite', 'google-sheets': 'productivite', slack: 'communication', linear: 'productivite', gmail: 'communication', 'google-drive': 'file-storage', 'google-agenda': 'productivite', supabase: 'databases', mysql: 'databases', postgresql: 'databases', aws: 'infrastructure-cloud', 'twilio-sendgrid': 'marketing', 'amazon-ses': 'communication', klaviyo: 'marketing', zendesk: 'helpdesk-support', 'microsoft-teams': 'communication', salesforce: 'crm', hubspot: 'crm', sharepoint: 'file-storage', outlook: 'communication', github: 'productivite', linkedin: 'marketing', canva: 'marketing', excel: 'productivite', csv: 'productivite',
}

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
    missing: { title: { fr: 'Vous ne trouvez pas le profil métier adapté ?', en: 'Can’t find the right job profile?' }, body: { fr: 'Décrivez les responsabilités à couvrir. Alma vous aide à adapter un profil existant ou à préparer un nouveau profil métier pour votre entreprise.', en: 'Describe the responsibilities to cover. Alma helps you adapt an existing profile or prepare a new job profile for your organization.' }, action: { fr: 'Créer mon profil métier', en: 'Create my job profile' }, href: '/decouvrir?source=marketplace&intention=nouveau-profil-metier' },
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
    href: '/marketplace/competences', accent: '#C80B5B',
  },
  {
    id: 'applications', title: { fr: 'Applications', en: 'Applications' },
    description: { fr: 'Les outils, connecteurs et applications métier autorisés.', en: 'Approved tools, connectors and business applications.' },
    heroTitle: { fr: 'Connectez uniquement les applications nécessaires à chaque mission.', en: 'Connect only the applications each mission needs.' },
    heroAccent: { fr: 'nécessaires à chaque mission.', en: 'each mission needs.' },
    heroLead: { fr: 'Votre Collaborateur IA utilise les applications pour réaliser les actions que vous lui autorisez.', en: 'Your AI Collaborator uses applications to perform the actions you authorize.' },
    search: { fr: 'Rechercher une application', en: 'Search applications' }, action: { fr: 'Connecter à mon Collaborateur IA', en: 'Connect to my AI Collaborator' }, explain: { fr: 'Comprendre les applications', en: 'Understand applications' },
    missing: { title: { fr: 'Votre application n’est pas encore proposée ?', en: 'Is your application not listed yet?' }, body: { fr: 'Indiquez l’outil à connecter et l’usage visé. Nous vérifions les accès, les actions disponibles et les conditions d’intégration.', en: 'Tell us which tool to connect and the intended use. We review access, available actions and integration requirements.' }, action: { fr: 'Demander une intégration', en: 'Request an integration' }, href: '/decouvrir?source=marketplace&intention=nouvelle-application' },
    href: '/marketplace/applications', accent: '#B7501E',
  },
  {
    id: 'modeles-ia', title: { fr: 'Modèles IA', en: 'AI models' },
    description: { fr: 'Les intelligences auxquelles vos Collaborateurs IA peuvent accéder selon leurs droits et leurs missions.', en: 'The intelligences your AI Collaborators can access according to their permissions and missions.' },
    heroTitle: { fr: 'Une interface unique pour accéder aux meilleurs modèles d’IA adaptés à chaque mission.', en: 'One unified interface for all your AI models suited to each mission.' },
    heroAccent: { fr: 'adaptés à chaque mission.', en: 'suited to each mission.' },
    heroLead: { fr: 'Unitalk sélectionne automatiquement le modèle pertinent parmi ceux autorisés par votre entreprise.', en: 'Unitalk automatically selects the right model among those authorized by your organization.' },
    search: { fr: 'Rechercher un modèle IA', en: 'Search AI models' }, action: { fr: 'Découvrir le modèle', en: 'Explore model' }, explain: { fr: 'Comprendre les modèles IA', en: 'Understand AI models' },
    missing: { title: { fr: 'Vous souhaitez utiliser un autre modèle IA ?', en: 'Want to use another AI model?' }, body: { fr: 'Partagez le modèle ou le fournisseur souhaité. Nous étudions sa compatibilité, son coût et ses conditions d’accès.', en: 'Share the model or provider you want. We assess compatibility, cost and access requirements.' }, action: { fr: 'Proposer un modèle', en: 'Suggest a model' }, href: '/decouvrir?source=marketplace&intention=nouveau-modele-ia' },
    href: '/capacite-ia', accent: '#1D6692',
  },
  {
    id: 'serveurs-ia', title: { fr: 'Serveurs IA', en: 'AI servers' },
    description: { fr: 'L’infrastructure d’exécution de vos Collaborateurs IA, évolutive selon la charge, la confidentialité et la souveraineté attendues.', en: 'Your AI Collaborators’ execution infrastructure, scalable to your workload, privacy and sovereignty requirements.' },
    heroTitle: { fr: 'Où votre Collaborateur travaille. Une infrastructure qui évolue.', en: 'Where your Collaborator works. Infrastructure that scales.' },
    heroAccent: { fr: 'Une infrastructure qui évolue.', en: 'Infrastructure that scales.' },
    heroLead: { fr: 'Choisissez l’infrastructure qui correspond à vos exigences de puissance, de confidentialité et de souveraineté. Augmentez ses ressources lorsque le travail l’exige.', en: 'Choose infrastructure that matches your performance, privacy and sovereignty requirements. Increase its resources when the work demands it.' },
    search: { fr: 'Rechercher un serveur IA', en: 'Search AI servers' }, action: { fr: 'Commander ou augmenter la capacité', en: 'Order or upgrade capacity' }, explain: { fr: 'Comprendre les serveurs IA', en: 'Understand AI servers' },
    href: '/marketplace/serveurs-ia', accent: '#C80B5B',
  },
]

function itemsForCategory(categoryId: string, lang: Lang): MarketplaceItem[] {
  if (categoryId === 'collaborateurs-ia') {
    return MARKETPLACE_COLLABORATOR_SLUGS.map((slug) => ROLE_DETAILS[slug]).map((detail) => ({
      key: `collaborateur-${detail.slug}`,
      title: detail.name,
      description: detail.promise[lang],
      href: collaboratorProfileHref(detail.slug, lang),
      missionHref: `${localizePublicHref('/decouvrir', lang)}?q=${encodeURIComponent(detail.starterMission?.mission[lang] ?? detail.missions[0][lang])}&collaborateur=${encodeURIComponent(detail.slug)}&source=marketplace-collaborators`,
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
    return STORE_ITEMS.filter((item) => item.type === 'application' || item.type === 'integration').sort((a, b) => (PIPEDREAM_APPLICATION_RANK.get(a.slug) ?? Number.MAX_SAFE_INTEGER) - (PIPEDREAM_APPLICATION_RANK.get(b.slug) ?? Number.MAX_SAFE_INTEGER) || a.order - b.order).map((item) => ({
      key: `${item.type}-${item.slug}`, title: item.name[lang], description: item.description[lang], href: item.commercialStatus === 'draft' ? `/decouvrir?source=marketplace&intention=nouvelle-application&q=${encodeURIComponent(item.name[lang])}` : `/decouvrir?store=${item.slug}&source=marketplace-applications`, logoId: APPLICATION_LOGOS[item.slug],
      meta: item.editor ?? (item.type === 'integration' ? (lang === 'fr' ? 'Intégration' : 'Integration') : item.facet),
      origin: item.creator === 'unitalk' ? 'Unitalk' : lang === 'fr' ? 'Communauté' : 'Community', pending: item.commercialStatus === 'draft',
      status: item.commercialStatus === 'draft' ? { fr: 'Bientôt disponible', en: 'Coming soon' } : item.commercialStatus === 'paid' ? { fr: 'Licence requise', en: 'License required' } : undefined, facetKey: APPLICATION_CATEGORY_OVERRIDES[item.slug] ?? item.facet, input: item.uses?.[0]?.[lang] ?? item.contexts?.[0]?.[lang], result: item.actions?.[0]?.[lang] ?? item.produces?.[0]?.[lang],
    }))
  }
  if (categoryId === 'modeles-ia') {
    return MODEL_ITEMS.map((item) => {
      const capabilities = [...(item.capabilities ?? []), ...(item.modalities.includes('image') ? ['generation-image'] : []), ...(item.modalities.includes('video') ? ['generation-video'] : [])]
      return {
        key: item.key, title: item.title, href: `/decouvrir?model=${item.key}&source=marketplace-models`,
        description: item.description[lang], meta: item.maker, origin: item.maker, facetKeys: [...item.modalities, ...capabilities], modelTypeKey: item.type,
        modelModalities: item.modalities.map((modality) => MODEL_MODALITY_DISPLAY[modality]),
        modelCapabilities: capabilities.map((capability) => MODEL_CAPABILITY_LABELS[capability]),
        modelType: item.type === 'proprietaire' ? { fr: 'Modèle propriétaire', en: 'Proprietary model' } : item.type === 'open-source' ? { fr: 'Modèle open source', en: 'Open-source model' } : { fr: 'Poids ouverts', en: 'Open weights' },
      }
    })
  }
  if (categoryId === 'serveurs-ia') {
    const cloudItems: MarketplaceItem[] = STORE_ITEMS.filter((item) => item.type === 'server').map((item) => ({
      key: `${item.type}-${item.slug}`, title: item.name[lang], description: item.description[lang], href: `/decouvrir?source=marketplace&intention=nouveau-serveur-ia&q=${encodeURIComponent(item.name[lang])}`,
      meta: lang === 'fr' ? 'Infrastructure privée' : 'Private infrastructure', origin: 'Unitalk',
      status: { fr: 'Disponible', en: 'Available' }, facetKey: 'unitalk-ai-cloud', input: item.contexts?.[0]?.[lang], result: item.enables?.[0]?.[lang],
    }))
    const hostItems: MarketplaceItem[] = SERVER_HOSTS.map((host) => ({
      key: `server-host-${host.key}`, title: host.title, description: host.description[lang],
      href: '/hebergeurs', meta: host.meta[lang], origin: lang === 'fr' ? 'Hébergeurs' : 'Hosting providers',
      status: { fr: 'Selon configuration', en: 'Depending on configuration' }, facetKey: 'hebergeurs',
      input: lang === 'fr' ? 'Région, souveraineté, capacité et contrat à confirmer' : 'Region, sovereignty, capacity and contract to confirm',
      result: lang === 'fr' ? 'Déploiement validé sur une infrastructure compatible' : 'Deployment approved on compatible infrastructure',
    }))
    const openSourceItems: MarketplaceItem[] = OPEN_SOURCE_SERVER_APPS.map((app) => ({
      key: `server-app-${app.key}`, title: app.title, description: app.description[lang], href: `/decouvrir?source=marketplace&intention=nouvelle-application&q=${encodeURIComponent(app.title)}`,
      meta: app.category[lang], origin: 'Open source', iconSlug: app.key, status: { fr: 'Logiciel open source', en: 'Open-source software' }, facetKey: 'open-source',
      input: app.installation[lang], result: lang === 'fr' ? 'Utilisateurs illimités' : 'Unlimited users',
    }))
    return [...cloudItems, ...openSourceItems, ...hostItems]
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
    profileHeroProofs: ['Sans coût unitaire avec une offre compatible', 'Plusieurs profils par Collaborateur'],
    skillHeroProofs: ['Sans coût unitaire avec une offre compatible', 'Méthodes documentées', 'Réutilisables par mission'],
    applicationHeroProofs: ['Accès définis par votre entreprise', 'Actions autorisées'],
    modelHeroProofs: ['Sélection automatique', 'Fournisseurs sous votre contrôle'],
    serverHeroProofs: ['Infrastructure privée', 'Capacité évolutive', 'Déploiement gouverné'],
    showAllCollaborators: 'Voir les Collaborateurs IA',
    showMoreProfiles: 'Afficher 12 profils supplémentaires',
    creators: 'Créateur', allCreators: 'Tous', community: 'Communauté',
    departments: 'Départements', allDepartments: 'Tous les profils', profileCount: 'profils prêts à adapter', profileResult: 'profil', profileResults: 'profils', firstMission: 'Exemple de mission',
    skillCategories: 'Catégories de compétences', applicationCategories: 'Catégories d’applications', serverCategories: 'Types d’infrastructure', allItems: 'Tout le catalogue',
  },
  en: {
    noResults: 'No item matches this search.', showMore: 'View the full catalog', showLess: 'Back to the selection',
    emptyTitle: 'Catalog in preparation', emptyBody: 'This category is defined in the Unitalk architecture. Its first publishable creations will be added here.',
    clear: 'Clear filters', available: 'Available', preparation: 'Coming soon', addProfile: 'Add to an AI Collaborator',
    result: 'result', results: 'results', almaTitle: 'A mission in mind? Alma prepares the right Collaborator.', almaBody: 'Describe the expected outcome. Alma helps you choose the identity, skills, authorized sources and required human approvals.', almaAction: 'Describe my first mission', almaFinalAction: 'Prepare my Collaborator with Alma',
    heroProofs: ['First mission free', 'No credit card'],
    profileHeroProofs: ['Free job profiles', 'Multiple profiles per Collaborator', 'Customizable methods and permissions'],
    skillHeroProofs: ['Free skills', 'Documented methods', 'Reusable across missions'],
    applicationHeroProofs: ['Access defined by your organization', 'Authorized actions'],
    modelHeroProofs: ['Automatic selection', 'Providers under your control'],
    serverHeroProofs: ['Private infrastructure', 'Scalable capacity', 'Governed deployment'],
    showAllCollaborators: 'View AI Collaborators',
    showMoreProfiles: 'Show 12 more profiles',
    creators: 'Creator', allCreators: 'All', community: 'Community',
    departments: 'Departments', allDepartments: 'All profiles', profileCount: 'profiles ready to adapt', profileResult: 'profile', profileResults: 'profiles', firstMission: 'Mission example',
    skillCategories: 'Skill categories', applicationCategories: 'Application categories', serverCategories: 'Infrastructure types', allItems: 'Full catalog',
  },
} as const

function normalizeSearch(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

export function UnitalkStoreHub({ collaboratorsOnly = false, fixedLang, initialCategoryId, authenticated = false }: { collaboratorsOnly?: boolean; fixedLang?: SiteLang; initialCategoryId?: string; authenticated?: boolean }) {
  void authenticated
  const { lang: selectedLang } = useLanguage()
  const lang = fixedLang ?? selectedLang
  const t = COPY[lang]
  const initialCategory = STORE_CATEGORIES.some((category) => category.id === initialCategoryId) ? initialCategoryId! : STORE_CATEGORIES[0].id
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [catalogQuery, setCatalogQuery] = useState('')
  const [profileDepartment, setProfileDepartment] = useState('')
  const [profileCreator, setProfileCreator] = useState('')
  const [catalogFacet, setCatalogFacet] = useState(initialCategoryId === 'serveurs-ia' ? 'unitalk-ai-cloud' : '')
  const [modelType, setModelType] = useState('')
  const [availability, setAvailability] = useState('')
  const [urlReady, setUrlReady] = useState(false)
  const [showAllCollaborators, setShowAllCollaborators] = useState(false)
  const navigationCategories = STORE_CATEGORIES
  const activeCategory = STORE_CATEGORIES.find((category) => category.id === initialCategory) ?? STORE_CATEGORIES[0]
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
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const params = new URLSearchParams(window.location.search)
      const category = params.get('categorie') ?? ''
      setCatalogQuery(params.get('q') ?? '')
      setAvailability(params.get('statut') ?? '')
      setCatalogFacet(category || (activeCategory.id === 'serveurs-ia' ? 'unitalk-ai-cloud' : ''))
      setProfileDepartment(category)
      setProfileCreator(params.get('createur') ?? '')
      setUrlReady(true)
    })
    return () => cancelAnimationFrame(frame)
  }, [activeCategory.id])

  useEffect(() => {
    if (!urlReady) return
    const params = new URLSearchParams(window.location.search)
    const category = isProfilesCategory ? profileDepartment : catalogFacet
    for (const [key, value] of [['q', catalogQuery.trim()], ['statut', availability], ['categorie', category], ['createur', isProfilesCategory ? profileCreator : '']]) {
      if (value) params.set(key, value)
      else params.delete(key)
    }
    const search = params.toString()
    window.history.replaceState(null, '', `${window.location.pathname}${search ? `?${search}` : ''}${window.location.hash}`)
  }, [availability, catalogFacet, catalogQuery, isProfilesCategory, profileCreator, profileDepartment, urlReady])
  const profileDepartments = useMemo(() => PROFILE_DEPARTMENTS.map((department) => ({
    ...department,
    count: categoryItems.filter((item) => item.profileSlug && (department.profiles as readonly string[]).includes(item.profileSlug)).length,
  })).filter((department) => department.count > 0), [categoryItems])
  const profileCategoryTotal = profileDepartments.reduce((total, department) => total + department.count, 0)
  const filteredItems = useMemo(() => {
    const query = normalizeSearch(catalogQuery.trim())
    const department = PROFILE_DEPARTMENTS.find((item) => item.id === profileDepartment)
    const availabilityItems = categoryItems.filter((item) => !availability || (availability === 'bientot' ? item.pending : !item.pending))
    const scopedItems = activeCategory.id === 'competences'
      ? availabilityItems.filter((item) => !catalogFacet || item.facetKeys?.includes(catalogFacet))
      : isProfilesCategory && department
        ? availabilityItems.filter((item) => item.profileSlug && (department.profiles as readonly string[]).includes(item.profileSlug) && (!profileCreator || item.creator === profileCreator))
        : isProfilesCategory && profileCreator
          ? availabilityItems.filter((item) => item.creator === profileCreator)
        : usesCatalogSidebar && (catalogFacet || (activeCategory.id === 'modeles-ia' && modelType))
          ? availabilityItems.filter((item) => (!catalogFacet || item.facetKey === catalogFacet || item.facetKeys?.includes(catalogFacet)) && (!modelType || item.modelTypeKey === modelType))
        : availabilityItems
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
  }, [activeCategory.id, availability, catalogFacet, catalogQuery, categoryItems, isProfilesCategory, modelType, profileCreator, profileDepartment, usesCatalogSidebar])
  const visibleItems = filteredItems.slice(0, visibleCount)
  function clearFilters() {
    setCatalogQuery('')
    setProfileDepartment('')
    setProfileCreator('')
    setCatalogFacet(activeCategory.id === 'serveurs-ia' ? 'unitalk-ai-cloud' : '')
    setModelType('')
    setAvailability('')
    setVisibleCount(PAGE_SIZE)
  }

  return (
    <main id="main-content" className="min-h-screen overflow-x-clip bg-[#F3EFE6] font-sf text-[#1C1A17]">
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
         <div className="relative mx-auto max-w-6xl after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:w-10 after:bg-gradient-to-l after:from-[#211E1B] after:to-transparent lg:after:hidden">
         <nav className="flex w-full overflow-x-auto pr-8 scrollbar-hide lg:pr-0" aria-label={lang === 'fr' ? 'Catégories de la marketplace, faites défiler horizontalement pour tout afficher' : 'Marketplace categories, scroll horizontally to see all'}>
             <Link href={localizePublicHref('/marketplace', lang)} className="relative flex h-14 shrink-0 items-center pr-4 text-[13px] font-semibold text-[#BEB4A8] outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-[#F2A4C5] focus-visible:ring-inset sm:h-16 sm:pr-5 sm:text-sm">{lang === 'fr' ? 'Vue générale' : 'Overview'}</Link>
             <Link href={localizedHref('missions', lang)} className="relative flex h-14 shrink-0 items-center px-4 text-[13px] font-semibold text-[#BEB4A8] outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-[#F2A4C5] focus-visible:ring-inset sm:h-16 sm:px-5 sm:text-sm">Missions</Link>
            {navigationCategories.map((category) => {
              const active = activeCategory.id === category.id
               const className = `relative flex h-14 shrink-0 items-center px-4 text-[13px] font-semibold outline-none transition-colors first:pl-0 focus-visible:ring-2 focus-visible:ring-[#F2A4C5] focus-visible:ring-inset sm:h-16 sm:px-5 sm:text-sm ${active ? 'text-[#F15B9B]' : 'text-[#BEB4A8] hover:text-white'}`
               const label = <><span>{category.title[lang]}</span><span className={`absolute inset-x-4 bottom-0 h-[3px] bg-[#D10E63] transition-transform first:left-0 ${active ? 'scale-x-100' : 'scale-x-0'}`} /></>
                return <Link key={category.id} id={`marketplace-tab-${category.id}`} href={localizePublicHref(`/marketplace/${category.id}`, lang)} aria-current={active ? 'page' : undefined} className={className}>{label}</Link>
              })}
         </nav>
         </div>
      </div>

      <section id="categories" className={`scroll-mt-36 px-5 sm:px-8 ${collaboratorsOnly ? 'pb-20 pt-6 sm:pb-24 sm:pt-8 lg:pb-28 [@media(min-width:1024px)_and_(max-height:850px)]:pt-6' : 'pb-20 pt-7 sm:pt-9 lg:pb-24 [@media(min-width:1024px)_and_(max-height:850px)]:pt-7'}`}>
        <div className="mx-auto w-full max-w-6xl">
              <div id="marketplace-results" aria-labelledby={`marketplace-tab-${activeCategory.id}`} className="scroll-mt-[184px]">
                     {isProfilesCategory && <ProfilesMarketplaceCatalog items={filteredItems} categoryTotal={profileCategoryTotal} creatorCounts={{ unitalk: categoryItems.filter(item => item.creator === 'unitalk').length, community: categoryItems.filter(item => item.creator === 'community').length }} departments={profileDepartments} activeDepartment={profileDepartment} onDepartment={(department) => { setProfileDepartment(department); setVisibleCount(PAGE_SIZE) }} activeCreator={profileCreator} onCreator={(creator) => { setProfileCreator(creator); setVisibleCount(PAGE_SIZE) }} query={catalogQuery} onQuery={(query) => { setCatalogQuery(query); setVisibleCount(PAGE_SIZE) }} visibleCount={visibleCount} onShowMore={() => setVisibleCount(count => Math.min(count + PAGE_SIZE, filteredItems.length))} lang={lang} category={activeCategory} labels={{ departments: t.departments, allDepartments: t.allDepartments, profileResult: t.profileResult, profileResults: t.profileResults, firstMission: t.firstMission, addProfile: t.addProfile, clear: t.clear, showMore: t.showMoreProfiles, creators: t.creators, allCreators: t.allCreators, community: t.community }} />}
                       {usesCatalogSidebar && <MarketplaceSidebarCatalog items={filteredItems} allItems={categoryItems} activeFacet={catalogFacet} onFacet={(facet) => { setCatalogFacet(facet); setVisibleCount(PAGE_SIZE) }} availability={availability} onAvailability={(status) => { setAvailability(status); setVisibleCount(PAGE_SIZE) }} modelType={modelType} onModelType={(type) => { setModelType(type); setVisibleCount(PAGE_SIZE) }} query={catalogQuery} onQuery={(query) => { setCatalogQuery(query); setVisibleCount(PAGE_SIZE) }} visibleCount={visibleCount} onShowMore={() => setVisibleCount(count => Math.min(count + PAGE_SIZE, filteredItems.length))} lang={lang} category={activeCategory} labels={{ clear: t.clear, allItems: t.allItems, skillCategories: t.skillCategories, applicationCategories: t.applicationCategories, serverCategories: t.serverCategories, result: t.result, results: t.results, available: t.available, preparation: t.preparation, addProfile: t.addProfile, showMore: t.showMore }} />}
                     {!isCollaboratorsLanding && !isProfilesCategory && !usesCatalogSidebar && <div className="mb-5 sm:mb-6"><h2 className="text-[28px] font-semibold tracking-[-.04em] sm:text-[34px]">{activeCategory.title[lang]}</h2><p className="mt-2 max-w-4xl text-sm leading-6 text-[#625B50]">{activeCategory.description[lang]}</p></div>}
                       {isCollaboratorsLanding && <div className="mb-6 grid gap-5 border-b border-[#D8D0C2] pb-6 sm:mb-8 sm:pb-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-8"><h2 className="text-[clamp(1.8rem,2.3vw,2.05rem)] font-semibold leading-[1.02] tracking-[-.045em] xl:whitespace-nowrap">{lang === 'fr' ? 'Découvrez votre futur Collaborateur IA.' : 'Discover your future AI Collaborator.'}</h2><div className="w-fit border-l-2 border-[#D10E63] py-1 pl-4 lg:text-right"><p className="text-sm font-bold text-[#1C1A17]">{lang === 'fr' ? 'Dès 49 € HT/mois par Collaborateur IA' : 'From €49/month per AI Collaborator, excluding tax'}</p><p className="mt-1 text-[10px] font-semibold text-[#766D61]">{lang === 'fr' ? 'Sans engagement · 5 millions de tokens DeepSeek inclus par mois' : 'No commitment · 5 million DeepSeek tokens included each month'}</p></div></div>}
                   {categoryItems.length > 0 && !isCollaboratorsLanding && !isProfilesCategory && !usesCatalogSidebar && <div className="flex flex-col gap-3"><div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">{activeCategory.id !== 'collaborateurs-ia' && <label className="relative block w-full max-w-md"><span className="sr-only">{activeCategory.search[lang]}</span><input type="search" value={catalogQuery} onChange={(event) => { setCatalogQuery(event.target.value); setVisibleCount(PAGE_SIZE) }} placeholder={activeCategory.search[lang]} className="h-12 w-full rounded-full border border-[#CFC5B5] bg-[#FAF8F3] px-5 pr-12 text-sm outline-none transition-[border-color,box-shadow,background-color] placeholder:text-[#857C6E] focus:border-[var(--search-accent)] focus:bg-white focus:ring-4 focus:ring-[#1C1A17]/[.05]" style={{ '--search-accent': activeCategory.accent } as CSSProperties} />{catalogQuery && <button type="button" onClick={() => setCatalogQuery('')} aria-label={t.clear} className="absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-lg text-[#625B50] outline-none hover:bg-[#EAE3D4] focus-visible:ring-2 focus-visible:ring-[#D10E63]">×</button>}</label>}<Link href={activeCategory.href} className="inline-flex w-fit shrink-0 items-center border-b border-[#857C6E] pb-1 text-xs font-bold text-[#625B50] outline-none hover:text-[#1C1A17] focus-visible:ring-2 focus-visible:ring-[#D10E63] lg:ml-auto">{activeCategory.explain[lang]}<span aria-hidden="true" className="ml-3">↗</span></Link></div></div>}
                  {!isProfilesCategory && !usesCatalogSidebar && <p className="sr-only" aria-live="polite">{isCollaboratorsLanding && showAllCollaborators ? (lang === 'fr' ? `${filteredItems.length} Collaborateurs IA affichés` : `${filteredItems.length} AI Collaborators shown`) : `${filteredItems.length} ${filteredItems.length === 1 ? t.result : t.results}`}</p>}

                {!isProfilesCategory && !usesCatalogSidebar && (visibleItems.length > 0 ? <div id={isCollaboratorsLanding ? 'marketplace-collaborator-grid' : undefined} className="mt-4 grid auto-rows-fr gap-3 sm:mt-5 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">{visibleItems.map((item, index) => <MarketplaceItemCard key={item.key} item={item} lang={lang} category={activeCategory} mobileHidden={isCollaboratorsLanding && !showAllCollaborators && index >= MOBILE_COLLABORATOR_PREVIEW_SIZE} featuredLast={isCollaboratorsLanding && visibleItems.length % 3 === 1 && index === visibleItems.length - 1} labels={{ details: activeCategory.action[lang], available: t.available, preparation: t.preparation, addProfile: t.addProfile }} />)}{activeCategory.missing && <MissingItemCard content={activeCategory.missing} lang={lang} accent={activeCategory.accent} hideEyebrow={activeCategory.id === 'serveurs-ia'} />}</div> : categoryItems.length > 0 ? <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3"><div className="rounded-2xl border border-dashed border-[#CFC5B5] bg-[#FAF8F3] p-8 md:col-span-2"><h3 className="text-xl font-bold">{t.noResults}</h3><button type="button" onClick={clearFilters} className="mt-4 text-sm font-bold text-[#B00C54] underline underline-offset-4">{t.clear}</button></div>{activeCategory.missing && <MissingItemCard content={activeCategory.missing} lang={lang} accent={activeCategory.accent} hideEyebrow={activeCategory.id === 'serveurs-ia'} />}</div> : <div className="mt-5 rounded-2xl border border-[#D8D0C2] bg-[#FAF8F3] p-8"><h3 className="text-2xl font-bold">{t.emptyTitle}</h3><p className="mt-3 max-w-xl text-sm leading-7 text-[#625B50]">{t.emptyBody}</p></div>)}
                  {isCollaboratorsLanding && !showAllCollaborators && <button type="button" onClick={() => setShowAllCollaborators(true)} aria-controls="marketplace-collaborator-grid" aria-expanded={showAllCollaborators} className="mx-auto mt-6 flex min-h-12 w-full max-w-sm items-center justify-center rounded-full border border-[#1C1A17] px-5 text-sm font-bold outline-none transition-colors hover:bg-[#181615] hover:text-white focus-visible:ring-2 focus-visible:ring-[#D10E63] sm:hidden">{t.showAllCollaborators}<span aria-hidden className="ml-2">↓</span></button>}
                 {isCollaboratorsLanding && <div className="mt-10 border-y border-[#D8D0C2] py-6 text-center"><p className="text-sm font-semibold text-[#4E483F]">{lang === 'fr' ? 'Vous souhaitez comprendre son identité, sa mémoire et ses droits ?' : 'Want to understand its identity, memory and permissions?'}</p><Link href={activeCategory.href} className="mt-2 inline-flex min-h-9 items-center text-sm font-bold text-[#B00C54] underline decoration-[#D10E63]/35 underline-offset-4 outline-none transition-colors hover:text-[#1C1A17] focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-4">{lang === 'fr' ? 'Découvrir le fonctionnement d’un Collaborateur IA' : 'Discover how an AI Collaborator works'}<span aria-hidden className="ml-2">→</span></Link></div>}
                  {activeCategory.id !== 'collaborateurs-ia' && !isProfilesCategory && !usesCatalogSidebar && filteredItems.length > PAGE_SIZE && <div className="mt-9 text-center"><button type="button" onClick={() => setVisibleCount((count) => count >= filteredItems.length ? PAGE_SIZE : filteredItems.length)} className="inline-flex min-h-12 items-center rounded-full bg-[#181615] px-7 text-sm font-bold text-white transition-colors hover:bg-[#332F29]">{visibleCount >= filteredItems.length ? t.showLess : t.showMore}</button></div>}
                  <MarketplaceFaq categoryId={activeCategory.id} lang={lang} />
                     {activeCategory.id === 'collaborateurs-ia' && <section className="mt-10 rounded-[24px] bg-[#181615] p-7 text-white sm:p-9"><h3 className="max-w-5xl text-[clamp(2rem,4vw,3.75rem)] font-semibold leading-[.98] tracking-[-.05em]">{lang === 'fr' ? <>Une mission en tête ? <span className="lg:whitespace-nowrap"><AlmaInline className="mr-2 !size-[.9em] align-[-.12em] ring-2 ring-white/30" />Alma prépare le bon Collaborateur.</span></> : <>A mission in mind? <span className="lg:whitespace-nowrap"><AlmaInline className="mr-2 !size-[.9em] align-[-.12em] ring-2 ring-white/30" />Alma prepares the right Collaborator.</span></>}</h3><div className="mt-5 grid gap-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-10"><div><p className="max-w-2xl text-[15px] leading-7 text-[#CFC6B8]">{withAlmaAvatar(t.almaBody)}</p><p className="mt-5 text-xs font-semibold leading-5 text-[#F2A4C5]">{lang === 'fr' ? 'Première mission offerte · Sans carte bancaire · Sans engagement' : 'First mission included · No credit card · No commitment'}</p><p className="mt-3 text-xs leading-5 text-[#AFA397]">{lang === 'fr' ? 'Puis 49 € HT/mois par Collaborateur IA, avec 5 millions de tokens DeepSeek inclus. Les autres modèles utilisent les crédits Workspace ou vos propres clés API.' : 'Then €49/month per AI Collaborator excluding tax, with 5 million DeepSeek tokens included. Other models use Workspace credits or your own API keys.'}</p></div><Link href="/decouvrir?source=marketplace-collaborators-final" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[#D10E63] px-7 text-sm font-bold text-white outline-none transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-[#B00C54] focus-visible:ring-2 focus-visible:ring-[#F2A4C5] focus-visible:ring-offset-2 focus-visible:ring-offset-[#181615]">{t.almaFinalAction}<ArrowRight className="size-4" /></Link></div></section>}
          </div>
        </div>
      </section>
    </main>
  )
}

function MarketplaceFaq({ categoryId, lang }: { categoryId: string; lang: Lang }) {
  const applications = categoryId === 'applications'
  const servers = categoryId === 'serveurs-ia'
  const questions: Array<[string, string]> = lang === 'fr' ? [
    ['Est-ce disponible ?', applications ? 'Chaque fiche indique son statut. « Bientôt disponible » signifie que vous pouvez demander l’intégration, pas la connecter immédiatement.' : servers ? 'Les offres Unitalk AI Cloud affichées sont disponibles. Le fournisseur, la région et la capacité sont confirmés avant activation.' : categoryId === 'collaborateurs-ia' ? 'Oui. Les Collaborateurs IA présentés peuvent être choisis dès maintenant. Alma adapte ensuite leur première mission, leurs outils et leurs accès à votre entreprise.' : categoryId === 'profils-metier' ? 'Les profils métier publiés sont disponibles immédiatement. Si la responsabilité nécessaire n’existe pas encore, Alma construit le nouveau profil avec vous et peut solliciter un ingénieur IA. Vous en devenez co-créateur, sans coût supplémentaire.' : categoryId === 'competences' ? 'Les compétences publiées sont disponibles immédiatement. Si le savoir-faire nécessaire à votre mission n’existe pas encore, Alma crée la nouvelle compétence avec vous et peut solliciter un ingénieur IA. Vous en devenez co-créateur, sans coût supplémentaire.' : 'Oui, lorsque la fiche est publiée comme disponible. Alma vérifie avec vous la compatibilité et les accès nécessaires avant l’activation.'],
    ['Qu’est-ce qui est inclus ?', servers ? 'La capacité affichée et la configuration gérée par Unitalk sont décrites sur chaque fiche. Le périmètre d’exploitation dépend de l’offre retenue.' : categoryId === 'collaborateurs-ia' ? 'Chaque Collaborateur IA comprend une identité professionnelle, une mémoire, des profils métier et compétences illimités, un agent Hermes dédié, 5 millions de tokens et ses outils de communication : email, calendrier, téléphone et messageries compatibles. Vous choisissez ensuite les missions, applications, accès et validations adaptés à votre entreprise.' : 'La fiche précise ce que l’élément apporte et les usages qu’il permet. Les éventuelles conditions d’accès ou de configuration sont confirmées avant son activation.'],
    ['Quel est le prix ?', categoryId === 'competences' ? 'Les compétences sont incluses sans coût unitaire avec une offre Unitalk compatible.' : categoryId === 'collaborateurs-ia' ? 'Un Collaborateur IA coûte 49 € HT/mois avec 5 millions de tokens inclus. Le Workspace dépend du nombre de Collaborateurs humains, et la consommation supplémentaire dépend des modèles ou services utilisés.' : applications ? 'Unitalk ne facture pas chaque connexion séparément. L’abonnement Unitalk et les éventuels frais facturés par l’éditeur de l’application restent distincts.' : servers ? 'Le prix dépend de la capacité, de la région, de l’hébergeur et du niveau d’exploitation choisi. Un montant est confirmé avant le déploiement.' : 'La fiche indique ce qui est inclus. Lorsqu’un coût supplémentaire s’applique, il est présenté avant l’activation.'],
    ['De quoi ai-je besoin pour commencer ?', applications ? 'Vous devez disposer d’un compte auprès du fournisseur et autoriser uniquement les accès utiles. Alma vérifie ces éléments avec vous avant la connexion.' : servers ? 'Vous précisez les applications à exécuter, la région souhaitée et vos exigences de sécurité. Unitalk confirme ensuite la configuration adaptée.' : 'Décrivez d’abord la mission à accomplir. Alma identifie le Collaborateur IA, les profils, les compétences et les accès nécessaires avant toute activation.'],
    ['Puis-je essayer gratuitement ?', 'Oui. Votre première mission est offerte, sans carte bancaire, pendant 7 jours ou jusqu’à 1 million de tokens. Les éléments nécessaires sont configurés dans le cadre de cette mission ; ils ne disposent pas chacun d’un essai séparé.'],
    ['Comment les Collaborateurs IA évoluent-ils ?', 'Unitalk maintient les profils, compétences et outils proposés dans le catalogue. Votre Collaborateur IA peut recevoir leurs nouvelles versions sans perdre son identité, sa mémoire ni l’historique de ses missions. Les changements importants restent soumis à votre accord.'],
    ['Qui assure les mises à jour ?', servers ? 'Unitalk gère la configuration des offres Unitalk AI Cloud. Avec un autre hébergeur, les responsabilités de Unitalk, du fournisseur et de votre entreprise sont précisées avant le déploiement.' : applications ? 'L’éditeur maintient son application. Unitalk maintient l’intégration lorsqu’elle est fournie par Unitalk ; les responsabilités sont précisées avant la connexion.' : 'Unitalk maintient les Collaborateurs IA, profils et compétences publiés par Unitalk. Pour un élément fourni par la communauté ou un partenaire, sa fiche indique l’auteur et les conditions de maintenance applicables.'],
  ] : [
    ['Is it available?', applications ? 'Each card shows its status. “Coming soon” means you can request the integration, not connect it immediately.' : servers ? 'The listed Unitalk AI Cloud offers are available. Provider, region and capacity are confirmed before activation.' : categoryId === 'collaborateurs-ia' ? 'Yes. The listed AI Collaborators can be selected now. Alma then adapts their first mission, tools and access to your organization.' : categoryId === 'profils-metier' ? 'Published job profiles are available immediately. If the required responsibility does not exist yet, Alma builds the new profile with you and can involve an AI engineer. You become its co-creator at no additional cost.' : categoryId === 'competences' ? 'Published skills are available immediately. If the know-how required for your mission does not exist yet, Alma creates the new skill with you and can involve an AI engineer. You become its co-creator at no additional cost.' : 'Yes, when the page marks the item as available. Alma checks compatibility and required access with you before activation.'],
    ['What is included?', servers ? 'Each card states the capacity and Unitalk-managed configuration. The operations scope depends on the selected plan.' : categoryId === 'collaborateurs-ia' ? 'Each AI Collaborator includes a professional identity, memory, unlimited job profiles and skills, a dedicated Hermes agent, 5 million tokens and communication tools: email, calendar, phone and compatible messaging platforms. You then choose the missions, applications, access and approvals suited to your organization.' : 'Each page explains what the item provides and the uses it enables. Any access or setup requirements are confirmed before activation.'],
    ['What does it cost?', categoryId === 'competences' ? 'Skills are included without a unit fee with a compatible Unitalk plan.' : categoryId === 'collaborateurs-ia' ? 'An AI Collaborator costs €49 per month excluding tax with 5 million tokens included. Workspace pricing depends on the number of human Collaborators, while additional usage depends on the models or services used.' : applications ? 'Unitalk does not charge separately for every connection. Your Unitalk subscription and any fees charged by the application publisher remain separate.' : servers ? 'Pricing depends on capacity, region, hosting provider and selected operations level. A price is confirmed before deployment.' : 'Each page states what is included. Any additional charge is shown before activation.'],
    ['What do I need to get started?', applications ? 'You need an account with the provider and must authorize only the required access. Alma checks these elements with you before connection.' : servers ? 'Specify the applications to run, preferred region and security requirements. Unitalk then confirms the appropriate configuration.' : 'Start by describing the mission. Alma identifies the AI Collaborator, profiles, skills and access required before anything is activated.'],
    ['Can I try it for free?', 'Yes. Your first mission is included with no credit card for 7 days or up to 1 million tokens. Required catalog items are configured as part of that mission; they do not each have a separate trial.'],
    ['How do AI Collaborators evolve?', 'Unitalk maintains the profiles, skills and tools offered in the catalog. Your AI Collaborator can receive new versions without losing its identity, memory or mission history. Material changes remain subject to your approval.'],
    ['Who provides updates?', servers ? 'Unitalk manages Unitalk AI Cloud offer configuration. With another host, the responsibilities of Unitalk, the provider and your organization are defined before deployment.' : applications ? 'The publisher maintains its application. Unitalk maintains the integration when supplied by Unitalk; responsibilities are defined before connection.' : 'Unitalk maintains AI Collaborators, profiles and skills published by Unitalk. For an item supplied by the community or a partner, its page identifies the author and applicable maintenance terms.'],
  ]
  return <section id="marketplace-faq" aria-labelledby="marketplace-faq-title" className="mt-16 border-t border-[#D8D0C2] pt-12"><div className="grid gap-9 lg:grid-cols-[.72fr_1.28fr] lg:gap-16"><div><Kicker>{lang === 'fr' ? 'Questions pratiques' : 'Practical questions'}</Kicker><h2 id="marketplace-faq-title" className="mt-5 max-w-lg text-balance text-[clamp(2.35rem,4.5vw,4.25rem)] font-semibold leading-[.95] tracking-[-.06em]">{lang === 'fr' ? <>Avant de choisir<span className="block text-[#D10E63]">votre Collaborateur IA.</span></> : <>Before choosing<span className="block text-[#D10E63]">your AI Collaborator.</span></>}</h2></div><div className="border-t border-[#CFC5B5]">{questions.map(([question, answer]) => <details key={question} className="group border-b border-[#CFC5B5]"><summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-4 text-left text-[15px] font-bold marker:content-none"><span>{question}</span><span aria-hidden className="flex size-8 shrink-0 items-center justify-center rounded-full border border-[#D10E63]/25 bg-[#FBEAF1] text-lg font-normal text-[#D10E63] transition-transform group-open:rotate-45">+</span></summary><p className="max-w-2xl pb-6 pr-10 text-sm leading-7 text-[#625B50]">{answer}</p></details>)}</div></div></section>
}

function withAlmaAvatar(value: string) {
  return value.split('Alma').map((part, index) => <span key={`${part}-${index}`}>{index > 0 && <><AlmaInline className="mr-1" />Alma</>}{part}</span>)
}

function MarketplaceSidebarCatalog({ items, allItems, activeFacet, onFacet, availability, onAvailability, modelType, onModelType, query, onQuery, visibleCount, onShowMore, lang, category, labels }: {
  items: MarketplaceItem[]
  allItems: MarketplaceItem[]
  activeFacet: string
  onFacet: (facet: string) => void
  availability: string
  onAvailability: (status: string) => void
  modelType: string
  onModelType: (type: string) => void
  query: string
  onQuery: (query: string) => void
  visibleCount: number
  onShowMore: () => void
  lang: Lang
  category: Category
  labels: { clear: string; allItems: string; skillCategories: string; applicationCategories: string; serverCategories: string; result: string; results: string; available: string; preparation: string; addProfile: string; showMore: string }
}) {
  const labelsByFacet = category.id === 'competences' ? Object.fromEntries(PROFILE_DEPARTMENTS.map((department) => [department.id, department.label])) : category.id === 'applications' ? APP_CATEGORY_LABELS : category.id === 'modeles-ia' ? { ...MODEL_MODALITY_LABELS, ...MODEL_CAPABILITY_LABELS } : category.id === 'serveurs-ia' ? SERVER_CATEGORY_LABELS : null
  const facetTitle = category.id === 'competences' ? labels.skillCategories : category.id === 'applications' ? labels.applicationCategories : category.id === 'serveurs-ia' ? labels.serverCategories : labels.allItems
  const hideFacetTitle = true
  const allItemsLabel = category.id === 'modeles-ia' ? (lang === 'fr' ? 'Tous les modèles IA' : 'All AI models') : labels.allItems
  const facets = [...new Set(allItems.flatMap((item) => item.facetKeys ?? (item.facetKey ? [item.facetKey] : [])))].map((facet) => ({
    id: facet,
    label: labelsByFacet?.[facet]?.[lang] ?? facet,
    count: allItems.filter((item) => item.facetKey === facet || item.facetKeys?.includes(facet)).length,
  })).sort((a, b) => category.id === 'competences'
    ? PROFILE_DEPARTMENTS.findIndex((department) => department.id === a.id) - PROFILE_DEPARTMENTS.findIndex((department) => department.id === b.id)
    : category.id === 'applications'
      ? APPLICATION_CATEGORY_ORDER.indexOf(a.id as typeof APPLICATION_CATEGORY_ORDER[number]) - APPLICATION_CATEGORY_ORDER.indexOf(b.id as typeof APPLICATION_CATEGORY_ORDER[number])
    : category.id === 'modeles-ia'
      ? [...MODEL_MODALITY_ORDER, ...MODEL_CAPABILITY_ORDER].indexOf(a.id as never) - [...MODEL_MODALITY_ORDER, ...MODEL_CAPABILITY_ORDER].indexOf(b.id as never)
      : category.id === 'serveurs-ia'
        ? ['unitalk-ai-cloud', 'open-source', 'hebergeurs'].indexOf(a.id) - ['unitalk-ai-cloud', 'open-source', 'hebergeurs'].indexOf(b.id)
        : a.label.localeCompare(b.label, lang))
  const visibleCatalogItems = items.slice(0, visibleCount)
  const modelTypes = [
    { id: 'proprietaire', label: lang === 'fr' ? 'Propriétaire' : 'Proprietary' },
    { id: 'poids-ouverts', label: lang === 'fr' ? 'Poids ouverts' : 'Open weights' },
    { id: 'open-source', label: 'Open source' },
  ].map((type) => ({ ...type, count: allItems.filter((item) => item.modelTypeKey === type.id).length }))

  return (
    <div>
      <div className="mb-5 lg:hidden">
        <label className={hideFacetTitle ? 'sr-only' : 'block font-mono text-[9px] font-black uppercase tracking-[.15em] text-[#766D61]'} htmlFor={`${category.id}-facet`}>{facetTitle}</label>
         <select id={`${category.id}-facet`} value={activeFacet} onChange={(event) => onFacet(event.target.value)} className={`${hideFacetTitle ? '' : 'mt-2 '}h-12 w-full rounded-full border border-[#CFC5B5] bg-[#FAF8F3] px-4 text-sm font-bold outline-none focus:border-[var(--facet-accent)] focus:ring-2 focus:ring-[#1C1A17]/10`} style={{ '--facet-accent': category.accent } as CSSProperties}>
          {category.id !== 'serveurs-ia' && <option value="">{allItemsLabel} · {allItems.length}</option>}
          {category.id === 'modeles-ia' ? <><optgroup label={lang === 'fr' ? 'Modalités' : 'Modalities'}>{facets.filter((facet) => (MODEL_MODALITY_ORDER as readonly string[]).includes(facet.id)).map((facet) => <option key={facet.id} value={facet.id}>{facet.label} · {facet.count}</option>)}</optgroup><optgroup label={lang === 'fr' ? 'Capacités' : 'Capabilities'}>{facets.filter((facet) => (MODEL_CAPABILITY_ORDER as readonly string[]).includes(facet.id)).map((facet) => <option key={facet.id} value={facet.id}>{facet.label} · {facet.count}</option>)}</optgroup></> : facets.map((facet) => <option key={facet.id} value={facet.id}>{facet.label} · {facet.count}</option>)}
         </select>
         <select aria-label={lang === 'fr' ? 'Statut' : 'Status'} value={availability} onChange={(event) => onAvailability(event.target.value)} className="mt-3 h-12 w-full rounded-full border border-[#CFC5B5] bg-[#FAF8F3] px-4 text-sm font-bold outline-none"><option value="">{lang === 'fr' ? 'Tous les statuts' : 'All statuses'}</option><option value="disponible">{labels.available}</option>{category.id === 'applications' && <option value="bientot">{labels.preparation}</option>}</select>
        {category.id === 'modeles-ia' && <select aria-label={lang === 'fr' ? 'Type de modèle' : 'Model type'} value={modelType} onChange={(event) => onModelType(event.target.value)} className="mt-3 h-12 w-full rounded-full border border-[#CFC5B5] bg-[#FAF8F3] px-4 text-sm font-bold outline-none focus:border-[var(--facet-accent)] focus:ring-2 focus:ring-[#1C1A17]/10" style={{ '--facet-accent': category.accent } as CSSProperties}><option value="">{lang === 'fr' ? 'Tous les types' : 'All types'}</option>{modelTypes.map((type) => <option key={type.id} value={type.id}>{type.label} · {type.count}</option>)}</select>}
        <label className="relative mt-3 block w-full"><span className="sr-only">{category.search[lang]}</span><input type="search" value={query} onChange={(event) => onQuery(event.target.value)} placeholder={category.search[lang]} className="h-12 w-full rounded-full border border-[#CFC5B5] bg-[#FAF8F3] px-5 pr-12 text-sm outline-none transition-[border-color,box-shadow,background-color] placeholder:text-[#857C6E] focus:border-[var(--facet-accent)] focus:bg-white focus:ring-4 focus:ring-[#1C1A17]/[.05]" style={{ '--facet-accent': category.accent } as CSSProperties} />{query && <button type="button" onClick={() => onQuery('')} aria-label={labels.clear} className="absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-lg text-[#625B50] outline-none hover:bg-[#EAE3D4] focus-visible:ring-2 focus-visible:ring-[var(--facet-accent)]">×</button>}</label>
      </div>

      <div className="grid gap-7 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start xl:grid-cols-[240px_minmax(0,1fr)]">
        <div className="scrollbar-hide sticky top-[164px] hidden max-h-[calc(100dvh-180px)] overflow-y-auto pr-1 lg:block">
          <aside className="rounded-[18px] border border-[#D8D0C2] bg-[#EAE3D4] p-3">
            {!hideFacetTitle && <p className="px-3 pb-3 pt-2 font-mono text-[9px] font-black uppercase tracking-[.16em] text-[#766D61]">{facetTitle}</p>}
             <label className="relative mb-3 block w-full"><span className="sr-only">{category.search[lang]}</span><input type="search" value={query} onChange={(event) => onQuery(event.target.value)} placeholder={category.search[lang]} className="h-10 w-full rounded-xl border border-[#CFC5B5] bg-[#FAF8F3] px-3 pr-9 text-xs outline-none transition-[border-color,box-shadow,background-color] placeholder:text-[#857C6E] focus:border-[var(--facet-accent)] focus:bg-white focus:ring-2 focus:ring-[#1C1A17]/10" style={{ '--facet-accent': category.accent } as CSSProperties} />{query && <button type="button" onClick={() => onQuery('')} aria-label={labels.clear} className="absolute right-1 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-base text-[#625B50] outline-none hover:bg-[#EAE3D4] focus-visible:ring-2 focus-visible:ring-[var(--facet-accent)]">×</button>}</label>
             <select aria-label={lang === 'fr' ? 'Statut' : 'Status'} value={availability} onChange={(event) => onAvailability(event.target.value)} className="mb-3 h-10 w-full rounded-xl border border-[#CFC5B5] bg-[#FAF8F3] px-3 text-xs font-bold outline-none"><option value="">{lang === 'fr' ? 'Tous les statuts' : 'All statuses'}</option><option value="disponible">{labels.available}</option>{category.id === 'applications' && <option value="bientot">{labels.preparation}</option>}</select>
            {category.id !== 'serveurs-ia' && <><button type="button" aria-pressed={!activeFacet} onClick={() => onFacet('')} className={`flex min-h-11 w-full items-center justify-between rounded-xl px-3 text-left text-[13px] font-bold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[var(--facet-accent)] ${!activeFacet ? 'bg-[#181615] text-white' : 'text-[#4E483F] hover:bg-[#F3EFE6]'}`} style={{ '--facet-accent': category.accent } as CSSProperties}><span>{allItemsLabel}</span><span className={!activeFacet ? 'text-[#F2A4C5]' : 'text-[#857C6E]'}>{allItems.length}</span></button><div className="my-2 border-t border-[#CFC5B5]" /></>}
            {category.id === 'modeles-ia' ? <>{([['Modalités', 'Modalities', MODEL_MODALITY_ORDER], ['Capacités', 'Capabilities', MODEL_CAPABILITY_ORDER]] as const).map(([frTitle, enTitle, keys], groupIndex) => <div key={frTitle}>{groupIndex > 0 && <div className="my-3 border-t border-[#CFC5B5]"/>}<p className="px-3 pb-2 font-mono text-[9px] font-black uppercase tracking-[.16em] text-[#766D61]">{lang === 'fr' ? frTitle : enTitle}</p>{facets.filter((facet) => (keys as readonly string[]).includes(facet.id)).map((facet) => <button key={facet.id} type="button" aria-pressed={activeFacet === facet.id} onClick={() => onFacet(facet.id)} className={`flex min-h-10 w-full items-center justify-between rounded-xl px-3 text-left text-[12px] font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[var(--facet-accent)] ${activeFacet === facet.id ? 'bg-[var(--facet-accent)] text-white' : 'text-[#4E483F] hover:bg-[#F3EFE6]'}`} style={{ '--facet-accent': category.accent } as CSSProperties}><span>{facet.label}</span><span className={activeFacet === facet.id ? 'text-white/70' : 'text-[#857C6E]'}>{facet.count}</span></button>)}</div>)}</> : facets.map((facet) => <button key={facet.id} type="button" aria-pressed={activeFacet === facet.id} onClick={() => onFacet(facet.id)} className={`flex min-h-10 w-full items-center justify-between rounded-xl px-3 text-left text-[12px] font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[var(--facet-accent)] ${activeFacet === facet.id ? 'bg-[var(--facet-accent)] text-white' : 'text-[#4E483F] hover:bg-[#F3EFE6]'}`} style={{ '--facet-accent': category.accent } as CSSProperties}><span>{facet.label}</span><span className={activeFacet === facet.id ? 'text-white/70' : 'text-[#857C6E]'}>{facet.count}</span></button>)}
            {category.id === 'modeles-ia' && <><div className="my-3 border-t border-[#CFC5B5]"/><p className="px-3 pb-2 font-mono text-[9px] font-black uppercase tracking-[.16em] text-[#766D61]">{lang === 'fr' ? 'Type de modèle' : 'Model type'}</p>{modelTypes.map((type) => <button key={type.id} type="button" aria-pressed={modelType === type.id} onClick={() => onModelType(modelType === type.id ? '' : type.id)} className={`flex min-h-10 w-full items-center justify-between rounded-xl px-3 text-left text-[12px] font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#C80B5B] ${modelType === type.id ? 'bg-[#C80B5B] text-white' : 'text-[#4E483F] hover:bg-[#F3EFE6]'}`}><span>{type.label}</span><span className={modelType === type.id ? 'text-white/70' : 'text-[#857C6E]'}>{type.count}</span></button>)}</>}
          </aside>
          {category.id === 'applications' && <p className="px-3 pt-4 text-xs font-semibold leading-5 text-[#625B50]">{lang === 'fr' ? 'Le catalogue présente les connecteurs actuellement référencés. Disponibilité, accès et actions sont confirmés avant connexion.' : 'The catalog lists currently referenced connectors. Availability, access and actions are confirmed before connection.'}</p>}
        </div>

        <div className="min-w-0">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4"><p className="sr-only" aria-live="polite">{items.length} {items.length === 1 ? labels.result : labels.results}</p>{category.id === 'modeles-ia' && <p className="text-xs font-semibold leading-5 text-[#625B50]">{lang === 'fr' ? 'Utilisez les modèles avec vos crédits Unitalk prépayés ou vos propres clés API.' : 'Use models with prepaid Unitalk credits or your own API keys.'}</p>}{!['competences', 'applications'].includes(category.id) && !(category.id === 'serveurs-ia' && activeFacet === 'open-source') && <Link href={category.href} className="hidden min-h-10 shrink-0 items-center border-b border-[#857C6E] text-xs font-bold text-[#625B50] outline-none hover:text-[#1C1A17] focus-visible:ring-2 focus-visible:ring-[var(--facet-accent)] sm:inline-flex" style={{ '--facet-accent': category.accent } as CSSProperties}>{category.explain[lang]}<span aria-hidden className="ml-3">↗</span></Link>}</div>
          {items.length > 0 ? <><div className="mt-4 grid auto-rows-fr gap-4 md:grid-cols-2">{visibleCatalogItems.map((item) => category.id === 'competences' ? <SkillMarketplaceCard key={item.key} item={item} lang={lang} category={category} addLabel={labels.addProfile} /> : category.id === 'modeles-ia' ? <ModelMarketplaceCard key={item.key} item={item} lang={lang} /> : <CatalogItemCard key={item.key} item={item} lang={lang} category={category} labels={{ details: category.action[lang], add: labels.addProfile }} />)}{category.id === 'modeles-ia' && visibleCatalogItems.length === items.length && <CustomModelEndpointCard lang={lang} />}{!['competences', 'modeles-ia'].includes(category.id) && category.missing && visibleCatalogItems.length === items.length && <MissingItemCard content={category.missing} lang={lang} accent={category.accent} hideEyebrow={category.id === 'serveurs-ia'} />}</div>{visibleCatalogItems.length < items.length && <button type="button" onClick={onShowMore} className="mx-auto mt-8 flex min-h-12 items-center justify-center rounded-full border border-[#1C1A17] px-7 text-sm font-bold outline-none transition-colors hover:bg-[#181615] hover:text-white focus-visible:ring-2 focus-visible:ring-[var(--facet-accent)]" style={{ '--facet-accent': category.accent } as CSSProperties}>{labels.showMore}<span aria-hidden className="ml-2">↓</span></button>}</> : <div className="mt-5 rounded-[18px] border border-dashed border-[#CFC5B5] bg-[#FAF8F3] p-8"><h3 className="text-xl font-semibold">{lang === 'fr' ? 'Aucun résultat dans cette catégorie.' : 'No results in this category.'}</h3><button type="button" onClick={() => onQuery('')} className="mt-4 text-sm font-bold underline underline-offset-4" style={{ color: category.accent }}>{labels.clear}</button></div>}
        </div>
      </div>
      {category.id === 'serveurs-ia' && activeFacet === 'open-source' && <section className="mt-12 overflow-hidden rounded-[22px] bg-[#181615] p-7 text-white sm:mt-16 sm:p-9"><p className="font-mono text-[9px] font-black uppercase tracking-[.16em] text-[#F2A4C5]">{lang === 'fr' ? 'Applications open source' : 'Open-source applications'}</p><h2 className="mt-4 max-w-4xl text-[clamp(1.8rem,3vw,3rem)] font-semibold leading-[1.02] tracking-[-.045em]">{lang === 'fr' ? 'Déployez des logiciels open source sur votre serveur privé.' : 'Deploy open-source software on your private server.'}</h2><p className="mt-4 max-w-3xl text-sm leading-7 text-[#CFC6B8]">{lang === 'fr' ? 'Sans tarification Unitalk par utilisateur pour le logiciel, hors infrastructure, exploitation, support et services tiers. Les conditions de chaque licence restent applicables.' : 'No Unitalk per-user software fee, excluding infrastructure, operations, support and third-party services. Each project license still applies.'}</p><div className="mt-7 flex flex-wrap gap-3 text-xs font-bold text-[#F2A4C5]"><span>{OPEN_SOURCE_SERVER_APPS.length} applications</span><span>·</span><span>Open source</span><span>·</span><span>{lang === 'fr' ? 'Coûts confirmés avant déploiement' : 'Costs confirmed before deployment'}</span></div></section>}
      {category.id === 'competences' && category.missing && <section className="mt-12 overflow-hidden rounded-[22px] bg-[#181615] text-white sm:mt-16 lg:grid lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="p-7 sm:p-9"><p className="font-mono text-[9px] font-black uppercase tracking-[.16em] text-[#F2A4C5]">{lang === 'fr' ? 'Compétence sur mesure' : 'Custom skill'}</p><h2 className="mt-4 max-w-3xl text-[clamp(1.8rem,3vw,3rem)] font-semibold leading-[1.02] tracking-[-.045em]">{lang === 'fr' ? 'Le savoir-faire dont votre Collaborateur IA a besoin n’existe pas encore ?' : 'Can’t find the skill your AI Collaborator needs?'}</h2><p className="mt-4 max-w-3xl text-sm leading-7 text-[#CFC6B8]">{lang === 'fr' ? 'Décrivez le résultat attendu. Alma vous aide à formaliser une méthode claire, testable et réutilisable pour vos missions.' : 'Describe the expected outcome. Alma helps you formalize a clear, testable and reusable method for your missions.'}</p></div>
        <div className="flex flex-col gap-4 border-t border-white/10 p-7 lg:items-end lg:border-l lg:border-t-0 lg:p-9"><Link href={category.missing.href} className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#F3EFE6] px-6 text-sm font-bold text-[#181615] lg:w-auto">{lang === 'fr' ? 'Créer ma compétence' : 'Create my skill'}<span aria-hidden className="ml-2">→</span></Link><Link href="/co-createur-ia" className="text-center text-xs font-bold text-[#F2A4C5] underline decoration-white/20 underline-offset-4">{lang === 'fr' ? 'Proposer une compétence à la Marketplace' : 'Submit a skill to the Marketplace'}</Link></div>
      </section>}
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
        <aside className="scrollbar-hide sticky top-[164px] hidden max-h-[calc(100dvh-180px)] overflow-y-auto rounded-[18px] border border-[#D8D0C2] bg-[#EAE3D4] p-3 lg:block">
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
        <div className="p-7 sm:p-9"><p className="font-mono text-[9px] font-black uppercase tracking-[.16em] text-[#F2A4C5]">{lang === 'fr' ? 'Nouveau profil métier' : 'New job profile'}</p><h2 className="mt-4 max-w-3xl text-[clamp(1.8rem,3vw,3rem)] font-semibold leading-[1.02] tracking-[-.045em]">{category.missing!.title[lang]}</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-[#CFC6B8]">{category.missing!.body[lang]}</p></div>
        <div className="flex flex-col gap-4 border-t border-white/10 p-7 lg:items-end lg:border-l lg:border-t-0 lg:p-9"><Link href={category.missing!.href} className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#F3EFE6] px-6 text-sm font-bold text-[#181615] lg:w-auto">{category.missing!.action[lang]}<span aria-hidden className="ml-2">→</span></Link><Link href="/co-createur-ia" className="text-center text-xs font-bold text-[#F2A4C5] underline decoration-white/20 underline-offset-4">{lang === 'fr' ? 'Proposer un profil à la Marketplace' : 'Submit a profile to the Marketplace'}</Link></div>
      </section>
    </div>
  )
}

function ProfileMarketplaceCard({ item, labels }: { item: MarketplaceItem; labels: { firstMission: string; addProfile: string } }) {
  return (
    <Link id={item.key.replace('profil-', '')} href={item.addHref!} aria-label={`${labels.addProfile} : ${item.title}`} className="group relative flex min-h-[245px] flex-col overflow-hidden rounded-[16px] border border-[#D8D0C2] bg-[#FBF9F4] p-5 pb-14 outline-none transition-[transform,border-color,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-[#C80B5B] hover:bg-[#FFFDF9] hover:shadow-[0_18px_45px_-38px_rgba(28,26,23,.8)] focus-visible:border-[#C80B5B] focus-visible:ring-2 focus-visible:ring-[#C80B5B] focus-visible:ring-offset-2 sm:min-h-[265px] sm:pb-5">
      <div aria-hidden className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-[#C80B5B] transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100" />
      <div className="min-w-0">
        <p className="font-mono text-[9px] font-black uppercase tracking-[.13em] text-[#B00C54]">{item.meta}</p>
        <h3 className="mt-2 line-clamp-2 text-[22px] font-semibold leading-none tracking-[-.04em] text-[#1C1A17]">{item.title}</h3>
      </div>
      <p className="mt-4 line-clamp-2 text-[13px] font-medium leading-[1.35rem] text-[#3F3A33] sm:text-[14px] sm:leading-6 sm:text-[#4E483F]">{item.description}</p>
      {item.starterMission && <div className="relative mt-4 overflow-hidden rounded-xl bg-[#F0EBE1]"><dl className="p-3.5 transition-[opacity,transform] duration-200 sm:group-hover:-translate-y-1 sm:group-hover:opacity-0 sm:group-focus-visible:-translate-y-1 sm:group-focus-visible:opacity-0"><dt className="font-mono text-[9px] font-black uppercase tracking-[.14em] text-[#857C6E]">{labels.firstMission}</dt><dd className="mt-1.5 line-clamp-2 text-[13px] font-bold leading-5 text-[#322E29]">{item.starterMission}</dd></dl><span aria-hidden className="absolute inset-0 hidden translate-y-2 items-center justify-between bg-[#C80B5B] px-4 text-xs font-bold text-white opacity-0 transition-[opacity,transform] duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:flex">{labels.addProfile}<span className="ml-3 transition-transform group-hover:translate-x-1 group-focus-visible:translate-x-1">→</span></span></div>}
      <span aria-hidden className="absolute bottom-4 right-4 flex size-8 items-center justify-center rounded-full bg-[#C80B5B] text-sm font-bold text-white sm:hidden">→</span>
    </Link>
  )
}

function SkillMarketplaceCard({ item, lang, category, addLabel }: { item: MarketplaceItem; lang: Lang; category: Category; addLabel: string }) {
  return (
    <Link href={item.addHref!} aria-label={`${addLabel} : ${item.title}`} className="group relative flex min-h-[245px] flex-col overflow-hidden rounded-[16px] border border-[#D8D0C2] bg-[#FBF9F4] p-5 pb-14 text-left outline-none transition-[transform,border-color,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-[var(--profile-accent)] hover:bg-[#FFFDF9] hover:shadow-[0_18px_45px_-38px_rgba(28,26,23,.8)] focus-visible:border-[var(--profile-accent)] focus-visible:ring-2 focus-visible:ring-[var(--profile-accent)] focus-visible:ring-offset-2 sm:min-h-[265px] sm:pb-5" style={{ '--profile-accent': category.accent } as CSSProperties}>
      <div aria-hidden className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-[var(--profile-accent)] transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100" />
      <div className="min-w-0"><p className="font-mono text-[9px] font-black uppercase tracking-[.13em] text-[var(--profile-accent)]">{item.meta}</p><h3 className="mt-2 line-clamp-2 text-[22px] font-semibold leading-none tracking-[-.04em] text-[#1C1A17]">{item.title}</h3></div>
      <p className="mt-4 line-clamp-2 text-[13px] font-medium leading-[1.35rem] text-[#3F3A33] sm:text-[14px] sm:leading-6 sm:text-[#4E483F]">{item.description}</p>
      <div className="relative mt-4 overflow-hidden rounded-xl bg-[#F0EBE1]">
        <dl className="p-3.5 transition-[opacity,transform] duration-200 sm:group-hover:-translate-y-1 sm:group-hover:opacity-0 sm:group-focus-visible:-translate-y-1 sm:group-focus-visible:opacity-0"><dt className="font-mono text-[9px] font-black uppercase tracking-[.14em] text-[#857C6E]">{lang === 'fr' ? 'Contexte → résultat' : 'Context → outcome'}</dt><dd className="mt-1.5 line-clamp-2 text-[12px] font-semibold leading-5 text-[#322E29]">{item.input ?? (lang === 'fr' ? 'Contexte défini avec Alma' : 'Context scoped with Alma')} → {item.result ?? (lang === 'fr' ? 'Résultat documenté à valider' : 'Documented result ready for approval')}</dd></dl>
        <span aria-hidden className="absolute inset-0 hidden translate-y-2 items-center justify-between bg-[var(--profile-accent)] px-4 text-xs font-bold text-white opacity-0 transition-[opacity,transform] duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:flex">{addLabel}<span className="ml-3 transition-transform group-hover:translate-x-1 group-focus-visible:translate-x-1">→</span></span>
      </div>
      <span aria-hidden className="absolute bottom-4 right-4 flex size-8 items-center justify-center rounded-full bg-[var(--profile-accent)] text-sm font-bold text-white sm:hidden">→</span>
    </Link>
  )
}

function ModelMarketplaceCard({ item, lang }: { item: MarketplaceItem; lang: Lang }) {
  return (
    <Link id={item.key} href={item.href ?? `/decouvrir?source=marketplace&intention=nouveau-modele-ia&q=${encodeURIComponent(item.title)}`} className="group relative flex min-h-[190px] flex-col overflow-hidden rounded-[16px] border border-[#D8D0C2] bg-[#FBF9F4] p-4 text-left outline-none transition hover:-translate-y-0.5 hover:border-[#1D6692] focus-visible:ring-2 focus-visible:ring-[#1D6692] sm:min-h-[200px]">
       <div className="flex items-center gap-3 pr-24">
        <span aria-hidden className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#FAF8F3] text-[#1C1A17] ring-1 ring-[#D8D0C2]"><ModelProviderLogo maker={item.origin} /></span>
          <div className="min-w-0"><p className="font-mono text-[9px] font-black uppercase tracking-[.13em] text-[#B00C54]">{item.origin}</p><h3 className="mt-1 line-clamp-2 text-[22px] font-semibold leading-none tracking-[-.04em] text-[#1C1A17]">{item.title}</h3></div>
      </div>
      <p className="mt-3 line-clamp-2 text-[13px] font-medium leading-5 text-[#3F3A33] sm:text-[14px] sm:text-[#4E483F]">{item.description}</p>
      <div className="mt-3 flex flex-wrap items-center gap-1.5 rounded-xl bg-[#F0EBE1] p-2.5">
          {item.modelModalities?.map((modality) => <span key={modality.fr} className="rounded-full border border-[#CFC5B5] bg-[#FAF8F3] px-2.5 py-1 text-[10px] font-semibold text-[#4E483F]">{modality[lang]}</span>)}
          {item.modelCapabilities?.map((capability) => <span key={capability.fr} className="rounded-full border border-[#1D6692]/25 bg-[#E8F2F8] px-2.5 py-1 text-[10px] font-semibold text-[#174F70]">{capability[lang]}</span>)}
       </div>
       {item.modelTypeKey && <span className="absolute right-4 top-4 rounded-full border border-[#B8AFA1] bg-transparent px-3 py-1.5 text-[9px] font-black uppercase tracking-[.1em] text-[#4E483F]">{item.modelTypeKey === 'open-source' ? 'Open source' : item.modelTypeKey === 'poids-ouverts' ? (lang === 'fr' ? 'Poids ouverts' : 'Open weights') : (lang === 'fr' ? 'Propriétaire' : 'Proprietary')}</span>}
       <span className="mt-auto pt-3 text-xs font-bold text-[#1D6692]">{lang === 'fr' ? 'Sélectionner ce modèle' : 'Select this model'}<ArrowRight className="ml-2 inline size-3.5 transition-transform group-hover:translate-x-1"/></span>
    </Link>
  )
}

function CustomModelEndpointCard({ lang }: { lang: Lang }) {
  return (
    <Link href="/decouvrir?source=marketplace&intention=nouveau-modele-ia" className="flex min-h-[190px] flex-col justify-between rounded-[16px] border border-dashed border-[#AFA596] bg-transparent p-4 outline-none hover:border-[#1D6692] focus-visible:ring-2 focus-visible:ring-[#1D6692] sm:min-h-[200px]">
      <div><p className="font-mono text-[9px] font-black uppercase tracking-[.13em] text-[#766D61]">Custom endpoint</p><h3 className="mt-3 text-[22px] font-semibold leading-[1.05] tracking-[-.04em] text-[#1C1A17]">{lang === 'fr' ? 'Votre modèle, votre fournisseur.' : 'Your model, your provider.'}</h3></div>
      <p className="mt-4 text-[13px] font-medium leading-5 text-[#4E483F] sm:text-[14px]">{lang === 'fr' ? 'Demandez l’étude d’un modèle ou fournisseur grâce à un endpoint personnalisé.' : 'Request an assessment for any model or provider through a custom endpoint.'}</p>
      <span className="mt-3 text-xs font-bold text-[#1D6692]">{lang === 'fr' ? 'Proposer un modèle' : 'Suggest a model'} →</span>
    </Link>
  )
}

function ModelProviderLogo({ maker }: { maker?: string }) {
  const props = { size: 24 }
  const localLogos: Record<string, string> = {
    'Kling AI': '/logos/kling.svg',
    ByteDance: '/logos/bytedance.svg',
    Alibaba: '/logos/alibaba.svg',
    Ideogram: '/logos/ideogram.svg',
    xAI: '/logos/grok.svg',
    Deepgram: '/logos/deepgram.svg',
  }
  if (maker && localLogos[maker]) return <Image src={localLogos[maker]} alt="" width={24} height={24} className="size-6 object-contain brightness-0" />
  if (maker === 'OpenAI') return <OpenAI {...props} />
  if (maker === 'Anthropic') return <Anthropic {...props} />
  if (maker === 'Google' || maker === 'Google Gemini') return <Gemini {...props} />
  if (maker === 'DeepSeek') return <DeepSeek {...props} />
  if (maker === 'Moonshot AI') return <Kimi {...props} />
  if (maker === 'Tencent') return <Tencent {...props} />
  if (maker === 'Xiaomi') return <XiaomiMiMo {...props} />
  if (maker === 'Z.ai') return <Zhipu {...props} />
  if (maker === 'NVIDIA') return <Nvidia {...props} />
  if (maker === 'Black Forest Labs' || maker === 'Black Forest') return <Flux {...props} />
  if (maker === 'Qwen') return <Qwen {...props} />
  if (maker === 'Mistral AI') return <Mistral {...props} />
  if (maker === 'MiniMax') return <Minimax {...props} />
  return <Cpu className="size-5" />
}

function CatalogItemCard({ item, lang, category, labels }: { item: MarketplaceItem; lang: Lang; category: Category; labels: { details: string; add: string } }) {
  const href = item.addHref ?? item.href
  const Icon = category.id === 'applications' ? AppWindow : category.id === 'modeles-ia' ? Cpu : Server
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
  if (category.id === 'serveurs-ia') {
    const isOpenSourceApp = item.facetKey === 'open-source'
    const content = <>
      <div aria-hidden className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-[#C80B5B] transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100" />
      <div className="flex items-center gap-3.5">{isOpenSourceApp && item.iconSlug && <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#FAF8F3] ring-1 ring-[#D8D0C2]"><OpenSourceAppLogo slug={item.iconSlug} /></span>}<div className="min-w-0"><p className="font-mono text-[9px] font-black uppercase tracking-[.13em] text-[#B00C54]">{item.meta}</p><h3 className="mt-2 line-clamp-2 text-[22px] font-semibold leading-none tracking-[-.04em] text-[#1C1A17]">{item.title}</h3></div></div>
      <p className="mt-4 line-clamp-2 text-[13px] font-medium leading-[1.35rem] text-[#3F3A33] sm:text-[14px] sm:leading-6 sm:text-[#4E483F]">{item.description}</p>
      <dl className="mt-4 rounded-xl bg-[#F0EBE1] p-3.5"><div><dt className="font-mono text-[9px] font-black uppercase tracking-[.14em] text-[#857C6E]">{firstLabel}</dt><dd className="mt-1 line-clamp-1 text-[12px] font-semibold leading-5 text-[#322E29]">{item.input ?? (lang === 'fr' ? 'Configuration précisée avec Alma' : 'Configuration scoped with Alma')}</dd></div><div className="mt-2 border-t border-[#D8D0C2] pt-2"><dt className="font-mono text-[9px] font-black uppercase tracking-[.14em] text-[#857C6E]">{secondLabel}</dt><dd className="mt-1 line-clamp-1 text-[12px] font-semibold leading-5 text-[#322E29]">{item.result ?? (lang === 'fr' ? 'Résultat documenté à valider' : 'Documented result ready for approval')}</dd></div></dl>
      {item.status && !item.pending && <p className="mt-3 text-[11px] font-bold text-[#766D61]">{item.status[lang]}</p>}
    </>
    const className = 'group relative flex min-h-[245px] flex-col overflow-hidden rounded-[16px] border border-[#D8D0C2] bg-[#FBF9F4] p-5 text-left outline-none transition-[transform,border-color,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-[#C80B5B] hover:bg-[#FFFDF9] hover:shadow-[0_18px_45px_-38px_rgba(28,26,23,.8)] focus-visible:border-[#C80B5B] focus-visible:ring-2 focus-visible:ring-[#C80B5B] focus-visible:ring-offset-2 sm:min-h-[265px]'
    return href ? <Link id={item.key.replace(/^(server|server-app|server-host)-/, '')} href={href} aria-label={`${action} : ${item.title}`} className={className}>{content}</Link> : <article className={className}>{content}</article>
  }
  if (category.id === 'applications' && href) {
    const applicationAction = item.pending ? (lang === 'fr' ? 'Demander l’accès' : 'Request access') : action
    return <Link id={item.key.replace(/^(application|integration)-/, '')} href={href} aria-label={`${applicationAction} : ${item.title}`} className="group relative flex min-h-[210px] flex-col overflow-hidden rounded-[16px] border border-[#D8D0C2] bg-[#FBF9F4] p-5 pb-14 text-left outline-none transition-[transform,border-color,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-[#C80B5B] hover:bg-[#FFFDF9] hover:shadow-[0_18px_45px_-38px_rgba(28,26,23,.8)] focus-visible:border-[#C80B5B] focus-visible:ring-2 focus-visible:ring-[#C80B5B] focus-visible:ring-offset-2 sm:min-h-[220px] sm:pb-16" style={{ '--profile-accent': category.accent } as CSSProperties}>
      <div aria-hidden className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-[#C80B5B] transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100" />
      <div className="flex items-center gap-3.5"><span className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full">{item.logoId ? <Image src={`https://assets.pipedream.net/s.v0/${item.logoId}/logo/96`} alt="" width={48} height={48} className="size-full object-contain" /> : <AppWindow className="size-5 text-[var(--profile-accent)]" />}</span><h3 className="min-w-0 line-clamp-2 text-[22px] font-semibold leading-none tracking-[-.04em] text-[#1C1A17]">{item.title}</h3></div>
      <p className="mt-4 line-clamp-2 text-[13px] font-medium leading-[1.35rem] text-[#3F3A33] sm:text-[14px] sm:leading-6 sm:text-[#4E483F]">{item.description}</p>
      {item.status && <span className="mt-3 text-[11px] font-bold text-[#766D61]">{item.status[lang]}</span>}
      <span aria-hidden className="absolute inset-x-5 bottom-5 hidden min-h-10 translate-y-2 items-center justify-between rounded-xl bg-[#C80B5B] px-4 text-xs font-bold text-white opacity-0 transition-[opacity,transform] duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:flex">{applicationAction}<span className="ml-3 transition-transform group-hover:translate-x-1 group-focus-visible:translate-x-1">→</span></span>
      <span aria-hidden className="absolute bottom-4 right-4 flex size-8 items-center justify-center rounded-full bg-[#C80B5B] text-sm font-bold text-white sm:hidden">→</span>
    </Link>
  }
  const content = <><div aria-hidden className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-[var(--profile-accent)] transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"/><div className="flex items-center gap-3.5"><span className={`flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full text-[var(--profile-accent)] ${category.id === 'applications' ? '' : 'bg-[color-mix(in_srgb,var(--profile-accent)_10%,transparent)] ring-1 ring-[color-mix(in_srgb,var(--profile-accent)_22%,transparent)]'}`}>{category.id === 'applications' && item.logoId ? <Image src={`https://assets.pipedream.net/s.v0/${item.logoId}/logo/96`} alt="" width={48} height={48} className="size-full object-contain" /> : <Icon className="size-5"/>}</span><div className="min-w-0"><p className="font-mono text-[9px] font-black uppercase tracking-[.13em] text-[var(--profile-accent)]">{item.meta}</p><h3 className="mt-1 line-clamp-2 text-[22px] font-semibold leading-none tracking-[-.04em] text-[#1C1A17]">{item.title}</h3></div></div><p className="mt-4 line-clamp-3 text-[13px] font-medium leading-[1.35rem] text-[#4E483F] sm:text-[14px] sm:leading-6">{item.description}</p><dl className="mt-4 rounded-xl bg-[#F0EBE1] p-3.5"><div><dt className="font-mono text-[9px] font-black uppercase tracking-[.14em] text-[#857C6E]">{firstLabel}</dt><dd className="mt-1 line-clamp-2 text-[12px] font-semibold leading-5 text-[#322E29]">{item.input ?? (lang === 'fr' ? 'Configuration précisée avec Alma' : 'Configuration scoped with Alma')}</dd></div><div className="mt-2 border-t border-[#D8D0C2] pt-2"><dt className="font-mono text-[9px] font-black uppercase tracking-[.14em] text-[#857C6E]">{secondLabel}</dt><dd className="mt-1 line-clamp-2 text-[12px] font-semibold leading-5 text-[#322E29]">{item.result ?? (lang === 'fr' ? 'Résultat documenté à valider' : 'Documented result ready for approval')}</dd></div></dl>{category.id === 'competences' && item.profileKeys && item.profileKeys.length > 0 && <div className="mt-3 flex flex-wrap gap-1.5">{item.profileKeys.slice(0, 2).map((slug) => <span key={slug} className="rounded-full border border-[#D8D0C2] px-2.5 py-1 text-[10px] font-semibold text-[#4E483F]">{PROFILE_NAMES.get(slug)?.[lang] ?? slug}</span>)}</div>}<div className="mt-auto pt-4"><div className="border-t border-[#DED6C8] pt-3 transition-colors group-hover:border-[var(--profile-accent)] group-focus-visible:border-[var(--profile-accent)]"><span className="flex min-h-10 items-center justify-between rounded-full border border-transparent text-xs font-bold text-[#1C1A17] transition-[color,background-color,border-color,padding] group-hover:border-[var(--profile-accent)] group-hover:bg-[var(--profile-accent)] group-hover:px-4 group-hover:text-white group-focus-visible:border-[var(--profile-accent)] group-focus-visible:bg-[var(--profile-accent)] group-focus-visible:px-4 group-focus-visible:text-white">{action}<span aria-hidden className="ml-3 transition-transform group-hover:translate-x-1 group-focus-visible:translate-x-1">→</span></span></div></div></>
  const className = "group relative flex min-h-[290px] flex-col overflow-hidden rounded-[16px] border border-[#D8D0C2] bg-[#FBF9F4] p-5 text-left outline-none transition-[transform,border-color,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-[var(--profile-accent)] hover:bg-[#FFFDF9] hover:shadow-[0_18px_45px_-38px_rgba(28,26,23,.8)] focus-visible:border-[var(--profile-accent)] focus-visible:ring-2 focus-visible:ring-[var(--profile-accent)] focus-visible:ring-offset-2 sm:min-h-[310px]"
  const style = { '--profile-accent': category.accent } as CSSProperties
  return href ? <Link href={href} aria-label={`${action} : ${item.title}`} className={className} style={style}>{content}</Link> : <article className={className} style={style}>{content}</article>
}

const OPEN_SOURCE_APP_ICONS = { n8n: siN8n, opencode: siOpencode, twenty: siTwenty, payload: siPayloadcms, jitsi: siJitsi, plane: siPlane } as const

function OpenSourceAppLogo({ slug }: { slug: string }) {
  if (slug === 'hermes') return <Image unoptimized src="https://raw.githubusercontent.com/NousResearch/hermes-agent/main/website/static/img/favicon.svg" alt="" width={32} height={32} className="size-8 object-contain" />
  if (slug === 'paperclip') return <Image unoptimized src="https://raw.githubusercontent.com/paperclipai/paperclip/master/docs/favicon.svg" alt="" width={32} height={32} className="size-8 rounded-md object-contain" />
  if (slug === 'gbrain') return <span aria-hidden className="text-[13px] font-black tracking-[-.06em] text-[#1C1A17]">GBrain</span>
  if (slug === 'honcho') return <Image unoptimized src="https://raw.githubusercontent.com/plastic-labs/honcho/main/assets/honcho.svg" alt="" width={38} height={24} className="h-6 w-9 object-contain" />
  if (slug === 'stalwart') return <Image unoptimized src="https://raw.githubusercontent.com/stalwartlabs/stalwart/main/img/logo-red.svg" alt="" width={38} height={24} className="h-6 w-9 object-contain" />
  if (slug === 'buzz') return <Image unoptimized src="https://raw.githubusercontent.com/block/buzz/main/desktop/public/buzz.svg" alt="" width={32} height={32} className="size-8 object-contain" />
  const icon = OPEN_SOURCE_APP_ICONS[slug as keyof typeof OPEN_SOURCE_APP_ICONS]
  if (!icon) return null
  return <svg aria-hidden viewBox="0 0 24 24" className="size-6" fill={`#${icon.hex}`}><path d={icon.path} /></svg>
}

function MissingItemCard({ content, lang, accent, hideEyebrow = false }: { content: NonNullable<Category['missing']>; lang: Lang; accent: string; hideEyebrow?: boolean }) {
  return (
    <Link href={content.href} className="group flex min-h-[240px] flex-col rounded-[16px] border border-dashed border-[#AFA596] bg-[#EAE3D4]/60 p-6 text-left transition-[border-color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:border-[var(--missing-accent)] hover:bg-[#EAE3D4] sm:min-h-[255px]" style={{ '--missing-accent': accent } as CSSProperties}>
      {!hideEyebrow && <p className="font-mono text-[9px] font-bold uppercase tracking-[.16em]" style={{ color: accent }}>{lang === 'fr' ? 'Sur demande' : 'On request'}</p>}
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
        <p className="font-mono text-[9px] font-black uppercase tracking-[.16em] text-[var(--profile-accent)]">{item.meta}</p>
        <h3 className="mt-3 line-clamp-2 text-[21px] font-semibold leading-[1.08] tracking-[-.04em] text-[#1C1A17] sm:mt-4 sm:text-[23px]">{item.title}</h3>
        <p className="mt-2.5 line-clamp-3 text-[13px] leading-[1.4rem] text-[#625B50] sm:mt-3 sm:leading-6">{item.description}</p>
        {['competences', 'applications', 'modeles-ia', 'serveurs-ia'].includes(category.id) && <div className="mt-3 grid gap-3 sm:mt-4 sm:grid-cols-[1fr_auto] sm:items-end"><dl className="grid gap-1.5 rounded-xl bg-[#F0EBE1] p-2.5 text-xs sm:gap-2 sm:p-3"><div><dt className="font-mono text-[9px] font-black uppercase tracking-[.12em] text-[#857C6E]">{category.id === 'competences' ? (lang === 'fr' ? 'Contexte d’application' : 'Application context') : category.id === 'applications' ? (lang === 'fr' ? 'Usage principal' : 'Primary use') : category.id === 'modeles-ia' ? (lang === 'fr' ? 'Sélection' : 'Selection') : (lang === 'fr' ? 'Contexte conseillé' : 'Recommended context')}</dt><dd className="mt-0.5 line-clamp-2 font-semibold leading-5 text-[#3F3A33]">{item.input ?? (lang === 'fr' ? 'Configuration précisée avec Alma' : 'Configuration scoped with Alma')}</dd></div><div className="border-t border-[#D8D0C2] pt-1.5 sm:pt-2"><dt className="font-mono text-[9px] font-black uppercase tracking-[.12em] text-[#857C6E]">{category.id === 'competences' ? (lang === 'fr' ? 'Résultat produit' : 'Produced result') : category.id === 'applications' ? (lang === 'fr' ? 'Action autorisée' : 'Authorized action') : category.id === 'modeles-ia' ? (lang === 'fr' ? 'Gouvernance' : 'Governance') : (lang === 'fr' ? 'Capacité apportée' : 'Provided capacity')}</dt><dd className="mt-0.5 line-clamp-2 font-semibold leading-5 text-[#3F3A33]">{item.result ?? (lang === 'fr' ? 'Résultat documenté à valider' : 'Documented result to approve')}</dd></div></dl>{category.id === 'competences' && item.profileKeys && item.profileKeys.length > 0 && <div className="hidden sm:block [@media(min-width:1024px)_and_(max-height:850px)]:hidden"><p className="font-mono text-[9px] font-black uppercase tracking-[.12em] text-[#857C6E]">{lang === 'fr' ? 'Profils compatibles' : 'Compatible profiles'}</p><div className="mt-2 flex flex-wrap gap-1.5">{item.profileKeys.slice(0, 2).map((slug) => <span key={slug} className="rounded-full border border-[#D8D0C2] px-2.5 py-1 text-[10px] font-semibold text-[#4E483F]">{PROFILE_NAMES.get(slug)?.[lang] ?? slug}</span>)}</div></div>}</div>}
        {category.id === 'competences' && <p className="mt-2 hidden text-[10px] font-semibold leading-4 text-[#766D61] sm:block [@media(min-width:1024px)_and_(max-height:850px)]:hidden">{item.proof}</p>}
        {category.id !== 'competences' && item.highlights && item.highlights.length > 0 && <div className="mt-4"><p className="font-mono text-[9px] font-black uppercase tracking-[.14em] text-[#857C6E]">{item.highlightsLabel}</p><ul className="mt-1.5 space-y-1">{item.highlights.map((highlight, index) => <li key={highlight} className={`gap-2 text-xs font-semibold leading-[1.15rem] text-[#4E483F] ${index > 0 ? 'hidden sm:flex' : 'flex'}`}><span aria-hidden className="mt-[7px] size-1 shrink-0 rounded-full bg-[var(--profile-accent)]"/>{highlight}</li>)}</ul></div>}
        <div className="mt-auto pt-5 sm:pt-6">
          <div className="border-t border-[#DED6C8] pt-4 transition-colors group-hover:border-[var(--profile-accent)] group-focus-visible:border-[var(--profile-accent)]">
            {category.id !== 'applications' && <p className="text-[10px] font-semibold text-[#857C6E]">{item.origin} · {item.status?.[lang]}</p>}
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
                <p className="font-mono text-xs font-black uppercase tracking-[.13em] text-[var(--profile-accent)]">{item.identityLabel}</p>
               <h3 className="mt-1 text-[24px] font-semibold leading-none tracking-[-.045em] text-[#1C1A17]">{item.title}</h3>
               <p className="mt-1.5 truncate text-[12px] font-bold text-[#4E483F]">{item.meta}</p>
             </div>
           </div>
               <p className="mt-4 line-clamp-2 text-[13px] font-medium leading-[1.35rem] text-[#3F3A33] sm:line-clamp-2 sm:text-[14px] sm:leading-6 sm:text-[#4E483F]">{item.description}</p>
               {item.starterMission && <dl className="mt-4 rounded-xl bg-[#F0EBE1] p-3.5"><div><dt className="font-mono text-xs font-black uppercase tracking-[.14em] text-[#857C6E]">{lang === 'fr' ? 'Première mission' : 'First mission'}</dt><dd className="mt-1.5 line-clamp-2 text-[13px] font-bold leading-5 text-[#322E29]">{item.starterMission}</dd>{item.starterResult && <dd className="mt-2 line-clamp-2 border-t border-[#D8D0C2] pt-2 text-xs font-semibold leading-5 text-[#625B50]"><span className="font-bold text-[#B00C54]">{lang === 'fr' ? 'Résultat :' : 'Outcome:'}</span> {item.starterResult}</dd>}</div></dl>}
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
