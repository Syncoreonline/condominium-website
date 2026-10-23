import { Link } from "react-router-dom"
import { building } from "../data.js"
import { useLanguage } from "../i18n/Language.jsx"
import { usePageTitle } from "../usePageTitle.js"

export function NotFound() {
  const { copy } = useLanguage()
  usePageTitle(`${copy.missing.pageTitle} · ${building.name}`)
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
