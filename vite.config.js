import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const projectRoot = path.dirname(fileURLToPath(import.meta.url))
const pdfjsDistRoot = path.join(projectRoot, 'node_modules/pdfjs-dist')
const pdfjsAssetDirs = ['cmaps', 'standard_fonts', 'wasm', 'iccs']

const pdfjsMimeTypes = {
  '.bcmap': 'application/octet-stream',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.pfb': 'application/octet-stream',
  '.ttf': 'font/ttf',
  '.wasm': 'application/wasm',
}

const pdfjsAssetsPlugin = () => ({
  name: 'pdfjs-assets',
  configureServer(server) {
    server.middlewares.use('/pdfjs', (req, res, next) => {
      const requestPath = decodeURIComponent(
        new URL(req.url || '/', 'http://localhost').pathname,
      ).replace(/^\/+(pdfjs\/)?/, '')
      const filePath = path.resolve(pdfjsDistRoot, requestPath)
      const allowedRoot = `${pdfjsDistRoot}${path.sep}`

      if (!filePath.startsWith(allowedRoot)) {
        next()
        return
      }

      fs.stat(filePath, (statError, stat) => {
        if (statError || !stat.isFile()) {
          next()
          return
        }

        res.statusCode = 200
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
        res.setHeader('Content-Type', pdfjsMimeTypes[path.extname(filePath)] || 'application/octet-stream')
        fs.createReadStream(filePath).pipe(res)
      })
    })
  },
  closeBundle() {
    const outputRoot = path.join(projectRoot, 'dist/pdfjs')
    fs.rmSync(outputRoot, { recursive: true, force: true })
    fs.mkdirSync(outputRoot, { recursive: true })

    pdfjsAssetDirs.forEach((dirName) => {
      fs.cpSync(path.join(pdfjsDistRoot, dirName), path.join(outputRoot, dirName), {
        recursive: true,
      })
    })
  },
})

export default defineConfig({
  plugins: [react(), pdfjsAssetsPlugin()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173,
      clientPort: 5173,
    },
  },
  build: {
    chunkSizeWarningLimit: 700,
  },
})
