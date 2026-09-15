import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import viteImagemin from "vite-plugin-imagemin";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        viteImagemin({
            gifsicle: {
                optimizationLevel: 7,
                interlaced: false,
            },
            optipng: {
                optimizationLevel: 7,
            },
            mozjpeg: {
                quality: 80,
            },
            svgo: {
                plugins: [
                    {
                        name: "removeViewBox",
                        active: false,
                    },

                ],
            },
        }),
    ],
})
