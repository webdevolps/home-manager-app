import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@ui': path.resolve(__dirname, './src/ui'),
      '@components': path.resolve(__dirname, './src/ui/components'),
      '@pages': path.resolve(__dirname, './src/ui/pages'),
      '@shared': path.resolve(__dirname, './src/ui/shared'),
      '@infrastructure': path.resolve(__dirname, './src/infrastructure'),
      '@interfaces': path.resolve(__dirname, './src/interfaces'),
      '@store': path.resolve(__dirname, './src/store'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
  server: {
    port: 3000,
  },
})
