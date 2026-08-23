export const DOCUMENTATION_SLUGS = [
  'hermes-unitalk',
  'alma-organisation',
  'workspace-desktop',
  'memoire-gouvernee',
  'communications',
  'licence-collaborateur-ia',
  'capacite-ia',
  'migration-hermes-openclaw',
  'co-createur-ia',
] as const

export type DocumentationSlug = typeof DOCUMENTATION_SLUGS[number]

export type DocumentationPage = {
  slug: DocumentationSlug
  number: string
  group: 'Comprendre' | 'Configurer' | 'Travailler' | 'Administrer' | 'Migrer'
  eyebrow: string
  title: string
  summary: string
  price: string
  included?: string
  principle: string
  sections: { title: string; intro?: string; items: string[] }[]
  distinctions: { organization: string; collaborator: string }[]
  related: DocumentationSlug[]
  officialSource?: { label: string; href: string }
}

export const DOCUMENTATION_GROUPS: readonly DocumentationPage['group'][] = ['Comprendre', 'Configurer', 'Travailler', 'Administrer', 'Migrer']

export const DOCUMENTATION: Record<DocumentationSlug, DocumentationPage> = {
  'hermes-unitalk': {
    slug: 'hermes-unitalk', number: '01', group: 'Comprendre', eyebrow: 'Architecture', title: 'Hermes exécute. Unitalk orchestre.', price: 'Open source + services Unitalk',
    summary: 'Hermes fournit le moteur agentique open source. Unitalk ajoute l’identité professionnelle, la mémoire gouvernée, les communications, le Workspace, les missions et l’administration nécessaires au travail en entreprise.',
    principle: 'Ensemble, Hermes et Unitalk déploient la collaboration à l’échelle de l’entreprise, tout en distinguant l’exécution agentique de sa gouvernance.',
    sections: [
      { title: 'Ce que fournit Hermes', items: ['Planification et exécution agentique', 'Outils, terminal, navigateur et MCP', 'Mémoire propre et création de compétences', 'Tâches planifiées et sous-agents', 'Fonctionnement local, Docker, SSH ou cloud'] },
      { title: 'Ce qu’ajoute Unitalk', items: ['Identité professionnelle durable', 'Missions et résultats attendus', 'Workspace privé, partagé et Entreprise', 'Accès, validations et journal des décisions', 'Administration des membres humains et IA'] },
      { title: 'Responsabilités distinctes', items: ['Nous Research développe Hermes Agent', 'Unitalk intègre et opère sa distribution professionnelle', 'Votre entreprise définit les accès et les règles', 'Les fournisseurs de modèles restent distincts'] },
      { title: 'Portabilité', items: ['Choix des modèles et fournisseurs', 'Compétences compatibles avec des standards ouverts', 'Données et configurations exportables', 'Migration étudiée avant toute mise en service'] },
    ],
    distinctions: [{ organization: 'Missions, identités, droits et Workspace', collaborator: 'Hermes planifie et exécute avec les ressources autorisées' }, { organization: 'Politiques et validations humaines', collaborator: 'Outils et actions disponibles dans le cadre défini' }],
    related: ['workspace-desktop', 'memoire-gouvernee', 'migration-hermes-openclaw'],
    officialSource: { label: 'Documentation officielle de Hermes Agent', href: 'https://hermes-agent.nousresearch.com/docs/' },
  },
  'alma-organisation': {
    slug: 'alma-organisation', number: '02', group: 'Administrer', eyebrow: 'Licence Workspace', title: 'Administrer les Collaborateurs humains et IA', price: '0 à 299 €/mois', included: 'Les humains sont inclus dans la limite de la licence choisie',
    summary: 'Le cadre de gestion de votre entreprise : membres humains, Assistants IA, Collaborateurs IA, équipes, applications, modèles, budgets et gouvernance.',
    principle: 'Un membre humain peut utiliser le Workspace et les Assistants IA partagés sans disposer de son propre Collaborateur IA.',
    sections: [
      { title: 'Membres et rattachements', items: ['Une personne', 'Une équipe', 'Un département', 'Toute l’entreprise', 'Responsables humains et rôles administratifs'] },
      { title: 'Gouvernance', items: ['Politiques d’accès', 'Validations humaines', 'Règles d’escalade', 'Budgets, quotas et traçabilité'] },
      { title: 'Ressources communes', items: ['Assistants IA privés ou partagés', 'Mémoire partagée', 'Documents et procédures', 'Applications et modèles autorisés'] },
      { title: 'Administration', items: ['Inviter ou retirer un membre', 'Affecter un Collaborateur IA', 'Définir les espaces partagés', 'Suivre l’activité et la consommation'] },
    ],
    distinctions: [{ organization: 'Catalogue et règles disponibles', collaborator: 'Ressources effectivement attribuées' }, { organization: 'Membres humains inclus dans la licence', collaborator: 'Identités IA facturées séparément' }],
    related: ['workspace-desktop', 'licence-collaborateur-ia', 'memoire-gouvernee'],
  },
  'workspace-desktop': {
    slug: 'workspace-desktop', number: '03', group: 'Travailler', eyebrow: 'Interfaces de travail', title: 'Workspace privé, partagé et Entreprise', price: 'Inclus avec la Licence Workspace',
    summary: 'Les espaces Web et Desktop où les humains utilisent des Assistants IA, confient des missions aux Collaborateurs IA, suivent le travail et valident les décisions.',
    principle: 'Le Workspace est accessible aux membres humains autorisés, qu’ils possèdent ou non leur propre Collaborateur IA.',
    sections: [
      { title: 'Espace privé', items: ['Conversations personnelles', 'Assistants IA privés', 'Documents et ressources propres', 'Préparation de demandes avant partage'] },
      { title: 'Espace partagé', items: ['Assistants IA d’équipe', 'Missions et fichiers communs', 'Commentaires, mentions et notifications', 'Décisions accessibles aux membres autorisés'] },
      { title: 'Espace Entreprise', items: ['Administration des humains et des IA', 'Applications, modèles et politiques', 'Budgets et consommation', 'Mémoire et connaissances communes'] },
      { title: 'Unitalk Desktop', items: ['Application locale Mac, Windows et Linux', 'Même identité et même contexte que sur le Web', 'Terminal et fichiers selon les droits', 'Disponible avec un Collaborateur IA'] },
    ],
    distinctions: [{ organization: 'Workspace disponible aux membres autorisés', collaborator: 'Accès individuel selon son rattachement' }, { organization: 'Assistants privés ou partagés', collaborator: 'Identité durable affectée à des missions' }],
    related: ['alma-organisation', 'licence-collaborateur-ia', 'communications'],
  },
  'memoire-gouvernee': {
    slug: 'memoire-gouvernee', number: '04', group: 'Comprendre', eyebrow: 'Contexte et continuité', title: 'Une mémoire personnelle et partagée, sous contrôle.', price: 'Gouvernée par votre entreprise',
    summary: 'Chaque Collaborateur IA conserve le contexte utile à ses missions. L’entreprise choisit ce qui reste propre à une identité, partagé avec une équipe ou accessible à toute l’organisation.',
    principle: 'Honcho contribue à personnaliser la relation avec chaque utilisateur ; Unitalk organise la portée, les droits et le partage des informations dans le Workspace.',
    sections: [
      { title: 'Mémoire propre', items: ['Expérience entre les missions', 'Méthodes et préférences de travail', 'Corrections validées', 'Historique accessible selon les droits'] },
      { title: 'Mémoire partagée', items: ['Équipe ou département autorisé', 'Décisions et méthodes communes', 'Contexte réutilisable sans duplication', 'Partage volontaire et traçable'] },
      { title: 'Connaissances de l’entreprise', items: ['Documents et procédures', 'Bases de connaissances', 'Données ouvertes explicitement', 'Accès retirables par l’administrateur'] },
      { title: 'Personnalisation avec Honcho', intro: 'Honcho est une composante de modélisation de la relation, pas un remplacement des règles de gouvernance Unitalk.', items: ['Compréhension progressive de l’utilisateur', 'Contexte relationnel entre les sessions', 'Utilisation selon la configuration retenue', 'Portée limitée par les droits Unitalk'] },
    ],
    distinctions: [{ organization: 'Définit ce qui peut être partagé', collaborator: 'Conserve sa mémoire propre autorisée' }, { organization: 'Gouverne les connaissances communes', collaborator: 'Consulte uniquement les informations ouvertes' }],
    related: ['hermes-unitalk', 'workspace-desktop', 'alma-organisation'],
    officialSource: { label: 'Découvrir Honcho', href: 'https://github.com/plastic-labs/honcho' },
  },
  communications: {
    slug: 'communications', number: '05', group: 'Configurer', eyebrow: 'Canaux professionnels', title: 'Email, calendrier, téléphone et messageries', price: 'Selon la licence et la configuration',
    summary: 'Un Collaborateur IA peut disposer de moyens de communication professionnels et intervenir dans les canaux autorisés par votre entreprise.',
    principle: 'Chaque canal est activé explicitement. Une adresse, un calendrier ou un numéro ne donne jamais accès à toutes les données ni à toutes les actions.',
    sections: [
      { title: 'Email et calendrier', intro: 'Services opérés avec Stalwart selon la configuration Unitalk.', items: ['Adresse professionnelle attribuée', 'Calendrier propre ou partagé', 'Domaines et identités vérifiés', 'Envoi soumis aux règles de mission'] },
      { title: 'Téléphone', intro: 'Numéro et communications fournis via Telnyx lorsque le service est activé.', items: ['Numéro professionnel', 'Appels entrants ou sortants selon les droits', '60 minutes mensuelles incluses par Collaborateur IA', 'Volumes supplémentaires suivis à l’usage'] },
      { title: 'Messageries', items: ['Slack', 'Microsoft Teams', 'Telegram', 'WhatsApp', 'Autres canaux compatibles avec Hermes Gateway'] },
      { title: 'Contrôles', items: ['Canaux autorisés par l’entreprise', 'Destinataires et actions limités', 'Validations avant les communications sensibles', 'Traçabilité rattachée à la mission'] },
    ],
    distinctions: [{ organization: 'Configure domaines, fournisseurs et politiques', collaborator: 'Reçoit les canaux utiles à ses missions' }, { organization: 'Définit les validations', collaborator: 'Communique dans les limites accordées' }],
    related: ['licence-collaborateur-ia', 'workspace-desktop', 'alma-organisation'],
    officialSource: { label: 'Messageries compatibles avec Hermes Agent', href: 'https://hermes-agent.nousresearch.com/docs/user-guide/messaging/' },
  },
  'licence-collaborateur-ia': {
    slug: 'licence-collaborateur-ia', number: '06', group: 'Configurer', eyebrow: 'Identité capable d’agir', title: 'Licence Collaborateur IA', price: '49 €/mois par identité', included: '5 millions de tokens et 60 minutes par mois',
    summary: 'Une identité IA professionnelle, un agent Hermes dédié, une mémoire propre, des profils métier illimités et les ressources autorisées pour ses missions.',
    principle: 'La Licence Collaborateur IA crée une identité capable d’agir, rattachée à une personne, une équipe, un département ou toute l’entreprise.',
    sections: [
      { title: 'Identité professionnelle', items: ['Nom et avatar', 'Nature IA explicite', 'Rattachement organisationnel', 'Responsable humain', 'Profil public selon le choix de l’entreprise'] },
      { title: 'Agent Hermes dédié', items: ['Environnement de travail', 'Mémoire propre', 'Fichiers, terminal et navigateur', 'Tâches planifiées et sous-agents'] },
      { title: 'Profils et compétences', items: ['Profils métier illimités', 'Compétences Unitalk', 'Compétences privées', 'Versions et expérience validée'] },
      { title: 'Capacité incluse', items: ['5 millions de tokens par mois', '60 minutes de téléphone par mois', 'Consommation suivie', 'Complément par crédits IA ou clés API'] },
    ],
    distinctions: [{ organization: 'Définit le rattachement et les ressources', collaborator: 'Utilise les ressources qui lui sont attribuées' }, { organization: 'Gouverne la mémoire partagée', collaborator: 'Conserve sa mémoire propre autorisée' }],
    related: ['communications', 'memoire-gouvernee', 'capacite-ia'],
  },
  'capacite-ia': {
    slug: 'capacite-ia', number: '07', group: 'Administrer', eyebrow: 'Usage des modèles', title: 'Capacité IA et consommation', price: '5 millions de tokens inclus par Collaborateur IA',
    summary: 'Chaque Collaborateur IA possède une capacité incluse. Les usages supplémentaires peuvent être réglés avec des crédits IA ou les propres clés API de l’entreprise.',
    principle: 'Les tokens inclus, les crédits IA et les clés fournisseur sont des modes de consommation ; ils ne remplacent ni l’identité, ni la licence Workspace, ni les applications.',
    sections: [
      { title: 'Capacité incluse', items: ['5 millions de tokens par mois et par Collaborateur IA', 'DeepSeek V4 Flash', 'Hébergement européen sur Microsoft Azure', 'Usage visible dans le Workspace'] },
      { title: 'Crédits IA', items: ['Recharge à partir de 25 €', 'Modèles et usages multimodaux', 'API externes et téléphone', 'Aucun dépassement sans validation'] },
      { title: 'Clés API propres', items: ['Fournisseurs choisis par l’entreprise', 'Facturation directe', 'Clés conservées dans un coffre', 'Routage par Unitalk AI Gateway'] },
    ],
    distinctions: [{ organization: 'Choisit les modèles, fournisseurs et budgets', collaborator: 'Consomme la capacité affectée à ses missions' }, { organization: 'Suit les quotas et les coûts', collaborator: 'N’accède jamais directement aux secrets' }],
    related: ['licence-collaborateur-ia', 'alma-organisation', 'hermes-unitalk'],
  },
  'migration-hermes-openclaw': {
    slug: 'migration-hermes-openclaw', number: '08', group: 'Migrer', eyebrow: 'Reprise accompagnée', title: 'Migrer Hermes ou OpenClaw vers Unitalk', price: 'Périmètre confirmé avant commande',
    summary: 'Unitalk prépare la reprise d’un agent existant, vérifie les éléments exportables et confirme les adaptations nécessaires avant la mise en service.',
    principle: 'Une migration n’est jamais présentée comme automatique : un inventaire et une prévisualisation précèdent toute écriture ou activation.',
    sections: [
      { title: 'Depuis OpenClaw', items: ['Paramètres et personnalité SOUL.md', 'Mémoires MEMORY.md et USER.md', 'Compétences créées par l’utilisateur', 'Règles d’autorisation et messageries compatibles', 'Clés explicitement autorisées'] },
      { title: 'Depuis Hermes', items: ['Configuration de l’agent', 'Mémoire et compétences exportables', 'Fichiers de contexte', 'Canaux et outils compatibles', 'Inventaire des dépendances'] },
      { title: 'Étapes Unitalk', items: ['Analyse sans modification', 'Rapport des éléments repris ou exclus', 'Rattachement à l’entreprise', 'Configuration des droits et validations', 'Recette avant mise en service'] },
      { title: 'Limites', items: ['Secrets non exportables', 'Services tiers nécessitant une nouvelle autorisation', 'Compatibilité vérifiée version par version', 'Aucune donnée transférée sans accord'] },
    ],
    distinctions: [{ organization: 'Valide le périmètre et les secrets', collaborator: 'Reçoit uniquement les éléments repris' }, { organization: 'Confirme la mise en service', collaborator: 'Reste inactif avant validation' }],
    related: ['hermes-unitalk', 'memoire-gouvernee', 'communications'],
    officialSource: { label: 'Guide officiel de migration OpenClaw vers Hermes', href: 'https://hermes-agent.nousresearch.com/docs/' },
  },
  'co-createur-ia': {
    slug: 'co-createur-ia', number: '09', group: 'Configurer', eyebrow: 'Création et publication', title: 'Licence Co-créateur IA', price: '50 €/mois par personne',
    summary: 'Les droits produit nécessaires pour créer, tester, versionner et publier des profils, compétences, missions et applications métier.',
    principle: 'La formation apprend le métier ; la licence donne les droits de création dans Unitalk AI.',
    sections: [{ title: 'Créer', items: ['Profils métier', 'Compétences', 'Missions', 'Applications métier'] }, { title: 'Tester et versionner', items: ['Cas contrôlés', 'Critères de résultat', 'Versions et historique', 'Corrections validées'] }, { title: 'Publier', items: ['Publication privée', 'Publication Entreprise', 'Proposition au catalogue public', 'Droits et conditions d’utilisation'] }],
    distinctions: [{ organization: 'Politiques de publication', collaborator: 'Créations autorisées par son rôle' }, { organization: 'Stores et visibilité', collaborator: 'Versions publiées' }],
    related: ['alma-organisation', 'licence-collaborateur-ia'],
  },
}
