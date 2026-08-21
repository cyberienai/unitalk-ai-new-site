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

function toStoreItem([slug, name, description, facet, profiles]: SkillDefinition, index: number): StoreItem {
  return {
    type: 'competence',
    slug,
    name: { fr: name, en: name },
    description: { fr: description, en: description },
    creator: 'unitalk',
    facet,
    enables: [{ fr: description, en: description }],
    produces: [{ fr: 'Un résultat structuré soumis aux règles et validations configurées.', en: 'A structured result subject to configured rules and approvals.' }],
    contexts: [{ fr: 'Processus commercial, marketing ou opérationnel configuré pour l’entreprise.', en: 'Sales, marketing or operational process configured for the organization.' }],
    relatedProfiles: profiles,
    neededApps: [],
    order: 500 + index,
    dateAdded: '2026-08-21',
    keywords: [slug, name, ...profiles],
    version: '1.0.0',
    commercialStatus: 'included',
    usageRights: { fr: 'Utilisation dans l’entreprise selon les droits accordés.', en: 'Use within the organization according to granted rights.' },
  }
}

export const MUSTAD_SKILLS: StoreItem[] = [...SHARED_SKILLS, ...PROFILE_SKILLS].map(toStoreItem)
