'use client'
import React from 'react'
import ListWrapper from './ListWrapper'
import { Button } from '@/components/ui/button'
import { Plus, X } from 'lucide-react'
import { useState, useRef, ElementRef } from 'react'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'
import { FormInput } from '@/components/form/form-input'
import { useParams } from 'next/navigation'
import { FormSubmit } from '@/components/form/form-submit'
import { useAction } from '@/hooks/use-action'
import { createList } from '@/actions/create-list'
import { FieldErros } from '@/lib/create-safe-action'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const ListForm = () => {
  const params = useParams()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const formRef = useRef<ElementRef<'form'>>(null)
  const inputRef = useRef<ElementRef<'input'>>(null)

  //   handlers
  const enableEditing = () => {
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
    })
  }
  const disableEditing = () => {
    setIsEditing(false)
  }

  const { execute, FieldErrors } = useAction(createList, {
    onSuccess: (data) => {
      toast.success(`List ${data.title} is created`)
      disableEditing()
      router.refresh()
    },
    onError: (e) => {
      toast.error(e)
    },
  })

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string
    const boardId = formData.get('boardId') as string
    execute({ title, boardId })
  }

  const keyDown = (e: KeyboardEvent) => {
    if (e.key.toLowerCase() === 'escape') {
      disableEditing()
    }
  }
  useEventListener('keydown', keyDown)
  useOnClickOutside(formRef, disableEditing)

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          action={onSubmit}
          className="w-full shadow-md rounded-md space-y-4 p-4"
          ref={formRef}
        >
          <FormInput id="title" className="p-2" ref={inputRef} />
          <input type="text" hidden value={params.boardId} name="boardId" />
          <div className="flex items-center gap-x-1">
            <FormSubmit>Add list</FormSubmit>
            <Button>
              <X className="w-4 h-4" onClick={disableEditing} />
            </Button>
          </div>
        </form>
      </ListWrapper>
    )
  }

  return (
    <ListWrapper>
      <div>
        <Button className="flex gap-2" onClick={enableEditing}>
          <Plus className="h-4 w-4" />
          <p>Add a listss</p>
        </Button>
      </div>
    </ListWrapper>
  )
}

export default ListForm
