import { useMemo, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { building, getResidence, residences } from "../data.js"
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
  usePageTitle("Book a tour · Ocean Park Condominium")
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
    const residenceName = home ? home.name : "No plan chosen yet"
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
          timing: timingLabel(values.timing),
          message: values.message,
          _subject: "Tour request from the Ocean Park website",
          _template: "table",
          _captcha: "false",
          _replyto: values.email,
        }),
      })
      const result = await response.json().catch(() => ({}))
      const message = typeof result.message === "string" ? result.message : ""
      if (!response.ok || result.success === false || result.success === "false") {
        throw new Error(/activ/i.test(message) ? "The note could not be sent just now." : message || "The note could not be sent.")
      }
      setReceipt({ ...values, residenceName })
    } catch (error) {
      setSendError(error.message || "The note could not be sent. Try again in a moment.")
    } finally {
      setSending(false)
    }
  }

  if (receipt) {
    return (
      <div className="page narrow">
        <p className="eyebrow">Noted on this page</p>
        <h1>{`Thank you, ${receipt.name.trim().split(" ")[0]}.`}</h1>
        <p className="lede">The front desk has your note.</p>
        <dl className="receipt">
          <div>
            <dt>Name</dt>
            <dd>{receipt.name}</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>{receipt.email}</dd>
          </div>
          <div>
            <dt>Phone</dt>
            <dd>{receipt.phone}</dd>
          </div>
          <div>
            <dt>Plan</dt>
            <dd>{receipt.residenceName}</dd>
          </div>
          <div>
            <dt>Timing</dt>
            <dd>{timingLabel(receipt.timing)}</dd>
          </div>
          {receipt.message.trim() && (
            <div>
              <dt>Note</dt>
              <dd>{receipt.message}</dd>
            </div>
          )}
        </dl>
        <Link className="btn" to="/">
          Back home
        </Link>
      </div>
    )
  }

  return (
    <div className="page inquire">
      <header className="page-intro">
        <p className="eyebrow">Front desk</p>
        <h1>Book a tour of the building.</h1>
        <p className="lede">
          The front desk is staffed 24 hours. A tour covers the lobby, the heated pool, the fitness room, and the
          clubhouse.
        </p>
      </header>

      <div className="inquire-grid">
        <form className="visit-form" onSubmit={submit} noValidate>
          <Field label="Name" error={errors.name}>
            <input name="name" autoComplete="name" value={values.name} onChange={update} />
          </Field>
          <Field label="Email" error={errors.email}>
            <input name="email" type="email" autoComplete="email" value={values.email} onChange={update} />
          </Field>
          <Field label="Phone" error={errors.phone}>
            <input name="phone" type="tel" autoComplete="tel" value={values.phone} onChange={update} />
          </Field>
          <Field label="Plan">
            <select name="residence" value={values.residence} onChange={update}>
              <option value="">Not sure yet</option>
              {residences.map((home) => (
                <option key={home.id} value={home.id}>
                  {home.name} · {home.sqftLabel}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Timing">
            <select name="timing" value={values.timing} onChange={update}>
              <option value="immediately">As soon as I can</option>
              <option value="1-3">In the next three months</option>
              <option value="3-6">Three to six months</option>
              <option value="just-looking">I am just looking</option>
            </select>
          </Field>
          <Field label="Anything the desk should know">
            <textarea name="message" rows="4" value={values.message} onChange={update} />
          </Field>
          <button className="btn" type="submit" disabled={sending}>
            {sending ? "Sending" : "Send the note"}
          </button>
          {sendError && <p className="fine-print">{sendError}</p>}
        </form>

        <aside className="visit-card">
          <h2>The building</h2>
          <p>
            {building.address}
            <br />
            {building.city}, {building.state} {building.zip}
          </p>
          <p>
            <a href={building.phoneHref}>{building.phone}</a>
            <br />
            {building.desk}
          </p>
          <h3>What a tour covers</h3>
          <p>
            Lobby, heated pool, fitness center, and clubhouse. The garage is secured, with one or two assigned spaces
            per home. The desk is staffed through the night.
          </p>
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
  if (!values.name.trim()) errors.name = "Enter your name."
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Enter a valid email."
  if (values.phone.replace(/\D/g, "").length < 10) errors.phone = "Enter a phone number, including the area code."
  return errors
}

function timingLabel(value) {
  if (value === "immediately") return "As soon as possible"
  if (value === "1-3") return "In the next three months"
  if (value === "3-6") return "Three to six months"
  return "Just looking"
}
