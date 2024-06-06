'use server'

import { auth } from '@clerk/nextjs'
import { InputType, ReturnType } from './types'
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { createSafeAction } from '@/lib/create-safe-action'
import { UpdateCardOrder } from './schema'

export const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: 'unauthorized',
    }
  }
  console.log('fine from card order!!!!!!!')
  const { items, boardId } = data
  let updatedCards
  try {
    console.log('fine from card order!!!!!!!')
    const transaction = items.map((card) =>
      db.card.update({
        where: {
          id: card.id,
          list: {
            board: {
              orgId,
            },
          },
        },
        data: {
          order: card.order,
          listId: card.listId,
        },
      })
    )
    updatedCards = await db.$transaction(transaction)
  } catch (e) {
    console.log('not fine from card order!!!!!!!')
    return {
      error: 'failed to reorder',
    }
  }
  revalidatePath(`/board/${boardId}`)
  return { data: updatedCards }
}

export const updateCardOrder = createSafeAction(UpdateCardOrder, handler)
