import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { building } from "../data.js"
import { useLanguage } from "../i18n/Language.jsx"
import { usePageTitle } from "../usePageTitle.js"

const DESK_APPLY_ORIGIN = "https://app.vestaflo.com"

function applyUrl(token) {
  const clean = String(token || "").trim()
  if (!clean) return ""
  return `${DESK_APPLY_ORIGIN}/apply/${encodeURIComponent(clean)}`
}

/**
 * Invite emails use this building’s domain. The occupancy form runs on the
 * desk app, so open it there after a short branded handoff.
 */
export function Apply() {
  const { token } = useParams()
  const { copy } = useLanguage()
  const href = applyUrl(token)
  usePageTitle(`${copy.apply.pageTitle} · ${building.name}`)

  useEffect(() => {
    if (!href) return undefined
    const timer = window.setTimeout(() => {
      window.location.replace(href)
    }, 400)
    return () => window.clearTimeout(timer)
  }, [href])

  if (!href) {
    return (
      <div className="page narrow">
        <h1>{copy.missing.title}</h1>
        <p>{copy.missing.body}</p>
        <Link className="btn" to="/">
          {copy.missing.back}
        </Link>
      </div>
    )
  }

  return (
    <div className="page narrow">
      <h1>{copy.apply.title}</h1>
      <p>{copy.apply.body}</p>
      <p>
        <a className="btn" href={href}>
          {copy.apply.open}
        </a>
      </p>
    </div>
  )
}
