'use client'

import { Button } from '@/components/ui/button'
import { Plus, X } from 'lucide-react'
import { ElementRef, KeyboardEventHandler, forwardRef, useRef } from 'react'
import FormTextArea from './FormTextArea'
import { FormSubmit } from '@/components/form/form-submit'
import { useParams } from 'next/navigation'
import { useAction } from '@/hooks/use-action'
import { createCard } from '@/actions/create-card'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'
import { toast } from 'sonner'

interface CardFormProp {
  listId: string
  enableEditing: () => void
  disableEditing: () => void
  isEditing: boolean
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProp>(
  ({ isEditing, enableEditing, disableEditing, listId }, ref) => {
    const params = useParams()
    const formRef = useRef<ElementRef<'form'>>(null)
    const { execute, FieldErrors } = useAction(createCard, {
      onSuccess: (data) => {
        toast.success(`card '${data.title}' is created`)
      },
      onError: (e) => {
        toast.success(e)
      },
    })

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        disableEditing()
      }
    }

    useOnClickOutside(formRef, disableEditing)
    useEventListener('keydown', handleKeyDown)

    const handleTextAreaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
      e
    ) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        formRef.current?.requestSubmit()
      }
    }

    const handleSubmit = (formData: FormData) => {
      const title = formData.get('title') as string
      const listId = formData.get('listId') as string
      const boardId = params.boardId as string
      execute({
        title,
        listId,
        boardId,
      })
      console.log({ title, listId, boardId })
    }
    if (isEditing) {
      return (
        <form action={handleSubmit} className="space-y-4 p-2" ref={formRef}>
          <FormTextArea
            id="title"
            onKeyDown={handleTextAreaKeyDown}
            errors={FieldErrors}
            ref={ref}
            placeholder="title..."
            label="enter card"
          />
          <input type="text" name="listId" id="listId" value={listId} hidden />
          <div className="flex items-center">
            <FormSubmit>Add card</FormSubmit>
            <Button variant="ghost" onClick={disableEditing}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </form>
      )
    }
    return (
      <div className="px-2 pt-2">
        <Button variant="ghost" onClick={enableEditing}>
          <Plus className="h-2 w-4" />
          Add a card
        </Button>
      </div>
    )
  }
)

CardForm.displayName = 'CardForm'
