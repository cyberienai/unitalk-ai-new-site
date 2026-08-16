# Prompt OpenCode — Redesign megamenu + hero Unitalk

## Contexte
Projet Unitalk AI (Next.js 14, TypeScript, Tailwind CSS). Design system Paul Graham : minimaliste, brutaliste clair (#FFFDF9, #F3EFE6), typographie large Geist/Playfair.

## Problèmes à résoudre

### 1. Megamenu "Collaborateurs IA" tronqué
**Fichier** : `components/navbar.tsx` (lignes 390-490)
**Problème** : Le megamenu fait `w-[1040px]` → colonne droite coupée sur écrans < 1200px

**Corrections** :
- Réduire largeur à `w-[900px]` max
- Simplifier la colonne gauche :
  - Supprimer voice input "Parler à Alma" (bouton micro)
  - Supprimer suggestions de missions ("Relancer mes factures", etc.)
  - Garder uniquement : titre "Quel travail voulez-vous confier ?", champ texte "Décrivez votre mission...", CTA "Continuer avec Alma"
  - Supprimer bloc "Alma vous oriente" (redondant avec footer)
- Unifier les 3 colonnes sur fond light (`bg-[#F3EFE6]`) → supprimer gradient dark
- Footer : supprimer doctrine "OUVERTE · OPEN SOURCE · SOUVERAINE" (déjà dans footer global)

### 2. Hero — tableau de fonctionnalités style Excel
**Fichier** : `components/home/hero-hybrid.tsx` (lignes 245-256)
**Problème** : Les 4 cases avec bordures grises fines jurent avec le design moderne

**Corrections** :
- Remplacer tableau par 4 badges pills horizontaux :
  - Fond : `bg-[#D10E63]/10`
  - Texte : `text-[#D10E63]`
  - Bordure : `border border-[#D10E63]/20`
  - Padding : `px-4 py-2`
  - Border radius : `rounded-full`
- Texte "Propulsé par Hermes" → "1M de tokens offerts"
- Espacement : `gap-3` entre badges, `mt-7` au-dessus

### 3. Lisibilité bouton dans carte noire
**Fichier** : `components/home/hero-hybrid.tsx` (ligne 294)
**Problème** : Bouton "Voir la démonstration" gris foncé sur fond noir → contraste faible

**Correction** :
- Changer `text-[#D6CABD]` → `text-white`
- Ajouter `hover:text-[#F15B9B]`

## Contraintes techniques
- **Pas de breaking changes** : conserver tous les hrefs, aria-labels, accessibility
- **Responsive** : tester sur 1024px, 1280px, 1440px
- **Performance** : pas de nouvelles dépendances, réutiliser `lucide-react`
- **Build** : `npm run build` doit passer sans erreur

## Validation
1. Megamenu : colonne droite visible en entier sur 1024px
2. Hero : badges pills alignés horizontalement, "1M de tokens offerts" visible
3. Bouton carte noire : contraste WCAG AA (4.5:1 minimum)
4. Build local : `npm run build` → 0 erreur
5. Dev server : `curl http://localhost:3001` → 200

## Fichiers à modifier
- `components/navbar.tsx` (megamenu)
- `components/home/hero-hybrid.tsx` (hero badges + bouton carte)

## Commandes utiles
```bash
npm run dev  # Dev server port 3001
npm run build  # Build production
curl http://localhost:3001  # Vérifier 200
```
