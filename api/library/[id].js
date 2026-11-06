import { proxyLibraryFile } from "../../server/library.js"

export default async function handler(req, res) {
  const raw = req.query?.id
  const id = Array.isArray(raw) ? raw[0] : raw
  await proxyLibraryFile(id, res)
}
