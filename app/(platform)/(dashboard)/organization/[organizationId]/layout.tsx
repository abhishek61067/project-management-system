import { startCase } from 'lodash'
import React from 'react'
import { OrgControl } from './components/OrgControl'
import { auth } from '@clerk/nextjs'

export async function generateMetadata() {
  const { orgSlug } = auth()
  console.log('orgSlug: ', orgSlug)

  return {
    title: startCase(orgSlug || 'organization'),
    description: 'unique description',
  }
}

const OrganizationIdLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <OrgControl />
      {children}
    </div>
  )
}

export default OrganizationIdLayout
