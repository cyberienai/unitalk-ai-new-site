import type { Metadata } from 'next'
import { AlmaContent } from '@/components/alma/alma-content'

export const metadata: Metadata = {
  title: 'Alma — De votre besoin à une mission prête à accomplir | Unitalk',
  description:
    'Parlez à Alma. Elle comprend votre besoin, apprend comment votre entreprise travaille et prépare le Collaborateur IA, les savoir-faire et les accès nécessaires.',
  alternates: { canonical: '/alma' },
  openGraph: {
    title: 'Alma — De votre besoin à une mission prête à accomplir',
    description:
      'Parlez à Alma. Elle comprend votre besoin, apprend comment votre entreprise travaille et prépare le Collaborateur IA, les savoir-faire et les accès nécessaires.',
    url: '/alma',
    type: 'website',
  },
}

export default function AlmaPage() {
  return <AlmaContent />
}
