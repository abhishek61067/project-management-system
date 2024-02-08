'use client'

import { Input } from '@/components/ui/input'
import { useFormStatus } from 'react-dom'

interface FormInputProps {
  errors?: {
    title?: string[]
  }
}

export const FormInput = ({ errors }: FormInputProps) => {
  const { pending } = useFormStatus()
  return (
    <div>
      <Input
        type="text"
        placeholder="Enter title"
        name="title"
        id="title"
        required
        disabled={pending}
      />
      {errors?.title ? (
        <div>
          {errors.title.map((e: string) => {
            return (
              <p className="text-rose-500" key={e}>
                {e}
              </p>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
