'use client'
import { Divide } from 'lucide-react'
import { Button } from '../ui/button'
import { useFormStatus } from 'react-dom'
import { cn } from '@/lib/utils'

interface FormSubmitProps {
  children: React.ReactNode
  disabled?: boolean
  className?: string
  variant?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'ghost'
    | 'link'
    | 'destructive'
    | 'outline'
}

export const FormSubmit = ({
  children,
  disabled,
  className,
  variant,
}: FormSubmitProps) => {
  const { pending } = useFormStatus()
  return (
    <Button
      type={'submit'}
      disabled={disabled || pending}
      variant={variant ?? 'primary'}
      className={cn(className)}
      size={'sm'}
    >
      {children}
    </Button>
  )
}
