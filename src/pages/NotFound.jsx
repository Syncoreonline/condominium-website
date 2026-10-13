import { Link } from "react-router-dom"
import { usePageTitle } from "../usePageTitle.js"

export function NotFound() {
  usePageTitle("Page not found · Ocean Park Condominium")
  return (
    <div className="page narrow">
      <h1>That page is not in the building.</h1>
      <p>Start again from the front door.</p>
      <Link className="btn" to="/">
        Back home
      </Link>
    </div>
  )
}
