import { useState, useCallback } from 'react'

import { ActionState, FieldErros } from '@/lib/create-safe-action'

type Action<TInput, TOutput> = (
  data: TInput
) => Promise<ActionState<TInput, TOutput>>

interface UseActionOptions<TOutput> {
  onSuccess?: (data: TOutput) => void
  onError?: (error: string) => void
  onComplete?: () => void
}

export const useAction = <TInput, TOutput>(
  action: Action<TInput, TOutput>,
  options: UseActionOptions<TOutput> = {}
) => {
  const [FieldErrors, setFieldErrors] = useState<
    FieldErros<TInput> | undefined
  >(undefined)
  const [error, setError] = useState<string | undefined>(undefined)
  const [data, setData] = useState<TOutput | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const execute = useCallback(
    async (input: TInput) => {
      setIsLoading(true)
      try {
        const result = await action(input)
        if (!result) {
          return
        }
        // we are trying to update the field errors that gets shown if the input is not validated so that if there is error,it shows error and if not error will be null and wont show up in the screen
        setFieldErrors(result.fieldErrors)

        if (result.error) {
          setError(result.error)
          options.onError?.(result.error)
        }
        if (result.data) {
          setData(result.data)
          options.onSuccess?.(result.data)
        }
      } finally {
        setIsLoading(false)
        options.onComplete?.()
      }
    },
    [action, options]
  )

  return {
    execute,
    data,
    error,
    FieldErrors,
    isLoading,
  }
}
