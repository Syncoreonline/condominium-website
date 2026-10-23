import { useEffect, useState } from "react"
import { documentCategories } from "../documentCategories.js"
import { building } from "../data.js"
import { useLanguage } from "../i18n/Language.jsx"
import { usePageTitle } from "../usePageTitle.js"

const vestafloLibrary = "https://app.vestaflo.com/api/public/compliance-documents?condominium=ocean-park"
const vestafloPortal = "https://app.vestaflo.com/api/public/resident-portal"
const sessionKey = "ocean-park-resident-portal"

export function About() {
  const { copy } = useLanguage()
  const page = copy.portal
  usePageTitle(`${page.pageTitle} · ${building.name}`)
  const [categories, setCategories] = useState(documentCategories.map((category) => ({ ...category, files: [] })))
  const [status, setStatus] = useState("loading")
  const [session, setSession] = useState(() => readPortalSession())
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [step, setStep] = useState(() => (readPortalSession() ? "open" : "email"))
  const [notice, setNotice] = useState("")
  const [formError, setFormError] = useState("")
  const [busy, setBusy] = useState("")

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
    event?.preventDefault()
    setFormError("")
    setNotice("")
    const address = email.trim()
    const renewing = step === "code"
    if (!address.includes("@")) {
      setFormError("email")
      return
    }
    setBusy("send")
    try {
      const response = await fetch(`${vestafloPortal}/code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: address, condominium: "ocean-park" }),
      })
      const data = await response.json().catch(() => ({}))
      if (data.error === "notOnFile") {
        setStep("email")
        setCode("")
        setFormError("notOnFile")
        return
      }
      if (!response.ok) throw new Error("send")
      setCode("")
      setStep("code")
      setNotice(renewing ? "resent" : "sent")
    } catch {
      setFormError("send")
    } finally {
      setBusy("")
    }
  }

  async function openLibrary(event) {
    event.preventDefault()
    setFormError("")
    const address = email.trim()
    const entered = code.replace(/\s+/g, "")
    if (!entered) {
      setFormError("code")
      return
    }
    setBusy("check")
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
      setFormError("mismatch")
    } finally {
      setBusy("")
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
        <h2>{page.title}</h2>
        <p>{page.intro}</p>

        {step !== "open" && (
          <form className="visit-form portal-form" onSubmit={step === "code" ? openLibrary : sendCode}>
            <label className="field">
              <span>{page.email}</span>
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>
            {step === "code" && (
              <label className="field">
                <span>{page.code}</span>
                <input
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                />
              </label>
            )}
            {formError && <p className="form-error">{page.errors[formError]}</p>}
            {notice && <p className="fine-print">{page.notices[notice]}</p>}
            <button className="btn" type="submit" disabled={Boolean(busy)}>
              {busy === "check" ? page.checking : busy === "send" && step !== "code" ? page.sending : step === "code" ? page.open : page.send}
            </button>
            {step === "code" && (
              <button type="button" className="text-button" onClick={sendCode} disabled={Boolean(busy)}>
                {busy === "send" ? page.sending : page.resend}
              </button>
            )}
          </form>
        )}

        {step === "open" && (
          <p>
            <button type="button" className="text-button" onClick={closeLibrary}>
              {page.close}
            </button>
          </p>
        )}

        {step === "open" && status === "error" && (
          <p className="fine-print">{page.loadError}</p>
        )}

        {step === "open" && status !== "loading" && categories.map((category) => {
          const files = category.files ?? []
          return (
            <article key={category.id} id={category.id} className="doc-group">
              <h3>{copy.categories[category.id] ?? category.title}</h3>
              {files.length === 0 ? (
                <p className="fine-print">{page.empty}</p>
              ) : (
                <ul className="doc-list">
                  {files.map((file) => (
                    <li key={file.href}>
                      <a href={file.href} target="_blank" rel="noreferrer">
                        {file.title === "Document" ? page.document : file.title}
                      </a>
                    </li>
                  ))}
                </ul>
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
