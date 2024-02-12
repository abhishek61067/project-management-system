'use server'

import { auth } from '@clerk/nextjs'
import { InputType, ReturnType } from './types'
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { createSafeAction } from '@/lib/create-safe-action'
import { CreateBoard } from './schema'

export const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = auth()

  if (!userId) {
    return {
      error: 'Unauthorized',
    }
  }
  const { title } = data
  let board
  try {
    board = await db.board.create({
      data: {
        title,
      },
    })
  } catch (e) {
    return {
      error: 'Database error in creating board',
    }
  }
  revalidatePath(`/board/${board.id}`) // Re-generate page at /boards/:id when this mutation is performed
  return { data: board }
}

export const createBoard = createSafeAction(CreateBoard, handler)
