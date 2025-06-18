import { Description } from '@radix-ui/react-dialog'
import { z } from 'zod'

export const UpdateCard = z.object({
  boardId: z.string(),
  description: z.optional(
    z
      .string({
        required_error: 'description required',
        invalid_type_error: 'description required',
      })
      .min(3, {
        message: 'description should be atleast 3 character long',
      })
  ),
  title: z.optional(
    z
      .string({
        required_error: 'title required',
        invalid_type_error: 'title required',
      })
      .min(3, {
        message: 'Title must be at least 3 characters long',
      })
  ),

  id: z.string(),
})
