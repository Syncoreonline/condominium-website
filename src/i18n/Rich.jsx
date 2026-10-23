import { Link } from "react-router-dom"
import { format } from "./Language.jsx"

export function Rich({ parts, values = {} }) {
  const list = Array.isArray(parts) ? parts : [parts]
  return list.map((part, index) => {
    if (typeof part === "string") return <span key={index}>{format(part, values)}</span>
    if (part.to) return <Link key={index} to={part.to}>{part.label}</Link>
    if (part.phone) return <a key={index} href={values.phoneHref}>{values.phone}</a>
    if (part.href) {
      return (
        <a key={index} href={part.href} target={part.blank ? "_blank" : undefined} rel={part.blank ? "noreferrer" : undefined}>
          {part.label}
        </a>
      )
    }
    return null
  })
}
