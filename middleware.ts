import { authMiddleware, redirectToSignIn } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: ['/'],
  afterAuth(auth, req) {
    // if user is authenticated and in landing page:
    if (auth.userId && auth.isPublicRoute) {
      let path = '/select-org'
      // if user is authenticated and have created organization:
      if (auth.orgId) {
        path = `/organization/${auth.orgId}`
      }
      // req.url returns a base url
      // path will get appended following req.url if it is relative and if it is absolute, req.url will be ignored.
      const orgSelection = new URL(path, req.url)
      return NextResponse.redirect(orgSelection)
    }
    if (!auth.userId && !auth.isPublicRoute) {
      // redirectToSignIn, a clerk library will handle the user to sign in page
      return redirectToSignIn({
        // returnBackUrl will handle the user to the url that user was requesting before signing in.
        //for eg: i was going to abc.com/a but that was not public route. Now clerk will redirect me fisrt to sign in page and after i sign in successfully, that will redirect me again to abc.com/a
        returnBackUrl: req.url,
      })
    }
    // if user is authenticated and the user is in the route other than select-org
    if (auth.userId && !auth.orgId && req.nextUrl.pathname !== '/select-org') {
      const path = '/select-org'
      const orgSelection = new URL(path, req.url)
      return NextResponse.redirect(orgSelection)
    }
  },
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
