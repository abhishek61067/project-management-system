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
        <PopoverClose asChild>
          <Button
            variant={'ghost'}
            size={'sm'}
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-500"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  )
}
