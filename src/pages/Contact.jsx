import ContactIntro from '@/sections/contact/ContactIntro'
import ContactDetails from '@/sections/contact/ContactDetails'
import ContactForm from '@/sections/contact/ContactForm'
import ContactCta from '@/sections/contact/ContactCta'
import DataGate from '@/components/ui/DataGate'
import { resources } from '@/lib/content'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function Contact() {
  usePageTitle('Kontak')

  return (
    <DataGate resources={[resources.profile]}>
      <ContactIntro />
      <ContactDetails />
      <ContactForm />
      <ContactCta />
    </DataGate>
  )
}
