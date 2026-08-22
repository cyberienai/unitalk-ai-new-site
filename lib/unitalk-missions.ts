import type { Mission } from '@/lib/missions-catalog'
import type { MissionExecutor, UnitalkMissionCommerce } from '@/lib/unitalk-commerce'

type Definition = [slug: string, title: string, description: string, subcategory: string, executor: MissionExecutor]

const DEFINITIONS: Definition[] = [
  ['decouvrir-unitalk-avec-alma','Découvrir Unitalk avec Alma','Comprendre les Collaborateurs IA, les licences, les crédits et les premières étapes.','demarrage','alma'],
  ['choisir-premier-collaborateur-ia','Choisir son premier Collaborateur IA','Définir l’identité, le rattachement et les responsabilités initiales.','demarrage','alma'],
  ['configurer-licences-unitalk','Configurer ses licences Unitalk','Choisir Collaborateur IA, Co-créateur IA, Alma et capacité IA.','demarrage','alma'],
  ['preparer-essai-unitalk','Préparer les sept jours d’essai','Définir la mission qui permettra de mesurer la valeur pendant l’essai.','demarrage','alma'],
  ['passer-essai-production','Passer de l’essai à la production','Vérifier missions, droits, applications, capacité IA et facturation.','demarrage','unitalk-team'],
  ['creer-identite-collaborateur','Créer l’identité d’un Collaborateur IA','Définir son prénom, sa nature IA, son entreprise et son rattachement.','identite','alma'],
  ['creer-profil-public','Créer son profil public','Choisir les informations, responsabilités et moyens de contact publics.','identite','alma'],
  ['definir-responsable-humain','Définir son responsable humain','Attribuer la personne qui supervise l’identité, les droits et les décisions.','identite','alma'],
  ['creer-profil-metier','Créer un profil métier','Transformer une responsabilité durable en profil réutilisable.','profils-competences','ai-cocreator'],
  ['creer-competence','Créer une compétence','Formaliser un savoir-faire testable, améliorable et partageable.','profils-competences','ai-cocreator'],
  ['tester-competence','Tester une compétence','Exécuter la compétence sur des cas contrôlés et documenter les résultats.','profils-competences','ai-cocreator'],
  ['publier-stores-unitalk','Publier dans les Stores Unitalk','Préparer description, documentation, droits et tarification.','profils-competences','unitalk-team'],
  ['personnaliser-mission-store','Personnaliser une mission du Store','Adapter une mission existante au contexte, aux outils et aux validations.','missions','alma'],
  ['creer-mission-sur-mesure','Créer une mission sur mesure','Définir travail, résultat, règles, applications et validations.','missions','alma'],
  ['connecter-application','Connecter une application','Autoriser une application selon les connexions réellement disponibles.','applications','ai-engineer'],
  ['connecter-crm','Connecter un CRM','Préparer les objets, champs, droits et validations.','applications','ai-engineer'],
  ['configurer-memoire-entreprise','Configurer la mémoire d’entreprise','Définir ce qui peut être conservé, partagé ou oublié.','applications','ai-engineer'],
  ['installer-unitalk-desktop','Installer Unitalk Desktop','Installer et vérifier l’application sur l’ordinateur autorisé.','desktop','unitalk-team'],
  ['configurer-espace-local','Configurer un espace de travail local','Choisir les dossiers et fichiers accessibles.','desktop','ai-engineer'],
  ['configurer-unitalk-terminal','Configurer Unitalk Terminal','Préparer l’environnement de commande et les autorisations.','terminal','ai-engineer'],
  ['securiser-acces-terminal','Sécuriser les accès Terminal','Appliquer moindre privilège, secrets et validations.','terminal','ai-engineer'],
  ['connecter-cles-api','Connecter ses clés API','Ajouter les clés autorisées sans les exposer au Collaborateur IA.','ai-gateway','ai-engineer'],
  ['definir-modeles-autorises','Définir les modèles autorisés','Choisir les modèles selon qualité, coût, confidentialité et mission.','ai-gateway','alma'],
  ['optimiser-consommation-ia','Optimiser la consommation IA','Ajuster prompts, contexte, modèles et fréquence.','ai-gateway','ai-engineer'],
  ['creer-environnement-prive','Créer l’environnement privé d’un Collaborateur IA','Provisionner son espace d’exécution et son stockage persistant.','hebergement','unitalk-team'],
  ['auditer-environnement-prive','Auditer l’environnement privé','Vérifier ressources, accès, processus et données persistantes.','hebergement','ai-engineer'],
  ['auditer-agent-hermes','Auditer un agent Hermes existant','Inventorier configuration, outils, mémoire, fichiers et tâches.','migration','ai-engineer'],
  ['preparer-migration-hermes','Préparer la migration Hermes vers Unitalk','Mapper l’agent vers identité, profils, compétences, applications et missions.','migration','ai-engineer'],
  ['auditer-agent-openclaw','Auditer un agent OpenClaw','Inventorier sa configuration, ses outils, ses données et automatisations.','migration','ai-engineer'],
  ['former-equipe-collaboration-ia','Former une équipe à travailler avec un Collaborateur IA','Expliquer missions, validations, mémoire et responsabilités.','collaboration','alma'],
  ['definir-validations-humaines','Définir les validations humaines','Choisir les décisions qui exigent une approbation.','collaboration','alma'],
]

const executorLabel: Record<MissionExecutor, string> = { alma: 'Alma', 'ai-cocreator': 'Co-créateur IA', 'ai-engineer': 'Ingénieur IA', 'unitalk-team': 'Équipe Unitalk', 'customer-ai-collaborator': 'Collaborateur IA de l’entreprise' }

export const UNITALK_MISSIONS: Mission[] = DEFINITIONS.map(([slug,title,description,subcategory,executor], index) => {
  const unitalk: UnitalkMissionCommerce = { subcategory, executor, outcome: description, deliverables: [], prerequisites: [], exclusions: [], applications: [], humanValidations: ['Confirmation explicite avant achat ou exécution'], pricing: {}, canBeCustomized: true, requiresQuote: true }
  return {
    slug:`unitalk-${slug}`, category:'unitalk', collections:['unitalk'], title:{fr:title,en:title}, result:{fr:description,en:description}, description:{fr:description,en:description}, objective:{fr:description,en:description}, steps:[{fr:'Alma ou l’intervenant autorisé précise le périmètre et les prérequis.',en:'The authorized advisor defines scope and prerequisites.'},{fr:'L’entreprise valide les crédits ou le devis avant toute exécution.',en:'The company approves credits or quote before execution.'}], deliverable:{fr:description,en:description}, deliveryTime:{fr:'Confirmé après cadrage',en:'Confirmed after scoping'}, volume:{fr:'Défini lors du cadrage',en:'Defined during scoping'}, cadence:{fr:'Ponctuelle',en:'One-off'}, validation:{fr:'Aucun débit ni achat sans confirmation explicite.',en:'No debit or purchase without explicit confirmation.'}, produces:[{fr:description,en:description}], skills:[], tools:[], profile:{fr:executorLabel[executor],en:executorLabel[executor]}, collaboratorSlug:'emma', sectors:['services'], languages:['fr'], zones:['france'], modalities:['configuration'], origin:'native', regulated:false, dateAdded:'2026-08-13', order:1000+index, keywords:[title.toLowerCase(),subcategory,'unitalk'], unitalk,
  }
})
