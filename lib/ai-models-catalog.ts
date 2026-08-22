import type { Bilingual } from '@/lib/collaborators-catalog'

export type AiModel = {
  key: string
  title: string
  maker: string
  description: Bilingual
  modalities: readonly string[]
  type: 'proprietaire' | 'poids-ouverts'
}

export const AI_MODELS: readonly AiModel[] = [
  { key: 'openai-gpt-5-6-luna', title: 'GPT-5.6 Luna', maker: 'OpenAI', description: { fr: 'Modèle rapide pour le chat, la classification, le raisonnement courant et les agents à fort volume.', en: 'Fast model for chat, classification, everyday reasoning and high-volume agents.' }, modalities: ['texte', 'multimodal'], type: 'proprietaire' },
  { key: 'openai-gpt-5-6-sol', title: 'GPT-5.6 Sol', maker: 'OpenAI', description: { fr: 'Modèle avancé pour le raisonnement complexe, le code et les workflows agentiques longs.', en: 'Advanced model for complex reasoning, coding and long-running agentic workflows.' }, modalities: ['texte', 'multimodal'], type: 'proprietaire' },
  { key: 'openai-gpt-5-mini', title: 'GPT-5 mini', maker: 'OpenAI', description: { fr: 'Modèle compact et rapide pour les tâches courantes, le code et les agents à volume élevé.', en: 'Compact, fast model for everyday tasks, coding and high-volume agents.' }, modalities: ['texte', 'multimodal'], type: 'proprietaire' },
  { key: 'openai-gpt-5-nano', title: 'GPT-5 nano', maker: 'OpenAI', description: { fr: 'Modèle très léger pour la classification, l’extraction et les traitements simples à grande échelle.', en: 'Lightweight model for classification, extraction and simple processing at scale.' }, modalities: ['texte', 'multimodal'], type: 'proprietaire' },
  { key: 'anthropic-claude-opus-5', title: 'Claude Opus 5', maker: 'Anthropic', description: { fr: 'Modèle haut de gamme pour le raisonnement exigeant, le code et les agents de longue durée.', en: 'Premium model for demanding reasoning, coding and long-running agents.' }, modalities: ['texte', 'multimodal'], type: 'proprietaire' },
  { key: 'anthropic-claude-sonnet-5', title: 'Claude Sonnet 5', maker: 'Anthropic', description: { fr: 'Modèle polyvalent pour le code, les agents et le travail professionnel quotidien.', en: 'Versatile model for coding, agents and everyday professional work.' }, modalities: ['texte', 'multimodal'], type: 'proprietaire' },
  { key: 'google-gemini-3-6-flash', title: 'Gemini 3.6 Flash', maker: 'Google', description: { fr: 'Modèle multimodal rapide pour le code, les agents et la compréhension de contenus.', en: 'Fast multimodal model for coding, agents and content understanding.' }, modalities: ['texte', 'multimodal'], type: 'proprietaire' },
  { key: 'deepseek-v4-flash', title: 'DeepSeek V4 Flash', maker: 'DeepSeek', description: { fr: 'Modèle ouvert efficace pour le code, le raisonnement et les agents.', en: 'Open model for efficient coding, reasoning and agent workflows.' }, modalities: ['texte'], type: 'poids-ouverts' },
  { key: 'tencent-hy3', title: 'Hy3', maker: 'Tencent', description: { fr: 'Modèle ouvert conçu pour le raisonnement, les agents et les usages en production.', en: 'Open model designed for reasoning, agents and production workloads.' }, modalities: ['texte'], type: 'poids-ouverts' },
  { key: 'z-ai-glm-5-3', title: 'GLM 5.3', maker: 'Z.ai', description: { fr: 'Modèle ouvert pour le raisonnement long, les agents et l’ingénierie logicielle.', en: 'Open model for long-form reasoning, agents and software engineering.' }, modalities: ['texte'], type: 'poids-ouverts' },
  { key: 'deepseek-v4-pro', title: 'DeepSeek V4 Pro 0423', maker: 'DeepSeek', description: { fr: 'Modèle ouvert orienté raisonnement avancé, programmation et agents complexes.', en: 'Open model focused on advanced reasoning, programming and complex agents.' }, modalities: ['texte'], type: 'poids-ouverts' },
  { key: 'moonshot-kimi-k3', title: 'Kimi K3', maker: 'Moonshot AI', description: { fr: 'Modèle multimodal ouvert à contexte long pour le code, le raisonnement et le travail intellectuel complexe.', en: 'Open long-context multimodal model for coding, reasoning and complex knowledge work.' }, modalities: ['texte', 'multimodal'], type: 'poids-ouverts' },
  { key: 'flux-image', title: 'FLUX Image', maker: 'Black Forest Labs', description: { fr: 'Modèle de génération et de transformation d’images à partir d’instructions textuelles.', en: 'Model for generating and transforming images from text instructions.' }, modalities: ['image'], type: 'poids-ouverts' },
  { key: 'qwen-embedding', title: 'Qwen3 Embedding', maker: 'Qwen', description: { fr: 'Modèle de représentation vectorielle pour la recherche sémantique et les systèmes RAG.', en: 'Embedding model for semantic search and retrieval-augmented generation.' }, modalities: ['embeddings'], type: 'poids-ouverts' },
  { key: 'qwen-reranker', title: 'Qwen3 Reranker 8B', maker: 'Qwen', description: { fr: 'Modèle de reclassement qui améliore la pertinence des résultats de recherche.', en: 'Reranking model that improves the relevance of search results.' }, modalities: ['rerank'], type: 'poids-ouverts' },
  { key: 'mistral-large-3', title: 'Mistral Large 3', maker: 'Mistral AI', description: { fr: 'Modèle ouvert multimodal pour le raisonnement, le code et les tâches professionnelles complexes.', en: 'Open multimodal model for reasoning, coding and complex professional tasks.' }, modalities: ['texte', 'multimodal'], type: 'poids-ouverts' },
  { key: 'minimax-m3', title: 'MiniMax M3', maker: 'MiniMax', description: { fr: 'Modèle multimodal à contexte long pour le code, les agents et les raisonnements en plusieurs étapes.', en: 'Long-context multimodal model for coding, agents and multi-step reasoning.' }, modalities: ['texte', 'multimodal'], type: 'poids-ouverts' },
  { key: 'voxtral-stt', title: 'Voxtral Small 24B STT', maker: 'Mistral AI', description: { fr: 'Modèle de transcription et de compréhension audio multilingue.', en: 'Model for multilingual transcription and audio understanding.' }, modalities: ['audio', 'transcription'], type: 'poids-ouverts' },
  { key: 'openai-audio', title: 'GPT Audio', maker: 'OpenAI', description: { fr: 'Modèle vocal pour comprendre la parole et produire des réponses audio.', en: 'Voice model for understanding speech and producing audio responses.' }, modalities: ['audio', 'speech'], type: 'proprietaire' },
]

export function getAiModelByKey(key: string): AiModel | undefined {
  return AI_MODELS.find(model => model.key === key)
}
