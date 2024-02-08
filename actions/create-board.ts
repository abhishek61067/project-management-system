'use server'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export type State = {
  errors?: {
    title?: string[]
  }
  message?: string | null
}

const CreateBoard = z.object({
  title: z.string().min(3, {
    message: 'A minimum of 3 character is required',
  }),
})

export async function create(prevState: State, formData: FormData) {
  console.log('create func is triggered')

  const validatedFields = CreateBoard.safeParse({
    title: formData.get('title'),
  })
  if (!validatedFields.success) {
    console.log('validation unsuccessful')
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields.',
    }
  }

  const { title } = validatedFields.data

  try {
    await db.board.create({
      data: {
        title,
      },
    })
  } catch (error) {
    return {
      message: 'Database Error',
    }
  }
  revalidatePath('/organization/org_2b8dBYrLCQQNpZyyU3kAT1ZeDBj')
  redirect('/organization/org_2b8dBYrLCQQNpZyyU3kAT1ZeDBj')
}
