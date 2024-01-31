'use client'
import React from 'react'
import { OrgControl } from './components/OrgControl'

const OrganizationIdLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <OrgControl />
      {children}
    </div>
  )
}

export default OrganizationIdLayout
