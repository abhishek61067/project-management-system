import { db } from '@/lib/db'
import { Board } from './board'
import { Form } from './form'
import { Info } from './components/info'
import { useOrganization } from '@clerk/nextjs'
import { Separator } from '@/components/ui/separator'
import { BoardList } from './components/board-list'
import { Suspense } from 'react'

const OrganizationPage = async () => {
  return (
    <div className="w-full mb-20">
      <Info />
      <Separator className="my-4" />
      <div className="px-2 md:px-4">
        <Suspense fallback={<BoardList.Skeleton />}>
          <BoardList />
        </Suspense>
      </div>
    </div>
  )
}
export default OrganizationPage
