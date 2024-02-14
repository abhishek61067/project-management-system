import { createApi } from 'unsplash-js'

export const unsplash = createApi({
  // non-null assertions are used when we know that these values will always be defined.
  // Its telling the compiler that you are sure that the value won't be null or undefined.
  //  It's a way to assert to the TypeScript compiler that you've manually checked that
  //  a value isn't null or undefined and you're telling it to proceed without emitting a null check.
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY!,
  fetch: fetch,
})
