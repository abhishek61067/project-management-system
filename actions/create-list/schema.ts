import { z } from 'zod'

export const CreateList = z.object({
  title: z
    .string({
      required_error: 'title required',
      invalid_type_error: 'title required',
    })
    .min(3, {
      message: 'Title must be at least 3 characters long',
    }),
  boardId: z.string(),
})
