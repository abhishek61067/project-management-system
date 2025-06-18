import { z } from 'zod'

export const UpdateList = z.object({
  title: z
    .string({
      required_error: 'title required',
      invalid_type_error: 'title required',
    })
    .min(3, {
      message: 'Title must be at least 3 characters long',
    }),
  id: z.string(),
  boardId: z.string(),
})
