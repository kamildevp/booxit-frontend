import tailwindcss from '@tailwindcss/vite'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    'shadcn-nuxt',
    '@nuxt/icon',
    '@nuxtjs/i18n',
    '@nuxt/eslint',
    // 'nuxt-zod-i18n',
  ],
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css'],
  runtimeConfig: {
    baseApiUrl: '',
    public: {
      verificationHandler: '',
    },
  },
  compatibilityDate: '2025-07-15',
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  i18n: {
    locales: [
      { code: 'en', name: 'English', language: 'en-GB', file: 'en.json' },
      { code: 'pl', name: 'Polski', language: 'pl-PL', file: 'pl.json' },
    ],
    defaultLocale: 'pl',
  },
  icon: {
    mode: 'css',
    cssLayer: 'base',
  },
  shadcn: {
    /**
     * Prefix for all the imported component.
     * @default "Ui"
     */
    prefix: 'Ui',
    /**
     * Directory that the component lives in.
     * Will respect the Nuxt aliases.
     * @link https://nuxt.com/docs/api/nuxt-config#alias
     * @default "@/components/ui"
     */
    componentDir: '@/components/ui',
  },
})
