import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { Board } from '@prisma/client'
import { BoardTitleForm } from './board-title-form'
import { BoardOptions } from './board-options'

interface BoardNavbarProps {
  data: Board
}

export const BoardNavbar = async ({ data }: BoardNavbarProps) => {
  console.log('board data: ', data)
  return (
    <div className="top-14 w-full h-10 z-[40] bg-black/50 fixed flex items-center px-6 gap-x-4 text-white">
      <BoardTitleForm data={data} />
      <div className="ml-auto">
        <BoardOptions id={data.id} />
      </div>
    </div>
  )
}
