import path from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        alias: {
            '@src/': path.resolve(import.meta.dirname, 'src') + '/'
        }
    }
})