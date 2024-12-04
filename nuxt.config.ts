// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@ant-design-vue/nuxt",
  ],
  plugins: [{ src: "~/plugins/antd.ts", mode: "client" }],
  ssr: true,
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "My Nuxt App",
    },
  },
  css: ["ant-design-vue/dist/reset.css", "~/assets/css/main.css"],
  alias: { dayjs: "dayjs/esm/" },
  extensions: [".vue"],
  build: {
    transpile: ["ant-design-vue", "@ant-design/icons-vue"],
  },
  experimental: {
    inlineRouteRules: true,
    payloadExtraction: false,
  },
  compatibilityDate: "2024-11-01",
  vite: {
    optimizeDeps: {
      exclude: ["unocss"],
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  antd: {
    extractStyle: true,
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
});
