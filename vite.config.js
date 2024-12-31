import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {

  const env = loadEnv(mode, 'enviornment')

  return {base: '/',
  plugins: [react()],
  assetsInclude: ['**/*.md', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.svg', '**/*.ascii'],
}
})
