import type { Lang } from '@/lib/language-context'

export type AiArchitect = {
  slug: string
  name: string
  company: string
  image: string
  imageSource: string
  tagline: Record<Lang, string>
  focus: Record<Lang, string>
  models: string[]
}

export const AI_ARCHITECTS: AiArchitect[] = [
  { slug:'jensen-huang',name:'Jensen Huang',company:'NVIDIA',image:'/leaders/jensen-huang.jpg',imageSource:'Wikimedia Commons',tagline:{fr:'Le calcul accéléré qui porte l’IA moderne.',en:'Accelerated computing powering modern AI.'},focus:{fr:'GPU, CUDA et infrastructure de calcul.',en:'GPUs, CUDA and compute infrastructure.'},models:['H100 / B200','CUDA','NVIDIA NIM'] },
  { slug:'liang-wenfeng',name:'Liang Wenfeng',company:'DeepSeek',image:'/leaders/liang-wenfeng.svg',imageSource:'Portrait éditorial Unitalk',tagline:{fr:'L’efficacité ouverte qui redéfinit le coût du raisonnement.',en:'Open efficiency reshaping the cost of reasoning.'},focus:{fr:'Modèles ouverts, efficacité et raisonnement.',en:'Open models, efficiency and reasoning.'},models:['DeepSeek V4','DeepSeek R1','DeepSeek Coder'] },
  { slug:'sam-altman',name:'Sam Altman',company:'OpenAI',image:'/leaders/sam-altman.jpg',imageSource:'Wikimedia Commons',tagline:{fr:'L’IA généraliste transformée en produit mondial.',en:'General AI turned into a global product.'},focus:{fr:'Modèles multimodaux, API et déploiement progressif.',en:'Multimodal models, APIs and iterative deployment.'},models:['GPT','Codex','OpenAI API'] },
  { slug:'elon-musk',name:'Elon Musk',company:'xAI',image:'/leaders/elon-musk.jpg',imageSource:'Wikimedia Commons',tagline:{fr:'Infrastructure massive et vitesse d’exécution.',en:'Massive infrastructure and execution speed.'},focus:{fr:'Supercalculateurs, modèles Grok et intégration verticale.',en:'Supercomputers, Grok models and vertical integration.'},models:['Grok','Colossus','xAI API'] },
  { slug:'demis-hassabis',name:'Demis Hassabis',company:'Google DeepMind',image:'/leaders/demis-hassabis.jpg',imageSource:'Wikimedia Commons',tagline:{fr:'La recherche fondamentale transformée en applications scientifiques.',en:'Fundamental research turned into scientific applications.'},focus:{fr:'Gemini, AlphaFold et recherche scientifique.',en:'Gemini, AlphaFold and scientific research.'},models:['Gemini','AlphaFold','AlphaGo'] },
  { slug:'dario-amodei',name:'Dario Amodei',company:'Anthropic',image:'/leaders/dario-amodei.jpg',imageSource:'Wikimedia Commons',tagline:{fr:'La puissance des modèles encadrée par la sécurité.',en:'Model capability framed by safety.'},focus:{fr:'Claude, Constitutional AI et sûreté.',en:'Claude, Constitutional AI and safety.'},models:['Claude','Constitutional AI','Model safety'] },
  { slug:'andrej-karpathy',name:'Andrej Karpathy',company:'Eureka Labs',image:'/leaders/andrej-karpathy.png',imageSource:'Wikimedia Commons',tagline:{fr:'Comprendre l’IA en la construisant.',en:'Understand AI by building it.'},focus:{fr:'Pédagogie, code et systèmes reproductibles.',en:'Education, code and reproducible systems.'},models:['Eureka Labs','llama.c','Neural networks'] },
  { slug:'yann-lecun',name:'Yann LeCun',company:'AMI Labs',image:'/leaders/yann-lecun.svg',imageSource:'Portrait éditorial Unitalk',tagline:{fr:'Des systèmes ouverts capables d’apprendre le monde.',en:'Open systems able to learn the world.'},focus:{fr:'World models, apprentissage auto-supervisé et recherche ouverte.',en:'World models, self-supervised learning and open research.'},models:['World models','JEPA','Open research'] },
  { slug:'arthur-mensch',name:'Arthur Mensch',company:'Mistral AI',image:'/leaders/arthur-mensch.svg',imageSource:'Portrait éditorial Unitalk',tagline:{fr:'Des modèles européens compacts et maîtrisables.',en:'Compact, controllable European models.'},focus:{fr:'Souveraineté, modèles efficaces et déploiement européen.',en:'Sovereignty, efficient models and European deployment.'},models:['Mistral Large','Codestral','Mistral Small'] },
]

export function getAiArchitect(slug: string) { return AI_ARCHITECTS.find(item => item.slug === slug) }
