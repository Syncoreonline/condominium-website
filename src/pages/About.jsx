import { useEffect, useState } from "react"
import { documentCategories } from "../documentCategories.js"
import { building } from "../data.js"
import { usePageTitle } from "../usePageTitle.js"

const vestafloLibrary = "https://app.vestaflo.com/api/public/compliance-documents?condominium=ocean-park"
const vestafloPortal = "https://app.vestaflo.com/api/public/resident-portal"
const sessionKey = "ocean-park-resident-portal"

export function About() {
  usePageTitle(`Resident Portal · ${building.name}`)
  const [categories, setCategories] = useState(documentCategories.map((category) => ({ ...category, files: [] })))
  const [active, setActive] = useState({})
  const [status, setStatus] = useState("loading")
  const [session, setSession] = useState(() => readPortalSession())
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [step, setStep] = useState(() => (readPortalSession() ? "open" : "email"))
  const [notice, setNotice] = useState("")
  const [formError, setFormError] = useState("")
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (!session) return undefined
    let ignore = false
    async function load() {
      const [localResult, remoteResult] = await Promise.allSettled([loadLocalDocuments(), loadVestafloDocuments()])
      if (ignore) return
      if (localResult.status === "rejected" && remoteResult.status === "rejected") {
        setStatus("error")
        return
      }
      const local = localResult.status === "fulfilled" ? localResult.value : []
      const remote = remoteResult.status === "fulfilled" ? remoteResult.value : []
      setCategories(mergeDocuments(local, remote))
      setStatus("ready")
    }
    load()
    window.addEventListener("focus", load)
    return () => {
      ignore = true
      window.removeEventListener("focus", load)
    }
  }, [session])

  async function sendCode(event) {
    event.preventDefault()
    setFormError("")
    setNotice("")
    const address = email.trim()
    if (!address.includes("@")) {
      setFormError("Enter the email address the association has on file.")
      return
    }
    setBusy(true)
    try {
      const response = await fetch(`${vestafloPortal}/code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: address, condominium: "ocean-park" }),
      })
      if (!response.ok) throw new Error("send")
      setStep("code")
      setNotice("If this email belongs to a unit owner or an association employee, the code is on its way.")
    } catch {
      setFormError("The code could not be sent just now.")
    } finally {
      setBusy(false)
    }
  }

  async function openLibrary(event) {
    event.preventDefault()
    setFormError("")
    const address = email.trim()
    const entered = code.replace(/\s+/g, "")
    if (!entered) {
      setFormError("Enter the code from your email.")
      return
    }
    setBusy(true)
    try {
      const response = await fetch(`${vestafloPortal}/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: address, code: entered, condominium: "ocean-park" }),
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok || !data.expiresAt) throw new Error("code")
      const next = { email: address, expiresAt: data.expiresAt }
      sessionStorage.setItem(sessionKey, JSON.stringify(next))
      setSession(next)
      setStep("open")
      setNotice("")
    } catch {
      setFormError("That code is not right.")
    } finally {
      setBusy(false)
    }
  }

  function closeLibrary() {
    sessionStorage.removeItem(sessionKey)
    setSession(null)
    setStep("email")
    setCode("")
    setNotice("")
    setFormError("")
    setCategories(documentCategories.map((category) => ({ ...category, files: [] })))
    setStatus("loading")
  }

  return (
    <div className="page">
      <section className="band-tight" id="resident-portal">
        <h2>Resident Portal</h2>
        <p>
          Unit owners and association employees can open the building’s policies, budgets, minutes, and forms. Enter
          the email address the association has on file. A code is sent to that inbox. The library is closed to
          everyone else.
        </p>

        {step !== "open" && (
          <form className="visit-form portal-form" onSubmit={step === "code" ? openLibrary : sendCode}>
            <label className="field">
              <span>Email</span>
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>
            {step === "code" && (
              <label className="field">
                <span>Code</span>
                <input
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                />
              </label>
            )}
            {formError && <p className="form-error">{formError}</p>}
            {notice && <p className="fine-print">{notice}</p>}
            <button className="btn" type="submit" disabled={busy}>
              {busy ? (step === "code" ? "Checking" : "Sending") : step === "code" ? "Open the library" : "Send a code"}
            </button>
          </form>
        )}

        {step === "open" && (
          <p>
            <button type="button" className="text-button" onClick={closeLibrary}>
              Close the library
            </button>
          </p>
        )}

        {step === "open" && status === "error" && (
          <p className="fine-print">The library could not be loaded just now. Refresh the page.</p>
        )}

        {step === "open" && status !== "loading" && categories.map((category) => {
          const files = category.files ?? []
          const selected = files.find((file) => file.href === active[category.id]) ?? files[0]
          return (
            <article key={category.id} id={category.id} className="doc-group">
              <h3>{category.title}</h3>
              {files.length === 0 ? (
                <p className="fine-print">Nothing posted in this category yet.</p>
              ) : (
                <>
                  <ul className="doc-list">
                    {files.map((file) => (
                      <li key={file.href}>
                        <button
                          type="button"
                          className={selected?.href === file.href ? "text-button on" : "text-button"}
                          aria-pressed={selected?.href === file.href}
                          onClick={() => setActive((current) => ({ ...current, [category.id]: file.href }))}
                        >
                          {file.title}
                        </button>
                        <span>{postedOn(file.updated)}</span>
                      </li>
                    ))}
                  </ul>
                  {selected && (
                    <div className="doc-viewer">
                      <div className="doc-viewer-bar">
                        <p>{selected.title}</p>
                        <a href={selected.href} target="_blank" rel="noreferrer">
                          {selected.mimeType?.startsWith("image/") ? "Open image" : "Open PDF"}
                        </a>
                      </div>
                      {selected.mimeType?.startsWith("image/") ? (
                        <img src={selected.href} alt={selected.title} />
                      ) : (
                        <iframe title={selected.title} src={selected.href} />
                      )}
                    </div>
                  )}
                </>
              )}
            </article>
          )
        })}
      </section>
    </div>
  )
}

async function loadLocalDocuments() {
  const response = await fetch("/documents/index.json", { cache: "no-store" })
  if (!response.ok) throw new Error("missing")
  const data = await response.json()
  return Array.isArray(data.categories) ? data.categories : []
}

async function loadVestafloDocuments() {
  const response = await fetch(vestafloLibrary, { cache: "no-store" })
  if (!response.ok) throw new Error("missing")
  const data = await response.json()
  return Array.isArray(data) ? data : []
}

function mergeDocuments(localCategories, remoteDocuments) {
  return documentCategories.map((category) => {
    const local = localCategories.find((item) => item.id === category.id)
    const remote = remoteDocuments
      .filter((document) => String(document.category || "").trim().toLowerCase() === category.title.toLowerCase())
      .map((document) => ({
        name: document.fileName || document.id,
        title: document.name || document.fileName || "Document",
        href: `https://app.vestaflo.com/api/public/compliance-documents/${encodeURIComponent(document.id)}/file?condominium=ocean-park`,
        updated: document.postedAt,
        mimeType: document.mimeType || "application/pdf",
      }))
    return { ...category, files: [...remote, ...(local?.files ?? [])] }
  })
}

function readPortalSession() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(sessionKey) || "")
    if (saved?.expiresAt && Date.parse(saved.expiresAt) > Date.now()) return saved
  } catch {
    /* A missing or broken session just leaves the library closed. */
  }
  return null
}

function postedOn(value) {
  if (!value) return ""
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ""
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}
