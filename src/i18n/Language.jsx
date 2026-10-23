import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { copy } from "./copy.js"

const LanguageContext = createContext(null)
const storageKey = "ocean-park-language"

export const languages = [
  { id: "en", label: "English" },
  { id: "es", label: "Español" },
]

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    try {
      return localStorage.getItem(storageKey) === "es" ? "es" : "en"
    } catch {
      return "en"
    }
  })

  useEffect(() => {
    document.documentElement.lang = language
    const description = document.querySelector('meta[name="description"]')
    if (description) description.setAttribute("content", (copy[language] ?? copy.en).meta.description)
    try {
      localStorage.setItem(storageKey, language)
    } catch {
      /* The choice still applies for this visit. */
    }
  }, [language])

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      copy: copy[language] ?? copy.en,
    }),
    [language],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const value = useContext(LanguageContext)
  if (!value) throw new Error("LanguageProvider is missing")
  return value
}

export function format(template, values = {}) {
  return String(template).replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "")
}
