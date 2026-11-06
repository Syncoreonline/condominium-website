const CONDOMINIUM_ID = "ocean-park"
const VESTAFLO_FILE = "https://app.vestaflo.com/api/public/compliance-documents"

export function libraryFileId(pathname) {
  const match = String(pathname || "").match(/^\/library\/([^/]+)$/)
  if (!match) return ""
  try {
    const id = decodeURIComponent(match[1]).trim()
    if (!id || id.includes("..") || id.includes("/")) return ""
    return id
  } catch {
    return ""
  }
}

export async function proxyLibraryFile(id, res) {
  const documentId = String(id || "").trim()
  if (!documentId || documentId.includes("..") || documentId.includes("/")) {
    res.statusCode = 404
    res.end()
    return
  }
  const upstream = new URL(`${VESTAFLO_FILE}/${encodeURIComponent(documentId)}/file`)
  upstream.searchParams.set("condominium", CONDOMINIUM_ID)
  let response
  try {
    response = await fetch(upstream)
  } catch {
    res.statusCode = 502
    res.end()
    return
  }
  if (!response.ok) {
    res.statusCode = response.status === 404 ? 404 : 502
    res.end()
    return
  }
  const bytes = Buffer.from(await response.arrayBuffer())
  res.statusCode = 200
  res.setHeader("Content-Type", response.headers.get("content-type") || "application/pdf")
  const disposition = response.headers.get("content-disposition")
  if (disposition) res.setHeader("Content-Disposition", disposition)
  res.setHeader("Content-Length", bytes.length)
  res.setHeader("Cache-Control", "private, max-age=60")
  res.end(bytes)
}

export function installLibraryRoute(middlewares) {
  middlewares.use(async (req, res, next) => {
    const url = new URL(req.url ?? "/", "http://localhost")
    const id = libraryFileId(url.pathname)
    if (!id || req.method !== "GET") {
      next()
      return
    }
    await proxyLibraryFile(id, res)
  })
}
