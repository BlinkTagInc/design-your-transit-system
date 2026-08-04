import { createNextAuthMiddleware } from 'nextjs-basic-auth-middleware'

export const proxy = createNextAuthMiddleware()

export const config = {
  matcher: ['/api/export'],
}
