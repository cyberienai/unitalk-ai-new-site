import type { StoreItem } from '@/lib/store-catalog'

type SkillDefinition = [slug: string, name: string, description: string, facet: string, profiles: string[]]

const SHARED_SKILLS: SkillDefinition[] = [
  ['mustad-brand-voice', 'Appliquer la voix de marque', 'Applique le ton, le vocabulaire, le langage d’audience et le style de communication approuvés par la marque.', 'marketing', ['charge-prospection', 'commercial', 'responsable-editorial', 'redacteur-web', 'charge-relations-presse', 'responsable-influence', 'gestionnaire-campagnes-publicitaires']],
  ['mustad-approved-claims', 'Contrôler les allégations approuvées', 'Vérifie que les allégations produit, commerciales et de performance sont approuvées, justifiées et jamais inventées.', 'marketing', ['charge-prospection', 'commercial', 'responsable-editorial', 'redacteur-web', 'charge-relations-presse', 'responsable-influence', 'gestionnaire-campagnes-publicitaires']],
  ['mustad-evidence-provenance', 'Documenter la provenance des preuves', 'Associe aux résultats issus de données externes leur source, leur date, un lien de preuve et un niveau de confiance.', 'documents', ['charge-prospection', 'analyste-etudes-marche', 'responsable-crm', 'analyste-donnees', 'charge-relations-presse', 'analyste-etudes-qualitatives', 'controleur-gestion', 'analyste-financier', 'coordinateur-operations']],
  ['mustad-icp-scoring', 'Évaluer un profil client idéal', 'Évalue les prospects selon des critères, pondérations, seuils et règles de segmentation validés.', 'ventes', ['charge-prospection', 'analyste-etudes-marche', 'responsable-crm']],
  ['mustad-deduplication', 'Détecter les doublons CRM', 'Détecte les contacts et entreprises susceptibles d’être des doublons avant leur création ou leur enrichissement.', 'ventes', ['charge-prospection', 'responsable-crm', 'analyste-donnees']],
  ['mustad-data-quality', 'Contrôler la qualité des données', 'Classe les fiches comme vérifiées, partielles, incomplètes ou conflictuelles et signale les données obligatoires manquantes.', 'documents', ['charge-prospection', 'responsable-crm', 'analyste-donnees']],
  ['mustad-data-conflict-policy', 'Gérer les conflits de données', 'Protège les données CRM saisies manuellement et définit comment comparer, conserver et escalader les sources contradictoires.', 'documents', ['responsable-crm', 'analyste-donnees']],
  ['mustad-consent-policy', 'Vérifier le consentement de communication', 'Contrôle les refus, interdictions de contact et autorisations email ou SMS avant toute action externe.', 'relation-client', ['charge-prospection', 'commercial', 'support-client', 'agent-telephonique', 'responsable-relation-client', 'responsable-crm', 'responsable-reussite-client']],
  ['mustad-human-approval-policy', 'Appliquer les validations humaines', 'Applique les règles communes d’approbation : responsable, étape, décision enregistrée et date d’expiration.', 'operations', []],
  ['mustad-territory-and-ownership-policy', 'Appliquer les territoires et responsabilités commerciales', 'Détermine le responsable commercial, le routage territorial, l’éligibilité et le périmètre d’accès des équipes terrain.', 'ventes', ['charge-prospection', 'support-client', 'agent-telephonique', 'responsable-relation-client', 'commercial-terrain', 'responsable-comptes-cles']],
  ['mustad-meeting-brief', 'Préparer une fiche de rendez-vous', 'Produit une fiche de préparation concise et factuelle à partir du CRM, des données enrichies et du contexte commercial.', 'reunions', ['commercial', 'assistante-de-direction', 'responsable-comptes-cles', 'commercial-terrain']],
  ['mustad-data-privacy-policy', 'Appliquer la politique de confidentialité', 'Applique les règles relatives aux données sensibles, transcriptions, retours, durées de conservation, anonymisation et droits d’accès.', 'documents', ['responsable-crm', 'analyste-donnees', 'commercial', 'assistante-de-direction', 'responsable-reussite-client', 'responsable-experience-client', 'analyste-etudes-qualitatives', 'commercial-terrain']],
  ['mustad-approved-template-policy', 'Utiliser uniquement les modèles approuvés', 'Garantit que seuls les modèles approuvés de messages, réponses, contenus, relations presse et campagnes sont utilisés automatiquement.', 'marketing', ['charge-prospection', 'commercial', 'support-client', 'responsable-relation-client', 'responsable-editorial', 'redacteur-web', 'charge-relations-presse']],
  ['mustad-audit-and-action-log', 'Journaliser les actions et décisions', 'Crée des traces structurées des entrées, résultats, preuves, validations, actions, échecs et nouvelles tentatives.', 'operations', []],
]

