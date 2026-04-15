import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'

const pathSrc = path.resolve(__dirname, './src')

export default defineConfig({
    base: "/",
    plugins: [vue()],
    resolve: {
        alias: {
            "@": pathSrc,
        },
        fallback: {
            crypto: false
        }
    },
    assetsInclude: ['**/*.mp3'],
    server: {
        port: 8085
    }
})
