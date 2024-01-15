import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useOrganizationList } from '@clerk/nextjs'

export const OrgControl = () => {
  /* we would directly catch the params if this was a page but as it is a
    component we are using useParams(); */

  const params = useParams()
  const { setActive } = useOrganizationList()

  //   this useEffect will run when organizationId will change(user is switching
  //   to next org) or useOrganizationList() is changed(user is creating another org)
  useEffect(() => {
    if (!setActive) return
    setActive({
      // here organizationId is used as the dynamic organizational route contain
      // the word:organizationId
      organization: params.organizationId as string,
    })
  }, [setActive, params.organizationId])
}
