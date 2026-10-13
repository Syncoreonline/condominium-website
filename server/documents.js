import { timingSafeEqual } from "node:crypto"
import fs from "node:fs"
import path from "node:path"
import { documentCategories } from "../src/documentCategories.js"

const MAX_BYTES = 20 * 1024 * 1024

export function scanDocuments(publicDir) {
  return documentCategories.map((category) => {
    const dir = path.join(publicDir, "documents", category.id)
    const files = []
    if (fs.existsSync(dir)) {
      for (const name of fs.readdirSync(dir)) {
        if (!name.toLowerCase().endsWith(".pdf")) continue
        const full = path.join(dir, name)
        const stat = fs.statSync(full)
        if (!stat.isFile()) continue
        files.push({
          name,
          title: titleFromName(name),
          href: `/documents/${category.id}/${encodeURIComponent(name)}`,
          updated: stat.mtime.toISOString(),
          bytes: stat.size,
        })
      }
    }
    files.sort((a, b) => a.title.localeCompare(b.title, "en"))
    return { ...category, files }
  })
}

export function writeIndex(distDir, publicDir) {
  const payload = JSON.stringify({ categories: scanDocuments(publicDir) }, null, 2)
  const file = path.join(distDir, "documents", "index.json")
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, payload)
}

export function installDocumentRoutes(middlewares, { publicDir, code, mirrorDir }) {
  middlewares.use(async (req, res, next) => {
    const url = new URL(req.url ?? "/", "http://localhost")
    if (url.pathname === "/documents/index.json" && req.method === "GET") {
      sendJson(res, 200, { categories: scanDocuments(publicDir) })
      return
    }
    if (url.pathname !== "/api/documents") {
      next()
      return
    }
    if (!code) {
      sendJson(res, 503, { error: "The document portal is not configured." })
      return
    }
    if (!authorized(req.headers["x-portal-code"], code)) {
      sendJson(res, 401, { error: "That portal code is not right." })
      return
    }
    try {
      if (req.method === "GET") {
        sendJson(res, 200, { ok: true })
        return
      }
      if (req.method === "POST") {
        const saved = await saveUpload(req, publicDir, mirrorDir)
        sendJson(res, 200, { ok: true, file: saved })
        return
      }
      if (req.method === "DELETE") {
        removeUpload(url, publicDir, mirrorDir)
        sendJson(res, 200, { ok: true })
        return
      }
      sendJson(res, 405, { error: "That action is not available." })
    } catch (error) {
      const status = error.status ?? 400
      sendJson(res, status, { error: error.message || "The file could not be saved." })
    }
  })
}

function titleFromName(name) {
  return name
    .replace(/\.pdf$/i, "")
    .replace(/[_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function authorized(input, expected) {
  if (typeof input !== "string" || !input) return false
  const given = Buffer.from(input)
  const actual = Buffer.from(expected)
  if (given.length !== actual.length) return false
  return timingSafeEqual(given, actual)
}

async function saveUpload(req, publicDir, mirrorDir) {
  const categoryId = header(req, "x-category")
  const category = documentCategories.find((item) => item.id === categoryId)
  if (!category) {
    throw Object.assign(new Error("Choose a document category."), { status: 400 })
  }
  const type = header(req, "content-type")
  if (!type.toLowerCase().startsWith("application/pdf")) {
    throw Object.assign(new Error("Upload a PDF file."), { status: 415 })
  }
  const filename = safePdfName(header(req, "x-file-name"))
  if (!filename) {
    throw Object.assign(new Error("Use a PDF file name."), { status: 400 })
  }
  const body = await readBody(req)
  if (body.length < 5 || body.subarray(0, 5).toString("utf8") !== "%PDF-") {
    throw Object.assign(new Error("That file is not a PDF."), { status: 400 })
  }
  for (const dir of [publicDir, mirrorDir].filter(Boolean)) {
    const folder = path.join(dir, "documents", category.id)
    fs.mkdirSync(folder, { recursive: true })
    fs.writeFileSync(path.join(folder, filename), body)
  }
  return { name: filename, category: category.id }
}

function removeUpload(url, publicDir, mirrorDir) {
  const categoryId = url.searchParams.get("category")
  const category = documentCategories.find((item) => item.id === categoryId)
  const filename = safePdfName(url.searchParams.get("name") ?? "")
  if (!category || !filename) {
    throw Object.assign(new Error("That document could not be found."), { status: 400 })
  }
  let removed = false
  for (const dir of [publicDir, mirrorDir].filter(Boolean)) {
    const file = path.join(dir, "documents", category.id, filename)
    if (fs.existsSync(file)) {
      fs.unlinkSync(file)
      removed = true
    }
  }
  if (!removed) {
    throw Object.assign(new Error("That document is no longer in the folder."), { status: 404 })
  }
}

function safePdfName(input) {
  const base = path.basename(input).replace(/\.pdf$/i, "")
  const cleaned = base.replace(/[^a-zA-Z0-9._ -]+/g, "").trim().replace(/\s+/g, " ")
  if (!cleaned || cleaned === "." || cleaned === "..") return null
  return `${cleaned}.pdf`
}

function header(req, name) {
  const value = req.headers[name]
  return typeof value === "string" ? value : ""
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    let size = 0
    req.on("data", (chunk) => {
      size += chunk.length
      if (size > MAX_BYTES) {
        reject(Object.assign(new Error("That PDF is larger than 20 MB."), { status: 413 }))
        req.destroy()
        return
      }
      chunks.push(chunk)
    })
    req.on("end", () => resolve(Buffer.concat(chunks)))
    req.on("error", () => reject(Object.assign(new Error("The upload was interrupted."), { status: 400 })))
  })
}

function sendJson(res, status, payload) {
  const body = JSON.stringify(payload)
  res.statusCode = status
  res.setHeader("content-type", "application/json; charset=utf-8")
  res.setHeader("cache-control", "no-store")
  res.end(body)
}
