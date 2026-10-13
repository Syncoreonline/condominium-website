import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { building, placePhotos } from "../data.js"
import { usePageTitle } from "../usePageTitle.js"

const heroSlides = [
  {
    src: "/images/ocean-park.jpg",
    alt: "The park in front of the condominium: palms, a sandy path, the beach, and the Atlantic, with the building along the right edge.",
    caption: "The park in front of the building",
    className: "photo-park",
  },
  {
    src: "/images/ocean-park-front.jpg",
    alt: "The white tower of Ocean Park Condominium from Collins Avenue, with palms along the street and the entrance at street level.",
    caption: "The building from Collins Avenue",
    className: "photo-front",
  },
  {
    src: "/images/ocean-park-lobby.jpg",
    alt: "The lobby, with a marble desk, a fluted white column, and glass doors opening toward the street.",
    caption: "The lobby",
    className: "photo-lobby",
  },
]

export function Home() {
  usePageTitle(`${building.name} · Miami Beach`)
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">North Shore · Miami Beach</p>
          <h1>Modern living on the ocean.</h1>
          <p className="lede">
            Ocean Park Condominium is a {building.stories}-story building at {building.address}, developed in{" "}
            {building.year}. {building.homes} residences, from studios to three bedrooms, in the quieter North Shore
            stretch of Collins Avenue. Recertifications are due 30 years and every 10 years after year built. In this
            case it is due in the year 2028.
          </p>
          <div className="hero-actions">
            <Link className="btn" to="/inquire">
              Book a tour
            </Link>
          </div>
        </div>
        <HeroSlideshow />
      </section>

      <section className="stats" aria-label="Building facts">
        <div>
          <strong>{building.homes}</strong>
          <span>units</span>
        </div>
        <div>
          <strong>{building.stories}</strong>
          <span>stories</span>
        </div>
        <div>
          <strong>{building.year}</strong>
          <span>year built</span>
        </div>
        <div>
          <strong>Oceanfront</strong>
          <span>North Shore</span>
        </div>
      </section>

      <section className="split band">
        <div>
          <p className="eyebrow">The building</p>
          <h2>A white tower, finished in {building.year}.</h2>
          <p>
            Sklar Isaac & Associates Architects Inc designed Ocean Park Condominium as a simple modern building: a
            predominantly white facade and a regular pattern of windows. It is oceanfront, in the North Shore
            neighborhood, between Surfside and Mid Beach.
          </p>
          <p>Allison Park is a one-minute walk. South Beach is about five miles south.</p>
          <Link className="text-link" to="/about">
            How the building works
          </Link>
        </div>
        <figure className="frame">
          <img
            src="/images/beach.jpg"
            alt="Sunrise over a calm shoreline, with a low sun and a thin line of palms."
          />
          <figcaption>The ocean, in front of the building</figcaption>
        </figure>
      </section>

      <section className="band neighborhood-preview">
        <div className="section-head">
          <p className="eyebrow">North Shore</p>
          <h2>Quieter than South Beach, and still on the sand.</h2>
        </div>
        <ul className="place-photos">
          {placePhotos.map((place) => (
            <li key={place.name}>
              <figure>
                <img src={place.src} alt={place.alt} />
                <figcaption>{place.name}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>

      <section className="visit-band">
        <div>
          <p className="eyebrow">Visit</p>
          <h2>Come see the building.</h2>
          <p>
            The front desk is staffed around the clock at a secure lobby. A tour covers the
            lobby, the heated pool, and the fitness room. Parking is an assigned space in the secured garage.
          </p>
          <Link className="btn" to="/inquire">
            Book a tour
          </Link>
        </div>
        <figure className="frame frame-skyline">
          <img
            src="/images/south-beach.jpg"
            alt="The Miami skyline at dusk, seen across the water under a pink and blue sky."
          />
          <figcaption>The skyline, from the bay side of the neighborhood</figcaption>
        </figure>
      </section>
    </>
  )
}

function HeroSlideshow() {
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

  const slide = heroSlides[index]

  return (
    <figure className="hero-media" aria-roledescription="carousel" aria-label="Photographs of Ocean Park Condominium">
      <div className={`hero-slides${cycle > 0 ? " is-fading" : ""}`}>
        {heroSlides.map((item, itemIndex) => {
          const active = itemIndex === index
          return (
            <img
              key={item.src}
              className={`${item.className ?? ""} ${active ? "is-active" : ""}`.trim()}
              src={item.src}
              alt={active ? item.alt : ""}
              aria-hidden={!active}
              fetchPriority={itemIndex === 0 ? "high" : undefined}
            />
          )
        })}
      </div>
      <figcaption aria-live="polite">{slide.caption}</figcaption>
      <button type="button" className="hero-pause" aria-pressed={paused} onClick={() => setPaused((current) => !current)}>
        {paused ? "Play" : "Pause"}
      </button>
    </figure>
  )
}
