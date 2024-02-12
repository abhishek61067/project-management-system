'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { useOrganization } from '@clerk/nextjs'
import { CreditCard } from 'lucide-react'
import Image from 'next/image'

export const Info = () => {
  const { organization, isLoaded } = useOrganization()
  if (!isLoaded) {
    return <Info.skeleton />
  }
  return (
    <div className="flex items-center gap-x-4">
      <div className="w-[60px] h-[60px] relative">
        <Image
          fill
          src={organization?.imageUrl as string}
          alt="organization"
          className="rounded-md object-cover"
        />
      </div>
      <div className="space-y-1">
        <p className="font-semibold text-xl">{organization?.name}</p>
        <div className="flex items-center gap-1 text-xs text-neutral-500">
          <CreditCard className="h-3 w-3" />
          Free
        </div>
      </div>
    </div>
  )
}

Info.skeleton = function InfoSkeleton() {
  return (
    <div className="flex items-center gap-x-4">
      <div className="w-[60px] h-[60px] relative">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="space-y-1">
        <div className="font-semibold text-xl">
          <Skeleton className="h-4 w-[100px]" />
        </div>
        <div className="flex items-center gap-1 text-xs text-neutral-500">
          <Skeleton className="h-2 w-[10px]" />
          <Skeleton className="h-2 w-[100px]" />
        </div>
      </div>
    </div>
  )
}
