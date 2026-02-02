export const useAPI: typeof useFetch = (url, options) => {
  useRequestFetch()
  return useFetch(url, {
    ...options,
    $fetch: useNuxtApp().$api as typeof $fetch,
  })
}
