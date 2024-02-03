import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import { Plus } from 'lucide-react'
import React from 'react'
import { MobileSidebar } from './mobile-sidebar'

export const Navbar = () => {
  return (
    <nav
      className={
        'fixed z-50 top-0 h-14 w-full border-b shadow-sm bg-white flex items-center justify-between'
      }
    >
      <div className="block md:hidden">
        <MobileSidebar />
      </div>
      <div className="flex items-center gap-4">
        <Logo />
        <Button variant="primary" size={'sm'} className="hidden md:block">
          Create
        </Button>
        <Button variant="primary" size={'sm'} className="block md:hidden">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex items-center">
        <OrganizationSwitcher
          afterCreateOrganizationUrl={'/organization/:id'}
          afterSelectOrganizationUrl={'/organization/:id'}
          afterLeaveOrganizationUrl={'/select-org'}
          appearance={{
            elements: {
              rootBox: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              },
            },
          }}
        />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: {
                height: 30,
                width: 30,
              },
            },
          }}
        />
      </div>
    </nav>
  )
}
