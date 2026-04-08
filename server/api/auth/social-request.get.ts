import socialAuthRequest from '~~/schemas/auth/socialAuthRequest'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  try {
    const parsedRequestParameters = socialAuthRequest.parse(query)
    const socialAuthParameters = await generateSocialAuthUrlParameters(
      event,
      parsedRequestParameters.provider,
      { redirect_url: parsedRequestParameters.redirect_url },
    )

    return socialAuthParameters
  }
  catch {
    throw createError({
      statusMessage: 'Bad Request',
      status: 400,
    })
  }
})
