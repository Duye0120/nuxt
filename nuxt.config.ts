// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'arco-design-nuxt-module',
  ],
  ssr: true,
  devtools: {
    enabled: true,
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'My Nuxt App',
    },
  },
  css: ['~/assets/css/main.css'],
  alias: { dayjs: 'dayjs/esm/' },
  extensions: ['.vue'],
  experimental: {
    inlineRouteRules: true,
    payloadExtraction: false,
  },
  compatibilityDate: '2024-11-01',
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
})
