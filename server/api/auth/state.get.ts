import { getAuthStatus } from '~~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const status = getAuthStatus(event)
  const userData = status === 'authenticated' ? await event.$fetch('/api/users/me') : undefined

  return {
    status,
    userData,
  }
})
