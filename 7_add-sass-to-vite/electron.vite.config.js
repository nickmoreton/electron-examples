import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import { resolve } from 'path'

export default defineConfig({
  main: {
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'electron/main/index.js'),
        }
      },
    },
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'electron/preload/index.js'),
        }
      }
    },
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    root: '.',
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'index.html'),
        }
      }
    }
  }
})