const PROFILE_SKILLS: SkillDefinition[] = [
  // Découverte du profil client idéal
  ['mustad-prospect-research', 'Rechercher des prospects avec preuves', 'Recherche des prospects dans les sources publiques autorisées et extrait des informations structurées accompagnées de preuves.', 'ventes', ['charge-prospection', 'analyste-etudes-marche']],
  ['mustad-prospect-segmentation', 'Segmenter les prospects', 'Détermine le segment d’un prospect, son exclusion éventuelle ou la nécessité d’une vérification humaine.', 'ventes', ['charge-prospection', 'analyste-etudes-marche']],
  ['mustad-prospect-review-queue', 'Préparer une file de vérification des prospects', 'Prépare pour validation humaine le score, les raisons, les preuves, le segment et la prochaine action recommandée.', 'ventes', ['charge-prospection']],
  ['mustad-source-licence-check', 'Vérifier les licences des sources', 'Empêche l’utilisation de sources non approuvées, interdites ou non conformes.', 'documents', ['charge-prospection', 'analyste-etudes-marche']],

  // Enrichissement
  ['mustad-enrichment-policy', 'Appliquer une politique d’enrichissement', 'Définit les données nécessaires pour un enrichissement élémentaire ou complet selon chaque segment.', 'ventes', ['charge-prospection', 'responsable-crm']],
  ['mustad-enrichment-normalisation', 'Normaliser les données enrichies', 'Standardise les noms, adresses, téléphones, domaines, fonctions et informations d’entreprise.', 'ventes', ['responsable-crm', 'analyste-donnees']],
  ['mustad-enrichment-provenance', 'Tracer la provenance d’un enrichissement', 'Enregistre la source, la date, la méthode de vérification et le niveau de confiance de chaque donnée enrichie.', 'documents', ['responsable-crm', 'analyste-donnees']],
  ['mustad-enrichment-review-workflow', 'Organiser la vérification des enrichissements', 'Oriente les mises à jour proposées, conflits et fiches incomplètes vers une validation humaine.', 'ventes', ['charge-prospection', 'responsable-crm']],

  // Rédaction de messages de prospection
  ['mustad-segment-messaging', 'Adapter le message au segment', 'Adapte la proposition de valeur, le ton, les objections et l’appel à l’action à chaque segment.', 'ventes', ['charge-prospection', 'commercial']],
  ['mustad-factual-personalisation', 'Personnaliser à partir de faits vérifiés', 'Personnalise les messages uniquement avec des données vérifiées et bloque les affirmations non étayées.', 'ventes', ['charge-prospection', 'commercial']],
  ['mustad-three-touch-cadence', 'Préparer une séquence en trois contacts', 'Crée des séquences approuvées en trois contacts avec le bon calendrier, les bons canaux et les règles d’arrêt.', 'ventes', ['charge-prospection']],
  ['mustad-outreach-tier-policy', 'Appliquer les règles par niveau de prospection', 'Applique les règles de validation, d’envoi, de plafond et d’exception propres à chaque niveau de prospection.', 'ventes', ['charge-prospection', 'directeur-commercial']],
  ['mustad-sequence-enrolment', 'Inscrire un contact dans une séquence', 'Prépare les séquences approuvées et inscrit uniquement les contacts éligibles lorsque les règles le permettent.', 'ventes', ['charge-prospection']],

  // Tri et routage des réponses
  ['mustad-reply-classification', 'Classer les réponses reçues', 'Classe les réponses par intention : intéressé, plus tard, mauvais contact, objection, refus, sensible ou ambiguë.', 'relation-client', ['support-client', 'agent-telephonique', 'responsable-relation-client']],
  ['mustad-hot-reply-policy', 'Détecter les réponses prioritaires', 'Identifie les réponses urgentes et détermine l’action immédiate à entreprendre.', 'relation-client', ['support-client', 'responsable-relation-client']],
  ['mustad-low-tier-reply-handler', 'Préparer les réponses automatiques autorisées', 'Sélectionne une réponse approuvée pour les cas simples explicitement autorisés.', 'relation-client', ['support-client', 'agent-telephonique']],
  ['mustad-reply-routing', 'Router une réponse commerciale', 'Attribue la réponse à la bonne personne ou équipe selon le territoire, le segment, la responsabilité et la disponibilité.', 'relation-client', ['responsable-relation-client', 'agent-telephonique']],
  ['mustad-sla-monitoring', 'Surveiller les délais de traitement', 'Suit le délai de routage, l’accusé de prise en charge et les échéances d’escalade.', 'relation-client', ['responsable-relation-client']],

  // Préparation de réunions et synthèse d’appels
  ['mustad-call-summary', 'Structurer la synthèse d’un appel', 'Produit une synthèse distinguant clairement les faits, engagements, difficultés et prochaines étapes.', 'reunions', ['commercial', 'assistante-de-direction', 'responsable-comptes-cles']],
  ['mustad-next-step-extraction', 'Extraire les prochaines étapes', 'Extrait des appels les prochaines étapes, responsables, dates et engagements.', 'reunions', ['commercial', 'assistante-de-direction', 'responsable-comptes-cles']],
  ['mustad-call-consent-policy', 'Vérifier le consentement à l’enregistrement', 'Détermine si une réunion peut être enregistrée ou traitée selon les règles de consentement applicables.', 'reunions', ['assistante-de-direction', 'responsable-relation-client']],
  ['mustad-followup-draft', 'Rédiger un suivi après rendez-vous', 'Prépare un message de suivi factuel après la réunion pour validation par le commercial.', 'reunions', ['commercial', 'responsable-comptes-cles']],
  ['mustad-meeting-profile-orchestration', 'Orchestrer le traitement d’une réunion', 'Coordonne l’événement, la capture autorisée, la disponibilité de la transcription et son traitement.', 'reunions', ['assistante-de-direction', 'responsable-projet']],

  // Copilote des équipes terrain
  ['mustad-visit-note-structuring', 'Structurer les notes de visite', 'Transforme des notes libres ou vocales en compte-rendu de visite structuré pour le CRM.', 'ventes', ['commercial-terrain', 'responsable-comptes-cles']],
  ['mustad-field-voice-validation', 'Faire valider une transcription terrain', 'Demande au représentant terrain de relire et valider la transcription avant toute mise à jour du CRM.', 'ventes', ['commercial-terrain']],
  ['mustad-field-access-policy', 'Contrôler les accès des équipes terrain', 'Applique les règles de rôle et de territoire pour déterminer les informations accessibles à chaque utilisateur terrain.', 'ventes', ['commercial-terrain', 'responsable-comptes-cles']],
  ['mustad-visit-suggestion', 'Suggérer des visites pertinentes', 'Suggère des prospects pertinents selon le calendrier, le territoire et la localisation autorisés.', 'ventes', ['commercial-terrain']],
  ['mustad-mobile-brief-delivery', 'Transmettre une fiche de visite sur mobile', 'Diffuse une fiche de préparation synthétique sur le canal mobile approuvé.', 'ventes', ['commercial-terrain']],

  // Prévisions et propositions commerciales
  ['mustad-deal-health', 'Évaluer la santé d’une opportunité', 'Identifie les risques, informations manquantes et prochaines actions recommandées pour une opportunité commerciale.', 'ventes', ['directeur-commercial', 'commercial', 'analyste-financier']],
  ['mustad-proposal-draft', 'Préparer une proposition commerciale', 'Crée une proposition contrôlée à partir des modèles approuvés et du contexte de l’opportunité.', 'ventes', ['commercial', 'consultant-avant-vente', 'ingenieur-affaires']],
  ['mustad-pricing-policy', 'Contrôler les prix et remises', 'Garantit l’utilisation exclusive des prix, remises et conditions commerciales autorisés.', 'finance', ['directeur-commercial', 'commercial', 'analyste-financier']],
  ['mustad-reference-matching', 'Sélectionner des références clients', 'Sélectionne les références clients approuvées les plus pertinentes pour une opportunité.', 'ventes', ['commercial', 'consultant-avant-vente']],
  ['mustad-onboarding-handoff', 'Préparer le passage à l’intégration client', 'Prépare et déclenche le passage de relais approuvé après la signature du contrat.', 'ventes', ['commercial', 'responsable-reussite-client']],

  // Production de contenu et relations presse
  ['mustad-content-pipeline', 'Orchestrer la chaîne de production éditoriale', 'Coordonne le brief, le contenu long, les déclinaisons sociales, publicitaires et email ainsi que leurs validations.', 'marketing', ['responsable-editorial', 'content-strategist']],
  ['mustad-content-derivatives', 'Décliner un contenu approuvé', 'Crée des déclinaisons sociales, publicitaires et email à partir d’un contenu long approuvé.', 'marketing', ['redacteur-web', 'responsable-editorial']],
  ['mustad-content-fact-check', 'Vérifier les faits d’un contenu', 'Contrôle les affirmations produit à partir des allégations approuvées et des sources de référence.', 'marketing', ['redacteur-web', 'responsable-editorial']],
  ['mustad-pr-media-research', 'Rechercher des médias et journalistes', 'Identifie les médias et journalistes pertinents selon l’angle éditorial et l’objectif de campagne.', 'marketing', ['charge-relations-presse']],
  ['mustad-pr-pitch-writing', 'Rédiger une proposition aux journalistes', 'Rédige des propositions factuelles et personnalisées à destination des journalistes.', 'marketing', ['charge-relations-presse']],
  ['mustad-pr-coverage-report', 'Préparer un bilan des retombées presse', 'Produit un bilan sourcé des retombées presse avec liens, dates et analyse de tonalité.', 'marketing', ['charge-relations-presse']],

  // Opérations d’influence
  ['mustad-creator-discovery', 'Rechercher des créateurs de contenu', 'Identifie les créateurs correspondant aux critères, plateformes, zones et objectifs de la campagne.', 'marketing', ['responsable-influence']],
  ['mustad-creator-vetting', 'Évaluer un créateur de contenu', 'Évalue l’authenticité, la pertinence de l’audience, la sécurité de marque et les risques associés.', 'marketing', ['responsable-influence']],
  ['mustad-creator-brief', 'Préparer un brief pour un créateur', 'Rédige un brief précisant les objectifs, livrables, allégations autorisées et règles de marque.', 'marketing', ['responsable-influence']],
  ['mustad-deliverable-compliance', 'Contrôler les livrables d’influence', 'Compare les livrables contractuels aux contenus publiés et aux obligations de transparence.', 'marketing', ['responsable-influence']],
  ['mustad-creator-workflow', 'Suivre le cycle de vie des créateurs', 'Crée ou met à jour les fiches créateur, étapes de validation et statuts de campagne.', 'marketing', ['responsable-influence']],

  // Cycle de vie et fidélisation
  ['mustad-lifecycle-definitions', 'Appliquer les étapes du cycle de vie client', 'Applique les définitions validées des clients activés, actifs, fidélisés, à risque ou perdus.', 'relation-client', ['responsable-crm', 'responsable-reussite-client', 'responsable-experience-client']],
  ['mustad-cohort-analysis', 'Analyser les cohortes clients', 'Calcule les indicateurs d’activation, de fidélisation et d’attrition par cohorte.', 'relation-client', ['responsable-crm', 'responsable-reussite-client', 'analyste-donnees']],
  ['mustad-dropoff-detection', 'Détecter les risques de désengagement', 'Détecte les comportements associés à une baisse d’engagement ou à un risque client.', 'relation-client', ['responsable-reussite-client', 'responsable-experience-client']],
  ['mustad-winback-copy', 'Rédiger un message de reconquête', 'Prépare des messages et offres de reconquête approuvés selon le segment client.', 'relation-client', ['responsable-crm', 'responsable-reussite-client']],
  ['mustad-lifecycle-workflow', 'Préparer un scénario de fidélisation', 'Prépare les segments de fidélisation et les modifications approuvées des scénarios CRM.', 'relation-client', ['responsable-crm']],

  // Synthèse qualitative et reporting
  ['mustad-theme-extraction', 'Extraire les thèmes des retours', 'Extrait les thèmes récurrents, difficultés, demandes et opportunités présents dans les retours.', 'documents', ['analyste-etudes-qualitatives']],
  ['mustad-quote-clustering', 'Regrouper les verbatims par thème', 'Regroupe les citations par thème et distingue leur fréquence de leur gravité.', 'documents', ['analyste-etudes-qualitatives']],
  ['mustad-feedback-anonymisation', 'Anonymiser les retours clients', 'Supprime ou protège les données permettant d’identifier une personne dans les citations et retours clients.', 'documents', ['analyste-etudes-qualitatives']],
  ['mustad-kpi-narrative', 'Rédiger une synthèse narrative des indicateurs', 'Rédige une synthèse exécutive d’une page à partir d’indicateurs validés.', 'finance', ['controleur-gestion', 'analyste-financier', 'coordinateur-operations']],
  ['mustad-kpi-reconciliation', 'Réconcilier les indicateurs', 'Vérifie les valeurs, sources, périodes de reporting et évolutions des indicateurs.', 'finance', ['controleur-gestion', 'analyste-financier', 'analyste-donnees']],
  ['mustad-weekly-digest-workflow', 'Orchestrer la synthèse hebdomadaire', 'Collecte les données planifiées et prépare une synthèse hebdomadaire à faire valider.', 'finance', ['coordinateur-operations', 'controleur-gestion']],

  // Test de créations publicitaires
  ['mustad-ad-copy-variants', 'Créer des variantes publicitaires', 'Génère des variantes approuvées de textes et d’appels à l’action selon l’audience et l’objectif de campagne.', 'marketing', ['gestionnaire-campagnes-publicitaires']],
  ['mustad-ad-performance-analysis', 'Analyser les performances publicitaires', 'Analyse les performances des campagnes par rapport aux objectifs et références définis.', 'marketing', ['gestionnaire-campagnes-publicitaires', 'responsable-acquisition']],
  ['mustad-ad-pause-policy', 'Évaluer la mise en pause d’une publicité', 'Détermine si une publicité peut être mise en pause selon les règles de performance approuvées.', 'marketing', ['gestionnaire-campagnes-publicitaires']],
  ['mustad-budget-recommendations', 'Recommander une réallocation publicitaire', 'Recommande une réallocation budgétaire autorisée selon les performances des campagnes.', 'finance', ['gestionnaire-campagnes-publicitaires', 'responsable-acquisition']],
  ['mustad-ad-daily-workflow', 'Organiser le suivi publicitaire quotidien', 'Analyse chaque jour les campagnes actives, prépare des recommandations et consigne les résultats.', 'marketing', ['gestionnaire-campagnes-publicitaires']],
]

