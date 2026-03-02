import socialAuthRequest from '~~/server/schemas/auth/socialAuthRequest'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  try {
    const parsedRequest = socialAuthRequest.parse(body)
    const socialAuthParameters = await generateSocialAuthUrlParameters(event, parsedRequest.provider, parsedRequest.state)

    return socialAuthParameters
  }
  catch {
    throw createError({
      statusMessage: 'Bad Request',
      status: 400,
    })
  }
})
