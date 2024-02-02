'use client'
import React from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { useOrganization, useOrganizationList } from '@clerk/nextjs'
import { Plus } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface SidebarProps {
  storageKey?: string
}

const Sidebar = ({ storageKey }: SidebarProps) => {
  storageKey = 't-sidebar-state'
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {}
  )
  const { organization: activeOrganization, isLoaded: isLoadedOrg } =
    useOrganization()
  const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  })

  const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key)
      }
      return acc
    },
    []
  )

  const onExpand = (id: string) => {
    setExpanded((curr) => ({
      ...curr,
      [id]: !expanded[id],
    }))
  }

  if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
    return (
      <>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
        </div>
      </>
    )
  }
  return (
    <div className="font-medium text-xs flex items-center mb-1">
      <span className="pl-4">Workspaces</span>
      <Button
        asChild
        variant={'ghost'}
        type="button"
        className="ml-auto"
        size={'icon'}
      >
        {/* link to redirect to the select-org */}
        <Link href="/select-org">
          <Plus className="w-4 h-4" />
        </Link>
      </Button>
    </div>
  )
}

export default Sidebar
