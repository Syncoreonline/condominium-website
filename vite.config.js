import path from "node:path"
import { fileURLToPath } from "node:url"
import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import { installDocumentRoutes, writeIndex } from "./server/documents.js"

const root = path.dirname(fileURLToPath(import.meta.url))

function documentsPlugin() {
  return {
    name: "ocean-park-documents",
    configureServer(server) {
      installDocumentRoutes(server.middlewares, {
        publicDir: path.join(root, "public"),
        code: loadEnv(server.config.mode, root, "").PORTAL_CODE || "",
      })
    },
    configurePreviewServer(server) {
      installDocumentRoutes(server.middlewares, {
        publicDir: path.join(root, "dist"),
        mirrorDir: path.join(root, "public"),
        code: loadEnv("production", root, "").PORTAL_CODE || "",
      })
    },
    closeBundle() {
      writeIndex(path.join(root, "dist"), path.join(root, "public"))
    },
  }
}

export default defineConfig({
  plugins: [react(), documentsPlugin()],
  server: {
    port: 5173,
  },
})
