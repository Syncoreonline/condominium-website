import { building } from "../data.js"
import { Legal } from "../i18n/Legal.jsx"
import { useLanguage } from "../i18n/Language.jsx"
import { usePageTitle } from "../usePageTitle.js"

export function Privacy() {
  const { copy } = useLanguage()
  usePageTitle(`${copy.privacy.pageTitle} · ${building.name}`)
  return <Legal page={copy.privacy} values={building} />
}