type SkillTranslation = { name: string; description: string }

const ENGLISH_TRANSLATIONS: Record<string, SkillTranslation> = {
  'mustad-brand-voice': {
    name: 'Apply the brand voice',
    description: 'Applies the brand-approved tone, vocabulary, audience language, and communication style.',
  },
  'mustad-approved-claims': {
    name: 'Check approved claims',
    description: 'Checks that product, commercial, and performance claims are approved, substantiated, and never fabricated.',
  },
  'mustad-evidence-provenance': {
    name: 'Document evidence provenance',
    description: 'Associates results from external data with their source, date, supporting link, and confidence level.',
  },
  'mustad-icp-scoring': {
    name: 'Score an ideal customer profile',
    description: 'Scores prospects using validated criteria, weightings, thresholds, and segmentation rules.',
  },
  'mustad-deduplication': {
    name: 'Detect CRM duplicates',
    description: 'Detects contacts and companies that may be duplicates before they are created or enriched.',
  },
  'mustad-data-quality': {
    name: 'Check data quality',
    description: 'Classifies records as verified, partial, incomplete, or conflicting and flags missing required data.',
  },
  'mustad-data-conflict-policy': {
    name: 'Manage data conflicts',
    description: 'Protects manually entered CRM data and defines how conflicting sources are compared, retained, and escalated.',
  },
  'mustad-consent-policy': {
    name: 'Verify communication consent',
    description: 'Checks opt-outs, do-not-contact restrictions, and email or SMS permissions before any external action.',
  },
  'mustad-human-approval-policy': {
    name: 'Apply human approval rules',
    description: 'Applies shared approval rules, including the owner, stage, recorded decision, and expiration date.',
  },
  'mustad-territory-and-ownership-policy': {
    name: 'Apply sales territory and ownership rules',
    description: 'Determines the sales owner, territory routing, eligibility, and access scope for field teams.',
  },
  'mustad-meeting-brief': {
    name: 'Prepare a meeting brief',
    description: 'Produces a concise, factual preparation brief from CRM records, enriched data, and sales context.',
  },
  'mustad-data-privacy-policy': {
    name: 'Apply the data privacy policy',
    description: 'Applies rules for sensitive data, transcripts, feedback, retention periods, anonymization, and access rights.',
  },
  'mustad-approved-template-policy': {
    name: 'Use approved templates only',
    description: 'Ensures that only approved templates for messages, responses, content, press relations, and campaigns are used automatically.',
  },
  'mustad-audit-and-action-log': {
    name: 'Log actions and decisions',
    description: 'Creates structured records of inputs, results, evidence, approvals, actions, failures, and retries.',
  },
  'mustad-prospect-research': {
    name: 'Research prospects with evidence',
    description: 'Researches prospects in authorized public sources and extracts structured information with supporting evidence.',
  },
  'mustad-prospect-segmentation': {
    name: 'Segment prospects',
    description: 'Determines a prospect’s segment, whether the prospect should be excluded, or whether human review is needed.',
  },
  'mustad-prospect-review-queue': {
    name: 'Prepare a prospect review queue',
    description: 'Prepares the score, rationale, evidence, segment, and recommended next action for human review.',
  },
  'mustad-source-licence-check': {
    name: 'Check source licenses',
    description: 'Prevents the use of unapproved, prohibited, or noncompliant sources.',
  },
  'mustad-enrichment-policy': {
    name: 'Apply an enrichment policy',
    description: 'Defines the data required for basic or comprehensive enrichment for each segment.',
  },
  'mustad-enrichment-normalisation': {
    name: 'Normalize enriched data',
    description: 'Standardizes names, addresses, phone numbers, domains, job titles, and company information.',
  },
  'mustad-enrichment-provenance': {
    name: 'Track enrichment provenance',
    description: 'Records the source, date, verification method, and confidence level of each enriched data point.',
  },
  'mustad-enrichment-review-workflow': {
    name: 'Organize enrichment reviews',
    description: 'Routes proposed updates, conflicts, and incomplete records for human review.',
  },
  'mustad-segment-messaging': {
    name: 'Tailor messages to each segment',
    description: 'Tailors the value proposition, tone, objections, and call to action to each segment.',
  },
  'mustad-factual-personalisation': {
    name: 'Personalize using verified facts',
    description: 'Personalizes messages using verified data only and blocks unsupported statements.',
  },
  'mustad-three-touch-cadence': {
    name: 'Prepare a three-touch sequence',
    description: 'Creates approved three-touch sequences with the correct timing, channels, and stopping rules.',
  },
  'mustad-outreach-tier-policy': {
    name: 'Apply outreach tier rules',
    description: 'Applies the approval, sending, volume cap, and exception rules for each outreach tier.',
  },
  'mustad-sequence-enrolment': {
    name: 'Enroll a contact in a sequence',
    description: 'Prepares approved sequences and enrolls eligible contacts only when the rules allow it.',
  },
  'mustad-reply-classification': {
    name: 'Classify incoming replies',
    description: 'Classifies replies by intent: interested, later, wrong contact, objection, opt-out, sensitive, or ambiguous.',
  },
  'mustad-hot-reply-policy': {
    name: 'Detect priority replies',
    description: 'Identifies urgent replies and determines the immediate action to take.',
  },
  'mustad-low-tier-reply-handler': {
    name: 'Prepare permitted automated replies',
    description: 'Selects an approved reply for simple cases where automation is explicitly permitted.',
  },
  'mustad-reply-routing': {
    name: 'Route a sales reply',
    description: 'Assigns the reply to the right person or team based on territory, segment, ownership, and availability.',
  },
  'mustad-sla-monitoring': {
    name: 'Monitor response times',
    description: 'Tracks routing time, acknowledgment of receipt, and escalation deadlines.',
  },
  'mustad-call-summary': {
    name: 'Structure a call summary',
    description: 'Produces a summary that clearly distinguishes facts, commitments, challenges, and next steps.',
  },
  'mustad-next-step-extraction': {
    name: 'Extract next steps',
    description: 'Extracts next steps, owners, dates, and commitments from calls.',
  },
  'mustad-call-consent-policy': {
    name: 'Verify recording consent',
    description: 'Determines whether a meeting may be recorded or processed under the applicable consent rules.',
  },
  'mustad-followup-draft': {
    name: 'Draft a post-meeting follow-up',
    description: 'Prepares a factual post-meeting follow-up message for review by the sales representative.',
  },
  'mustad-meeting-profile-orchestration': {
    name: 'Orchestrate meeting processing',
    description: 'Coordinates the event, authorized capture, transcript availability, and transcript processing.',
  },
  'mustad-visit-note-structuring': {
    name: 'Structure visit notes',
    description: 'Transforms free-form or voice notes into a structured visit report for the CRM.',
  },
  'mustad-field-voice-validation': {
    name: 'Validate a field transcript',
    description: 'Asks the field representative to review and approve the transcript before any CRM update.',
  },
  'mustad-field-access-policy': {
    name: 'Control field team access',
    description: 'Applies role and territory rules to determine what information each field user may access.',
  },
  'mustad-visit-suggestion': {
    name: 'Suggest relevant visits',
    description: 'Suggests relevant prospects based on the authorized schedule, territory, and location.',
  },
  'mustad-mobile-brief-delivery': {
    name: 'Deliver a mobile visit brief',
    description: 'Delivers a concise preparation brief through the approved mobile channel.',
  },
  'mustad-deal-health': {
    name: 'Assess deal health',
    description: 'Identifies risks, missing information, and recommended next actions for a sales opportunity.',
  },
  'mustad-proposal-draft': {
    name: 'Prepare a sales proposal',
    description: 'Creates a controlled proposal from approved templates and the opportunity context.',
  },
  'mustad-pricing-policy': {
    name: 'Control pricing and discounts',
    description: 'Ensures that only authorized prices, discounts, and commercial terms are used.',
  },
  'mustad-reference-matching': {
    name: 'Select customer references',
    description: 'Selects the most relevant approved customer references for an opportunity.',
  },
  'mustad-onboarding-handoff': {
    name: 'Prepare the customer onboarding handoff',
    description: 'Prepares and initiates the approved handoff after the contract is signed.',
  },
  'mustad-content-pipeline': {
    name: 'Orchestrate the content production pipeline',
    description: 'Coordinates the brief, long-form content, social, advertising, and email derivatives, and their approvals.',
  },
  'mustad-content-derivatives': {
    name: 'Repurpose approved content',
    description: 'Creates social, advertising, and email derivatives from approved long-form content.',
  },
  'mustad-content-fact-check': {
    name: 'Fact-check content',
    description: 'Checks product statements against approved claims and reference sources.',
  },
  'mustad-pr-media-research': {
    name: 'Research media outlets and journalists',
    description: 'Identifies relevant media outlets and journalists based on the editorial angle and campaign objective.',
  },
  'mustad-pr-pitch-writing': {
    name: 'Write a media pitch',
    description: 'Writes factual, personalized pitches for journalists.',
  },
  'mustad-pr-coverage-report': {
    name: 'Prepare a press coverage report',
    description: 'Produces a sourced press coverage report with links, dates, and sentiment analysis.',
  },
  'mustad-creator-discovery': {
    name: 'Discover content creators',
    description: 'Identifies creators who match the campaign’s criteria, platforms, regions, and objectives.',
  },
  'mustad-creator-vetting': {
    name: 'Evaluate a content creator',
    description: 'Evaluates authenticity, audience relevance, brand safety, and associated risks.',
  },
  'mustad-creator-brief': {
    name: 'Prepare a creator brief',
    description: 'Writes a brief specifying objectives, deliverables, permitted claims, and brand guidelines.',
  },
  'mustad-deliverable-compliance': {
    name: 'Check influencer deliverables',
    description: 'Compares contracted deliverables with published content and disclosure requirements.',
  },
  'mustad-creator-workflow': {
    name: 'Track the creator lifecycle',
    description: 'Creates or updates creator records, approval stages, and campaign statuses.',
  },
  'mustad-lifecycle-definitions': {
    name: 'Apply customer lifecycle stages',
    description: 'Applies validated definitions for activated, active, retained, at-risk, or lost customers.',
  },
  'mustad-cohort-analysis': {
    name: 'Analyze customer cohorts',
    description: 'Calculates activation, retention, and churn metrics by cohort.',
  },
  'mustad-dropoff-detection': {
    name: 'Detect disengagement risks',
    description: 'Detects behaviors associated with declining engagement or customer risk.',
  },
  'mustad-winback-copy': {
    name: 'Write a win-back message',
    description: 'Prepares approved win-back messages and offers for each customer segment.',
  },
  'mustad-lifecycle-workflow': {
    name: 'Prepare a customer retention workflow',
    description: 'Prepares retention segments and approved changes to CRM workflows.',
  },
  'mustad-theme-extraction': {
    name: 'Extract themes from feedback',
    description: 'Extracts recurring themes, pain points, requests, and opportunities from feedback.',
  },
  'mustad-quote-clustering': {
    name: 'Group quotes by theme',
    description: 'Groups quotes by theme and distinguishes frequency from severity.',
  },
  'mustad-feedback-anonymisation': {
    name: 'Anonymize customer feedback',
    description: 'Removes or protects personally identifiable data in customer quotes and feedback.',
  },
  'mustad-kpi-narrative': {
    name: 'Write a narrative KPI summary',
    description: 'Writes a one-page executive summary based on validated metrics.',
  },
  'mustad-kpi-reconciliation': {
    name: 'Reconcile metrics',
    description: 'Checks metric values, sources, reporting periods, and changes over time.',
  },
  'mustad-weekly-digest-workflow': {
    name: 'Orchestrate the weekly digest',
    description: 'Collects scheduled data and prepares a weekly digest for review.',
  },
  'mustad-ad-copy-variants': {
    name: 'Create ad copy variants',
    description: 'Generates approved copy and call-to-action variants based on the audience and campaign objective.',
  },
  'mustad-ad-performance-analysis': {
    name: 'Analyze advertising performance',
    description: 'Analyzes campaign performance against defined objectives and benchmarks.',
  },
  'mustad-ad-pause-policy': {
    name: 'Evaluate whether to pause an ad',
    description: 'Determines whether an ad may be paused under approved performance rules.',
  },
  'mustad-budget-recommendations': {
    name: 'Recommend advertising budget reallocation',
    description: 'Recommends an authorized budget reallocation based on campaign performance.',
  },
  'mustad-ad-daily-workflow': {
    name: 'Organize daily advertising monitoring',
    description: 'Analyzes active campaigns each day, prepares recommendations, and records the results.',
  },
}

