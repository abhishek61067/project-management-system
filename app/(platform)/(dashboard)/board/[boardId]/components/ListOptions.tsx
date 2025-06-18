'use client'

import { List } from '@prisma/client'

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, X } from 'lucide-react'
import { FormSubmit } from '@/components/form/form-submit'
import { Separator } from '@/components/ui/separator'
import { useAction } from '@/hooks/use-action'
import { deleteList } from '@/actions/delete-list'
import { toast } from 'sonner'
import { ElementRef, useRef } from 'react'
import { copyList } from '@/actions/copy-list'

interface ListOptionsProp {
  data: List
  onAddCard: () => void
}

export const ListOptions = ({ data, onAddCard }: ListOptionsProp) => {
  const closeRef = useRef<ElementRef<'button'>>(null)
  const { execute: executeDelete } = useAction(deleteList, {
    onSuccess: () => {
      toast.success(`List '${data.title}' deleted`)
      closeRef.current?.click()
    },
    onError: () => {
      toast.error(`Error deleting list '${data.title}' list`)
    },
  })
  const { execute: executeCopy } = useAction(copyList, {
    onSuccess: () => {
      toast.success(`List '${data.title}' copied`)
      closeRef.current?.click()
    },
    onError: () => {
      toast.error(`Error copying list '${data.title}' list`)
    },
  })

  const onDelete = (formData: FormData) => {
    const id = formData.get('id') as string
    const boardId = formData.get('boardId') as string
    executeDelete({ id, boardId })
  }

  const onCopy = (formData: FormData) => {
    const id = formData.get('id') as string
    const boardId = formData.get('boardId') as string
    executeCopy({ id, boardId })
  }

  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <Button variant="ghost">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-40">
          <div>List actions</div>
          <PopoverClose ref={closeRef}>
            <Button variant="ghost" className="absolute top-2 right-2">
              <X className="h-4 w-4" />
            </Button>
          </PopoverClose>
          <Button variant={'ghost'} onClick={onAddCard}>
            Add card
          </Button>
          <form action={onCopy}>
            <input type="text" hidden name="id" id="id" value={data.id} />
            <input
              type="text"
              hidden
              name="boardId"
              id="boardId"
              value={data.boardId}
            />
            <FormSubmit variant={'ghost'}>Copy list</FormSubmit>
          </form>
          <Separator />
          <form action={onDelete}>
            <input type="text" hidden name="id" id="id" value={data.id} />
            <input
              type="text"
              hidden
              name="boardId"
              id="boardId"
              value={data.boardId}
            />
            <FormSubmit variant={'ghost'}>Delete this list</FormSubmit>
          </form>
        </PopoverContent>
      </Popover>
    </div>
  )
}
