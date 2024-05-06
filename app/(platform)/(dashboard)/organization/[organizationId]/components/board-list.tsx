import { FormPopover } from '@/components/form/form-popover'
import { Hint } from '@/components/hint'
import { Skeleton } from '@/components/ui/skeleton'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { HelpCircle, User2 } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export const BoardList = async () => {
  const { orgId } = auth()

  if (!orgId) {
    redirect('/select-org')
  }

  const boards = await db.board.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg gap-2 text-neutral-700">
        <User2 className="h-6 w-6" />
        Your boards
      </div>
      {/* list of boards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {boards.map((board) => {
          return (
            <Link
              key={board.id}
              href={`/board/${board.id}`}
              style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
              className="group relative bg-sky-700 aspect-video bg-no-repeat bg-center bg-cover rounded-sm h-full w-full p-2 overflow-hidden"
            >
              <div className="absolute bg-black/30 group-hover:bg-black/40 transition inset-0" />
              <p className="text-white font-semibold relative">{board.title}</p>
            </Link>
          )
        })}
        <FormPopover side="right">
          <div
            role="button"
            className="flex flex-col justify-center items-center aspect-video relative h-full w-full bg-muted rounded-sm gap-y-1 hover:opacity-75 transition p-2"
          >
            <p className="text-sm">Create new board</p>
            <span className="text-xs">5 remaining</span>
            <Hint
              description={`Free workspace can have a max of 5 free board. Upgrade to get unlimited boards`}
            >
              <HelpCircle className="h-4 w-4" />
            </Hint>
          </div>
        </FormPopover>
      </div>
    </div>
  )
}

BoardList.Skeleton = function SkeletonBoardList() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
    </div>
  )
}
