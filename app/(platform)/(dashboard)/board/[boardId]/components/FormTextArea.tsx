import { FormErrors } from '@/components/form/form-errors'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { KeyboardEventHandler, forwardRef, useId } from 'react'
import { useFormStatus } from 'react-dom'

interface FormTextAreaProp {
  id: string
  label?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  errors?: Record<string, string[] | undefined>
  className?: string
  onBlur?: () => void
  onClick?: () => void
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement> | undefined
  defaultValue?: string
}

const FormTextArea = forwardRef<HTMLTextAreaElement, FormTextAreaProp>(
  (
    {
      id,
      label,
      placeholder,
      defaultValue,
      required,
      disabled,
      errors,
      className,
      onBlur,
      onClick,
      onKeyDown,
    },
    ref
  ) => {
    const { pending } = useFormStatus()
    const uniqueId = useId()

    return (
      <div className="space-y-2 w-full">
        <div className="space-y-2 w-full">
          {label ? (
            <div>
              <Label className="text-neutral-700" id={uniqueId}>
                {label}
              </Label>
              <Textarea
                className={cn(className)}
                onKeyDown={onKeyDown}
                onBlur={onBlur}
                onClick={onClick}
                ref={ref}
                disabled={pending || disabled}
                required={required}
                placeholder={placeholder}
                name={id}
                id={id}
                defaultValue={defaultValue}
                aria-describedby={uniqueId}
              ></Textarea>
              <FormErrors id={id} errors={errors} />
            </div>
          ) : null}
        </div>
      </div>
    )
  }
)

FormTextArea.displayName = 'FormTextArea'

export default FormTextArea
