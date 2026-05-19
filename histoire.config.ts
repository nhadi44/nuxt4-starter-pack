import { defineConfig } from 'histoire'
import { HstVue } from '@histoire/plugin-vue'
import { HstNuxt } from '@histoire/plugin-nuxt'

export default defineConfig({
  plugins: [HstVue(), HstNuxt()],
  setupFile: './app/assets/css/tailwind.css',
  backgroundPresets: [
    {
      id: 'light',
      label: 'Light Mode',
      color: '#ffffff',
      default: true,
    },
    {
      id: 'dark',
      label: 'Dark Mode',
      color: '#090a0f', // deep dark custom slate background
    },
  ],
})
