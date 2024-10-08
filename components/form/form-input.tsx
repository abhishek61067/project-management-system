'use client'

import { forwardRef } from 'react'
import { useFormStatus } from 'react-dom'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { FormErrors } from './form-errors'

interface FormInputProps {
  id: string
  label?: string
  type?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  errors?: Record<string, string[] | undefined>
  className?: string
  defaultValue?: string
  onBlur?: () => void
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      id,
      label,
      type,
      placeholder,
      required,
      disabled,
      errors,
      className,
      defaultValue = '',
      onBlur,
    },
    ref
  ) => {
    const { pending } = useFormStatus()
    return (
      <div className="space-y-2">
        <div className="space-y-1">
          {label ? (
            <Label
              className="text-xs text-neutral-700 font-semibold"
              htmlFor={id}
            >
              {label}
            </Label>
          ) : null}
          <Input
            id={id}
            type={type}
            placeholder={placeholder}
            required={required}
            disabled={disabled || pending}
            onBlur={onBlur}
            name={id}
            defaultValue={defaultValue}
            ref={ref}
            className={cn('text-sm px-2 py-1 h-7', className)}
            aria-describedby={`${id}-error`}
          />
        </div>
        <FormErrors id={id} errors={errors} />
      </div>
    )
  }
)

FormInput.displayName = 'FormInput'
