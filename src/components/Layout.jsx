import { useEffect, useState } from "react"
import { Link, NavLink, Outlet, useLocation } from "react-router-dom"
import { building } from "../data.js"

const links = [
  { to: "/about", label: "About" },
  { to: "/neighborhood", label: "Neighborhood" },
]

export function Layout() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

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
        Skip to content
      </a>
      <header className="nav">
        <Link to="/" className="logo">
          <img src="/images/ocean-park-logo.jpg" alt="Ocean Park Condominium" />
        </Link>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
        <nav id="site-nav" className={open ? "site-nav open" : "site-nav"}>
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={({ isActive }) => (isActive ? "active" : undefined)}>
              {link.label}
            </NavLink>
          ))}
          <NavLink to="/resident-portal">Resident Portal</NavLink>
          <NavLink to="/inquire" className="nav-cta">
            Book a tour
          </NavLink>
        </nav>
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
            <p className="eyebrow">Front desk</p>
            <p>
              <a href={building.phoneHref}>{building.phone}</a>
              <br />
              {building.desk}
            </p>
            <p>
              <strong>Property Manager</strong>
              <br />
              Luis Tijerino
              <br />
              Main office: <a href="tel:+13058666541">(305) 866-6541</a>
              <br />
              <a href="mailto:Oceanpark6450@breezelinebiz.net">Oceanpark6450@breezelinebiz.net</a>
            </p>
            <p>
              <strong>Office Hours</strong>
              <br />
              Monday to Friday: 9 AM - 1:30 PM
            </p>
          </div>
          <div>
            <p className="eyebrow">Visit</p>
            <p>
              <Link to="/about">The building</Link>
              <br />
              <Link to="/neighborhood">Neighborhood</Link>
              <br />
              <Link to="/about">About</Link>
              <br />
              <Link to="/resident-portal">Resident Portal</Link>
              <br />
              <Link to="/inquire">Book a tour</Link>
            </p>
          </div>
          <div>
            <p className="eyebrow">More</p>
            <p>
              <Link to="/terms">Terms of use</Link>
              <br />
              <Link to="/privacy">Privacy policy</Link>
              <br />
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${building.address}, ${building.city}, ${building.state} ${building.zip}`)}`}
                target="_blank"
                rel="noreferrer"
              >
                Directions
              </a>
            </p>
          </div>
        </div>
        <p className="footer-note">
          Website Resident Portal developed and maintained by{" "}
          <a href="https://vestaflo.com" target="_blank" rel="noreferrer">
            VestaFlo
          </a>
          .
        </p>
      </footer>
    </>
  )
}

