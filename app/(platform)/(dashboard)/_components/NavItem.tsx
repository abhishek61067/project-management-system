// navitem is a single accordion item

'use client'
import { Layout, Activity, Settings, CreditCard } from 'lucide-react'

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

export type Organization = {
  id: string
  slug: string
  imageUrl: string
  name: string
}

interface NavItemProps {
  isActive: Boolean
  isExpanded: Boolean
  organization: Organization
  onExpand: (id: string) => void
}

const NavItem = ({
  isActive,
  isExpanded,
  organization,
  onExpand,
}: NavItemProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const routes = [
    {
      label: 'Boards',
      href: `/organization/${organization.id}`,
      icon: <Layout className="h-4 w-4" />,
    },
    {
      label: 'Activity',
      href: `/organization/${organization.id}/activity`,
      icon: <Activity className="h-4 w-4" />,
    },
    {
      label: 'Settings',
      href: `/organization/${organization.id}/settings`,
      icon: <Settings className="h-4 w-4" />,
    },
    // {
    //   label: 'Billing',
    //   href: `/organization/${organization.id}/billing`,
    //   icon: <CreditCard className="h-4 w-4" />,
    // },
  ]
  const onClick = (href: string) => {
    router.push(href)
  }
  return (
    <AccordionItem value={organization.id} className="border-none">
      <AccordionTrigger
        onClick={() => onExpand(organization.id)}
        className={cn(
          'flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline',
          isActive && !isExpanded && 'bg-sky-500/10 text-sky-700'
        )}
      >
        <div className="flex items-center gap-x-2">
          <div className="w-7 h-7 relative">
            <Image
              fill
              src={organization.imageUrl}
              alt="Organization"
              className="rounded-md object-cover"
            />
          </div>
          <span className="font-medium text-sm">{organization.name}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-1 text-neutral-700">
        {routes.map((route) => {
          return (
            <Button
              key={route.href}
              size={'sm'}
              variant={'ghost'}
              onClick={() => {
                onClick(route.href)
              }}
              className={cn(
                'w-full font-normal justify-start gap-1',
                pathname === route.href && 'bg-sky-500/10 text-sky-700'
              )}
            >
              <span>{route.icon}</span>
              <span> {route.label}</span>
            </Button>
          )
        })}
      </AccordionContent>
    </AccordionItem>
  )
}

// making reusable nav item skeleton component
NavItem.Skeleton = function SkeletonNavItem() {
  return (
    <div className="flex items-center gap-x-2">
      <div className="w-10 h-10 relative shrink-0">
        <Skeleton className="w-full h-full absolute" />
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  )
}

export default NavItem
