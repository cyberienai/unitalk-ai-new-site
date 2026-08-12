import Link from 'next/link'

const toc = [
  ['definition', 'Définir un prospect qualifié'],
  ['recherche', 'Confier la recherche'],
  ['validation', 'Conserver la validation humaine'],
  ['contact', 'Cadrer la prise de contact'],
  ['resultat', 'Définir le résultat attendu'],
] as const

export function ProspectsGuideContent() {
  return (
    <article className="px-5 pb-20 pt-24 sm:px-8 sm:pt-28">
      <div className="mx-auto max-w-3xl">
        <Link href="/blog" className="text-sm font-semibold text-[#6E665A] transition-colors hover:text-[#D10E63]">← Tous les articles</Link>
        <p className="mt-7 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#B00C54]">Prospection B2B</p>
        <h1 className="mt-3 text-balance font-sf text-[clamp(2rem,4vw,2.8rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-[#1C1A17]">
          Trouver des prospects qualifiés avec l’IA : une liste ne vaut pas une bonne sélection
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-[#4E483F]">
          La prospection ne manque pas de données. Elle manque souvent de discernement. Obtenir des centaines de noms est simple ; savoir lesquels correspondent réellement à votre offre, au bon moment et pour les bonnes raisons l’est beaucoup moins.
        </p>
        <p className="mt-4 text-sm font-medium text-[#6E665A]">Par Unitalk · Mis à jour le 12 août 2026 · 7 min de lecture</p>

        <section id="definition" className="mt-10 rounded-2xl border border-[#DED6C8] bg-[#FAF8F3] p-5">
          <h2 className="font-sf text-xl font-bold">Qu’est-ce qu’un prospect qualifié ?</h2>
          <p className="mt-3 leading-relaxed text-[#4E483F]">
            Un prospect qualifié est une entreprise ou une personne qui correspond à des critères commerciaux définis, montre un besoin pertinent et peut être approchée dans le cadre autorisé par l’entreprise. L’IA peut préparer cette qualification ; l’équipe commerciale conserve la décision finale.
          </p>
        </section>

        <nav aria-label="Dans cet article" className="mt-8 border-y border-[#DED6C8] py-5">
          <p className="font-sf font-bold">Dans cet article</p>
          <ol className="mt-3 space-y-2">
            {toc.map(([id, label], index) => <li key={id}><a href={`#${id}`} className="grid grid-cols-[2rem_1fr] text-sm text-[#4E483F] hover:text-[#D10E63]"><span className="font-mono text-[#B00C54]">{String(index + 1).padStart(2, '0')}</span><span>{label}</span></a></li>)}
          </ol>
        </nav>

        <ArticleSection title="Commencer par définir ce qu’est un bon prospect">
          <p>Avant de rechercher des entreprises, il faut définir les critères qui rendront la recherche utile. Ces critères peuvent décrire le secteur, la taille, la technologie utilisée, la zone géographique, un problème reconnu ou un signal récent de croissance.</p>
          <ul><li>appartenir à un secteur précis ;</li><li>employer entre 20 et 200 personnes ;</li><li>montrer un signal de recrutement ou de transformation ;</li><li>ne pas être déjà client ou engagé dans une autre démarche commerciale.</li></ul>
          <p>Ces critères de qualification ne doivent pas être inventés par l’IA. Ils viennent de l’entreprise, de son profil client idéal et de l’expérience de son équipe.</p>
        </ArticleSection>

        <ArticleSection id="recherche" title="Confier la recherche, pas le jugement final">
          <p>Une fois le cadre validé, le <Link href="/collaborateurs-ia" className="text-[#B00C54] underline underline-offset-4">Collaborateur IA</Link> peut rechercher les entreprises, réunir les informations publiques autorisées, vérifier les données, écarter les doublons et expliquer pourquoi chaque prospect a été retenu.</p>
          <ol><li>rechercher les entreprises correspondant aux critères ;</li><li>compléter chaque fiche avec les informations autorisées ;</li><li>relever les signaux récents qui justifient la qualification ;</li><li>présenter une sélection commerciale documentée.</li></ol>
        </ArticleSection>

        <section className="mt-10 rounded-2xl border border-[#DED6C8] bg-[#FAF8F3] p-5">
          <h2 className="font-sf text-xl font-bold">Exemple illustratif d’un prospect présenté à l’équipe</h2>
          <dl className="mt-4 grid gap-3 text-sm text-[#4E483F]">
            <div><dt className="font-bold text-[#1C1A17]">Entreprise</dt><dd>Acme Industries — exemple fictif</dd></div>
            <div><dt className="font-bold text-[#1C1A17]">Pourquoi elle correspond</dt><dd>86 salariés et recrutement récent de trois commerciaux.</dd></div>
            <div><dt className="font-bold text-[#1C1A17]">Sources</dt><dd>Site de l’entreprise · Offre d’emploi · Registre autorisé</dd></div>
            <div><dt className="font-bold text-[#1C1A17]">Date du signal</dt><dd>12 août 2026</dd></div>
            <div><dt className="font-bold text-[#1C1A17]">Point à vérifier</dt><dd>Aucun responsable identifié pour le périmètre concerné.</dd></div>
            <div><dt className="font-bold text-[#1C1A17]">Niveau de confiance</dt><dd>Moyen</dd></div>
            <div><dt className="font-bold text-[#1C1A17]">Recommandation</dt><dd>Conserver dans la sélection pour validation.</dd></div>
          </dl>
        </section>

        <ArticleSection id="validation" title="La validation humaine améliore la prochaine recherche">
          <p>Lorsqu’un commercial refuse un prospect, il peut préciser pourquoi : entreprise trop petite, besoin insuffisamment démontré, relation existante, mauvais interlocuteur ou signal trop ancien.</p>
          <p>Le Collaborateur IA ne remplace pas le jugement commercial. Il applique les critères définis et apprend uniquement des corrections que l’équipe accepte de conserver.</p>
        </ArticleSection>

        <ArticleSection id="contact" title="Une mission peut s’arrêter avant la prise de contact">
          <p>Rechercher et contacter sont deux responsabilités différentes. L’entreprise peut autoriser la recherche, la qualification de prospects et la préparation de messages tout en exigeant une validation humaine avant l’ajout au CRM, l’utilisation d’une donnée de contact ou l’envoi.</p>
        </ArticleSection>

        <section id="resultat" className="mt-10 overflow-hidden rounded-2xl border border-[#DED6C8] bg-[#FAF8F3]">
          <h2 className="px-5 pt-5 font-sf text-xl font-bold">Le résultat attendu</h2>
          <dl className="mt-4 divide-y divide-[#DED6C8]">
            <FicheRow label="Mission" value="Trouver des prospects correspondant à notre cible commerciale." />
            <FicheRow label="Résultat" value="Une sélection documentée d’entreprises à examiner, sans doublons et accompagnée des raisons de leur qualification." />
            <FicheRow label="Règles" value="Utiliser uniquement les sources autorisées. Exclure les clients existants et les entreprises déjà contactées au cours des six derniers mois." />
            <FicheRow label="Validation humaine" value="La sélection doit être validée avant tout ajout au CRM ou toute prise de contact." />
          </dl>
        </section>

        <ArticleSection title="Du volume à la capacité commerciale">
          <p>L’objectif n’est pas de produire plus de lignes dans un fichier, mais de réduire le temps de recherche et d’améliorer la qualité des sélections. Découvrez les autres <Link href="/missions" className="text-[#B00C54] underline underline-offset-4">missions prêtes à adapter</Link>.</p>
        </ArticleSection>

        <section className="mt-12">
          <h2 className="font-sf text-2xl font-bold">Questions fréquentes</h2>
          <Faq q="Comment l’IA peut-elle qualifier un prospect ?">Elle applique les critères définis par l’entreprise, rassemble les informations autorisées et explique pourquoi chaque prospect a été retenu. L’équipe valide la sélection finale.</Faq>
          <Faq q="Le Collaborateur IA peut-il contacter automatiquement les prospects ?">Seulement si l’entreprise l’autorise. Recherche, qualification, préparation des messages et envoi peuvent avoir des niveaux de validation différents.</Faq>
          <Faq q="Comment améliorer la qualité des prochaines sélections ?">Les motifs d’acceptation, de correction ou de refus validés par l’équipe permettent d’affiner progressivement la méthode.</Faq>
        </section>

        <section className="mt-12 border-t border-[#DED6C8] pt-8">
          <h2 className="font-sf text-2xl font-bold">Prêt à identifier vos prochains prospects ?</h2>
          <p className="mt-3 text-[#4E483F]">Confiez vos critères à votre Collaborateur IA. Il prépare la sélection, votre équipe garde la décision.</p>
          <Link href="/confier?mission=trouver-de-nouveaux-clients" className="mt-5 inline-flex rounded-full bg-[#D10E63] px-6 py-3 text-sm font-bold text-white">Recevoir une proposition adaptée →</Link>
        </section>
      </div>
    </article>
  )
}

function ArticleSection({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) {
  return <section id={id} className="mt-10 [&_li]:mt-2 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mt-4 [&_p]:leading-[1.75] [&_p]:text-[#3B3730] [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6"><h2 className="font-sf text-2xl font-bold tracking-[-0.02em]">{title}</h2>{children}</section>
}

function FicheRow({ label, value }: { label: string; value: string }) {
  return <div className="grid gap-1 px-5 py-4 sm:grid-cols-[10rem_1fr]"><dt className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#6E665A]">{label}</dt><dd className="text-sm leading-relaxed text-[#1C1A17]">{value}</dd></div>
}

function Faq({ q, children }: { q: string; children: React.ReactNode }) {
  return <div className="mt-5"><h3 className="font-sf text-lg font-bold">{q}</h3><p className="mt-2 leading-relaxed text-[#4E483F]">{children}</p></div>
}
