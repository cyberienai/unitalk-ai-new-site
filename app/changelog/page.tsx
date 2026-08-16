import type { Metadata } from 'next'
import { Geist_Mono } from 'next/font/google'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'

const geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Changelog',
  description:
    'Découvrez les dernières fonctionnalités et améliorations de la plateforme Unitalk.',
}

// ── Data ──────────────────────────────────────────────────────────────────────

type ChangelogEntry = {
  date: string
  tag: string
  title: string
  description: string
}

type MonthGroup = {
  month: string
  year: string
  sections: {
    label: string
    color: string
    entries: ChangelogEntry[]
  }[]
}

const changelogData: MonthGroup[] = [
  {
    month: 'Juillet',
    year: '2026',
    sections: [
      {
        label: 'Nouveautés',
        color: 'bg-emerald-100 text-emerald-800',
        entries: [
          {
            date: '17 Juillet',
            tag: 'NOUVEAUTÉS',
            title: 'Distinction des voix (Diarisation) sur Voxo',
            description:
              'Lorsque vous vous enregistrez avec notre assistant vocal Voxo, l’application est désormais capable de reconnaître et de distinguer automatiquement les différentes voix. Si plusieurs personnes parlent, la transcription les identifiera clairement sous les labels Speaker 1, Speaker 2, etc. Pour profiter de cette fonctionnalité, il vous suffit de sélectionner le modèle Gladia ou GPT-4o Transcribe.',
          },
        ],
      },
      {
        label: 'Mise à jour des modèles IA',
        color: 'bg-blue-100 text-blue-800',
        entries: [
          {
            date: '29 Juillet',
            tag: 'MISE À JOUR',
            title: 'Claude Opus 5',
            description:
              'Passage de Claude Opus 4.8 à Claude Opus 5, avec des améliorations majeures en raisonnement approfondi, tâches agentiques de longue durée et workflows complexes, tout en conservant le même coût qu’Opus 4.8.',
          },
          {
            date: '23 Juillet',
            tag: 'MISE À JOUR',
            title: 'Gemini 3.6 Flash',
            description:
              'Passage de Gemini 3.5 Flash à Gemini 3.6 Flash, avec de meilleures performances en code, planification agentique, tâches multimodales, et une meilleure efficacité en tokens pour des réponses plus concises et économiques.',
          },
          {
            date: '13 Juillet',
            tag: 'MISE À JOUR',
            title: 'ChatGPT Sol, Terra, Luna',
            description:
              'Nous avons remplacé ChatGPT 5.5 Instant et Thinking par une nouvelle génération de modèles : Sol, Terra et Luna. Sol est optimisé pour les usages rapides du quotidien. Terra offre un bon équilibre entre vitesse, qualité et fiabilité. Luna est conçu pour le raisonnement avancé, les tâches complexes, l’analyse et les workflows exigeants.',
          },
          {
            date: '1er Juillet',
            tag: 'MISE À JOUR',
            title: 'Claude Sonnet 5',
            description:
              'Passage de Claude Sonnet 4.6 à Claude Sonnet 5, le modèle Sonnet le plus agentique d’Anthropic à ce jour, avec de meilleures performances en code, utilisation d’outils, workflows agents de longue durée et cas d’usage professionnels complexes.',
          },
        ],
      },
    ],
  },
  {
    month: 'Juin',
    year: '2026',
    sections: [
      {
        label: 'Nouveautés',
        color: 'bg-emerald-100 text-emerald-800',
        entries: [
          {
            date: '25 Juin',
            tag: 'NOUVEAUTÉ',
            title: 'Importez votre mémoire et votre historique de chat',
            description:
              'Emmenez votre contexte avec vous depuis un autre assistant IA (ChatGPT, Gemini, Claude ou Grok). Unitalk peut désormais importer votre mémoire — pour que l’assistant sache immédiatement qui vous êtes — ainsi que l’historique de vos conversations. Pour commencer, survolez le menu Nouveau chat, cliquez sur l’icône paramètres, sélectionnez Import memory, puis suivez les étapes.',
          },
          {
            date: '17 Juin',
            tag: 'NOUVEAUTÉ',
            title: 'Conversations voice-to-voice',
            description:
              'Vous pouvez désormais parler à votre assistant Unitalk et obtenir des réponses vocales, en temps réel. Posez-lui toutes vos questions — l’assistant a accès à l’actualité — et profitez d’une conversation naturelle, en mode mains libres.',
          },
          {
            date: '8 Juin',
            tag: 'NOUVEAUTÉ',
            title: 'Lire à voix haute',
            description:
              'Laissez l’assistant vous lire ses réponses à voix haute plutôt que de les lire vous-même. Cliquez simplement sur l’icône de microphone située en dessous d’une réponse pour l’écouter — idéal pour faire autre chose en même temps ou en déplacement.',
          },
        ],
      },
      {
        label: 'Mise à jour des modèles IA',
        color: 'bg-blue-100 text-blue-800',
        entries: [
          {
            date: '2 Juin',
            tag: 'MISE À JOUR',
            title: 'Claude Opus 4.8',
            description:
              'Passage de Claude Opus 4.7 à Claude Opus 4.8, avec de meilleures capacités de raisonnement, de code, d’agents IA et de traitement des tâches complexes.',
          },
        ],
      },
    ],
  },
  {
    month: 'Mai',
    year: '2026',
    sections: [
      {
        label: 'Nouveautés',
        color: 'bg-emerald-100 text-emerald-800',
        entries: [
          {
            date: '11 Mai',
            tag: 'NOUVEAUTÉ',
            title: 'Partage de chat',
            description:
              'Les conversations de votre assistant privé peuvent désormais être partagées, soit en mode public, soit avec les collaborateurs de votre choix au sein de votre entreprise. Choisissez entre un accès view-only (les destinataires peuvent lire la conversation) ou un accès full access (les destinataires peuvent poursuivre la conversation, poser de nouvelles questions et la repartager). Il suffit de cliquer sur l’icône Partager en haut à droite de votre chat pour commencer.',
          },
          {
            date: '11 Mai',
            tag: 'NOUVEAUTÉ',
            title: 'Partage d’images et de vidéos',
            description:
              'Partagez les chats dans lesquels vous générez une image ou une vidéo, comme n’importe quelle autre conversation, en public ou avec des membres spécifiques de votre entreprise. Avec l’accès view-only, les destinataires peuvent voir le résultat, avec l’accès full access, ils peuvent régénérer ou modifier l’image ou la vidéo, et la repartager.',
          },
        ],
      },
      {
        label: 'Améliorations',
        color: 'bg-amber-100 text-amber-800',
        entries: [
          {
            date: '20 Mai',
            tag: 'AMÉLIORATION',
            title: 'RAG nouvelle génération : compréhension visuelle avancée',
            description:
              'Nous avons mis à jour notre système RAG pour intégrer une compréhension visuelle avancée de vos PDF techniques. Le fonctionnement est très simple : créez une base de connaissances, ajoutez-y autant de documents que vous le souhaitez sans aucune limite de taille, puis connectez-la à un assistant. Vous pouvez ensuite choisir le modèle d’IA de votre choix pour interroger l’ensemble de vos documents ! L’IA interprète désormais parfaitement les graphiques, schémas et tableaux pour vous répondre. De plus, chaque réponse inclut un lien source cliquable qui vous renvoie vers la page exacte du PDF utilisé.',
          },
          {
            date: '5 Mai',
            tag: 'AMÉLIORATION',
            title: 'Suppression d’image',
            description:
              'Vous pouvez désormais supprimer une image depuis une conversation ou la galerie sans supprimer toute la conversation.',
          },
        ],
      },
      {
        label: 'Mise à jour des modèles IA',
        color: 'bg-blue-100 text-blue-800',
        entries: [
          {
            date: '14 Mai',
            tag: 'MISE À JOUR',
            title: 'Mistral Medium 3.5',
            description:
              'Passage de Magistral à Mistral Medium 3.5, le modèle multimodal avancé de Mistral, optimisé pour le raisonnement, le code et les workflows agentiques.',
          },
          {
            date: '12 Mai',
            tag: 'MISE À JOUR',
            title: 'Grok Image',
            description:
              'Ajout de Grok Image, un nouveau modèle de génération d’images à partir de prompts texte, avec des options flexibles de format et de résolution.',
          },
          {
            date: '8 Mai',
            tag: 'MISE À JOUR',
            title: 'ChatGPT 5.5 Instant',
            description:
              'Passage de GPT-5.3 Instant à GPT-5.5 Instant, pour des réponses quotidiennes plus rapides, plus claires et plus précises avec une meilleure personnalisation.',
          },
          {
            date: '7 Mai',
            tag: 'MISE À JOUR',
            title: 'Grok 4.3',
            description:
              'Améliore Grok 4.2 avec un meilleur raisonnement, un suivi des consignes plus fiable, plus de précision et de meilleures capacités de tool calling, avec une grande fenêtre de contexte de 1M de tokens pour le coding, la recherche et les workflows agentiques complexes.',
          },
          {
            date: '4 Mai',
            tag: 'MISE À JOUR',
            title: 'Qwen 3.6 Flash',
            description:
              'La version plus rapide et plus économique de Qwen 3.6, avec des performances proches du modèle flagship, les mêmes capacités long-context et multimodales, optimisée pour un usage en production à moindre coût.',
          },
          {
            date: '4 Mai',
            tag: 'MISE À JOUR',
            title: 'Qwen 3.6 Plus',
            description:
              'Le modèle phare de la série Qwen 3.6 d’Alibaba, conçu pour le coding agentique, le raisonnement complexe, la compréhension multimodale et les workflows long-context avec une fenêtre de contexte de 1M de tokens.',
          },
          {
            date: '4 Mai',
            tag: 'MISE À JOUR',
            title: 'DeepSeek V4',
            description:
              'Mise à jour majeure de V3.2, avec une architecture d’attention hybride plus efficace, un contexte de 1M de tokens, des versions open-weight Pro et Flash, et de meilleures capacités en long-context, coding, raisonnement et rapport performance/coût.',
          },
          {
            date: '1er Mai',
            tag: 'MISE À JOUR',
            title: 'Seedance 2.0',
            description:
              'Maintenant disponible sur Unitalk. Le modèle vidéo nouvelle génération de ByteDance, capable de générer des vidéos cinématiques à partir de texte, image, audio et vidéo, avec audio natif, mouvements réalistes et montage multi-plans.',
          },
        ],
      },
      {
        label: 'Correction de bugs',
        color: 'bg-red-100 text-red-800',
        entries: [
          {
            date: '1er Mai',
            tag: 'BUG FIX',
            title: 'Analyse de CSVs & Excel',
            description:
              'Correction d’un problème dans l’analyse de fichiers lors de la consolidation de plusieurs fichiers.',
          },
        ],
      },
    ],
  },
  {
    month: 'Avril',
    year: '2026',
    sections: [
      {
        label: 'Nouveautés',
        color: 'bg-emerald-100 text-emerald-800',
        entries: [
          {
            date: '21 Avril',
            tag: 'NOUVEAUTÉ',
            title: 'Téléchargement de l’app desktop',
            description:
              'Unitalk est désormais disponible en téléchargement comme application desktop. En tant que Progressive Web App, installez-la sur votre ordinateur pour un accès rapide, une expérience proche du natif et une utilisation fluide sur tous vos appareils.',
          },
          {
            date: '17 Avril',
            tag: 'NOUVEAUTÉ',
            title: 'Mode Extend Video (Veo 3.1 & Veo 3.1 Fast)',
            description:
              'Prolongez vos vidéos de 8 secondes supplémentaires grâce aux modèles Veo 3.1 et Veo 3.1 Fast de Google. Décrivez simplement la suite de votre scène et votre vidéo est rallongée de manière fluide — idéal pour créer des séquences plus longues avec des personnages cohérents. Pour l’utiliser, cliquez sur l’icône « Étendre la vidéo » en dessous de toute vidéo générée avec Veo 3.1 ou Veo 3.1 Fast.',
          },
          {
            date: '6 Avril',
            tag: 'NOUVEAUTÉ',
            title: 'Découvrez les Agents IA : Iris, Lumi, Voxo & Otto',
            description:
              'Le menu « Créer » évolue pour devenir une équipe d’agents IA spécialisés. Ce qui était auparavant des menus séparés pour l’Image, la Vidéo, l’Audio et les Agents sont désormais des agents dédiés — chacun avec un nom, un rôle et une expertise claire : Iris (Graphiste), Lumi (Motion designer), Voxo (Prise de notes vocal) et Otto (Spécialiste en Automatisations). C’est la première étape vers une équipe complète d’agents IA autonomes travaillant à vos côtés. D’autres agents arrivent bientôt.',
          },
          {
            date: '3 Avril',
            tag: 'NOUVEAUTÉ',
            title: 'Modèles d’automatisations en un clic',
            description:
              'Installez des modèles d’automatisations prêts à l’emploi en un clic depuis l’agent Otto.',
          },
        ],
      },
      {
        label: 'Améliorations',
        color: 'bg-amber-100 text-amber-800',
        entries: [
          {
            date: '6 Avril',
            tag: 'AMÉLIORATION',
            title: 'Refonte du menu image',
            description:
              'Nouveau menu avec une galerie de modèles organisée par catégorie et une distinction claire entre le text-to-image et l’image-to-image.',
          },
          {
            date: '6 Avril',
            tag: 'AMÉLIORATION',
            title: 'Refonte du menu vidéo',
            description:
              'Même refonte pour la vidéo : des modèles organisés par catégorie avec des modes text-to-video et image-to-video bien distincts.',
          },
        ],
      },
      {
        label: 'Mise à jour des modèles IA',
        color: 'bg-blue-100 text-blue-800',
        entries: [
          {
            date: '28 Avril',
            tag: 'MISE À JOUR',
            title: 'ChatGPT 5.5',
            description:
              'Améliore GPT-5.4 avec de meilleures capacités en raisonnement, coding, recherche, usage d’outils et long-context pour les workflows professionnels complexes.',
          },
          {
            date: '27 Avril',
            tag: 'MISE À JOUR',
            title: 'ChatGPT Images 2.0',
            description:
              'Le dernier modèle d’image d’OpenAI, avec des visuels de meilleure qualité, un meilleur rendu du texte, des retouches plus précises et un meilleur contrôle du réalisme et des styles.',
          },
          {
            date: '22 Avril',
            tag: 'MISE À JOUR',
            title: 'Claude Opus 4.7',
            description:
              'Le dernier modèle d’Anthropic, plus performant qu’Opus 4.6 en ingénierie logicielle avancée, notamment sur les tâches les plus complexes.',
          },
          {
            date: '13 Avril',
            tag: 'MISE À JOUR',
            title: 'Veo 3.1 Lite',
            description:
              'Le modèle Veo le plus économique de Google, conçu pour générer des vidéos en volume avec une vitesse élevée, un coût réduit et une sortie 720p/1080p, mais sans 4K.',
          },
          {
            date: '13 Avril',
            tag: 'MISE À JOUR',
            title: 'Kimi 2.5 (Moonshot)',
            description:
              'Désormais disponible dans l’Automation Builder, conçu pour des workflows d’agents avancés.',
          },
          {
            date: '13 Avril',
            tag: 'MISE À JOUR',
            title: 'Minimax 2.7',
            description:
              'Un nouveau modèle puissant optimisé pour l’automatisation basée sur des agents, désormais disponible dans l’Automation Builder.',
          },
          {
            date: '2 Avril',
            tag: 'MISE À JOUR',
            title: 'Veo 3.1 Fast',
            description:
              'Une version plus rapide et plus économique de Veo 3.1, idéale pour itérer plus vite tout en conservant une très bonne qualité vidéo.',
          },
          {
            date: '1er Avril',
            tag: 'MISE À JOUR',
            title: 'Kling 3.0',
            description:
              'Le modèle de génération vidéo Kling a été mis à jour en version 3.0 pour des résultats de qualité supérieure.',
          },
        ],
      },
      {
        label: 'Correction de bugs',
        color: 'bg-red-100 text-red-800',
        entries: [
          {
            date: '30 Avril',
            tag: 'BUG FIX',
            title: 'Regénérer des images',
            description:
              'Correction d’un bug lié à la régénération d’images et au format de sortie d’une image.',
          },
        ],
      },
    ],
  },
  {
    month: 'Mars',
    year: '2026',
    sections: [
      {
        label: 'Nouveautés',
        color: 'bg-emerald-100 text-emerald-800',
        entries: [
          {
            date: '30 Mars',
            tag: 'NOUVEAUTÉ',
            title: 'Programme d’affiliation',
            description:
              'Gagnez 30% de commission récurrente sur chaque client que vous recommandez à Unitalk. Rejoignez notre programme d’affiliation et commencez à gagner dès aujourd’hui.',
          },
          {
            date: '17 Mars',
            tag: 'NOUVEAUTÉ',
            title:
              'Nœuds Unitalk pour Google Sheets & Microsoft Todo, Outlook, OneDrive, Excel 365, Sharepoint',
            description:
              'Disponible dans n8n avec authentification en un clic via Unitalk.',
          },
          {
            date: '13 Mars',
            tag: 'NOUVEAUTÉ',
            title: 'Export de l’utilisation des crédits IA',
            description:
              'Téléchargez un résumé CSV de votre consommation de crédits IA depuis votre section Facturation.',
          },
          {
            date: '13 Mars',
            tag: 'NOUVEAUTÉ',
            title: 'Nœuds Unitalk Google Calendar & Google Drive',
            description:
              'Disponibles dans n8n avec une authentification en un clic via Unitalk.',
          },
          {
            date: '12 Mars',
            tag: 'NOUVEAUTÉ',
            title: 'Conversations favorites',
            description:
              'Ajoutez vos conversations à vos favoris pour les retrouver instantanément.',
          },
          {
            date: '12 Mars',
            tag: 'NOUVEAUTÉ',
            title: 'Nœud Unitalk Gmail',
            description:
              'Connectez votre Gmail en un clic via votre compte Unitalk directement dans vos workflows n8n.',
          },
        ],
      },
      {
        label: 'Améliorations',
        color: 'bg-amber-100 text-amber-800',
        entries: [
          {
            date: '18 Mars',
            tag: 'AMÉLIORATION',
            title: 'Support des PDF complexes (OCR)',
            description:
              'Les PDF contenant des images ou des scans sont désormais mieux pris en charge grâce à la reconnaissance optique de caractères (OCR).',
          },
        ],
      },
      {
        label: 'Mise à jour des modèles IA',
        color: 'bg-blue-100 text-blue-800',
        entries: [
          {
            date: 'Mars',
            tag: 'MISE À JOUR',
            title: 'Mises à jour des modèles',
            description:
              'ChatGPT 5.4 Thinking, ChatGPT 5.3 Instant, Nano Banana 2, Gemini 3.1 Flash — tous disponibles dès maintenant.',
          },
        ],
      },
      {
        label: 'Correction de bugs',
        color: 'bg-red-100 text-red-800',
        entries: [
          {
            date: '23 Mars',
            tag: 'BUG FIX',
            title: 'Correction de la récupération des transcriptions YouTube',
            description: '',
          },
          {
            date: '18 Mars',
            tag: 'BUG FIX',
            title:
              'Correction de l’analyse de fichiers dans les assistants personnalisés',
            description: '',
          },
          {
            date: '17 Mars',
            tag: 'BUG FIX',
            title: 'Correction de la connexion aux apps depuis l’Agent Builder',
            description: '',
          },
        ],
      },
    ],
  },
  {
    month: 'Février',
    year: '2026',
    sections: [
      {
        label: 'Nouveautés',
        color: 'bg-emerald-100 text-emerald-800',
        entries: [
          {
            date: '30 Janvier',
            tag: 'NOUVEAUTÉ',
            title: 'Optimiseur de Prompt',
            description:
              'Améliorez automatiquement vos prompts : l’Optimiseur de Prompt dans le nouveau menu de chat réécrit et enrichit vos instructions pour de meilleurs résultats.',
          },
          {
            date: '27 Février',
            tag: 'NOUVEAUTÉ',
            title: 'Recherche Approfondie (Deep Research)',
            description:
              'Lancez des recherches approfondies sur des sujets complexes et obtenez des réponses détaillées et sourcées avec le nouveau mode Deep Research.',
          },
          {
            date: '24 Février',
            tag: 'NOUVEAUTÉ',
            title: 'Agent Builder — Vue Canvas',
            description:
              'Construisez vos automatisations de manière visuelle avec la nouvelle vue Canvas dans l’Agent Builder.',
          },
          {
            date: '20 Février',
            tag: 'NOUVEAUTÉ',
            title: 'Enregistrement audio',
            description:
              'Parlez pour saisir votre prompt plutôt que de le taper.',
          },
          {
            date: '6 Février',
            tag: 'NOUVEAUTÉ',
            title: 'Support étendu des formats de fichiers',
            description:
              'Votre base de connaissances accepte désormais une gamme beaucoup plus large de formats de fichiers.',
          },
        ],
      },
      {
        label: 'Améliorations',
        color: 'bg-amber-100 text-amber-800',
        entries: [
          {
            date: '26 Février',
            tag: 'AMÉLIORATION',
            title: 'Instructions personnalisées — Sauvegarde améliorée',
            description:
              'La modification et la sauvegarde de vos instructions personnalisées sont désormais plus fiables.',
          },
          {
            date: '6 Février',
            tag: 'AMÉLIORATION',
            title: 'Message d’erreur pour format non supporté',
            description:
              'Un message clair vous informe désormais lorsque vous téléchargez un format de fichier qui n’est pas pris en charge.',
          },
          {
            date: '5 Février',
            tag: 'AMÉLIORATION',
            title: 'Connexion simplifiée aux apps dans l’Agent Builder',
            description:
              'Connectez vos applications en un clic via Unitalk lors de la création de vos workflows — aucune configuration manuelle dans n8n n’est requise.',
          },
        ],
      },
      {
        label: 'Mise à jour des modèles IA',
        color: 'bg-blue-100 text-blue-800',
        entries: [
          {
            date: 'Février',
            tag: 'MISE À JOUR',
            title: 'Mises à jour des modèles',
            description:
              'Gemini 3.1 Pro, Claude Opus 4.6, Veo 3.1 — mis à jour depuis Gemini 3 Pro, Claude Opus 4.5 et Veo 3.',
          },
        ],
      },
      {
        label: 'Correction de bugs',
        color: 'bg-red-100 text-red-800',
        entries: [
          {
            date: 'Février',
            tag: 'BUG FIX',
            title: 'Divers correctifs de stabilité',
            description:
              'Google Calendar MCP, instructions personnalisées, recherche et analyse de fichiers CSV/Excel.',
          },
        ],
      },
    ],
  },
  {
    month: 'Janvier',
    year: '2026',
    sections: [
      {
        label: 'Nouveautés',
        color: 'bg-emerald-100 text-emerald-800',
        entries: [
          {
            date: '14 Janvier',
            tag: 'NOUVEAUTÉ',
            title: 'Connexion d’instance n8n auto-hébergée',
            description:
              'Connectez votre propre instance n8n auto-hébergée à votre compte Unitalk pour utiliser votre infrastructure existante.',
          },
          {
            date: '7 Janvier',
            tag: 'NOUVEAUTÉ',
            title: 'Agent Builder — Automatisation par prompt',
            description:
              'Décrivez l’automatisation que vous souhaitez en langage naturel : l’Agent Builder la construit et la déploie automatiquement sur votre instance n8n.',
          },
        ],
      },
      {
        label: 'Améliorations',
        color: 'bg-amber-100 text-amber-800',
        entries: [
          {
            date: '12 Janvier',
            tag: 'AMÉLIORATION',
            title: 'Refonte des paramètres de l’assistant personnalisé',
            description:
              'L’interface de configuration de vos assistants personnalisés a été repensée pour une expérience de paramétrage plus simple.',
          },
        ],
      },
      {
        label: 'Mise à jour des modèles IA',
        color: 'bg-blue-100 text-blue-800',
        entries: [
          {
            date: 'Janvier',
            tag: 'MISE À JOUR',
            title: 'Mises à jour des modèles',
            description: 'Veo 3.1 — mis à jour depuis Veo 3.',
          },
        ],
      },
    ],
  },
  {
    month: 'Décembre',
    year: '2025',
    sections: [
      {
        label: 'Nouveautés',
        color: 'bg-emerald-100 text-emerald-800',
        entries: [
          {
            date: '23 Décembre',
            tag: 'NOUVEAUTÉ',
            title: 'Serveur privé en un clic',
            description:
              'Déployez un serveur privé avec n8n pré-installé en un clic depuis votre compte.',
          },
        ],
      },
      {
        label: 'Design',
        color: 'bg-purple-100 text-purple-800',
        entries: [
          {
            date: '22 Décembre',
            tag: 'DESIGN',
            title: 'Nouvelle interface',
            description:
              'L’interface de l’assistant a été complètement rafraîchie avec un nouveau design moderne.',
          },
        ],
      },
      {
        label: 'Mise à jour des modèles IA',
        color: 'bg-blue-100 text-blue-800',
        entries: [
          {
            date: 'Décembre',
            tag: 'MISE À JOUR',
            title: 'Mises à jour des modèles',
            description:
              'Deepseek V3.2, GPT-5.2, ChatGPT Image 1.5, Mistral Large 3 — mis à jour depuis Deepseek V3.1, GPT-5.1 et ChatGPT Image.',
          },
        ],
      },
    ],
  },
]

