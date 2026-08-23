"use client";

import Image from "next/image";
import { LocalizedLink as Link } from "@/components/localized-link";
import { useId, useState } from "react";
import { useRouter } from "next/navigation";
import { Anthropic, Gemini, Mistral, OpenAI } from "@lobehub/icons";
import { siGmail, siGooglecalendar, siHubspot } from "simple-icons";
import {
  ArrowRight,
  Building2,
  Check,
  Mail,
  Server,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import type { CollaboratorPage } from "@/lib/collaborator-pages";
import { AlmaMissionComposer } from "@/components/alma-mission-composer";
import { Kicker } from "@/components/home/section-kicker";
import { localizedHref, missionHref } from "@/lib/i18n-routing";

const COPY = {
  fr: {
    composerTitle: "Détaillez la mission que vous voulez confier à Hugo.",
    composerPlaceholder: "Décrivez le type de prospect recherché…",
    composerSubmit: "Confier cette mission à Hugo",
    personalizeHugo: "Confier une mission à Hugo",
    composerRole: "Collaboratrice IA · Coordinatrice de missions chez Unitalk",
    composerExamples: [
      "PME de 20 à 200 salariés",
      "Secteur logiciels B2B",
      "France · Directeurs commerciaux",
    ],
    trialProofs: ["Première mission offerte", "Sans carte bancaire"],
    createCommercial: "Créer mon Collaborateur IA commercial",
    proofs: [
      ["Profil métier", "Commercial"],
      ["Mission", "Prête à l’emploi"],
      ["Premier contact", "Soumis à validation"],
      ["Évolution", "Compétences à la demande"],
    ],
    proofKicker: "Mission commerciale · Exemple",
    proofTitle: "Hugo prépare. Votre équipe décide.",
    proofLead:
      "Il recherche, qualifie et prépare le CRM. Le premier contact reste bloqué jusqu’à votre validation.",
    decision: "Décision requise",
    approve: "Approuver",
    modify: "Modifier",
    decline: "Refuser",
    identityKicker: "Identité professionnelle",
    identityTitle: "Une identité IA. Autonome pour travailler.",
    identityLead:
      "Son identité, sa mémoire et ses compétences restent dans votre entreprise, même si son responsable change.",
    identityCta: "En savoir plus",
    identityCard: {
      header: "Carte d’identité de votre Collaborateur IA",
      owner: "Propriétaire",
      supervisor: "Supervision humaine",
      communication: "Canaux professionnels",
      memory: "Mémoire propre",
      shared: "Savoir de l’entreprise",
      execution: "Environnement privé",
      governance: "Accès et actions gouvernés par votre entreprise",
    },
    appsKicker: "Applications autorisées",
    appsBody:
      "Connectez uniquement les outils utiles à sa mission, avec les droits que vous décidez.",
    modelsKicker: "Unitalk AI Gateway",
    modelsTitle: "Le bon modèle. Sous vos règles.",
    modelsBody:
      "Hugo utilise uniquement les modèles et budgets autorisés par votre entreprise.",
    evolutionKicker: "Mission après mission",
    evolutionTitle: "Ses compétences évoluent. Son savoir-faire reste.",
    evolutionBody:
      "Hugo commence avec un profil commercial. Ajoutez ensuite de nouvelles compétences, applications et profils métier selon le travail confié.",
    evolutionItems: [
      "Ajouter un profil métier",
      "Installer une compétence",
      "Transmettre votre méthode",
      "Confier une nouvelle mission",
    ],
    finalTitle: "Prêt à confier votre prospection à Hugo ?",
    finalCta: "Confier la prospection à Hugo",
    pricing: "Voir les tarifs",
  },
  en: {
    composerTitle: "Describe the mission you want to assign to Hugo.",
    composerPlaceholder: "Describe the type of prospect you are looking for…",
    composerSubmit: "Assign this mission to Hugo",
    personalizeHugo: "Assign a mission to Hugo",
    composerRole: "Unitalk AI mission coordinator",
    composerExamples: [
      "Companies with 20–200 employees",
      "B2B software sector",
      "France · Sales directors",
    ],
    trialProofs: [
      "First mission included",
      "No credit card",
      "No commitment",
      "Human support when needed",
    ],
    createCommercial: "Create my Sales AI Collaborator",
    proofs: [
      ["AI identity", "Choose its name, face and voice."],
      [
        "Place in the organization",
        "Person, team, department or organization.",
      ],
      ["Organization ownership", "Identity, memory and know-how remain yours."],
      ["Profiles and skills", "Add them without recreating the identity."],
    ],
    proofKicker: "Sales mission · Example",
    proofTitle: "Hugo prospects. Your team decides.",
    proofLead:
      "He researches and qualifies from your criteria, prepares the CRM and stops before first contact until your team approves.",
    decision: "Decision required",
    approve: "Approve",
    modify: "Amend",
    decline: "Decline",
    identityKicker: "Professional identity",
    identityTitle: "One AI identity. Autonomous at work.",
    identityLead:
      "Hugo belongs to your organization, not to the person supervising him. If that person leaves, his identity, memory and know-how remain within the organization.",
    identityCta: "Learn more",
    identityCard: {
      header: "Your AI Collaborator identity card",
      owner: "Owning organization",
      supervisor: "Human supervision",
      communication: "Professional channels",
      memory: "Own memory",
      shared: "Organization knowledge",
      execution: "Private environment",
      governance: "Access and actions governed by your organization",
    },
    appsKicker: "Authorized applications",
    appsBody:
      "Applications useful to each mission are assigned under your permissions. More than 3,000 connectors may be available depending on setup.",
    modelsKicker: "Unitalk AI Gateway",
    modelsTitle: "The right model for each task. Under your rules.",
    modelsBody:
      "Hugo only uses models authorized by your organization, within the defined budget.",
    evolutionKicker: "Mission after mission",
    evolutionTitle: "His skills evolve. His know-how remains.",
    evolutionBody:
      "Hugo starts with a sales profile. Add new methods, applications and responsibilities as you assign new work.",
    evolutionItems: [
      "Additional job profiles",
      "Skills tested by the community",
      "Methods specific to your organization",
      "New missions without starting over",
    ],
    finalTitle:
      "What first mission will you assign to your Sales AI Collaborator?",
    finalCta: "Start with Alma",
    pricing: "View pricing",
  },
} as const;

const PERSONAS = {
  emma: {
    claim: {
      fr: "Emma orchestre vos priorités et libère du temps pour l’essentiel.",
      en: "Emma orchestrates your priorities and frees up time for what matters most.",
    },
    accent: { fr: "libère du temps pour l’essentiel", en: "frees up time for what matters most" },
    lead: {
      fr: "Commencez par votre prochaine réunion d’équipe. Emma réunit les informations utiles, prépare l’ordre du jour et organise le suivi des actions.",
      en: "Start with your next team meeting. Emma gathers useful information, prepares the agenda and organizes action tracking.",
    },
    composer: {
      fr: "Emma prépare et suit votre prochaine réunion d’équipe.",
      en: "Emma prepares and follows up your next team meeting.",
    },
    placeholder: {
      fr: "Décrivez la réunion, les participants, les documents et le résultat attendu…",
      en: "Describe the meeting, participants, documents and expected outcome…",
    },
    examples: {
      fr: [
        "Préparer ma réunion d’équipe",
        "Organiser mes rendez-vous de la semaine",
        "Suivre les actions décidées",
      ],
      en: [
        "Prepare my team meeting",
        "Organize this week’s appointments",
        "Track agreed actions",
      ],
    },
    proofTitle: {
      fr: "Emma prépare. Votre équipe décide.",
      en: "Emma prepares. Your team decides.",
    },
    proofMission: {
      fr: "Préparer la réunion d’équipe hebdomadaire",
      en: "Prepare the weekly team meeting",
    },
    activity: {
      fr: [
        "4 documents et 5 participants réunis.",
        "3 décisions en attente de suivi identifiées.",
        "Ordre du jour et liste d’actions prêts à valider.",
      ],
      en: [
        "Documents and participants gathered.",
        "5 open points identified.",
        "Agenda and summary prepared.",
      ],
    },
    decision: {
      fr: "Valider l’ordre du jour avant de l’envoyer à l’équipe ?",
      en: "Approve the agenda before sending it to the team?",
    },
    apps: ["Gmail", "Outlook", "Agenda", "Notion", "Slack", "Teams"],
    profiles: {
      fr: [
        "Assistante de direction",
        "Cheffe de cabinet",
        "Coordinatrice de réunions",
      ],
      en: ["Executive Assistant", "Chief of Staff", "Meeting Coordinator"],
    },
  },
  lea: {
    claim: {
      fr: "Léa fait vivre votre marque sur tous vos canaux.",
      en: "Léa brings your brand to life across every channel.",
    },
    accent: { fr: "sur tous vos canaux", en: "across every channel" },
    lead: {
      fr: "Donnez-lui vos objectifs, votre ton et vos canaux. Elle prépare le calendrier, les briefs et les contenus à valider.",
      en: "Give her your goals, tone and channels. She prepares the calendar, briefs and content for approval.",
    },
    composer: {
      fr: "Léa prépare votre prochain calendrier éditorial.",
      en: "Léa prepares your next editorial calendar.",
    },
    placeholder: {
      fr: "Décrivez l’audience, les objectifs, les canaux et le ton de marque…",
      en: "Describe the audience, goals, channels and brand tone…",
    },
    examples: {
      fr: [
        "Construire mon calendrier éditorial",
        "Préparer une campagne de contenu",
        "Analyser mes performances",
      ],
      en: [
        "Build my editorial calendar",
        "Prepare a content campaign",
        "Analyze my performance",
      ],
    },
    proofTitle: {
      fr: "Léa prépare les contenus. Votre équipe garde la ligne éditoriale.",
      en: "Léa prepares content. Your team owns the editorial line.",
    },
    proofMission: {
      fr: "Construire le calendrier éditorial",
      en: "Build the editorial calendar",
    },
    activity: {
      fr: [
        "Objectifs et audiences analysés.",
        "12 sujets répartis par canal.",
        "Briefs et calendrier préparés.",
      ],
      en: [
        "Goals and audiences analyzed.",
        "12 topics assigned by channel.",
        "Briefs and calendar prepared.",
      ],
    },
    decision: {
      fr: "Valider les thèmes avant production ?",
      en: "Approve themes before production?",
    },
    apps: ["Notion", "Canva", "WordPress", "LinkedIn", "Analytics", "Gmail"],
    profiles: {
      fr: [
        "Responsable éditoriale",
        "Community manager",
        "Analyste de contenu",
      ],
      en: ["Editorial Lead", "Community Manager", "Content Analyst"],
    },
  },
  arthur: {
    claim: {
      fr: "Arthur fait avancer vos produits et votre technologie.",
      en: "Arthur moves your products and technology forward.",
    },
    accent: { fr: "vos produits et votre technologie", en: "your products and technology" },
    lead: {
      fr: "Confiez-lui un ticket et le contexte autorisé. Il prépare le correctif, les tests et la documentation avant toute fusion.",
      en: "Give him a ticket and authorized context. He prepares the fix, tests and documentation before any merge.",
    },
    composer: {
      fr: "Arthur prépare le correctif de votre prochain bug prioritaire.",
      en: "Arthur prepares the fix for your next priority bug.",
    },
    placeholder: {
      fr: "Décrivez le ticket, le comportement attendu, le dépôt et les contraintes techniques…",
      en: "Describe the ticket, expected behavior, repository and technical constraints…",
    },
    examples: {
      fr: [
        "Corriger un bug prioritaire",
        "Implémenter une fonctionnalité",
        "Documenter une API",
      ],
      en: ["Fix a priority bug", "Implement a feature", "Document an API"],
    },
    proofTitle: {
      fr: "Arthur prépare le code. Votre équipe valide la fusion.",
      en: "Arthur prepares the code. Your team approves the merge.",
    },
    proofMission: {
      fr: "Corriger un bug prioritaire",
      en: "Fix a priority bug",
    },
    activity: {
      fr: [
        "Ticket et logs analysés.",
        "Correctif et tests préparés.",
        "Résultats CI documentés.",
      ],
      en: [
        "Ticket and logs analyzed.",
        "Fix and tests prepared.",
        "CI results documented.",
      ],
    },
    decision: {
      fr: "Autoriser la fusion du correctif ?",
      en: "Authorize merging the fix?",
    },
    apps: ["GitHub", "GitLab", "Linear", "Jira", "Slack", "CI/CD"],
    profiles: {
      fr: ["Développeur", "Relecteur de code", "Rédacteur technique"],
      en: ["Developer", "Code Reviewer", "Technical Writer"],
    },
  },
  hugo: {
    claim: {
      fr: "Hugo développe vos opportunités commerciales.",
      en: "Hugo develops your sales opportunities.",
    },
    accent: { fr: "vos opportunités commerciales", en: "your sales opportunities" },
    lead: {
      fr: "Hugo recherche et qualifie vos prospects, prépare votre CRM et organise les relances. Votre équipe garde la main sur le premier contact.",
      en: "Give him your criteria. He researches companies, prepares CRM records and organizes follow-ups. Your team approves the first contact.",
    },
    composer: {
      fr: "Des prospects qualifiés, prêts à être examinés.",
      en: "Hugo finds and qualifies your prospects.",
    },
    placeholder: {
      fr: "Précisez simplement les prospects recherchés…",
      en: "Simply describe the prospects you are looking for…",
    },
    examples: {
      fr: [
        "PME de 20 à 200 salariés",
        "Secteur logiciels B2B",
        "France · Directeurs commerciaux",
      ],
      en: [
        "Companies with 20–200 employees",
        "B2B software sector",
        "France · Sales directors",
      ],
    },
    proofTitle: {
      fr: (
        <>
          Hugo prospecte.
          <br />
          <span className="whitespace-nowrap">Votre équipe décide.</span>
        </>
      ),
      en: (
        <>
          Hugo prospects.
          <br />
          <span className="whitespace-nowrap">Your team decides.</span>
        </>
      ),
    },
    proofMission: {
      fr: "Qualifier les nouveaux prospects",
      en: "Qualify new prospects",
    },
    activity: {
      fr: [
        "34 entreprises analysées.",
        "9 correspondent au segment cible.",
        "9 prospects qualifiés.",
      ],
      en: [
        "34 companies analyzed.",
        "9 match the target segment.",
        "9 qualified prospects.",
      ],
    },
    decision: {
      fr: "Autoriser la préparation du premier contact ?",
      en: "Authorize first-contact preparation?",
    },
    apps: ["HubSpot", "Salesforce", "LinkedIn", "Gmail", "Outlook", "Agenda"],
    profiles: {
      fr: ["Commercial", "Business developer", "Account manager"],
      en: ["Sales Representative", "Business Developer", "Account Manager"],
    },
  },
  camille: {
    claim: {
      fr: "Camille transforme les signaux du marché en décisions mieux préparées.",
      en: "Camille turns market signals into better-prepared decisions.",
    },
    accent: { fr: "en décisions mieux préparées", en: "into better-prepared decisions" },
    lead: {
      fr: "Donnez-lui votre marché, vos concurrents et vos critères. Camille recherche, recoupe les sources et prépare une note de veille. Votre équipe valide les conclusions avant leur diffusion.",
      en: "Give her your market, competitors and criteria. Camille researches, cross-checks sources and prepares an intelligence brief. Your team reviews the conclusions before distribution.",
    },
    composer: {
      fr: "Une veille concurrentielle sourcée, prête à être examinée.",
      en: "Sourced competitive intelligence, ready for review.",
    },
    placeholder: {
      fr: "Précisez le marché, les concurrents, la période et les signaux à surveiller…",
      en: "Specify the market, competitors, period and signals to monitor…",
    },
    examples: {
      fr: [
        "Surveiller mes 5 principaux concurrents",
        "Comparer leurs offres et leurs prix",
        "Détecter les signaux faibles du marché",
      ],
      en: [
        "Monitor my 5 main competitors",
        "Compare their offers and pricing",
        "Detect weak market signals",
      ],
    },
    proofTitle: {
      fr: "Camille recoupe les faits. Votre équipe décide de leur portée.",
      en: "Camille cross-checks the facts. Your team decides what they mean.",
    },
    proofMission: {
      fr: "Réaliser une veille concurrentielle",
      en: "Run competitive monitoring",
    },
    activity: {
      fr: [
        "28 sources publiques consultées.",
        "6 évolutions concurrentes recoupées.",
        "3 signaux à fort impact isolés.",
      ],
      en: [
        "28 public sources reviewed.",
        "6 competitor changes cross-checked.",
        "3 high-impact signals isolated.",
      ],
    },
    decision: {
      fr: "Valider les conséquences proposées pour la note de direction ?",
      en: "Approve the proposed implications for the executive brief?",
    },
    apps: ["Web", "Notion", "Google Sheets", "Excel", "Power BI", "Drive"],
    profiles: {
      fr: ["Analyste stratégie", "Chargée de veille", "Analyste concurrentielle"],
      en: ["Strategy Analyst", "Intelligence Analyst", "Competitive Analyst"],
    },
  },
  gabriel: {
    claim: {
      fr: "Gabriel transforme vos offres fournisseurs en choix mieux maîtrisés.",
      en: "Gabriel turns supplier offers into better-controlled choices.",
    },
    accent: { fr: "en choix mieux maîtrisés", en: "into better-controlled choices" },
    lead: {
      fr: "Confiez-lui vos offres et vos critères. Gabriel compare les prix, les conditions et les risques dans une matrice homogène. Votre équipe garde la négociation et la décision finale.",
      en: "Give him your offers and criteria. Gabriel compares prices, terms and risks in a consistent matrix. Your team retains negotiation and the final decision.",
    },
    composer: {
      fr: "Des offres fournisseurs comparables, prêtes à être arbitrées.",
      en: "Comparable supplier offers, ready for a decision.",
    },
    placeholder: {
      fr: "Précisez le besoin, les fournisseurs, les critères et les contraintes contractuelles…",
      en: "Specify the need, suppliers, criteria and contractual constraints…",
    },
    examples: {
      fr: [
        "Comparer trois offres logicielles",
        "Préparer le renouvellement d’un contrat",
        "Évaluer les risques fournisseurs",
      ],
      en: [
        "Compare three software offers",
        "Prepare a contract renewal",
        "Assess supplier risks",
      ],
    },
    proofTitle: {
      fr: "Gabriel compare les offres. Votre équipe choisit et négocie.",
      en: "Gabriel compares offers. Your team chooses and negotiates.",
    },
    proofMission: {
      fr: "Comparer les offres fournisseurs",
      en: "Compare supplier offers",
    },
    activity: {
      fr: [
        "3 offres normalisées sur 12 critères.",
        "5 écarts contractuels signalés.",
        "2 risques majeurs isolés.",
      ],
      en: [
        "3 offers normalized across 12 criteria.",
        "5 contractual gaps flagged.",
        "2 major risks isolated.",
      ],
    },
    decision: {
      fr: "Valider la sélection des deux fournisseurs à recevoir en négociation ?",
      en: "Approve the two suppliers selected for negotiation?",
    },
    apps: ["ERP", "Email", "Excel", "Google Sheets", "Drive", "Gestion des contrats"],
    profiles: {
      fr: ["Analyste achats", "Acheteur", "Gestionnaire fournisseurs"],
      en: ["Procurement Analyst", "Buyer", "Supplier Manager"],
    },
  },
  nadia: {
    claim: {
      fr: "Nadia éclaire vos décisions financières.",
      en: "Nadia brings clarity to your financial decisions.",
    },
    accent: { fr: "vos décisions financières", en: "your financial decisions" },
    lead: {
      fr: "Commencez par vos factures impayées. Nadia vérifie les dossiers, prépare chaque relance et isole les litiges. Elle étend ensuite son périmètre au reporting, à la trésorerie et aux prévisions.",
      en: "Start with overdue invoices. Nadia reviews each case, prepares follow-ups and isolates disputes. She can then extend her scope to reporting, cash flow and forecasting.",
    },
    composer: {
      fr: "Nadia vérifie vos factures impayées et prépare les relances.",
      en: "Nadia reviews your overdue invoices and prepares the follow-ups.",
    },
    placeholder: {
      fr: "Décrivez les données, la période, les indicateurs et les hypothèses à vérifier…",
      en: "Describe the data, period, metrics and assumptions to review…",
    },
    examples: {
      fr: [
        "Préparer mon reporting mensuel",
        "Mettre à jour ma trésorerie",
        "Analyser les écarts budgétaires",
      ],
      en: [
        "Prepare my monthly report",
        "Update my cash forecast",
        "Analyze budget variances",
      ],
    },
    proofTitle: {
      fr: "Nadia prépare. Votre équipe garde la décision.",
      en: "Nadia prepares. Your team keeps the decision.",
    },
    proofMission: {
      fr: "Relancer les factures impayées",
      en: "Follow up on overdue invoices",
    },
    activity: {
      fr: [
        "12 factures échues identifiées dans les sources autorisées.",
        "2 dossiers litigieux isolés pour traitement humain.",
        "10 relances contextualisées prêtes à envoyer.",
      ],
      en: [
        "12 overdue invoices identified in authorized sources.",
        "2 disputed cases isolated for human review.",
        "10 contextual follow-ups ready to send.",
      ],
    },
    decision: {
      fr: "Autoriser l’envoi des 10 relances préparées ?",
      en: "Authorize sending the 10 prepared follow-ups?",
    },
    apps: ["Pennylane", "Qonto", "Excel", "Google Sheets", "ERP", "Power BI"],
    profiles: {
      fr: [
        "Analyste financière",
        "Contrôleuse de gestion",
        "Responsable reporting",
      ],
      en: ["Financial Analyst", "Management Controller", "Reporting Manager"],
    },
  },
  ines: {
    claim: {
      fr: "Inès fluidifie chaque étape de votre relation client.",
      en: "Inès streamlines every step of your customer relationship.",
    },
    accent: { fr: "votre relation client", en: "your customer relationship" },
    lead: {
      fr: "Confiez-lui les demandes entrantes. Elle classe, prépare les réponses et soumet les gestes commerciaux ou cas sensibles.",
      en: "Entrust her with inbound requests. She classifies, prepares replies and submits commercial gestures or sensitive cases.",
    },
    composer: {
      fr: "Inès prépare les réponses à vos demandes clients.",
      en: "Inès prepares replies to your customer requests.",
    },
    placeholder: {
      fr: "Décrivez les demandes, les règles de réponse et les cas à faire valider…",
      en: "Describe the requests, response rules and cases requiring approval…",
    },
    examples: {
      fr: [
        "Traiter les tickets du matin",
        "Répondre aux réclamations",
        "Mettre à jour ma FAQ",
      ],
      en: ["Handle morning tickets", "Answer complaints", "Update my FAQ"],
    },
    proofTitle: {
      fr: "Inès prépare les réponses. Votre équipe arbitre les cas sensibles.",
      en: "Inès prepares replies. Your team decides sensitive cases.",
    },
    proofMission: {
      fr: "Traiter les demandes clients",
      en: "Handle customer requests",
    },
    activity: {
      fr: [
        "18 demandes classées.",
        "13 réponses contextualisées préparées.",
        "3 cas sensibles isolés.",
      ],
      en: [
        "18 requests classified.",
        "13 contextual replies prepared.",
        "3 sensitive cases isolated.",
      ],
    },
    decision: {
      fr: "Autoriser un geste commercial exceptionnel ?",
      en: "Authorize an exceptional commercial gesture?",
    },
    apps: ["Zendesk", "Intercom", "Gmail", "Outlook", "CRM", "FAQ"],
    profiles: {
      fr: ["Support client", "Chargée de réclamations", "Gestionnaire de FAQ"],
      en: ["Customer Support", "Claims Specialist", "FAQ Manager"],
    },
  },
} as const;

function genericPersona(detail: CollaboratorPage["detail"]) {
  const firstMissions = detail.missions.slice(0, 3);
  const domainClaim = {
    chloe: {
      claim: { fr: "Chloé développe vos équipes.", en: "Chloé grows your teams." },
      accent: { fr: "développe vos équipes", en: "grows your teams" },
    },
    iris: {
      claim: { fr: "Iris transforme les besoins utilisateurs en produits mieux conçus.", en: "Iris turns user needs into better-designed products." },
      accent: { fr: "en produits mieux conçus", en: "into better-designed products" },
    },
    lucas: {
      claim: { fr: "Lucas fluidifie vos opérations et garde vos projets sur la bonne trajectoire.", en: "Lucas streamlines operations and keeps projects on track." },
      accent: { fr: "vos projets sur la bonne trajectoire", en: "projects on track" },
    },
    marcus: {
      claim: { fr: "Marcus sécurise vos contrats et votre conformité.", en: "Marcus safeguards your contracts and compliance." },
      accent: { fr: "vos contrats et votre conformité", en: "your contracts and compliance" },
    },
  }[detail.slug];
  const concreteComposer = detail.slug === "chloe"
    ? {
        fr: "Chloé présélectionne les candidatures pour votre prochain recrutement.",
        en: "Chloé screens applicants for your next hire.",
      }
    : detail.slug === "iris"
      ? {
          fr: "Iris prépare la spécification de votre prochaine évolution produit.",
          en: "Iris prepares the specification for your next product update.",
        }
      : detail.slug === "lucas"
        ? {
            fr: "Lucas met à jour le suivi de votre prochain projet transverse.",
            en: "Lucas updates the tracking for your next cross-functional project.",
          }
      : detail.slug === "marcus"
        ? {
            fr: "Marcus prépare la revue de votre prochain contrat.",
            en: "Marcus prepares the review of your next contract.",
          }
      : {
          fr: `Quelle première mission souhaitez-vous confier à ${detail.name} ?`,
          en: `What first mission would you like to assign to ${detail.name}?`,
        };
  return {
    claim: domainClaim?.claim ?? detail.promise,
    accent: domainClaim?.accent ?? detail.role,
    lead: detail.description,
    composer: concreteComposer,
    placeholder: {
      fr: "Décrivez le contexte, le résultat attendu, les sources autorisées et les validations nécessaires…",
      en: "Describe the context, expected result, authorized sources and required approvals…",
    },
    examples: {
      fr: firstMissions.map((mission) => mission.fr),
      en: firstMissions.map((mission) => mission.en),
    },
    proofTitle: {
      fr: `${detail.name} prépare. Votre équipe décide.`,
      en: `${detail.name} prepares. Your team decides.`,
    },
    proofMission: firstMissions[0] ?? detail.promise,
    activity: {
      fr: ["Contexte autorisé analysé.", "Livrable préparé selon vos règles.", "Décision humaine demandée avant toute action engageante."],
      en: ["Authorized context analyzed.", "Deliverable prepared under your rules.", "Human decision requested before any binding action."],
    },
    decision: {
      fr: "Autoriser la prochaine action préparée ?",
      en: "Authorize the next prepared action?",
    },
    apps: detail.tools,
    profiles: {
      fr: [detail.role.fr, ...detail.skills.slice(0, 2).map((skill) => skill.fr)],
      en: [detail.role.en, ...detail.skills.slice(0, 2).map((skill) => skill.en)],
    },
  };
}

export function CollaborateurContent({
  page,
}: {
  page: CollaboratorPage;
  equipmentId?: string;
}) {
  const { lang } = useLanguage();
  const router = useRouter();
  const t = COPY[lang];
  const { detail, missions } = page;
  const persona = PERSONAS[detail.slug as keyof typeof PERSONAS] ?? genericPersona(detail);
  const isMissionLedProfile = true;
  const primaryMission = detail.slug === "emma"
    ? lang === "fr"
      ? "Préparer et suivre ma prochaine réunion d’équipe"
      : "Prepare and follow up my next team meeting"
    : detail.slug === "nadia"
    ? lang === "fr"
      ? "Relancer mes factures impayées"
      : "Follow up on my overdue invoices"
    : detail.slug === "lea"
      ? lang === "fr"
        ? "Construire mon calendrier éditorial"
        : "Build my editorial calendar"
    : detail.slug === "arthur"
      ? lang === "fr"
        ? "Corriger mon bug prioritaire"
        : "Fix my priority bug"
    : detail.slug === "ines"
      ? lang === "fr"
        ? "Traiter mes demandes clients"
        : "Handle my customer requests"
    : detail.slug === "chloe"
      ? lang === "fr"
        ? "Présélectionner mes candidatures"
        : "Screen my job applications"
    : detail.slug === "iris"
      ? lang === "fr"
        ? "Préparer ma spécification produit"
        : "Prepare my product specification"
    : detail.slug === "lucas"
      ? lang === "fr"
        ? "Suivre mon projet transverse"
        : "Track my cross-functional project"
    : detail.slug === "marcus"
      ? lang === "fr"
        ? "Préparer ma revue de contrat"
        : "Prepare my contract review"
    : detail.slug === "hugo"
      ? lang === "fr"
        ? "Trouver et qualifier mes prospects"
        : "Find and qualify my prospects"
    : detail.slug === "camille"
      ? lang === "fr"
        ? "Réaliser ma veille concurrentielle"
        : "Run my competitive monitoring"
    : detail.slug === "gabriel"
      ? lang === "fr"
        ? "Comparer mes offres fournisseurs"
        : "Compare my supplier offers"
      : detail.starterMission?.mission[lang] ?? detail.missions[0][lang];
  const primaryCta = detail.slug === "emma"
    ? lang === "fr"
      ? "Confier une première mission à Emma"
      : "Assign a first mission to Emma"
    : detail.slug === "nadia"
    ? lang === "fr"
      ? "Confier mes relances à Nadia"
      : "Assign my follow-ups to Nadia"
    : detail.slug === "lea"
      ? lang === "fr"
        ? "Construire mon calendrier avec Léa"
        : "Build my calendar with Léa"
    : detail.slug === "arthur"
      ? lang === "fr"
        ? "Préparer le correctif avec Arthur"
        : "Prepare the fix with Arthur"
    : detail.slug === "ines"
      ? lang === "fr"
        ? "Traiter mes demandes avec Inès"
        : "Handle my requests with Inès"
    : detail.slug === "chloe"
      ? lang === "fr"
        ? "Présélectionner mes candidatures avec Chloé"
        : "Screen my applicants with Chloé"
    : detail.slug === "iris"
      ? lang === "fr"
        ? "Préparer ma spécification avec Iris"
        : "Prepare my specification with Iris"
    : detail.slug === "lucas"
      ? lang === "fr"
        ? "Suivre mon projet avec Lucas"
        : "Track my project with Lucas"
    : detail.slug === "marcus"
      ? lang === "fr"
        ? "Préparer ma revue avec Marcus"
        : "Prepare my review with Marcus"
    : detail.slug === "hugo"
      ? t.finalCta
    : detail.slug === "camille"
      ? lang === "fr"
        ? "Lancer ma veille avec Camille"
        : "Start monitoring with Camille"
    : detail.slug === "gabriel"
      ? lang === "fr"
        ? "Comparer mes offres avec Gabriel"
        : "Compare my offers with Gabriel"
      : lang === "fr"
        ? `Confier cette mission à ${detail.name}`
        : `Assign this mission to ${detail.name}`;
  const exampleMissionSlug = detail.slug === "hugo"
    ? "trouver-de-nouveaux-clients"
    : detail.slug === "camille"
      ? "realiser-une-veille-concurrentielle"
    : detail.slug === "gabriel"
      ? "comparer-les-offres-fournisseurs"
    : detail.slug === "nadia"
      ? "relancer-les-factures-impayees"
      : detail.slug === "emma"
        ? "preparer-et-suivre-mes-reunions"
      : null;
  const featuredMissions = exampleMissionSlug
    ? missions.filter((mission) => mission.slug !== exampleMissionSlug)
    : missions;
  const [missionRequest, setMissionRequest] = useState("");
  const [decision, setDecision] = useState<
    "approved" | "modified" | "declined" | null
  >(null);
  const outcome =
    decision === "approved"
      ? lang === "fr"
        ? `${detail.name} poursuit la mission selon votre décision.`
        : `${detail.name} continues the mission under your decision.`
      : decision === "modified"
        ? lang === "fr"
          ? `${detail.name} reprend le travail avec vos nouvelles consignes.`
          : `${detail.name} revises the work under your new instructions.`
        : decision === "declined"
          ? lang === "fr"
            ? "L’action reste bloquée. Le travail préparé reste disponible."
            : "The action remains blocked. The prepared work stays available."
          : null;

  function submitMission() {
    const clean = missionRequest.trim();
    if (!clean) return;
    const draftId = `draft_${crypto.randomUUID()}`;
    try {
      localStorage.setItem(
        `unitalk_mission_${draftId}`,
        JSON.stringify({
          text: clean,
          collaborator: detail.slug,
          createdAt: Date.now(),
        }),
      );
    } catch {}
    router.push(
      `${localizedHref("discover", lang)}?draft=${encodeURIComponent(draftId)}&collaborateur=${encodeURIComponent(detail.slug)}&source=profile-store`,
    );
  }

  function startPrimaryMission() {
    const draftId = `draft_${crypto.randomUUID()}`;
    try {
      localStorage.setItem(
        `unitalk_mission_${draftId}`,
        JSON.stringify({
          text: primaryMission,
          collaborator: detail.slug,
          createdAt: Date.now(),
        }),
      );
    } catch {}
    router.push(
      `${localizedHref("discover", lang)}?draft=${encodeURIComponent(draftId)}&collaborateur=${encodeURIComponent(detail.slug)}&source=profile-store`,
    );
  }

  return (
    <main className={`collaborator-profile-page collaborator-profile-mission-led flex flex-col overflow-hidden bg-[#F3EFE6] text-[#1C1A17]`}>
      <section className="collaborator-hero order-1 relative pb-8 pt-28 sm:pb-14 sm:pt-40 lg:flex lg:min-h-[720px] lg:items-center lg:pb-20 lg:pt-32">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[.04] [background-image:linear-gradient(#1C1A17_1px,transparent_1px),linear-gradient(90deg,#1C1A17_1px,transparent_1px)] [background-size:72px_72px]"
        />
        <div className="editorial-shell relative w-full">
          <div className="grid min-w-0 gap-7 sm:gap-9 lg:grid-cols-[1.16fr_.84fr] lg:items-center lg:gap-12 xl:gap-16">
            <div className="min-w-0">
              <div className="inline-flex max-w-full items-center gap-3 rounded-full border border-[#D8D0C2] bg-[#FAF8F3]/85 py-1.5 pl-1.5 pr-4 shadow-sm backdrop-blur">
                <Image
                  src={detail.avatar}
                  alt=""
                  width={36}
                  height={36}
                  priority
                  className="size-9 rounded-full border border-[#CFC5B5] object-cover"
                />
                <span className="min-w-0 truncate text-[13px] font-bold text-[#4E483F] sm:text-sm">
                  {detail.name} · {lang === "fr" ? `${detail.gender === "female" ? "Collaboratrice" : "Collaborateur"} IA · Profil ${detail.role.fr.toLowerCase()}` : `AI Collaborator · ${detail.role.en} profile`}
                </span>
              </div>
              <h1 className={`mt-5 max-w-[780px] font-sf font-bold leading-[.92] tracking-[-.062em] sm:mt-6 ${detail.slug === "gabriel" ? "text-[clamp(2.45rem,4.35vw,4.55rem)]" : "text-[clamp(2.55rem,5vw,5.1rem)]"}`}>
                {highlightClaim(persona.claim[lang], persona.accent[lang])}
              </h1>
              <p className="mt-5 max-w-[650px] text-[16px] font-medium leading-7 text-[#4E483F] sm:mt-7 sm:text-[17px] sm:leading-8">
                {persona.lead[lang]}
              </p>
              {!isMissionLedProfile && (
                <Link
                  href="#alma-profile"
                  className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[#181615] px-6 text-sm font-bold text-white shadow-[0_14px_34px_-20px_rgba(28,26,23,.7)] hover:bg-[#2A2622]"
                >
                  {lang === "fr"
                    ? `Adapter le profil ${detail.role.fr} avec Alma`
                    : `Tailor the ${detail.role.en} profile with Alma`}
                </Link>
              )}
            </div>
            <div id="alma-profile" className="scroll-mt-24">
              {isMissionLedProfile ? (
                <article className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#17130F] p-5 text-[#F8F1E7] shadow-[0_34px_80px_-28px_rgba(23,19,15,.65)] sm:p-7 lg:max-w-[520px] lg:justify-self-end">
                  <div
                    aria-hidden
                    className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#F15B9B] to-transparent"
                  />
                  <div className="flex items-center gap-3">
                    <Image
                      src={detail.avatar}
                      alt={detail.name}
                      width={52}
                      height={52}
                      className="size-[52px] rounded-full object-cover ring-2 ring-[#D10E63]/35"
                    />
                    <div>
                      <p className="font-sf text-lg font-bold">{detail.name}</p>
                      <p className="text-xs font-semibold text-[#F2A4C5]">
                        {lang === "fr"
                          ? `Profil métier · ${detail.role.fr}`
                          : `Job profile · ${detail.role.en}`}
                      </p>
                    </div>
                  </div>
                  <dl className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">
                    <div className="bg-[#211E1A] p-4"><dt className="font-mono text-[9px] font-black uppercase tracking-[.12em] text-[#F2A4C5]">{lang === "fr" ? "Département de référence" : "Reference department"}</dt><dd className="mt-2 text-xs font-semibold text-[#E7E0D5]">{detail.department[lang]}</dd></div>
                    <div className="bg-[#211E1A] p-4"><dt className="font-mono text-[9px] font-black uppercase tracking-[.12em] text-[#F2A4C5]">{lang === "fr" ? "Rattachement possible" : "Possible placement"}</dt><dd className="mt-2 text-xs font-semibold leading-5 text-[#E7E0D5]">{lang === "fr" ? "Personne · Équipe · Département · Entreprise" : "Person · Team · Department · Organization"}</dd></div>
                  </dl>
                  <div className="py-6 sm:py-10">
                    <h2 className="text-balance font-sf text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-[1.02] tracking-[-.04em]">
                      {persona.composer[lang]}
                    </h2>
                      <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[13px] font-bold text-[#D6CABD]">
                        {t.trialProofs.map((proof) => <li key={proof} className="flex items-center gap-2"><Check className="size-4 text-[#F2A4C5]" />{proof}</li>)}
                      </ul>
                    </div>
                  <button
                    type="button"
                    onClick={startPrimaryMission}
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#E51872] px-6 text-sm font-bold text-white transition-colors hover:bg-[#F02A82]"
                  >
                    {primaryCta}
                    <ArrowRight className="size-4" />
                  </button>
                </article>
              ) : (
                <AlmaMissionComposer
                  value={missionRequest}
                  onChange={setMissionRequest}
                  onSubmit={submitMission}
                  title={persona.composer[lang]}
                  body=""
                  role={t.composerRole}
                  placeholder={persona.placeholder[lang]}
                  submitLabel={
                    lang === "fr"
                      ? `Confier cette mission à ${detail.name}`
                      : `Assign this mission to ${detail.name}`
                  }
                  starters={persona.examples[lang]}
                  listening={false}
                  onToggleListening={() => {}}
                  voiceSupported={false}
                  voiceStartLabel=""
                  voiceStopLabel=""
                  compactMobile
                  compactDesktop
                />
              )}
              {!isMissionLedProfile && <ul className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 lg:max-w-[520px] lg:justify-self-end">{t.trialProofs.map((proof) => <li key={proof} className="flex items-center gap-2 text-xs font-semibold text-[#625B50]"><Check className="size-3.5 text-[#D10E63]" />{proof}</li>)}</ul>}
            </div>
          </div>
        </div>
      </section>

      <CollaboratorMissions lang={lang} detail={detail} missions={featuredMissions} />

      <section
        id="mission-en-action"
        className="collaborator-proof order-3 scroll-mt-24 bg-[#181615] py-20 text-white sm:py-24"
      >
        <div className="editorial-shell grid gap-10 lg:grid-cols-[1.02fr_.98fr] lg:items-center lg:gap-12 xl:gap-16">
          <div>
            <p className="font-mono text-[10px] font-black uppercase tracking-[.18em] text-[#F2A4C5]">
              {detail.department[lang]} ·{" "}
              {lang === "fr" ? "Exemple" : "Example"}
            </p>
            <h2 className="mt-5 text-[clamp(2.35rem,4vw,4rem)] font-bold leading-[.98] tracking-[-.05em]">
              {persona.proofTitle[lang]}
            </h2>
            <p className="mt-6 max-w-xl text-[16px] font-medium leading-8 text-[#CFC6B8]">
              {detail.slug === "emma"
                ? lang === "fr"
                  ? "Emma consulte uniquement les documents autorisés, prépare l’ordre du jour et soumet toute diffusion à votre validation."
                  : "Emma only reviews authorized documents, prepares the agenda and submits any distribution for your approval."
                : detail.slug === "nadia"
                ? lang === "fr"
                  ? "Nadia consulte uniquement les factures autorisées, prépare les relances et soumet chaque envoi à votre validation."
                  : "Nadia only reviews authorized invoices, prepares follow-ups and submits every send for your approval."
                : detail.slug === "camille"
                ? lang === "fr"
                  ? "Camille consulte uniquement les sources autorisées, distingue les faits des hypothèses et conserve un lien vers chaque élément utilisé."
                  : "Camille only reviews authorized sources, separates facts from assumptions and keeps a link to every item used."
                : detail.slug === "gabriel"
                ? lang === "fr"
                  ? "Gabriel analyse uniquement les offres et contrats autorisés, rend les écarts comparables et soumet toute sélection à votre validation."
                  : "Gabriel only analyzes authorized offers and contracts, makes gaps comparable and submits every selection for your approval."
                : persona.lead[lang]}
            </p>
            {["nadia", "emma", "camille", "gabriel"].includes(detail.slug) && (
              <dl className="mt-7 grid max-w-xl gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">
                {(detail.slug === "emma"
                  ? lang === "fr"
                    ? [["Sources", "Documents et agendas autorisés"], ["Action", "Ordre du jour préparé, jamais diffusé seul"], ["Confidentialité", "Aucun enregistrement automatique"]]
                    : [["Sources", "Authorized documents and calendars"], ["Action", "Agenda prepared, never shared alone"], ["Privacy", "No automatic recording"]]
                  : detail.slug === "camille"
                    ? lang === "fr"
                      ? [["Sources", "Publiques ou bases autorisées"], ["Méthode", "Faits recoupés et datés"], ["Décision", "Conséquences soumises à validation"]]
                      : [["Sources", "Public or authorized databases"], ["Method", "Cross-checked, dated facts"], ["Decision", "Implications submitted for review"]]
                  : detail.slug === "gabriel"
                    ? lang === "fr"
                      ? [["Sources", "Offres et contrats autorisés"], ["Méthode", "Critères normalisés et traçables"], ["Décision", "Sélection et négociation humaines"]]
                      : [["Sources", "Authorized offers and contracts"], ["Method", "Normalized, traceable criteria"], ["Decision", "Human selection and negotiation"]]
                    : lang === "fr"
                      ? [["Sources", "Factures et historique autorisés"], ["Action", "Relances préparées, jamais envoyées seules"], ["Escalade", "Litiges transmis à votre équipe"]]
                      : [["Sources", "Authorized invoices and history"], ["Action", "Follow-ups prepared, never sent alone"], ["Escalation", "Disputes routed to your team"]]
                ).map(([label, value]) => (
                  <div key={label} className="bg-[#211E1A] p-4">
                    <dt className="font-mono text-[9px] font-black uppercase tracking-[.12em] text-[#F2A4C5]">{label}</dt>
                    <dd className="mt-2 text-xs font-semibold leading-5 text-[#E7E0D5]">{value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
          <article className="w-full overflow-hidden rounded-[26px] border border-white/10 bg-[#211E1A] lg:max-w-[580px] lg:justify-self-end">
            <div className="border-b border-white/10 p-5">
              <p className="font-mono text-[10px] font-black uppercase tracking-[.12em] text-[#8F877A]">
                {lang === "fr" ? "Mission · Démonstration" : "Mission · Demonstration"}
              </p>
              <h3 className="mt-2 text-xl font-semibold">
                {persona.proofMission[lang]}
              </h3>
            </div>
            {["nadia", "emma", "camille", "gabriel"].includes(detail.slug) && (
              <div className="grid grid-cols-3 gap-px border-b border-white/10 bg-white/10">
                {(detail.slug === "emma"
                  ? lang === "fr"
                    ? [["5", "Participants"], ["4", "Documents réunis"], ["3", "Actions à suivre"]]
                    : [["5", "Participants"], ["4", "Documents gathered"], ["3", "Actions to track"]]
                  : detail.slug === "camille"
                    ? lang === "fr"
                      ? [["28", "Sources consultées"], ["6", "Faits recoupés"], ["3", "Signaux prioritaires"]]
                      : [["28", "Sources reviewed"], ["6", "Facts cross-checked"], ["3", "Priority signals"]]
                  : detail.slug === "gabriel"
                    ? lang === "fr"
                      ? [["3", "Offres comparées"], ["12", "Critères alignés"], ["2", "Risques majeurs"]]
                      : [["3", "Offers compared"], ["12", "Criteria aligned"], ["2", "Major risks"]]
                    : lang === "fr"
                      ? [["14 820 €", "À relancer"], ["10", "Relances prêtes"], ["2", "Litiges isolés"]]
                      : [["€14,820", "Outstanding"], ["10", "Follow-ups ready"], ["2", "Disputes isolated"]]
                ).map(([value, label]) => (
                  <div key={label} className="bg-[#211E1A] p-4">
                    <strong className="block text-xl font-bold text-white sm:text-2xl">{value}</strong>
                    <span className="mt-1 block text-[10px] font-semibold leading-4 text-[#AFA397]">{label}</span>
                  </div>
                ))}
              </div>
            )}
            {detail.slug === "emma" && (
              <div className="border-b border-white/10 p-5">
                <p className="font-mono text-[9px] font-black uppercase tracking-[.12em] text-[#8F877A]">
                  {lang === "fr" ? "Ordre du jour préparé" : "Prepared agenda"}
                </p>
                <div className="mt-3 overflow-hidden rounded-xl border border-white/10">
                  {(lang === "fr"
                    ? [["Priorités de la semaine", "Sophie", "10 min"], ["Devis en attente", "Marc", "8 min"], ["Planning client", "Équipe", "12 min"]]
                    : [["Weekly priorities", "Sophie", "10 min"], ["Pending quotes", "Marc", "8 min"], ["Client schedule", "Team", "12 min"]]
                  ).map(([topic, owner, duration], index) => (
                    <div key={topic} className={`grid grid-cols-[1fr_auto] gap-3 bg-[#1B1815] px-3 py-2.5 text-xs ${index > 0 ? "border-t border-white/10" : ""}`}>
                      <span className="font-semibold text-[#E7E0D5]">{topic}</span>
                      <span className="text-right text-[#AFA397]">{owner} · {duration}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 rounded-xl border border-white/10 bg-white/[.04] p-3 text-xs leading-5 text-[#CFC6B8]">
                  <p className="font-mono text-[9px] font-black uppercase tracking-[.12em] text-[#F2A4C5]">{lang === "fr" ? "Aperçu du message" : "Message preview"}</p>
                  <p className="mt-2">{lang === "fr" ? "Bonjour, voici l’ordre du jour proposé pour notre réunion d’équipe. Merci de vérifier les sujets et les durées avant validation." : "Hello, here is the proposed agenda for our team meeting. Please review the topics and durations before approval."}</p>
                </div>
              </div>
            )}
            <ol className={`space-y-4 p-5 text-sm text-[#D8D0C2] ${detail.slug === "emma" ? "hidden" : ""}`}>
              {persona.activity[lang].map((item, index) => (
                <Activity key={item} time={["09:05", "09:12", "09:18"][index]}>
                  {item}
                </Activity>
              ))}
            </ol>
            <div className="m-5 mt-0 rounded-2xl border border-[#F2A4C5]/20 bg-[#2A2226] p-4">
              <p className="font-mono text-[10px] font-black uppercase tracking-[.12em] text-[#F2A4C5]">
                {t.decision}
              </p>
              <p className="mt-2 text-sm font-semibold">
                {persona.decision[lang]}
              </p>
              <p className="mt-2 text-xs leading-5 text-[#AFA397]">
                {detail.slug === "emma"
                  ? lang === "fr" ? "Interaction de démonstration : aucun ordre du jour réel ne sera envoyé." : "Demonstration only: no real agenda will be sent."
                  : detail.slug === "nadia"
                    ? lang === "fr" ? "Interaction de démonstration : aucune relance réelle ne sera envoyée." : "Demonstration only: no real follow-up will be sent."
                    : detail.slug === "camille"
                      ? lang === "fr" ? "Démonstration illustrative : les sources, signaux et conclusions sont fictifs." : "Illustrative demo: sources, signals and conclusions are fictional."
                    : detail.slug === "gabriel"
                      ? lang === "fr" ? "Démonstration illustrative : les fournisseurs, offres et risques sont fictifs." : "Illustrative demo: suppliers, offers and risks are fictional."
                    : lang === "fr" ? "Interaction de démonstration : aucune action réelle ne sera exécutée." : "Demonstration only: no real action will be performed."}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Decision
                  active={decision === "approved"}
                  primary
                  onClick={() => setDecision("approved")}
                >
                  {t.approve}
                </Decision>
                <Decision
                  active={decision === "modified"}
                  onClick={() => setDecision("modified")}
                >
                  {t.modify}
                </Decision>
                <Decision
                  active={decision === "declined"}
                  onClick={() => setDecision("declined")}
                >
                  {t.decline}
                </Decision>
              </div>
              {outcome && (
                <p
                  role="status"
                  className="mt-4 rounded-xl bg-white/[.06] p-3 text-sm font-semibold text-[#F3EFE6]"
                >
                  {outcome}
                </p>
              )}
            </div>
          </article>
        </div>
      </section>

      {!isMissionLedProfile && <section className="collaborator-identity-section py-20 sm:py-24">
        <div className="editorial-shell grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-12">
          <div>
            <Kicker>{t.identityKicker}</Kicker>
            <h2 className="mt-5 max-w-[700px] text-[clamp(2.25rem,3.7vw,3.65rem)] font-bold leading-[.98] tracking-[-.05em]">
              {lang === "fr" ? (
                <>
                  <span className="block lg:whitespace-nowrap">
                    {detail.name} travaille avec
                  </span>
                  <span className="block lg:whitespace-nowrap">
                    sa propre identité
                  </span>
                  <span className="block lg:whitespace-nowrap">
                    et ses propres accès.
                  </span>
                </>
              ) : (
                <>
                  <span className="block lg:whitespace-nowrap">
                    {detail.name} works with
                  </span>
                  <span className="block lg:whitespace-nowrap">
                    their own identity
                  </span>
                  <span className="block lg:whitespace-nowrap">and access.</span>
                </>
              )}
            </h2>
            <p className="mt-6 max-w-xl text-[16px] font-medium leading-8 text-[#4E483F]">
              {lang === "fr"
                ? `${detail.name} appartient à votre entreprise, indépendamment de la personne chargée de sa supervision. Si cette personne quitte l’entreprise, son identité, sa mémoire et son savoir-faire y restent.`
                : `${detail.name} belongs to your organization, independently of the person supervising them. If that person leaves, identity, memory and know-how remain within the organization.`}
            </p>
            <Link
              href={localizedHref("collaborators", lang)}
              className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#B00C54]"
            >
              {t.identityCta}
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="min-w-0 w-full lg:max-w-[680px] lg:justify-self-end">
            <IdentityCard detail={detail} lang={lang} labels={t.identityCard} />
          </div>
        </div>
      </section>}

      {!isMissionLedProfile && <section className="collaborator-equipment-section bg-[#EAE3D4] py-20 sm:py-24">
        <div className="editorial-shell">
          <div className="grid gap-px overflow-hidden rounded-[26px] border border-[#CFC5B5] bg-[#CFC5B5] lg:grid-cols-2">
            <Link
              href={localizedHref("applications", lang)}
              className="group bg-[#FAF8F3] p-6 sm:p-8"
            >
              <p className="font-mono text-[10px] font-black uppercase tracking-[.18em] text-[#B00C54]">
                {t.appsKicker}
              </p>
              <h2 className="mt-5 text-[clamp(2.15rem,3.2vw,3.35rem)] font-bold leading-[.98] tracking-[-.045em]">
                {lang === "fr"
                  ? `${detail.name} travaille dans votre environnement métier.`
                  : `${detail.name} works in your business environment.`}
              </h2>
              <p className="mt-5 text-[15px] font-medium leading-7 text-[#625B50]">
                {t.appsBody}
              </p>
              <ApplicationLogos apps={persona.apps} />
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#B00C54]">
                {lang === "fr" ? "Voir les applications" : "View applications"}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
            <Link
              href="/ai-gateway"
              className="group bg-[#181615] p-6 text-white sm:p-8"
            >
              <p className="font-mono text-[10px] font-black uppercase tracking-[.18em] text-[#F2A4C5]">
                {t.modelsKicker}
              </p>
              <h2 className="mt-5 text-[clamp(2.15rem,3.2vw,3.35rem)] font-bold leading-[.98] tracking-[-.045em]">
                {t.modelsTitle}
              </h2>
              <p className="mt-5 text-[15px] font-medium leading-7 text-[#CFC6B8]">
                {lang === "fr"
                  ? `${detail.name} utilise uniquement les modèles autorisés par votre entreprise, dans les limites du budget défini.`
                  : `${detail.name} only uses models authorized by your organization, within the defined budget.`}
              </p>
              <ModelLogos />
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#F2A4C5]">
                Unitalk AI Gateway
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </div>
      </section>}

      <section className="collaborator-evolution-section order-4 py-16 sm:py-20">
        <div className="editorial-shell grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:gap-12">
          <div>
            <Kicker>{t.evolutionKicker}</Kicker>
            <h2 className="mt-5 text-[clamp(2.35rem,4vw,4rem)] font-bold leading-[.98] tracking-[-.05em]">
              {lang === "fr" ? (
                <>
                  <span className="block whitespace-nowrap">
                    {detail.name} accomplit
                  </span>
                  <span className="block whitespace-nowrap">une mission.</span>
                  <span className="block whitespace-nowrap text-[#D10E63]">
                    Son expérience
                  </span>
                  <span className="block whitespace-nowrap text-[#D10E63]">
                    reste.
                  </span>
                </>
              ) : (
                <>
                  <span className="block whitespace-nowrap">
                    {detail.name} completes
                  </span>
                  <span className="block whitespace-nowrap">a mission.</span>
                  <span className="block whitespace-nowrap text-[#D10E63]">
                    The experience
                  </span>
                  <span className="block whitespace-nowrap text-[#D10E63]">
                    remains.
                  </span>
                </>
              )}
            </h2>
            <p className="mt-6 max-w-xl text-[16px] font-medium leading-8 text-[#4E483F]">
              {detail.slug === "emma"
                ? lang === "fr"
                  ? "Chaque validation enrichit ses règles de travail : format d’ordre du jour, documents utiles, personnes à informer et actions à suivre. L’historique reste gouverné par votre entreprise."
                  : "Each approval enriches her working rules: agenda format, expected documents, participants to inform and actions to track. The history remains governed by your organization."
                : detail.slug === "nadia"
                ? lang === "fr"
                  ? "Chaque validation enrichit ses règles de travail : priorité de relance, ton adapté, traitement des litiges et suivi des engagements. L’historique reste gouverné par votre entreprise."
                  : "Each approval enriches her working rules: follow-up priority, appropriate tone, dispute handling and promise tracking. The history remains governed by your organization."
                : detail.slug === "camille"
                ? lang === "fr"
                  ? "Chaque validation affine ses règles de veille : sources de référence, concurrents prioritaires, critères de comparaison et seuils d’alerte. Les analyses et leur historique restent gouvernés par votre entreprise."
                  : "Each approval refines her monitoring rules: reference sources, priority competitors, comparison criteria and alert thresholds. Analyses and their history remain governed by your organization."
                : detail.slug === "gabriel"
                ? lang === "fr"
                  ? "Chaque validation affine sa méthode achats : critères de comparaison, pondérations, clauses sensibles et seuils de risque. Les offres, décisions et leur historique restent gouvernés par votre entreprise."
                  : "Each approval refines his procurement method: comparison criteria, weightings, sensitive clauses and risk thresholds. Offers, decisions and their history remain governed by your organization."
                : lang === "fr"
                  ? `${detail.name} commence avec un profil ${detail.role.fr.toLowerCase()}. Ajoutez ensuite de nouvelles compétences, applications et profils métier selon le travail confié.`
                  : `${detail.name} starts with a ${detail.role.en.toLowerCase()} profile. Add new skills, applications and job profiles as new work is assigned.`}
            </p>
            <Link
              href={localizedHref("marketplace", lang)}
              className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#B00C54]"
            >
              {lang === "fr"
                ? "Explorer la Marketplace"
                : "Explore the Marketplace"}
              <ArrowRight className="size-4" />
            </Link>
          </div>
           <article className="w-full overflow-hidden rounded-[28px] bg-[#181615] p-6 text-white sm:p-8 lg:max-w-[560px] lg:justify-self-end">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-6">
              <Image
                src={detail.avatar}
                alt=""
                width={58}
                height={58}
                className="size-[58px] rounded-full object-cover ring-2 ring-[#F2A4C5]/25"
              />
               <div className="mr-auto">
                <p className="text-xl font-semibold">{detail.name}</p>
                <p className="mt-1 text-xs text-[#AFA397]">
                  {lang === "fr"
                    ? "Même identité, nouvelles capacités"
                    : "Same identity, new capabilities"}
                </p>
               </div>
            </div>
             {["nadia", "emma", "camille", "gabriel"].includes(detail.slug) && (
               <div className="mt-5 grid grid-cols-2 gap-3">
                 <div className="rounded-2xl border border-white/10 bg-white/[.04] p-4">
                   <strong className="text-2xl font-bold text-white">{detail.slug === "emma" ? "5" : detail.slug === "camille" ? "6" : detail.slug === "gabriel" ? "12" : "10"}</strong>
                   <span className="mt-1 block text-xs font-semibold text-[#AFA397]">
                      {detail.slug === "emma"
                        ? lang === "fr" ? "actions suivies" : "actions tracked"
                        : detail.slug === "camille"
                        ? lang === "fr" ? "sources de référence" : "reference sources"
                        : detail.slug === "gabriel"
                        ? lang === "fr" ? "critères de comparaison" : "comparison criteria"
                        : lang === "fr" ? "relances validées" : "follow-ups approved"}
                   </span>
                 </div>
                 <div className="rounded-2xl border border-[#F2A4C5]/20 bg-[#F2A4C5]/10 p-4">
                   <strong className="text-2xl font-bold text-[#F2A4C5]">4</strong>
                   <span className="mt-1 block text-xs font-semibold text-[#DCCBD3]">
                     {lang === "fr" ? "règles réutilisables" : "reusable rules"}
                   </span>
                 </div>
               </div>
             )}
             <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {(detail.slug === "emma"
                ? lang === "fr"
                  ? ["Format d’ordre du jour validé", "Documents utiles", "Personnes à informer", "Actions à suivre"]
                  : ["Approved agenda format", "Expected documents", "Participants to inform", "Actions to track"]
                : detail.slug === "nadia"
                ? lang === "fr"
                  ? ["Ordre de priorité validé", "Ton de relance validé", "Litiges à escalader", "Promesses de paiement à suivre"]
                  : ["Approved priority order", "Approved follow-up tone", "Disputes to escalate", "Payment promises to track"]
                : detail.slug === "camille"
                ? lang === "fr"
                  ? ["Sources de référence", "Concurrents prioritaires", "Critères de comparaison", "Seuils d’alerte"]
                  : ["Reference sources", "Priority competitors", "Comparison criteria", "Alert thresholds"]
                : detail.slug === "gabriel"
                ? lang === "fr"
                  ? ["Critères et pondérations", "Clauses contractuelles sensibles", "Seuils de risque", "Règles de renouvellement"]
                  : ["Criteria and weightings", "Sensitive contract clauses", "Risk thresholds", "Renewal rules"]
                : t.evolutionItems).map((item) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-2xl border border-white/10 bg-white/[.04] p-4 text-sm font-semibold"
                >
                  <Check className="mt-0.5 size-4 shrink-0 text-[#F2A4C5]" />
                   <span><span className="block">{item}</span>{["nadia", "emma", "camille", "gabriel"].includes(detail.slug) && <small className="mt-1 hidden text-[10px] font-bold uppercase tracking-[.1em] text-[#AFA397] sm:block">{lang === "fr" ? "Réutilisé à la prochaine mission" : "Reused on the next mission"}</small>}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <CollaboratorFaq lang={lang} detail={detail} compact={isMissionLedProfile} />
      <section className="collaborator-final order-6 bg-[#D10E63] py-16 text-white sm:py-20">
        <div className="editorial-shell flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <h2 className="max-w-4xl text-[clamp(2.5rem,5vw,4.75rem)] font-bold leading-[.95] tracking-[-.055em]">
              {detail.slug === "hugo" ? t.finalTitle : detail.slug === "emma"
              ? lang === "fr"
                ? <><span className="block">Prêt à confier la préparation</span><span className="block">et le suivi à Emma&nbsp;?</span></>
                : <><span className="block">Ready to assign preparation</span><span className="block">and follow-up to Emma?</span></>
              : detail.slug === "nadia"
              ? lang === "fr"
                ? <><span className="block">Prêt à confier la gestion</span><span className="block">de vos relances à Nadia&nbsp;?</span></>
                : <><span className="block">Ready to let Nadia manage</span><span className="block">your follow-ups?</span></>
              : detail.slug === "camille"
              ? lang === "fr"
                ? <><span className="block">Prêt à transformer</span><span className="block">votre veille en décisions</span><span className="block">avec Camille&nbsp;?</span></>
                : <><span className="block">Ready to turn</span><span className="block">your intelligence into decisions</span><span className="block">with Camille?</span></>
              : detail.slug === "gabriel"
              ? lang === "fr"
                ? <><span className="block">Prêt à comparer vos offres</span><span className="block">et sécuriser vos choix</span><span className="block">avec Gabriel&nbsp;?</span></>
                : <><span className="block">Ready to compare offers</span><span className="block">and secure your choices</span><span className="block">with Gabriel?</span></>
              : lang === "fr"
                ? <><span className="block">Prêt à confier une première mission</span><span className="block">à {detail.name}&nbsp;?</span></>
                : <><span className="block">Ready to assign a first mission</span><span className="block">to {detail.name}?</span></>}
          </h2>
          <div className="flex min-w-60 flex-col gap-3">
            {isMissionLedProfile ? <button type="button" onClick={startPrimaryMission} className="inline-flex min-h-12 w-full max-w-full items-center justify-center rounded-full bg-[#181615] px-5 py-3 text-center text-sm font-bold leading-5 sm:w-auto sm:px-7">{primaryCta}</button> : <a href="#alma-profile" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#181615] px-7 text-sm font-bold">{t.finalCta}</a>}
            <Link
              href={`${localizedHref("pricing", lang)}?profil=${encodeURIComponent(detail.slug)}#detail-tarifs`}
              className="text-center text-sm font-bold underline decoration-white/40 underline-offset-4"
            >
              {t.pricing}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function CollaboratorMissions({ lang, detail, missions }: { lang: "fr" | "en"; detail: CollaboratorPage["detail"]; missions: CollaboratorPage["missions"] }) {
  if (!missions.length) return null;
  return <section id="missions" className="collaborator-missions order-2 scroll-mt-24 bg-[#FAF8F3] py-16 sm:py-20"><div className="editorial-shell"><h2 className="max-w-5xl text-[clamp(2.2rem,4.2vw,4rem)] font-bold leading-[.98] tracking-[-.05em]">{lang === "fr" ? `Missions prêtes à l’emploi avec ${detail.name}` : `Ready-to-use missions with ${detail.name}`}</h2><div className="mt-10 grid gap-4 md:grid-cols-2">{missions.slice(0,4).map(mission=><Link key={mission.slug} href={missionHref(mission.slug, lang)} className="group flex min-h-[230px] flex-col rounded-2xl border border-[#D8D0C2] bg-white p-5 transition hover:-translate-y-1 hover:border-[#D10E63]/40 hover:shadow-[0_18px_45px_-35px_rgba(28,26,23,.45)] sm:p-6"><h3 className="text-xl font-semibold">{mission.title[lang]}</h3><p className="mt-3 text-sm leading-6 text-[#625B50]">{mission.objective[lang]}</p><span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold text-[#B00C54]">{lang === "fr" ? "Voir la mission" : "View mission"}<ArrowRight className="size-4 transition-transform group-hover:translate-x-1"/></span></Link>)}</div><Link href={`${localizedHref("missions", lang)}?collaborateur=${encodeURIComponent(detail.slug)}&vue=toutes`} className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#B00C54]">{lang === "fr" ? `Voir toutes les missions de ${detail.name}` : `View all ${detail.name} missions`}<ArrowRight className="size-4"/></Link></div></section>;
}

function Activity({
  time,
  children,
}: {
  time: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-4">
      <span className="font-mono text-xs text-[#8F877A]">{time}</span>
      <span>{children}</span>
    </li>
  );
}
function Decision({
  children,
  primary = false,
  active = false,
  onClick,
}: {
  children: React.ReactNode;
  primary?: boolean;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`min-h-11 rounded-full px-5 text-xs font-bold outline-none focus-visible:ring-2 focus-visible:ring-[#F2A4C5] ${active ? "ring-2 ring-[#F2A4C5]" : primary ? "bg-[#D10E63] text-white" : "border border-white/15 bg-white/[.04] text-white"}`}
    >
      {children}
    </button>
  );
}

export function IdentityCard({
  detail,
  lang,
  labels,
  compact = false,
}: {
  detail: CollaboratorPage["detail"];
  lang: "fr" | "en";
  labels: typeof COPY.fr.identityCard | typeof COPY.en.identityCard;
  compact?: boolean;
}) {
  const fr = lang === "fr";
  const persona = PERSONAS[detail.slug as keyof typeof PERSONAS] ?? genericPersona(detail);
  const rows = [
    [labels.owner, fr ? "Votre entreprise" : "Your organization"],
    [
      fr ? "Place dans l’entreprise" : "Place in the organization",
      fr
        ? `Département ${detail.department.fr}`
        : `${detail.department.en} department`,
    ],
    [labels.supervisor, detail.manager.role[lang]],
    [
      fr ? "Profils métier" : "Job profiles",
      persona.profiles[lang].join(" · "),
    ],
    [
      fr ? "Compétences" : "Skills",
      detail.skills.map((skill) => skill[lang]).join(" · "),
    ],
    [
      labels.memory,
      fr
        ? "Historique, contexte utile et expérience validée"
        : "History, useful context and approved experience",
    ],
    [
      fr ? "Applications" : "Applications",
      fr
        ? "Applications autorisées selon ses missions et ses droits"
        : "Applications authorized under missions and permissions",
    ],
    [
      fr ? "Modèles IA" : "AI models",
      fr
        ? "Un modèle pertinent par tâche, parmi ceux autorisés"
        : "A relevant model for each task, among authorized models",
    ],
  ];
  const visibleRows = compact ? rows.filter((_, index) => [0, 2, 5, 6, 7].includes(index)) : rows;
  return (
    <article className="relative min-w-0 overflow-hidden rounded-[30px] border border-[#CFC5B5] bg-[#FAF8F3] shadow-[0_30px_75px_-48px_rgba(28,26,23,.55)]">
      <div
        aria-hidden
        className="absolute -right-24 -top-24 size-64 rounded-full bg-[#D10E63]/10 blur-3xl"
      />
      <header className="relative flex flex-col items-start gap-3 border-b border-[#DED6C8] px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="font-mono text-[11px] font-black uppercase tracking-[.16em] text-[#B00C54]">
            {labels.header}
          </p>
          <p className="mt-1 text-xs text-[#857C6E]">
            {fr
              ? "Exemple de configuration professionnelle"
              : "Professional configuration example"}
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#267A48]/10 px-3 py-1.5 text-[10px] font-bold text-[#267A48]">
          <span className="size-1.5 rounded-full bg-[#267A48]" />
          {fr ? "SUPERVISÉ" : "SUPERVISED"}
        </span>
      </header>
      <div className="relative grid min-w-0 gap-6 p-6 md:grid-cols-[130px_minmax(0,1fr)] md:p-8">
        <div>
          <Image
            src={detail.avatar}
            alt={detail.name}
            width={150}
            height={180}
            className="aspect-[4/5] w-full max-w-[150px] rounded-2xl border border-[#DED6C8] object-cover shadow-sm"
          />
          <p className="mt-4 text-2xl font-semibold">{detail.name}</p>
          <p className="mt-1 font-mono text-xs text-[#B00C54]">
            @{detail.slug}
          </p>
          <p className="mt-2 text-sm font-semibold text-[#625B50]">
            {detail.role[lang]} · {fr ? "Collaborateur IA" : "AI Collaborator"}
          </p>
        </div>
        <div className="min-w-0">
          <dl className="divide-y divide-[#DED6C8]">
            {visibleRows.map(([label, value]) => (
              <div
                key={label}
                className="grid gap-1 py-3 xl:grid-cols-[130px_minmax(0,1fr)] xl:gap-3"
              >
                <dt className="font-mono text-[10px] font-bold uppercase tracking-[.1em] text-[#857C6E]">
                  {label}
                </dt>
                <dd className="whitespace-pre-line text-sm font-semibold leading-5 text-[#3F3A33]">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
          {!compact && <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <IdentityFeature
              icon={Mail}
              title={labels.communication}
              body={
                fr
                  ? "E-mail · Calendrier · Téléphone · Messageries instantanées"
                  : "Email · Calendar · Phone · Instant messaging"
              }
            />
            <IdentityFeature
              icon={Server}
              title={labels.execution}
              body={
                fr
                  ? "Agent Hermes · Fichiers · Navigateur · Code · Secrets propres"
                  : "Hermes Agent · Files · Browser · Code · Own secrets"
              }
            />
          </div>}
          {!compact && <div className="mt-3 rounded-2xl border border-[#DED6C8] bg-white p-4">
            <h3 className="flex items-center gap-2 text-sm font-semibold">
              <Building2 className="size-4 text-[#D10E63]" />
              {labels.shared}
            </h3>
            <p className="mt-2 text-xs leading-5 text-[#625B50]">
              {fr
                ? "Méthodes, documents et connaissances accessibles selon les droits attribués."
                : "Methods, documents and knowledge available under assigned permissions."}
            </p>
          </div>}
        </div>
      </div>
      <footer className="relative border-t border-[#DED6C8] bg-[#EAE3D4] px-6 py-4 sm:px-8">
        <div className="flex items-center gap-2 text-xs font-bold text-[#4E483F]">
          <ShieldCheck className="size-4 text-[#D10E63]" />
          {labels.governance}
        </div>
      </footer>
    </article>
  );
}

function IdentityFeature({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof UserRound;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-[#DED6C8] bg-white p-4">
      <Icon className="size-4 text-[#D10E63]" />
      <h3 className="mt-3 text-sm font-semibold">{title}</h3>
      <p className="mt-2 text-xs leading-5 text-[#625B50]">{body}</p>
    </div>
  );
}
export function ApplicationLogos({ apps, limit = 6 }: { apps: readonly string[]; limit?: number }) {
  const { lang } = useLanguage();
  const icons: Record<string, typeof siHubspot | null> = {
    HubSpot: siHubspot,
    Gmail: siGmail,
    Agenda: siGooglecalendar,
  };
  const visible = apps
    .slice(0, limit)
    .map((name) => [name, icons[name] ?? null] as const);
  return (
    <ul
      aria-label={
        lang === "fr" ? "Applications compatibles" : "Compatible applications"
      }
      className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[#DED6C8] bg-[#DED6C8] sm:grid-cols-3"
    >
      {visible.map(([name, icon]) => (
        <li
          key={name}
          className="flex min-h-24 items-center gap-3 bg-white p-4"
        >
          {icon ? (
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="size-7 shrink-0"
              fill={`#${icon.hex}`}
            >
              <path d={icon.path} />
            </svg>
          ) : (
            <span
              aria-hidden
              className="flex size-7 items-center justify-center rounded-md bg-[#1C1A17] text-[10px] font-black text-white"
            >
              {name.slice(0, 2).toUpperCase()}
            </span>
          )}
          <span>
            <strong className="block text-xs">{name}</strong>
            <small className="mt-1 block text-[9px] font-bold uppercase tracking-[.1em] text-[#857C6E]">
              {lang === "fr" ? "Compatible" : "Supported"}
            </small>
          </span>
        </li>
      ))}
    </ul>
  );
}

export function ModelLogos({ limit = 9 }: { limit?: number } = {}) {
  const models = [
    [OpenAI, "OpenAI", "GPT"],
    [Anthropic, "Anthropic", "Claude"],
    [Gemini, "Google", "Gemini"],
    [Mistral, "Mistral AI", "Mistral"],
  ] as const;
  const additionalModels = [
    ["G", "xAI", "Grok"],
    ["D", "DeepSeek", "DeepSeek"],
    ["Q", "Alibaba", "Qwen"],
    ["K", "Moonshot AI", "Kimi"],
    ["M", "MiniMax", "MiniMax"],
  ] as const;
  return (
    <ul
      aria-label="Familles de modèles accessibles via Unitalk AI Gateway"
      className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3"
    >
      {models.slice(0, limit).map(([Icon, provider, model]) => (
        <li key={provider} className="min-h-28 bg-[#211E1B] p-4">
          <span
            aria-hidden
            className="flex size-10 items-center justify-center rounded-full bg-[#F3EFE6] text-[#181615]"
          >
            <Icon size={23} />
          </span>
          <strong className="mt-4 block text-xs">{provider}</strong>
          <span className="mt-1 block text-[10px] text-[#AFA397]">{model}</span>
        </li>
      ))}
      {additionalModels.slice(0, Math.max(0, limit - models.length)).map(([mark, provider, model]) => (
        <li key={model} className="min-h-28 bg-[#211E1B] p-4">
          <span
            aria-hidden
            className="flex size-10 items-center justify-center rounded-full bg-[#F3EFE6] font-sf text-base font-black text-[#181615]"
          >
            {mark}
          </span>
          <strong className="mt-4 block text-xs">{provider}</strong>
          <span className="mt-1 block text-[10px] text-[#AFA397]">{model}</span>
        </li>
      ))}
    </ul>
  );
}

function CollaboratorFaq({
  lang,
  detail,
  compact = false,
}: {
  lang: "fr" | "en";
  detail: CollaboratorPage["detail"];
  compact?: boolean;
}) {
  const items =
    lang === "fr"
      ? [
          ...(compact && detail.slug === "hugo" ? [["De quoi Hugo a-t-il besoin pour commencer ?", "De vos critères de prospection et des accès que vous autorisez. Alma prépare ensuite la mission et les validations nécessaires."]] : []),
          ...(compact && detail.slug === "camille" ? [["De quoi Camille a-t-elle besoin pour commencer ?", "Du marché à surveiller, des concurrents prioritaires, de la période et de vos critères d’analyse. Camille travaille à partir des sources que vous autorisez."]] : []),
          ...(compact && detail.slug === "gabriel" ? [["De quoi Gabriel a-t-il besoin pour commencer ?", "Des offres ou contrats autorisés, de votre besoin et de vos critères de comparaison. Gabriel prépare une matrice et isole les points à arbitrer."]] : []),
          ...(compact && detail.slug === "nadia" ? [["De quoi Nadia a-t-elle besoin pour commencer ?", "De vos sources financières autorisées, de la période à analyser et de vos règles de gestion. Alma prépare ensuite les accès et validations nécessaires."]] : []),
          ...(compact && detail.slug === "emma" ? [["De quoi Emma a-t-elle besoin pour commencer ?", "De la date de la réunion, des participants et des documents autorisés. Alma prépare ensuite les accès et validations nécessaires."]] : []),
          [
            `${detail.name} appartient-${detail.gender === "female" ? "elle" : "il"} à Unitalk ou à mon entreprise ?`,
            `${detail.name} illustre publiquement le profil ${detail.role.fr.toLowerCase()}. Le Collaborateur IA déployé pour votre entreprise lui appartient.`,
          ],
          [
            "Puis-je choisir son prénom, son visage et sa voix ?",
            "Oui. Son identité IA est personnalisable avant son déploiement.",
          ],
          [
            `${detail.name} peut-${detail.gender === "female" ? "elle" : "il"} utiliser mes applications ?`,
            "Oui, après autorisation. Votre entreprise définit séparément les comptes, données et actions accessibles.",
          ],
          [
            `Quels modèles IA ${detail.name} peut-${detail.gender === "female" ? "elle" : "il"} utiliser ?`,
            `${detail.gender === "female" ? "Elle" : "Il"} utilise uniquement les modèles autorisés. Unitalk AI Gateway sélectionne une route pertinente selon la tâche, vos règles et votre budget.`,
          ],
          [
            "Que se passe-t-il si son responsable quitte l’entreprise ?",
            "La supervision peut être réattribuée. L’identité, la mémoire et les méthodes validées restent dans l’entreprise.",
          ],
          [
            "Puis-je lui ajouter de nouvelles responsabilités ?",
            "Oui. Ajoutez des profils métier et des compétences sans recréer son identité.",
          ],
        ]
      : [
          ...(compact && detail.slug === "hugo" ? [["What does Hugo need to get started?", "Your prospecting criteria and the access you authorize. Alma then prepares the mission and required approvals."]] : []),
          ...(compact && detail.slug === "camille" ? [["What does Camille need to get started?", "The market to monitor, priority competitors, the period and your analysis criteria. Camille works from the sources you authorize."]] : []),
          ...(compact && detail.slug === "gabriel" ? [["What does Gabriel need to get started?", "Authorized offers or contracts, your requirement and comparison criteria. Gabriel prepares a matrix and isolates the points requiring a decision."]] : []),
          ...(compact && detail.slug === "nadia" ? [["What does Nadia need to get started?", "Your authorized financial sources, the reporting period and your management rules. Alma then prepares the required access and approvals."]] : []),
          ...(compact && detail.slug === "emma" ? [["What does Emma need to get started?", "The meeting date, participants and authorized documents. Alma then prepares the required access and approvals."]] : []),
          [
            `Does ${detail.name} belong to Unitalk or my organization?`,
            `${detail.name} publicly illustrates the ${detail.role.en.toLowerCase()} profile. The AI Collaborator deployed for your organization belongs to your organization.`,
          ],
          [
            "Can I choose the name, face and voice?",
            "Yes. The AI identity is customizable before deployment.",
          ],
          [
            `Can ${detail.name} use my applications?`,
            "Yes, after authorization. Your organization defines accessible accounts, data and actions.",
          ],
          [
            "Which AI model does it use?",
            "It only uses authorized models. Unitalk AI Gateway selects a relevant route under the task, rules and budget.",
          ],
          [
            "What happens if the supervisor leaves?",
            "Supervision can be reassigned. Identity, memory and approved methods remain in the organization.",
          ],
          [
            "Can I add new responsibilities?",
            "Yes. Add job profiles and skills without recreating the identity.",
          ],
        ];
   const visibleItems = compact ? items.slice(0, 3) : items;
   return (
     <section className="collaborator-faq order-5 bg-[#F3EFE6] py-16 sm:py-20">
      <div className="editorial-shell grid gap-10 lg:grid-cols-[.72fr_1.28fr]">
        <div>
          <Kicker>FAQ</Kicker>
          <h2 className="mt-5 text-[clamp(2.5rem,5vw,5rem)] font-semibold leading-[.94] tracking-[-.06em]">
            {lang === "fr"
              ? "Questions fréquentes"
              : "Frequently asked questions"}
          </h2>
        </div>
        <div className="border-t border-[#CFC5B5]">
           {visibleItems.map(([question, answer]) => (
            <FaqItem key={question} question={question} answer={answer} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className="border-b border-[#CFC5B5]">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className="flex min-h-20 w-full items-center justify-between gap-5 text-left text-lg font-semibold outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]"
      >
        <span>{question}</span>
        <span aria-hidden className="font-mono text-[#D10E63]">
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <p
          id={id}
          className="max-w-2xl pb-7 pr-8 text-[15px] leading-7 text-[#4E483F]"
        >
          {answer}
        </p>
      )}
    </div>
  );
}

function highlightClaim(claim: string, accent: string) {
  const index = claim.indexOf(accent);
  if (index < 0) return claim;
  const accentEnd = index + accent.length;
  const punctuation = claim[accentEnd] === "." ? "." : "";
  return (
    <>
      {claim.slice(0, index)}
      <span className="text-[#D10E63]">{accent}{punctuation}</span>
      {claim.slice(accentEnd + punctuation.length)}
    </>
  );
}
