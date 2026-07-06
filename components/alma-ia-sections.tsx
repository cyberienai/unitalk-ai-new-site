'use client'

import { motion } from 'framer-motion'

const T = {
  fr: {
    almaTitle: 'Mise en service en moins de 15 minutes avec Alma.',
    almaText:
      'Alma, notre agent vocal, vous accompagne pour créer et configurer votre premier Collaborateur IA Unitalk.\nElle vous guide pas à pas pour :',
    almaSteps: [
      'choisir son identité ;',
      'définir son rôle ;',
      'sélectionner ses premières compétences ;',
      'ajouter du contexte ;',
      'rédiger ses instructions de travail ;',
      'tester une première mission ;',
      'décider comment l\'intégrer dans votre quotidien.',
    ],
    almaStrong: 'Vous ne configurez pas seul. Alma vous guide.',
    almaCta: 'Créer mon Collaborateur IA gratuit',
    almaMicrocopy: 'Sans carte bancaire.',

    dispersedTitle: 'L\'IA ne doit pas rester dans un onglet.',
    dispersedIntro: 'Vos équipes utilisent déjà l\'IA.\nMais souvent, elles l\'utilisent en désordre.',
    dispersedProblems: [
      'Les comptes sont individuels',
      'Les conversations restent isolées',
      'Les prompts disparaissent',
      'Les bonnes méthodes ne sont pas partagées',
      'La mémoire se perd',
      'Les données sortent du cadre',
      'Les outils restent séparés',
    ],
    dispersedStrong: 'Le problème n\'est pas que les entreprises n\'utilisent pas l\'IA.\nLe problème est qu\'elles l\'utilisent en désordre.',
    dispersedConclusion: 'Unitalk organise l\'IA pour qu\'elle devienne une vraie capacité de travail.',
  },
  en: {
    almaTitle: 'Onboarded in less than 15 minutes with Alma.',
    almaText:
      'Alma, our voice agent, guides you to create and configure your first Unitalk AI Collaborator.\nShe walks you step by step to:',
    almaSteps: [
      'choose its identity;',
      'define its role;',
      'select its first skills;',
      'add context;',
      'write its work instructions;',
      'test a first mission;',
      'decide how to integrate it into your daily routine.',
    ],
    almaStrong: 'You don\'t configure alone. Alma guides you.',
    almaCta: 'Create my AI Collaborator for free',
    almaMicrocopy: 'No credit card.',

    dispersedTitle: 'AI shouldn\'t stay in a tab.',
    dispersedIntro: 'Your teams already use AI.\nBut often, they use it in disorder.',
    dispersedProblems: [
      'Accounts are individual',
      'Conversations remain isolated',
      'Prompts disappear',
      'Best practices aren\'t shared',
      'Memory is lost',
      'Data leaves the frame',
      'Tools remain separate',
    ],
    dispersedStrong: 'The problem isn\'t that companies don\'t use AI.\nThe problem is they use it in disorder.',
    dispersedConclusion: 'Unitalk organizes AI so it becomes a real work capacity.',
  },
}

export function AlmaIaSections({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = T[lang]

  return (
    <>
      {/* Alma section */}
      <section className="relative w-full bg-[#F3EFE6] px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            className="font-sf mb-6 text-3xl font-bold text-[#1C1A17] sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t.almaTitle}
          </motion.h2>

          <motion.p
            className="mb-8 whitespace-pre-line text-lg leading-relaxed text-[#4E483F] sm:text-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t.almaText}
          </motion.p>

          <motion.ul
            className="mb-10 space-y-2 text-left sm:mx-auto sm:max-w-md"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t.almaSteps.map((step, i) => (
              <li key={i} className="text-sm text-[#1C1A17] sm:text-base">
                {step}
              </li>
            ))}
          </motion.ul>

          <motion.p
            className="mb-8 text-lg font-semibold text-[#1C1A17] sm:text-xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {t.almaStrong}
          </motion.p>

          <motion.button
            className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#D10E63] px-7 py-3.5 text-sm font-semibold text-[#FBF9F3] transition-all hover:bg-[#B00B52] sm:text-base"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {t.almaCta}
          </motion.button>
          <p className="text-xs text-[#857C6E] sm:text-sm">{t.almaMicrocopy}</p>
        </div>
      </section>

      {/* IA dispersée section */}
      <section className="relative w-full bg-white px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <motion.h2
            className="font-sf mb-8 text-3xl font-bold text-[#1C1A17] sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t.dispersedTitle}
          </motion.h2>

          <motion.p
            className="mb-10 whitespace-pre-line text-lg leading-relaxed text-[#4E483F] sm:text-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t.dispersedIntro}
          </motion.p>

          <motion.div
            className="mb-10 grid gap-4 sm:grid-cols-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t.dispersedProblems.map((problem, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-lg border border-[#E4DCCC] bg-[#F9F7F3] px-4 py-3"
              >
                <span className="text-[#D10E63] font-bold">—</span>
                <p className="text-sm text-[#1C1A17] sm:text-base">{problem}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="mb-10 rounded-lg border-l-4 border-[#D10E63] bg-[#F9F7F3] px-6 py-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="whitespace-pre-line font-semibold text-[#1C1A17]">{t.dispersedStrong}</p>
          </motion.div>

          <motion.p
            className="text-lg text-[#4E483F] sm:text-xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {t.dispersedConclusion}
          </motion.p>
        </div>
      </section>
    </>
  )
}