// ── Icons ────────────────────────────────────────────────────────────────────

function TagBadge({
  label,
  color,
}: {
  label: string
  color: string
}) {
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wider uppercase ${color}`}
    >
      {label}
    </span>
  )
}

// ── Entry card ───────────────────────────────────────────────────────────────

function EntryCard({ entry }: { entry: ChangelogEntry }) {
  return (
    <div className="group rounded-2xl border border-[#DcD4C4] bg-[#FBF9F3] p-5 transition-shadow hover:shadow-md">
      <div className="flex items-start gap-3">
        {/* Timeline dot + line */}
        <div className="mt-1.5 hidden sm:flex flex-col items-center">
          <div className="h-2.5 w-2.5 rounded-full bg-[#D10E63]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span
              className={`font-mono text-[11px] font-semibold uppercase tracking-wider text-[#857C6E] ${geistMono.className}`}
            >
              {entry.date}
            </span>
          </div>
          <h3 className="text-[15px] font-semibold text-[#1C1A17] leading-snug mb-1.5">
            {entry.title}
          </h3>
          {entry.description && (
            <p className="text-sm text-[#4E483F] leading-relaxed">
              {entry.description}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Month block ──────────────────────────────────────────────────────────────

function MonthBlock({ group }: { group: MonthGroup }) {
  return (
    <div className="mb-16">
      {/* Month header */}
      <div className="flex items-baseline gap-3 mb-8">
        <h2 className="font-heading text-3xl font-bold text-[#1C1A17] tracking-tight">
          {group.month}
        </h2>
        <span className="font-mono text-sm text-[#857C6E] tracking-wider">
          {group.year}
        </span>
        <div className="flex-1 ml-4 h-px bg-[#DcD4C4]" />
      </div>

      {/* Sections */}
      <div className="space-y-10">
        {group.sections.map((section) => (
          <div key={section.label}>
            <div className="flex items-center gap-3 mb-4">
              <TagBadge label={section.label} color={section.color} />
              <span
                className={`font-mono text-[11px] text-[#857C6E] ${geistMono.className}`}
              >
                {section.entries.length}{' '}
                {section.entries.length > 1 ? 'entrées' : 'entrée'}
              </span>
            </div>
            <div className="space-y-3">
              {section.entries.map((entry) => (
                <EntryCard key={entry.title + entry.date} entry={entry} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ChangelogPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F3EFE6]">
        {/* Hero */}
        <section className="relative overflow-hidden bg-[#F3EFE6] pt-28 pb-16 sm:pt-36 sm:pb-20">
          <div className="absolute inset-0 bg-grid opacity-40" />
          <div className="relative editorial-shell text-center">
            <p
              className={`font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#D10E63] mb-4 ${geistMono.className}`}
            >
              Changelog
            </p>
            <h1 className="hero-heading text-[#1C1A17] max-w-3xl mx-auto">
              Découvrez nos dernières fonctionnalités et améliorations.
            </h1>
            <p className="mt-4 text-[#857C6E] text-base max-w-xl mx-auto">
              Suivez l'évolution de la plateforme Unitalk, mise à jour après
              mise à jour.
            </p>
          </div>
        </section>

        {/* Timeline */}
        <section className="editorial-shell pb-24">
          <div className="max-w-3xl mx-auto">
            {changelogData.map((group) => (
              <MonthBlock key={group.month + group.year} group={group} />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}