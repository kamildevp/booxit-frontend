import { accessTokenCookieName } from '../constants'
import { getAuthStatus } from '../utils/auth'

export default defineEventHandler(async (event) => {
  const authStatus = getAuthStatus(event)
  if (authStatus === 'expired' && event.path != '/api/auth/refresh') {
    const response = await event.$fetch('/api/auth/refresh', {
      method: 'POST',
    })

    event.node.req.headers['cookie'] = event.node.req.headers['cookie'] + `;${accessTokenCookieName}=${response.access_token}`
    setAuthCookies(event, response.access_token, response.refresh_token)
  }
})
