import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation'
import path from 'path'

export default defineConfig(async ({mode}) => {
    // Load env file based on `mode` in the current working directory.
    // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
    const env = loadEnv(mode, process.cwd(), '')

    // Dynamic import vueDevTools only in dev mode to avoid Windows localStorage issues
    const plugins: any[] = [vue()]

    if (mode === 'dev') {
        try {
            const { default: vueDevTools } = await import('vite-plugin-vue-devtools')
            const devToolsPlugin = vueDevTools()
            // Handle potential array or single plugin return
            if (Array.isArray(devToolsPlugin)) {
                plugins.push(...devToolsPlugin)
            } else if (devToolsPlugin) {
                plugins.push(devToolsPlugin)
            }
        } catch (error) {
            console.warn('Vue DevTools plugin could not be loaded:', (error as Error).message)
        }
    }

    return {
        define: {
            'process.env.NODE_ENV': JSON.stringify(mode),
            // Make env variables available in the app
            'process.env': env
        },
        plugins,
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@use "@shared/scss/helper/variable" as *;
                        @use "@shared/scss/helper/mixin" as *;
                        @use "@shared/scss/helper/function" as *;`
                }
            }
        },
        build: {
            target: 'esnext',
            minify: false,
            cssCodeSplit: false
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
                '@assets': path.resolve(__dirname, './src/assets'),
                '@shared': path.resolve(__dirname, './src/libs')
            },
            preserveSymlinks: true,
        },
        server: {
            port: 3002,
            cors: true
        }
    };
})