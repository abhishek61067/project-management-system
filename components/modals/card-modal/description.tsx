'use client'

import { CardWithList } from '@/types'
import { Skeleton } from '@/components/ui/skeleton'
import { AlignLeft } from 'lucide-react'
import { ElementRef, useRef, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'

import { FormSubmit } from '@/components/form/form-submit'
import { Button } from '@/components/ui/button'
import FormTextArea from './../../../app/(platform)/(dashboard)/board/[boardId]/components/FormTextArea'
import { useAction } from '@/hooks/use-action'
import { updateCard } from '@/actions/update-card/index'
import { toast } from 'sonner'

interface DescriptionProp {
  data: CardWithList
}
const Description = ({ data }: DescriptionProp) => {
  const queryClient = useQueryClient()
  const params = useParams()

  const [isEditing, setIsEditing] = useState(false)

  const textareaRef = useRef<ElementRef<'textarea'>>(null)
  const formRef = useRef<ElementRef<'form'>>(null)

  const enableEditing = () => {
    setIsEditing(true)
    setTimeout(() => {
      textareaRef.current?.focus()
    })
  }
  const disableEditing = () => {
    setIsEditing(false)
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      disableEditing()
    }
  }

  useEventListener('keydown', onKeyDown)

  useOnClickOutside(formRef, disableEditing)

  const { execute, FieldErrors } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['card', data.id],
      })
      queryClient.invalidateQueries({
        queryKey: ['card-logs', data.id],
      })
      toast.success(`card ${data.title} updated`)
      disableEditing()
    },
    onError: (e) => {
      toast.error(e)
    },
  })

  const onSubmit = (formData: FormData) => {
    const description = formData.get('description') as string
    console.log('description input: ', description)
    const boardId = params.boardId as string

    execute({
      description,
      boardId,
      id: data.id,
    })
  }

  return (
    <div className="flex items-start gap-x-3 w-full">
      <AlignLeft className="h-5 w-5 mt-0.5 text-neutral-700" />
      <div className="w-full">
        <p className="font-semibold text-neutral-700">Description</p>
        {isEditing ? (
          <form action={onSubmit} ref={formRef} className="space-y-2">
            <FormTextArea
              id="description"
              label="Enter description"
              className="w-full mt-2"
              placeholder="add description"
              defaultValue={data.description || undefined}
              errors={FieldErrors}
              ref={textareaRef}
            />
            <div className="flex items-center gap-x-2">
              <FormSubmit>Save</FormSubmit>
              <Button onClick={disableEditing} variant="ghost">
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div
            onClick={enableEditing}
            role="button"
            className="min-h-[78px] bg-neutral-200 text-sm font-medium py-3 px-3.5 rounded-md"
          >
            {data.description || 'add more detailed description..'}
          </div>
        )}
      </div>
    </div>
  )
}

Description.Skeleton = function DescriptionSkeleton() {
  return (
    <div className="flex items-start w-full gap-x-3">
      <Skeleton className="h-6 w-6 bg-neutral-200" />
      <div>
        <Skeleton className="h-24 w-6 bg-neutral-200 mb-2" />
        <Skeleton className="h-[78px] w-full bg-neutral-200" />
      </div>
    </div>
  )
}

export default Description
