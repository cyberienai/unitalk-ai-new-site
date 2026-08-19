# Architecture des Licences Unitalk AI — Document de Référence

> Document source : spécification produit par le fondateur. Ce fichier sert de référence pour l'implémentation des pages /tarifs et /architecture.

---

## Distinctions essentielles

- **Alma Entreprise** configure et gouverne
- **Workspace & Desktop** permettent de travailler
- **La Licence Collaborateur IA** crée une identité capable d'agir
- **La Capacité IA** finance l'usage des modèles
- **Les ressources dédiées** financent l'infrastructure d'exécution

---

## Architecture Recommandée

```
Licence Alma Entreprise
├── Alma, Coordinatrice de missions
├── Entreprise
│   ├── Membres humains
│   ├── Équipes et rôles
│   ├── Responsables
│   └── Droits administratifs
├── Gouvernance
│   ├── Politiques d'accès
│   ├── Validations humaines
│   ├── Règles d'escalade
│   ├── Budgets et quotas
│   └── Traçabilité
├── Connaissance de l'entreprise
│   ├── Mémoire partagée
│   ├── Documents et procédures
│   ├── Méthodes validées
│   └── Contexte d’entreprise
├── Stores Unitalk
│   ├── Profils métier
│   ├── Compétences
│   ├── Missions
│   └── Applications
├── Applications connectées
│   ├── Connecteurs
│   ├── API
│   ├── MCP
│   ├── Webhooks
│   └── Applications métier privées
├── Unitalk AI Gateway
│   ├── Modèles autorisés
│   ├── Fournisseurs de modèles
│   ├── Clés API de l’entreprise
│   ├── Clés virtuelles
│   ├── Routage et fallback
│   ├── Budgets et quotas
│   └── Suivi des usages et des coûts
├── Infrastructure IA
│   ├── Serveurs IA enregistrés
│   ├── Hébergeurs autorisés
│   ├── Environnements privés
│   ├── Stockage et secrets
│   └── Politiques de déploiement
└── Workspace & Desktop
    ├── Accès Web
    ├── Application Desktop
    ├── Membres humains illimités
    └── Accès aux missions et validations
```

## Workspace & Desktop

```
Licence Unitalk Workspace & Desktop
├── Workspace Web
├── Unitalk Desktop
├── Tableau de bord d'équipe
├── Missions
│   ├── Missions en cours
│   ├── Historique
│   ├── Activité
│   └── Résultats
├── Validations
│   ├── Approuver
│   ├── Modifier
│   ├── Refuser
│   └── Journal des décisions
├── Collaboration
│   ├── Commentaires
│   ├── Notifications
│   ├── Mentions
│   └── Partage de fichiers
├── Supervision
│   ├── État des Collaborateurs IA
│   ├── Consommation
│   ├── Alertes
│   └── Blocages
└── Accès multicanal
    ├── Web
    ├── Desktop
    ├── Mobile
    └── Messageries compatibles
```

> **Unitalk Workspace & Desktop : inclus avec Alma Entreprise**

## Licence Collaborateur IA

```
Licence Collaborateur IA
├── Identité IA professionnelle
│   ├── Nom
│   ├── Avatar
│   ├── Nature IA explicite
│   ├── Rattachement à l’entreprise
│   ├── Responsable humain
│   └── Profil public
├── Profil Collaborateur IA pour Hermes
│   ├── Runtime agentique Hermes
│   ├── Environnement de travail
│   ├── Mémoire propre
│   ├── Fichiers
│   ├── Terminal
│   ├── Navigateur
│   └── Tâches planifiées
├── Profils métier illimités
├── Compétences installées
│   ├── Compétences Unitalk
│   ├── Compétences privées
│   ├── Versions
│   └── Expérience validée
├── Applications autorisées
│   ├── Connecteurs attribués
│   ├── Outils MCP autorisés
│   ├── API autorisées
│   └── Applications métier
├── Outils de communication
│   ├── Adresse email
│   ├── Agenda
│   ├── Téléphone, si activé
│   ├── Messageries d'équipe
│   ├── Web
│   ├── Desktop
│   └── Terminal
├── Droits propres
│   ├── Sources accessibles
│   ├── Actions autorisées
│   ├── Actions soumises à validation
│   └── Actions interdites
└── Ressources d'exécution
    ├── Environnement isolé
    ├── Secrets propres
    ├── Stockage
    └── Ressources dédiées selon l'offre
```

## Capacité IA

```
Capacité IA par Collaborateur
├── BYOK
│   ├── Clés propres de l'entreprise
│   ├── Usage facturé par le fournisseur
│   └── Gouvernance par Unitalk AI Gateway
├── Quart-temps
│   ├── 5 millions de tokens par mois
│   └── Charge d'action légère ou récurrente
├── Mi-temps
│   ├── 10 millions de tokens par mois
│   └── Prise en charge quotidienne
├── Temps plein
│   ├── 20 millions de tokens par mois
│   └── Processus complexes et volumes importants
└── Crédits complémentaires
    ├── Recharges ponctuelles
    ├── Modèles avancés
    ├── Image, audio, vidéo ou code
    └── Dépassements autorisés
```

## Placement des Éléments

| Élément | Gestion au niveau Entreprise | Attribution au Collaborateur |
| --- | --- | --- |
| Profils métier | Catalogue et règles | Profils installés |
| Compétences | Bibliothèque et versions | Compétences attribuées |
| Applications | Connexions disponibles | Applications autorisées |
| MCP | Serveurs enregistrés | Outils MCP autorisés |
| Modèles IA | Fournisseurs et modèles autorisés | Modèles utilisables |
| Clés API | Coffre de l’entreprise | Accès indirect selon les droits |
| Serveurs IA | Inventaire et politique | Environnement d'exécution affecté |
| Identité IA | Gouvernance et rattachement | Identité propre |
| Email et agenda | Domaines et politiques | Coordonnées propres |
| Téléphone | Fournisseur et budget | Ligne attribuée |
| Mémoire partagée | Entreprise | Lecture selon les droits |
| Mémoire privée | Politique de conservation | Mémoire propre du Collaborateur |

## Présentation Tarifaire

```
Alma Entreprise
Contrôle, connaissance, Stores, Gateway et infrastructure       50 €/mois

Unitalk Workspace & Desktop
Web, Desktop, missions, activité et validations                 Inclus

Collaborateur IA + profil Hermes
Identité, environnement, profils et outils                     49 €/mois

Capacité IA
Modèles, tokens et charge d'action                        0 à 100 €/mois

Co-créateur IA
Création, versionnage et publication                            50 €/mois
```

> **Alma Entreprise gouverne les ressources disponibles. Chaque Collaborateur IA reçoit ensuite une identité, des compétences, des applications, des canaux de communication et une capacité adaptés à ses missions.**
