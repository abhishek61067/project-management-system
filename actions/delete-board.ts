'use server'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export const deleteBoard = async (id: string) => {
  await db.board.delete({
    where: {
      id,
    },
  })
  revalidatePath('/organization/org_2b8dBYrLCQQNpZyyU3kAT1ZeDBj')
  redirect('/organization/org_2b8dBYrLCQQNpZyyU3kAT1ZeDBj')
}
