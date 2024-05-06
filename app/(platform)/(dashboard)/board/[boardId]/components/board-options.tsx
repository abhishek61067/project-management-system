'use client'

import { deleteBoard } from '@/actions/delete-board'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useAction } from '@/hooks/use-action'
import { MoreHorizontal, X } from 'lucide-react'
import { toast } from 'sonner'

interface BoardOptionsProps {
  id: string
}

export const BoardOptions = ({ id }: BoardOptionsProps) => {
  const { execute, isLoading } = useAction(deleteBoard, {
    onError: (error) => {
      toast.error(error)
    },
  })

  const onDelete = () => {
    execute({ id })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant="transparent">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Board Actions
        </div>
        <PopoverClose asChild>
          <Button
            className="absolute top-2 right-2 h-auto w-auto text-neutral-600"
            variant={'ghost'}
          >
            <X className="h-5 w-5" />
          </Button>
        </PopoverClose>
        <Button
          className="w-full"
          variant={'ghost'}
          disabled={isLoading}
          onClick={onDelete}
        >
          Delete this board
        </Button>
      </PopoverContent>
    </Popover>
  )
}
