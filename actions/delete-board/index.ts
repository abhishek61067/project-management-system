'use server'

import { auth } from '@clerk/nextjs'
import { InputType, ReturnType } from './types'
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { createSafeAction } from '@/lib/create-safe-action'
import { DeleteBoard } from './schema'
import { redirect } from 'next/navigation'

export const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: 'unauthorized',
    }
  }
  const { id } = data
  let board
  try {
    board = await db.board.delete({
      where: {
        id,
        orgId,
      },
    })
  } catch (e) {
    return {
      error: 'failed to delete',
    }
  }
  revalidatePath(`/organization/${orgId}`)
  redirect(`/organization/${orgId}`)
}

export const deleteBoard = createSafeAction(DeleteBoard, handler)
