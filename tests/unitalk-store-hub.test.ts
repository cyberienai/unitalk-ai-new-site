import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const hub = readFileSync(new URL('../components/unitalk-store-hub.tsx', import.meta.url), 'utf8')
const page = readFileSync(new URL('../app/marketplace/page.tsx', import.meta.url), 'utf8')
const models = readFileSync(new URL('../lib/ai-models-catalog.ts', import.meta.url), 'utf8')
const catalog = readFileSync(new URL('../lib/store-catalog.ts', import.meta.url), 'utf8')

describe('Marketplace IA hub', () => {
  it('centralizes AI Collaborators and the five equipment categories', () => {
    expect(page).toContain('UnitalkStoreHub')
    for (const label of ['Collaborateurs IA','Profils métier','Compétences','Applications','Modèles IA','Serveurs IA']) expect(hub).toContain(label)
    expect(hub).toContain('STORE_CATEGORIES')
    expect(hub).toContain("heroTitle: { fr: 'Choisissez le Collaborateur IA qui rejoindra votre équipe.'")
  })

  it('shows canonical public AI Collaborators first', () => {
    expect(hub.indexOf("id: 'collaborateurs-ia'")).toBeLessThan(hub.indexOf("id: 'profils-metier'"))
    expect(hub).toContain('MARKETPLACE_COLLABORATOR_SLUGS')
    expect(hub).toContain('ROLE_DETAILS[slug]')
    expect(hub).toContain('collaboratorHref(detail.slug)')
    expect(hub).toContain('detail.avatar')
    expect(hub).toContain("explain: { fr: 'Comment fonctionne un Collaborateur IA ?'")
  })

  it('states the catalog and knowledge-work positioning', () => {
    expect(hub).toContain('Choisissez le Collaborateur IA qui rejoindra votre équipe.')
    expect(hub).toContain('Un profil métier de référence pour chaque métier de la connaissance')
  })

  it('starts directly with the catalog', () => {
    expect(hub).not.toContain('AlmaMissionComposer')
    expect(hub).not.toContain('getSpeechRecognition')
    expect(hub).toContain('px-5 pt-28 sm:px-8 sm:pt-40')
    expect(hub).not.toContain("'pb-9 pt-20 sm:pb-11 sm:pt-24")
    expect(hub).not.toContain('Marketplace · Collaborateurs IA')
    expect(hub).not.toContain('border-t border-[#CFC3B2]')
  })

  it('uses one horizontal category navigation', () => {
    expect(hub).not.toContain("w-[220px] shrink-0")
    expect(hub).not.toContain('sticky top-24')
    expect(hub).toContain('onClick={() => selectCategory(category.id)}')
    expect(hub).toContain("role={collaboratorsOnly ? undefined : 'tablist'}")
    expect(hub).toContain('overflow-x-auto scrollbar-hide')
    expect(hub).toContain("router.push(href, { scroll: false })")
    expect(hub).toContain('const pathname = usePathname()')
    expect(hub).toContain("pathname.split('/').filter(Boolean).at(-1)")
    expect(hub).toContain("collaboratorsOnly\n      ? 'collaborateurs-ia'")
    expect(hub).toContain('}, [collaboratorsOnly, initialCategory, pathname])')
    expect(hub).not.toContain("router.replace(href, { scroll: false })")
  })

  it('centralizes real catalogs with search and featured cards', () => {
    expect(hub).toContain('STORE_ITEMS')
    expect(hub).toContain('itemsForCategory')
    expect(hub).toContain('MarketplaceItemCard')
    expect(hub).toContain('Rechercher un profil métier')
    expect(hub).toContain('category={activeCategory}')
    expect(hub).toContain('useLayoutEffect')
    expect(hub).toContain("scrollIntoView({ behavior:")
  })

  it('makes skills concrete and filterable', () => {
    for (const text of ["skillCategories: 'Catégories de compétences'", 'Contexte d’application', 'Résultat produit', 'Profils compatibles', 'Méthode à valider sur votre cas']) expect(hub).toContain(text)
    expect(hub).toContain('Ajoutez gratuitement les compétences nécessaires à chaque mission.')
    expect(hub).toContain('Chaque compétence est adaptée au profil et aux missions de votre Collaborateur.')
    expect(hub).toContain("storeType === 'competence' ? { fr: 'Gratuite', en: 'Free' }")
    expect(hub).toContain("skillHeroProofs: ['Compétences gratuites', 'Méthodes documentées', 'Réutilisables par mission']")
    expect(hub).toContain('<SkillMarketplaceCard')
    expect(hub).toContain('min-h-[245px]')
    expect(hub).toContain('sm:min-h-[265px]')
    expect(hub).toContain('group-hover:opacity-100')
    expect(hub).toContain('absolute inset-0 hidden translate-y-2')
    expect(hub).not.toContain("lang === 'fr' ? 'Compétence' : 'Skill'")
  })

  it('uses the shared featured hero for profiles, skills, applications and models', () => {
    expect(hub).toContain("['profils-metier', 'competences', 'applications', 'modeles-ia', 'serveurs-ia'].includes(activeCategory.id)")
    expect(hub).toContain('Connectez uniquement les applications nécessaires à chaque mission.')
    expect(hub).toContain('Votre Collaborateur IA utilise les applications pour réaliser les actions que vous lui autorisez.')
    expect(hub).toContain("applicationHeroProofs: ['Accès définis par votre entreprise', 'Actions autorisées']")
    expect(hub).toContain("modelHeroProofs: ['Sélection automatique', 'Fournisseurs sous votre contrôle']")
    expect(hub).toContain("serverHeroProofs: ['Infrastructure privée', 'Capacité évolutive', 'Déploiement gouverné']")
    expect(hub).toContain('featuredHeroProofs.map((proof)')
    expect(hub).toContain('<MarketplaceSidebarCatalog')
    expect(hub).toContain("category.id === 'competences' ? Object.fromEntries(PROFILE_DEPARTMENTS.map")
    expect(hub).toContain("facetKeys: storeType === 'competence' ? profileDomainsFor(item.relatedProfiles)")
    expect(hub).toContain("skillCategories: 'Catégories de compétences', applicationCategories: 'Catégories d’applications', serverCategories: 'Types d’infrastructure'")
    expect(hub).toContain("MODEL_MODALITY_ORDER = ['texte', 'image', 'embeddings', 'audio', 'video', 'rerank', 'speech', 'transcription']")
  })

  it('orders job profiles by broad SMB demand', () => {
    expect(hub).toContain('PROFILE_DEMAND_ORDER')
    const demandOrder = hub.slice(hub.indexOf('const PROFILE_DEMAND_ORDER = ['), hub.indexOf('const PROFILE_DEMAND_RANK'))
    const commercial = demandOrder.indexOf("'commercial'")
    const administrative = demandOrder.indexOf("'gestionnaire-administratif'")
    const executive = demandOrder.indexOf("'assistante-de-direction'")
    const transformation = demandOrder.indexOf("'conseiller-transformation-ia'")
    expect(commercial).toBeGreaterThan(-1)
    expect(commercial).toBeLessThan(administrative)
    expect(administrative).toBeLessThan(executive)
    expect(executive).toBeLessThan(transformation)
    expect(hub).toContain("PROFILE_DEMAND_RANK.get(a.slug)")
  })

  it('offers a clear path for a missing job profile', () => {
    expect(hub).toContain('Vous ne trouvez pas le profil métier adapté ?')
    expect(hub).toContain('adapter un profil existant ou à préparer un nouveau profil métier')
    expect(hub).toContain('Créer mon profil métier')
    expect(hub).toContain('Proposer un profil à la Marketplace')
    expect(hub).not.toContain("lang === 'fr' ? 'Profil sur mesure'")
  })

  it('keeps each category explanation on its reference route', () => {
    for (const href of ['/collaborateurs-ia/profils-metier','/marketplace/competences','/marketplace/applications','/modeles-ia','/marketplace/serveurs-ia']) expect(hub).toContain(`href: '${href}'`)
  })

  it('frames models as access and servers as scalable execution infrastructure', () => {
    expect(hub).toContain('Une interface unique pour tous vos modèles d’IA adaptés à chaque mission.')
    expect(hub).toContain('Unitalk sélectionne automatiquement le modèle pertinent parmi ceux autorisés par votre entreprise.')
    expect(hub).toContain('Où votre Collaborateur travaille. Une infrastructure qui évolue.')
    expect(hub).toContain('Augmentez ses ressources lorsque le travail l’exige.')
    expect(hub).toContain("'unitalk-ai-cloud': { fr: 'Unitalk AI Cloud'")
    expect(hub).toContain("hebergeurs: { fr: 'Hébergeurs'")
    expect(hub).toContain("facetKey: 'unitalk-ai-cloud'")
    expect(hub).toContain("facetKey: 'hebergeurs'")
    expect(hub).toContain("href: '/hebergeurs'")
    for (const size of ["name: { fr: 'Small'", "name: { fr: 'Medium'", "name: { fr: 'Large'", "name: { fr: 'XL'", "name: { fr: 'XXL'"]) expect(catalog).toContain(size)
    for (const capacity of ['1 CPU · 4 Go de RAM', '2 CPU', '4 GPU', '8 GPU', '16 GPU']) expect(catalog).toContain(capacity)
    for (const host of ['OVHcloud', 'Scaleway', 'OUTSCALE', 'Hostinger', 'Hébergeurs nationaux souverains européens', 'Hyperscalers']) expect(hub).toContain(host)
    expect(catalog).toContain("if (item.type === 'server') return `/decouvrir?store=${item.slug}&source=marketplace-servers`")
    expect(hub).not.toContain('/collaborateurs-ia/serveurs')
  })

  it('shows popular proprietary and open-weight models with focused cards', () => {
    for (const model of ['GPT-5.6 Luna', 'GPT-5.6 Sol', 'Claude Opus 5', 'Claude Sonnet 5', 'Gemini 3.6 Flash', 'DeepSeek V4 Flash', 'Hy3', 'GLM 5.3', 'DeepSeek V4 Pro 0423']) expect(hub).toContain(model)
    expect(models).toContain("title: 'Kimi K3'")
    expect(models).toContain("title: 'GPT-5 mini'")
    expect(models).toContain("title: 'GPT-5 nano'")
    expect(models).toContain("title: 'Mistral Large 3'")
    expect(models).toContain("title: 'MiniMax M3'")
    expect(hub).toContain("fr: 'Modèle propriétaire'")
    expect(hub).toContain("fr: 'Modèle open source'")
    expect(hub).toContain("item.modelTypeKey === 'open-source' ? 'Open source'")
    expect(hub).toContain("lang === 'fr' ? 'Propriétaire' : 'Proprietary'")
    expect(hub).toContain('<ModelMarketplaceCard')
    expect(hub).toContain('item.modelModalities?.map')
    expect(hub).toContain('min-h-[76px] flex-wrap content-center')
    expect(hub).toContain('<ModelProviderLogo maker={item.origin} />')
    for (const provider of ['OpenAI', 'Anthropic', 'Gemini', 'DeepSeek', 'Tencent', 'XiaomiMiMo', 'Zhipu', 'Nvidia', 'Flux', 'Qwen', 'Mistral']) expect(hub).toContain(`<${provider}`)
    expect(hub).toContain("modelTypeKey: item.type === 'proprietaire' ? 'proprietaire' : 'open-source'")
    expect(hub).toContain("multimodal: { fr: 'Multimodal', en: 'Multimodal' }")
    expect(models).toContain("modalities: ['texte', 'multimodal']")
    expect(hub).toContain("lang === 'fr' ? 'Type de modèle' : 'Model type'")
    expect(hub).toContain("lang === 'fr' ? 'Tous les modèles IA' : 'All AI models'")
    expect(hub).toContain("modelType === type.id ? '' : type.id")
  })

  it('uses fully clickable profile and skill cards with a progressive add action', () => {
    expect(hub).toContain('aria-label={`${labels.addProfile} : ${item.title}`}')
    expect(hub).toContain('group-hover:bg-[var(--profile-accent)]')
    expect(hub).toContain('group-focus-visible:bg-[var(--profile-accent)]')
    expect(hub).toContain('sm:group-hover:opacity-0')
    expect(hub).toContain('absolute inset-0 hidden translate-y-2')
    expect(hub).toContain('aria-label={`${labels.addProfile} : ${item.title}`}')
    expect(hub).not.toContain('>Profil métier</p>')
    expect(hub).not.toContain("lang === 'fr' ? 'Compétence' : 'Skill'")
  })

  it('keeps desktop filter sidebars independently scrollable', () => {
    expect(hub.match(/max-h-\[calc\(100dvh-180px\)\] overflow-y-auto/g)).toHaveLength(2)
  })

  it('uses the compact progressive action treatment for application cards', () => {
    expect(hub).toContain("category.id === 'applications' && href")
    expect(hub).toContain('aria-label={`${action} : ${item.title}`} className="group relative flex min-h-[210px]')
    expect(hub).toContain('bg-[#C80B5B] px-4 text-xs font-bold text-white opacity-0')
    expect(hub).toContain('<h3 className="min-w-0 line-clamp-2 text-[22px]')
  })

  it('uses the compact progressive action treatment for server cards', () => {
    expect(hub).toContain("category.id === 'serveurs-ia' && href")
    expect(hub).toContain('bg-[#216641]/10 text-[#216641]')
    expect(hub).not.toContain('Infrastructure d’exécution')
  })

  it('uses the same structured cards for skills, applications, models and servers', () => {
    expect(hub).toContain("['competences', 'applications', 'modeles-ia', 'serveurs-ia'].includes(category.id)")
    expect(hub).not.toContain('Bibliothèque de savoir-faire')
    expect(hub).not.toContain('Choisissez une compétence prête à ajouter.')
    expect(hub).not.toContain('Outils de travail')
    expect(hub).not.toContain('Connectez uniquement les applications utiles.')
    expect(hub).not.toContain('Le bon modèle est sélectionné pour chaque travail.')
    expect(hub).not.toContain('Intelligences disponibles')
    expect(hub).not.toContain('familles de modèles`')
    expect(hub).not.toContain('Dimensionnez un environnement adapté au travail.')
    expect(hub).toContain("category.id === 'applications' ? (lang === 'fr' ? 'Usage principal'")
    expect(hub).toContain("category.id === 'modeles-ia' ? (lang === 'fr' ? 'Sélection'")
    expect(hub).toContain("lang === 'fr' ? 'Contexte conseillé' : 'Recommended context'")
    expect(hub).not.toContain("lang === 'fr' ? 'Gratuite' : 'Free'")
  })
})
