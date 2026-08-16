export const DOCUMENTATION_SLUGS = ['alma-organisation','workspace-desktop','licence-collaborateur-ia','capacite-ia','co-createur-ia'] as const
export type DocumentationSlug = typeof DOCUMENTATION_SLUGS[number]

export type DocumentationPage = {
  slug: DocumentationSlug
  number: string
  eyebrow: string
  title: string
  summary: string
  price: string
  included?: string
  principle: string
  sections: { title: string; intro?: string; items: string[] }[]
  distinctions: { organization: string; collaborator: string }[]
  related: DocumentationSlug[]
}

export const DOCUMENTATION: Record<DocumentationSlug, DocumentationPage> = {
  'alma-organisation': {
    slug:'alma-organisation',number:'01',eyebrow:'Licence de contrôle',title:'Licence Alma Entreprise',price:'50 €/mois',included:'Workspace & Desktop inclus',summary:'Le cadre de gestion de votre entreprise : Alma, connaissance, Stores, applications, modèles, serveurs, membres, budgets et gouvernance.',principle:'Alma Entreprise gouverne les ressources disponibles. Elle ne crée pas automatiquement des ressources individuelles pour chaque Collaborateur IA.',
    sections:[
      {title:'Alma et Entreprise',items:['Alma, Coordinatrice de missions IA','Membres humains, équipes et rôles','Responsables et droits administratifs','Structure et contexte de l’Entreprise']},
      {title:'Gouvernance',items:['Politiques d’accès','Validations humaines','Règles d’escalade','Budgets, quotas et traçabilité']},
      {title:'Connaissance de l’entreprise',items:['Mémoire partagée','Documents et procédures','Méthodes validées','Contexte d’entreprise']},
      {title:'Stores Unitalk',items:['Profils métier','Compétences','Missions','Applications']},
      {title:'Applications connectées',items:['Connecteurs','API','Serveurs et outils MCP','Webhooks','Applications métier privées']},
      {title:'Unitalk AI Gateway',items:['Modèles autorisés','Fournisseurs de modèles','Clés API et clés virtuelles','Routage et fallback','Budgets, quotas, usages et coûts']},
      {title:'Infrastructure IA',items:['Serveurs IA enregistrés','Hébergeurs autorisés','Environnements privés','Stockage et secrets','Politiques de déploiement']},
    ],
    distinctions:[{organization:'Catalogue et règles des profils métier',collaborator:'Profils métier installés'},{organization:'Bibliothèque et versions des compétences',collaborator:'Compétences attribuées'},{organization:'Connexions et serveurs MCP disponibles',collaborator:'Applications et outils MCP autorisés'},{organization:'Fournisseurs, modèles et clés disponibles',collaborator:'Modèles utilisables selon les droits'}],related:['workspace-desktop','licence-collaborateur-ia','capacite-ia'],
  },
  'workspace-desktop': {
    slug:'workspace-desktop',number:'02',eyebrow:'Interfaces de travail',title:'Unitalk Workspace & Desktop',price:'Inclus',included:'Inclus avec Alma Entreprise',summary:'Les interfaces Web et Desktop où les humains confient, suivent et valident le travail des Collaborateurs IA.',principle:'Workspace & Desktop permettent de travailler. Ils n’accordent pas à eux seuls de nouvelles capacités, applications ou identités IA.',
    sections:[{title:'Workspace Web',items:['Tableau de bord d’équipe','Missions en cours et historique','Activité, résultats et fichiers','Commentaires, mentions et notifications']},{title:'Unitalk Desktop',items:['Application locale Mac, Windows et Linux','Même identité et même contexte que sur le Web','Accès aux missions et validations','Terminal et fichiers selon les droits']},{title:'Validations',items:['Approuver','Modifier','Refuser','Journal des décisions']},{title:'Supervision',items:['État des Collaborateurs IA','Consommation','Alertes et blocages','Traçabilité des actions']},{title:'Accès multicanal',items:['Web','Desktop','Mobile lorsque disponible','Messageries compatibles']}],distinctions:[{organization:'Workspace disponible aux membres autorisés',collaborator:'Accès individuel selon le rôle'},{organization:'Politiques de validation',collaborator:'Décisions affectées à une mission'}],related:['alma-organisation','licence-collaborateur-ia'],
  },
  'licence-collaborateur-ia': {
    slug:'licence-collaborateur-ia',number:'03',eyebrow:'Identité capable d’agir',title:'Licence Collaborateur IA',price:'49 €/mois par identité',summary:'Une identité IA professionnelle, un profil Collaborateur IA pour Hermes, des profils métier illimités et des ressources individuelles affectées.',principle:'La Licence Collaborateur IA crée une identité capable d’agir. Elle reçoit les ressources que l’Entreprise autorise, sans posséder automatiquement tout son catalogue.',
    sections:[{title:'Identité IA professionnelle',items:['Nom et avatar','Nature IA explicite','Rattachement à l’Entreprise','Responsable humain','Profil public']},{title:'Profil Collaborateur IA pour Hermes',items:['Runtime agentique Hermes','Environnement de travail','Mémoire propre','Fichiers, terminal et navigateur','Tâches planifiées']},{title:'Profils et compétences',items:['Profils métier illimités','Compétences Unitalk','Compétences privées','Versions et expérience validée']},{title:'Applications autorisées',items:['Connecteurs attribués','Outils MCP autorisés','API autorisées','Applications métier']},{title:'Outils de communication',items:['Adresse email','Agenda','Téléphone si activé','Messageries d’équipe','Web, Desktop et terminal']},{title:'Droits propres',items:['Sources accessibles','Actions autorisées','Actions soumises à validation','Actions interdites']},{title:'Ressources d’exécution',items:['Environnement isolé','Secrets propres','Stockage','Ressources dédiées selon l’offre']}],distinctions:[{organization:'Domaines email et politiques',collaborator:'Adresse email attribuée'},{organization:'Fournisseur téléphonique et budget',collaborator:'Ligne attribuée si activée'},{organization:'Mémoire partagée',collaborator:'Mémoire propre et lecture autorisée'},{organization:'Inventaire des serveurs IA',collaborator:'Environnement d’exécution affecté'}],related:['alma-organisation','workspace-desktop','capacite-ia'],
  },
  'capacite-ia': {
    slug:'capacite-ia',number:'04',eyebrow:'Usage des modèles',title:'Capacité IA par Collaborateur',price:'0 à 100 €/mois',summary:'La capacité finance et gouverne principalement l’usage des modèles via Unitalk AI Gateway. Elle reste distincte des profils, compétences et applications.',principle:'La capacité IA finance l’usage des modèles. Elle n’inclut pas l’identité, les profils métier, les compétences ni les applications.',
    sections:[{title:'BYOK',items:['Clés propres de l’entreprise','Usage facturé par le fournisseur','Gouvernance par Unitalk AI Gateway','Aucun quota de tokens Unitalk inclus']},{title:'Quart-temps',items:['5 millions de tokens par mois','Charge d’action légère ou récurrente','25 €/mois de capacité hors promotion']},{title:'Mi-temps',items:['10 millions de tokens par mois','Prise en charge quotidienne','50 €/mois de capacité']},{title:'Temps plein',items:['20 millions de tokens par mois','Processus complexes et volumes importants','100 €/mois de capacité']},{title:'Crédits complémentaires',items:['Recharges ponctuelles','Modèles avancés','Image, audio, vidéo ou code','Dépassements explicitement autorisés']}],distinctions:[{organization:'Modèles et fournisseurs autorisés',collaborator:'Modèles utilisables'},{organization:'Coffre de clés API',collaborator:'Accès indirect selon les droits'},{organization:'Budgets et quotas',collaborator:'Consommation attribuée'}],related:['alma-organisation','licence-collaborateur-ia'],
  },
  'co-createur-ia': {
    slug:'co-createur-ia',number:'05',eyebrow:'Création et publication',title:'Licence Co-créateur IA',price:'50 €/mois par personne',summary:'Les droits produit nécessaires pour créer, tester, versionner et publier des profils, compétences, missions et applications métier.',principle:'La licence produit Co-créateur reste distincte de la formation Unitalk Academy. La formation apprend le métier ; la licence donne les droits de création dans Unitalk AI.',
    sections:[{title:'Créer',items:['Profils métier','Compétences','Missions','Applications métier vibecodées']},{title:'Tester et versionner',items:['Cas contrôlés','Critères de résultat','Versions et historique','Corrections validées']},{title:'Publier',items:['Publication privée','Publication Entreprise','Proposition au catalogue public','Droits et conditions d’utilisation']},{title:'Suivre',items:['Activations','Utilisations attribuées','Revenus directs ou indirects selon programme','Historique des règlements']}],distinctions:[{organization:'Politiques de publication',collaborator:'Créations autorisées par son rôle'},{organization:'Stores et visibilité',collaborator:'Versions publiées'}],related:['alma-organisation','licence-collaborateur-ia'],
  },
}
