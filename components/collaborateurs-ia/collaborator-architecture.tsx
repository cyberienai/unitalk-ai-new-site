import type { Lang } from '@/lib/language-context'

export function CollaboratorArchitecture({ lang }: { lang: Lang }) {
  const blocks = lang === 'fr'
    ? [
        ['Identité', 'Son compte, son nom, ses droits et son appartenance à l’entreprise.'],
        ['Mémoire', 'Ce qu’il apprend et conserve pour votre entreprise.'],
        ['Profils métier', 'Autant de rôles que nécessaire, sans recréer son identité.'],
        ['Compétences', 'Des savoir-faire documentés que vous pouvez lui ajouter.'],
        ['Applications', 'Les outils et services autorisés auxquels il peut se connecter.'],
        ['Modèles IA', 'L’intelligence la plus pertinente parmi les modèles autorisés.'],
      ]
    : [
        ['Identity', 'Their account, name, permissions and place in your company.'],
        ['Memory', 'What they learn and retain for your company.'],
        ['Job profiles', 'As many roles as needed, without recreating their identity.'],
        ['Skills', 'Documented know-how you can add over time.'],
        ['Applications', 'The authorized tools and services they can connect to.'],
        ['AI models', 'The most relevant intelligence among authorized models.'],
      ]

  return (
    <section className="bg-[#F3EFE6] py-20 sm:py-24">
      <div className="editorial-shell">
        <div className="overflow-hidden rounded-[24px] bg-[#181615] text-white">
          <div className="grid gap-8 border-b border-white/10 px-6 py-9 sm:px-9 sm:py-11 lg:grid-cols-[1fr_.8fr] lg:items-end">
            <h2 className="max-w-4xl text-[clamp(2.2rem,4.5vw,4.5rem)] font-semibold leading-[.94] tracking-[-.06em]">{lang === 'fr' ? 'Un Collaborateur IA n’est pas simplement un agent.' : 'An AI Collaborator is more than an agent.'}</h2>
            <p className="text-[15px] leading-7 text-[#CFC6B8]">{lang === 'fr' ? 'C’est une identité numérique permanente, membre de votre entreprise, avec sa mémoire, ses profils métier, ses compétences, ses outils et ses accès aux meilleurs modèles IA.' : 'It is a permanent digital identity in your company, with memory, job profiles, skills, tools and access to leading AI models.'}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3">
            {blocks.map(([title, body], index) => <article key={title} className={`min-h-44 p-6 sm:p-7 ${index > 0 ? 'border-t border-white/10 sm:[&:nth-child(2)]:border-t-0' : ''} ${index % 2 === 1 ? 'sm:border-l' : ''} ${index >= 2 ? 'lg:border-t' : ''} ${index % 3 !== 0 ? 'lg:border-l' : 'lg:border-l-0'}`}><span className="font-mono text-[9px] font-black text-[#F2A4C5]">0{index + 1}</span><h3 className="mt-8 text-xl font-semibold tracking-[-.03em]">{title}</h3><p className="mt-3 text-[13px] leading-6 text-[#AFA397]">{body}</p></article>)}
          </div>
          <div className="grid border-t border-white/10 bg-[#211E1B] lg:grid-cols-2">
            <div className="p-6 sm:p-8 lg:border-r lg:border-white/10"><p className="font-mono text-[9px] font-black uppercase tracking-[.16em] text-[#F2A4C5]">Hermes</p><h3 className="mt-3 text-2xl font-semibold">{lang === 'fr' ? 'Hermes conduit le travail.' : 'Hermes drives the work.'}</h3><p className="mt-3 text-sm leading-7 text-[#AFA397]">{lang === 'fr' ? 'Le runtime open source lui permet de raisonner, d’agir et d’exécuter ses missions dans le cadre autorisé.' : 'The open-source runtime enables reasoning, action and mission execution within the authorized scope.'}</p></div>
            <div className="border-t border-white/10 p-6 sm:p-8 lg:border-t-0"><p className="font-mono text-[9px] font-black uppercase tracking-[.16em] text-[#F2A4C5]">Unitalk</p><h3 className="mt-3 text-2xl font-semibold">{lang === 'fr' ? 'Unitalk garde la continuité.' : 'Unitalk preserves continuity.'}</h3><p className="mt-3 text-sm leading-7 text-[#AFA397]">{lang === 'fr' ? 'L’identité, la mémoire et les méthodes validées restent dans votre entreprise, même lorsque les outils ou modèles changent.' : 'Identity, memory and approved methods remain in your company, even when tools or models change.'}</p></div>
          </div>
        </div>
      </div>
    </section>
  )
}
