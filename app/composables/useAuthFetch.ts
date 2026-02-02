export const useAuthFetch: typeof useFetch = (url, options) => {
  return useFetch(url, {
    ...options,
    $fetch: useNuxtApp().$authFetch as typeof $fetch,
  })
}
