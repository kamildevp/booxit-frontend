import { usePreferredDark } from '@vueuse/core'

type ThemeCookieValue = 'dark' | 'light' | 'auto'
export type Theme = Exclude<ThemeCookieValue, 'auto'>

export default function () {
  const isPreferredDark = usePreferredDark()
  const themeCookie = useCookie<ThemeCookieValue>('theme', {
    default: () => 'auto',
    expires: new Date(new Date().setFullYear(new Date().getFullYear() + 10)),
  })

  const isDark = computed(() => themeCookie.value === 'dark')
  const isUnknown = computed(() => themeCookie.value === 'auto')

  function setTheme(value: Theme) {
    themeCookie.value = value
  }

  function setupPreferredTheme() {
    themeCookie.value = isPreferredDark.value ? 'dark' : 'light'
  }

  useHead({
    htmlAttrs: {
      class: { dark: isDark },
    },
  })

  return {
    isDark,
    isUnknown,
    setTheme,
    setupPreferredTheme,
  }
}
