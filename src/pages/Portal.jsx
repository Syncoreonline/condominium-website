import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { documentCategories } from "../documentCategories.js"
import { building } from "../data.js"
import { usePageTitle } from "../usePageTitle.js"

const storageKey = "ocean-park-portal-code"

export function Portal() {
  usePageTitle(`Document portal · ${building.name}`)
  const [code, setCode] = useState("")
  const [authed, setAuthed] = useState(false)
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState(documentCategories[0].id)
  const [file, setFile] = useState(null)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    const saved = sessionStorage.getItem(storageKey) ?? ""
    if (!saved) return
    setCode(saved)
    verify(saved).then((ok) => {
      if (ok) {
        setAuthed(true)
        loadLibrary()
      }
    })
  }, [])

  async function unlock(event) {
    event.preventDefault()
    setError("")
    const ok = await verify(code.trim())
    if (!ok) {
      setError("That portal code is not right.")
      return
    }
    sessionStorage.setItem(storageKey, code.trim())
    setAuthed(true)
    await loadLibrary()
  }

  async function loadLibrary() {
    const response = await fetch("/documents/index.json", { cache: "no-store" })
    const data = await response.json()
    setCategories(Array.isArray(data.categories) ? data.categories : [])
  }

  async function upload(event) {
    event.preventDefault()
    setError("")
    setMessage("")
    if (!file) {
      setError("Choose a PDF.")
      return
    }
    if (!file.name.toLowerCase().endsWith(".pdf")) {
      setError("Choose a PDF file.")
      return
    }
    setBusy(true)
    try {
      const response = await fetch("/api/documents", {
        method: "POST",
        headers: {
          "content-type": "application/pdf",
          "x-portal-code": sessionStorage.getItem(storageKey) ?? "",
          "x-category": category,
          "x-file-name": file.name,
        },
        body: file,
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        setError(data.error || "The file could not be saved.")
        return
      }
      setFile(null)
      event.target.reset()
      setMessage("Posted. It is on the About page now.")
      await loadLibrary()
    } finally {
      setBusy(false)
    }
  }

  async function remove(categoryId, name) {
    if (!window.confirm(`Remove ${name} from the website?`)) return
    setError("")
    setMessage("")
    const response = await fetch(`/api/documents?category=${encodeURIComponent(categoryId)}&name=${encodeURIComponent(name)}`, {
      method: "DELETE",
      headers: { "x-portal-code": sessionStorage.getItem(storageKey) ?? "" },
    })
    const data = await response.json().catch(() => ({}))
    if (!response.ok) {
      setError(data.error || "The file could not be removed.")
      return
    }
    setMessage("Removed from the website.")
    await loadLibrary()
  }

  if (!authed) {
    return (
      <div className="page narrow">
        <p className="eyebrow">Document portal</p>
        <h1>Post a PDF for the building.</h1>
        <p className="lede">
          Files posted here appear on the About page, in the category you choose. The public site does not accept
          uploads without this code.
        </p>
        <form className="visit-form" onSubmit={unlock}>
          <label className={error ? "field invalid" : "field"}>
            <span>Portal code</span>
            <input type="password" autoComplete="current-password" value={code} onChange={(event) => setCode(event.target.value)} />
            {error && <small>{error}</small>}
          </label>
          <button className="btn" type="submit">
            Open the portal
          </button>
        </form>
      </div>
    )
  }

  const posted = categories.flatMap((item) => (item.files ?? []).map((fileItem) => ({ ...fileItem, categoryId: item.id, categoryTitle: item.title })))

  return (
    <div className="page">
      <header className="page-intro">
        <p className="eyebrow">Document portal</p>
        <h1>Add a PDF, and the site will list it.</h1>
        <p className="lede">
          Choose the category, then upload the PDF. The About page reads this library on its own. Nothing else on the
          site has to be edited.
        </p>
        <p>
          <Link className="text-link" to="/resident-portal">
            View the public documents
          </Link>
        </p>
      </header>

      <form className="visit-form portal-form" onSubmit={upload}>
        <label className="field">
          <span>Category</span>
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            {documentCategories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>PDF</span>
          <input
            type="file"
            accept="application/pdf,.pdf"
            onChange={(event) => setFile(event.target.files?.[0] ?? null)}
          />
        </label>
        {error && <p className="form-error">{error}</p>}
        {message && <p className="fine-print">{message}</p>}
        <button className="btn" type="submit" disabled={busy}>
          {busy ? "Posting…" : "Post the PDF"}
        </button>
      </form>

      <section className="band-tight">
        <h2>Already posted</h2>
        {posted.length === 0 ? (
          <p className="fine-print">No PDFs yet. The categories on the About page are waiting.</p>
        ) : (
          <ul className="doc-list">
            {posted.map((item) => (
              <li key={`${item.categoryId}-${item.name}`}>
                <span>
                  <strong>{item.title}</strong>
                  <br />
                  {item.categoryTitle}
                </span>
                <button type="button" className="text-button" onClick={() => remove(item.categoryId, item.name)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

async function verify(code) {
  const response = await fetch("/api/documents", {
    headers: { "x-portal-code": code },
  })
  return response.ok
}
