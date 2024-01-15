'use client'
import { useAuth } from '@clerk/nextjs'
import React from 'react'

const OrganizationPage = () => {
  const { userId, orgId } = useAuth()
  return <div>OrganizationPage:{orgId}</div>
}

export default OrganizationPage
