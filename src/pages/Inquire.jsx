import { useMemo, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { building, getResidence, residences } from "../data.js"
import { copy as dictionaries } from "../i18n/copy.js"
import { format, useLanguage } from "../i18n/Language.jsx"
import { usePageTitle } from "../usePageTitle.js"

const empty = {
  name: "",
  email: "",
  phone: "",
  residence: "",
  timing: "just-looking",
  message: "",
}

export function Inquire() {
  const { copy } = useLanguage()
  const page = copy.inquire
  usePageTitle(`${page.pageTitle} · ${building.name}`)
  const [params] = useSearchParams()
  const initial = useMemo(
    () => ({
      ...empty,
      residence: getResidence(params.get("residence")) ? params.get("residence") : "",
    }),
    [params],
  )
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [receipt, setReceipt] = useState(null)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState("")

  function update(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
  }

  async function submit(event) {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    setSendError("")
    if (Object.keys(nextErrors).length > 0) return
    const home = getResidence(values.residence)
    const english = dictionaries.en.inquire
    const residenceName = home ? dictionaries.en.plans[home.id].name : english.noPlan
    setSending(true)
    try {
      const response = await fetch("https://formsubmit.co/ajax/frontdeskofc@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone,
          plan: residenceName,
          timing: english.timingSent[values.timing] ?? english.timingSent["just-looking"],
          message: values.message,
          _subject: "Tour request from the Ocean Park website",
          _template: "table",
          _captcha: "false",
          _replyto: values.email,
        }),
      })
      const result = await response.json().catch(() => ({}))
      if (!response.ok || result.success === false || result.success === "false") throw new Error("send")
      setReceipt(values)
    } catch {
      setSendError("send")
    } finally {
      setSending(false)
    }
  }

  if (receipt) {
    const chosen = getResidence(receipt.residence)
    const planName = chosen ? copy.plans[chosen.id].name : page.noPlan
    return (
      <div className="page narrow">
        <p className="eyebrow">{page.noted}</p>
        <h1>{format(page.thanks, { name: receipt.name.trim().split(" ")[0] })}</h1>
        <p className="lede">{page.received}</p>
        <dl className="receipt">
          <div>
            <dt>{page.name}</dt>
            <dd>{receipt.name}</dd>
          </div>
          <div>
            <dt>{page.email}</dt>
            <dd>{receipt.email}</dd>
          </div>
          <div>
            <dt>{page.phone}</dt>
            <dd>{receipt.phone}</dd>
          </div>
          <div>
            <dt>{page.plan}</dt>
            <dd>{planName}</dd>
          </div>
          <div>
            <dt>{page.timing}</dt>
            <dd>{page.timingSent[receipt.timing]}</dd>
          </div>
          {receipt.message.trim() && (
            <div>
              <dt>{page.note}</dt>
              <dd>{receipt.message}</dd>
            </div>
          )}
        </dl>
        <Link className="btn" to="/">
          {page.back}
        </Link>
      </div>
    )
  }

  return (
    <div className="page inquire">
      <header className="page-intro">
        <p className="eyebrow">{page.eyebrow}</p>
        <h1>{page.title}</h1>
        <p className="lede">{page.lede}</p>
      </header>

      <div className="inquire-grid">
        <form className="visit-form" onSubmit={submit} noValidate>
          <Field label={page.name} error={errors.name && page.errors[errors.name]}>
            <input name="name" autoComplete="name" value={values.name} onChange={update} />
          </Field>
          <Field label={page.email} error={errors.email && page.errors[errors.email]}>
            <input name="email" type="email" autoComplete="email" value={values.email} onChange={update} />
          </Field>
          <Field label={page.phone} error={errors.phone && page.errors[errors.phone]}>
            <input name="phone" type="tel" autoComplete="tel" value={values.phone} onChange={update} />
          </Field>
          <Field label={page.plan}>
            <select name="residence" value={values.residence} onChange={update}>
              <option value="">{page.unsure}</option>
              {residences.map((home) => {
                const plan = copy.plans[home.id]
                return (
                  <option key={home.id} value={home.id}>
                    {plan.name} · {plan.sqft}
                  </option>
                )
              })}
            </select>
          </Field>
          <Field label={page.timing}>
            <select name="timing" value={values.timing} onChange={update}>
              <option value="immediately">{page.options.immediately}</option>
              <option value="1-3">{page.options["1-3"]}</option>
              <option value="3-6">{page.options["3-6"]}</option>
              <option value="just-looking">{page.options["just-looking"]}</option>
            </select>
          </Field>
          <Field label={page.message}>
            <textarea name="message" rows="4" value={values.message} onChange={update} />
          </Field>
          <button className="btn" type="submit" disabled={sending}>
            {sending ? page.sending : page.send}
          </button>
          {sendError && <p className="fine-print">{page.sendError}</p>}
        </form>

        <aside className="visit-card">
          <h2>{page.asideTitle}</h2>
          <p>
            {building.address}
            <br />
            {building.city}, {building.state} {building.zip}
          </p>
          <p>
            <a href={building.phoneHref}>{building.phone}</a>
            <br />
            {copy.footer.deskLine}
          </p>
          <h3>{page.tourTitle}</h3>
          <p>{page.tourBody}</p>
        </aside>
      </div>
    </div>
  )
}

function Field({ label, error, children }) {
  return (
    <label className={error ? "field invalid" : "field"}>
      <span>{label}</span>
      {children}
      {error && <small>{error}</small>}
    </label>
  )
}

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = "name"
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "email"
  if (values.phone.replace(/\D/g, "").length < 10) errors.phone = "phone"
  return errors
}
