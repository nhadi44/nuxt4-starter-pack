// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // Enable Nuxt 4 future structure
  future: {
    compatibilityVersion: 4,
  },

  // Enable strict TypeScript mode
  typescript: {
    strict: true,
    shim: false,
  },

  // Core modules
  modules: ['@pinia/nuxt', '@vueuse/nuxt', '@nuxtjs/tailwindcss', '@nuxt/eslint'],

  // CSS variables support and tailwind configuration
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.js',
    exposeConfig: false,
    viewer: false,
  },
})
