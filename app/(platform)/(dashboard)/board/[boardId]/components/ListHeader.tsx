'use client'

import { updateList } from '@/actions/update-list'
import { FormInput } from '@/components/form/form-input'
import { useAction } from '@/hooks/use-action'
import { List } from '@prisma/client'
import { useState, useRef, ElementRef } from 'react'
import { toast } from 'sonner'
import { useEventListener } from 'usehooks-ts'
import { ListOptions } from './ListOptions'

interface ListHeaderProp {
  data: List
  onAddCard: () => void
}
export const ListHeader = ({ data, onAddCard }: ListHeaderProp) => {
  //  optimistic mutation
  const [title, setTitle] = useState(data.title)
  const [isEditing, setIsEditing] = useState(false)

  const formRef = useRef<ElementRef<'form'>>(null)
  const inputRef = useRef<ElementRef<'input'>>(null)

  const enableEditing = () => {
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.select()
    })
  }

  const disableEditing = () => {
    setIsEditing(false)
  }

  const { execute } = useAction(updateList, {
    onSuccess: () => {
      toast.success(`Renamed to "${data.title}"`)
      setTitle(data.title)
      setIsEditing(false)
    },
    onError: (e) => {
      toast.error(e)
    },
  })

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string
    const id = formData.get('id') as string
    const boardId = formData.get('boardId') as string
    if (title === data.title) {
      return disableEditing()
    }
    execute({
      title,
      id,
      boardId,
    })
  }
  const onBlur = () => {
    formRef.current?.requestSubmit()
  }
  const keydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      formRef.current?.requestSubmit()
    }
  }

  useEventListener('keydown', keydown)

  return (
    <div className="pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2">
      {isEditing ? (
        <form action={onSubmit} ref={formRef}>
          <input type="text" name="id" id="id" value={data.id} hidden />
          <input
            type="text"
            name="boardId"
            id="boardId"
            value={data.boardId}
            hidden
          />
          <FormInput
            ref={inputRef}
            onBlur={onBlur}
            id="title"
            placeholder="enter list title.."
          />
        </form>
      ) : (
        <div
          onClick={enableEditing}
          className="w-full tex-sm px-2.5 py-1 h-7 font-medium border-transparent"
        >
          {title}{' '}
        </div>
      )}
      <ListOptions onAddCard={onAddCard} data={data} />
    </div>
  )
}
