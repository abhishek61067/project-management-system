'use client'
import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useOrganizationList } from '@clerk/nextjs'

export const OrgControl = () => {
  /* we would directly catch the params or slug if this was a page but as it is a
    component we are using useParams(); */

  const params = useParams()
  // setActive is a function of clerk that will change the state of the active organization
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
  return null
}
