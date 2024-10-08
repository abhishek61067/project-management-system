'use client'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from '@/components/ui/popover'

import { useAction } from '@/hooks/use-action'
import { createBoard } from '@/actions/create-board'

import { FormInput } from './form-input'
import { FormSubmit } from './form-submit'
import { Button } from '../ui/button'
import { X } from 'lucide-react'
import { toast } from 'sonner'
import { FormPicker } from './form-picker'
import { ElementRef, useRef } from 'react'
import { useRouter } from 'next/navigation'

interface FormPopoverProps {
  children: React.ReactNode
  side?: 'bottom' | 'left' | 'right' | 'top'
  sideOffset?: number
  align?: 'start' | 'center' | 'end'
}

export const FormPopover = ({
  children,
  side = 'bottom',
  sideOffset = 0,
  align,
}: FormPopoverProps) => {
  const router = useRouter()
  const closeRef = useRef<ElementRef<'button'>>(null)
  const { execute, FieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log({ data })
      toast.success('Board created')
      closeRef?.current?.click()
      router.push(`/board/${data.id}`)
    },
    onError: (error) => {
      console.log({ error })
      toast.error(error)
    },
  })

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string
    const image = formData.get('image') as string
    console.log({ image })
    execute({ title, image })
  }
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        className="w-80"
        side={side}
        sideOffset={sideOffset}
      >
        <div className="text-sm font-medium text-center text-neutral-500">
          Create board
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            variant={'ghost'}
            size={'sm'}
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-500"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        {/* form */}
        <form action={onSubmit} className="space-y-4">
          <div className="space-y-4">
            <FormPicker id="image" errors={FieldErrors} />
            <FormInput
              id="title"
              label="Board title"
              type="text"
              errors={FieldErrors}
            />
          </div>
          <FormSubmit className="w-full">Create</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  )
}
