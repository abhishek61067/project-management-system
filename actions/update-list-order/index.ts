'use server'

import { auth } from '@clerk/nextjs'
import { InputType, ReturnType } from './types'
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { createSafeAction } from '@/lib/create-safe-action'
import { UpdateListOrder } from './schema'

export const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: 'unauthorized',
    }
  }
  const { items, boardId } = data
  let lists
  try {
    console.log('fine from card order!!!!!!!')
    const transaction = items.map((list) =>
      db.list.update({
        where: {
          id: list.id,
          board: {
            orgId,
          },
        },
        data: {
          order: list.order,
        },
      })
    )
    lists = await db.$transaction(transaction)
  } catch (e) {
    console.log('not fine from card order!!!!!!!');
    return {
      error: 'failed to reorder',
    }
  }
  revalidatePath(`/board/${boardId}`)
  return { data: lists }
}

export const updateListOrder = createSafeAction(UpdateListOrder, handler)
