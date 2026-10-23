import { useEffect, useRef, useState } from "react"
import { languages, useLanguage } from "../i18n/Language.jsx"

export function LanguageSwitcher({ variant }) {
  const { language, setLanguage, copy } = useLanguage()
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const listId = `language-list-${variant}`

  useEffect(() => {
    if (!open) return undefined
    function onPointer(event) {
      if (!rootRef.current?.contains(event.target)) setOpen(false)
    }
    function onKey(event) {
      if (event.key === "Escape") setOpen(false)
    }
    document.addEventListener("mousedown", onPointer)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onPointer)
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  return (
    <div className={`lang-switch lang-switch-${variant}`} ref={rootRef}>
      <button
        type="button"
        className={variant === "desktop" ? "lang-world" : "lang-menu"}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listId}
        aria-label={variant === "desktop" ? copy.nav.changeLanguage : undefined}
        onClick={() => setOpen((value) => !value)}
      >
        {variant === "desktop" ? <Globe /> : copy.nav.changeLanguage}
      </button>
      {open && (
        <ul id={listId} className="lang-list" role="listbox" aria-label={copy.nav.changeLanguage}>
          {languages.map((item) => (
            <li key={item.id} role="none">
              <button
                type="button"
                role="option"
                lang={item.id}
                aria-selected={language === item.id}
                onClick={() => {
                  setLanguage(item.id)
                  setOpen(false)
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function Globe() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <ellipse cx="12" cy="12" rx="4" ry="9" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3.5 12h17M5.2 8h13.6M5.2 16h13.6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}
