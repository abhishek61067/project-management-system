'use client'

import { FormInput } from '@/components/form/form-input'
import { Button } from '@/components/ui/button'
import { Board } from '@prisma/client'
import { ElementRef, useRef, useState } from 'react'
import { updateBoard } from '@/actions/update-board'
import { useAction } from '@/hooks/use-action'
import { toast } from 'sonner'

interface BoardTitleFormProps {
  data: Board
}
export const BoardTitleForm = ({ data }: BoardTitleFormProps) => {
  const { execute } = useAction(updateBoard, {
    onSuccess: (data) => {
      toast.success(`board ${data.title} updated`)
      setTitle(data.title)
      disableEditing()
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(data.title)
  const formRef = useRef<ElementRef<'form'>>(null)
  const inputRef = useRef<ElementRef<'input'>>(null)

  const enableEditing = () => {
    setIsEditing(true)
    // Focus on the input when editing starts.
    setTimeout(() => {
      inputRef?.current?.focus()
      inputRef?.current?.select()
    }, 100)
  }
  const disableEditing = () => {
    setIsEditing(false)
  }

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string

    execute({
      title,
      id: data.id,
    })
  }

  const onBlur = () => {
    formRef?.current?.requestSubmit()
  }

  if (isEditing) {
    return (
      <form
        ref={formRef}
        action={onSubmit}
        className="flex items-center gap-x-2"
      >
        <FormInput
          ref={inputRef}
          id="title"
          onBlur={onBlur}
          defaultValue={title}
          className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
        />
      </form>
    )
  }
  return <Button onClick={enableEditing}>{title || 'board title'}</Button>
}
