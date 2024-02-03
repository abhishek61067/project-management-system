'use client'
import React from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { useOrganization, useOrganizationList } from '@clerk/nextjs'
import { Plus } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Accordion } from '@/components/ui/accordion'
import NavItem, { Organization } from './NavItem'
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

  // this gives an array of keys in expanded object
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
        <div className="flex flex-col gap-y-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-10 w-[50%]" />
            <Skeleton className="h-10 w-10" />
          </div>
          <div className="flex flex-col gap-y-2">
            <NavItem.Skeleton />
            <NavItem.Skeleton />
            <NavItem.Skeleton />
          </div>
        </div>
      </>
    )
  }
  return (
    <>
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
      <Accordion
        type="multiple"
        defaultValue={defaultAccordionValue}
        className="space-y-2"
      >
        {userMemberships.data.map(({ organization }) => (
          <NavItem
            key={organization.id}
            isActive={activeOrganization?.id === organization.id}
            isExpanded={expanded[organization.id]}
            organization={organization as Organization}
            onExpand={onExpand}
          />
        ))}
      </Accordion>
    </>
  )
}

export default Sidebar
