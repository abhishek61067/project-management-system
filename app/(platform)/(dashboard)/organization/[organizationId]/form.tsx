'use client'
import { createBoard } from '@/actions/create-board'
import { useAction } from '@/hooks/use-action'
import { FormInput } from '@/components/form/form-input'
import { FormSubmit } from '@/components/form/form-submit'

export const Form = () => {
  const { execute, FieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log(data, 'success!')
    },
    onError: (error) => {
      console.error(error, 'error')
    },
  })
  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string
    execute({ title })
  }
  return (
    <form action={onSubmit}>
      <div className="flex flex-col space-y-2">
        <FormInput id={'title'} errors={FieldErrors} label="Board Title" />
        <FormSubmit>Save</FormSubmit>{' '}
      </div>
    </form>
  )
}
