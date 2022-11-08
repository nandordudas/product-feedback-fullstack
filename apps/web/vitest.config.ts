import { fileURLToPath } from 'node:url'

import { defineConfig } from 'vite'

const workdir = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  resolve: {
    alias: {
      '~': workdir,
    },
  },
  test: {
    reporters: 'verbose',
    setupFiles: './tests/setup.ts',
  },
})