function toStoreItem([slug, name, description, facet, profiles]: SkillDefinition, index: number): StoreItem {
  const publicSlug = slug.replace(/^mustad-/, '')
  const translation = ENGLISH_TRANSLATIONS[slug]
  if (!translation) throw new Error(`Missing English translation for Mustad skill: ${slug}`)

  return {
    type: 'competence',
    slug: publicSlug,
    name: { fr: name, en: translation.name },
    description: { fr: description, en: translation.description },
    creator: 'unitalk',
    facet,
    enables: [{ fr: description, en: translation.description }],
    produces: [{ fr: 'Un résultat structuré soumis aux règles et validations configurées.', en: 'A structured result subject to configured rules and approvals.' }],
    contexts: [{ fr: 'Processus commercial, marketing ou opérationnel configuré pour l’entreprise.', en: 'Sales, marketing or operational process configured for the organization.' }],
    relatedProfiles: profiles,
    neededApps: [],
    order: 500 + index,
    dateAdded: '2026-08-21',
    keywords: [name, ...profiles],
    version: '1.0.0',
    commercialStatus: 'included',
    usageRights: { fr: 'Utilisation dans l’entreprise selon les droits accordés.', en: 'Use within the organization according to granted rights.' },
  }
}

export const MUSTAD_SKILLS: StoreItem[] = [...SHARED_SKILLS, ...PROFILE_SKILLS].map(toStoreItem)
