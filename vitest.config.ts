import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/e2e/**', // Exclude Playwright E2E tests
      '**/.{idea,git,cache,output,temp}/**',
    ],
    alias: {
      '@': path.resolve(__dirname, './')
    }
  },
})
