import { db } from '@/lib/db'
import { Board } from './board'
import { Form } from './form'
import { Info } from './components/info'
import { useOrganization } from '@clerk/nextjs'

const OrganizationPage = async () => {
  return (
    <div className="w-full mb-20">
      <Info />
    </div>
  )
}
export default OrganizationPage
