import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)']);
const isWebhookRoute = createRouteMatcher(['/api/webhook']); // Add webhook route to the matcher

export default clerkMiddleware(async (auth, request) => {
  // Skip authentication for webhook route
  if (isWebhookRoute(request)) {
    return NextResponse.next(); // Continue without authentication
  }

  if (!isPublicRoute(request)) {
    await auth.protect(); // Protect all other routes
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
