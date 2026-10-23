import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { building, placePhotos } from "../data.js"
import { format, useLanguage } from "../i18n/Language.jsx"
import { usePageTitle } from "../usePageTitle.js"

const heroSlides = [
  { src: "/images/ocean-park.jpg", className: "photo-park" },
  { src: "/images/ocean-park-front.jpg", className: "photo-front" },
  { src: "/images/ocean-park-lobby.jpg", className: "photo-lobby" },
]

export function Home() {
  const { copy } = useLanguage()
  const page = copy.home
  usePageTitle(page.pageTitle)
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">{page.eyebrow}</p>
          <h1>{page.title}</h1>
          <p className="lede">{format(page.lede, building)}</p>
          <p>
            {page.portalBefore} <Link to="/resident-portal">{page.portalLink}</Link> {page.portalAfter}{" "}
            <a href="https://vestaflo.com" target="_blank" rel="noreferrer">
              VestaFlo
            </a>
            .
          </p>
          <div className="hero-actions">
            <Link className="btn" to="/inquire">
              {page.tour}
            </Link>
          </div>
        </div>
        <HeroSlideshow page={page} />
      </section>

      <section className="stats" aria-label={page.facts}>
        <div>
          <strong>{building.homes}</strong>
          <span>{page.units}</span>
        </div>
        <div>
          <strong>{building.stories}</strong>
          <span>{page.stories}</span>
        </div>
        <div>
          <strong>{building.year}</strong>
          <span>{page.yearBuilt}</span>
        </div>
        <div>
          <strong>{page.oceanfront}</strong>
          <span>{building.neighborhood}</span>
        </div>
      </section>

      <section className="split band">
        <div>
          <p className="eyebrow">{page.buildingEyebrow}</p>
          <h2>{format(page.buildingTitle, building)}</h2>
          <p>{page.buildingBody}</p>
          <p>{page.buildingWalk}</p>
          <Link className="text-link" to="/about">
            {page.buildingLink}
          </Link>
        </div>
        <figure className="frame">
          <img src="/images/beach.jpg" alt={page.beachAlt} />
          <figcaption>{page.beachCaption}</figcaption>
        </figure>
      </section>

      <section className="band neighborhood-preview">
        <div className="section-head">
          <p className="eyebrow">{page.northEyebrow}</p>
          <h2>{page.northTitle}</h2>
        </div>
        <ul className="place-photos">
          {placePhotos.map((place) => {
            const label = copy.photos[place.name] ?? place
            return (
              <li key={place.name}>
                <figure>
                  <img src={place.src} alt={label.alt} />
                  <figcaption>{label.name}</figcaption>
                </figure>
              </li>
            )
          })}
        </ul>
      </section>

      <section className="visit-band">
        <div>
          <p className="eyebrow">{page.visitEyebrow}</p>
          <h2>{page.visitTitle}</h2>
          <p>{page.visitBody}</p>
          <Link className="btn" to="/inquire">
            {page.tour}
          </Link>
        </div>
        <figure className="frame frame-skyline">
          <img src="/images/south-beach.jpg" alt={page.skylineAlt} />
          <figcaption>{page.skylineCaption}</figcaption>
        </figure>
      </section>
    </>
  )
}

function HeroSlideshow({ page }) {
  const [index, setIndex] = useState(0)
  const [cycle, setCycle] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPaused(true)
  }, [])

  useEffect(() => {
    if (paused) return undefined
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % heroSlides.length)
      setCycle((current) => current + 1)
    }, 5000)
    return () => window.clearInterval(timer)
  }, [paused])

  const slide = page.slides[index]

  return (
    <figure className="hero-media" aria-roledescription="carousel" aria-label={page.carousel}>
      <div className={`hero-slides${cycle > 0 ? " is-fading" : ""}`}>
        {heroSlides.map((item, itemIndex) => {
          const active = itemIndex === index
          return (
            <img
              key={item.src}
              className={`${item.className ?? ""} ${active ? "is-active" : ""}`.trim()}
              src={item.src}
              alt={active ? page.slides[itemIndex].alt : ""}
              aria-hidden={!active}
              fetchPriority={itemIndex === 0 ? "high" : undefined}
            />
          )
        })}
      </div>
      <figcaption aria-live="polite">{slide.caption}</figcaption>
      <button type="button" className="hero-pause" aria-pressed={paused} onClick={() => setPaused((current) => !current)}>
        {paused ? page.play : page.pause}
      </button>
    </figure>
  )
}
