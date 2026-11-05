import { useEffect, useState } from "react"
import { Link, NavLink, Outlet, useLocation } from "react-router-dom"
import { building } from "../data.js"
import { useLanguage } from "../i18n/Language.jsx"
import { LanguageSwitcher } from "./LanguageSwitcher.jsx"

export function Layout() {
  const { copy } = useLanguage()
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const links = [
    { to: "/", label: copy.nav.home, end: true },
    { to: "/about", label: copy.nav.about },
    { to: "/neighborhood", label: copy.nav.neighborhood },
  ]

  useEffect(() => {
    setOpen(false)
  }, [location.pathname, location.search, location.hash])

  useEffect(() => {
    if (location.hash) {
      const id = decodeURIComponent(location.hash.slice(1))
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView()
      })
      return
    }
    window.scrollTo(0, 0)
  }, [location.pathname, location.hash])

  useEffect(() => {
    document.body.classList.toggle("nav-open", open)
    return () => document.body.classList.remove("nav-open")
  }, [open])

  return (
    <>
      <a className="skip" href="#content">
        {copy.nav.skip}
      </a>
      <header className="nav">
        <Link to="/" className="logo">
          <img src="/images/ocean-park-logo.jpg" alt="Ocean Park Condominium" />
        </Link>
        <div className="nav-tools">
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="site-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? copy.nav.close : copy.nav.menu}
          </button>
          <nav id="site-nav" className={open ? "site-nav open" : "site-nav"}>
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.end} className={({ isActive }) => (isActive ? "active" : undefined)}>
                {link.label}
              </NavLink>
            ))}
            <NavLink to="/resident-portal">{copy.nav.portal}</NavLink>
            <LanguageSwitcher variant="mobile" />
            <NavLink to="/inquire" className="nav-cta">
              {copy.nav.tour}
            </NavLink>
          </nav>
          <LanguageSwitcher variant="desktop" />
        </div>
      </header>
      <main id="content">
        <Outlet />
      </main>
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <img className="footer-logo" src="/images/ocean-park-logo.jpg" alt="Ocean Park Condominium" />
            <p>
              {building.address}
              <br />
              {building.city}, {building.state} {building.zip}
            </p>
          </div>
          <div>
            <p className="eyebrow">{copy.footer.desk}</p>
            <p>
              <a href={building.phoneHref}>{building.phone}</a>
              <br />
              {copy.footer.deskLine}
            </p>
            <p>
              <strong>{copy.footer.manager}</strong>
              <br />
              Luis Tijerino
              <br />
              {copy.footer.mainOffice}: <a href="tel:+13058666541">(305) 866-6541</a>
              <br />
              <a href="mailto:Oceanpark6450@breezelinebiz.net">Oceanpark6450@breezelinebiz.net</a>
            </p>
            <p>
              <strong>{copy.footer.hoursLabel}</strong>
              <br />
              {copy.footer.hours}
            </p>
          </div>
          <div>
            <p className="eyebrow">{copy.footer.visit}</p>
            <p>
              <Link to="/">{copy.nav.home}</Link>
              <br />
              <Link to="/about">{copy.footer.building}</Link>
              <br />
              <Link to="/neighborhood">{copy.nav.neighborhood}</Link>
              <br />
              <Link to="/about">{copy.nav.about}</Link>
              <br />
              <Link to="/resident-portal">{copy.nav.portal}</Link>
              <br />
              <Link to="/inquire">{copy.nav.tour}</Link>
            </p>
          </div>
          <div>
            <p className="eyebrow">{copy.footer.more}</p>
            <p>
              <Link to="/terms">{copy.footer.terms}</Link>
              <br />
              <Link to="/privacy">{copy.footer.privacy}</Link>
              <br />
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${building.address}, ${building.city}, ${building.state} ${building.zip}`)}`}
                target="_blank"
                rel="noreferrer"
              >
                {copy.footer.directions}
              </a>
            </p>
          </div>
        </div>
        <p className="footer-note">
          {copy.footer.noteBefore}{" "}
          <a href="https://vestaflo.com" target="_blank" rel="noreferrer">
            VestaFlo
          </a>
          .
        </p>
      </footer>
    </>
  )
}

