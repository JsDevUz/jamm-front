import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks(id) {
          const normalizedId = id.replace(/\\/g, '/')

          if (!normalizedId.includes('node_modules')) {
            if (normalizedId.includes('/src/features/arena/')) return 'feature-arena'
            if (
              normalizedId.includes('/src/features/courses/') ||
              normalizedId.includes('/src/components/JammLayout')
            ) {
              return 'feature-courses'
            }
            if (
              normalizedId.includes('/src/features/chats/') ||
              normalizedId.includes('/src/contexts/ChatsContext')
            ) {
              return 'feature-chats'
            }
            if (
              normalizedId.includes('/src/features/calls/') ||
              normalizedId.includes('/src/contexts/CallContext')
            ) {
              return 'feature-calls'
            }
            if (
              normalizedId.includes('/src/features/profile/') ||
              normalizedId.includes('/src/features/navigation/')
            ) {
              return 'feature-profile-shell'
            }
            if (
              normalizedId.includes('/src/features/blogs/') ||
              normalizedId.includes('/src/features/posts/')
            ) {
              return 'feature-content'
            }
            if (normalizedId.includes('/src/features/admin/')) return 'feature-admin'
            if (normalizedId.includes('/src/app/')) return 'feature-app'
            return
          }

          if (normalizedId.includes('node_modules/react') || normalizedId.includes('node_modules/react-dom')) {
            return 'react-vendor'
          }

          if (normalizedId.includes('node_modules/react-router') || normalizedId.includes('node_modules/@tanstack')) {
            return 'router-query'
          }

          if (
            normalizedId.includes('node_modules/styled-components') ||
            normalizedId.includes('node_modules/lucide-react') ||
            normalizedId.includes('node_modules/react-hot-toast')
          ) {
            return 'ui-vendor'
          }

          if (
            normalizedId.includes('node_modules/socket.io-client') ||
            normalizedId.includes('node_modules/simple-peer') ||
            normalizedId.includes('node_modules/hls.js')
          ) {
            return 'media-realtime'
          }

          if (
            normalizedId.includes('node_modules/i18next') ||
            normalizedId.includes('node_modules/react-i18next') ||
            normalizedId.includes('node_modules/axios')
          ) {
            return 'app-vendor'
          }

          return 'vendor'
        },
      },
    },
  },
})
