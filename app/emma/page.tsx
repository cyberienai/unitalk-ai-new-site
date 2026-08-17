import { permanentRedirect } from 'next/navigation'

export default function LegacyEmmaPage() {
  permanentRedirect('/@emma')
}
